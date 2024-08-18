// Slide wrapper
var index = 1;
var Play;
var check = false;
changeSlide(index);

function changeSlide(n){
    var x = document.getElementsByClassName('slide');
    var y = document.getElementsByClassName('circle');
    index = n;
    if(n > x.length) {index = 1};
    if(n < 1) { index = x.length};
    for( var i = 0;i < x.length;i++){
        x[i].style.display = 'none';
        y[i].classList.remove('active');
    }
    x[index-1].style.display = 'block';
    y[index-1].classList.add('active');
}

function autoPlay(){
    var x = document.getElementById('playButton');
    if(!check){
        x.classList.remove('fa-play');
        x.classList.add('fa-pause');
        Play = setInterval(function() {
            changeSlide(index += 1);
        }, 2000);
        check = true;
    }
    else{
        x.classList.add('fa-play');
        x.classList.remove('fa-pause');
        clearInterval(Play);
        check = false;
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
