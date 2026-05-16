# Project Folder Structure
.
├── app.ts
├── config
│   └── data-source.ts
├── controller
│   ├── supplier
│   │   ├── CreateSupplierController.ts
│   │   ├── DeleteSupplierController.ts
│   │   ├── ListSupplierController.ts
│   │   └── UpdateSupplierStatusController.ts
│   ├── user
│   │   ├── CreateUserController.ts
│   │   ├── LoginUserController.ts
│   │   └── ProfileController.ts
│   └── wedding
│       ├── CreateWeddingController.ts
│       └── GetWeddingController.ts
├── database
│   └── migrations
├── entities
│   ├── Supplier.ts
│   ├── User.ts
│   └── Wedding.ts
├── errors
│   └── AppError.ts
├── middlewares
│   ├── authMiddleware.ts
│   └── errorMiddleware.ts
├── repositories
│   ├── supplier
│   │   └── SupplierRepository.ts
│   ├── user
│   │   └── UserRepository.ts
│   └── wedding
│       └── WeddingRepository.ts
├── routes
│   ├── supplier.routes.ts
│   ├── user.routes.ts
│   └── wedding.routes.ts
├── schemas
│   ├── supplier
│   │   ├── createSupplierSchema.ts
│   │   └── updateSupplierStatusSchema.ts
│   ├── user
│   │   ├── createUserSchema.ts
│   │   └── loginUserSchema.ts
│   └── wedding
│       └── createWeddingSchema.ts
├── server.ts
├── services
│   ├── supplier
│   │   ├── CreateSupplierService.ts
│   │   ├── DeleteSupplierService.ts
│   │   ├── ListSuppliersService.ts
│   │   └── UpdateSupplierStatusService.ts
│   ├── user
│   │   ├── CreateUserService.ts
│   │   └── LoginUserService.ts
│   └── wedding
│       ├── CreateWeddingService.ts
│       └── GetWeddingService.ts
├── teste.md
└── @types
    └── express
        └── index.d.ts
25 directories, 39 files

---

## API Routes - rotaUsers

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

**Exemplo de payload**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
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

**Exemplo de payload**

```json
{
  "email": "john@example.com",
  "password": "secret123"
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

---

## API Routes - rotaWeddings

Base URL: `/weddings`

---

### POST /weddings

Cria um casamento vinculado ao usuário autenticado. Requer autenticação via JWT.

**Headers**

```
Authorization: Bearer <token>
```

**Request Body**

```json
{
  "couple_name": "string (mínimo 3 caracteres)",
  "wedding_date": "string (data em formato ISO, ex: 2027-06-15)",
  "budget": "number (positivo)"
}
```

**Exemplo de payload**

```json
{
  "couple_name": "John & Jane",
  "wedding_date": "2027-06-15",
  "budget": 15000
}
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `201 Created` | Casamento criado com sucesso. Retorna o objeto do casamento. |
| `400 Bad Request` | Falha na validação dos campos. |
| `401 Unauthorized` | Token ausente ou inválido. |
| `409 Conflict` | Usuário já possui um casamento cadastrado. |

**Exemplo de resposta (201)**

```json
{
  "id": "uuid",
  "couple_name": "John & Jane",
  "wedding_date": "2027-06-15",
  "budget": "15000.00",
  "user_id": "uuid",
  "created_at": "2026-05-16T00:00:00.000Z",
  "updated_at": "2026-05-16T00:00:00.000Z"
}
```

---

### GET /weddings/me

Retorna o casamento do usuário autenticado. Requer autenticação via JWT.

**Headers**

```
Authorization: Bearer <token>
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `200 OK` | Retorna os dados do casamento do usuário. |
| `401 Unauthorized` | Token ausente ou inválido. |
| `404 Not Found` | Nenhum casamento encontrado para o usuário. |

**Exemplo de resposta (200)**

```json
{
  "id": "uuid",
  "couple_name": "John & Jane",
  "wedding_date": "2027-06-15",
  "budget": "15000.00",
  "user_id": "uuid",
  "created_at": "2026-05-16T00:00:00.000Z",
  "updated_at": "2026-05-16T00:00:00.000Z"
}
```

---

## API Routes - rotaSuppliers

Base URL: `/suppliers`

> Todas as rotas de fornecedor requerem autenticação via JWT. O fornecedor é automaticamente vinculado ao casamento do usuário autenticado.

---

### POST /suppliers

Cria um novo fornecedor vinculado ao casamento do usuário autenticado.

**Headers**

```
Authorization: Bearer <token>
```

**Request Body**

```json
{
  "name": "string (mínimo 1 caractere)",
  "category": "string (mínimo 1 caractere)",
  "value": "number | null",
  "status": "\"pending\" | \"negotiating\" | \"hired\""
}
```

**Exemplo de payload**

```json
{
  "name": "Buffet Sabor & Arte",
  "category": "Buffet",
  "value": 8500,
  "status": "negotiating"
}
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `201 Created` | Fornecedor criado com sucesso. Retorna o objeto do fornecedor. |
| `400 Bad Request` | Falha na validação dos campos. |
| `401 Unauthorized` | Token ausente ou inválido. |
| `404 Not Found` | Nenhum casamento encontrado para o usuário. |

**Exemplo de resposta (201)**

```json
{
  "id": "uuid",
  "name": "Buffet Sabor & Arte",
  "category": "Buffet",
  "value": "8500.00",
  "status": "negotiating",
  "wedding_id": "uuid",
  "created_at": "2026-05-16T00:00:00.000Z",
  "updated_at": "2026-05-16T00:00:00.000Z"
}
```

---

### GET /suppliers

Lista todos os fornecedores do casamento do usuário autenticado, ordenados por data de criação decrescente.

**Headers**

```
Authorization: Bearer <token>
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `200 OK` | Retorna a lista de fornecedores. |
| `401 Unauthorized` | Token ausente ou inválido. |
| `404 Not Found` | Nenhum casamento encontrado para o usuário. |

**Exemplo de resposta (200)**

```json
[
  {
    "id": "uuid",
    "name": "Buffet Sabor & Arte",
    "category": "Buffet",
    "value": "8500.00",
    "status": "negotiating",
    "wedding_id": "uuid",
    "created_at": "2026-05-16T00:00:00.000Z",
    "updated_at": "2026-05-16T00:00:00.000Z"
  }
]
```

---

### PATCH /suppliers/:id/status

Atualiza o status de um fornecedor específico.

**Headers**

```
Authorization: Bearer <token>
```

**URL Params**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | `uuid` | ID do fornecedor |

**Request Body**

```json
{
  "status": "\"pending\" | \"negotiating\" | \"hired\""
}
```

**Exemplo de payload**

```json
{
  "status": "hired"
}
```

**Responses**

| Status | Descrição |
|--------|-----------|
| `200 OK` | Status atualizado com sucesso. Retorna o fornecedor atualizado. |
| `400 Bad Request` | Falha na validação do campo status. |
| `401 Unauthorized` | Token ausente ou inválido. |
| `404 Not Found` | Fornecedor não encontrado. |

---

### DELETE /suppliers/:id

Remove um fornecedor específico.

**Headers**

```
Authorization: Bearer <token>
```

**URL Params**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `id` | `uuid` | ID do fornecedor |

**Responses**

| Status | Descrição |
|--------|-----------|
| `204 No Content` | Fornecedor deletado com sucesso. |
| `401 Unauthorized` | Token ausente ou inválido. |
| `404 Not Found` | Fornecedor não encontrado. |
