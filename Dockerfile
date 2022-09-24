FROM node:lts-alpine

RUN mkdir /neesilo-backend
WORKDIR /neesilo-backend

COPY package.json .

RUN npm install

COPY . .
EXPOSE 80
CMD ["node", "./bootstrap.js"]