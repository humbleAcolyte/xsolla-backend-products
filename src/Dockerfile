FROM node:carbon

WORKDIR /api

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY api /api

COPY wait-for-it.sh /api/wait-for-it.sh

EXPOSE 3000
CMD ["nodemon", "index.js"]