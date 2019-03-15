export default class {
  constructor(url) {
    this.url = url;
    this.words = "";
    this.promis = new Promise(resolve => {
      fetch(this.url)
        .then(json => {
          let text = json.text();
          resolve(text);
        })
        .catch(e => {
          console.log(e);
        });
    });
    this.promis.then(res => {
      this.words = JSON.parse(res);
    }).catch(e => {
      console.log(e)});
  }
  getFetch() {
    return this.words;
  }

  getRandomWord() {
    let i = 0;
    for (const key in this.words) {
      if (this.words.hasOwnProperty(key)) {
        i++;
      }
    }
    var random = Math.floor(Math.random() * (i - 1 + 1)) + 1;
    i = 0;
    for (const key in this.words) {
      if (this.words.hasOwnProperty(key)) {
        i++;
        if(i === random) return this.words[key];
      }
    }
  }
}
