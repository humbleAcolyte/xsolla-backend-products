FROM node:carbon

WORKDIR /api

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY api /api

EXPOSE 3000
CMD ["nodemon", "index.js"]