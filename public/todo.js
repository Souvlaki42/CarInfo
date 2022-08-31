let calendar = document.querySelector(".calendar");
const dayList = {
    "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "gr": ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"]
}

isLanguage = (lang) => {
    const language = window.navigator.userLanguage || window.navigator.language;
    return language.includes(lang);
}

getMonthNames = () => {
    if (isLanguage("gr") || isLanguage("el")) {
        return dayList.gr;
    }
    return dayList.en;
}

const month_names = getMonthNames();

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

getSelectedDate = () => {
    return {day: document.querySelector(".curr-date") ? parseInt(document.querySelector(".curr-date").innerText) : 0, month: curr_month.value + 1, year: curr_year.value}
}

updateClickEvents = () => {
    const todoListItems = document.querySelectorAll(".todoListItem")
    const closeBtn = document.querySelectorAll(".close")
    
    for (let item of todoListItems) {
        item.addEventListener("click", () => {
            completeTodoListItem(item)
        })
    }

    for (let close of closeBtn) {
        close.innerText = "\u00D7"
        close.addEventListener("click", () => {
            deleteTodoListItem(close.parentElement)
        })
    }
}

updateDate = () => {
    const date = getSelectedDate()
    location.replace(`http://localhost:5000/todo?day=${date.day}&month=${date.month}&year=${date.year}`)
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector(".calendar-days")
    let calendar_header_year = calendar.querySelector("#year")

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ""

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 0)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement("div")
        if (i >= first_day.getDay()) {
            day.classList.add("calendar-day-hover")
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add("curr-date")
                selected_day = i - first_day.getDay() + 1
            }
        }
        calendar_days.appendChild(day)
        day.addEventListener("click", () => {
            const curr_date = document.querySelector(".curr-date")
            if (curr_date) curr_date.classList.remove("curr-date")
            day.classList.add("curr-date")
            updateClickEvents()
            updateDate()
        })
    }
}

let month_list = calendar.querySelector(".month-list")

month_names.forEach((e, index) => {
    let month = document.createElement("div")
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector("div").onclick = () => {
        month_list.classList.remove("show")
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector("#month-picker")

month_picker.onclick = () => {
    month_list.classList.add("show")
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector("#prev-year").onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector("#next-year").onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

let dark_mode_toggle = document.querySelector(".dark-mode-switch")

dark_mode_toggle.onclick = () => {
    document.querySelector("body").classList.toggle("light")
    document.querySelector("body").classList.toggle("dark")
}

updateTodoListTitle = () => {
    let list = document.querySelector(".todoList")
    let title = document.querySelector("#todoTitle")
    let allItems = document.querySelectorAll(".todoListItem")
    let remainingItems = []
    
    for (let item of allItems) {
        if (item.classList.contains("completed")) continue
        remainingItems.push(item)
    }

    title.innerText = `Todo List <${list.childElementCount},${remainingItems.length}>`
}


completeTodoListItem = (item) => {
    item.classList.toggle("completed")
    updateTodoListTitle()
}

deleteTodoListItem = (item) => {
    item.remove()
    updateTodoListTitle()
}

addTodoListItem = () => {
    let input = document.querySelector("#todoInput")
    if (!input.value) return

    let list = document.querySelector(".todoList")
    let item = document.createElement("li")
    let close = document.createElement("span")
    let text = null
    
    close.classList.add("close")
    close.innerText = "\u00D7"
    close.addEventListener("click", () => {
        deleteTodoListItem(item)
    })
    
    item.classList.add("todoListItem")
    text = input.value
    item.innerText = text
    item.appendChild(close)
    item.addEventListener("click", () => {
        completeTodoListItem(item)
    })
    input.value = ""
    list.appendChild(item)
    updateTodoListTitle()
    const date = getSelectedDate()
    axios.post(`/todo/add?item=${text}&day=${date.day}&month=${date.month}&year=${date.year}`).then(res => {return}).catch(err => console.log(err))
}

document.querySelector(".todoAddBtn").addEventListener("click", () => {
    addTodoListItem()
})

window.addEventListener("keydown", (event) => {
    let active = document.activeElement
    let input = document.querySelector("#todoInput")

    if (event.key === "Enter" && !event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey && input == active) {
        addTodoListItem()
    }
})

updateClickEvents()