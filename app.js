let game;


class Utils {
  static isAlpha(letter) {
    return typeof letter === "string" && letter.length === 1
      && (letter >= "a" && letter <= "z" || letter >= "A" && letter <= "Z");
  }
}

class UI {
  constructor(word_element, health_element, reset_button) {
    this.word_element = word_element;
    this.health_element = health_element;
    this.reset_button = reset_button;
  }
  
  empty(number) {
    this.word_element.innerHTML = "_".repeat(number);
  }
  
  introduceLetter(letter, indexes) {
    let split_string = this.word_element.innerHTML.split("");
    for (let index of indexes) {
      console.log(index);
      split_string[index] = letter;
    }
    this.word_element.innerHTML = split_string.join("");
  }
  
  updateHealth(number) {
    this.health_element.innerHTML = number.toString()
  }
  
  assignReset(resetFunction) {
    this.reset_button.addEventListener('click', resetFunction);
  }
}

class GamePlay {
  constructor(word, _UI) {
    this.health = 7;
    this._UI = _UI;
    this.word = word;
    this.word_map = {};
    for (let index = 0; index < this.word.length; index += 1) {
      if (!this.word_map.hasOwnProperty(word[index])) {
        this.word_map[word[index]] = [];
      }
      this.word_map[word[index]].push(index);
    }
    this.already_tried = [];
    this.correct_letters = [];
    this._UI.empty(word.length);
    this.updateHealth();
  }
  
  onSucceed() {
    alert("Game Won!");
  }
  
  updateHealth() {
    this._UI.updateHealth(this.health);
  }

  isVictory() {
    return this.correct_letters.length == Object.keys(this.word_map).length;
  }

  wrongLetter() {
    this.health -= 1;
    this.updateHealth();
    if (this.health == 0) {
      this.onFail()
    }
  }

  correctLetter(letter, indexes) {
    this._UI.introduceLetter(letter, indexes);
  }

  onFail() {
    alert("Game over! Word was " + this.word);
  }

  tryLetter(letter) {
    if (this.health == 0) {
      this.onFail()
      return;
    }
    if (this.isVictory()) {
      this.onSucceed();
      return;
    }
    if (Utils.isAlpha(letter) && !this.already_tried.includes(letter)) {
      this.already_tried.push(letter);

      if (!this.word_map.hasOwnProperty(letter)) {
        this.wrongLetter();
      }
      if (this.word_map.hasOwnProperty(letter)) {
        this.correctLetter(letter, this.word_map[letter]);
        this.correct_letters.push(letter);
        if (this.isVictory()) {
          this.onSucceed();
        }
      }
    }
  }

}


class Game {
  constructor(words, _UI) {
    this.words = [...words];
    this._UI = _UI;
    this._UI.assignReset(this.newGame);
    this.newGame();
  }

  newGame() {
    let word = this.words[Math.floor(Math.random() * this.words.length)];
    this.game_play = new GamePlay(word, this._UI);
  }
}

document.addEventListener("DOMContentLoaded",
  function () {
    let word_element = document.getElementById("word");
    let health_element = document.getElementById("health");
    let reset_button = document.getElementById("reset");

    fetch("words.txt")
      .then((res) => res.text())
      .then((text) => {
        // Do something with "text"
        let word_list = text.toUpperCase().split("\n");
        let _UI = new UI(word_element, health_element, reset_button);
        game = new Game(word_list, _UI);
      })
      .catch((e) => console.error(e));
    document.addEventListener('keydown', (event) => {
      console.log(`You pressed: ${event.key}`);
      game.game_play.tryLetter(event.key.toUpperCase());
    });
  })