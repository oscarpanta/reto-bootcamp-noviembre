const buttonScrapt = document.getElementById("btn-scrap");
const buttonProductos = document.getElementById("btn-productos");
declare var chrome:any;

const portPopUp = chrome.runtime.connect({name: "background"});

buttonScrapt?.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  if(tab?.id==null) return
  const response = await chrome.tabs.sendMessage(tab.id, { cmd: "scrap" });
  console.log(response)
});
buttonProductos?.addEventListener("click", async () => {
  portPopUp.postMessage({ cmd: "get-products" });
});
portPopUp.onMessage.addListener(function (msg:any) {

  if (msg.cmd === "result-products") {
    const { result } = msg;
    const txtData = document.getElementById('txt-data');
    if(txtData!=null) 
    txtData.innerText = JSON.stringify(result, null, 2);
  }
});
