# API Documentation

Complete guide for designing and implementing backend APIs for your application.

---

## Table of Contents

- [API Design Principles](#api-design-principles)
- [API Architecture](#api-architecture)
- [RESTful API Patterns](#restful-api-patterns)
- [tRPC Type-Safe APIs](#trpc-type-safe-apis)
- [Supabase Edge Functions](#supabase-edge-functions)
- [Authentication & Authorization](#authentication--authorization)
- [Request/Response Patterns](#requestresponse-patterns)
- [Error Handling](#error-handling)
- [API Versioning](#api-versioning)
- [Rate Limiting](#rate-limiting)
- [API Documentation](#api-documentation-1)
- [Testing APIs](#testing-apis)

---

## API Design Principles

### REST Best Practices

**Resource-Based URLs:**
```
✅ Good:
GET    /api/todos           # List todos
GET    /api/todos/:id       # Get specific todo
POST   /api/todos           # Create todo
PATCH  /api/todos/:id       # Update todo
DELETE /api/todos/:id       # Delete todo

❌ Bad:
GET    /api/getTodos
POST   /api/createTodo
POST   /api/updateTodo/:id
```

**HTTP Methods:**
- `GET` - Retrieve resources (idempotent, cacheable)
- `POST` - Create resources
- `PATCH` - Partial update
- `PUT` - Full replacement
- `DELETE` - Remove resources

**Status Codes:**
```typescript
// Success
200 OK              // Successful GET, PATCH, PUT, DELETE
201 Created         // Successful POST
204 No Content      // Successful DELETE with no body

// Client Errors
400 Bad Request     // Invalid input
401 Unauthorized    // Not authenticated
403 Forbidden       // Authenticated but not authorized
404 Not Found       // Resource doesn't exist
409 Conflict        // Duplicate resource
422 Unprocessable   // Validation errors
429 Too Many Requests // Rate limit exceeded

// Server Errors
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

---

## API Architecture

### Layered Architecture

```
┌─────────────────────────────────┐
│    Client (Mobile/Web)          │
└────────────┬────────────────────┘
             │ HTTP/WebSocket
┌────────────▼────────────────────┐
│    API Gateway / Router         │
│    - Rate limiting              │
│    - Authentication             │
│    - CORS                       │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│    Business Logic Layer         │
│    - Controllers                │
│    - Services                   │
│    - Validation                 │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│    Data Access Layer            │
│    - Repositories               │
│    - ORM (Supabase Client)      │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│    Database (PostgreSQL)        │
│    - RLS policies               │
│    - Triggers                   │
└─────────────────────────────────┘
```

---

## RESTful API Patterns

### CRUD Operations

```typescript
// api/routes/todos.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { requireAuth } from '../middleware/auth';

// Validation schemas
const createTodoSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional(),
  due_date: z.string().datetime().optional(),
});

const updateTodoSchema = createTodoSchema.partial();

// List todos with filtering and pagination
export async function listTodos(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { completed, limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('todos')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (completed !== undefined) {
      query = query.eq('completed', completed === 'true');
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data,
      pagination: {
        total: count,
        limit: Number(limit),
        offset: Number(offset),
      },
    });
  } catch (error) {
    console.error('List todos error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch todos',
    });
  }
}

// Get single todo
export async function getTodo(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Todo not found',
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Get todo error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch todo',
    });
  }
}

// Create todo
export async function createTodo(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    // Validate input
    const validated = createTodoSchema.parse(req.body);

    const { data, error } = await supabase
      .from('todos')
      .insert({
        ...validated,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        success: false,
        error: 'Validation failed',
        validationErrors: error.errors,
      });
    }

    console.error('Create todo error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create todo',
    });
  }
}

// Update todo
export async function updateTodo(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Validate input
    const validated = updateTodoSchema.parse(req.body);

    const { data, error } = await supabase
      .from('todos')
      .update(validated)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Todo not found',
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        success: false,
        error: 'Validation failed',
        validationErrors: error.errors,
      });
    }

    console.error('Update todo error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update todo',
    });
  }
}

// Delete todo
export async function deleteTodo(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    return res.status(204).send();
  } catch (error) {
    console.error('Delete todo error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete todo',
    });
  }
}
```

### Nested Resources

```typescript
// GET /api/users/:userId/todos
export async function getUserTodos(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    // Check authorization
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
      });
    }

    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Get user todos error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user todos',
    });
  }
}
```

---

## tRPC Type-Safe APIs

### Setup tRPC Router

```typescript
// server/trpc/context.ts
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { supabase } from '../lib/supabase';

