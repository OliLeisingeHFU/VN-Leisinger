namespace Droidhaven {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  //define saveData
  export let saveData = {
    ProtagName: {
      name: ""
    },
    ProtagClass: {
      name: "none",
      level: 0
    }
  };

  //define transitions
  export let transitions = {
    car: {
      duration: 3,
      alpha: "Images/Transitions/car-transition.png",
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
    },
    teacherroom_outside: {
      name: "Teachers Room",
      background: "Images/Backgrounds/Teacherroom_front.png"
    },
    classroom_front: {
      name: "Classroom",
      background: "Images/Backgrounds/classroom_frontview.png"
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
      name: "Dorothy",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        normal: "",
        smile: "Images/Characters/Dorothy.png"
      }
    },
    Nanako: {
      name: "Nanako",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        normal: "",
        smile: "Images/Characters/Dorothy.png"
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
      { scene: Text, name: "Scene" },
      { scene: mageClass, name: "MageClass", id: "mageClass"}
    ];
    //different paths: give scene id. can also add which scene is next with "next:". then return sceneid at end of previous scene

    ƒS.Progress.setData(saveData);
    // start the sequence
    ƒS.Progress.go(scenes);
  }
}