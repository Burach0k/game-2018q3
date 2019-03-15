export default class StackManager {
  constructor(hero, monstr) {
    this.hero = hero;
    this.monstr = monstr;
    this.firstStack = this.hero;
    this.secondStack = this.monstr;
    this.flag = true;
    this.TotalScore = 0;
  }
  analys(canvas) {
    if (this.monstr.Stack[this.monstr.Stack.length - 1] === "Explose") {
      if (this.flag) {
        this.hero.Health -= this.monstr.damage;
        this.flag = false;
      }
      this.firstStack = this.hero;
      this.secondStack = this.monstr;
      this.hero.Stack.splice(this.hero.Stack.indexOf("Breathe"), 1);
      this.hero.Stack.push("Pain");
    }
    else if (this.hero.Stack[this.hero.Stack.length - 1] === "Explose") {
      if (this.flag) {
        this.monstr.Health -= this.hero.damage;
        this.TotalScore += this.hero.damage;
        this.flag = false;
      }
      this.firstStack = this.monstr;
      this.secondStack = this.hero;
      this.monstr.Stack.splice(this.monstr.Stack.indexOf("Breathe"), 1);
      this.monstr.Stack.push("Pain");
    }
    else if (this.monstr.Stack.indexOf("Fly") != -1) {
      this.flag = true;
      this.firstStack = this.hero;
      this.secondStack = this.monstr;
    }
    else {
      this.flag = true;
      this.firstStack = this.monstr;
      this.secondStack = this.hero;
    }
    this.leave(canvas, this.firstStack, this.secondStack);
  }


  attack(charackter, nameOfAttack) {
    // if(nameOfAttack ==="Lighting"){
    //   this[charackter].Stack.push(nameOfAttack);
    // }
    if (this[charackter].Stack.indexOf("Breathe") !== -1) this[charackter].Stack.splice(this[charackter].Stack.indexOf("Breathe"), 1);
    this[charackter].Stack.push(nameOfAttack);
  }

  specialAttack(charackter, nameOfAttack) {
    this[charackter].Stack.push(nameOfAttack);
  }

  leave(canvas, firstStack, secondStack) {
    firstStack.Stack.forEach(elem => firstStack[elem](canvas));
    secondStack.Stack.forEach(elem => secondStack[elem](canvas));
  }
}

