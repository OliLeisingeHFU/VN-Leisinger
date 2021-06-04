namespace Droidhaven {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  //define sound
  export let sound = {
    //Musik
    backgroundTheme: "",

    //Sound
    restaurant: "Sound/Ambiance/crowded.mp3",
    ramsay: "Sound/Ambiance/ramsay-chan.mp3"
  };

  //define Locations
  export let locations = {
    restaurant: {
      name: "restaurant",
      background: "Images/Backgrounds/res.jpg"
    },
    black: {
      name: "black",
      background: "Images/Backgrounds/black.png"
    }
  };

  //define characters
  export let characters = {
    Narrator: {
      name: ""
    },
    Karen: {
      name: "Karen",
      origin: ƒS.ORIGIN.BOTTOMLEFT,
      pose: {
        normal: "Images/Characters/Dorothy.png"
      }
    },
    Waiter: {
      name: "Waiter",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        normal: "Images/Characters/Moth_Girl.png"
      }
    }
  };



  document.addEventListener("keydown", hndKeyPress);

  async function hndKeyPress(_event: KeyboardEvent): Promise<void> {
    switch (_event.code) {
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

  export async function signalDelay(seconds: number): Promise<ƒS.Signal> {
    return ƒS.Progress.defineSignal([() => ƒS.Progress.delay(seconds)]);
  }

  console.log("FudgeStory template starting");

  window.addEventListener("load", start);
  function start(_event: Event): void {
    //define sequence of scenes
    let scenes: ƒS.Scenes = [
      { scene: restaurant, name: "Scene" }
    ];
    //different paths: give scene id. can also add which scene is next with "next:". then return sceneid at end of previous scene
    // start the sequence
    ƒS.Progress.go(scenes);
  }
}