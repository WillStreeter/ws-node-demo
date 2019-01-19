FROM willsonic/ws-node-alpine:v10.15.0

ENV PATH $PATH:/usr/lib/node_modules/bin


RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install --prefix /usr/lib/node_modules/ -g typescript    && \
    npm install tsd -g && \
    npm install typescript -g  && \
    npm install tsoa -g


COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install
