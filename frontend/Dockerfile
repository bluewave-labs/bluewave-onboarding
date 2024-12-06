FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --platform=linux --arch=x64 --include=optional

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]