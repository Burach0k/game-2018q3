export default class Hero {
  constructor() {
    this.sounds = {
      Pain: new Audio(),
      SoundWave: new Audio(),
      Healing: new Audio(),
      Fire: new Audio(),
      Explose: new Audio(),
      Death: new Audio(),
      AttackByWeather: new Audio(),
      Lighting: new Audio(),
    };
    this.metaData = {
      body: {
        Head: new Image(),
        LeftHand: new Image(),
        RightHand: new Image(),
        Body: new Image(),
        LeftLeg: new Image(),
        RightLeg: new Image(),
        LeftArm: new Image(),
        RightArm: new Image(),
        Sword: new Image(),
        SlashFX: new Image(),
      },
      explose: ["explose1", "explose2", "explose3", "explose4", "explose5", "explose6","explose7","explose8","explose9"],
      fireball: ["fireball1", "fireball2","fireball3","fireball4"],
      clouds: ["clouds1", "clouds2"],
      lighting: [ "lighting1", "lighting2", "lighting3", "lighting4", "lighting5", "lighting6"],
      heart: ["heart1", "heart2", "heart3", "heart4", "heart5", "heart6", "heart7", "heart8", "heart9"],
      blackhole: ["blackhole1", "blackhole2"],
    };
    this.Stack = ["Breathe"];
    this.Health = 100;
    this.index = 0;
    this.Live = false;
  }

  setProperties(x, y, counters, coefficient) {
    this.X = x;
    this.Y = y;
    this.currentX = this.X;
    this.currentY = this.Y;
    this.breathecount = counters[0];
    this.rotatecount = counters[1];
    this.flycount = counters[2];
    this.paincount = counters[3];
    this.cloudcount = counters[4];
    this.healthcount = counters[5];
    this.coefficient = coefficient;
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
          this.metaData[key][elem].src = `./screens/hero/metaData/${name}.png`;
        }))
      }
    }
    for (let elem in this.sounds) {
      promiseArr.push(new Promise(resolve => {
        this.sounds[elem].onloadeddata = () => resolve();
        this.sounds[elem].src = `./sounds/hero/${elem}.mp3`;
      }))
    }
    return Promise.all(promiseArr).then(() => this.Live = true);
  }

  Breathe(canvas) {
    this.currentY = this.Y + this.breathecount();
    canvas.drawImage(this.metaData.body.RightLeg, this.X + 20 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftArm, this.X + 70 * this.coefficient, this.currentY + 140 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftLeg, this.X + 75 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftHand, this.X + 110 * this.coefficient, this.currentY + 180 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.Body, this.X + 20 * this.coefficient, this.currentY + 150 * this.coefficient, 110 * this.coefficient, 110 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightArm, this.X - 15 * this.coefficient, this.currentY + 150 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightHand, this.X - 20 * this.coefficient, this.currentY + 200 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.Head, this.X, this.currentY, 170 * this.coefficient, 170 * this.coefficient);
  }

  AttackBySoundWave(canvas) {
    this.currentY = this.Y + this.breathecount();
    let rotate = -this.rotatecount().toFixed(2);
    
    canvas.drawImage(this.metaData.body.RightLeg, this.X + 20 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftLeg, this.X + 75 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftArm, this.X + 70 * this.coefficient, this.currentY + 140 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftHand, this.X + 110 * this.coefficient, this.currentY + 180 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.Body, this.X + 20 * this.coefficient, this.currentY + 150 * this.coefficient, 110 * this.coefficient, 110 * this.coefficient);
    canvas.drawImage(this.metaData.body.Head, this.X, this.currentY, 170 * this.coefficient, 170 * this.coefficient);
    canvas.save();
    canvas.translate(this.X - 30 * this.coefficient - rotate*15, this.currentY + 170  * this.coefficient -rotate*15);
    canvas.rotate(rotate);
    canvas.drawImage(this.metaData.body.RightArm, -10 * this.coefficient,  0 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightHand,   -10 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.restore();
    if (rotate < -this.rotatecount.max) {
      this.Stack.push("SoundWave");
    }
    if (rotate > this.rotatecount.min) {
      this.Stack.unshift("Breathe");
      this.Stack.splice(this.Stack.indexOf("AttackBySoundWave"), 1);
    }
  }

  SoundWave(canvas) {
    this.sounds.SoundWave.play();
    let distance = this.flycount();
    canvas.drawImage(this.metaData.body.SlashFX, this.X + 100 * this.coefficient + distance, this.currentY + 70 * this.coefficient, 200 * this.coefficient, 200 * this.coefficient);
    if (distance > this.flycount.max) {
      this.sounds.SoundWave.pause();
      this.damage = 10;
      this.Stack.splice(this.Stack.indexOf("SoundWave"), 1);
      this.Stack.push("Explose");
    }
  }

  Explose(canvas) {
    this.sounds.Explose.play();
    if (this.index < this.metaData.explose.length) {
      canvas.drawImage(this.metaData.explose[this.index], this.X + this.flycount.max + 100 * this.coefficient, this.currentY + 100 * this.coefficient, 220 * this.coefficient, 220 * this.coefficient);
      this.index += 1;
    }
    else {
      this.index = 0;
      this.Stack.splice(this.Stack.indexOf("Explose"), 1);
    }
  }

  Pain(canvas) {
    let pain = this.paincount();
    this.sounds.Pain.play();
    canvas.drawImage(this.metaData.body.RightLeg, this.X + 20 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftLeg, this.X + 75 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.save();
    canvas.translate(this.X + 5 * this.coefficient, this.currentY + 180 * this.coefficient);
    canvas.rotate(-pain / 40);
    canvas.drawImage(this.metaData.body.LeftArm,  80 * this.coefficient,  -20 * this.coefficient, 70 * this.coefficient, 70 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftHand,  100 * this.coefficient,  -0 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.Body,  10 * this.coefficient,  -30 * this.coefficient, 110 * this.coefficient, 110 * this.coefficient);
    canvas.drawImage(this.metaData.body.Head, 0, 0, 170 * this.coefficient, -170 * this.coefficient);
    canvas.restore();
    canvas.save();
    canvas.translate(this.X + 20 * this.coefficient, this.currentY + 210 * this.coefficient);
    canvas.rotate(-pain / 40);
    canvas.drawImage(this.metaData.body.RightArm, - 35 * this.coefficient, - 55 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightHand,  - 40 * this.coefficient, -10 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
     canvas.restore();
    if (pain < this.paincount.min) {
      this.sounds.Pain.pause();
      this.Stack.splice(this.Stack.indexOf("Pain"), 1);
      if (this.Health <= 0) this.Stack.push("Death");
      else this.Stack.unshift("Breathe");
    }
  }
  AttackByFireball(canvas) {
    this.currentY = this.Y + this.breathecount();
    let rotate = -this.rotatecount();
    canvas.drawImage(this.metaData.body.RightLeg, this.X + 20 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftArm, this.X + 70 * this.coefficient, this.currentY + 140 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftLeg, this.X + 75 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftHand, this.X + 110 * this.coefficient, this.currentY + 180 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.drawImage(this.metaData.body.Body, this.X + 20 * this.coefficient, this.currentY + 150 * this.coefficient, 110 * this.coefficient, 110 * this.coefficient);   
    canvas.drawImage(this.metaData.body.Head, this.X, this.currentY, 170 * this.coefficient, 170 * this.coefficient);
    canvas.save();
    canvas.translate(this.X - 30 * this.coefficient - rotate*15, this.currentY + 170  * this.coefficient -rotate*15);
    canvas.rotate(rotate);
    canvas.drawImage(this.metaData.body.RightArm, -10 * this.coefficient,  0 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightHand,   -10 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
    canvas.restore();
    if (rotate < -this.rotatecount.max) {
      this.Stack.push("Fireball");
      this.Stack.splice(this.Stack.indexOf("AttackByFireball"), 1);
      this.Stack.push("AttackBySoundWave");
    }
  }

  Fireball(canvas) {
    this.sounds.Fire.play();
    if (this.index >= this.metaData.fireball.length) this.index = 0;
    let distance = this.flycount();
    canvas.drawImage(this.metaData.fireball[this.index], this.X + 100 * this.coefficient + distance, this.currentY - 70 * this.coefficient, 300 * this.coefficient, 400 * this.coefficient);
    this.index += 1;
    if (distance > this.flycount.max) {
      this.sounds.Fire.pause();
      this.damage = 15;
      this.index = 0;
      this.Stack.splice(this.Stack.indexOf("Fireball"), 1);
      this.Stack.push("Explose");
    }
  }

  AttackByWeather(canvas) {
    this.sounds.AttackByWeather.play();
    let distance = this.cloudcount();
    this.metaData.clouds.forEach((elem, index) => {
      canvas.drawImage(elem, this.X + this.flycount.max + 130 * this.coefficient + (index - 1) * 130 * this.coefficient, this.Y - 500 * this.coefficient + distance, 150 * this.coefficient, 140 * this.coefficient);
    })
    if (distance > this.cloudcount.max) {
      this.sounds.AttackByWeather.pause();
      this.index = 0;
      this.Stack.splice(this.Stack.indexOf("AttackByWeather"), 1);
      // this.Stack.push("Lighting");
    }
  }

  Lighting(canvas) {
    this.sounds.Lighting.play();
    let distance = (this.Y - 500 * this.coefficient + this.cloudcount.max + 120 * this.coefficient) / this.metaData.lighting.length;
    if (this.index <= this.metaData.lighting.length) {
      for (var i = 0; i < this.index; i++) {
        canvas.drawImage(this.metaData.lighting[i], this.X + this.flycount.max + 150 * this.coefficient, this.Y - 880 * this.coefficient + this.cloudcount.max + distance * i, 200 * this.coefficient, 700 * this.coefficient);
      }
      this.index += 1;
    }
    else {
      this.damage = 20;
      this.index = 0;
      this.Stack.push("Breathe");
      this.Stack.splice(this.Stack.indexOf("Lighting"), 1);
      this.Stack.push("Explose");
    }
  }

  Healing(canvas) {
    this.currentY = this.Y + this.breathecount();
    let rotate = -this.rotatecount();
    canvas.drawImage(this.metaData.body.RightLeg, this.X + 20 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
      canvas.drawImage(this.metaData.body.LeftArm, this.X + 70 * this.coefficient, this.currentY + 140 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
      canvas.drawImage(this.metaData.body.LeftLeg, this.X + 75 * this.coefficient, this.Y + 240 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
      canvas.drawImage(this.metaData.body.LeftHand, this.X + 110 * this.coefficient, this.currentY + 180 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
      canvas.drawImage(this.metaData.body.Body, this.X + 20 * this.coefficient, this.currentY + 150 * this.coefficient, 110 * this.coefficient, 110 * this.coefficient);
      canvas.drawImage(this.metaData.body.RightArm, this.X - 15 * this.coefficient, this.currentY + 150 * this.coefficient, 80 * this.coefficient, 80 * this.coefficient);
      canvas.drawImage(this.metaData.body.RightHand, this.X - 20 * this.coefficient, this.currentY + 200 * this.coefficient, 60 * this.coefficient, 60 * this.coefficient);
      canvas.drawImage(this.metaData.body.Head, this.X, this.currentY, 170 * this.coefficient, 170 * this.coefficient);
   

    if (rotate < -this.rotatecount.max) {
      this.Stack.push("Treatment");
      this.Stack.splice(this.Stack.indexOf("Healing"), 1);
      this.Stack.push("AttackBySoundWave");
    }
  }

  Treatment(canvas) {
    this.sounds.Healing.play();
    this.currentY = this.Y + this.breathecount();
      if (this.index < this.metaData.heart.length) {
        canvas.drawImage(this.metaData.heart[this.index], this.X - 10 * this.coefficient, this.Y + 260 * this.coefficient, 250 * this.coefficient, 170 * this.coefficient);
        this.index += 1;
      }
      else {
        this.index = 0;
      }
      canvas.drawImage(this.metaData.body.Head, this.X, this.currentY, 170 * this.coefficient, 170 * this.coefficient);
    if (this.healthcount.max <= this.healthcount()) {
      this.sounds.Healing.pause();
      if (this.Health + 20 < 100) this.Health += 20;
      else this.Health = 100;
      this.Stack.splice(this.Stack.indexOf("Treatment"), 1);
    }
  }

  Death(canvas) {
    let distance = this.flycount();
    this.sounds.Death.play();

    canvas.drawImage(this.metaData.blackhole[0], this.X - 120 * this.coefficient, canvas.canvas.height - 90 * this.coefficient, 500 * this.coefficient, 50 * this.coefficient);

    canvas.drawImage(this.metaData.body.LeftHand, this.X + 140 * this.coefficient, this.currentY + 220 * this.coefficient + distance, 100 * this.coefficient, 100 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightLeg, this.X + 10 * this.coefficient, this.Y + 270 * this.coefficient + distance, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftLeg, this.X + 90 * this.coefficient, this.Y + 270 * this.coefficient + distance, 120 * this.coefficient, 120 * this.coefficient);
    canvas.drawImage(this.metaData.body.LeftArm, this.X + 100 * this.coefficient, this.currentY + 140 * this.coefficient + distance, 140 * this.coefficient, 140 * this.coefficient);
    canvas.drawImage(this.metaData.body.Body, this.X - 40 * this.coefficient, this.currentY + 100 * this.coefficient + distance, 280 * this.coefficient, 280 * this.coefficient);
    canvas.drawImage(this.metaData.body.Head, this.X, this.currentY + distance, 260, 260);
    canvas.drawImage(this.metaData.body.RightHand, this.X - 20 * this.coefficient, this.currentY + 220 * this.coefficient + distance, 100 * this.coefficient, 100 * this.coefficient);
    canvas.drawImage(this.metaData.body.RightArm, this.X - 50 * this.coefficient, this.currentY + 140 * this.coefficient + distance, 140 * this.coefficient, 140 * this.coefficient);

    canvas.drawImage(this.metaData.blackhole[1], this.X - 120 * this.coefficient, canvas.canvas.height - 40 * this.coefficient, 500 * this.coefficient, 50 * this.coefficient);

    if (distance > this.flycount.max) {
      this.sounds.Death.pause();
      this.Stack.splice(this.Stack.indexOf("Death"), 1);
      this.Live = false;
    }

  }
  
}
