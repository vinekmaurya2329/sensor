const net = require('net');
const express = require('express');
require('dotenv').config();
const sensorModel = require('./sensorModel');
const db = require('./db');

const app = express();
const httpPort = process.env.HTTP_PORT || 3000; // Port for HTTP server
const tcpPort = process.env.TCP_PORT || 8080;   // Port for TCP server

// Define your TCP server
const server = net.createServer((socket) => {
    console.log('Sensor connected.');

    // Event when data is received from the sensor
    socket.on('data', async (data) => {
        const sensorData = data.toString(); // Convert data to string
        console.log('Received data from sensor:', sensorData);

        // Parse the data to extract parking information
        await sensorModel.create({ sensorData });
    });

    // Event when the sensor disconnects
    socket.on('end', () => {
        console.log('Sensor disconnected.');
    });

    // Handle any errors
    socket.on('error', (err) => {
        console.error('Error occurred:', err);
    });
});

// Start the TCP server
server.listen(tcpPort, () => {
    console.log(`TCP Server is listening on port ${tcpPort}`);
});

// Start the HTTP server with a default route for '/'
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server!');
});

app.listen(httpPort, () => {
    console.log(`HTTP Server is running on port ${httpPort}`);
});

// Function to parse the parking data from the sensor
function parseParkingData(data) {
    // Assuming the sensor sends data in this format: "total:50,available:30,full:20"
    const dataParts = data.split(',');
    const totalSlots = parseInt(dataParts[0].split(':')[1], 10);
    const availableSlots = parseInt(dataParts[1].split(':')[1], 10);
    const fullSlots = parseInt(dataParts[2].split(':')[1], 10);
    return { totalSlots, availableSlots, fullSlots };
}
