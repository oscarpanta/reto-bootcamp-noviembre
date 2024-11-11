import {
  cssSelectAutomotriz,
  cssSelectFrutasyVerduras,
  cssSelectCarnesAvesPescados,
  cssSelectDesayunos,
  cssSelectLacteosHuevos,
  cssSelectQuesosFiambres,
  cssSelectAbarrotes,
  cssSelectPanaderiaPasteleria,
  cssSelectPolloRostizadoyComidas,
  cssSelectCongelados,
  cssSelectBebidas,
  cssSelectVinosLicoresyCervezas,
  cssSelectLimpieza,
  cssSelectCuidadoPersonalySalud,
  cssSelectBebeInfantil,
  cssSelectMascotas,
  cssSelectAhorroPacks,
  cssSelectMercadoSaludable,
} from "./functions/utils";
declare var chrome:any;

function getSelector(url: string): string {
  if (url.includes("/frutas-y-verduras")) return cssSelectFrutasyVerduras;
  if (url.includes("/carnes-aves-y-pescados")) return cssSelectCarnesAvesPescados;
  if (url.includes("/desayunos")) return cssSelectDesayunos;
  if (url.includes("/lacteos-y-huevos")) return cssSelectLacteosHuevos;
  if (url.includes("/quesos-y-fiambres")) return cssSelectQuesosFiambres;
  if (url.includes("/abarrotes")) return cssSelectAbarrotes;
  if (url.includes("/panaderia-y-pasteleria")) return cssSelectPanaderiaPasteleria;
  if (url.includes("/pollo-rostizado-y-comidas-preparadas")) return cssSelectPolloRostizadoyComidas;
  if (url.includes("/congelados")) return cssSelectCongelados;
  if (url.includes("/bebidas")) return cssSelectBebidas;
  if (url.includes("/vinos-licores-y-cervezas")) return cssSelectVinosLicoresyCervezas;
  if (url.includes("/limpieza")) return cssSelectLimpieza;
  if (url.includes("/cuidado-personal-y-salud")) return cssSelectCuidadoPersonalySalud;
  if (url.includes("/bebe-e-infantil")) return cssSelectBebeInfantil;
  if (url.includes("/mascotas")) return cssSelectMascotas;
  if (url.includes("/packs")) return cssSelectAhorroPacks;
  if (url.includes("/mercado-saludable")) return cssSelectMercadoSaludable;
  if (url.includes("/automotriz")) return cssSelectAutomotriz;

  return "";
}

const port = chrome.runtime.connect({ name: "background" });


chrome.runtime.onMessage.addListener(function (request: any) {
  if (request.cmd === "scrap") {
    const products = scrappingProducts();
    port.postMessage({ cmd: "finish-scrap", products });
  }
});

function scrappingProducts() {
  const selector = getSelector(window.location.pathname);
  if (!selector) {
    console.error("sin categoria");
    return [];
  }

  let cards = [...document.querySelectorAll(selector)];

  const products = cards.map((el: any) => {
    const nombre = el.querySelector(".Showcase__name")?.textContent;
    const vendedor = el.querySelector(".Showcase__SellerName")?.textContent;
    const precio = el.querySelector(".Showcase__salePrice")?.textContent;
    return { nombre, vendedor, precio };
  });
  console.log(products);
  return products;
}
