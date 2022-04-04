FROM node:17.8.0-alpine3.14
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn","start"]
