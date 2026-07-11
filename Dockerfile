FROM node:22-alpine

WORKDIR /workspace

COPY package.json ./
COPY package-lock.json ./
COPY apps/mobile/package.json ./apps/mobile/package.json
RUN npm ci

COPY apps/mobile ./apps/mobile

EXPOSE 8081 19000 19001 19002

CMD ["npm", "start", "--", "--lan"]
