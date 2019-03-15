import prov from "../proverkaKnopki";
import "./style.css";
export default class {
  constructor() {
    this.a;
    this.b;
    this.span1;
    this.span2;
  }
  addListener(stackmanager,ev) {
    let flag = false;
    var input = document.getElementById("task-input1");
    $("#mySkill1").on('shown.bs.modal', function() {
      $('#task-input1').focus()
    });
    input.addEventListener("keydown", event);
    input.value = '';
    function event(e) {
      this.span1 = document.getElementById("span1-skill1");
      this.span2 = document.getElementById("span2-skill1");
      this.a = Number(this.span1.innerHTML);
      this.b = Number(this.span2.innerHTML);
      if (e.keyCode === 13) {
        if (this.a - this.b > 0) {
          if (input.value === ">") {
            flag = true;
          }
        }
        if (this.a - this.b < 0) {
          if (input.value === "<") {
            flag = true;
          }
        }
        if (this.a === this.b) {
          if (input.value === "=") {
            flag = true;
          }
        }
        if (flag) {
          stackmanager.attack("hero", prov(ev));
        } else {
          stackmanager.attack("monstr", "MonsterAttack");
        }
        $("#mySkill1").modal("hide");
        input.removeEventListener("keydown", event);
        flag = false;
      }
    }
    
    let Attack = document.getElementById('Attack');
    Attack.style.display = 'inline-block';
  }
}
