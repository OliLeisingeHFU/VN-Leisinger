"use strict";
var Droidhaven;
(function (Droidhaven) {
    async function restaurant() {
        Droidhaven.ƒS.Sound.fade(Droidhaven.sound.restaurant, 0.2, 3, true);
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.restaurant);
        await Droidhaven.ƒS.Character.show(Droidhaven.characters.Karen, Droidhaven.characters.Karen.pose.normal, Droidhaven.ƒS.positions.bottomleft);
        await Droidhaven.ƒS.Character.show(Droidhaven.characters.Waiter, Droidhaven.characters.Waiter.pose.normal, Droidhaven.ƒS.positions.bottomright);
        await Droidhaven.ƒS.update(1);
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
        };
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Karen, text.Karen.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Waiter, text.Waiter.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Karen, text.Karen.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Waiter, text.Waiter.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Karen, text.Karen.T0002);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Waiter, text.Waiter.T0002);
        Droidhaven.ƒS.Sound.fade(Droidhaven.sound.restaurant, 0, 1);
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.black);
        Droidhaven.ƒS.Character.hideAll();
        await Droidhaven.ƒS.update(1);
        Droidhaven.ƒS.Sound.fade(Droidhaven.sound.restaurant, 0.2, 2, true);
        Droidhaven.ƒS.Sound.play(Droidhaven.sound.ramsay, 0.1, false);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Narrator, text.Narrator.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Waiter, text.Waiter.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Karen, text.Karen.T0003);
        Droidhaven.ƒS.Sound.fade(Droidhaven.sound.restaurant, 0, 3);
    }
    Droidhaven.restaurant = restaurant;
})(Droidhaven || (Droidhaven = {}));
var Droidhaven;
(function (Droidhaven) {
    Droidhaven.ƒ = FudgeCore;
    Droidhaven.ƒS = FudgeStory;
    //define sound
    Droidhaven.sound = {
        //Musik
        backgroundTheme: "",
        //Sound
        restaurant: "Sound/Ambiance/crowded.mp3",
        ramsay: "Sound/Ambiance/ramsay-chan.mp3"
    };
    //define Locations
    Droidhaven.locations = {
        restaurant: {
            name: "restaurant",
            background: "Images/Backgrounds/res.jpg"
        },
        black: {
            name: "black",
            background: "Images/Backgrounds/black.png"
        }
    };
    //define characters
    Droidhaven.characters = {
        Narrator: {
            name: ""
        },
        Karen: {
            name: "Karen",
            origin: Droidhaven.ƒS.ORIGIN.BOTTOMLEFT,
            pose: {
                normal: "Images/Characters/Dorothy.png"
            }
        },
        Waiter: {
            name: "Waiter",
            origin: Droidhaven.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "Images/Characters/Moth_Girl.png"
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
    async function signalDelay(seconds) {
        return Droidhaven.ƒS.Progress.defineSignal([() => Droidhaven.ƒS.Progress.delay(seconds)]);
    }
    Droidhaven.signalDelay = signalDelay;
    console.log("FudgeStory template starting");
    window.addEventListener("load", start);
    function start(_event) {
        //define sequence of scenes
        let scenes = [
            { scene: Droidhaven.restaurant, name: "Scene" }
        ];
        //different paths: give scene id. can also add which scene is next with "next:". then return sceneid at end of previous scene
        // start the sequence
        Droidhaven.ƒS.Progress.go(scenes);
    }
})(Droidhaven || (Droidhaven = {}));
//# sourceMappingURL=Droidhaven.js.map