namespace MCM {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  export let saveData = {
    score: 0,
    started: false,
    ended: false,
    waiting: false,
    state: {
      yero: 0
    },
    friendship: {
      Yuri: {
        state: "best friend",
        happiness: 100
      },
      Ame: {
        state: "stranger",
        happiness: 10
      }
    },
    drunkness: 0,
    sobbering: false,
    yuriRabbit: "Pekora",
    d1evening: "",
    d1Ame: "",
    d1YuriUpgrade: "",
    d1Dio: ""
  }
  export let miniGameAnswer: string[] = new Array;

  // Audio Control
  export let volume: number = 1.0;
  export let playing: string = "";

  export function incrementVolume(): void {
    if (volume <= 0.95) {
      volume = volume + 0.05;
      console.log(volume);
      ƒS.Sound.setMasterVolume(volume);
    }
  }

  export function decrementVolume(): void {
    if (volume >= 0.04) {
      volume = volume - 0.05;
      console.log(volume);
      ƒS.Sound.setMasterVolume(volume);
    }
  }

  export let music = {
    moringBGM: "Sound/Music/Alumo - Tapes.wav",
    noonBGM: "Sound/Music/Alumo - Vice.wav",
    eveningBGM: "Sound/Music/Alumo - Diotic.wav",
    partyBGM: "Sound/Music/Alumo - Outlander.wav",
    synthAdiago: "Sound/Music/.wav"
  }

  // Lazy functions
  export function higherFriendship(person: any, value: number) {
    if ((person.happiness + value) <= 100) {
      person.happiness += value;
    } else {
      person.happiness = 100;
    }
  }

  export function lowerFriendship(person: any, value: number) {
    if ((person.happiness + value) >= -100) {
      person.happiness += value;
    } else {
      person.happiness = -100;
    }
  }

  // Menu
  let ingameMenu = {
    save: "Save",
    load: "Load",
    volumeUp: "+",
    volumeDown: "-",
    credits: "Credits"
  }

  let gameMenu: ƒS.Menu;

  export let menu: HTMLDialogElement;
  export let openinv: boolean;
  export let money: HTMLDialogElement;
  export let checklist: HTMLDialogElement;

  async function menuFunctions(_opt: string): Promise<void> {
    switch (_opt) {
      case ingameMenu.save:
        await ƒS.Progress.save();
        break;
      case ingameMenu.load:
        await ƒS.Progress.load();
        break;
      case ingameMenu.volumeUp:
        incrementVolume();
        break;
      case ingameMenu.volumeDown:
        decrementVolume();
        break;
      default:
        console.log(gameMenu);
    }
  }


  export let locations = {
    JJ_apartement_out: {
      name: "JJ_apartement_out",
      background: "Images/Backgrounds/JJ_apartement_outside.jpg"
    },
    JJ_apartement_in: {
      name: "JJ_apartement_in",
      background: "Images/Backgrounds/JJ_apartement_inside.jpg"
    },
    MC_street_day: {
      name: "MC_street_day",
      background: "Images/Backgrounds/MC_streets_day.jpg"
    },
    workshop: {
      name: "JU_workshop",
      background: "Images/Backgrounds/JU_workshop.jpg"
    },
    kitchen: {
      name: "JU_kitchen",
      background: "Images/Backgrounds/JU_kitchen.jpg"
    },
    party: {
      name: "YU_party",
      background: "Images/Backgrounds/YU_party.jpg"
    },
    black: {
      name: "black",
      background: "Images/Backgrounds/black.png"
    },
    carscanner: {
      name: "CarScan",
      background: "Images/Backgrounds/CarScanMT.png"
    }
  }

  export let transitions = {
    eye: {
      duration: 2.5,
      alpha: "Images/Transitions/Eye.png",
      edge: 0.01
    },
    car: {
      duration: 1,
      alpha: "Images/Transitions/car.png",
      edge: 0.05
    }
  };

