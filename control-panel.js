const controlPanelOverlay = document.getElementById("controlPanelOverlay"); // Add this line
const controlPanel = document.getElementById("controlPanel");

let recordingTime = 0;

function updateRecordingTime() {
  recordingTime++;
  const hours = Math.floor(recordingTime / 3600);
  const minutes = Math.floor((recordingTime % 3600) / 60);
  const seconds = recordingTime % 60;
  recordingTimeElement.textContent = `${hours}:${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function removeControlPanel() {
  if (controlPanelOverlay) {
    controlPanelOverlay.remove(); // Remove the control panel overlay
  }
}

function displayControlPanelOverlay() {
  console.log("Displaying control panel overlay...");
  // Create a control panel overlay element
  const controlPanelOverlay = document.createElement("div");
  controlPanelOverlay.id = "controlPanelOverlay";
  // You can style the overlay as desired
  controlPanelOverlay.style.position = "fixed";
  controlPanelOverlay.style.top = "0";
  controlPanelOverlay.style.left = "0";
  controlPanelOverlay.style.width = "100%";
  controlPanelOverlay.style.height = "100%";
  controlPanelOverlay.style.zIndex = "9999";

  // Append the control panel to the overlay (you can customize this content)
  const controlPanel = document.createElement("div");
  controlPanel.id = "controlPanel";
  // Add your control panel content here

  // Add the control panel HTML content
  controlPanel.innerHTML = `
  <section class="control-panel">
  <div class="time-wrapper">
    <p class="time" id="recordingTime">00:03:45</p>
    <div class="red-dot-animation"></div>
  </div>
  <div class="actions-wrapper">
    <div class="action-button-holder" id="pauseResumeButton">
      <button class="action-button">
        <img src="./assets/icons/Frame 1000002571.svg" alt="pause" class="action-icon">
      </button>
    </div>

    <div class="action-button-holder" id="stopRecordingButton">
      <button class="action-button">
        <img src="./assets/icons/Rectangle 437.svg" alt="stop" class="action-icon" id="stop_video">
      </button>
    </div>

    <div class="action-button-holder">
      <button class="action-button">
        <img src="./assets/icons/speaker.svg" alt="camera" class="action-icon">
      </button>
    </div>

    <div class="action-button-holder" id="micButton">
      <button class="action-button">
        <img src="./assets/icons/camerA.svg" alt="mic" class="action-icon">
      </button>
    </div>

    <div class="action-button-holder" id="deleteButton">
      <button class="action-button">
        <img src="./assets/icons/DEL.svg" alt="delete" class="action-icon">
      </button>
    </div>
  </div>
</section>
    `;

  // Append the control panel to the overlay
  controlPanelOverlay.appendChild(controlPanel);

  // Append the overlay to the body
  document.body.appendChild(controlPanelOverlay);

  const stopRecordingButton = document.getElementById("stopRecordingButton");
  const deleteButton = document.getElementById("deleteButton");

  stopRecordingButton.addEventListener("click", () => {
    // Logic to stop recording (add your own logic here)
    removeControlPanel(); // Remove the control panel overlay
  });

  deleteButton.addEventListener("click", () => {
    // Logic to delete recording (add your own logic here)
    removeControlPanel(); // Remove the control panel overlay
  });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "InitializeControlPanel") {
    console.log("message recieved in control panel");
    // Trigger the function to display the control panel overlay
    displayControlPanelOverlay();
  }
  // You can add more message handlers if needed
});
