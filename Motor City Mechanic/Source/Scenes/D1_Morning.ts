namespace MCM {
    export async function D1_Morning(): ƒS.SceneReturn {
        await ƒS.Location.show(locations.JJ_apartement_in);
        ƒS.update(1);

        let text = {
            Thoughts: {
                T0000: "Guh, I'm so nervous I could puke.",
                T0001: "Ok, JJ, it's your first day, no need for worry, you haven't done anything wrong.",
                T0002: "YET.",
                T0003: "I'm sure Justice won't fire me on the first mistake.",
                T0004: "Just breath in...",
                T0005: ". . .",
                T0006: "And out."
            },
            JJ: {
                T0000: "Good Evening, Justice.",
                T0001: "I know, I know, I'm on it, ok?",
                T0002: "Not at work, please, it's embarrassing.",
                T0003: "Ok, we're gonna have to fix the following:",
                T0004: "First of all, some of your cables are starting to become brittle. At some point, that's gonna cause a short circuit. I'm gonna have to replace them.",
                T0005: "That's gonna be 200¥€.",
                T0006: "I think your machine could use new motors for the wheels up front. Costing you about 800¥€.",
                T0007: "This battery isn't charging properly. Losing power in the middle of the race could be a death sentence, not just for the win.",
                T0008: "Gonna be 300¥€ to replace it.",
                T0009: "So, your tires are edging closer and closer to being totally worn out. It's a wonder no patrol ever fined you for it.",
                T0010: "New ones will add 300¥€ to your bill.",
                T0011: "Your windows are probably full of microcracks. 200¥€ and they'll be as good as new.",
                T0012: "In total that would be:",
                T0013: "Didn't see anything out of order. You should be fine."
            },
            Justice: {
                T0000: "Konbanwa, James.",
                T0001: "Don't you think it's time to finally learn Japanese?",
                T0002: "Also, just because I'm your boss, doesn't mean you have to stop calling me auntie",
                T0003: "Ok, sweetie, try not to die from embarrassment, and get to work. Car parts ain't cheap, so the faster we sell 'em, the more profit we make.",
                T0004: "Start with the small one over there. Needs her ride checked out.",
                T0005: "Oh yeah, I almost forgot, could you do overtime tonight? I know, it's your first day and all, but someone needs to cover X' shift. We've got an important night-active customer today."
            },
            Unknown: {
                T0000: "I'M ACTUALLY PERFECTLY NORMAL SIZED FOR MY KIND, THANK YOU!!!"
            },
            Amelia: {
                T0000: "Okay, buddy, I need you to look over my car, right? It's <b>gotta</b> be in preem condition for the race tomorrow.",
                T0001: "But don't you dare selling me shit I don't need.",
                T0002: "That's it? Doesn't seem right to me. You sure?",
                T0003: "Are you sure about that?",
                T0004: "Wow that is quite expensive. Is really that much broken?"
            }
        }

        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
        await ƒS.Location.show(locations.JJ_apartement_out);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0001);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0002);
        await ƒS.Location.show(locations.MC_street_day);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0003);
        await ƒS.Location.show(locations.workshop);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0004);
        await ƒS.Location.show(locations.black);
        ƒS.update(2);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0005);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0006);
        await ƒS.Location.show(locations.workshop);
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.smile, ƒS.positions.bottomcenter);
        ƒS.update(2);
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

        switch(overTimeDiaElem){
            case overTimeDia.no:
                await ƒS.Speech.tell(characters.JJ, overTimeDia.no);
                await ƒS.Speech.tell(characters.Justice, "Don't worry about it, I thought I'd just ask you before calling Carla.");
                await ƒS.Speech.tell(characters.Justice, "Now get to your customer, before she gets any angrier.");
                break;
            case overTimeDia.yes:
                await ƒS.Speech.tell(characters.JJ, overTimeDia.yes);
                await ƒS.Speech.tell(characters.Justice, "Great. Thanks, sweetie.");
                await ƒS.Speech.tell(characters.Justice, "Anyway, get to your customer, she's looking kinda mad.");
                break;
        }

        await ƒS.Character.hide(characters.Justice);
        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.angry, ƒS.positions.bottomcenter);
        ƒS.update(0);
        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0000);
        await ƒS.Speech.tell(characters.Amelia, text.Amelia.T0001);

        // Minigame
        ƒS.Character.hideAll();
        await ƒS.Location.show(locations.carscanner);
        ƒS.Speech.hide();
        await ƒS.Character.show(characters.MinigameOverlays, characters.MinigameOverlays.pose.AmeD1, ƒS.positions.bottomcenter);
        ƒS.update(0);
        
        saveData.state.scratch += 100;
    }
  }