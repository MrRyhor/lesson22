class IsNotANumber extends Error {
    constructor() {
        super('Not a number')
        this.name = 'IsNotANumber'
    }
}
class IsInInterval extends Error {
    constructor() {
        super('Not in interval')
        this.name = 'IsInInterval'
    }
}
class IsHolidays extends Error {
    constructor() {
        super('Is holidays')
        this.name = 'IsHolidays'
    }
}
class PosibleToCorrectScore {
    constructor() {        
    }
    validateCurrentMonth() {
        try {
            const val = document.querySelector('.month').value
            if (isNaN(val)) throw new IsNotANumber()
            if (val < 1 || val > 12) throw new IsInInterval()
            if (val >= 6 && val <= 8) throw new IsHolidays()
        } catch (err) {
            if (err instanceof IsNotANumber)
                document.querySelector('.month').value = 0
            else if (err instanceof IsInInterval)
                document.querySelector('.month').value = 0
            else if (err instanceof IsHolidays)
                document.querySelector('.month').value = 0
            else return false
        }
        return true
    }
    validateCurrentScore() {
        try {
            const val = document.querySelector('.score').value
            if (isNaN(val)) throw new IsNotANumber()
            if (val < 1 || val > 100) throw new IsInInterval()
        } catch (err) {
            if (err instanceof IsNotANumber)
                document.querySelector('.score').value = 0
            else if (err instanceof IsInInterval)
                document.querySelector('.score').value = 0
            else return false
        }
        return true
    }
    clearInputsValue(){
        document.querySelector('.month').value = ''
        document.querySelector('.score').value = ''
    }
    getResult(){
        const month = document.querySelector('.month').value
        const score = document.querySelector('.score').value
        if (month !== 5 && score >= 70) document.querySelector('.check').innerText = 'You have a chance'
        else document.querySelector('.check').innerText = 'No any chance'
    }
}

window.onload = () => {
    const a = new PosibleToCorrectScore()
    document.querySelector('.month').oninput = a.validateCurrentMonth
    document.querySelector('.score').oninput = a.validateCurrentScore
    document.querySelector('.get-check').onclick = a.getResult
    document.querySelector('.reset').onclick = a.clearInputsValue
}

