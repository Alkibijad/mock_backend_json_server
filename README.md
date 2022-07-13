Steps:

created npx create react app
install npm install json-server

u json file create a script:
    "server":"json-server --watch db.json --port 5000"

    server runs on 3000 but this is a backend so we told him to run on 5000


to run  frontend and backend in the same time using one command install following: 
npm install concurrently ( install localy in the project not using -g)
then: 
in the sctipt file add a script:
    "dev": "concurrently \"npm run server\" \"npm start\""

to run both backend and front end use: npm run dev

