# Next.js 16 Patterns and Best Practices

Comprehensive guide to building production-ready Next.js 16 applications.

## Server Components vs Client Components

### Server Components (Default)

Server Components are the new default in Next.js 16 App Router. They run on the server and send HTML to the client.

**Benefits:**
- Zero client-side JavaScript by default
- Direct database/API access
- Better SEO
- Smaller bundle sizes
- Automatic code splitting

**Use for:**
- Data fetching
- Rendering static content
- Accessing backend resources
- SEO-critical content

```typescript
// ✅ GOOD: Server Component (default)
import { db } from '@/lib/db';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // Direct database access - no API route needed
  const post = await db.post.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Client Components ('use client')

Client Components run in the browser and enable interactivity.

**Use only when you need:**
- `useState`, `useReducer`, `useContext`
- `useEffect`, `useLayoutEffect`
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `localStorage`, etc.)
- Custom hooks that use the above

```typescript
// ✅ GOOD: Client Component (when interactivity needed)
'use client';

import { useState } from 'react';
import { likePost } from '@/app/actions';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLike() {
    setIsLoading(true);
    try {
      const newLikes = await likePost(postId);
      setLikes(newLikes);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button onClick={handleLike} disabled={isLoading}>
      ❤️ {likes}
    </button>
  );
}
```

### Composition Pattern

Keep Client Components small and compose them with Server Components:

```typescript
// ✅ GOOD: Server Component wrapping small Client Component
import { LikeButton } from './like-button'; // Client Component

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {/* Small interactive piece */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}

// ❌ BAD: Making entire component client-side for one interactive piece
'use client';

export default function BlogPost({ params }: { params: { slug: string } }) {
  // Now ALL of this is client-side JavaScript
  // Can't do direct database access
  // Worse for SEO and performance
}
```

## Data Fetching Patterns

### Fetch in Server Components

```typescript
// ✅ GOOD: Fetch directly in Server Component
async function Users() {
  const res = await fetch('https://api.example.com/users', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  const users = await res.json();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Parallel Data Fetching

```typescript
// ✅ GOOD: Parallel requests with Promise.all
async function Dashboard() {
  const [users, posts, stats] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/stats').then(r => r.json()),
  ]);

  return (
    <div>
      <UserList users={users} />
      <PostList posts={posts} />
      <Stats data={stats} />
    </div>
  );
}
```

### Sequential Data Fetching (when needed)

```typescript
// ✅ GOOD: Sequential when dependent
async function UserWithPosts({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } });
  
  // Only fetch posts after we have the user
  const posts = await db.post.findMany({
    where: { authorId: user.id },
  });

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

### Request Deduplication

Next.js automatically deduplicates identical fetch requests:

```typescript
// Both fetch calls will only execute once
async function Layout() {
  const user = await fetch('/api/user');
  return <div>{/* ... */}</div>;
}

async function Page() {
  const user = await fetch('/api/user'); // Deduplicated!
  return <div>{/* ... */}</div>;
}
```

## Caching Strategies

### Static Generation (SSG) - Default

```typescript
// Cached indefinitely until rebuild
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts');
  return <PostList posts={posts} />;
}
```

### Incremental Static Regeneration (ISR)

```typescript
// Revalidate every hour
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  });
  return <PostList posts={posts} />;
}
```

### Dynamic Rendering (SSR)

```typescript
// No caching - always fresh
export default async function Page() {
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'no-store'
  });
  return <PostList posts={posts} />;
}

// Or use dynamic functions
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies(); // Makes route dynamic
  const posts = await fetch('https://api.example.com/posts');
  return <PostList posts={posts} />;
}
```

### Route Segment Config

```typescript
// Configure entire route segment
export const dynamic = 'force-dynamic'; // or 'auto', 'force-static'
export const revalidate = 3600; // seconds
export const fetchCache = 'default-cache'; // or 'force-cache', 'force-no-store'

export default async function Page() {
  // ...
}
```

## Server Actions

Server Actions enable server-side mutations from Client Components without API routes.

```typescript
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export async function createPost(formData: FormData) {
  // Validate input
  const parsed = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { error: 'Invalid input' };
  }

  // Create post
  const post = await db.post.create({
    data: parsed.data,
  });

  // Revalidate cache
  revalidatePath('/posts');
  
  return { success: true, postId: post.id };
}

