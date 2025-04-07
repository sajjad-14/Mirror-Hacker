document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusText = document.getElementById('status');
  
    chrome.storage.sync.get(['enabled'], (result) => {
      const enabled = result.enabled !== false;
      updateUI(enabled);
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'toggle' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log("Error:", chrome.runtime.lastError.message);
        } else {
          updateUI(response.enabled);
        }
      });
    });
  
    function updateUI(enabled) {
      statusText.textContent = enabled ? 'Enabled' : 'Disabled';
      toggleButton.textContent = enabled ? 'Turn Off' : 'Turn On';
    }
  });