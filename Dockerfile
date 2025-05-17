FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app /app
CMD ["node", "dist/main"]