# Project Folder Structure
.
├── app.ts
├── config
│   └── data-source.ts
├── controller
│   └── user
│       ├── CreateUserController.ts
│       ├── LoginUserController.ts
│       └── ProfileController.ts
├── database
│   └── migrations
├── entities
│   └── User.ts
├── errors
│   └── AppError.ts
├── middlewares
│   ├── authMiddleware.ts
│   └── errorMiddleware.ts
├── repositories
│   └── user
│       └── UserRepository.ts
├── routes
│   └── user.routes.ts
├── schemas
│   └── user
│       ├── createUserSchema.ts
│       └── loginUserSchema.ts
├── server.ts
├── services
│   └── user
│       ├── CreateUserService.ts
│       └── LoginUserService.ts
└── @types
    └── express
        └── index.d.ts
17 directories, 17 files

---

## API Routes

Base URL: `/users`

---

### POST /users/register

Cria um novo usuário.

**Request Body**

```json
{
  "name": "string (mínimo 3 caracteres)",
  "email": "string (email válido)",
  "password": "string (mínimo 6 caracteres)"
}
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `201 Created` | Usuário criado com sucesso. Retorna o objeto do usuário. |
| `400 Bad Request` | Falha na validação dos campos. |
| `409 Conflict` | Email já está em uso. |

**Exemplo de resposta (201)**

```json
{
  "id": "uuid",
  "sequence_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-05-16T00:00:00.000Z",
  "updated_at": "2026-05-16T00:00:00.000Z"
}
```

---

### POST /users/login

Autentica um usuário e retorna um token JWT.

**Request Body**

```json
{
  "name": "string",
  "email": "string (email válido)",
  "password": "string"
}
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `200 OK` | Login realizado com sucesso. Retorna token e dados do usuário. |
| `400 Bad Request` | Falha na validação dos campos. |
| `401 Unauthorized` | Email ou senha inválidos. |

**Exemplo de resposta (200)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-05-16T00:00:00.000Z",
    "updated_at": "2026-05-16T00:00:00.000Z"
  }
}
```

---

### GET /users/profile

Retorna os dados do usuário autenticado. Requer autenticação via JWT.

**Headers**

```
Authorization: Bearer <token>
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `200 OK` | Dados do usuário autenticado. |
| `401 Unauthorized` | Token ausente ou inválido. |

**Exemplo de resposta (200)**

```json
{
  "message": "Authenticated user",
  "user": {
    "id": "uuid",
    "sequence_id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

> O objeto `user` nesta rota é extraído do payload do JWT.
