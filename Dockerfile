COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

EXPOSE 3005

CMD ["node", "dist/src/app.js"]