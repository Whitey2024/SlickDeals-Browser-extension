(function () {
  "use strict";

  const STORE_NAME = /aliexpress/i;

  const DEAL_SELECTORS = [
    "div.dealRow",
    "div.dealCardGridV2",
    "div.bp-p-dealCard",
    "div.dealCard",
    "div.fpGridBox",
    "li.deal",
    "[data-qa='deal-card-grid']"
  ];

  function isAliExpressDeal(element) {
    const storeEls = element.querySelectorAll(
      ".dealCardGridV2__store, .dealLinks span.blueprint, [class*='store'], .storeName, .store"
    );
    for (const el of storeEls) {
      if (STORE_NAME.test(el.textContent.trim())) {
        return true;
      }
    }

    const linksArea = element.querySelector(".dealLinks, .titleAndLinks");
    if (linksArea && STORE_NAME.test(linksArea.textContent)) {
      return true;
    }

    return false;
  }

  function hideDeal(element) {
    if (element.dataset.aliexpressHidden === "true") return;
    element.dataset.aliexpressHidden = "true";
    element.classList.add("slickdeals-hide-aliexpress");
    element.style.setProperty("display", "none", "important");
  }

  function processDeals() {
    for (const selector of DEAL_SELECTORS) {
      document.querySelectorAll(selector).forEach((el) => {
        if (isAliExpressDeal(el)) {
          hideDeal(el);
        }
      });
    }
  }

  processDeals();

  const observer = new MutationObserver(() => {
    clearTimeout(window.__sdHideAliTimeout);
    window.__sdHideAliTimeout = setTimeout(processDeals, 150);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setInterval(processDeals, 4000);

  console.log("[Slickdeals Hide AliExpress] Active");
})();