// DOM Elements
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')


// Set up the time
const updateTime = () => {
    const currentTime = new Date()

    let currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()

    hourEl.textContent = currentHour.toString()
    minuteEl.textContent = currentMinute.toString()
}
setInterval(updateTime, 1000)
updateTime()

// 
let a = '' //first number
let b = '' //second number
let sign = '' // operation function
let finish = false

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const action = ['-', '+', '*', '/']
const percent = ["%"]
const pM = ['±']

const out = document.querySelector('.display')

function clearAll() {
    a = ""
    b = ""
    sign = ""
    finish = false
    out.textContent = 0
}

document.querySelector('.ac').onclick = clearAll

document.querySelector('.buttons-container').onclick = (event) => {
    if(!event.target.classList.contains('button')) return
    if(event.target.classList.contains('ac')) return

    out.textContent = ''

    const key = event.target.textContent

    if(digit.includes(key)) {
        if(b === '' && sign === '') {
            a += key
            out.textContent = a
        }
        else if (a!=='' && b!== '' && finish) {
            b = key
            finish = false
            out.textContent = b
        }
        else {
            b += key
            out.textContent = b
        }
        console.table(a, b, sign);
        return
    }

    if(action.includes(key)) {
        sign = key
        out.textContent = sign
        console.table(a, b, sign);
        return
    }

    if(percent.includes(key)) {
        sign = key
        a = a / 100
        out.textContent = a
        return
    }

    if(pM.includes(key)) {
        sign = key
        if(a === '' && b === '') {
            out.textContent = 0
            sign = ""
            return
        }
        else if (a.includes('-') || b.includes('-')) {
            a = Math.abs(a)
            out.textContent = a
            return
        }
        else {
            a = "-" + a
            out.textContent = a
            return
        }
    }

    if(key === '=') {
        if(b === '') b = a
        switch(sign) {
            case "+":
                a = (+a) + (+b)
                break
            case "-":
                a = a - b
                break
            case "*":
                a = a * b
                break
            case "/":
                if(b === '0') {
                    out.textContent = "Error"
                    a = ""
                    b = ""
                    sign = ""
                    return
                }
                a = a / b
                break
        }
        finish = true
        out.textContent = a
        console.table(a, b, sign)
    }
}