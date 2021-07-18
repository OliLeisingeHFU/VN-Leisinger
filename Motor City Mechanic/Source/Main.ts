namespace MCM {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  export let saveData = {
    score: 0,
    started: false,
    ended: false,
    waiting: false, 
    inv: false,
    sobbering: false,
    state: {
      yero: 0
    },
    happiness: 25,
    friendship: {
      Yuri: {
        state: "best friend",
        happiness: 100
      },
      Ame: {
        state: "stranger",
        happiness: 10
      },
      Azami: {
        state: "stranger",
        happiness: 10
      },
      Urban: {
        state: "stranger",
        happiness: 10
      },
      Books: {
        state: "stranger",
        happiness: 10
      },
    },
    drunkness: 0,
    yuriRabbit: "Pekora",
    d1evening: "",
    d1Ame: "",
    d1YuriUpgrade: "",
    d1Dio: "",
    d1AfterPartyDate: ""
  }
  export let miniGameAnswer: string[] = new Array;

  let credits: string[] = [
    "<b>Titlescreen:</b></br>\
    <i>Car:</i> Daniel Zhabotinsky on Sketchfab</br>\
    <i>Font:</i> Perfect Dark BRK by Ænigma Fonts",
    "<b>Backgrounds:</b></br>\
    Futuristic Reality 2 Pack by Rachel Chen",
    "<b>Hairstyles:</b></br>\
    <i>JJ & Dio:</i> https://booth.pm/en/items/2870629 / Male protagonist hair by Atelier Echo ~ アトリエ・エコー</br>\
    <i>Justice:</i> https://booth.pm/en/items/3028807 / Vroid Blonde Ponytail by nyxxxnoctis</br>\
    <i>Yuri:</i> 【Serena Kupopo - https://kupopo.net/】</br>\
    <i>Amelia:</i> https://booth.pm/en/items/3020826 / Vroid Hair Preset ane texture by nyxxxnoctis</br>\
    <i>Books:</i> https://booth.pm/ja/items/2933774 / Long Curly hair With headbang Preset by scarletanimefox</br>\
    <i>Nao:</i> https://booth.pm/ja/items/3044682 / Vroid~ Free hair preset 3 by alis</br>\
    <i>Azami:</i> https://booth.pm/ja/items/3044516 / Vroid~ Free hair preset by alis</br>\
    ",
    "<b>Music:</b></br>\
    <i>Alumo:</i> https://soundcloud.com/alumomusic/sets/synthwave",
    "<b>Textbox:</b></br>\
    https://otomeflag.itch.io/futuristic-hologram-01 by OTOME	&#10084; FLAG"
  ];
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
    if ((person.happiness - value) >= -100) {
      person.happiness -= value;
    } else {
      person.happiness = -100;
    }
  }

  export let yesno = {
    yes: "Yes",
    no: "No"
  }

  export async function fadeToBlack(): Promise<void>{
    await ƒS.Location.show(locations.black);
    ƒS.Character.hideAll();
    await ƒS.update(2);
  }
  export async function fadeToBlackMusicOff(): Promise<void>{
    ƒS.Sound.fade(playing, 0, 2, true);
    await ƒS.Location.show(locations.black);
    ƒS.Character.hideAll();
    await ƒS.update(2);
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
      case ingameMenu.credits:
          let current: number = 0;
          let flip = { back: "Back", next: "Next", done: "Close" };
          let choice: string;
          ƒS.Text.addClass("credits");
          do {
            ƒS.Text.print(credits[current]);
            choice = await ƒS.Menu.getInput(flip, "flip");
            switch (choice) {
              case flip.back:
                current = Math.max(0, current - 1);
                break;
              case flip.next:
                current = Math.min(credits.length - 1, current + 1);
                break;
            }
          } while (choice != flip.done);
          ƒS.Text.close();
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
        happy: "Images/Characters/Amelia/happy.png",
        angry: "Images/Characters/Amelia/angry.png",
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
    Azami: {
      name: "Azami",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Azami/.png",
        normal: "Images/Characters/Azami/neutral.png",
        happy: "Images/Characters/Azami/happy.png",
        surprised: "Images/Characters/Azami/surprised.png",
        angry: "Images/Characters/Azami/angry.png",
        cute: "Images/Characters/Azami/cute.png",
      }
    },
    Books: {
      name: "Books",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Books/.png",
        normal: "Images/Characters/Books/neutral.png",
        happy: "Images/Characters/Books/happy.png",
        surprised: "Images/Characters/Books/surprised.png",
        sad: "Images/Characters/Books/sad.png",
        cute: "Images/Characters/Books/cute.png",
      }
    },
    Urban: {
      name: "Urban",
      origin: ƒS.ORIGIN.BOTTOMCENTER,
      pose: {
        pathtemplate: "Images/Characters/Urban/.png",
        normal: "Images/Characters/Urban/neutral.png",
        happy: "Images/Characters/Urban/happy.png",
        surprised: "Images/Characters/Urban/surprised.png",
        angry: "Images/Characters/Urban/angry.png"
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
    Stop: {
      name: "Stop drinking",
      description: "",
      image: "",
      handler: stopDrinking
    }
  }

  function gettingDrunk(): void {
    console.log("getting drunk");
    saveData.drunkness += 100;
    if (!saveData.sobbering) {
      saveData.sobbering = true;
      setTimeout(unDrunk, 1000);
    }
  }
  function unDrunk(): void {
    if (saveData.drunkness - 5 >= 5) {
      saveData.drunkness -= 5;
      setTimeout(unDrunk, 1000);
    } else {
      saveData.drunkness = 0;
      saveData.sobbering = false;
    }
  }
  async function useAsacoco(): Promise<void> {
    await ƒS.Speech.tell(characters.Unknown, "Good morning, motherfuckers!");
    await ƒS.Speech.tell(characters.Thoughts, "Huh? Who said that?");
    await ƒS.Speech.tell(characters.Thoughts, "Weird...");
    await ƒS.Speech.tell(characters.Thoughts, "Must've been the wind.");
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
      case ƒ.KEYBOARD_CODE.I:
        if (saveData.inv) {
          ƒS.Inventory.close();
          saveData.inv = false;
        } else {
          ƒS.Inventory.open();
          saveData.inv = true;
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

  document.addEventListener("keydown", hndKeyPress);

  window.addEventListener("load", start);
  function start(_event: Event): void {
    //Menu
    gameMenu = ƒS.Menu.create(ingameMenu, menuFunctions, "gameMenu");

    // Important HTML Elements
    menu = <HTMLDialogElement>document.getElementsByClassName("gameMenu")[0];
    money = <HTMLDialogElement>document.getElementsByClassName("moneybar")[0];
    checklist = <HTMLDialogElement>document.getElementById("checklist");

    let scenes: ƒS.Scenes = [
      { scene: D1_Morning, name: "Scene1" },
      { scene: D1_Noon, name: "Scene2" },
      { scene: D1_Evening_Free, name: "D1_Evening_Free", id: "D1_Evening_Free" },
      { scene: D1_Evening_Work, name: "D1_Evening_Work", id: "D1_Evening_Work" },
      { scene: D1_Evening_Party, name: "D1_Evening_Party", id: "D1_Evening_Party" },
      { scene: D1_Evening_Free, name: "D1_AfterParty_Ame", id: "D1_AfterParty_Ame" },
      { scene: D1_Evening_Work, name: "D1_AfterParty_Azami", id: "D1_AfterParty_Azami" },
      { scene: D1_Evening_Party, name: "D1_AfterParty_Books", id: "D1_AfterParty_Books" },
      { scene: D1_Evening_Party, name: "D1_AfterParty_Urban", id: "D1_AfterParty_Urban" },
      { scene: Ending_Depression, name: "Ending_Depression", id: "Ending_Depression", next: "End_Credits" },
      { scene: End_Credits, name: "End_Credits", id: "End_Credits" }
    ];
    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    saveData.state = ƒS.Progress.setData(saveData.state, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}