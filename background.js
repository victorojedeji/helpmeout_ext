// background.js

let mediaStream;
let mediaRecorder;
let isRecording = false;
let isPaused = false;
let recordingInterval;

function startRecording() {
  const constraints = {
    video: {
      mandatory: {
        chromeMediaSource: "screen", // Change to 'tab' for tab capture
      },
    },
    audio: true,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      mediaStream = stream;
      mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: "video/webm" });
        // Save the recordedBlob to storage or send to a server
      };

      mediaRecorder.start();

      // Implement logic to update the recording length in real-time
    })
    .catch((error) => {
      console.error("Error accessing media devices:", error);
    });
}

function stopRecording() {
  if (mediaRecorder && mediaStream) {
    mediaRecorder.stop();
    mediaStream.getTracks().forEach((track) => track.stop());
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'startRecording') {
    // Start recording logic here
    startRecording();
    isRecording = true;
    recordingInterval = setInterval(updateRecordingTime, 1000);
  } else if (request.action === 'stopRecording') {
    // Stop recording logic here
    stopRecording();
    isRecording = false;
    isPaused = false;
    clearInterval(recordingInterval);
  } else if (request.action === 'pauseRecording') {
    // Pause recording logic here
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      isPaused = true;
      clearInterval(recordingInterval);
    }
  } else if (request.action === 'resumeRecording') {
    // Resume recording logic here
    if (mediaRecorder && mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      isPaused = false;
      recordingInterval = setInterval(updateRecordingTime, 1000);
    }
  }
});

function updateRecordingTime() {
  // Update the recording time, save or append the recorded data as needed.
}
