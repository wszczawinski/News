# Build stage
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm run build

# Production stage with nginx
FROM nginx:1.25-alpine

# Install wget for health check
RUN apk add --no-cache wget

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built admin app
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=60s --timeout=10s --retries=3 \
    CMD wget -q --spider http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
