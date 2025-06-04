# Stage 1: Build
FROM node:18-alpine AS builder

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (para cache)
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências (incluindo devDependencies para build)
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Remover devDependencies após build
RUN pnpm prune --prod

# Stage 2: Production
FROM node:18-alpine AS production

# Instalar apenas wget para health check
RUN apk add --no-cache wget

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json com ownership correto
COPY --chown=nestjs:nodejs package.json ./

# Copiar node_modules otimizados do stage anterior com ownership correto
COPY --chown=nestjs:nodejs --from=builder /app/node_modules ./node_modules

# Copiar build da aplicação com ownership correto
COPY --chown=nestjs:nodejs --from=builder /app/dist ./dist

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"] 