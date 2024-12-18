FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN chown -R node:node /app

USER node

RUN npm i --production

RUN npm install --save-dev @types/cors

COPY .  .

EXPOSE 3000

CMD ["npm","start"]
