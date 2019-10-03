export class Url {
  constructor() {}
  goToUrlIfOpened(url) {
    chrome.tabs.query({ url: url }, tabs => {
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, { active: true });
      } else {
        chrome.tabs.create({ url: url });
      }
    });
  }
}
