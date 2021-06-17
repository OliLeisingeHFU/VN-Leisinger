"use strict";
var MCM;
(function (MCM) {
    MCM.ƒ = FudgeCore;
    MCM.ƒS = FudgeStory;
    MCM.saveData = {
        score: 0,
        ended: false,
        state: {
            scratch: 0
        }
    };
    // Audio Control
    let volume = 1.0;
    function incrementVolume() {
        if (volume < 1.0) {
            volume += 0.1;
            MCM.ƒS.Sound.setVolume(MCM.music.backGroundTheme, volume);
        }
    }
    MCM.incrementVolume = incrementVolume;
    function decrementVolume() {
        if (volume > 0) {
            volume -= 0.1;
            MCM.ƒS.Sound.setVolume(MCM.music.backGroundTheme, volume);
        }
    }
    MCM.decrementVolume = decrementVolume;
    MCM.music = {
        backGroundTheme: ""
    };
    // Menu
    let ingameMenu = {
        save: "Save",
        load: "Load",
        close: "Close",
        volumeUp: "+",
        volumeDown: "-",
        credits: "Credits",
        about: "About"
    };
    let gameMenu;
    async function menuFunctions(_opt) {
        console.log(_opt);
        switch (_opt) {
            case ingameMenu.save:
                await MCM.ƒS.Progress.save();
                break;
            case ingameMenu.load:
                await MCM.ƒS.Progress.load();
                break;
            case ingameMenu.volumeUp:
                incrementVolume();
                break;
            case ingameMenu.volumeDown:
                decrementVolume();
                break;
            case ingameMenu.close:
                gameMenu.close();
                break;
        }
    }
    MCM.locations = {
        JJ_apartement_out: {
            name: "JJ_apartement_out",
            background: "Images/Backgrounds/JJ_apartement_outside.jpg"
        },
        JJ_apartement_in: {
            name: "JJ_apartement_in",
            background: "Images/Backgrounds/JJ_apartement_inside.jpg"
        },
        MC_street_day: {
            name: "MC_street_day",
            background: "Images/Backgrounds/MC_streets_day.jpg"
        },
        workshop: {
            name: "JU_workshop",
            background: "Images/Backgrounds/JU_workshop.jpg"
        },
        black: {
            name: "black",
            background: "Images/Backgrounds/black.png"
        }
    };
    MCM.characters = {
        Thoughts: {
            name: "Thoughts"
        },
        JJ: {
            name: "JJ"
        },
        Justice: {
            name: "Justice",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Justice/.png",
                normal: "Images/Characters/Justice/neutral.png",
                smile: "Images/Characters/Justice/smile.png",
                angry: "Images/Characters/Justice/angry.png",
                sad: "Images/Characters/Justice/sad.png",
                thinking: "Images/Characters/Justice/thinking.png"
            }
        },
        Unknown: {
            name: "???"
        },
        Amelia: {
            name: "Amelia",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Amelia/.png",
                normal: "Images/Characters/Amelia/neutral.png",
                smile: "Images/Characters/Amelia/smile.png",
                angry: "Images/Characters/Amelia/angry.png",
                sad: "Images/Characters/Amelia/sad.png"
            }
        }
    };
    MCM.items = {
        Rum: {
            name: "Rum",
            description: "A bottle of cheap white 'rum'",
            image: "Images/Items/Rum.png"
        }
    };
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case MCM.ƒ.KEYBOARD_CODE.F4:
                console.log("Save");
                await MCM.ƒS.Progress.save();
                break;
            case MCM.ƒ.KEYBOARD_CODE.F8:
                console.log("Load");
                await MCM.ƒS.Progress.load();
                break;
        }
    }
    document.addEventListener("keydown", hndKeyPress);
    window.addEventListener("load", start);
    function start(_event) {
        //Menu
        gameMenu = MCM.ƒS.Menu.create(ingameMenu, menuFunctions, "gameMenu");
        let scenes = [
            { scene: MCM.D1_Morning, name: "Scene" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        MCM.saveData.state = MCM.ƒS.Progress.setData(MCM.saveData.state, uiElement);
        // start the sequence
        MCM.ƒS.Progress.go(scenes);
    }
})(MCM || (MCM = {}));
// for inventory: https://stackoverflow.com/questions/25152463/how-to-use-typescript-on-a-button-click
// for inventory: https://stackoverflow.com/questions/2788191/how-to-check-whether-a-button-is-clicked-by-using-javascript
// pictures: https://www.artbreeder.com/
var MCM;
(function (MCM) {
    async function D1_Morning() {
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        MCM.ƒS.update(1);
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
        };
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0000);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_out);
        MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0002);
        await MCM.ƒS.Location.show(MCM.locations.MC_street_day);
        MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0003);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0004);
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0006);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.smile, MCM.ƒS.positions.bottomcenter);
        MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0003);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.Unknown, text.Unknown.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0005);
        let overTimeDia = {
            no: "Sorry, but I don't think I can do that today.",
            yes: "Sure, I haven't got anything planned tonight, might as well work up some extra bank."
        };
        let overTimeDiaElem = await MCM.ƒS.Menu.getInput(overTimeDia, "choice");
        switch (overTimeDiaElem) {
            case overTimeDia.no:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, overTimeDia.no);
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Don't worry about it, I thought I'd just ask you before calling Carla.");
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Now get to your customer, before she gets any angrier.");
                break;
            case overTimeDia.yes:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, overTimeDia.yes);
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Great. Thanks, sweetie.");
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Anyway, get to your customer, she's looking kinda mad.");
                break;
        }
        MCM.ƒS.Character.hideAll();
        MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.angry, MCM.ƒS.positions.bottomcenter);
        MCM.ƒS.update();
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0001);
        // Minigame
        MCM.saveData.state.scratch += 100;
    }
    MCM.D1_Morning = D1_Morning;
})(MCM || (MCM = {}));
//# sourceMappingURL=MCM.js.map