chrome.storage.sync.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== false;
    chrome.storage.sync.set({ enabled: isEnabled });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggle') {
      chrome.storage.sync.get(['enabled'], (result) => {
        const newState = !result.enabled;
        chrome.storage.sync.set({ enabled: newState }, () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle', enabled: newState });
            }
          });
          sendResponse({ enabled: newState });
        });
      });
      return true; // Async response
    }
  });