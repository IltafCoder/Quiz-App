
window.addEventListener("DOMContentLoaded", function () {

    let e = this.document.getElementsByClassName("auto-type")

    if (e[0]) {
        var typed = new Typed(".auto-type", {
            strings: ["Take This Test To Master Your Skills!", "Discover JavaScript Magic!", "Unlock JavaScript Secrets!"],
            typeSpeed: 60,
            backSpeed: 60,
            loop: true
        })

    }

})

var answer = false
var QNo = 1
var score = 0

var all_questions = {

    0: ["Which of the following methods can be used to display data in some form using Javascript?", "document.write()", "console.log()", "window.alert()", "All of the above"],
    1: ["How can a datatype be declared to be a constant type?", "const", "let", "var", "constant"],
    2: ["What keyword is used to check whether a given property is valid or not?", "in", "is in", "exists", "lies"],
    3: ["Inside which HTML element do we put the JavaScript?", "js", "script", "scripting", "javascript"],
    4: ["How do you write 'Hello' in an alert box?", "alertBox('Hello')", "msg('Hello')", "msgBox('Hello')", "alert('Hello')"],
    5: ["How can you add a comment in a JavaScript?", "'This is a comment", "//This is a comment", "^This is a comment", "#This is a comment"],
    6: ["How do you find the number with the highest value of x and y?", "top(x, y)", "ceil(x, y)", "Math.max(x, y)", "Math.ceil(x, y)"],
    7: ["Which event occurs when the user clicks on an HTML element?", "onclick", "onmouseover", "onmouseclick", "onchange"],
    8: ["Which operator is used to assign a value to a variable?", "*", "=", "==", "-"],
    9: ["Which company developed JavaScript?", "IBM", "Bell Labs", "Sun Microsystems", "Netscape"],

}

var all_answers = {

    0: "All of the above",
    1: "const",
    2: "in",
    3: "script",
    4: "alert('Hello')",
    5: "//This is a comment",
    6: "Math.max(x, y)",
    7: "onclick",
    8: "=",
    9: "Netscape"
}

var generatedNumbers = []

function nextQuestion() {

    let quiz = document.getElementById("test-start")
    quiz.style.display = "none"
    let btn_start = document.getElementById("btn-start")
    btn_start.style.display = "none"
    let quiz_h = document.getElementsByClassName("quiz-holder")
    quiz_h[0].style.display = "flex"
    let btn_next = document.getElementById("next-btn")
    btn_next.style.display = "block"

    let obj_len = Object.keys(all_questions).length

    let all_ans = Array.from(document.querySelectorAll("input[name='ans']"))
    let selectedValue = null;

    all_ans.forEach(element => {

        if (element.checked) {
            let x = element.parentNode
            selectedValue = x.textContent
        }
    })

    if (selectedValue !== null) {
        if (answer == selectedValue) {
            score = score + 10
        }
    }

    if (obj_len == 0) {
        let x = document.getElementsByTagName("button")
        let y = document.querySelector(".quiz-holder")
        let z = document.querySelector(".my-score")
        let btn = document.getElementById("try-again-btn")
        y.remove()
        btn.style.display = "block"
        z.style.display = "flex"
        x[1].style.display = "none"

        let sc = document.querySelector(".my-score label:nth-child(3)")
        sc.innerHTML = "Your Score: " + score

        // grade criteria

        var myGrade = ""
        let gr = document.querySelector(".my-score label:nth-child(4)")

        if (score >= 90 && score <= 100) {
            myGrade = "A+"
            gr.style.color = "cyan"
        }
        else if (score >= 80 && score <= 89) {
            myGrade = "A"
            gr.style.color = "blue"
        }
        else if (score >= 70 && score <= 79) {
            myGrade = "B"
            gr.style.color = "green"
        }
        else if (score >= 60 && score <= 69) {
            myGrade = "C"
            gr.style.color = "yellow"
        }
        else if (score >= 50 && score <= 59) {
            myGrade = "D"
            gr.style.color = "orange"
        }
        else {
            myGrade = "F"
            gr.style.color = "red"
        }

        gr.innerHTML = "Your Grade: " + myGrade

        let d = new Date()
        date = d.getDate()
        month = d.getMonth() + 1
        year = d.getFullYear()

        d = date + "/" + month + "/" + year
        var local_arr = Array.from(Object.keys(localStorage))
  
        var local_No = 0
        if (local_arr.length == 0) {
            local_No = 0
        }
        else {
            local_No  = Math.max(...local_arr)
        }
        localStorage.setItem(local_No + 1, score + " " + myGrade + " " + d)

    }

    if (obj_len == 0) {
        return
    }

    function getRandomNumber() {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 10)
        } while (generatedNumbers.includes(randomNumber))

        generatedNumbers.push(randomNumber)
        return randomNumber
    }

    const randomNumber = getRandomNumber()

    if (all_questions[randomNumber]) {

        var question = all_questions[randomNumber]
        question = all_questions[randomNumber]
        answer = all_answers[randomNumber]

        let ques_holder = document.querySelectorAll(".quiz-holder label")
        let radio = document.createElement("input")
        radio.type = "radio"
        radio.name = "ans"

        for (let i = 0; i < ques_holder.length; i++) {
            if (i == 0) {

                ques_holder[i].innerHTML = "Q" + QNo + " - " + question[i]
                QNo = QNo + 1
            }
            else {
                ques_holder[i].innerHTML = radio.outerHTML + question[i]
            }
        }
    }

    delete all_questions[randomNumber]

}

