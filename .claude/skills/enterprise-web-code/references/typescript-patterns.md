# TypeScript Patterns for Web Development

Advanced TypeScript patterns for building type-safe Next.js and React applications.

## TypeScript Configuration

```json
// tsconfig.json - Strict and optimal settings
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    },
    // Additional strict flags
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Component Props Patterns

### Basic Props Interface

```typescript
// ❌ BAD: No types
function Button({ children, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
}

// ✅ GOOD: Explicit types
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ children, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
}
```

### Extending HTML Elements

```typescript
// ✅ GOOD: Extend native element props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

function Button({ variant = 'primary', isLoading, children, ...props }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

// Usage gets full autocomplete and type safety
<Button onClick={() => {}} type="submit" aria-label="Submit form" />
```

### Polymorphic Components

```typescript
// Component that can render as different elements
type AsProp<E extends React.ElementType> = {
  as?: E;
};

type PropsToOmit<E extends React.ElementType, P> = keyof (AsProp<E> & P);

type PolymorphicProps<
  E extends React.ElementType,
  Props = {}
> = Props & 
  Omit<React.ComponentPropsWithoutRef<E>, PropsToOmit<E, Props>> &
  AsProp<E>;

interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'caption';
}

function Text<E extends React.ElementType = 'span'>({
  as,
  children,
  variant = 'body',
  ...props
}: PolymorphicProps<E, TextProps>) {
  const Component = as || 'span';
  return (
    <Component className={`text-${variant}`} {...props}>
      {children}
    </Component>
  );
}

// Usage
<Text>Default span</Text>
<Text as="p">Paragraph</Text>
<Text as="a" href="/link">Link with type-safe href</Text>
```

## Discriminated Unions for State

```typescript
// ❌ BAD: Loose state typing
interface State {
  isLoading: boolean;
  data?: User[];
  error?: string;
}

// ✅ GOOD: Discriminated union
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function UserList() {
  const [state, setState] = useState<FetchState<User[]>>({ status: 'idle' });

  // TypeScript narrows type based on status
  if (state.status === 'loading') {
    return <Spinner />;
  }

  if (state.status === 'error') {
    return <Error message={state.error} />; // error is available
  }

  if (state.status === 'success') {
    return <List items={state.data} />; // data is available
  }

  return <button onClick={fetchUsers}>Load Users</button>;
}
```

## Generic Components

```typescript
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

function List<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = 'No items' 
}: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage - fully type-safe
interface User {
  id: string;
  name: string;
  email: string;
}

<List<User>
  items={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )}
/>
```

## Type-Safe Forms

```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

// Infer TypeScript type from schema
type LoginForm = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    // data is fully typed
    console.log(data.email, data.password, data.rememberMe);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <label>
        <input {...register('rememberMe')} type="checkbox" />
        Remember me
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## API Response Types

```typescript
// Define API response types
interface ApiResponse<T> {
  data?: T;
  error?: string;
  meta?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Type-safe API client
class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      return {
        error: `HTTP error! status: ${response.status}`,
      };
    }

    return response.json();
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  async getUsers(page: number = 1): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(`/users?page=${page}`);
  }

  async createUser(data: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Usage
const api = new ApiClient();

async function loadUser(id: string) {
  const response = await api.getUser(id);
  
  if (response.error) {
    console.error(response.error);
    return;
  }

  // TypeScript knows data is User
  console.log(response.data?.name);
}
```

## Utility Types

### Pick and Omit

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pick specific fields
type UserPublic = Pick<User, 'id' | 'name' | 'email'>;

// Omit sensitive fields
type UserSafe = Omit<User, 'password'>;

// Create input type (omit generated fields)
type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// Update input type (everything optional except id)
type UpdateUserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & {
  id: string;
};
```

### Record for Mapped Types

```typescript
// ❌ BAD: Loose typing
const userRoles = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: ['read'],
};

// ✅ GOOD: Strongly typed
type Role = 'admin' | 'user' | 'guest';
type Permission = 'read' | 'write' | 'delete';

const userRoles: Record<Role, Permission[]> = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: ['read'],
};

// Type-safe access
function hasPermission(role: Role, permission: Permission): boolean {
  return userRoles[role].includes(permission);
}
```

### Conditional Types

```typescript
// Extract optional keys
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Extract required keys
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

