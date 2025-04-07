let isEnabled = true;

// Load initial state
chrome.storage.sync.get(['enabled'], (result) => {
  isEnabled = result.enabled !== false; // Default true
});

// Listen for toggle updates
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggle') {
    isEnabled = message.enabled;
    // Reset all inputs when toggling
    document.querySelectorAll('input, textarea').forEach(input => {
      const realText = input.getAttribute('data-real-text') || input.value;
      input.value = isEnabled ? mirrorText(realText) : realText;
    });
  }
});

function mirrorText(text) {
  return text.split('').reverse().join('');
}

document.addEventListener('input', (event) => {
  const input = event.target;
  if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
    let realText = input.getAttribute('data-real-text') || '';
    realText += event.data || ''; // Add new character
    input.setAttribute('data-real-text', realText);
    input.value = isEnabled ? mirrorText(realText) : realText;
  }
});