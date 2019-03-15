import "./style.css";
import "./words-skill10.json";
import prov from "../proverkaKnopki";

export default class {
  constructor(word, stackmanager, ev) {
    let container = document.getElementById("container-skill10");
    let mas = [];
    for (const key in word["variant"]) {
      mas.push(word["variant"][key]);
    }
    window.addEventListener("keydown", arrow);
    let k = 0;
    document.getElementById("excess0").focus();
    function arrow(e) {
      if (e.key === "ArrowDown") {
        k++;
        if (k === container.children.length) {
          k = 0;
        }
        document.getElementById("excess" + k).focus();
      }
      if (e.key === "ArrowUp") {
        k--;
        if (k < 0) {
          k = container.children.length - 1;
        }
        document.getElementById("excess" + k).focus();
      }
    }
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    mas.sort(compareRandom);
    for (let i = 0; i < container.children.length; i++) {
      container.children[i].innerHTML = mas[i];
      container.children[i].onclick = event;
      container.children[i].onkeydown = event;
    }
    function event(e) {
      if (e.key === "Enter" || e.type === "click") {
        if (e.path[0].innerHTML === word["answer"]) {
          stackmanager.attack("hero", prov(ev));
        } else {
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill10").modal("hide");
        window.removeEventListener('keydown', arrow);
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
