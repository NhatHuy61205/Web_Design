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
var indexNavtabbar = 1
function activeNavtabbar(n){
    var x = document.getElementsByClassName('menu_navtabbar')
    for(var i = 0;i < x.length;i++)
        x[i].classList.remove('active')
    x[n-1].classList.add('active')
}