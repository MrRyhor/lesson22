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

class Client {
    #id
    #userName
    #balance
    constructor(id, userName, balance) {
        this.Id = id
        this.UserName = userName
        this.Balance = balance
        console.log(this.Balance)
    }
    get Id() {
        return this.#id
    }
    set Id(num) {
        if (num.length === 0)
            throw new Error(alert('Поле не может быть пустым'))
        this.#id = num
    }
    get UserName() {
        return this.#userName
    }
    set UserName(name) {
        if (name.length === 0)
            throw new Error(alert('Поле не может быть пустым'))
        this.#userName = name
    }
    get Balance() {
        return this.#balance
    }
    set Balance(val) {
        if (val < 0)
            throw new Error(alert('Не достаточно средств'))
        this.#balance = val
    }
    updateTotalBalance() {
        this.totalBalance.innerText = `Остаток на счёте: ${this.Balance}`
    }
    addMoney() {
        let userVal = parseInt(this.inputAdd.value)
        this.Balance += userVal
        console.log(this.Balance)
        this.updateTotalBalance()
        return this.Balance
    }
    withdrawMoney() {
        let userVal = parseInt(this.inputMinus.value)
        this.Balance -= userVal
        this.updateTotalBalance()
        return this.Balance
    }
    clearInputAdd() {
        this.inputAdd.value = ''
    }
    clearInputMinus() {
        this.inputMinus.value = ''
    }
    toString() {
        return `User: ${this.UserName} - Balance: ${this.Balance} USD`
    }
    createDisplayList() {
        const container = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container' } })
        const labelAdd = ElementsCreator.createHTMLElement({ tag: 'label', props: { className: 'label-add', innerText: 'Сумма пополнения, USD' } })
        container.append(labelAdd)
        this.inputAdd = ElementsCreator.createHTMLElement({ tag: 'input', props: { className: 'input-add' } })
        labelAdd.append(this.inputAdd)
        const btnAdd = ElementsCreator.createHTMLElement({ tag: 'button', props: { className: 'btn-add', innerText: 'Get' }, attrs: { type: 'button' } })
        btnAdd.onclick = this.addMoney.bind(this)
        labelAdd.append(btnAdd)
        const btnAddReset = ElementsCreator.createHTMLElement({ tag: 'button', props: { innerText: 'Reset' } })
        btnAddReset.onclick = this.clearInputAdd.bind(this)
        labelAdd.append(btnAddReset)
        const labelMinus = ElementsCreator.createHTMLElement({ tag: 'label', props: { className: 'label-minus', innerText: 'Сумма снятия, USD' } })
        container.append(labelMinus)
        this.inputMinus = ElementsCreator.createHTMLElement({ tag: 'input', props: { className: 'input-minus' } })
        labelMinus.append(this.inputMinus)
        const btnMinus = ElementsCreator.createHTMLElement({ tag: 'button', props: { className: 'btn-minus', innerText: 'Get' }, attrs: { type: 'button' } })
        btnMinus.onclick = this.withdrawMoney.bind(this)
        labelMinus.append(btnMinus)
        const btnMinusReset = ElementsCreator.createHTMLElement({ tag: 'button', props: { innerText: 'Reset' } })
        btnMinusReset.onclick = this.clearInputMinus.bind(this)
        labelMinus.append(btnMinusReset)
        this.totalBalance = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'total-balance', innerText: `Остаток на счёте, USD: ${this.Balance}` } })
        container.append(this.totalBalance)
        return container
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createDisplayList())
    }
}

