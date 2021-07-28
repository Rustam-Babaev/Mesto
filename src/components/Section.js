export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element, position) {
        if (position === 'append') {
            this._container.append(element)
        } else if (position === 'prepend') {
            this._container.prepend(element)
        }
    }


    renderItems() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });
    }

}