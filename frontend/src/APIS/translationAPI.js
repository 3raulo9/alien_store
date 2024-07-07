// translationAPI.js

const translateBatch = async (texts, language) => {
  if (!texts || !language) {
    throw new Error("Missing texts or language");
  }

  const response = await fetch('/translate_batch/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input_texts: texts, language }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return data.translated_texts;
};

export default {
  translateBatch,
};