export async function createContext({ req, res }: CreateNextContextOptions) {
  // Get user from session
  const token = req.headers.authorization?.replace('Bearer ', '');

  let user = null;
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    user = data.user;
  }

  return {
    req,
    res,
    user,
    supabase,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
```

```typescript
// server/trpc/router.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

// Middleware for authentication
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// Protected procedure
const protectedProcedure = t.procedure.use(isAuthed);

// Todo router
export const todoRouter = t.router({
  list: protectedProcedure
    .input(
      z.object({
        completed: z.boolean().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      let query = ctx.supabase
        .from('todos')
        .select('*', { count: 'exact' })
        .eq('user_id', ctx.user.id)
        .order('created_at', { ascending: false })
        .range(input.offset, input.offset + input.limit - 1);

      if (input.completed !== undefined) {
        query = query.eq('completed', input.completed);
      }

      const { data, error, count } = await query;

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch todos',
        });
      }

      return {
        data,
        pagination: {
          total: count,
          limit: input.limit,
          offset: input.offset,
        },
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(500),
        description: z.string().max(5000).optional(),
        due_date: z.string().datetime().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('todos')
        .insert({
          ...input,
          user_id: ctx.user.id,
        })
        .select()
        .single();

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create todo',
        });
      }

      return data;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(500).optional(),
        description: z.string().max(5000).optional(),
        completed: z.boolean().optional(),
        due_date: z.string().datetime().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      const { data, error } = await ctx.supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', ctx.user.id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Todo not found',
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update todo',
        });
      }

      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('todos')
        .delete()
        .eq('id', input.id)
        .eq('user_id', ctx.user.id);

      if (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete todo',
        });
      }

      return { success: true };
    }),
});

// App router
export const appRouter = t.router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
```

### Client Usage

```typescript
// hooks/useTodos.ts
import { trpc } from '../lib/trpc';

export function useTodos() {
  const utils = trpc.useContext();

  const todos = trpc.todo.list.useQuery({
    completed: false,
    limit: 50,
  });

  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      utils.todo.list.invalidate();
    },
  });

  return {
    todos: todos.data?.data ?? [],
    isLoading: todos.isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
```

---

## Supabase Edge Functions

### Edge Function Structure

```typescript
// supabase/functions/send-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Parse request body
    const payload: NotificationPayload = await req.json();

    // Validate input
    if (!payload.userId || !payload.title || !payload.body) {
      throw new Error('Missing required fields');
    }

    // Check authorization (user can only send to themselves unless admin)
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (user.id !== payload.userId && profile?.role !== 'admin') {
      throw new Error('Forbidden');
    }

    // Send notification (example: store in database)
    const { data, error } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: payload.userId,
        title: payload.title,
        body: payload.body,
        data: payload.data,
      })
      .select()
      .single();

    if (error) throw error;

    // Return success response
    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);

    const status = error.message === 'Unauthorized' ? 401 :
                   error.message === 'Forbidden' ? 403 :
                   error.message.includes('Missing') ? 400 : 500;

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
```

---

## Authentication & Authorization

### JWT Authentication Middleware

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed',
    });
  }
}

// Role-based authorization
export function requireRole(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Not authenticated',
        });
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (!profile || !roles.includes(profile.role)) {
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions',
        });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      return res.status(500).json({
        success: false,
        error: 'Authorization failed',
      });
    }
  };
}
```

---

## Request/Response Patterns

### Standard Response Format

```typescript
// Successful response
{
  "success": true,
  "data": { /* resource data */ },
  "meta": { /* optional metadata */ }
}

// Error response
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": { /* optional error details */ }
}

// Paginated response
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

### Response Utilities

```typescript
// utils/response.ts
import { Response } from 'express';

export function successResponse(
  res: Response,
  data: any,
  status = 200,
  meta?: any
) {
  return res.status(status).json({
    success: true,
    data,
    ...(meta && { meta }),
  });
}

export function errorResponse(
  res: Response,
  message: string,
  status = 500,
  code?: string,
  details?: any
) {
  return res.status(status).json({
    success: false,
    error: message,
    ...(code && { code }),
    ...(details && { details }),
  });
}

export function paginatedResponse(
  res: Response,
  data: any[],
  total: number,
  limit: number,
  offset: number
) {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    },
  });
}
```

---

## Error Handling

See [Security Implementation Guide](./SECURITY_IMPLEMENTATION.md#api-security) for comprehensive error handling patterns.

---

## API Versioning

### URL Versioning

```typescript
// v1 routes
app.use('/api/v1', v1Router);

// v2 routes
app.use('/api/v2', v2Router);
```

### Header Versioning

```typescript
app.use((req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});
```

---

## Rate Limiting

See [Security Implementation Guide](./SECURITY_IMPLEMENTATION.md#api-security) for rate limiting implementation.

---

## API Documentation

### OpenAPI/Swagger

```typescript
// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Complete API reference',
    },
    servers: [
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
```

### JSDoc Comments

```typescript
/**
 * @openapi
 * /api/todos:
 *   get:
 *     summary: List all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 */
```

---

## Testing APIs

### Unit Tests

```typescript
// __tests__/api/todos.test.ts
import request from 'supertest';
import { app } from '../src/app';
import { supabase } from '../src/lib/supabase';

describe('Todos API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Create test user and get token
    const { data } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password',
    });
    authToken = data.session.access_token;
  });

  describe('POST /api/todos', () => {
    it('should create a todo', async () => {
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test todo',
          description: 'Test description',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Test todo');
    });

    it('should return 401 without auth', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({
          title: 'Test todo',
        });

      expect(response.status).toBe(401);
    });

    it('should return 422 for invalid input', async () => {
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '', // Invalid: empty title
        });

      expect(response.status).toBe(422);
    });
  });
});
```

---

**Next Steps:**
1. Choose your API architecture (REST, tRPC, or Edge Functions)
2. Implement authentication and authorization
3. Set up validation with Zod
4. Add comprehensive error handling
5. Implement rate limiting
6. Write API documentation
7. Add automated tests
