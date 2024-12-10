const axios = require("axios");

async function translate(text) {
  const apiKey = "AIzaSyDMqhDG6LO7v9AUmDo3gRyjG6p2uRmkPHs";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: "en",
    });

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.log(error);

    return text;
  }
}

module.exports = { translate };
