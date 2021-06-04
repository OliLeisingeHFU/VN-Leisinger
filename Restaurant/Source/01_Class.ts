namespace Droidhaven {
    export async function restaurant(): ƒS.SceneReturn {
        ƒS.Sound.fade(sound.restaurant, 0.2, 3, true)
        await ƒS.Location.show(locations.restaurant);
        await ƒS.Character.show(characters.Karen, characters.Karen.pose.normal, ƒS.positions.bottomleft);
        await ƒS.Character.show(characters.Waiter, characters.Waiter.pose.normal, ƒS.positions.bottomright);
        await ƒS.update(1);
        let text = {
            Karen: {
              T0000: "Can I talk to you manager?",
              T0001: "I ordered these shrimps fifteen minutes ago and now they come and they are COLD?",
              T0002: "Warm then up then, or GIVE ME YOUR MANAGER",
              T0003: "Eww, they taste disgusting. What have you done?!"
            },
      
            Waiter: {
              T0000: "What is wrong?",
              T0001: "Ma'ám, on the menu it says they are 'cold shrimps', what did you expect?",
              T0002: "Of course ma'am, your wish is our pleasure",
              T0003: "Here you go ma'am, your warmed up cocktail shrimps."
            },
            Narrator: {
              T0000: "Einige Zeit später."
            }
          }

        await ƒS.Speech.tell(characters.Karen, text.Karen.T0000);
        await ƒS.Speech.tell(characters.Waiter, text.Waiter.T0000);
        await ƒS.Speech.tell(characters.Karen, text.Karen.T0001);
        await ƒS.Speech.tell(characters.Waiter, text.Waiter.T0001);
        await ƒS.Speech.tell(characters.Karen, text.Karen.T0002);
        await ƒS.Speech.tell(characters.Waiter, text.Waiter.T0002);
        ƒS.Sound.fade(sound.restaurant, 0, 1);
        await ƒS.Location.show(locations.black);
        ƒS.Character.hideAll();
        await ƒS.update(1);


        ƒS.Sound.fade(sound.restaurant, 0.2, 2, true)
        ƒS.Sound.play(sound.ramsay, 0.1, false);
        await ƒS.Speech.tell(characters.Narrator, text.Narrator.T0000);
        await ƒS.Speech.tell(characters.Waiter, text.Waiter.T0003);
        await ƒS.Speech.tell(characters.Karen, text.Karen.T0003);
        ƒS.Sound.fade(sound.restaurant, 0, 3);
    }
}