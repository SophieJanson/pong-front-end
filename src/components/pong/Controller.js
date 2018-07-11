const KEY = {
  LEFTUP: 81,
  LEFTDOWN: 65,
  RIGHTUP: 38,
  RIGHTDOWN: 40
 };

export default class Controller {
  constructor() {
    this.pressedKeys = { leftup: 0, leftdown: 0, rightup: 0, rightdown: 0};
  }

  handleKeys(value, e){
    let keys = this.pressedKeys;

    switch (e.keyCode) {
      case KEY.LEFTUP:
        keys.leftup  = value;
        break;
      case KEY.LEFTDOWN:
        keys.leftdown  = value;
        break;
      case KEY.RIGHTUP:
        keys.rightup  = value;
        break;
      case KEY.RIGHTDOWN:
        keys.rightdown  = value;
        break;
      default:
        return null
    }

    this.pressedKeys = keys;
  }

  bindKeys() {
    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
  }

  unbindKeys() {
      window.removeEventListener('keyup', this.handleKeys);
      window.removeEventListener('keydown', this.handleKeys);
  }
}