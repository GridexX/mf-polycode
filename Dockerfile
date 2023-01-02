FROM node:16-alpine
COPY . .
RUN npm ci
ENTRYPOINT ["npm", "run", "dev"]