type OptionalUserKeys = OptionalKeys<User>; // 'email' | 'phone'
type RequiredUserKeys = RequiredKeys<User>; // 'id' | 'name'
```

## Type Guards

```typescript
// Type predicate
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
}

// Usage
function processData(data: unknown) {
  if (isUser(data)) {
    // TypeScript knows data is User here
    console.log(data.name);
  }
}

// Generic type guard
function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

// Usage
if (isArrayOf(data, isUser)) {
  // data is User[]
  data.forEach(user => console.log(user.name));
}
```

## Const Assertions

```typescript
// ❌ BAD: Type widening
const colors = ['red', 'blue', 'green']; // string[]

// ✅ GOOD: as const for literal types
const colors = ['red', 'blue', 'green'] as const; // readonly ['red', 'blue', 'green']
type Color = typeof colors[number]; // 'red' | 'blue' | 'green'

// Object const assertion
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
} as const;

type Config = typeof config; // { readonly apiUrl: "https://api.example.com", ... }
```

## Template Literal Types

```typescript
// CSS properties
type CSSUnit = 'px' | 'em' | 'rem' | '%';
type Size = `${number}${CSSUnit}`;

const width: Size = '100px'; // ✅
const height: Size = '50%';  // ✅
const invalid: Size = '100';  // ❌ Type error

// Event handlers
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;

const handler: EventHandler = 'onClick'; // ✅
const invalid: EventHandler = 'onclick'; // ❌ Type error

// API routes
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = `/api/${'users' | 'posts' | 'comments'}`;
type ApiRoute = `${HTTPMethod} ${ApiEndpoint}`;

const route: ApiRoute = 'GET /api/users'; // ✅
```

## Advanced Patterns

### Builder Pattern

```typescript
class QueryBuilder<T> {
  private filters: Array<(item: T) => boolean> = [];
  private sortFn?: (a: T, b: T) => number;
  private limitValue?: number;

  where(predicate: (item: T) => boolean): this {
    this.filters.push(predicate);
    return this;
  }

  sortBy(fn: (a: T, b: T) => number): this {
    this.sortFn = fn;
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  execute(data: T[]): T[] {
    let result = data.filter(item => 
      this.filters.every(filter => filter(item))
    );

    if (this.sortFn) {
      result = result.sort(this.sortFn);
    }

    if (this.limitValue) {
      result = result.slice(0, this.limitValue);
    }

    return result;
  }
}

// Usage
const activeUsers = new QueryBuilder<User>()
  .where(user => user.isActive)
  .where(user => user.age >= 18)
  .sortBy((a, b) => a.name.localeCompare(b.name))
  .limit(10)
  .execute(users);
```

### Branded Types

```typescript
// Prevent mixing different types of IDs
type Brand<K, T> = K & { __brand: T };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getUser(id: UserId): User {
  // Implementation
}

function getPost(id: PostId): Post {
  // Implementation
}

const userId = createUserId('123');
const postId = createPostId('456');

getUser(userId); // ✅
getUser(postId); // ❌ Type error - prevents mixing IDs
```

## Best Practices

1. **Enable strict mode** - Always use `"strict": true`
2. **Avoid any** - Use `unknown` and type guards instead
3. **Use type inference** - Let TypeScript infer when obvious
4. **Discriminated unions** - For complex state management
5. **Const assertions** - For literal types and readonly data
6. **Type guards** - For runtime type checking
7. **Generic constraints** - Make generics more specific
8. **Utility types** - Leverage Pick, Omit, Partial, Required
9. **Zod for validation** - Runtime validation with inferred types
10. **Document complex types** - Add JSDoc comments

## TypeScript + React Hooks

```typescript
// useState with explicit type
const [user, setUser] = useState<User | null>(null);

// useState with type inference
const [count, setCount] = useState(0); // number
const [isOpen, setIsOpen] = useState(false); // boolean

// useRef for DOM elements
const inputRef = useRef<HTMLInputElement>(null);

// useRef for mutable values
const intervalRef = useRef<NodeJS.Timeout>();

// useReducer with discriminated unions
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'set':
      return action.payload;
  }
}

const [count, dispatch] = useReducer(reducer, 0);
```

TypeScript makes your code more maintainable, catches bugs early, and provides excellent developer experience with autocomplete and refactoring tools.
