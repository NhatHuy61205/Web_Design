//load window
window.addEventListener('load',() =>{
    document.querySelector('.dots-bars-6').style.display = 'none'
    document.querySelector('.hiddenBody').style.display = 'block'
    })

// Date Picker
const datepicker = document.querySelector('.date-picker')
const calendarContainer = document.querySelector('.date-picker .container')
const calendarBody = document.querySelectorAll('.calendar_body')
const yearMonth = document.querySelectorAll('.y-m h2')
const textDay = document.querySelectorAll('.select_date-picker')
var checkGo = false,checkBack = false

let currentDate = new Date()
let currentMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),1)
let dateTochange = new Date()
renderCalendar(currentDate)

function renderCalendar(date) {
    const months = ['THÁNG MỘT', 'THÁNG HAI', 'THÁNG BA', 'THÁNG TƯ', 'THÁNG NĂM',
                    'THÁNG SÁU', 'THÁNG BẢY', 'THÁNG TÁM', 'THÁNG CHÍN', 'THÁNG MƯỜI',
                    'THÁNG MƯỜI MỘT', 'THÁNG MƯỜI HAI','THÁNG MỘT'];

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
        const now = new Date()
        const nowMonthYear = new Date(now.getFullYear(),now.getMonth(),1)
        const nowDay = firstDay.getTime() === nowMonthYear.getTime() ? now.getDate() : 0
        for (let day = 1; day <= days; day++) {
                if (r.children.length === 7) {
                child.appendChild(r);
                r = document.createElement('tr'); }
                const x = document.createElement('td')
                x.textContent = day;
                if(day < nowDay)
                    x.classList.add('pass')
                else{
                    x.classList.add('day')
                    x.addEventListener('click', () => {
                        if(date2.style.display === 'none'){
                            selectDate(y, m, day, 0)
                        }
                        else{
                            const n = document.querySelectorAll('.day')
                            if(checkGo && checkBack){
                                for(let i = 0;i< n.length;i++)
                                    n[i].classList.remove('Di','Ve','gap')
                                selectDate(y, m, day,0)
                                x.classList.add('Di')
                                checkBack = false}
                            else if(!checkGo && !checkBack){
                                selectDate(y, m, day,0)
                                x.classList.add('Di')
                                checkGo = true
                            }
                            else{
                                var a = 0,b = 0
                                selectDate(y, m, day,1)
                                x.classList.add('Ve')
                                checkBack = true
                                for(let i = 0;i< n.length;i++){
                                    if(n[i].classList.contains('Di'))
                                        a = i
                                    if(n[i].classList.contains('Ve'))
                                        b = i
                                }
                                if(b < a){
                                    temp = textDay[0].value
                                    textDay[0].value = textDay[1].value
                                    textDay[1].value = temp
                                }
                            }
                        }
                    })
                }
                r.appendChild(x);
        }
        document.querySelectorAll('.day').forEach((x,index) =>{
            x.addEventListener('mouseover',() =>{
                if(checkGo && !checkBack){
                    let k = 0
                    const n = document.querySelectorAll('.day')
                    for(let i = 0 ;i < n.length;i++){
                        n[i].classList.remove('gap')
                    }
                    for(let i = 0 ;i < n.length;i++){
                        if(n[i].classList.contains('Di')){
                            k = i
                            break
                        }    
                    }
                    console.log(k)
                    if(k > index)
                        for(let i = index; i < k;i++)
                            n[i].classList.add('gap')
                    else
                        for(let i = k; i < index;i++)
                            n[i].classList.add('gap')
                }
            })
        })

        while(r.children.length < 7) {
            r.appendChild(document.createElement('td'))
        }

        child.appendChild(r)

        function selectDate(year, month, day,inputField) {
            textDay[inputField].value = `${day}/${month}/${year}`;
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

document.querySelector('.none').addEventListener('click',()=>{
    calendarContainer.style.display ='none';
})
const dateBox = document.querySelectorAll('.date_box')
dateBox.forEach(child => {
    child.addEventListener('click',() =>
         calendarContainer.style.display= 'flex')
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
const selectOptionBooking = document.querySelectorAll('.select_option_booking')
const date1 = document.querySelector('.date_current')
const date2 = document.querySelector('.date_next')
const form = document.querySelectorAll('.formBooking .form')
const mutil = document.querySelectorAll('.formBooking')
const arrow = document.querySelectorAll('.icon_swap .fa-solid')
mutil[1].style.display='none'
selectOptionBooking.forEach((selected,index) =>{
    selected.addEventListener('click',()=>{
        selectOptionBooking.forEach(off => {
            off.classList.remove('active')
        })
        selected.classList.add('active')
        if(index == 0){
            date1.style.display='block'
            date2.style.display='block'
            form[3].style.display='flex'
            mutil[1].style.display ='none'
            calendarContainer.style.width = '650px'
            calendarContainer.style.left = '-100%'
            for(var i = 0;i<arrow.length;i++){
                arrow[i].classList.add('fa-right-left')
                arrow[i].classList.remove('fa-right-long')}
        }
        if(index == 1){
            date1.style.display='block'
            date2.style.display='none'
            form[3].style.display='none'
            mutil[1].style.display ='none'
            calendarContainer.style.width = '325px'
            calendarContainer.style.left = '-25%'
            for(var i = 0;i<arrow.length;i++){
                arrow[i].classList.remove('fa-right-left')
                arrow[i].classList.add('fa-right-long')}
            }
        if(index == 2){
            date1.style.display='block'
            date2.style.display='none'
            form[3].style.display='none'
            mutil[1].style.display ='flex'
            calendarContainer.style.width = '325px'
            calendarContainer.style.left = '-25%'
            for(var i = 0;i<arrow.length;i++){
                arrow[i].classList.remove('fa-right-left')
                arrow[i].classList.add('fa-right-long')}
            }
    }) 
})
// Map Viet Nam
const maplabel = document.querySelectorAll('.map-label')
const local = ['quangninh','thanhhoa','quangbinh','danang','nghean','quangnam','binhdinh','phuyen','khanhhoa','lamdong','condao','hochiminh',
                'haiphong','camau','kiengiang','phuquoc','daklak','gialai','dienbien','ninhbinh', 'cantho','hanoi','thuathienhue']
const descriptionMap = document.querySelectorAll('.description .container')

maplabel.forEach((label,index) => {
    label.addEventListener('mouseover',() =>{
        for(var i = 0;i< local.length;i++){
            document.getElementById(local[i]).classList.remove('active')
            descriptionMap[i].classList.remove('active')}
        document.getElementById(local[index]).classList.add('active')
        descriptionMap[index].classList.add('active')
    })
    label.addEventListener('mouseout',() =>{
        for(var i = 0;i< local.length;i++)
        document.getElementById(local[index]).classList.remove('active')
    })
})

local.forEach((child,index) => {
    document.getElementById(child).addEventListener('mouseover',() =>{
        for(var i = 0;i < maplabel.length;i++){
            maplabel[i].classList.remove('active')
            descriptionMap[i].classList.remove('active')}
        maplabel[index].classList.add('active')
        descriptionMap[index].classList.add('active')
    })
    document.getElementById(child).addEventListener('mouseout',() =>{
        maplabel[index].classList.remove('active')
    })
})

// news slide
const textNews = document.querySelectorAll('.text_news span')
const selectNewsBack = document.querySelector('.select_news .back')
const selectNewsNext = document.querySelector('.select_news .next')
const countNews = document.querySelector('.select_news p')
let count = 0
function changeNews(){
    if (count >= textNews.length) {
        count = 0
    } else if (count < 0) {
        count = textNews.length - 1
    }
    
    countNews.textContent = `(${count + 1}/${textNews.length})`
    textNews.forEach(text => {
        text.style.transform = `translateY(-${count * 100}%)`
    })
}

selectNewsNext.addEventListener('click', () => {
    count += 1
    changeNews()
});

selectNewsBack.addEventListener('click', () => {
    count -= 1
    changeNews()
})

changeNews()

// bg white mobile changeslide 
const slideBgWhite = document.querySelectorAll('div.product')
var indexBgWhite = -1
document.querySelector('.mobile_button_row_top .prev_next').addEventListener('click',() =>{
    indexBgWhite += 1
    if(indexBgWhite >= slideBgWhite.length)
        indexBgWhite = -1
    for(var i=0;i< slideBgWhite.length;i++)
        slideBgWhite[i].classList.remove('active')
    slideBgWhite[indexBgWhite].classList.add('active')
})

document.querySelector('.mobile_button_row_top .prev_back').addEventListener('click',() =>{
    indexBgWhite -= 1
    if(indexBgWhite < 0)
        indexBgWhite = slideBgWhite.length -1
    for(var i=0;i< slideBgWhite.length;i++)
        slideBgWhite[i].classList.remove('active')
    slideBgWhite[indexBgWhite].classList.add('active')
})

// nav mobile
document.querySelector('.fa-bars').addEventListener('click',() =>{
    document.querySelector('.nav-mobile').classList.toggle('active')
})

document.querySelector('.exit_nav-moblie').addEventListener('click',() =>{
    document.querySelector('.nav-mobile').classList.remove('active')
})
//rating
const stars = document.querySelectorAll('.img-star')

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.classList.add('active')
            } else {
                star.classList.remove('active')
            }
        })
        document.querySelector('.suggest').style.display ='block'
    })
})

