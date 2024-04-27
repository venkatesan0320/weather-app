import React, { useState } from 'react';

const SpeechToText = () => {
  const [transcription, setTranscription] = useState('');

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    // const recognition = new window.SpeechRecognition(); // for other browsers

    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscription(transcript);
    };

    recognition.start();
  };

  return (
    <div>
      <button onClick={startSpeechRecognition}>Start Recording</button>
      <p>Transcription: {transcription}</p>
    </div>
  );
};

export default SpeechToText;
