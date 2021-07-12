//Tsubasa wo kudasai
namespace MCM {
    export async function D1_Evening_Free(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);

        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.update(2);

        await ƒS.Speech.tell(characters.JJ, "Finally home!");
        await ƒS.Speech.tell(characters.Thoughts, "Hmm... 18:23... I think I'm just gonna relax a bit. My responisilities won't be running away in the next 5 minutes.");
        await ƒS.Speech.tell(characters.Thoughts, ". . .");
        await ƒS.Location.show(locations.black);
        await ƒS.update(transitions.eye.duration, transitions.eye.alpha, transitions.eye.edge);
        await ƒS.Speech.tell(characters.Thoughts, ". . .");
        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.update(transitions.eye.duration, transitions.eye.alpha, transitions.eye.edge);

        await ƒS.Speech.tell(characters.JJ, "I feel like crap... how long did I sleep?");
        await ƒS.Speech.tell(characters.Thoughts, "It's 01:37. Amelias race is already over. Yuris party is probably still going strong.");

        await ƒS.Speech.tell(characters.Thoughts, "Maybe the result of the race are already on the Net.");
        await ƒS.Speech.tell(characters.Thoughts, "Or, I could watch some anime...");
        await ƒS.Speech.tell(characters.Thoughts, "...Play a VR game...");
        await ƒS.Speech.tell(characters.JJ, "Hmmmmmm");

        let doing = {
            net: "Check the Net",
            anime: "Watch anime",
            games: "Play VR games"
        }

        let doingElem = await ƒS.Menu.getInput(doing, "choice");

        switch(doingElem){
            case doing.anime:
                await ƒS.Speech.tell(characters.JJ, "Guess I could get catched up on some seasonals.");
                await ƒS.Location.show(locations.black);
                await ƒS.update(transitions.eye.duration, transitions.eye.alpha, transitions.eye.edge);
                await ƒS.Speech.tell(characters.Thoughts, "2 hours of anime later.");
                await ƒS.Location.show(locations.JJ_apartement_in);
                await ƒS.update(0.3);
                await ƒS.Speech.tell(characters.JJ, "Guess I should head to bed, catch some more z's before I gotta work.");
                break;
            case doing.games:
                await ƒS.Speech.tell(characters.JJ, "I've got more than enough RPGs I haven't finished yet.");
                await ƒS.Location.show(locations.black);
                await ƒS.update(transitions.eye.duration, transitions.eye.alpha, transitions.eye.edge);
                await ƒS.Speech.tell(characters.Thoughts, "2 hours of gaming later.");
                await ƒS.Location.show(locations.JJ_apartement_in);
                await ƒS.update(0.3);
                await ƒS.Speech.tell(characters.JJ, "Guess I should head to bed, catch some more z's before I gotta work.");
                break;
            case doing.net:
                await ƒS.Speech.tell(characters.Thoughts, "Let's see how the race went.");
                await ƒS.Speech.tell(characters.Thoughts, "...");
                await ƒS.Speech.tell(characters.Thoughts, "There it is, a summary.");
                await ƒS.Speech.tell(characters.Speakers, "Hello amigos, this one's for all you that missed the original stream of the midnight city race.");
                await ƒS.Speech.tell(characters.Speakers, "In first place we've got:");
                switch(saveData.d1Ame){
                    case "correct":
                    case "more":
                    case "most":
                        await ƒS.Speech.tell(characters.Speakers, "Everyones favorite gremlin! Amelia Cox!");
                        await ƒS.Speech.tell(characters.Speakers, "Her driving style is even more furiosa than her attitude.");
                        await ƒS.Speech.tell(characters.Speakers, "Next up: Arakawa Naoko in second place!");
                        await ƒS.Speech.tell(characters.Speakers, "This hombre was speed, but just lacking in a tiny bit of skill to make it to first place.");
                        await ƒS.Speech.tell(characters.Speakers, "And in third place: Jenny Vogelweide.");
                        await ƒS.Speech.tell(characters.Speakers, "A novice from Neo Glitch, California.");
                        break;
                    case "fewer":
                        await ƒS.Speech.tell(characters.Speakers, "Arakawa Naoko! Motor City legend.");
                        await ƒS.Speech.tell(characters.Speakers, "My hombre definitely had speed on his side.");
                        await ƒS.Speech.tell(characters.Speakers, "And in second place: Jenny Vogelweide.");
                        await ƒS.Speech.tell(characters.Speakers, "Ah novice from Neo Glitch, California.");
                        await ƒS.Speech.tell(characters.Speakers, "Taking the last spot in the top 3: Amelia Cox!");
                        await ƒS.Speech.tell(characters.Speakers, "Looks like someone botched it right at the end! She would've probably won, if it wasn't for that small crash at the end.");
                        break;
                    case "fewest":
                        await ƒS.Speech.tell(characters.Speakers, "Arakawa Naoko! Motor City legend.");
                        await ƒS.Speech.tell(characters.Speakers, "My hombre definitely had speed on his side.");
                        await ƒS.Speech.tell(characters.Speakers, "And in second place: Jenny Vogelweide.");
                        await ƒS.Speech.tell(characters.Speakers, "Ah novice from Neo Glitch, California.");
                        await ƒS.Speech.tell(characters.Speakers, "Taking the last spot in the top 3: Just Dan!");
                        await ƒS.Speech.tell(characters.Speakers, "Yes, he wanted me to introduce him as just Dan.");
                        await ƒS.Speech.tell(characters.Speakers, "Lastly, damage report...");
                        await ƒS.Speech.tell(characters.Speakers, "It... would've been one of the safest races ever carried out in MC...");
                        await ƒS.Speech.tell(characters.Speakers, "But, sadly, Amelia Cox... had a terrible crash. She didn't survive, and with her KX-1 being as wrecked as it is, there is no way to find out what the reason was.");
                        await ƒS.Speech.tell(characters.Speakers, "So... to all of Amelia's fans... my sympathies.");
                        break;
                }
                await ƒS.Speech.tell(characters.Speakers, "And that would be all. Good night viewers, see you again next time.");

                switch(saveData.d1Ame){
                    case "fewest":
                        await ƒS.Speech.tell(characters.JJ, "No... it.. it can't be...");
                        await ƒS.Speech.tell(characters.JJ, "There was nothing else seriously wrong with her car... It... must've been an accident...");
                        await ƒS.Speech.tell(characters.JJ, "I need a drink...");
                        await ƒS.Speech.tell(characters.JJ, "Make that 3.");
                        await ƒS.Location.show(locations.black);
                        ƒS.Character.hideAll();
                        ƒS.Sound.fade(playing, 0, 2, true);
                        await ƒS.update(2);
                        return "Ending_Depression";
                    case "fewer":
                        await ƒS.Speech.tell(characters.JJ, "Aw, kuso, how unlucky...");
                        await ƒS.Speech.tell(characters.JJ, "Maybe she'll get the win next time.");
                        return "End_Credits";
                        //break;
                    default:
                        await ƒS.Speech.tell(characters.JJ, "Hell yeah, Amelia!! Nice going, first place.");
                        await ƒS.Speech.tell(characters.JJ, "Hopefully, she'll come back again, so I can congratulate her on her win.");
                        return "End_Credits";
                        //break;
                }
                break;
        }

        await ƒS.Location.show(locations.black);
        ƒS.Character.hideAll();
        ƒS.Sound.fade(playing, 0, 2, true);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Thoughts, "to be continued...");
    }
}