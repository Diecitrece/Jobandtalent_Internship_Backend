FROM node:17.8.0-alpine3.14
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn","dev"]
