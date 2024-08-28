// Date Picker
const datepicker = document.querySelector('.date-picker')
const calendarContainer = document.getElementById('calendarContainer')
const calendarBody = document.querySelectorAll('.calendar_body')
const yearMonth = document.querySelectorAll('.y-m h2')
const textDay = document.querySelectorAll('.select_date-picker')

let currentDate = new Date()
let currentMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),1)
let dateTochange = new Date()
renderCalendar(currentDate)

function renderCalendar(date) {
    const months = [
        'THÁNG MỘT', 'THÁNG HAI', 'THÁNG BA', 'THÁNG TƯ', 'THÁNG NĂM',
        'THÁNG SÁU', 'THÁNG BẢY', 'THÁNG TÁM', 'THÁNG CHÍN', 'THÁNG MƯỜI',
        'THÁNG MƯỜI MỘT', 'THÁNG MƯỜI HAI','THÁNG MỘT'
    ];

    const y = date.getFullYear();
    const m = date.getMonth()

    yearMonth.forEach((child,index) =>{
        child.textContent = `${months[m+index]} ${y}`
     })
    calendarBody.forEach((child,index) => {
        const firstDay = new Date(y, m + index, 1)
        const lastDay = new Date(y, m + 1 + index, 0)
        const days = lastDay.getDate()
        const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay()

        child.innerHTML = ''
        let r = document.createElement('tr')

        for (let i = 1; i < startDay; i++) {
            r.appendChild(document.createElement('td'));
        }

        for (let day = 1; day <= days; day++) {
            if(firstDay === currentMonth){
                if (r.children.length === 7){
                    child.appendChild(r)
                    r = document.createElement('tr')}
                    const x = document.createElement('td')
                    x.textContent = day;
                    if(day < currentDate.getDate())
                        x.classList.add('pass')
                    else
                        x.classList.add('day')
                    r.appendChild(x);
                }
            else{
                if (r.children.length === 7) {
                child.appendChild(r);
                r = document.createElement('tr'); }
                const x = document.createElement('td')
                x.textContent = day;
                x.classList.add('day')
                x.addEventListener('click', () => {
                    selectDate(y, m, day)
                })
                r.appendChild(x);
            }
        }

        while(r.children.length < 7) {
            r.appendChild(document.createElement('td'))
        }

        child.appendChild(r)

        function selectDate(year, month, day) {
            const selectedDate = new Date(year, month, day);
            textDay[index].value = `${day}/${month}/${year}`;
        }
    })
}

var prevBack = document.querySelector('.prev .back')
var prevNext = document.querySelector('.prev .next')

prevNext.addEventListener('click',() => {
    dateTochange.setMonth(dateTochange.getMonth()+1)
    renderCalendar(dateTochange)
})

prevBack.addEventListener('click',() => {
    if(dateTochange > currentDate){
   dateTochange.setMonth(dateTochange.getMonth()-1)
    renderCalendar(dateTochange)}
})

const dateBox = document.querySelectorAll('.date_box')
dateBox.forEach(child => {
    child.addEventListener('click',() =>
         calendarContainer.style.display= 'flex')
})

//load window
window.addEventListener('load',() =>{
    document.querySelector('.dots-bars-6').style.display = 'none'
    document.querySelector('.hiddenBody').style.display = 'block'
    })

//select custom 
const selects = document.querySelectorAll('.select_container')

selects.forEach(select => {
    const selectBox = select.querySelector('.select_box')
    const allOption = select.querySelector('.options')
    const text = select.querySelector('.select_box-text')
    const options = select.querySelectorAll('.options li')
    
    selectBox.addEventListener('click', () => {
        allOption.classList.toggle('active')
    });

    options.forEach(option => {
         option.addEventListener('click',()=>{
             text.innerText = option.innerText
             allOption.classList.remove('active')
         })
    })
});

const selects_booking = document.querySelectorAll('.select_container_from')

