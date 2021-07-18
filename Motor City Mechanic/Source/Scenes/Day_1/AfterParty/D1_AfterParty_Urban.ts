//RUNNING IN THE 90s
namespace MCM {
    export async function D1_AfterParty_Urban(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);
        
        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Urban, "Damn, your ride is smooth as fuck. You use it for drifting?");
        await ƒS.Speech.tell(characters.JJ, "Yeah, took some time to get 'er like that, but in the end it was worth it.");
        await ƒS.Speech.tell(characters.Urban, "You thought about adding neon?");
        await ƒS.Speech.tell(characters.JJ, "Yes, actually, we got this preem new model at the store. RGB and all that tech.");
        await ƒS.Speech.tell(characters.JJ, "It's too expensive for me though. Need to work for at least a month more, but it's gonna be worth it.");
        await ƒS.Speech.tell(characters.Urban, "So, uhm, you wanna go to bed? You know, for... some fun.");

        fadeToBlackMusicOff();
        playing = music.moringBGM;
        await ƒS.Speech.tell(characters.JJ, "Surprisingly he was an M.");
        await ƒS.Location.show(locations.kitchen);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "You never really know before you find out, huh.");
        await ƒS.Speech.tell(characters.JJ, "You're right about that!");
        await ƒS.Speech.tell(characters.Yuri, "I'm not gonna hold you off any longer though, I still got a shitload of work.");
        await ƒS.Speech.tell(characters.JJ, "Yeah, I gotta go too.");
        await ƒS.Speech.tell(characters.Yuri, "Meet for lunch though?");
        await ƒS.Speech.tell(characters.JJ, "Yes. As always.");
        fadeToBlackMusicOff();
        return "End_Credits";
    }
}