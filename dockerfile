FROM node:20

WORKDIR /INNOSCRIPTA_TASK

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev" ]