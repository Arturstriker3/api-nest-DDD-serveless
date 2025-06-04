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
│   │   ├── get-recipes-paginated.use-case.ts
│   │   └── __tests__/
│   │       ├── create-recipe.use-case.spec.ts
│   │       ├── get-all-recipes.use-case.spec.ts
│   │       ├── get-recipe-by-id.use-case.spec.ts
│   │       ├── get-recipes-paginated.use-case.spec.ts
│   │       └── README.md
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

### Método 1: Desenvolvimento Local

```bash
pnpm install
```

### Método 2: Docker (Recomendado)

```bash
# Usar Docker Compose (mais fácil)
docker-compose up --build

# Ou construir manualmente
docker build -t recipe-api .
docker run -p 3000:3000 recipe-api
```

## Executar a aplicação

### Desenvolvimento Local

```bash
# Desenvolvimento
pnpm start:dev

# Produção
pnpm build
pnpm start:prod
```

### Docker

```bash
# Desenvolvimento com Docker
pnpm docker:dev
# ou
docker-compose up --build

# Produção com Docker (background)
pnpm docker:prod
# ou
docker-compose up -d --build

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f recipe-api
```

## 🐳 Docker

### Características da Imagem Docker

- ✅ **Multi-stage build** para otimização de tamanho
- ✅ **Alpine Linux** como base (imagem ~50MB)
- ✅ **Usuário não-root** para segurança
- ✅ **Health check** configurado
- ✅ **Cache otimizado** de dependências
- ✅ **Produção-ready**

### Scripts Docker Disponíveis

```bash
# Construir imagem
pnpm docker:build

# Executar container
pnpm docker:run

# Desenvolvimento com hot-reload
pnpm docker:dev

# Produção (background)
pnpm docker:prod
```

### Comandos Docker Manuais

```bash
# Construir imagem
docker build -t recipe-api .

# Executar container
docker run -p 3000:3000 recipe-api

# Executar em background
docker run -d -p 3000:3000 --name recipe-api recipe-api

# Ver logs
docker logs -f recipe-api

# Parar container
docker stop recipe-api

# Remover container
docker rm recipe-api

# Ver informações da imagem
docker images recipe-api
```

### Otimizações Implementadas

1. **Multi-stage build**: Separa build de produção
2. **Alpine Linux**: Base mínima (~5MB)
3. **.dockerignore**: Exclui arquivos desnecessários
4. **Cache de dependências**: Otimiza rebuilds
5. **Usuário não-root**: Melhora segurança
6. **Health check**: Monitora saúde do container

A aplicação estará disponível em:

- **API**: http://localhost:3000/api
- **Documentação Swagger**: http://localhost:3000/api/docs

## Testes

### Executar Testes

```bash
# Executar todos os testes
pnpm test

# Executar com watch mode
pnpm test:watch

# Executar com cobertura
pnpm test:cov
```

### Cobertura de Testes

- ✅ **Use Cases**: 100% de cobertura
- ✅ **25 testes unitários** implementados
- ✅ **Padrão AAA** (Arrange-Act-Assert)
- ✅ **Mocks isolados** para todos os repositórios
- ✅ **Guard clauses** e edge cases cobertos

**Arquivos de teste:**

- `create-recipe.use-case.spec.ts` - 4 testes
- `get-all-recipes.use-case.spec.ts` - 5 testes
- `get-recipe-by-id.use-case.spec.ts` - 6 testes
- `get-recipes-paginated.use-case.spec.ts` - 10 testes

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
- Jest (Testes)
- Docker
- Clean Architecture
- PNPM

## Funcionalidades

- ✅ Criar receita
- ✅ Listar todas as receitas
- ✅ Buscar receita por ID
- ✅ **Busca paginada com filtros**
- ✅ **Sistema de paginação genérico**
- ✅ **Filtros por título, descrição e ingredientes**
- ✅ **Testes unitários completos (100% cobertura use cases)**
- ✅ **Docker otimizado com multi-stage build**
- ✅ **Acesso por rede local (multi-dispositivo)**
- ✅ Validação de dados com class-validator
- ✅ Documentação automática com Swagger
- ✅ Arquitetura limpa e escalável
- ✅ Repositório em memória
- ✅ Prefixo global `/api` para todas as rotas