  export let characters = {
    Thoughts: {
      name: "Thoughts"
    },
    Unknown: {
      name: "???"
    },
    Speakers: {
      name: "Speakers"
    },
    JJ: {
      name: "JJ"
    },
    Justice: {
      name: "Justice",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Justice/.png",
        normal: "Images/Characters/Justice/neutral.png",
        smile: "Images/Characters/Justice/smile.png",
        angry: "Images/Characters/Justice/angry.png",
        sad: "Images/Characters/Justice/sad.png",
        thinking: "Images/Characters/Justice/thinking.png",
        closed: "Images/Characters/Justice/closed.png"
      }
    },
    Amelia: {
      name: "Amelia",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Amelia/.png",
        normal: "Images/Characters/Amelia/neutral.png",
        smile: "Images/Characters/Amelia/smile.png",
        angry: "Images/Characters/Amelia/angry.png",
        sad: "Images/Characters/Amelia/sad.png",
        questioning: "Images/Characters/Amelia/questioning.png"
      }
    },
    Yuri: {
      name: "Yuri",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Yuri/.png",
        normal: "Images/Characters/Yuri/neutral.png",
        happy: "Images/Characters/Yuri/happy.png",
        angry: "Images/Characters/Yuri/angry.png",
        sad: "Images/Characters/Yuri/sad.png",
        thinking: "Images/Characters/Yuri/thinking.png",
        explaining: "Images/Characters/Yuri/explaining.png",
        wink: "Images/Characters/Yuri/wink.png",
        smug: "Images/Characters/Yuri/smug.png",
        surprised: "Images/Characters/Yuri/smug.png"
      }
    },
    Dio: {
      name: "Dionysos",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Dio/.png",
        normal: "Images/Characters/Dio/neutral.png",
        smile: "Images/Characters/Dio/smile.png",
        angry: "Images/Characters/Dio/angry.png",
        sad: "Images/Characters/Dio/sad.png",
        questioning: "Images/Characters/Amelia/questioning.png"
      }
    },
    Nao: {
      name: "Nao",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Nao/.png",
        normal: "Images/Characters/Nao/normal.png",
        happy: "Images/Characters/Nao/happy.png",
        surprised: "Images/Characters/Nao/surprised.png",
        sad: "Images/Characters/Nao/sad.png"
      }
    },
    MinigameOverlays: {
      name: "Minigames",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Minigames/CarsScan-DN-Name.png",
        AmeD1: "Images/Minigames/CarScan-D1-Amelia.png",
        DioD1: "Images/Minigames/CarsScan-D1-Dio.png",
      }
    }
  }

  //Items
  export let items = {
    Rum: {
      name: "Rum",
      description: "A bottle of cheap white 'rum'",
      image: "Images/Items/Rum.png",
      handler: gettingDrunk
    },
    Asacoco: {
      name: "Merchandise",
      description: "An item of unknown function honoring the greatest dragon out there. Matane, Kaich&#333;! Arigathanks for all the kuso.",
      image: "Images/Items/Asacoco.png",
      handler: useAsacoco,
      static: true
    },
    Stop:{
      name: "Stop drinking",
      description: "",
      image: "",
      handler: stopDrinking
    }
  }

  function gettingDrunk(): void {
    console.log("getting drunk");
    saveData.drunkness += 100;
    if(!saveData.sobbering){
      saveData.sobbering = true;
      setTimeout(unDrunk, 1000);
    }
  }
  function unDrunk(): void {
    if(saveData.drunkness - 5 >= 5){
      saveData.drunkness -= 5;
      setTimeout(unDrunk, 1000);
    }else{
      saveData.drunkness = 0;
      saveData.sobbering = false;
    }
  }
  async function useAsacoco(): Promise<void> {
    await ƒS.Speech.tell(characters.Unknown, "Good morning, motherfuckers");
    await ƒS.Speech.tell(characters.JJ, "Huh? Who said that?");
    await ƒS.Speech.tell(characters.JJ, "Weird...");
    await ƒS.Speech.tell(characters.JJ, "Why would someone gift me something like this?");
  }
  function stopDrinking(): void {
    openinv = false;
    ƒS.Inventory.close();
  }

  // Keyboard Control
  async function hndKeyPress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
      case ƒ.KEYBOARD_CODE.F4:
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.F8:
        await ƒS.Progress.load();
        break;
      case ƒ.KEYBOARD_CODE.M:
        if (menu.style.visibility != "hidden") {
          menu.style.visibility = "hidden";
        } else {
          menu.style.visibility = "visible";
        }
        break;
      case ƒ.KEYBOARD_CODE.NUMPAD_SUBTRACT:
        decrementVolume();
        break;
      case ƒ.KEYBOARD_CODE.NUMPAD_ADD:
        incrementVolume();
        break;
    }
  }

