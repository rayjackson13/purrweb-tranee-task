var duration = 360;
var margin = 960;
var articles = Array.from(document.getElementsByClassName("article"));
var animation = false;
var slide = 0;
var boxes = Array.from(document.getElementById("controls").children);

function load(){
    for(let i = 0; i < articles.length; i++){
        articles[i].style.display = 'none';
        articles[i].style.zIndex = 0;
    }
    articles[0].style.zIndex = 10;
    articles[0].style.display = 'block';
}

function accur(prevSlide){
    articles[slide].style.marginLeft = 0;
    articles[prevSlide].style.zIndex = 0;
    articles[prevSlide].style.display = "none";
    animation = false;
    
}

function animLeftOut(k){
    var startTime = Date.now();
    articles[k].style.marginLeft = 0;
    var timer = setInterval(function(){
        let timePassed = Date.now() - startTime;
        if(timePassed >= duration){
            clearInterval(timer);
        }
        draw(timePassed);
    }, 20);  
    function draw(timePassed){
        articles[k].style.marginLeft = -timePassed*margin/duration;               
    }
}

function animLeftIn(k){
    var startTime = Date.now();
    var beginMargin = margin;
    articles[k].style.marginLeft = beginMargin;      
    articles[k].style.display = 'block';      
    var timer = setInterval(function(){
        let timePassed = Date.now() - startTime;
        if(timePassed >= duration){
            clearInterval(timer);
        }
        draw(timePassed);
    }, 0);  
    function draw(timePassed){       
        articles[k].style.zIndex = 10;
        articles[k].style.marginLeft = beginMargin - timePassed*margin/duration;  
    }
}

function animRightOut(k){
    var startTime = Date.now();
    articles[k].style.marginLeft = 0;
    var timer = setInterval(function(){
        let timePassed = Date.now() - startTime;
        if(timePassed >= duration){
            clearInterval(timer);
        }
        draw(timePassed);
    }, 20);  
    function draw(timePassed){
        articles[k].style.marginLeft = timePassed*margin/duration;               
    }
}

function animRightIn(k){
    var startTime = Date.now();
    var beginMargin = -margin;
    articles[k].style.marginLeft = beginMargin;      
    articles[k].style.display = 'block';         
    var timer = setInterval(function(){
        let timePassed = Date.now() - startTime;
        if(timePassed >= duration){
            clearInterval(timer);
        }
        draw(timePassed);
    }, 0);  
    function draw(timePassed){       
        articles[k].style.zIndex = 10;
        articles[k].style.marginLeft = beginMargin + timePassed*margin/duration; 
    }
}

function nextPage(){
    if(!animation){
        animation = true;
        var prev = slide;
        if(slide >= articles.length - 1){
            setSlide(0);
        }else{
            setSlide(slide + 1);
        }
        animLeftOut(prev);
        animLeftIn(slide); 
        setTimeout(function(){
            accur(prev);
        }, duration+20);
    }
}

function previousPage(){
    if(!animation){
        animation = true;
        var prev = slide;
        if(slide <= 0){
            setSlide(articles.length - 1);
        }else{
            setSlide(slide - 1);
        }
        animRightOut(prev);
        animRightIn(slide); 
        setTimeout(function(){
            accur(prev);
        }, duration+20);
    }
}

function setPage(n){
    if(!animation){
        var prev = slide;
        animation = true;
        if(n > articles.length - 1){
            setSlide(n % articles.length - 1);
        }else if(n < 0){
            setSlide(articles.length - 1);
        }else if(n != slide){
            setSlide(n);
        }
        if(slide > prev){
            animLeftOut(prev);
            animLeftIn(slide);
        }
        if(slide < prev){
            animRightOut(prev);
            animRightIn(slide);
        }
        setTimeout(function(){
            accur(prev);
        }, duration+20);
    }
}

function resetAnimation(){
    animation = false;
}

function setSlide(n){
    boxes[slide].classList.remove("checked");
    if(n < 0){
        n = articles.length - 1;
    }
    if(n > articles.length - 1){
        n = 0;
    }
    slide = n;
    boxes[n].classList.add("checked");
    
}