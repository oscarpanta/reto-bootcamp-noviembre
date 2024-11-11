declare var chrome:any;
chrome.runtime.onConnect.addListener(function (port:any) {
    port.onMessage.addListener(function (msg:any) {
      if (msg.cmd === "finish-scrap") {
        const { products } = msg;
        chrome.storage.local.set({ products: products }).then(() => {
        });
      }
      if (msg.cmd === "get-products") {
        chrome.storage.local.get(["products"]).then((result:any) => {
          port.postMessage({ cmd: "result-products", result });
        });
      }
    });
  });
  