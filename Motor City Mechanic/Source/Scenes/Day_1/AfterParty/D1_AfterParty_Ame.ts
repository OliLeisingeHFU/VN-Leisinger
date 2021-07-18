//WEATHER HACKER
namespace MCM {
    export async function D1_AfterParty_Ame(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);

        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Amelia, "Well, this is my place.");
        await ƒS.Speech.tell(characters.JJ, "Huh, you got your furniture at the MegaCentra too?");
        await ƒS.Speech.tell(characters.Amelia, "Yep.");
        await ƒS.Speech.tell(characters.Amelia, "Guess we got similar tastes.");
        await ƒS.Speech.tell(characters.JJ, "Yup...");
        await ƒS.Speech.tell(characters.Thoughts, ". . .");
        await ƒS.Character.hide(characters.Amelia)
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.questioning, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Amelia, "Hey, some dude left this anime stuff at my place. Know what it is?");
        await ƒS.Speech.tell(characters.Thoughts, "Received " + items.Asacoco.name + ". Press I to open Inventory.");
        ƒS.Inventory.add(items.Asacoco);
        await ƒS.Speech.tell(characters.JJ, "Not sure, merch of some sorts. I'll look on the net sometime.");
        await ƒS.Character.hide(characters.Amelia)
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
    
        await ƒS.Speech.tell(characters.JJ, "So, uhm, what did you think of doing next?");
        await ƒS.Character.hide(characters.Amelia)
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.happy, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Amelia, "Oh, I've got an idea.");

        fadeToBlackMusicOff();
        playing = music.moringBGM;
        await ƒS.Speech.tell(characters.JJ, "Anyway, you can guess what happened next.");
        await ƒS.Location.show(locations.kitchen);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "Ohh, you're serious about her. Wish you luck!");
        await ƒS.Speech.tell(characters.JJ, "How-");
        await ƒS.Speech.tell(characters.Yuri, "You never say how it was when you're serious with someone.");
        await ƒS.Speech.tell(characters.JJ, "Hmm...");
        await ƒS.Speech.tell(characters.JJ, "But yes, there is something about her. I haven't figured it out yet, though.");
        fadeToBlackMusicOff();
        return "End_Credits";
    }
}