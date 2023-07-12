# Tickets Backend

To generate the image, first, run the following command:

    docker build -t tickets-backend .

To start a container, run the following command:

    docker run --name server1 -p 3000:3000 tickets-backend

Please note that the port 3000 is used in this example. If necessary, you can change the port (including in the frontend).

## Tests
To run the tests, make sure you have [Node.js](https://nodejs.org/) installed, then execute the following command:

    npx jest

This will run the tests using [Jest](https://jestjs.io/).