import "./style.css";
import "./words-skill15.json";
import prov from "../proverkaKnopki";

export default class {
  constructor(word, stackmanager, ev) {
    let container = document.getElementById("container-skill15");
    let question = document.getElementById("question-skill15");
    console.log(word);
    question.innerHTML = word['question'];
    window.addEventListener("keydown", arrow);
    let k = 0;
    document.getElementById("v-0").focus();
    function arrow(e) {
      if (e.key === "ArrowDown") {
        k++;
        if (k === container.children.length) {
          k = 0;
        }
        document.getElementById("v-" + k).focus();
      }
      if (e.key === "ArrowUp") {
        k--;
        if (k < 0) {
          k = container.children.length - 1;
        }
        document.getElementById("v-" + k).focus();
      }
    }
    let correctWord = word["answer"];
    let mas = [];
    for (const key in word["variant"]) {
      const element = word["variant"][key];
      mas.push(element);
    }
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    mas.sort(compareRandom);
    for (var i = 0; i < container.children.length; i++) {
      container.children[i].innerHTML = mas[i];
      container.children[i].onclick = event;
      container.children[i].onkeydown = event;
    }
    function event(e) {
      if (e.key === "Enter" || e.type === "click") {
        if (correctWord === e.path[0].innerHTML) {
          stackmanager.attack("hero", prov(ev));
        } else {
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill15").modal("hide");
        window.removeEventListener("keydown", arrow);
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
