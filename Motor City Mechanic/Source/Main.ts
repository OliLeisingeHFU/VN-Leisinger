namespace MCM {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  export let locations = {
    nightstreet: {
      name: "nightstreet",
      background: "Images/Backgrounds/Street-at-Night.jpg"
    }
  }

  export let characters = {
    Thoughts: {
      name: "Thoughts"
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
      { scene: Drinking, name: "Scene" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}