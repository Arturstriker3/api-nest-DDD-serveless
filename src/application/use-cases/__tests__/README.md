# Testes Unitários dos Use Cases

## Visão Geral

Esta pasta contém testes unitários abrangentes para todos os use cases da aplicação, seguindo as melhores práticas de teste e Clean Architecture.

## Estrutura dos Testes

### ✅ **CreateRecipeUseCase**

- **Arquivo**: `create-recipe.use-case.spec.ts`
- **Cenários**: 4 testes
- **Cobertura**: 100%

**Testes implementados:**

- ✅ Criação e salvamento bem-sucedido de receita
- ✅ Geração de ID único para cada receita
- ✅ Configuração correta de datas (createdAt/updatedAt)
- ✅ Tratamento de erro quando repositório falha

### ✅ **GetAllRecipesUseCase**

- **Arquivo**: `get-all-recipes.use-case.spec.ts`
- **Cenários**: 5 testes
- **Cobertura**: 100%

**Testes implementados:**

- ✅ Retorno de todas as receitas
- ✅ Retorno de array vazio quando não há receitas
- ✅ Retorno de receita única
- ✅ Tratamento de erro do repositório
- ✅ Verificação de não chamada de outros métodos

### ✅ **GetRecipeByIdUseCase**

- **Arquivo**: `get-recipe-by-id.use-case.spec.ts`
- **Cenários**: 6 testes
- **Cobertura**: 100%

**Testes implementados:**

- ✅ Retorno de receita quando encontrada
- ✅ Lançamento de NotFoundException quando não encontrada
- ✅ Tratamento de ID string vazio
- ✅ Tratamento de erro do repositório
- ✅ Verificação de não chamada de outros métodos
- ✅ Tratamento de caracteres especiais no ID

### ✅ **GetRecipesPaginatedUseCase**

- **Arquivo**: `get-recipes-paginated.use-case.spec.ts`
- **Cenários**: 10 testes
- **Cobertura**: 100%

**Testes implementados:**

- ✅ Paginação padrão
- ✅ Aplicação de filtros quando fornecidos
- ✅ Não inclusão de filtros quando não fornecidos
- ✅ Inclusão de filtros apenas para valores fornecidos
- ✅ Tratamento correto de valores de filtro vazios
- ✅ Tratamento de números de página grandes
- ✅ Tratamento de erro do repositório
- ✅ Verificação de não chamada de outros métodos
- ✅ Detecção quando filtros são fornecidos
- ✅ Detecção quando filtros não são fornecidos

## Padrões Utilizados

### **Arrange-Act-Assert (AAA)**

Todos os testes seguem o padrão AAA para clareza:

```typescript
// Arrange
const input = createTestData();
mockRepository.method.mockResolvedValue(expectedResult);

// Act
const result = await useCase.execute(input);

// Assert
expect(result).toEqual(expectedResult);
```

### **Mocks e Isolamento**

- Todos os repositórios são mockados usando `jest.Mocked<T>`
- Testes isolados sem dependências externas
- Verificação de chamadas de métodos específicos

### **Guard Clauses**

- Testes de validação de entrada
- Verificação de comportamento em cenários de erro
- Tratamento de edge cases

### **Factory Functions**

- Uso de funções auxiliares para criação de DTOs
- Redução de código duplicado
- Facilitação de manutenção

## Comandos de Teste

```bash
# Executar todos os testes
pnpm test

# Executar com watch mode
pnpm test:watch

# Executar com cobertura
pnpm test:cov

# Executar testes específicos
pnpm test create-recipe
pnpm test get-all-recipes
pnpm test get-recipe-by-id
pnpm test get-recipes-paginated
```

## Relatório de Cobertura

### **Use Cases: 100% de Cobertura**

- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

### **Benefícios dos Testes**

- ✅ Garantia de funcionamento correto
- ✅ Prevenção de regressões
- ✅ Documentação viva do comportamento
- ✅ Facilita refatoração segura
- ✅ Detecta problemas cedo no desenvolvimento

## Melhores Práticas Implementadas

1. **Testes Descritivos**: Nomes claros que explicam o que está sendo testado
2. **Cenários Realistas**: Testes com dados e situações do mundo real
3. **Edge Cases**: Cobertura de casos extremos e de erro
4. **Isolamento**: Cada teste é independente e pode ser executado sozinho
5. **Performance**: Testes rápidos usando mocks adequados
6. **Manutenibilidade**: Código de teste limpo e bem organizado
