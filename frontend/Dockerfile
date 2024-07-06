FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD if [ "$$NODE_ENV" = "production" ] ; then npm run build && npm run preview ; else npm run dev ; fi
