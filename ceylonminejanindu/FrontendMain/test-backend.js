// Simple script to test connection to the backend
const fetch = require('node-fetch');

async function testBackend() {
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
  }
}

testBackend(); 