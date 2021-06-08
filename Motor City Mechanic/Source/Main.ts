namespace MCM {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  export let saveData = {
    score: 0,
    ended: false,
    state: {
      scratch: 0
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
    black: {
      name: "black",
      background: "Images/Backgrounds/black.png"
    }
  }

  export let characters = {
    Thoughts: {
      name: "Thoughts"
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
        thinking: "Images/Characters/Justice/thinking.png"
      }
    }
  }

  export let items = {
    Rum: {
      name: "Rum",
      description: "A bottle of cheap white 'rum'",
      image: "Images/Items/Rum.png"
    }
  }

  async function hndKeyPress(_event: KeyboardEvent): Promise<void>{
    switch (_event.code){
      case ƒ.KEYBOARD_CODE.F4:
      	console.log("Save");
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.F8:
        console.log("Load");
        await ƒS.Progress.load();
        break;
    }
  }

  document.addEventListener("keydown", hndKeyPress);

  window.addEventListener("load", start);
  function start(_event: Event): void {
    let scenes: ƒS.Scenes = [
      { scene: D1_Morning, name: "Scene" }
    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    saveData.state = ƒS.Progress.setDataInterface(saveData.state, uiElement);
    // start the sequence
    ƒS.Progress.go(scenes);
  }
}