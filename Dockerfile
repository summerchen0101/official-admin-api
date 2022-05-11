FROM node:17

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN yarn
RUN npx prisma generate

# RUN yarn build

CMD [ "yarn", "start" ]
