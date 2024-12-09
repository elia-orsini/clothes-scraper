const axios = require('axios');
const fs = require('fs');

// Define the URL and headers from the provided curl request
const url = 'https://buyee.jp/api/v1/getRecommendList/auctionTop';
const headers = {
  'accept': 'application/json, text/javascript, */*; q=0.01',
  'accept-language': 'en',
  'cookie': 'otherbuyee=9rss1ife4rfb2j29nnffdig9v3; version=e4ae6072ec674f445d84b15e237e6c16e261b39e', // Use your valid cookie value
  'dnt': '1',
  'priority': 'u=1, i',
  'referer': 'https://buyee.jp/yahoo/auction',
  'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest'
};

// Function to make the request and save the response to a JSON file
async function fetchAndSaveData() {
  try {
    // Make the request using axios
    const response = await axios.get(url, { headers });

    // Save the response data to a file
    const data = response.data;
    fs.writeFileSync('response.json', JSON.stringify(data, null, 2));  // Save to response.json
    console.log('Data saved to response.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to fetch and save the data
fetchAndSaveData();
