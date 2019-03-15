export default class Monster {
  constructor() {
    this.names = {
      FirstName: ["Уважаемый", "Омерзительный", "Игриво улыбающийся", "Немного косящий", "Выползший из подземелий", "Сын маминой подруги"],
      LastName: ["Петрович", "Михалыч", "Санек", "Генерал милиции", "Завхоз", "Слесарь"],
    }
    this.metaData = {
      explose: ["Shot1", "Shot2", "Shot3", "Shot4", "Shot5", "Shot6"],
      blackhole: ["firstPart", "secondPart"],
    };
    this.index = 0;
    this.sounds = {
      Pain: new Audio(),
      SoundWave: new Audio(),
      Explose: new Audio(),
      Death: new Audio(),
    };
    this.localData = {
      body: {
        Head: new Image(),
        LeftHand: new Image(),
        RightHand: new Image(),
        Body: new Image(),
        LeftLeg: new Image(),
        RightLeg: new Image(),
        Sword: new Image(),
        SlashFX: new Image(),
      }
    };
    this.Health = 100;
    this.Live = false;
    this.Stack = ["Breathe"];

  }

  setProperties(x, y, counters, coefficient) {
    this.X = x;
    this.Y = y-50;
    this.currentX = this.X;
    this.currentY = this.Y;
    this.breathecount = counters[0];
    this.rotatecount = counters[1];
    this.flycount = counters[2];
    this.paincount = counters[3];
    let promiseArr = [];
    this.coefficient = coefficient;
  }

  async loadLocalData() {
    this.nickName = this.names.FirstName[Math.floor(Math.random() * this.names.FirstName.length)] + " " + this.names.LastName[Math.floor(Math.random() * this.names.LastName.length)];
    let promiseArr = [];
    for (let key in this.localData) {
      for (let elem in this.localData[key]) {
        let name;
        if (typeof this.localData[key][elem] === "string") { name = this.localData[key][elem]; this.localData[key][elem] = new Image(); }
        else name = elem;
        promiseArr.push(new Promise(resolve => {
          this.localData[key][elem].onload = () => resolve();
          this.localData[key][elem].src = `./screens/monsters/localData/monster${Math.round(Math.random() * 5 + 1)}/${name}.png`;
        }))
      }
    }
    return Promise.all(promiseArr).then(() => this.Live = true);
  }

  async loadMetaData() {
    let promiseArr = [];
    for (let key in this.metaData) {
      for (let elem in this.metaData[key]) {
        let name;
        if (typeof this.metaData[key][elem] === "string") { name = this.metaData[key][elem]; this.metaData[key][elem] = new Image(); }
        else name = elem;
        promiseArr.push(new Promise(resolve => {
          this.metaData[key][elem].onload = () => resolve();
          this.metaData[key][elem].src = `./screens/monsters/metaData/${name}.png`;
        }))
      }
    }
    for (let elem in this.sounds) {
      promiseArr.push(new Promise(resolve => {
        this.sounds[elem].onloadeddata = () => resolve();
        this.sounds[elem].src = `./sounds/monster/${elem}.mp3`;
      }))
    }
    return Promise.all(promiseArr);
  }


  Breathe(canvas) {
    this.currentY = this.Y + this.breathecount();
    canvas.drawImage(this.localData.body.RightHand, this.X - 50 * this.coefficient, this.currentY + 180 * this.coefficient, 190 * this.coefficient, 200 * this.coefficient);
    canvas.drawImage(this.localData.body.LeftLeg, this.X + 45 * this.coefficient, this.Y + 340 * this.coefficient, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.RightLeg, this.X + 110 * this.coefficient, this.Y + 340 * this.coefficient, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.Body, this.X, this.currentY + 100 * this.coefficient, 270 * this.coefficient, 290 * this.coefficient);
    canvas.drawImage(this.localData.body.LeftHand, this.X + 200 * this.coefficient, this.currentY + 180 * this.coefficient, 150 * this.coefficient, 200 * this.coefficient);
    canvas.drawImage(this.localData.body.Head, this.X, this.currentY, 260 * this.coefficient, 220 * this.coefficient);
   }

  MonsterAttack(canvas) {
    this.currentY = this.Y + this.breathecount();
    let rotate = -this.rotatecount();
    canvas.save();
    canvas.translate(this.X + 200 * this.coefficient, this.currentY + 250 * this.coefficient);
    canvas.rotate(-rotate);
    canvas.drawImage(this.localData.body.RightHand, -260 * this.coefficient, 10 * this.coefficient,  190 * this.coefficient, 200 * this.coefficient);
    canvas.restore();
    canvas.drawImage(this.localData.body.LeftLeg, this.X + 45 * this.coefficient, this.Y + 340 * this.coefficient, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.RightLeg, this.X + 110 * this.coefficient, this.Y + 340 * this.coefficient, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.Body, this.X, this.currentY + 100 * this.coefficient, 270 * this.coefficient, 290 * this.coefficient);
    canvas.drawImage(this.localData.body.LeftHand, this.X + 200 * this.coefficient, this.currentY + 180 * this.coefficient, 150 * this.coefficient, 200 * this.coefficient);
    canvas.drawImage(this.localData.body.Head, this.X, this.currentY, 260 * this.coefficient, 220 * this.coefficient);
    
    if (rotate < -this.rotatecount.max) {

      this.Stack.push("Fly");
    }
    if (rotate > this.rotatecount.min) {
      this.Stack.unshift("Breathe");
      this.Stack.splice(this.Stack.indexOf("MonsterAttack"), 1);
    }
  }

  Fly(canvas) {
    let distance = this.flycount();
    canvas.drawImage(this.localData.body.SlashFX, this.X - distance, this.Y + 70 * this.coefficient, 200 * this.coefficient, 200 * this.coefficient);
    if (distance > this.flycount.max) {
      this.damage = 10;
      this.Stack.splice(this.Stack.indexOf("Fly"), 1);
      this.Stack.push("Explose");
    }
  }

  Explose(canvas) {
    
    this.sounds.Explose.play();
    if (this.index < this.metaData.explose.length) {
      canvas.drawImage(this.metaData.explose[this.index], this.X - this.flycount.max - 50 * this.coefficient, this.Y + 100 * this.coefficient, 220 * this.coefficient, 220 * this.coefficient);
      this.index += 1;
    }
    else {
      this.index = 0;
      this.Stack.splice(this.Stack.indexOf("Explose"), 1);
    }
  }

  Pain(canvas) {
    
    this.sounds.Pain.play();
    let pain = this.paincount();
    canvas.drawImage(this.localData.body.LeftLeg, this.X + 45 * this.coefficient, this.Y + 340 * this.coefficient, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.RightLeg, this.X + 110 * this.coefficient, this.Y + 340 * this.coefficient, 120 * this.coefficient, 120 * this.coefficient);
    canvas.save();
    canvas.save();
    canvas.translate(this.X + 70 * this.coefficient, this.currentY + 230 * this.coefficient);
    canvas.rotate(pain / 10);
    canvas.drawImage(this.localData.body.RightHand, -120 * this.coefficient, -50 * this.coefficient, 190 * this.coefficient, 200 * this.coefficient);
     canvas.restore();
    canvas.drawImage(this.localData.body.Body, this.X + pain, this.currentY + 100 * this.coefficient, 270 * this.coefficient, 290 * this.coefficient);
    canvas.drawImage(this.localData.body.Head, this.X + pain * 3, this.currentY, 260 * this.coefficient, 220 * this.coefficient);
    canvas.translate(this.X + 200 * this.coefficient, this.currentY + 250 * this.coefficient);
    canvas.rotate(pain / 10);
    canvas.drawImage(this.localData.body.LeftHand, 0 * this.coefficient, -70 * this.coefficient, 150 * this.coefficient, 200 * this.coefficient);
    canvas.restore();
    if (pain < this.paincount.min) {
      this.sounds.Pain.pause();

      this.Stack.splice(this.Stack.indexOf("Pain"), 1);
      if (this.Health <= 0) this.Stack.push("Death");
      else this.Stack.unshift("Breathe");
    }
  }



  Death(canvas) {
    let distance = this.flycount();
    this.sounds.Death.play();

    canvas.drawImage(this.metaData.blackhole[0], this.X - 120 * this.coefficient, canvas.canvas.height - 90 * this.coefficient, 500 * this.coefficient, 50 * this.coefficient);

    canvas.drawImage(this.localData.body.RightLeg, this.X + 110 * this.coefficient, this.Y + 340 * this.coefficient+ distance, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.LeftLeg, this.X + 45 * this.coefficient, this.Y + 340 * this.coefficient+ distance, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.localData.body.RightHand, this.X - 50 * this.coefficient, this.currentY + 180 * this.coefficient+ distance, 190 * this.coefficient, 200 * this.coefficient);
    canvas.drawImage(this.localData.body.Body, this.X, this.currentY + 100 * this.coefficient+ distance, 270 * this.coefficient, 290 * this.coefficient);
    canvas.drawImage(this.localData.body.LeftHand, this.X + 200 * this.coefficient, this.currentY + 180 * this.coefficient+ distance, 150 * this.coefficient, 200 * this.coefficient);
    canvas.drawImage(this.localData.body.Head, this.X, this.currentY+ distance, 260 * this.coefficient, 220 * this.coefficient);
   
    canvas.drawImage(this.metaData.blackhole[1], this.X - 120 * this.coefficient, canvas.canvas.height - 40 * this.coefficient, 500 * this.coefficient, 50 * this.coefficient);

    if (distance > this.flycount.max) {
      this.sounds.Death.pause();

      this.Stack.splice(this.Stack.indexOf("Death"), 1);
      this.Stack.unshift("Breathe");
      this.Live = false;
      this.Health = 100;
    }
  }
}
