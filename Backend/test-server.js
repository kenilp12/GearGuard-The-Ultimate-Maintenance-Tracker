// Quick test to check if backend is accessible
import fetch from 'node-fetch';

const testBackend = async () => {
  try {
    const response = await fetch('http://localhost:8000/');
    const text = await response.text();
    console.log('✅ Backend is running!');
    console.log('Response:', text);
  } catch (error) {
    console.log('❌ Backend is NOT running or not accessible');
    console.log('Error:', error.message);
    console.log('\nMake sure to run: cd Backend && npm run dev');
  }
};

testBackend();

