namespace Droidhaven {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  //define transitions
  export let transitions = {
    clock: {
      duration: 3,
      alpha: "",
      edge: 0.33
    }
  };

  //define sound
  export let sound = {
    //Musik
    backgroundTheme: "",

    //Sound
    click: ""
  };

  //define Locations
  export let locations = {
    school_outside: {
      name: "Droidhaven",
      background: "Images/Backgrounds/school_outside.png"
    }
  };

  //define characters
  export let characters = {
    Thoughts: {
      name: "Thoughts"
    },
    Protagonist: {
      name: "Fumio"
    },
    Dorothy: {
      name:"Dorothy",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        normal: "",
        smile: "Images/Characters/Dorothy.png"
      }
    }
  };

  document.addEventListener("keydown", hndKeyPress);

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

  console.log("FudgeStory template starting");

  window.addEventListener("load", start);
  function start(_event: Event): void {
    //define sequence of scenes
    let scenes: ƒS.Scenes = [
      { scene: Text, name: "Scene" }
    ];

    // start the sequence
    ƒS.Progress.go(scenes);
  }
}