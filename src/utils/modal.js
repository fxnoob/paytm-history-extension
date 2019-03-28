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
  dateProxy () {
    let handler = {
      get: (target , name) => {
        if (name in target) {
          return target[name];
        }
        else {
          return target[name]={
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0
          }
        }
      }
    };
    let obj = {};
    return new Proxy(obj, handler);
  }
  getMax(obj) {
    return  Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  }
}
