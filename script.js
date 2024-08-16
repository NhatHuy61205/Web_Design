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

