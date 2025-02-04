FROM node:lts-alpine3.19

WORKDIR /app

RUN apk add --no-cache tzdata

COPY package*.json ./

RUN npm install

ARG NODE_ENV
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_BASE_URL

COPY . .

RUN npm run build && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

RUN mkdir -p /app/.next/cache/images && \
    chown -R nextjs:node /app/.next


USER nextjs

EXPOSE 3000

CMD ["npm", "start"]