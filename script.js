let layer2 = document.querySelector('#layer2');
let lifeDiv = document.querySelector('#lifeNum');
let scoreDiv = document.querySelector('#scoreNum');
let results = document.querySelector('.results');
let interval1, interval2, interval3;    // for setIntervals

let isActive = true;

document.querySelector("#btn5").addEventListener('click',function(){
    document.querySelector('#layer1').style.display = "none";
    layer2.style.display = "block";
    start();
})
document.querySelector(".home").addEventListener('click',function(){
    layer2.style.display = "none";
    results.style.display = "none";
    clearInterval(interval1);
    clearInterval(interval2);
    while(layer2.childElementCount > 1){
        for(child of layer2.children){
            if(child.classList == "cloud"){
                layer2.removeChild(child);
            }
        }
    }
    document.querySelector('#layer1').style.display = "block";
})

window.addEventListener('focus',function(){
    isActive = true;
})
window.addEventListener('blur',function(){
    isActive = false;
})

let wordArray = ["rack","rank","hook","miss","fade","flag","peak","harm","cold","lick","halt","keep","crop","loan","date","pain","hate","fork","calf","push","cast","camp","wood","unit","love","fuel","note","area","scan","live","know","item","salt","rice","tune","chew","call","knit","sick","pass","cute","tray","knot","blue","loud","riot","work","spit","star","card","ample","cable","floor","noise","layer","queue","bread","gaffe","spite","swipe","claim","crack","store","pride","beach","brain","blast","curve","brink","swing","teach","slide","fence","trade","thumb","doubt","owner","urine","proud","snail","faint","trail","cower","merit","study","sharp","blank","brand","salad","spend","worry","reign","prize","light","decay","swear","cream","black","voice","witch","occupy","fossil","format","divide","unique","Sunday","remain","differ","layout","visual","invite","revise","affect","seller","action","murder","scheme","damage","writer","voyage","breathe","analyst","peasant","mention","curtain","scratch","crystal","brother","passage","theater","disclose","priority","assembly","mistreat","aquarium","producer","invasion"];

let divArray = [];
let lifes = 3,
    score = 0,
    speed = 1;

function start(){
    divArray = [];
    lifes = 3;
    lifeDiv.innerHTML = lifes;
    speed = 1;
    score = 0;
    scoreDiv.innerHTML = score;
    makeCloud();

    interval1 = setInterval(makeCloud ,3000);

    function makeCloud(){
        if(isActive){
            // create the DIV
            let div = document.createElement('div');
            div.classList.add("cloud");

            // append a word and background cloud image to that div
            let word = wordArray[Math.floor(Math.random()*99)].toUpperCase();
            let progress = 0;
            let html = "";
            for(i=0; i<word.length; i++){
                if(i<progress){
                    html = html + '<span style="color: red;">' + word[i] + '</span>';
                } else {
                    html = html + '<span style="color: black;">' + word[i] + '</span>';
                }
            }
            html = html + '<img src="./small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
            div.innerHTML = html;

            // attach div to the layer
            layer2.appendChild(div);
            let x = (Math.random() * (window.innerWidth-150)) + 50;
            let y = 20;
            div.style.left = x+"px";
            div.style.top = y+"px";
    
            divArray.push({
                div,
                word,
                active : false,
                progress,

            });
        }
    }

    interval2 = window.setInterval(animate,15);

    function animate(){
        if(isActive){
            divArray.forEach(function(obj,index){
                if(parseInt(obj.div.style.top) < window.innerHeight){
                    obj.div.style.top = (parseInt(obj.div.style.top) + speed) + "px" ;
                } else {
                    loselife();
                    if(lifes != 0){
                        layer2.removeChild(obj.div);
                        divArray.splice(index,1);
                    }
                }
            })
        }
    }

    interval3 = window.setInterval(function(){
        speed += 0.3;
        console.log("speed increased");
    }, 7000);

}




///////////// key press actions /////////////////////////////////////////////

window.addEventListener('keydown',keyPressed);

function keyPressed(e){
    // console.log(e.keyCode);
    flag = 0;
    for(i=0; i<divArray.length; i++){
        if( divArray[i].active == "true" ){
            flag = 1;
            if(divArray[i].word.charCodeAt(divArray[i].progress) == e.keyCode){
                divArray[i].progress++;

                let html = "";
                for(j=0; j<divArray[i].word.length; j++){
                    if(j<divArray[i].progress){
                        html = html + '<span style="color: red;">' + divArray[i].word[j] + '</span>';
                    } else {
                        html = html + '<span style="color: black;">' + divArray[i].word[j] + '</span>';
                    }
                }
                html = html + '<img src="images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
                divArray[i].div.innerHTML = html;                

                // CHECK IF WORD IS COMPLETE
                if(divArray[i].progress == divArray[i].word.length){
                    layer2.removeChild(divArray[i].div);
                    divArray.splice(i,1);
                    score++;
                    scoreDiv.innerHTML = score;
                }

            } else{
                divArray[i].progress = 0;
                divArray[i].active = "false"; 

                let html = "";
                for(j=0; j<divArray[i].word.length; j++){
                    if(j<divArray[i].progress){
                        html = html + '<span style="color: red;">' + divArray[i].word[j] + '</span>';
                    } else {
                        html = html + '<span style="color: black;">' + divArray[i].word[j] + '</span>';
                    }
                }
                html = html + '<img src="images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
                divArray[i].div.innerHTML = html; 
            }

        }
    }
    if( flag == 0){
        for(i=0; i<divArray.length; i++){
            if(divArray[i].word.charCodeAt(0) == e.keyCode){
                divArray[i].active = 'true';
                divArray[i].progress++;

                let html = "";
                for(j=0; j<divArray[i].word.length; j++){
                    if(j<divArray[i].progress){
                        html = html + '<span style="color: red;">' + divArray[i].word[j] + '</span>';
                    } else {
                        html = html + '<span style="color: black;">' + divArray[i].word[j] + '</span>';
                    }
                }
                html = html + '<img src="images/small-cloud.png" style="position: absolute; z-index: -1; width: 300%; transform: translate(-70%, -45%);">'
                divArray[i].div.innerHTML = html; 

            }
        }
    }
    
}

function loselife() {
    lifes--;
    lifeDiv.innerHTML = lifes;
    if(lifes == 0){
        EndGame();
    }
}

function EndGame() {
    clearInterval(interval1);
    clearInterval(interval2);
    clearInterval(interval2);
    document.querySelector('#resultsNum').innerHTML = score;
    results.style.display = "block";
}