class GoldenClient extends Client {
    #creditLimit
    constructor(id, userName, balance, creditLimit, creditRate) {
        super(id, userName, balance)
        this.CreditLimit = creditLimit
        this.creditRate = creditRate
    }
    get CreditLimit() {
        return this.#creditLimit
    }
    set CreditLimit(val) {
        if (val < 0 || val > 5000)
            throw new Error(alert('Не допустимый лимит'))
        this.#creditLimit = val
    }
    getInterestOnLoan(creditLimit, creditRate) {
        const qntdays = this.inputDays.value
        const interestOnLoan = ((creditLimit * creditRate / 100) / 365) * qntdays
        return this.interestOnLoan.innerText = `Пеня составит, USD: ${interestOnLoan.toFixed(2)}`
    }
    clearInputDays() {
        this.inputDays.value = ''
    }
    createDisplayList() {
        let container = super.createDisplayList()
        const creditLimit = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'credit-limit', innerText: `Кредитный лимит, USD: ${this.CreditLimit}` } })
        container.append(creditLimit)
        const labelDays = ElementsCreator.createHTMLElement({ tag: 'label', props: { className: 'label-days', innerText: 'Введите кол-во дней пользования кредитом' } })
        container.append(labelDays)
        this.inputDays = ElementsCreator.createHTMLElement({ tag: 'input', props: { className: 'input-days' } })
        labelDays.append(this.inputDays)
        const btnDays = ElementsCreator.createHTMLElement({ tag: 'button', props: { innerText: 'Get' } })
        btnDays.onclick = this.getInterestOnLoan.bind(this, this.CreditLimit, this.creditRate)
        labelDays.append(btnDays)
        const btnDaysReset = ElementsCreator.createHTMLElement({ tag: 'button', props: { innerText: 'Reset' } })
        labelDays.append(btnDaysReset)
        this.interestOnLoan = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'interest-loan', innerText: `Пеня составит, USD: ` } })
        container.append(this.interestOnLoan)
        return container
    }
}
class Bank {
    constructor(clientsList) {
        this.clientsList = clientsList
        console.log(this.clientsList)
    }
    createClientsList() {
        for (const client of this.clientsList) {
            if (client instanceof GoldenClient) {
                console.log(client)
                const divGoldClient = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'div-gold-client' } })
                divGoldClient.innerText = client.toString()
                this.goldClients.append(divGoldClient)
            } else {
                const divClient = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'div-client' } })
                divClient.innerText = client.toString()
                this.clients.append(divClient)
            }
        }
        let totalSum = this.clientsList.reduce((prevSum, el) => prevSum + el.Balance, 0)
        this.totalBalance.innerText = `Всего денег в банке: ${totalSum}`
    }
    clearDisplayList(){
        for (const child of this.goldClients.children) {
            child.style.display = 'none'
        }
        for (const child of this.clients.children) {
            child.style.display = 'none'
        }
        this.totalBalance.innerText = ''     
    }
    createDisplayList() {
        const containerBank = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'container-bank', innerText: 'Bank' } })
        this.clients = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'clients', innerText: 'Список клиентов' } })
        containerBank.append(this.clients)
        this.goldClients = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'gold-clients', innerText: 'Список золотых клиетов' } })
        containerBank.append(this.goldClients)
        this.totalBalance = ElementsCreator.createHTMLElement({ tag: 'div', props: { className: 'total-balance'} })
        containerBank.append(this.totalBalance)
        const btnBank = ElementsCreator.createHTMLElement({ tag: 'button', props: { innerText: 'Get List' } })
        btnBank.onclick = this.createClientsList.bind(this)
        containerBank.append(btnBank)
        const btnBankReset = ElementsCreator.createHTMLElement({ tag: 'button', props: { innerText: 'Reset List' } })
        btnBankReset.onclick = this.clearDisplayList.bind(this)
        containerBank.append(btnBankReset)
        return containerBank
    }
    render(targetContainer) {
        document.getElementById(targetContainer).append(this.createDisplayList())
    }
}
clientsList = [
    new Client(132421, 'Paul Bostaph', 3450),
    new Client(132422, 'Zak Wylde', 7000),
    new GoldenClient(132423, 'Tom Araya', 10200, 5000, 5),
    new Client(132424, 'Kerry King', 5600),
    new GoldenClient(132425, 'Vinie Stigma', 15000, 5000, 4)
]

window.onload = function () {
    const c = new Client(132421, 'Paul Bostaph', 3450)
    c.render('res')
    const gc = new GoldenClient(132421, 'Paul Bostaph', 3450, 5000, 5)
    gc.render('res')
    const bank = new Bank(clientsList)
    bank.render('res')
}