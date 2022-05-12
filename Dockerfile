FROM node:17

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
COPY .env.production ./.env
RUN rm .env.production

# RUN yarn build

CMD [ "yarn", "start" ]
