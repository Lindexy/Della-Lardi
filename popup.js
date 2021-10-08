
let showMemoryBtn = document.getElementById('showMemory');
let console = document.getElementById('console');
let clearMemoryBtn = document.getElementById('clearMemoryBtn');

//let list = document.getElementById('request_list_main');

console.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showItem,
  });
});

showMemoryBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showMemory,
  });
});

clearMemoryBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: clearMemory,
  });
});

function showMemory() {
  chrome.storage.local.get(null, function(items) {
    console.log(items);
  });
}


function clearMemory() {
  chrome.storage.local.clear(function() {
    console.log('Memory cleaded')
  })

}

function showItem() {
  chrome.storage.local.get('9221230113232347919', function(result) {
    console.log(result)
  })
}