document.querySelector('.send').addEventListener('click',()=>{
    document.querySelector('.star-rating').style.display = 'none'
})

// Chat AI
document.querySelector('.connect_AI').addEventListener('click',()=>{
    alert('Hiện tại không có AI chat')
})
// down menu Footer
const downs = document.querySelectorAll('.down')
const downs_menu = document.querySelectorAll('.down_menu')
downs.forEach((down, index) => {
    down.addEventListener('click',() => {
        downs_menu[index].classList.toggle('active')

    })
});
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
    document.querySelector('.menu_navtabbar:first-child .submenu').style.display='none'
    document.querySelector('.select_booking').style.display='block'
    document.querySelector('.button_submit_booking').style.display='flex'
    document.querySelector('.booking h4').style.display='flex'
    document.querySelector('.exit_submenu').style.display='flex'
    document.querySelector('.overlay_navtabbar').style.display='block'
}

function exitSubmenu(event){
    event.stopPropagation()
    var x = document.getElementsByClassName('menu_navtabbar')
    for(var i = 0;i < x.length;i++)
        x[i].classList.remove('active')
    document.querySelector('.menu_navtabbar:first-child .submenu').style.display='block'
    document.querySelector('.select_booking').style.display='none'
    document.querySelector('.button_submit_booking').style.display='none'
    document.querySelector('.booking h4').style.display='none'
    document.querySelector('.overlay_navtabbar').style.display='none'
    document.querySelector('.exit_submenu').style.display='none'
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

// view more
function viewMore() {
    const loadMoreButton = document.getElementById('load-more');
    const hiddenSections = document.querySelectorAll('.product.flex.hidden');
    let currentIndex = 0;

    loadMoreButton.addEventListener('click', function() {
        if (currentIndex < hiddenSections.length) {
            hiddenSections[currentIndex].classList.remove('hidden');
            currentIndex++;
            if (currentIndex === hiddenSections.length) {
                loadMoreButton.style.display = 'none';
            }
        }
    });
}





