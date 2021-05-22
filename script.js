
const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".options .playerX");
const selectBtnO = selectBox.querySelector(".options .playerO");
const playBoard = document.querySelector(".play-board");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;
 
window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}
 
selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); //cache le premier menu
    playBoard.classList.add("show"); //montre le jeu
}
 
selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide"); //cache le premier menu
    playBoard.classList.add("show"); //montre le jeu
    players.setAttribute("class", "players active player"); 
}
 
// user click function
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O"; //Si le joueur choisi 0 il à cette valeur 
        element.innerHTML = `<i class="${playerOIcon}" style="margin-top : 30%;"></i>`; //ajout de l'icone
        players.classList.add("active"); ///joueur actif
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}" style="margin-top : 30%;"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); //génère un nombre aléatoire
    setTimeout(()=>{
        bot(); 
    }, randomTimeDelay);
}
 
// bot auto select function
function bot(){
    let array = [];
    if(runBot){ 
        playerSign = "O"; 
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){ 
                array.push(i); 
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]; 
        if(array.length > 0){ 
            if(players.classList.contains("player")){ 
                playerSign = "X"; 
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}" style="margin-top : 30%;"></i>`;
                players.classList.remove("active"); 
                allBox[randomBox].setAttribute("id", playerSign); 
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}" style="margin-top : 30%;"></i>`; 
                players.classList.remove("active"); 
                allBox[randomBox].setAttribute("id", playerSign); 
            }
            selectWinner(); 
        }
        allBox[randomBox].style.pointerEvents = "none"; 
        playBoard.style.pointerEvents = "auto"; 
        playerSign = "X"; 
    }
}
 
function getIdVal(classname){
    return document.querySelector(".box" + classname).id; 
}
function checkIdSign(val1, val2, val3, sign){
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false;
        bot();
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); 
        wonText.innerHTML = `Joueur ${playerSign} gagne la partie!`; 
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot();
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match nul!";
        }
    }
}
 
replayBtn.onclick = ()=>{
    window.location.reload();
}