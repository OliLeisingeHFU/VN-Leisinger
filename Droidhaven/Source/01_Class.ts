namespace Droidhaven {
    export async function mageClass(): ƒS.SceneReturn {
        await ƒS.Location.show(locations.classroom_front);
        await ƒS.update(1);
        let text = {
            Thoughts: {
              T0000: "Okay, my very first Lesson 'Introduction to Magic'.",
              T0001: "Oh, no! He's weird"
            },
      
            Protagonist: {
              T0000: "Oh, uhh, hi... I am Fumio..."
            },
      
            Nanako: {
              T0000: "Ohayo, new student-kun! I am Nanako, master of shadow magic."
            }
          }
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
        await ƒS.Speech.tell(characters.Nanako, text.Nanako.T0000);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0001);
        await ƒS.Speech.tell(characters.Protagonist, text.Protagonist.T0000);
        saveData.ProtagClass.level++;
    }
}