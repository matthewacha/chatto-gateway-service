FROM node

WORKDIR /src

COPY . /src

RUN $CLOUDAMQP_URL >> /etc/environment

RUN yarn install

COPY . /src

EXPOSE 7070

CMD yarn start
