// KUZEEEEEEE
namespace MCM {
    export async function D1_AfterParty_Azami(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);

        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Azami, "Before I show you my bedroom, I wanna see your gaming skills. Best of three in this fighting game.");
        await ƒS.Speech.tell(characters.JJ, "Kay, let's go.");

        let game = {
            tryhard: "Tryhard",
            casual: "Casual"
        }

        let gamingElem = await ƒS.Menu.getInput(game, "choice");

        switch (gamingElem) {
            case game.tryhard:
                await ƒS.Speech.tell(characters.JJ, "But don't think I'm gonna go easy on you, just because I wanna have sex!");
                await ƒS.Speech.tell(characters.Azami, "You better give your best!");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Speech.tell(characters.Thoughts, "I've never tried this hard in any game. But for some reason I really wanna beat her.");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Character.hide(characters.Azami);
                await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(2);
                await ƒS.Speech.tell(characters.Azami, "Take this!!!");
                await ƒS.Speech.tell(characters.JJ, "Nah ah, you take this!!");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Speech.tell(characters.Thoughts, "Damn, we are getting nowhere. This is gonna take a while.");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Speech.tell(characters.JJ, "Oof.");
                await ƒS.Character.hide(characters.Azami);
                await ƒS.Character.show(characters.Azami, characters.Azami.pose.happy, ƒS.positions.bottomcenter);
                await ƒS.update(2);
                await ƒS.Speech.tell(characters.Azami, "What? Out of stamina?");
                await ƒS.Speech.tell(characters.JJ, "Ha! you wish.");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Speech.tell(characters.JJ, "Haha! I won!");
                await ƒS.Character.hide(characters.Azami);
                await ƒS.Character.show(characters.Azami, characters.Azami.pose.angry, ƒS.positions.bottomcenter);
                await ƒS.update(2);
                await ƒS.Speech.tell(characters.Azami, "Ara ara, rubbing your win in my face? You must be really desperate for a punishment!");
                break;
            case game.casual:
                await ƒS.Speech.tell(characters.JJ, "Well, this is gonna be fun!");
                await ƒS.Speech.tell(characters.Azami, "Yes it is.");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Speech.tell(characters.Thoughts, "Oh no she's really good at this. Maybe I should've tried harder.");
                await ƒS.Speech.tell(characters.Thoughts, ". . .");
                await ƒS.Character.hide(characters.Azami);
                await ƒS.Character.show(characters.Azami, characters.Azami.pose.cute, ƒS.positions.bottomcenter);
                await ƒS.update(2);
                await ƒS.Speech.tell(characters.Azami, "Ara Ara. Looks like you lost. are you ready for your punishment?");
                break;
        }

        await ƒS.Speech.tell(characters.JJ, "Hold up, you were gonna punish me either way, weren't you?");

        await ƒS.Character.hide(characters.Azami);
        await ƒS.Character.show(characters.Azami, characters.Azami.pose.happy, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Azami, "Aren't you a smart boy. Oide, oide.");

        fadeToBlackMusicOff();
        playing = music.moringBGM;
        await ƒS.Speech.tell(characters.JJ, "She was into some weird stuff, but it was kinda fun too.");
        await ƒS.Location.show(locations.kitchen);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "Always nice to try some new stuff isn't it?");
        await ƒS.Speech.tell(characters.JJ, "If only it wasn't still sore...");
        await ƒS.Speech.tell(characters.Yuri, "It is, what it is.");
        await ƒS.Speech.tell(characters.JJ, "Guess I'll head to work now. See ya.");
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "Yeah, me too. Meet for lunch?");
        await ƒS.Speech.tell(characters.JJ, "Sure!");
        fadeToBlackMusicOff();
        return "End_Credits";
    }
}