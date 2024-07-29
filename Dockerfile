FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]