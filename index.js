const net = require('net');
require('dotenv').config();
const sensorModel = require('./sensorModel');
const db = require('./db')

// Define your TCP server
const server = net.createServer((socket) => {
    console.log('Sensor connected.');

    // Event when data is received from the sensor
    socket.on('data', async(data) => {
        const sensorData = data.toString(); // Convert data to string
        console.log('Received data from sensor:', sensorData);

        // Parse the data to extract parking information
         await sensorModel.create({sensorData})
        
        
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

// Start the server on a specific port (e.g., 8080)
const port = 8080;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
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