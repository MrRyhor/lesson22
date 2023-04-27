class ElementsCreator {
    static createHTMLElement({ tag, attrs, props, events }) {
        const el = document.createElement(tag)
        if (attrs) {
            for (const atrrKey in attrs) {
                el.setAttribute(atrrKey, attrs[atrrKey])
            }
        }
        if (props) {
            for (const propKey in props) {
                el[propKey] = props[propKey]
            }
        }
        if (events) {
            for (const eventType in events) {
                el.addEventListener(eventType, events[eventType])
            }
        }
        return el
    }
    static createLabelWithInput({ labelOptions, inputOptions }) {
        const inp = ElementsCreator.createHTMLElement({ tag: 'input', ...(inputOptions ?? {}) })
        const label = ElementsCreator.createHTMLElement({ tag: 'label', ...(labelOptions ?? {}) })
        label.append(inp)
        return label
    }
}

class Father {
    constructor(coordinateX, coordinateY, imgSrc, interval) {
        this.coordinateX = coordinateX
        this.coordinateY = coordinateY
        this.imgSrc = imgSrc
        this.interval = interval
    }
    getRandomNum(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1))
    }
    createElement() {
        this.container = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container' } })
        this.container.style.top = `${this.coordinateY}%`
        this.container.style.left = `${this.coordinateX}%`
        this.container.style.transition = '0.8s'
        this.img = ElementsCreator.createHTMLElement({ tag: 'img', props: { src: this.imgSrc } })
        this.container.append(this.img)
        return this.container
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createElement())
    }
}
class House extends Father {
    constructor(coordinateX, coordinateY, imgSrc, interval) {
        super(coordinateX, coordinateY, imgSrc, interval)
        this.el = this.createElement()

    }
    getScale() {
        let int = setInterval(() => {
            this.img.style.transform = `scale(${this.getRandomNum(0.5, 2)})`
        }, this.interval * 1000)
        setTimeout(() => {
            clearInterval(int)
        }, 30000)
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.el)
    }
}
class Dog extends Father {
    constructor(coordinateX, coordinateY, imgSrc, interval) {
        super(coordinateX, coordinateY, imgSrc, interval)
        this.el = this.createElement()
    }
    getMoveToRandomCoordinateX() {
        let int = setInterval(() => {
            this.container.style.left = `${this.getRandomNum(10, 90)}%`
        }, this.interval * 1000)
        setTimeout(() => {
            clearInterval(int)
        }, 30000);
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.el)
    }
}
class Bird extends Father {
    constructor(coordinateX, coordinateY, imgSrc, interval) {
        super(coordinateX, coordinateY, imgSrc, interval)
        this.el = this.createElement()
    }
    getMoveToRandomCoordinate() {
        let int = setInterval(() => {            
            this.container.style.top = this.getRandomNum(10,90) + '%'
            this.container.style.left = this.getRandomNum(10, 90) + '%'
            this.container.style.bottom = this.getRandomNum(10, 90) + '%'
            this.container.style.right = this.getRandomNum(10, 90) + '%'            
        }, this.interval * 1000)
        setTimeout(() => {
            clearInterval(int)
        }, 30000)
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.el)
    }
}

window.onload = () => {
    const house = new House(47, 40, `./img/house.png`, 3)
    house.render('res')
    house.getScale()
    const dog = new Dog(20, 70, './img/dog.png', 2)
    dog.render('res')
    dog.getMoveToRandomCoordinateX()
    const bird = new Bird(20, 40, './img/bird.png', 3)
    bird.render('res')
    bird.getMoveToRandomCoordinate()
}