/*   export function checklistFiller(elements: string[][]): void {
    for (let x: number = 0; x < elements.length; x++) {
      let li: HTMLLIElement = document.createElement("li");
      let input: HTMLInputElement = document.createElement("input");
      input.type = "checkbox";
      input.id = elements[x][0];
      input.name = elements[x][0];
      let label: HTMLLabelElement = document.createElement("label");
      label.innerHTML = elements[x][1];
      li.appendChild(input);
      li.appendChild(label);
      li.addEventListener("click", checkToggle);
      checklist.children[0].appendChild(li);
    }

    menu.style.visibility = "hidden";
    money.style.visibility = "hidden";
    checklist.style.visibility = "visible";
  }

  function checkToggle(this: HTMLElement): void {
    let checkbox: HTMLInputElement = <HTMLInputElement>this.children[0];
    if (checkbox.checked) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  }

  function confirmRep(): void {
    saveData.waiting = false;
    let checklistEntries: HTMLCollection = checklist.children[0].children;
    for (let x: number = 0; x < checklistEntries.length; x++) {
      if (checklistEntries[x].tagName == "LI") {
        let checkbox: HTMLInputElement = <HTMLInputElement>checklistEntries[x].children[0];
        if (checkbox.checked) {
          miniGameAnswer.push(checklistEntries[x].children[0].id);
        }
        checklistEntries[x].remove();
      }
    }
    checklist.style.visibility = "hidden";
  }

  export async function minigameInput(): Promise<void> {
    if (saveData.waiting) {
      await ƒS.Progress.delay(1);
      console.log("why");
      minigameInput();
    }
  } */


  document.addEventListener("keydown", hndKeyPress);

  window.addEventListener("load", start);
  function start(_event: Event): void {
    //Menu
    gameMenu = ƒS.Menu.create(ingameMenu, menuFunctions, "gameMenu");

    // Important HTML Elements
    menu = <HTMLDialogElement>document.getElementsByClassName("gameMenu")[0];
    money = <HTMLDialogElement>document.getElementsByClassName("moneybar")[0];
    checklist = <HTMLDialogElement>document.getElementById("checklist");

    //document.getElementById("confirmRep").addEventListener("click", confirmRep);

    let scenes: ƒS.Scenes = [
      { scene: D1_Morning, name: "Scene1" },
      //{ scene: D1_Noon, name: "Scene2" },
      //{ scene: D1_Evening_Free, name: "D1_Evening_Free", id: "D1_Evening_Free" },
      //{ scene: D1_Evening_Work, name: "D1_Evening_Work", id: "D1_Evening_Work" },
      //{ scene: D1_Evening_Party, name: "D1_Evening_Party", id: "D1_Evening_Party" },
      //{ scene: Ending_Depression, name: "Ending_Depression", id: "Ending_Depression", next: "End_Credits" },
      //{ scene: End_Credits, name: "End_Credits", id: "End_Credits" }
    ];
    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    saveData.state = ƒS.Progress.setData(saveData.state, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}

// for inventory: https://stackoverflow.com/questions/25152463/how-to-use-typescript-on-a-button-click
// for inventory: https://stackoverflow.com/questions/2788191/how-to-check-whether-a-button-is-clicked-by-using-javascript
// pictures: https://www.artbreeder.com/