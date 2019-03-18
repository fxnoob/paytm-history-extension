

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
        return name in target ?
          target[name] :  this.defaultValue ;
      }
    }
    let obj = {};
    return new Proxy(obj, handler);
  }
}
