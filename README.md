create folder called slickdeals-hide-aliexpress
create a text file and paste the contents below, the rename "manifest.js"

'''js
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
'''

create a text file and paste the following renaming "manifest.json"

'''json
{
  "manifest_version": 3,
  "name": "Slickdeals Hide AliExpress",
  "version": "1.1.0",
  "description": "Hides all AliExpress deals on Slickdeals.net",
  "content_scripts": [
    {
      "matches": [
        "*://slickdeals.net/*",
        "*://*.slickdeals.net/*"
      ],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_idle"
    }
  ],
  "browser_specific_settings": {
    "gecko": {
      "id": "slickdeals-hide-aliexpress@local",
      "strict_min_version": "109.0"
    }
  }
}
'''

create a third text file with the following, renaming it "styles.css"

'''css

.slickdeals-hide-aliexpress {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}
'''

load unpacked the folder containing these three files in your browser extensions management tab.





