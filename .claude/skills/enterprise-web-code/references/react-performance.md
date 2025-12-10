# React Performance Optimization

Advanced techniques for building fast, responsive React applications.

## Core Principles

1. **Render less often** - Minimize unnecessary re-renders
2. **Render less content** - Virtual scrolling, pagination
3. **Make renders faster** - Optimize expensive computations
4. **Reduce bundle size** - Code splitting, tree shaking

## Preventing Unnecessary Re-renders

### React.memo for Component Memoization

```typescript
// ❌ BAD: Re-renders on every parent render
function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ GOOD: Only re-renders when user prop changes
import { memo } from 'react';

const UserCard = memo(function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});

// With custom comparison
const UserCard = memo(
  function UserCard({ user }: { user: User }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Only re-render if user.id changed
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### useMemo for Expensive Computations

```typescript
// ❌ BAD: Recalculates on every render
function ProductList({ products, searchTerm }) {
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return <List items={filteredProducts} />;
}

// ✅ GOOD: Only recalculates when dependencies change
import { useMemo } from 'react';

function ProductList({ products, searchTerm }) {
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  
  return <List items={filteredProducts} />;
}
```

### useCallback for Stable Function References

```typescript
// ❌ BAD: Creates new function on every render
function UserList({ users }) {
  const handleDelete = (id) => {
    deleteUser(id);
  };
  
  return users.map(user => (
    <UserCard key={user.id} user={user} onDelete={handleDelete} />
  ));
}

// ✅ GOOD: Stable function reference
import { useCallback } from 'react';

function UserList({ users }) {
  const handleDelete = useCallback((id: string) => {
    deleteUser(id);
  }, []); // No dependencies - function never changes
  
  return users.map(user => (
    <UserCard key={user.id} user={user} onDelete={handleDelete} />
  ));
}
```

### Avoid Inline Objects and Arrays

```typescript
// ❌ BAD: New object on every render causes child re-render
function Parent() {
  return <Child config={{ theme: 'dark', size: 'large' }} />;
}

// ✅ GOOD: Stable reference
const CONFIG = { theme: 'dark', size: 'large' };

function Parent() {
  return <Child config={CONFIG} />;
}

// OR use useMemo for dynamic values
function Parent({ theme }) {
  const config = useMemo(() => ({
    theme,
    size: 'large'
  }), [theme]);
  
  return <Child config={config} />;
}
```

## Optimizing Large Lists

### Virtual Scrolling

```typescript
// ❌ BAD: Renders all 10,000 items
function LargeList({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// ✅ GOOD: Only renders visible items
import { useVirtualizer } from '@tanstack/react-virtual';

function LargeList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated item height
    overscan: 5, // Render 5 extra items above/below
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ItemCard item={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Windowing with react-window

```typescript
import { FixedSizeList } from 'react-window';

function LargeList({ items }: { items: Item[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={100}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <ItemCard item={items[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

### Pagination

```typescript
function ProductList() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page, pageSize),
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {data?.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
```

## Debouncing and Throttling

### Debounce for Search

```typescript
// ❌ BAD: Makes API call on every keystroke
function SearchBox() {
  const [query, setQuery] = useState('');
  
  const handleSearch = async (value: string) => {
    const results = await fetch(`/api/search?q=${value}`);
    // Process results
  };
  
  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value); // Too many calls!
      }}
    />
  );
}

// ✅ GOOD: Debounced search
import { useDebouncedCallback } from 'use-debounce';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebouncedCallback(
    async (value: string) => {
      const res = await fetch(`/api/search?q=${value}`);
      const data = await res.json();
      setResults(data);
    },
    500 // Wait 500ms after user stops typing
  );

  return (
    <>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          debouncedSearch(e.target.value);
        }}
      />
      <ResultsList results={results} />
    </>
  );
}
```

### Throttle for Scroll Events

```typescript
import { useThrottledCallback } from 'use-debounce';

function InfiniteScroll() {
  const handleScroll = useThrottledCallback(
    () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMore();
      }
    },
    200 // Execute at most once every 200ms
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return <div>{/* content */}</div>;
}
```

## Code Splitting

### Dynamic Imports

```typescript
// ❌ BAD: Loads heavy component on initial page load
import HeavyChart from './heavy-chart';

function Dashboard() {
  return <HeavyChart data={data} />;
}

// ✅ GOOD: Load on demand
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Disable SSR if component uses browser APIs
});

function Dashboard() {
  return <HeavyChart data={data} />;
}
```

### Lazy Loading with Suspense

```typescript
import { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./admin-panel'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isAdmin && <AdminPanel />}
    </Suspense>
  );
}
```

### Route-based Code Splitting

Next.js automatically code-splits by route, but you can optimize further:

```typescript
// app/dashboard/page.tsx
import dynamic from 'next/dynamic';

