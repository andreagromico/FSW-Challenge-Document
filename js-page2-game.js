// Define Variable

// player
const player_batu = document.getElementById("player-batu")
const player_kertas = document.getElementById("player-kertas")
const player_gunting = document.getElementById("player-gunting")

// computer
const com_batu = document.getElementById("com-batu")
const com_kertas = document.getElementById("com-kertas")
const com_gunting = document.getElementById("com-gunting")

// result & reload
const show_result = document.getElementById("output-result");
const reload_click = document.getElementById("reload-player-click");


//Parent Class Game & method
class Game{
  constructor(computerShuffle, computerChoice, game_output, result_showing) {
      this.computerShuffle = computerShuffle
      this.computerChoice = computerChoice
      this.game_output = game_output
      this.result_showing = result_showing
  }

  //Choose logic
  choose(){
      const computerShuffle = ["ROCK", "PAPER", "SCISSORS"];
      this.computerChoice = computerShuffle[Math.floor(Math.random() * computerShuffle.length)];
  }

  //Logic game
  logicalmethod(){
      if(this.playerChoice == this.computerChoice){
          this.game_output = "Draw"
          this.result_showing = "DRAW"
          this.gameResult()
          
      }else if (
          (this.playerChoice === "ROCK" && this.computerChoice === "SCISSORS") 
          || (this.playerChoice === "SCISSORS" && this.computerChoice === "PAPER") 
          || (this.playerChoice === "PAPER" && this.computerChoice === "ROCK")
          ){
              this.game_output = "PlayerWin"
              this.result_showing = "PLAYER 1 WIN"
              this.gameResult()

      }else{
          this.game_output = "ComputerWin"
          this.result_showing = "COM WIN"
          this.gameResult()
      }
  }

  //output
  gameResult(){
      show_result.classList.remove("middle-versus")
      show_result.classList.add(this.game_output)
      show_result.innerHTML = this.result_showing;  
      console.log(this.result_showing)
  }

  // stop option supaya setelah player click pilihan, kemudian tidak bisa click pilihan lain 
  stop_option_freeze(){
      player_batu.style.pointerEvents = "none"
      player_kertas.style.pointerEvents = "none"
      player_gunting.style.pointerEvents = "none"
  }

  // game reload
  refresh(){
      reload_click.addEventListener("click", () => {
      player_batu.style.pointerEvents = 'auto';
      player_kertas.style.pointerEvents = 'auto';
      player_gunting.style.pointerEvents = 'auto';

      player_batu.style.backgroundColor = "#9C835F";
      player_kertas.style.backgroundColor = "#9C835F";
      player_gunting.style.backgroundColor = "#9C835F";
      com_batu.style.backgroundColor = "#9C835F";
      com_kertas.style.backgroundColor = "#9C835F";
      com_gunting.style.backgroundColor = "#9C835F";


      show_result.classList.remove("Draw");
      show_result.classList.remove("PlayerWin");
      show_result.classList.remove("ComputerWin");
      show_result.classList.add("middle-versus");
      show_result.innerHTML = "VS";
      
      this.playerChoice=""
      this.shuffle=""

      })
  }

}

// Inheritance 
class PlayerCom extends Game{
  constructor(computerShuffle,computerChoice,playerChoice) {
      super(computerShuffle,computerChoice)
      this.playerChoice = playerChoice  
  }
  
  ROCK(){
      player_batu.addEventListener("click", () => {
      this.playerChoice = "ROCK";
      player_batu.style.backgroundColor = "silver"
      super.choose()
      this._comBg()
      this.logicalmethod()
      this.stop_option_freeze()
      })
  }

  PAPER(){
    player_kertas.addEventListener("click", () => {
    this.playerChoice = "PAPER"
    player_kertas.style.backgroundColor = "silver"
    super.choose()
    this._comBg()
    this.logicalmethod()
    this.stop_option_freeze()
    })
}

  SCISSORS(){
      player_gunting.addEventListener("click", () => {
      this.playerChoice = "SCISSORS";
      player_gunting.style.backgroundColor = "silver"
      super.choose()
      this._comBg()
      this.logicalmethod()
      this.stop_option_freeze()
      })
  }

  _comBg(){
    if(this.computerChoice == "ROCK"){
        com_batu.style.backgroundColor = "silver";
    }else if (this.computerChoice == "PAPER"){
        com_kertas.style.backgroundColor = "silver";
    }else{
        com_gunting.style.backgroundColor = "silver";
    }
}
}


const play = new PlayerCom();
play.ROCK()
play.PAPER()
play.SCISSORS()
  
const repeat = new Game()
repeat.refresh()  