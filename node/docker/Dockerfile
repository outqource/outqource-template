FROM node:17
#projectName
WORKDIR /usr/app/projectName

ADD . /usr/app/projectName/

COPY package*.json ./

RUN yarn

RUN yarn add bcrypt

COPY . /usr/app/projectName/

EXPOSE 8000

RUN npm install -g pm2

RUN yarn migrate:dev

CMD ["yarn", "dev"]