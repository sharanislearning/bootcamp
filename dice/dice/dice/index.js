let randomNumber1 = Math.floor(Math.random() * 6)+1
let randomNumber2 = Math.floor(Math.random () * 6)+1

let diceimg1 ="dice" + randomNumber1 + ".png"
let diceimg2 ="dice" + randomNumber2 + ".png"

let source1 = "images/" + diceimg1
let source2 = "images/" + diceimg2

let changer1 = document.querySelectorAll("img")[0]
let changer2 = document.querySelectorAll("img")[1]

changer1.setAttribute('src',source1)
changer2.setAttribute('src',source2)

if(source1 > source2){
    document.querySelector("h1").innerHTML="Player1 is winner"
}else if(source1 < source2){
    document.querySelector("h1").innerHTML="Player2 is winner"
}else{
    document.querySelector("h1").innerHTML="It is a Tie"
}