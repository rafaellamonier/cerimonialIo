# Bug Fix Documentation

Registro de problemas encontrados e suas soluções para evitar retrabalho.

---

## [Docker] Banco de dados errado sendo acessado / DB_NAME ignorado

**Data:** 18/05/2026

### Caso de uso

Ambiente com dois projetos de back-end rodando simultaneamente, cada um com seu próprio container PostgreSQL via `docker-compose.yml`.

### Problema

O container de um dos projetos estava acessando o banco de dados errado — o banco criado pelo primeiro container que subiu — ignorando o `POSTGRES_DB` definido no `docker-compose.yml` do segundo projeto.

Após investigação, o problema tinha duas causas:

1. **Volume reutilizado:** O PostgreSQL só inicializa o banco (e respeita as variáveis `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`) quando o diretório de dados está vazio. Se um volume já existia com dados de outro projeto, o Postgres subia com os dados antigos e ignorava as variáveis de ambiente.

2. **Porta incorreta no `.env`:** A aplicação estava tentando conectar na porta `5433`, mas o `docker-compose.yml` mapeava a porta `5435:5432` — ou seja, a porta exposta no host era `5435`. Isso fazia a conexão cair em outro serviço Postgres que rodava na porta errada.

### Solução

**1. Usar volumes nomeados e únicos por projeto no `docker-compose.yml`:**

```yaml
services:
  postgres:
    image: postgres:16
    container_name: postgres_cerimonialIo
    volumes:
      - postgres_data_cerimonialIo:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: backend_cerimonialIo
    ports:
      - "5435:5432"

volumes:
  postgres_data_cerimonialIo:
```

**2. Garantir que o `DB_PORT` no `.env` aponta para a porta do host (lado esquerdo do mapeamento):**

```env
DB_HOST=127.0.0.1
DB_PORT=5435   # porta do host, não a interna do container (5432)
DB_NAME=backend_cerimonialIo
```

**3. Se o volume já estiver corrompido/errado, recriar do zero:**

```bash
docker compose down -v   # remove containers e volumes
docker compose up -d     # sobe novamente inicializando o banco corretamente
```

> **Atenção:** `down -v` apaga todos os dados do banco. Usar apenas em ambiente de desenvolvimento.

### Como verificar o banco dentro do container

```bash
docker exec -it postgres_cerimonialIo psql -U admin
\l    # lista todos os bancos
\q    # sai do psql
```

---

## [Node] Servidor não responde / rota fica carregando sem erro

**Data:** 18/05/2026

### Problema

Requisição HTTP fica carregando indefinidamente e o terminal não exibe nenhum erro. Causa: um processo Node.js de uma execução anterior ainda está ocupando a porta.

### Solução

**0. Verificar se a porta está ocupada**
```bash
nc -zv <host> <port>
```

**1. Identificar o processo na porta:**
```bash
lsof -i :3333
```

**2. Matar o processo com o PID retornado:**
```bash
kill -9 <PID>
```

**3. Reiniciar o servidor normalmente.**

---
