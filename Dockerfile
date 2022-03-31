FROM node:17.8.0-alpine3.14
EXPOSE 3000 5432
WORKDIR /app
COPY . .
RUN yarn install
CMD [“yarn”, “start”]
