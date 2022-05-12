FROM node:17

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY prisma ./prisma/
RUN npx prisma generate
COPY . .

# RUN yarn build

CMD [ "yarn", "start" ]
