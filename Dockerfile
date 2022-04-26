FROM node:17.8.0-alpine3.14
WORKDIR /
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn","dev"]
