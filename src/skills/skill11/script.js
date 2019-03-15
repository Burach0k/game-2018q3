import "./findMistake.json";
import "./style.css";
import prov from "../proverkaKnopki"

findMistake.task = "findMistake";

export default function findMistake(stackmanager,jsonWord,ev) {
  let word = jsonWord.getRandomWord();
  let button = document.getElementById("confirmAnswer-findMistake");
  let taskWord = word.word;
  let positionMistake = Number(word.position);
  let trueLetter = word.correct;
  let userPosition = 0;
  let liWithMistake;
  let container = document.getElementById("container-findMistake");
  container.innerHTML = "";
  let ul = document.createElement("ul");

  taskWord.split("").forEach((element, index) => {
    let li = document.createElement("li");
    li.tabIndex = index;
    li.innerHTML = element;
    li.position = index + 1;
    li.onkeydown = CheckingLetter;
    if (index + 1 === positionMistake) liWithMistake = li;
    ul.appendChild(li);
  });

  window.addEventListener('keydown', arrow);
  let k = 0;
  function arrow(e){
    if(e.key === 'ArrowRight'){
      k++;
      if(k === ul.children.length){
        k = 0;
      }
      ul.children[k].focus();
    }
    if(e.key === 'ArrowLeft'){
      k--;
      if(k<0){
        k = ul.children.length-1;
      }
      ul.children[k].focus();
    }
  }

  ul.onclick = e => {
    e.target.style.backgroundColor = "red";
    userPosition = e.target.position;
  };
  container.appendChild(ul);

  function CheckingLetter(e) {
    if (e.key === "Enter" || e.type === "click") {
    liWithMistake.innerHTML = trueLetter;
    liWithMistake.style.backgroundColor = "green";

    if (userPosition === positionMistake) {
      stackmanager.attack("monstr", "MonsterAttack");
    } else {
      stackmanager.attack("hero", prov(ev));
    }

     $("#mySkill11").modal("hide");
     window.removeEventListener('keydown', arrow);
  }
  }
  
  let Attack = document.getElementById('Attack');
  Attack.style.display = 'inline-block';
  button.onclick = CheckingLetter;
}
