export default class Modal {
  constructor () {
    this.defaultValue = 0;
  }
  setDefaultValue(value) {
    this.defaultValue = value;
  }
  proxy () {
    let handler = {
      get: (target , name) => {
        if (name === "You") {
          return -1000;
        }
        return name in target ?
          target[name] :  this.defaultValue ;
      }
    }
    let obj = {};
    return new Proxy(obj, handler);
  }
  getMax(obj) {
    return  Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }
}