// With progressive enhancement (works without JS)
export async function createPostProgressive(prevState: any, formData: FormData) {
  // Same validation and logic
  const parsed = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { error: 'Invalid input' };
  }

  await db.post.create({ data: parsed.data });
  revalidatePath('/posts');
  redirect('/posts');
}
```

```typescript
// app/posts/create/page.tsx
'use client';

import { createPost } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  );
}

export default function CreatePost() {
  const [state, formAction] = useFormState(createPost, { error: null });

  return (
    <form action={formAction}>
      <input name="title" required />
      <textarea name="content" required />
      <SubmitButton />
      {state?.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

## Streaming with Suspense

Stream content to the client as it becomes ready:

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Slow content loaded!</div>;
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Fast content renders immediately */}
      <div>Fast content</div>
      
      {/* Slow content streams in when ready */}
      <Suspense fallback={<div>Loading slow content...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

## Partial Prerendering (PPR)

Combine static and dynamic content in the same route (experimental in Next.js 16):

```typescript
// next.config.js
export default {
  experimental: {
    ppr: true,
  },
};

// app/product/[id]/page.tsx
import { Suspense } from 'react';

// Static shell
export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* Static content */}
      <ProductImages productId={params.id} />
      
      {/* Dynamic content */}
      <Suspense fallback={<PriceSkeleton />}>
        <ProductPrice productId={params.id} />
      </Suspense>
      
      <Suspense fallback={<StockSkeleton />}>
        <StockStatus productId={params.id} />
      </Suspense>
    </div>
  );
}
```

## Metadata and SEO

```typescript
// Static metadata
export const metadata = {
  title: 'My App',
  description: 'App description',
  openGraph: {
    title: 'My App',
    description: 'App description',
    images: ['/og-image.jpg'],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
```

## Route Handlers (API Routes)

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get('limit') || '10';

  const posts = await db.post.findMany({
    take: parseInt(limit),
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = postSchema.parse(body);

    const post = await db.post.create({
      data: parsed,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await db.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}
```

## Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

## Error Handling

```typescript
// app/error.tsx - Error boundary
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}

// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({ where: { slug: params.slug } });

  if (!post) {
    notFound(); // Triggers not-found.tsx
  }

  return <article>{/* ... */}</article>;
}
```

## Loading States

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}

// app/dashboard/page.tsx
// Automatically wrapped in <Suspense> with loading.tsx as fallback
export default async function Dashboard() {
  const data = await fetchDashboardData();
  return <DashboardContent data={data} />;
}
```

## Environment Variables

```typescript
// .env.local
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://api.example.com

// Access in code
const dbUrl = process.env.DATABASE_URL; // Server-side only
const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Client and server
```

## Common Patterns

### Optimistic UI Updates

```typescript
'use client';

import { useOptimistic } from 'react';
import { addTodo } from '@/app/actions';

export function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function formAction(formData: FormData) {
    const title = formData.get('title');
    
    // Immediately update UI
    addOptimisticTodo({ id: Math.random(), title, completed: false });
    
    // Send to server
    await addTodo(formData);
  }

  return (
    <>
      <form action={formAction}>
        <input name="title" />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}
```

### Infinite Scroll

```typescript
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export function InfinitePostList() {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`/api/posts?cursor=${pageParam}`).then(r => r.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div>
      {data?.pages.map((page) =>
        page.posts.map((post) => <Post key={post.id} post={post} />)
      )}
      
      <div ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
```

## Performance Tips

1. **Use Server Components by default** - Only use 'use client' when needed
2. **Implement Streaming** - Use Suspense for better perceived performance
3. **Optimize Images** - Always use next/image
4. **Minimize Client JS** - Extract static parts to Server Components
5. **Use Dynamic Imports** - Code split heavy components
6. **Implement PPR** - Combine static and dynamic content
7. **Cache Aggressively** - Use appropriate revalidation strategies
8. **Parallel Data Fetching** - Use Promise.all for independent requests
9. **Prefetch Links** - Next.js prefetches links in viewport automatically
10. **Monitor Core Web Vitals** - Use Vercel Analytics or similar

These patterns will help you build fast, scalable Next.js 16 applications that follow modern best practices.