function showScore() {

    var full_arr = []

    Object.keys(localStorage).forEach(function (key) {
        let item = localStorage.getItem(key)
        var arr = Array.from(item.split(" "))
        arr.push(key)
        full_arr.push(arr)

    })

    full_arr.forEach(function(element) {
        
        let myTable = document.getElementsByTagName("table")
        let tr = document.createElement("tr")
        let td_1 = document.createElement("td")
        let td_2 = document.createElement("td")
        let td_3 = document.createElement("td")
        let td_4 = document.createElement("td")
        tr.appendChild(td_1)
        tr.appendChild(td_2)
        tr.appendChild(td_3)
        tr.appendChild(td_4)
        myTable[0].appendChild(tr)

        td_2.textContent = element[0]
        td_3.textContent = element[1]
        td_4.textContent = element[2]
        td_1.textContent = element[3]
    })
}

window.addEventListener("load", function() {

    let all_tabs = Array.from(document.querySelectorAll(".nav-bar ul li a"))
    var active_tab = ""
    console.log(active_tab)

    if (window.location.pathname.endsWith('score.html')) {
        showScore()
        active_tab = document.getElementById("score-tab")
    }
    else if (window.location.pathname.endsWith('index.html')) {
        active_tab = document.getElementById("index-tab")
    }
    else if (window.location.pathname.endsWith('test.html')) {
        active_tab = document.getElementById("test-tab")
    }
    all_tabs.forEach(function(element) {

        element.style.color = "white"
    })

    active_tab.style.color = "var(--yellow)"

})

function clearBtn() {
    let x = document.querySelector("#clear-all label")
    x.style.transform = "scale(1.1)"

    setTimeout(function () {
        x.style.transform = "scale(1)"
    }, 200)

    Object.keys(localStorage).forEach(function (key) {
        localStorage.removeItem(key)
    })

    let all_blocks = document.querySelectorAll("table tr")

    for (let i = 1; i < all_blocks.length; i++) {
        all_blocks[i].remove()
    }
}

function showMenuBar () {
    let y = document.getElementsByClassName("menu-bar")
    y[0].style.display = "flex"
}

function hideMenuBar () {

    let y = document.getElementsByClassName("menu-bar")
    y[0].style.display = "none"
}