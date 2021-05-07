"use strict";
var Droidhaven;
(function (Droidhaven) {
    async function Text() {
        console.log("Class Choosing Process");
        let text = {
            Thoughts: {
                T0000: "Finally, I've arrived. Droidhaven, the university of my dreams.",
                T0001: "Just gotta get to the reception. What was it again? Through the main entrance then to the right.",
                T0002: "Dorothy seems nice enough. I hope my fellow students are the same!",
                T0003: "A few messages are popping up on my commlink."
            },
            Protagonist: {
                T0000: "Oh, uhh, hello there!",
                T0001: "Pleased to meet you. I'm Fumio.",
                T0002: "This is the way?",
                T0003: "Thank you very much, miss Dorothy!"
            },
            Dorothy: {
                T0000: "Hi Honey!",
                T0001: "The Name's Dorothy. I am the receptionist of this wonderful university",
                T0002: "I'm here to show you the way. To your class, that is. Tell me, in what Major did you choose to enroll?",
                T0003: "Let me just upload the campus map, your timetable and important connections to your commlink.",
                T0004: "This is the way.",
                T0005: "You're welcome. have a nice first day in Droidhaven, honey."
            }
        };
        let firstDialogueAnswers = {
            pSayMage: "I'm part of the Mage course!",
            pSayEngi: "Well, I am an Engineer.",
            pSayGuns: "I'm here for the Gunslinger Classes",
            pSayHeal: "I'm here to become a Healer.",
            pSayBlade: "I want to become a master of the blade."
        };
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.school_outside);
        await Droidhaven.ƒS.update(1);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0001);
        await Droidhaven.ƒS.Character.show(Droidhaven.characters.Dorothy, Droidhaven.characters.Dorothy.pose.smile, Droidhaven.ƒS.positions.bottomcenter);
        await Droidhaven.ƒS.update(1);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0002);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0002);
        // Choice:
        let firstDialogueElement = await Droidhaven.ƒS.Menu.getInput(firstDialogueAnswers, "class");
        switch (firstDialogueElement) {
            case firstDialogueAnswers.pSayMage:
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "An aspiring magician. I see! For that you'll want to go to room M1A1.");
                break;
            case firstDialogueAnswers.pSayEngi:
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Engineer, you say? Those are probably my favorite students. They can be found in 2187. That's in a different building.");
                break;
            case firstDialogueAnswers.pSayGuns:
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Oh, a gunslinger? And they still sent you to me? Have fun getting there. The shooting range is on the other side of campus, that's quite the walk. On the map that would be building CT-99.");
                break;
            case firstDialogueAnswers.pSayHeal:
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Ah, a very noble goal. I'm sure the students there are all very nice. That would be in room H3A1.");
                break;
            case firstDialogueAnswers.pSayBlade:
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Very Cool! Gonna go for the noble white knight or an edgelord lone wanderer type of swordsman? haha, just kidding. Anyway, you'd have to go to room X0W0.");
                break;
        }
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0002);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0004);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0005);
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
        school_outside: {
            name: "Droidhaven",
            background: "Images/Backgrounds/school_outside.png"
        }
    };
    //define characters
    Droidhaven.characters = {
        Thoughts: {
            name: "Thoughts"
        },
        Protagonist: {
            name: "Fumio"
        },
        Dorothy: {
            name: "Dorothy",
            origin: Droidhaven.ƒS.ORIGIN.BOTTOMRIGHT,
            pose: {
                normal: "",
                smile: "Images/Characters/Dorothy.png"
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