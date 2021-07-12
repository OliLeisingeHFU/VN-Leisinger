// いじめっ子Bully
namespace MCM {
    export async function D1_Morning(): ƒS.SceneReturn {
        ƒS.Sound.play(music.moringBGM, 0, true);
        ƒS.Sound.fade(music.moringBGM, volume, 1, true);
        playing = music.moringBGM;

        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.update(2);

        let text = {
            Thoughts: {
                T0000: "Damn, I can't believe this is already the last week of August. I still need 5000 yero to pay all my bills. And what if Justice fires me?",
                T0001: "Ok, JJ, no need for worry. This is still your first month working. You haven't made any mistakes.",
                T0002: "YET.",
                T0003: "I'm sure she won't fire me immediately on the first mistake.",
                T0004: "Just breath in...",
                T0005: ". . .",
                T0006: "And out."
            },
            JJ: {
                T0000: "Good Morning, Justice.",
                T0001: "I know, I know, I'm on it, ok?",
                T0002: "Not at work, please, it's embarrassing.",
                T0003: "Ok, we're gonna have to fix the following:",
                T0004: "First of all, some of your tires look like someone tried to zero them. I can't believe you even managed to drive here. I'm gonna have to replace them.",
                T0005: "That's gonna be 300¥€.",
                T0006: "This battery isn't charging properly. Losing power in the middle of the race could be a death sentence, not just for the win.",
                T0007: "Gonna be 300¥€ to replace it.",
                T0008: "Next up, the cables. Super brittle. Could cause a short circuit very soon. 200¥€ and it's fixed.",
                T0009: "I think some Motor parts are grinding against each other. re-oiling them should fix that. That procedure would cost you 800¥€",
                T0011: "Your windows are probably full of microcracks. 200¥€ and they'll be as good as new.",
                T0012: "In total that would be:",
                T0013: "Yep, sure am.",
                T0014: "I... Yeah, I guess I am.",
                T0015: "James, but most people call me JJ.",
                T0016: "See ya!",
                T0017: "Thanks, auntie, I'll be back in 30!"
            },
            Justice: {
                T0000: "Ohayo, James. Genkidesuka?",
                T0001: "Don't you think it's time to finally learn proper Japanese?",
                T0002: "Also, just because I'm your boss, doesn't mean you have to stop calling me auntie.",
                T0003: "Ok, sweetie, try not to die from embarrassment, and get to work. Car parts ain't cheap, so the faster we sell 'em, the more profit we make.",
                T0004: "Start with the small one over there. Needs her ride checked out.",
                T0005: "Oh yeah, I almost forgot, could you do overtime tonight? I know, it's still your first month and you barely know the ropes, but someone needs to cover X's shift. We've got an important night-active customer today.",
                T0006: "NICE WORK, JAMES! YOU'VE EARNED YOURSELF A LUNCH BREAK!"
            },
            Unknown: {
                T0000: "I'M ACTUALLY PERFECTLY NORMAL SIZED FOR MY KIND, THANK YOU!!!"
            },
            Amelia: {
                T0000: "Okay, buddy, I need you to look over my car, right? It's <b>gotta</b> be in preem condition for the race tonight.",
                T0001: "But don't you dare selling me shit I don't need.",
                T0002: "Sorry, about earlier... Anway, whats wrong with my ride?",
                T0003: "That's it? Doesn't seem right to me. You sure?",
                T0004: "Are you sure about that?",
                T0005: "Wow that is quite expensive. Are you sure all that is broken??",
                T0006: "Thanks, uhm, what's your name again?",
                T0007: "Alright then, see ya, James!"
            }
        }
        await ƒS.Speech.tell(characters.Unknown, "Welcome to the Test-Version of this game. So far only day 1 is playable. Thank you for you patience.");

        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
        await ƒS.Location.show(locations.JJ_apartement_out);
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0001);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0002);
        await ƒS.Location.show(locations.MC_street_day);
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0003);
        await ƒS.Location.show(locations.workshop);
        await ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0004);
        await ƒS.Location.show(locations.black);
        await ƒS.update(transitions.eye.duration, transitions.eye.alpha, transitions.eye.edge);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0005);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0006);
        await ƒS.Location.show(locations.workshop);
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.smile, ƒS.positions.bottomcenter);
        await ƒS.update(transitions.eye.duration, transitions.eye.alpha, transitions.eye.edge);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0000);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0001);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0001);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0002);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0002);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0003);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0004);
        await ƒS.Speech.tell(characters.Unknown, text.Unknown.T0000);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0005);

        let overTimeDia = {
            no: "Sorry, but I don't think I can do that today.",
            yes: "Sure, I haven't got anything planned tonight, might as well work up some extra bank."
        }

        let overTimeDiaElem = await ƒS.Menu.getInput(overTimeDia, "choice");

        switch (overTimeDiaElem) {
            case overTimeDia.no:
                await ƒS.Speech.tell(characters.JJ, overTimeDia.no);
                await ƒS.Speech.tell(characters.Justice, "Don't worry about it, I thought I'd just ask you before calling Carla.");
                await ƒS.Speech.tell(characters.Justice, "Now get to your customer, before she gets any angrier.");
                saveData.d1evening = "D1_Evening_Free";
                break;
            case overTimeDia.yes:
                await ƒS.Speech.tell(characters.JJ, overTimeDia.yes);
                await ƒS.Speech.tell(characters.Justice, "Great. Thanks, sweetie.");
                await ƒS.Speech.tell(characters.Justice, "Anyway, get to your customer, she's looking kinda mad.");
                saveData.d1evening = "D1_Evening_Work";
                break;
        }

        await ƒS.Character.hide(characters.Justice);
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.angry, ƒS.positions.bottomcenter);
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0000);
        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0001);

        // Minigame
        ƒS.Character.hideAll();
        await ƒS.Location.show(locations.carscanner);
        ƒS.Speech.hide();
        await ƒS.Character.show(characters.MinigameOverlays, characters.MinigameOverlays.pose.AmeD1, ƒS.positions.bottomcenter);
        await ƒS.update(1);

        /*         let checkOptions: string[][] = [
                    ["cables", "Replace broken power cables (200¥€)"],
                    ["motors", "Greasing moving parts in the motor (800¥€)"],
                    ["battery", "Fix non-charging Battery (300¥€)"],
                    ["tires", "Replace punctures tires (300¥€)"],
                    ["windows", "Fill windowcracks (200¥€)"]
                ]
        
                checklistFiller(checkOptions); */


        saveData.waiting = true;
        //await minigameInput();

        /*         for(let i: number = 0; i < miniGameAnswer.length; i++){
                    answerText += (" " + miniGameAnswer[i] + ",");
                }
         */
        let miniGameAnswersD1Ame = {
            fewest: "Change/Fix Only new tires (300¥€)",
            fewer: "Change/Fix tires and Battery  (600¥€)",
            correct: "Change/Fix tires, battery and cables (800¥€)",
            more: "Change/Fix tires, battery, cables and motor (1600¥€)",
            most: "Change/Fix tires, battery, cables, windows and motor  (1800¥€)"
        }

        let minigameElem;

        while (saveData.waiting) {
            minigameElem = await ƒS.Menu.getInput(miniGameAnswersD1Ame, "choice");

            await ƒS.Speech.tell(characters.Thoughts, ("You want to work on the following:" + minigameElem + " is that alright? (Quicktip: You earn half of the price of the procedure)"));

            let confirmChoice = {
                confirm: "CONFIRM",
                cancel: "CANCEL"
            }

            let confirmChoiceElem = await ƒS.Menu.getInput(confirmChoice, "choice");

            switch (confirmChoiceElem) {
                case confirmChoice.cancel:
                    saveData.waiting = true;
                    break;
                case confirmChoice.confirm:
                    saveData.waiting = false;
                    break;
            }
        }
        ƒS.Character.hideAll();
        await ƒS.Location.show(locations.workshop);
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(1);

        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0002);

        switch(minigameElem){
            case miniGameAnswersD1Ame.fewest:
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
                await ƒS.Speech.tell(characters.JJ, (text.JJ.T0012 + " 300¥€"));
                ƒS.Character.hide(characters.Amelia);
                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.questioning, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0003);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0014);
                saveData.d1Ame = "fewest";
                saveData.state.yero += 150;
                lowerFriendship(saveData.friendship.Ame, 50);
                saveData.friendship.Ame.state = "hater";
                break;
            case miniGameAnswersD1Ame.fewer:
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0006);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0007);
                await ƒS.Speech.tell(characters.JJ, (text.JJ.T0012 + " 600¥€"));
                ƒS.Character.hide(characters.Amelia);
            	await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.questioning, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0003);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0014);
                saveData.d1Ame = "fewer";
                saveData.state.yero += 300;
                lowerFriendship(saveData.friendship.Ame, 15)
                break;
            case miniGameAnswersD1Ame.correct:
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0006);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0007);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0008);
                await ƒS.Speech.tell(characters.JJ, (text.JJ.T0012 + " 800¥€"));
                ƒS.Character.hide(characters.Amelia);
                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.questioning, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0004);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0013);
                saveData.d1Ame = "correct";
                saveData.state.yero += 400;
                higherFriendship(saveData.friendship.Ame, 20);
                saveData.friendship.Ame.state = "customer";
                break;
            case miniGameAnswersD1Ame.more:
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0006);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0007);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0008);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0009);
                await ƒS.Speech.tell(characters.JJ, (text.JJ.T0012 + " 1600¥€"));
                ƒS.Character.hide(characters.Amelia);
                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.questioning, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0005);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0014);
                saveData.d1Ame = "more";
                saveData.state.yero += 800;
                higherFriendship(saveData.friendship.Ame, 10)
                break;
            case miniGameAnswersD1Ame.most:
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0006);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0007);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0008);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0009);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0011);
                await ƒS.Speech.tell(characters.JJ, (text.JJ.T0012 + " 1800¥€"));
                ƒS.Character.hide(characters.Amelia);
                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.questioning, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0005);
                await ƒS.Speech.tell(characters.JJ, text.JJ.T0014);
                saveData.d1Ame = "most";
                saveData.state.yero += 900;
                lowerFriendship(saveData.friendship.Ame, 50);
                saveData.friendship.Ame.state = "hater";
                break;
        }

        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0006);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0015);
        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0007);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0016);
        ƒS.Character.hide(characters.Amelia);
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0006);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0017);
        await ƒS.Location.show(locations.black);
        ƒS.Sound.fade(music.moringBGM, 0, 2, true);
        await ƒS.update(2);
        //y.style.display="block";
        //saveData.state.yero += 100;
    }
}