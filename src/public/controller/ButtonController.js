
export default class Button {
  constructor() {
    this.button = document.querySelector('#button');
    this.initEvents()
  }
  initEvents() {
    this.button.addEventListener('click', this.handleButton);
  }

  handleButton() {
    alert('oi');
  }
}

