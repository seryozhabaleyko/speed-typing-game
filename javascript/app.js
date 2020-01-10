const $ = id => document.getElementById(id)

const easy = $('easy')
const medium = $('medium')
const hard = $('hard')
const start = $('start')
const input = $('input')
const timeDisplay = $('timer')
const select = $('level')
const display = $('display')
const scoreDisplay = $('score')

const words = ['angular', 'magic', 'brew', 'while', 'throw', 'css', 'break', 'swing', 'echo', 'let', 'wall', 'laughter', 'hash', 'spinner', 'beer', 'ninja', 'javascript', 'master', 'program', 'coding', 'hero', 'learning', 'work', 'case', 'react', 'dragon', 'rush', 'api', 'init', 'motion', 'google', 'float', 'damn', 'block', 'ranking', 'nice', 'machine', 'perfect', 'deploy', 'terminal', 'array', 'vue', 'node', 'html', 'front', 'grid', 'stack', 'mac', 'console', 'ajax', 'heroku', 'loop', 'sql', 'php', 'data', 'npm', 'server', 'bash']

let score = 0
let currentLevel = 5
let time = currentLevel

window.addEventListener('load', () => {
    setlevel()
    timeDisplay.textContent = getlevel()
})

select.addEventListener('change', () => {
    setlevel()
    time = getlevel()
    currentLevel = time
    timeDisplay.textContent = time
    
    return time, currentLevel
})

start.addEventListener('click', () => {
    start.disabled = true
    select.disabled = true
    showWord(words)
    input.focus()
    init()
})

function init() {
    timeDisplay.textContent = time
    input.addEventListener('input', startMatch)
    timer()
}

function startMatch() {
    const arrWord = display.querySelectorAll('span')
    const arrInput = input.value.split('')

    arrWord.forEach((span, i) => {
        const character = arrInput[i]
        if (character == null) span.classList.remove('correct')
        if (character === span.textContent) span.classList.add('correct')
    })

    input.value = input.value.toLowerCase()

    if (input.value === display.textContent) {
        time = Number(currentLevel) + 1;
        showWord(words)
        input.value = null
        score++
    }

    score === -1 ? scoreDisplay.textContent = 0 : scoreDisplay.textContent = score
}

function showWord(words) {
    const ramdomIndex = random(0, words.length)
    const word = words[ramdomIndex]
    display.innerHTML = ''
    word.split('').forEach(character => {
        const span = document.createElement('span')
        span.textContent = character
        display.appendChild(span)
    })
}

function random(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function timer() {
    const interval = setInterval(() => {
        if (time > 0) time--
        if (time === 0) {
            clearInterval(interval)
            input.disabled = true
            display.textContent = 'Game Over!🙅🏽'
        }
        timeDisplay.textContent = time
    }, 1000)
}

function setlevel() {
    const level = select.options[select.selectedIndex].value
    localStorage.setItem('level', level)
}

function getlevel() {
    return localStorage.getItem('level')
}
