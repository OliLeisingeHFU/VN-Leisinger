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
        let scenes = [
            { scene: MCM.D1_Morning, name: "Scene" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        MCM.saveData.state = MCM.ƒS.Progress.setDataInterface(MCM.saveData.state, uiElement);
        // start the sequence
        MCM.ƒS.Progress.go(scenes);
    }
})(MCM || (MCM = {}));
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
                T0002: "Not at work, please, it's embarassing."
            },
            Justice: {
                T0000: "Konbanwa, James.",
                T0001: "Don't you think it's time to finally learn Japanese?",
                T0002: "Also, just because I'm your boss, doesn't mean you have to stop calling me auntie"
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
        MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0006);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.smile, MCM.ƒS.positions.bottomcenter);
        MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0002);
        MCM.saveData.state.scratch += 100;
    }
    MCM.D1_Morning = D1_Morning;
})(MCM || (MCM = {}));
//# sourceMappingURL=MCM.js.map