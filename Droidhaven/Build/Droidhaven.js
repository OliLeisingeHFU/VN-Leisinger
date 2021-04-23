"use strict";
var Droidhaven;
(function (Droidhaven) {
    async function Text() {
        console.log("Class Choosing Process");
        let text = {
            Thoughts: {
                T0000: "",
                T0001: ""
            },
            Protagonist: {
                T0000: "",
                T0001: ""
            }
        };
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.school);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, "You are like a child. Wacht this: S U C C");
    }
    Droidhaven.Text = Text;
})(Droidhaven || (Droidhaven = {}));
var Droidhaven;
(function (Droidhaven) {
    Droidhaven.ƒ = FudgeCore;
    Droidhaven.ƒS = FudgeStory;
    //define transitions
    Droidhaven.transitions = {
        clock: {
            duration: 3,
            alpha: "",
            edge: 0.33
        }
    };
    //define sound
    Droidhaven.sound = {
        //Musik
        backgroundTheme: "",
        //Sound
        click: ""
    };
    //define Locations
    Droidhaven.locations = {
        school: {
            name: "Droidhaven",
            background: "./Images/Backgrounds/Glitch.jpg"
        }
    };
    //define characters
    Droidhaven.characters = {
        Thoughts: {
            name: ""
        },
        Protagonist: {
            name: "Fumio"
        },
        Nanako: {
            name: "Nanako",
            origin: Droidhaven.ƒ.ORIGIN2D.BOTTOMRIGHT,
            pose: {
                normal: "",
                smile: ""
            }
        }
    };
    document.addEventListener("keydown", hndKeyPress);
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case Droidhaven.ƒ.KEYBOARD_CODE.F4:
                console.log("Save");
                await Droidhaven.ƒS.Progress.save();
                break;
            case Droidhaven.ƒ.KEYBOARD_CODE.F8:
                console.log("Load");
                await Droidhaven.ƒS.Progress.load();
                break;
        }
    }
    console.log("FudgeStory template starting");
    window.addEventListener("load", start);
    function start(_event) {
        //define sequence of scenes
        let scenes = [
            { scene: Droidhaven.Text, name: "Scene" }
        ];
        // start the sequence
        Droidhaven.ƒS.Progress.go(scenes);
    }
})(Droidhaven || (Droidhaven = {}));
//# sourceMappingURL=Droidhaven.js.map