// Heavy components loaded on demand
const Analytics = dynamic(() => import('@/components/analytics'));
const Reports = dynamic(() => import('@/components/reports'));

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <Analytics />
      </Suspense>
      <Suspense fallback={<div>Loading reports...</div>}>
        <Reports />
      </Suspense>
    </div>
  );
}
```

## Image Optimization

### Next.js Image Component

```typescript
import Image from 'next/image';

// ❌ BAD: Regular img tag
function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} alt={product.name} width={300} height={300} />
    </div>
  );
}

// ✅ GOOD: Optimized with next/image
function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        loading="lazy" // Lazy load images below fold
        placeholder="blur" // Show blur placeholder
        blurDataURL="data:..." // Tiny base64 image
      />
    </div>
  );
}
```

### Responsive Images

```typescript
import Image from 'next/image';

function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      fill // Fill parent container
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority // Load immediately (above fold)
      quality={90}
    />
  );
}
```

## State Management Optimization

### Colocation

```typescript
// ❌ BAD: Global state for local concern
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Header />
      <Sidebar />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

// ✅ GOOD: State lives with component that uses it
function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <header>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
}
```

### Context Optimization

```typescript
// ❌ BAD: Single context causes all consumers to re-render
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  return (
    <AppContext.Provider value={{ user, theme, notifications, setUser, setTheme, setNotifications }}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ GOOD: Split contexts by concern
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationsContext = createContext();

// Components only subscribe to data they need
function UserProfile() {
  const user = useContext(UserContext); // Only re-renders when user changes
  return <div>{user.name}</div>;
}

function ThemeSwitcher() {
  const [theme, setTheme] = useContext(ThemeContext); // Only re-renders when theme changes
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle</button>;
}
```

### Use Zustand for Better Performance

```typescript
// Better alternative to Context for complex state
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  theme: 'light',
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
}));

// Component only re-renders when user changes
function UserProfile() {
  const user = useStore((state) => state.user); // Selector
  return <div>{user?.name}</div>;
}

// Component only re-renders when theme changes
function ThemeSwitcher() {
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle
    </button>
  );
}
```

## React Server Components

### Minimize Client-Side JavaScript

```typescript
// ✅ GOOD: Most of the app is Server Components
// app/products/page.tsx (Server Component)
async function ProductsPage() {
  const products = await db.product.findMany();
  
  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}

// components/product-grid.tsx (Server Component)
function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// components/product-card.tsx (Server Component with Client Component for interactivity)
import { AddToCartButton } from './add-to-cart-button'; // Client Component

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <AddToCartButton productId={product.id} /> {/* Only this is client-side */}
    </div>
  );
}

// components/add-to-cart-button.tsx (Client Component)
'use client';

export function AddToCartButton({ productId }) {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <button onClick={async () => {
      setIsLoading(true);
      await addToCart(productId);
      setIsLoading(false);
    }}>
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

## Performance Monitoring

### Use React DevTools Profiler

```typescript
import { Profiler } from 'react';

function App() {
  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
) {
  console.log(`${id} took ${actualDuration}ms to ${phase}`);
  
  // Send to analytics
  if (actualDuration > 100) {
    analytics.track('slow_render', { id, duration: actualDuration });
  }
}
```

### Web Vitals

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Performance Checklist

- [ ] Server Components by default, Client Components only when needed
- [ ] Dynamic imports for heavy components
- [ ] next/image for all images
- [ ] Virtual scrolling for lists >100 items
- [ ] Debounce search inputs
- [ ] React.memo for expensive pure components
- [ ] useMemo for expensive computations
- [ ] useCallback for stable callback references
- [ ] Avoid inline objects/arrays in props
- [ ] Split large contexts into smaller ones
- [ ] Implement proper loading states
- [ ] Monitor bundle size
- [ ] Profile with React DevTools
- [ ] Track Core Web Vitals

## Common Anti-Patterns

1. **Over-optimization** - Don't memo everything, measure first
2. **Large Context Values** - Split contexts or use state management library
3. **Expensive Operations in Render** - Move to useMemo
4. **Deep Component Trees** - Flatten when possible
5. **Not Using Server Components** - Default to Server Components
6. **Synchronous Operations** - Use async/await and Suspense
7. **Large Props Objects** - Only pass what's needed
8. **Forgetting Keys** - Always use stable, unique keys in lists

Remember: **Measure first, optimize second**. Use React DevTools Profiler to identify real bottlenecks before optimizing.
