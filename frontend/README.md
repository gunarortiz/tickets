# Tickets Frontend

To generate the image, first, run the following command:

    docker build -t tickets-frontend .

To start a container, run the following command:

    docker run -d -p 3001:3000 tickets-frontend

Please note that the port 3001 is used in this example. 

Please note that the backend's expected endpoint is localhost:3000. If necessary, you can modify it by adjusting line 11 in the src/api/api.ts file.

Once the container is running, you can access the backend at `localhost:3001`.

## Tests
To run the tests, make sure you have [Node.js](https://nodejs.org/) installed, then execute the following command:

    npm test

This will run the tests using [Jest](https://jestjs.io/).