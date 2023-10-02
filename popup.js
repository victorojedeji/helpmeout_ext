document.addEventListener("DOMContentLoaded", function () {
  const currentTabButton = document.getElementById("currentTabButton");
  const recordScreenButton = document.getElementById("recordScreenButton");
  const startRecordingButton = document.getElementById("startRecordingButton");
  const micButton = document.getElementById("micButton");
  const pauseResumeButton = document.getElementById("pauseResumeButton");
  const recordingTimeElement = document.getElementById("recordingTime");

  let isRecording = false;
  let isPaused = false;
  let recordingInterval;


  function sendMessageToContentScript(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, message);
    });
  }


  currentTabButton.addEventListener("click", () => {
    // Logic for recording the current tab
    console.log("Current Tab clicked");
  });

  recordScreenButton.addEventListener("click", () => {
    // Logic for recording the entire screen
    console.log("Record Screen clicked");
  });

  startRecordingButton.addEventListener("click", () => {
    if (!isRecording) {
      // Logic to start recording and open the control panel
      console.log("Start Recording clicked");
      // chrome.runtime.sendMessage({ action: 'startRecording' });
      // window.close();
      // Function to send a message to control-panel.js (content script)
      sendMessageToContentScript({ action: 'InitializeControlPanel' });
    } else {
      // Logic to stop recording and close the control panel
      console.log("Stop Recording clicked");
    }
  });

  // pauseResumeButton.addEventListener("click", () => {
  //   if (isRecording) {
  //     if (isPaused) {
  //       // Resume recording
  //       chrome.runtime.sendMessage({ action: "resumeRecording" });
  //       isPaused = false;
  //       pauseResumeButton.textContent = "Pause";
  //       recordingInterval = setInterval(updateRecordingTime, 1000);
  //     } else {
  //       // Pause recording
  //       chrome.runtime.sendMessage({ action: "pauseRecording" });
  //       isPaused = true;
  //       pauseResumeButton.textContent = "Resume";
  //       clearInterval(recordingInterval);
  //     }
  //   }
  // });

  // micButton.addEventListener("click", () => {
  //   // Logic to pause and resume audio recording
  //   // Implement appropriate UI changes to indicate the mic state
  // });

  // deleteButton.addEventListener("click", () => {
  //   // Logic to stop recording and clear the control panel
  //   // Implement logic to close the control panel
  // });

  // Other functions for handling recording and control panel

  // Other functions for recording and control panel actions
});
