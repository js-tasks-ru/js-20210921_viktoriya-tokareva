export default class NotificationMessage {
    element;
    
    constructor(str, {duration = 0, type}={}) {
        this.str = str;
        this.duration = duration;
        this.type = type;
        this.render();
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.notification;
        this.element = element.firstElementChild;
        this.checkElem();
    }
    
    get notification() {
        return `
            <div class="notification ${this.type}" style="--value:${this.duration/1000}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">
                        ${this.str};
                    </div>
                </div>
            </div>
        `;
    }

    checkElem() {
        for (let elem of document.body.children) {
            if (elem.matches('div.notification')) {
                elem.remove();
            }
        }
    }

    show(targetElement = document.body) {
        targetElement.append(this.element);
        setTimeout(() => this.destroy(), this.duration);
    }
    
    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
    }
}
