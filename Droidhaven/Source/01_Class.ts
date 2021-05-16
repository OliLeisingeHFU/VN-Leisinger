namespace Droidhaven {
    export async function firstClass(): ƒS.SceneReturn {
        await ƒS.Location.show(locations.classroom_front);
        await ƒS.update(1);
        switch(saveData.ProtagClass.name){
            case "Mage":
                mageClass();
                break;
            case "Engi":

                break;
            case "Guns":

                break;
            case "Heal":

                break;
            case "Blade":

                break;
        }
    }

    async function mageClass(): ƒS.SceneReturn {
        let text = {
            Thoughts: {
              T0000: "Okay, my very first Lesson 'Introduction to Magic'."
            },
      
            Protagonist: {
              T0000: "Oh, uhh, hello there!"
            },
      
            Nanako: {
              T0000: "Hi Honey!"
            }
          }
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
        saveData.ProtagClass.level++;
    }
}