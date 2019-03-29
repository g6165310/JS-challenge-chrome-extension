let defaultdata = [
  '蹲跟你講電話的那個晚上，我聽見了你的聲音。',
  '當我閉上雙眼，眼前只有一片漆黑。',
  '與你在一起的夏天比冬天更溫暖。'
]
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ 'rubbishData': defaultdata }, function () {
    console.log("Default data in storage");
  });
});

let contextMenuItem = {
  "id": "RubbishGenerator",
  "title": "加到我的幹話語錄",
  "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "RubbishGenerator") {
    var selection = clickData.selectionText;
    chrome.storage.sync.get('rubbishData', data => {
      data.rubbishData.push(selection)
      chrome.storage.sync.set({ 'rubbishData': data.rubbishData }, () => {
        console.log("新增成功")
      })
    })
  }
});