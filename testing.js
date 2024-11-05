const net = require('net');

const client = new net.Socket();
const port = 8080; // Same port as your TCP server
const host = '127.0.0.1'; // Assuming the server is running locally

// Connect to the server
client.connect(port, host, () => {
    console.log('Connected to the TCP server.');

    // Send test data
    const testData = "total:50,available:30,full:200"; // Example data
    client.write(testData);
}); 