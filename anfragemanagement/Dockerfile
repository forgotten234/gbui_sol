FROM node:15
WORKDIR /app/anfragemanagement
COPY package.json .
RUN npm install
COPY . ./
CMD ["node", "app.js"]
