
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
// Slide wrapper
var indexSlide = 1;
var Play;
var checkSlide = false;

changeSlide(indexSlide);
function changeSlide(n){
    indexSlide = n
    var x = document.getElementsByClassName('slide');
    var y = document.getElementsByClassName('circle');
    if(n > x.length) {indexSlide = 1};
    if(n < 1) { indexSlide = x.length};
    for( var i = 0;i < x.length;i++){
        x[i].style.display = 'none';
        y[i].classList.remove('active');
    }
    x[indexSlide-1].style.display = 'block';
    y[indexSlide-1].classList.add('active');
}

function autoPlay(){
    var x = document.getElementById('playButton');
    if(!checkSlide){
        x.classList.remove('fa-play');
        x.classList.add('fa-pause');
        Play = setInterval(function() {
            changeSlide(indexSlide += 1);
        }, 2000);
        checkSlide = true;
    }
    else{
        x.classList.add('fa-play');
        x.classList.remove('fa-pause');
        clearInterval(Play);
        checkSlide = false;
    }
}

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

// select custom