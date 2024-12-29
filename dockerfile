FROM node:16 as app_node_deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM app_node_deps as build
RUN npm run build

FROM build AS app
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]

FROM app_node_deps as run_tests
CMD ["npm", "run", "test:cart"]