# Build
FROM node:22-alpine AS builder

# Activar corepack (ya viene con Node 22, pero lo dejamos explícito)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar dependencias primero (mejor cacheo)
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del proyecto
COPY . .

# Ajuste de memoria (opcional, puedes subirlo si build falla)
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Build
RUN pnpm build

# Serve
FROM nginx:alpine AS runner

# Copiar build generado
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración nginx
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    error_page 404 /404.html; \
    location / { \
        try_files $uri $uri/ =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
