# bkk-drug-be-test

1. npm install
2. run docker compose
    - run `docker compose up -d`
    - if can't connect mongodb run `docker compose down`
    - run command with terminal `docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 -v mongo-data:/data/db mongo:latest`
3. connect mongodb compass with mongodb uri: `mongodb://admin:password@localhost:27017/?authSource=admin`
4. create database name `bkk_drug` and import json file `site-list-with-stock.json` collection name `branches`
5. create index collection `branches` field `location` select type `2dsphere`
6. npm run start:dev
7. download extension vscode `REST Client`
8. try `Send Request` in file `rest-client.http`