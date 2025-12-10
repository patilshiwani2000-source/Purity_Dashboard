FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

# Production Stage
FROM node:20-alpine
WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/build ./build

EXPOSE 3001

CMD ["serve", "-s", "build", "-l", "3001"]
