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
            "0": this.defaultValue,
            "1": this.defaultValue,
            "2": this.defaultValue,
            "3": this.defaultValue,
            "4": this.defaultValue,
            "5": this.defaultValue,
            "6": this.defaultValue,
            "7": this.defaultValue,
            "8": this.defaultValue,
            "9": this.defaultValue,
            "10": this.defaultValue,
            "11": this.defaultValue
          }
        }
      }
    };
    let obj = {};
    return new Proxy(obj, handler);
  }
  getMax(obj)  {
    let res=0;
    try{
      res = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);;
    }
    catch (e) {
    }
    return  res;
  }
}
