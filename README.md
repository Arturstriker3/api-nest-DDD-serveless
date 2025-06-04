# Recipe API

API para gerenciamento de receitas implementada com NestJS seguindo Clean Architecture.

## Arquitetura

A aplicação segue os princípios da Clean Architecture com separação clara das responsabilidades:

- **Domain**: Contém as entidades e interfaces de repositório
- **Application**: Use cases e DTOs
- **Infrastructure**: Implementações concretas (repositório em memória)
- **Presentation**: Controllers e presenters

## Estrutura de Diretórios

```
src/
├── domain/
│   ├── entities/
│   │   └── recipe.entity.ts
│   └── repositories/
│       └── recipe.repository.ts
├── application/
│   ├── use-cases/
│   │   ├── create-recipe.use-case.ts
│   │   ├── get-all-recipes.use-case.ts
│   │   ├── get-recipe-by-id.use-case.ts
│   │   └── get-recipes-paginated.use-case.ts
│   └── dtos/
│       ├── create-recipe.dto.ts
│       ├── recipe.dto.ts
│       ├── recipe-filter.dto.ts
│       ├── pagination.dto.ts
│       ├── paginated-response.dto.ts
│       └── paginated-recipe-response.dto.ts
├── infrastructure/
│   └── repositories/
│       └── recipe-memory.repository.ts
├── presentation/
│   ├── controllers/
│   │   └── recipe.controller.ts
│   └── presenters/
│       └── recipe.presenter.ts
├── app.module.ts
└── main.ts
```

## Instalação

```bash
pnpm install
```

## Executar a aplicação

```bash
# Desenvolvimento
pnpm start:dev

# Produção
pnpm build
pnpm start:prod
```

A aplicação estará disponível em:

- **API**: http://localhost:3000/api
- **Documentação Swagger**: http://localhost:3000/api/docs

## Endpoints da API

### Criar Receita

```http
POST /api/recipes
Content-Type: application/json

{
  "title": "Bolo de Chocolate",
  "description": "Um delicioso bolo de chocolate",
  "ingredients": ["chocolate", "farinha", "ovos", "açúcar"]
}
```

### Listar Todas as Receitas (sem paginação)

```http
GET /api/recipes
```

### Buscar Receitas com Paginação e Filtros

```http
GET /api/recipes/search?page=1&limit=10&title=chocolate&ingredient=farinha
```

**Parâmetros de Query:**

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10, máximo: 100)
- `title` (opcional): Filtrar por título (busca parcial)
- `description` (opcional): Filtrar por descrição (busca parcial)
- `ingredient` (opcional): Filtrar por ingrediente (busca parcial)

### Buscar Receita por ID

```http
GET /api/recipes/:id
```

## Exemplos de Resposta

### Receita Individual

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Bolo de Chocolate",
  "description": "Um delicioso bolo de chocolate",
  "ingredients": ["chocolate", "farinha", "ovos", "açúcar"],
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

### Resposta Paginada

```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Bolo de Chocolate",
      "description": "Um delicioso bolo de chocolate",
      "ingredients": ["chocolate", "farinha", "ovos", "açúcar"],
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Funcionalidades de Paginação e Filtros

### Paginação Genérica

- Sistema de paginação reutilizável para todas as entidades
- Metadados completos (página atual, total de páginas, navegação)
- Validação de parâmetros (página mínima 1, limite máximo 100)

### Filtros Dinâmicos

- **Título**: Busca parcial no título da receita
- **Descrição**: Busca parcial na descrição
- **Ingrediente**: Busca parcial em qualquer ingrediente
- Todos os filtros são case-insensitive
- Combinação de múltiplos filtros (AND)

### Exemplos de Uso

```bash
# Página 2 com 5 itens por página
GET /api/recipes/search?page=2&limit=5

# Filtrar receitas com "chocolate" no título
GET /api/recipes/search?title=chocolate

# Buscar receitas que contenham "farinha" nos ingredientes
GET /api/recipes/search?ingredient=farinha

# Combinação de filtros
GET /api/recipes/search?title=bolo&ingredient=chocolate&page=1&limit=10
```

## Documentação Swagger

A documentação interativa da API está disponível em:
**http://localhost:3000/api/docs**

Através do Swagger você pode:

- Visualizar todos os endpoints disponíveis
- Testar as requisições diretamente na interface
- Ver exemplos de requisição e resposta
- Consultar a documentação completa dos DTOs
- Testar paginação e filtros interativamente

## Tecnologias Utilizadas

- NestJS
- TypeScript
- Class-validator
- UUID
- Swagger/OpenAPI
- Clean Architecture
- PNPM

## Funcionalidades

- ✅ Criar receita
- ✅ Listar todas as receitas
- ✅ Buscar receita por ID
- ✅ **Busca paginada com filtros**
- ✅ **Sistema de paginação genérico**
- ✅ **Filtros por título, descrição e ingredientes**
- ✅ Validação de dados com class-validator
- ✅ Documentação automática com Swagger
- ✅ Arquitetura limpa e escalável
- ✅ Repositório em memória
- ✅ Prefixo global `/api` para todas as rotas
