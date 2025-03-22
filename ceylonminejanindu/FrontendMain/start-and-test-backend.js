const { exec } = require('child_process');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

// Path to the backend directory
const backendPath = path.resolve(__dirname, '..', 'ceylonmine_backend_main');

// Check if the backend directory exists
if (!fs.existsSync(backendPath)) {
  console.error(`Backend directory not found: ${backendPath}`);
  process.exit(1);
}

console.log('Starting Flask backend...');
const flaskProcess = exec('python app.py', { cwd: backendPath });

// Log output from the Flask process
flaskProcess.stdout.on('data', (data) => {
  console.log(`Flask: ${data}`);
});

flaskProcess.stderr.on('data', (data) => {
  console.error(`Flask error: ${data}`);
});

flaskProcess.on('error', (error) => {
  console.error(`Failed to start Flask: ${error}`);
});

// Wait for the Flask server to start
setTimeout(async () => {
  try {
    console.log('Testing connection to the backend...');
    const response = await fetch('http://localhost:5000/royalty/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        water_gel: 100,
        nh4no3: 200,
        powder_factor: 0.75
      }),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error connecting to backend:', error.message);
  } finally {
    console.log('Test completed. Press Ctrl+C to stop the Flask server.');
  }
}, 5000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Stopping Flask server...');
  flaskProcess.kill();
  process.exit();
}); 