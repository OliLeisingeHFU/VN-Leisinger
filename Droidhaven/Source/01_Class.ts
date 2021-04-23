namespace Droidhaven {
  export async function Text(): ƒS.SceneReturn {
    console.log("Class Choosing Process");

    let text = {
      Thoughts: {
        T0000: "",
        T0001: ""
      },

      Protagonist: {
        T0000: "",
        T0001: ""
      }
    }

    await ƒS.Location.show(locations.school);
    await FudgeStory.update(1);
    await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
    await ƒS.Speech.tell(characters.Thoughts, "You are like a child. Wacht this: S U C C");
  }
}