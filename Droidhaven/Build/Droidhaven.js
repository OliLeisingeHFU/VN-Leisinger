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
                T0003: "A few messages are popping up on my commlink.",
                T0004: "Oh, and a route opened up on the map."
            },
            Protagonist: {
                T0000: "Oh, uhh, hello there!",
                T0001: "Pleased to meet you. I'm Fumio.",
                T0002: "This is the way?",
                T0003: "Thank you very much, miss Dorothy!"
            },
            Dorothy: {
                T0000: "Hi Honey!",
                T0001: "The Name's Dorothy. I am a teacher of this wonderful university.",
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
        let slideAni = {
            start: { translation: Droidhaven.ƒS.positions.bottomleft },
            end: { translation: Droidhaven.ƒS.positions.bottomright },
            duration: 5,
            playmode: Droidhaven.ƒS.ANIMATION_PLAYMODE.PLAYONCE
        };
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.school_outside);
        await Droidhaven.ƒS.update(1);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0001);
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.teacherroom_outside);
        await Droidhaven.ƒS.Character.show(Droidhaven.characters.Dorothy, Droidhaven.characters.Dorothy.pose.smile, Droidhaven.ƒS.positions.bottomcenter);
        await Droidhaven.ƒS.update(Droidhaven.transitions.car.duration, Droidhaven.transitions.car.alpha, Droidhaven.transitions.car.edge);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0002);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0002);
        // Choice:
        let firstDialogueElement = await Droidhaven.ƒS.Menu.getInput(firstDialogueAnswers, "choice");
        switch (firstDialogueElement) {
            case firstDialogueAnswers.pSayMage:
                Droidhaven.saveData.ProtagClass.name = "Mage";
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "An aspiring magician. I see! For that you'll want to go to room M1A1.");
                break;
            case firstDialogueAnswers.pSayEngi:
                Droidhaven.saveData.ProtagClass.name = "Engi";
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Engineer, you say? Those are probably my favorite students. They can be found in room 2187. That's in a different building.");
                break;
            case firstDialogueAnswers.pSayGuns:
                Droidhaven.saveData.ProtagClass.name = "Guns";
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Oh, a gunslinger? And they still sent you to me? Have fun getting there. The shooting range is on the other side of campus, that's quite the walk. On the map that would be building CT-99.");
                break;
            case firstDialogueAnswers.pSayHeal:
                Droidhaven.saveData.ProtagClass.name = "Heal";
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Ah, a very noble goal. I'm sure the students there are all very nice. That would be in room H30DST.");
                break;
            case firstDialogueAnswers.pSayBlade:
                Droidhaven.saveData.ProtagClass.name = "Blade";
                await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, "Very Cool! Gonna go for the noble white knight or an edgelord lone wanderer type of swordsman? haha, just kidding. Anyway, you'd have to go to room X0W0.");
                break;
        }
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0004);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0002);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0004);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0003);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Dorothy, text.Dorothy.T0005);
        Droidhaven.ƒS.Character.hideAll();
        // animation test
        await Droidhaven.ƒS.Character.animate(Droidhaven.characters.Dorothy, Droidhaven.characters.Dorothy.pose.smile, slideAni);
        await Droidhaven.ƒS.update(1);
        switch (Droidhaven.saveData.ProtagClass.name) {
            case "Mage":
                return "mageClass";
            case "Engi":
                break;
            case "Guns":
                break;
            case "Heal":
                break;
            case "Blade":
                break;
        }
    }
    Droidhaven.Text = Text;
})(Droidhaven || (Droidhaven = {}));
var Droidhaven;
(function (Droidhaven) {
    async function mageClass() {
        await Droidhaven.ƒS.Location.show(Droidhaven.locations.classroom_front);
        await Droidhaven.ƒS.update(1);
        let text = {
            Thoughts: {
                T0000: "Okay, my very first Lesson 'Introduction to Magic'.",
                T0001: "Oh, no! He's weird"
            },
            Protagonist: {
                T0000: "Oh, uhh, hi... I am Fumio..."
            },
            Nanako: {
                T0000: "Ohayo, new student-kun! I am Nanako, master of shadow magic."
            }
        };
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Nanako, text.Nanako.T0000);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Thoughts, text.Thoughts.T0001);
        await Droidhaven.ƒS.Speech.tell(Droidhaven.characters.Protagonist, text.Protagonist.T0000);
        Droidhaven.saveData.ProtagClass.level++;
    }
    Droidhaven.mageClass = mageClass;
})(Droidhaven || (Droidhaven = {}));
var Droidhaven;
(function (Droidhaven) {
    Droidhaven.ƒ = FudgeCore;
    Droidhaven.ƒS = FudgeStory;
    //define saveData
    Droidhaven.saveData = {
        ProtagName: {
            name: ""
        },
        ProtagClass: {
            name: "none",
            level: 0
        }
    };
    //define transitions
    Droidhaven.transitions = {
        car: {
            duration: 3,
            alpha: "Images/Transitions/car-transition.png",
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
        },
        teacherroom_outside: {
            name: "Teachers Room",
            background: "Images/Backgrounds/Teacherroom_front.png"
        },
        classroom_front: {
            name: "Classroom",
            background: "Images/Backgrounds/classroom_frontview.png"
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
        },
        Nanako: {
            name: "Nanako",
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
    async function signalDelay(seconds) {
        return Droidhaven.ƒS.Progress.defineSignal([() => Droidhaven.ƒS.Progress.delay(seconds)]);
    }
    Droidhaven.signalDelay = signalDelay;
    console.log("FudgeStory template starting");
    window.addEventListener("load", start);
    function start(_event) {
        //define sequence of scenes
        let scenes = [
            { scene: Droidhaven.Text, name: "Scene" },
            { scene: Droidhaven.mageClass, name: "MageClass", id: "mageClass" }
        ];
        //different paths: give scene id. can also add which scene is next with "next:". then return sceneid at end of previous scene
        Droidhaven.ƒS.Progress.setData(Droidhaven.saveData);
        // start the sequence
        Droidhaven.ƒS.Progress.go(scenes);
    }
})(Droidhaven || (Droidhaven = {}));
//# sourceMappingURL=Droidhaven.js.map