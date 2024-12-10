FROM node:22-alpine3.20

RUN apk update && apk add bash && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN rm -rf package-lock.json && npm install
RUN npm install formik

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]