selects_booking.forEach(select => {
    const selectBox = select.querySelector('.select_box')
    const optionBox = select.querySelector('.option_box')
    const allOption = select.querySelectorAll('.option')
    const menu = select.querySelectorAll('.option_box .menu_option span')
    const textSelect = select.querySelector('.select_box-text')
    const options = select.querySelectorAll('.option li')
    const exit = select.querySelector('.exit_booking')

    selectBox.addEventListener('click', () => {
        selects_booking.forEach(noSelect => {
            if(select != noSelect){ 
                noSelect.querySelector('.option_box').style.display='none'
            }
            else
                optionBox.style.display='flex'
        })
    })

    menu.forEach((option,index) => {
        option.addEventListener('click',() => {
            for(var i = 0;i < menu.length; i++){
                menu[i].classList.remove('active')
                allOption[i].classList.remove('active')
            }
            option.classList.add('active')
            allOption[index].classList.add('active')
        })
    })

    options.forEach(text => {
        text.addEventListener('click',()=>{
            textSelect.value = text.innerText
        })
    })

    exit.addEventListener('click',() => {
        optionBox.style.display='none'
    })

    textSelect.addEventListener('input', () => {
        const x = textSelect.value.toLowerCase()
         options.forEach(option => {
            const y = option.textContent.toLowerCase()
            if(y.includes(x)){ option.style.display = 'block'}
            else { option.style.display = 'none'}
         })
    })
})

// Select Booking

// Slide wrapper
var play, playFooter
var checkSlide = false,checkSlideFooter = false

changeSlide(0,'.slide','.circle')

function changeSlide(n,slide,circle){
    var x = document.querySelectorAll(slide)
    var y = document.querySelectorAll(circle)
    for( var i = 0;i < x.length;i++){
        x[i].style.display = 'none'
        y[i].classList.remove('active')
    }
    x[n].style.display = 'flex'
    y[n].classList.add('active')
}

function moveSlide(n){
    var x = document.querySelectorAll('.footer_slide_box')
    var y = document.querySelectorAll('.select_footer_slide span')
    for(var i = 0;i < y.length;i++){
        x[i].style.transform = `translateX(${-100*n}%)`
        y[i].classList.remove('active')
    }
    y[n].classList.add('active')
}

function autoPlay(){
    var x = document.getElementById('playButton')
    var y = document.querySelectorAll('.circle')
    index = 0
    if(!checkSlide){
        x.classList.remove('fa-play')
        x.classList.add('fa-pause')
        play = setInterval(() => {
            changeSlide(index,'.slide','.circle')
            index += 1
            if(index > y.length - 1){index = 0}
        }, 2000)
        checkSlide = true
    }
    else{
        x.classList.add('fa-play')
        x.classList.remove('fa-pause')
        clearInterval(play)
        checkSlide = false
    }
}

function autoPlayFooter(){
    var x = document.getElementById('playButtonFooter')
    var y = document.querySelectorAll('.select_footer_slide span')
    indexfooter = 0
    if(!checkSlideFooter){
        x.classList.remove('fa-play')
        x.classList.add('fa-pause')
        playFooter = setInterval(() => {
            moveSlide(indexfooter)
            indexfooter += 1
            if(indexfooter > y.length - 1){indexfooter= 0}
        }, 10000)
        checkSlideFooter = true
    }
    else{
        x.classList.add('fa-play')
        x.classList.remove('fa-pause')
        clearInterval(playFooter)
        checkSlideFooter = false
    }
}
autoPlayFooter()
// Menu sign in
function hiddenBody(){
    document.getElementById('sign_in').style.display=('block')
    document.getElementById('overlay').style.display=('block')
}

function exitLogin(){
    document.getElementById('sign_in').style.display=('none')
    document.getElementById('overlay').style.display=('none')
}

var eyeCheck = flase        //Password checking

function eyeChecking(){     
    if (!eyeCheck){
        document.getElementById('accPass').type = 'text'
        document.getElementById('eye').classList.remove('fa-eye-slash')
        document.getElementById('eye').classList.add('fa-eye')
        eyeCheck = true;
    }
    else{
        document.getElementById('accPass').type = 'password'
        document.getElementById('eye').classList.add('fa-eye-slash')
        document.getElementById('eye').classList.remove('fa-eye')
        eyeCheck = false;
    }
}
// navbartab
function activeNavtabbar(n){
    var x = document.getElementsByClassName('menu_navtabbar')
    for(var i = 0;i < x.length;i++)
        x[i].classList.remove('active')
    x[n-1].classList.add('active')
    document.querySelector('.overlay_navtabbar').style.display='block'
}

function exitSubmenu(event){
    event.stopPropagation()
    var x = document.getElementsByClassName('menu_navtabbar')
    for(var i = 0;i < x.length;i++)
        x[i].classList.remove('active')
    document.querySelector('.overlay_navtabbar').style.display='none'
}


function changeInputCheckin(n){
    var x = document.getElementsByClassName('formCheckIn')
    var y = document.getElementsByClassName('select_option_checkIn')
    for(var i = 0;i < x.length; i++){
        x[i].classList.remove('active')
        y[i].classList.remove('active')
    }
    x[n-1].classList.add('active')
    y[n-1].classList.add('active')
}

