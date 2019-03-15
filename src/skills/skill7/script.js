import "./style.css";
import prov from "../proverkaKnopki";
import "./words-skill7.json";

export default class {
  constructor(stackmanager, color, ev) {
    let container = document.getElementById("container-skill7");
    let needColor = document.getElementById("color-skill7");
    window.addEventListener("keydown", arrow);
    let k = 0;
    document.getElementById("color-block0").focus();
    function arrow(e) {
      if (e.key === "ArrowRight") {
        k++;
        if (k === container.children.length) {
          k = 0;
        }
        document.getElementById("color-block" + k).focus();
      }
      if (e.key === "ArrowLeft") {
        k--;
        if (k < 0) {
          k = container.children.length - 1;
        }
        document.getElementById("color-block" + k).focus();
      }
    }
    let mas = [];
    for (const key in color["variant"]) {
      mas.push(color["variant"][key]);
    }
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
    mas.sort(compareRandom);
    let j = container.children.length;
    for (let i = 0; i < container.children.length; i++) {
      container.children[i].innerHTML = mas[i];
      container.children[i].style.color = mas[j--];
      container.children[i].onkeydown = container.children[
        i
      ].onclick = function event(e) {
        if (e.type === "click" || e.key === "Enter") {
          if (needColor.innerHTML === e.path[0].style.color) {
            stackmanager.attack("hero", prov(ev));
          } else {
            stackmanager.attack("monstr", "MonsterAttack");
          }
          $("#mySkill7").modal("hide");
          window.removeEventListener("keydown", arrow);
        }
      };
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
