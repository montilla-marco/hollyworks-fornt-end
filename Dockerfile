#base layer
FROM node:19-alpine3.17 AS base
RUN SYS_MAJ_VER=$( grep '^VERSION' /etc/os-release|awk -F= '{ print $2 }'|awk -F. '{ print($1"."$2) }') \
        && echo "http://dl-3.alpinelinux.org/alpine/v$SYS_MAJ_VER/community/" > /etc/apk/repositories \
    && echo "http://dl-3.alpinelinux.org/alpine/v$SYS_MAJ_VER/main/" >> /etc/apk/repositories \
    && apk update && apk upgrade && apk --no-cache add \
    tini \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

WORKDIR /root/app
ENTRYPOINT ["/sbin/tini", "--"]

#dependencies
FROM base AS dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm set progress false \
    && npm config set depth 0 \
    && npm config set strict-ssl false
RUN npm install --loglevel verbose

#code
FROM dependencies AS build
COPY . .

# start app
CMD ["npm", "start"]