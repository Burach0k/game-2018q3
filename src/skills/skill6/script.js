import "./style.css";
import prov from "../proverkaKnopki";
import "./words-skill6.json";

let ENTER = 13;
export default class {
  constructor(word, stackmanager, ev) {
    let flag = false;
    let input = document.getElementById("task-input5");
    $("#mySkill6").on('shown.bs.modal', function() {
      $('#task-input5').focus()
    });
    input.value = "";
    input.addEventListener("keydown", event);

    function event(e) {
      if (e.keyCode === ENTER) {
        for (const key in word) {
          if (word[key] === input.value.toLowerCase()) {
            flag = true;
            break;
          }
        }
        if (flag) {
          stackmanager.specialAttack("hero", prov(ev));
        } else {
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill6").modal("hide");
        input.removeEventListener("keydown", event);
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
