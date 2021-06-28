"use strict";
var MCM;
(function (MCM) {
    MCM.ƒ = FudgeCore;
    MCM.ƒS = FudgeStory;
    MCM.saveData = {
        score: 0,
        ended: false,
        state: {
            yero: 0
        },
        waiting: false,
        d1evening: "",
        d1Ame: ""
    };
    MCM.miniGameAnswer = new Array;
    // Audio Control
    MCM.volume = 1.0;
    MCM.playing = "";
    function incrementVolume() {
        if (MCM.volume < 1.0) {
            MCM.volume += 0.1;
            MCM.ƒS.Sound.setVolume(MCM.playing, MCM.volume);
        }
    }
    MCM.incrementVolume = incrementVolume;
    function decrementVolume() {
        if (MCM.volume > 0) {
            MCM.volume -= 0.1;
            MCM.ƒS.Sound.setVolume(MCM.playing, MCM.volume);
        }
    }
    MCM.decrementVolume = decrementVolume;
    MCM.music = {
        moringBGM: "Sound/Music/Alumo - Tapes.wav",
        noonBGM: "Sound/Music/Alumo - Vice.wav",
        eveningBGM: "Sound/Music/Alumo - Diotic.wav",
        partyBGM: "Sound/Music/Alumo - Outlander.wav",
    };
    // Lazy functions
    // Menu
    let ingameMenu = {
        save: "Save",
        load: "Load",
        volumeUp: "+",
        volumeDown: "-",
        credits: "Credits"
    };
    let gameMenu;
    async function menuFunctions(_opt) {
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
            default:
                console.log(gameMenu);
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
        kitchen: {
            name: "JU_kitchen",
            background: "Images/Backgrounds/JU_kitchen.jpg"
        },
        black: {
            name: "black",
            background: "Images/Backgrounds/black.png"
        },
        carscanner: {
            name: "CarScan",
            background: "Images/Backgrounds/CarScanMT.png"
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
                sad: "Images/Characters/Amelia/sad.png",
                questioning: "Images/Characters/Amelia/questioning.png"
            }
        },
        Yuri: {
            name: "Yuri",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Yuri/.png",
                normal: "Images/Characters/Yuri/neutral.png",
                happy: "Images/Characters/Yuri/happy.png",
                angry: "Images/Characters/Yuri/angry.png",
                sad: "Images/Characters/Yuri/sad.png",
                questioning: "Images/Characters/Yuri/questioning.png",
                thinking: "Images/Characters/Yuri/thinking.png",
                explaining: "Images/Characters/Yuri/explaining.png",
                wink: "Images/Characters/Yuri/wink.png",
                smug: "Images/Characters/Yuri/smug.png"
            }
        },
        MinigameOverlays: {
            name: "Minigames",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Minigames/CarsScan-DN-Name.png",
                AmeD1: "Images/Minigames/CarScan-D1-Amelia.png"
            }
        }
    };
    MCM.items = {
        Rum: {
            name: "Rum",
            description: "A bottle of cheap white 'rum'",
            image: "Images/Items/Rum.png"
        },
        Asacoco: {
            name: "Merchandise",
            description: "An item of unknown function honoring the greatest dragon out there. Matane, Kaich&#333;! Arigathanks for all the kuso.",
            image: "Images/Items/Asacoco.png"
        }
    };
    async function hndKeyPress(_event) {
        switch (_event.code) {
            case MCM.ƒ.KEYBOARD_CODE.F4:
                await MCM.ƒS.Progress.save();
                break;
            case MCM.ƒ.KEYBOARD_CODE.F8:
                await MCM.ƒS.Progress.load();
                break;
            case MCM.ƒ.KEYBOARD_CODE.M:
                if (MCM.menu.style.visibility != "hidden") {
                    MCM.menu.style.visibility = "hidden";
                }
                else {
                    MCM.menu.style.visibility = "visible";
                }
                break;
            case MCM.ƒ.KEYBOARD_CODE.NUMPAD_SUBTRACT:
                decrementVolume;
                break;
            case MCM.ƒ.KEYBOARD_CODE.NUMPAD_ADD:
                decrementVolume;
                break;
        }
    }
    function checklistFiller(elements) {
        for (let x = 0; x < elements.length; x++) {
            let li = document.createElement("li");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = elements[x][0];
            input.name = elements[x][0];
            let label = document.createElement("label");
            label.innerHTML = elements[x][1];
            li.appendChild(input);
            li.appendChild(label);
            li.addEventListener("click", checkToggle);
            MCM.checklist.children[0].appendChild(li);
        }
        MCM.menu.style.visibility = "hidden";
        MCM.money.style.visibility = "hidden";
        MCM.checklist.style.visibility = "visible";
    }
    MCM.checklistFiller = checklistFiller;
    function checkToggle() {
        let checkbox = this.children[0];
        if (checkbox.checked) {
            checkbox.checked = false;
        }
        else {
            checkbox.checked = true;
        }
    }
    function confirmRep() {
        MCM.saveData.waiting = false;
        let checklistEntries = MCM.checklist.children[0].children;
        for (let x = 0; x < checklistEntries.length; x++) {
            if (checklistEntries[x].tagName == "LI") {
                let checkbox = checklistEntries[x].children[0];
                if (checkbox.checked) {
                    MCM.miniGameAnswer.push(checklistEntries[x].children[0].id);
                }
                checklistEntries[x].remove();
            }
        }
        MCM.checklist.style.visibility = "hidden";
    }
    async function minigameInput() {
        if (MCM.saveData.waiting) {
            await MCM.ƒS.Progress.delay(1);
            console.log("why");
            minigameInput();
        }
    }
    MCM.minigameInput = minigameInput;
    document.addEventListener("keydown", hndKeyPress);
    window.addEventListener("load", start);
    function start(_event) {
        //Menu
        gameMenu = MCM.ƒS.Menu.create(ingameMenu, menuFunctions, "gameMenu");
        // Important HTML Elements
        MCM.menu = document.getElementsByClassName("gameMenu")[0];
        MCM.money = document.getElementsByClassName("moneybar")[0];
        MCM.checklist = document.getElementById("checklist");
        document.getElementById("confirmRep").addEventListener("click", confirmRep);
        let scenes = [
            { scene: MCM.D1_Morning, name: "Scene1" },
            { scene: MCM.D1_Noon, name: "Scene2" }
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
// いじめっ子Bully
var MCM;
// いじめっ子Bully
(function (MCM) {
    async function D1_Morning() {
        MCM.ƒS.Sound.play(MCM.music.moringBGM, 0, true);
        MCM.ƒS.Sound.fade(MCM.music.moringBGM, MCM.volume, 1, true);
        MCM.playing = MCM.music.moringBGM;
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(1);
        MCM.ƒS.Inventory.add(MCM.items.Asacoco);
        MCM.ƒS.Inventory.open();
        let text = {
            Thoughts: {
                T0000: "Damn, I can't believe this is already the last week of September. I still need 5000 Ye-Ro to pay all my bills. And what if Justice fires me?",
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
                T0000: "おはよう, James.",
                T0001: "Don't you think it's time to finally learn Japanese?",
                T0002: "Also, just because I'm your boss, doesn't mean you have to stop calling me auntie.",
                T0003: "Ok, sweetie, try not to die from embarrassment, and get to work. Car parts ain't cheap, so the faster we sell 'em, the more profit we make.",
                T0004: "Start with the small one over there. Needs her ride checked out.",
                T0005: "Oh yeah, I almost forgot, could you do overtime tonight? I know, it's still your first month and you barely know the ropes, but someone needs to cover X' shift. We've got an important night-active customer today.",
                T0006: "NICE WORK, JAMES! YOU'VE EARNED YOURSELF A LUNCH BREAK!"
            },
            Unknown: {
                T0000: "I'M ACTUALLY PERFECTLY NORMAL SIZED FOR MY KIND, THANK YOU!!!"
            },
            Amelia: {
                T0000: "Okay, buddy, I need you to look over my car, right? It's <b>gotta</b> be in preem condition for the race tonight.",
                T0001: "But don't you dare selling me shit I don't need.",
                T0002: "Sorry, about earlier... Anway, what's wrong with my ride?",
                T0003: "That's it? Doesn't seem right to me. You sure?",
                T0004: "Are you sure about that?",
                T0005: "Wow that is quite expensive. Are you sure all that is broken??",
                T0006: "Thanks, uhm, what's your name again?",
                T0007: "Alright then, see ya, James!"
            }
        };
        await MCM.ƒS.Speech.tell(MCM.characters.Unknown, "Welcome to the Test-Version of this game. So far only day 1 is playable. Thank you for you patience.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0000);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_out);
        await MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0002);
        await MCM.ƒS.Location.show(MCM.locations.MC_street_day);
        await MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0003);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        await MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0004);
        await MCM.ƒS.Location.show(MCM.locations.black);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0006);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.smile, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
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
                MCM.saveData.d1evening = "free";
                break;
            case overTimeDia.yes:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, overTimeDia.yes);
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Great. Thanks, sweetie.");
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Anyway, get to your customer, she's looking kinda mad.");
                MCM.saveData.d1evening = "work";
                break;
        }
        await MCM.ƒS.Character.hide(MCM.characters.Justice);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.angry, MCM.ƒS.positions.bottomcenter);
        MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0001);
        // Minigame
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Location.show(MCM.locations.carscanner);
        MCM.ƒS.Speech.hide();
        await MCM.ƒS.Character.show(MCM.characters.MinigameOverlays, MCM.characters.MinigameOverlays.pose.AmeD1, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(1);
        /*         let checkOptions: string[][] = [
                    ["cables", "Replace broken power cables (200¥€)"],
                    ["motors", "Greasing moving parts in the motor (800¥€)"],
                    ["battery", "Fix non-charging Battery (300¥€)"],
                    ["tires", "Replace punctures tires (300¥€)"],
                    ["windows", "Fill windowcracks (200¥€)"]
                ]
        
                checklistFiller(checkOptions); */
        MCM.saveData.waiting = true;
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
        };
        let minigameElem;
        while (MCM.saveData.waiting) {
            minigameElem = await MCM.ƒS.Menu.getInput(miniGameAnswersD1Ame, "choice");
            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ("You want to work on the following:" + minigameElem + " is that alright? (Quicktip: You earn half of the price of the procedure)"));
            let confirmChoice = {
                confirm: "CONFIRM",
                cancel: "CANCEL"
            };
            let confirmChoiceElem = await MCM.ƒS.Menu.getInput(confirmChoice, "choice");
            switch (confirmChoiceElem) {
                case confirmChoice.cancel:
                    MCM.saveData.waiting = true;
                    break;
                case confirmChoice.confirm:
                    MCM.saveData.waiting = false;
                    break;
            }
        }
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0002);
        switch (minigameElem) {
            case miniGameAnswersD1Ame.fewest:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, (text.JJ.T0012 + " 300¥€"));
                MCM.ƒS.Character.hide(MCM.characters.Amelia);
                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
                MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0003);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "fewest";
                MCM.saveData.state.yero += 150;
                break;
            case miniGameAnswersD1Ame.fewer:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0006);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0007);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, (text.JJ.T0012 + " 600¥€"));
                MCM.ƒS.Character.hide(MCM.characters.Amelia);
                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
                MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0003);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "fewer";
                MCM.saveData.state.yero += 300;
                break;
            case miniGameAnswersD1Ame.correct:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0006);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0007);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0008);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, (text.JJ.T0012 + " 800¥€"));
                MCM.ƒS.Character.hide(MCM.characters.Amelia);
                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
                MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0013);
                MCM.saveData.d1Ame = "correct";
                MCM.saveData.state.yero += 400;
                break;
            case miniGameAnswersD1Ame.more:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0006);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0007);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0008);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0009);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, (text.JJ.T0012 + " 1600¥€"));
                MCM.ƒS.Character.hide(MCM.characters.Amelia);
                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
                MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "more";
                MCM.saveData.state.yero += 800;
                break;
            case miniGameAnswersD1Ame.most:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0006);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0007);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0008);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0009);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0011);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, (text.JJ.T0012 + " 1800¥€"));
                MCM.ƒS.Character.hide(MCM.characters.Amelia);
                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
                MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "most";
                MCM.saveData.state.yero += 900;
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0006);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0015);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0007);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0016);
        MCM.ƒS.Character.hide(MCM.characters.Amelia);
        MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0006);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0017);
        //y.style.display="block";
        //saveData.state.yero += 100;
    }
    MCM.D1_Morning = D1_Morning;
})(MCM || (MCM = {}));
var MCM;
(function (MCM) {
    async function D1_Noon() {
        let text = {
            JJ: {
                T0000: "In the back! How's it going, choomba?"
            },
            Yuri: {
                T0000: "Yo! JJ? Where you at?",
                T0001: "As preem as always, bud. How is your job treating you?"
            }
        };
        MCM.ƒS.Sound.play(MCM.music.noonBGM, 0, true);
        MCM.ƒS.Sound.fade(MCM.music.noonBGM, MCM.volume, 1, true);
        MCM.playing = MCM.music.noonBGM;
        await MCM.ƒS.Location.show(MCM.locations.kitchen);
        await MCM.ƒS.update(1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0000);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0001);
        switch (MCM.saveData.d1Ame) {
            case "fewest":
            case "fewer":
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "There's this customer from this morning, I'm kinda afraid I might've missed something during her carscan.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.thinking, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Hmm, You should probably call her in again, just to be sure.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.explaining, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I don't want you to lose your job. After all, how else would you afford that sweet apartment you scored.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                if (MCM.saveData.d1evening == "work") {
                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh, yeah, actually, Justice asked me to cover the nightshift. I'll probably have at least <b>some</b> time to do that. Thanks.");
                    await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                    await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.sad, MCM.ƒS.positions.bottomcenter);
                    await MCM.ƒS.update(0.1);
                    await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oh, kuso! I actually came here to ask you, if you wanted to head to my place this evening. I'm throwing a party.");
                    await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "");
                }
                else {
                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I am totally swamped until my shift is over. And the race is tonight, so she doesn't have the time either.");
                    if (MCM.saveData.d1Ame == "fewest") {
                        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ah, what's the worst that could happen. If it was small enough for you to miss, it's probably nothing serious.");
                        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I really hope you are right.");
                    }
                    await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Let's just hope she isn't to angry once she finds out.");
                }
                break;
            case "correct":
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I had this customer this morning, she plans on participating in the street race tonight.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "The one at midnight? Nice! News of a good mechanic spread like a virus during these. Sadly I can't make it this time."); // you know I had to do it to 'em
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh, right you got something special planned. Good luck with that! But anyway, the problem is, I think I got everything right, but what if I didn't? I might've missed something, or screwed up!");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ah, come on, I know you. Gíve yourself more cred. If you think you did not miss anything, then I know for sure you didn't");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Thanks, choom. You're the best.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.wink, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I know I am.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                break;
            case "more":
            case "most":
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I had this customer this morning, told me she didn't want anything fixed that wasn't needed, but still wanted me to make sure it's in preem condition for her race.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I might have fixed more than needed after all, but what was I supposed to do.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oof, customers being hard. Don't you love it.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Maybe you should tell her that if she complains.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "'Don't give such confusing instructions then, you brat'");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh, yeah, I'm suuuuure she's gonna appreciate that.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Who knows, what if she likes it.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I think it's the other way around. She seems like someone that likes ordering her I/O around.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Sure, but what about people she wants to get serious with?");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Enough of that, she is a customer.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Sure.");
                break;
        }
        if (MCM.saveData.d1evening != "work" && (MCM.saveData.d1Ame != "fewer" && MCM.saveData.d1Ame != "fewest")) {
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Well, what I actually came here for was to inform you, that tonight I'm having a party at my place.");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Casual clothing, enough ethanol to desinfect a whole bodyshop, as well as lots of potential inputs and outputs that dig nice rides.");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "On the topic of bodyshops, I heard from mine got a deal with your boss, 20% off all cyberware! sugoi ne~");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "If you ever plan on chippin' in, I'll gladly chip in.");
            await MCM.ƒS.Character.hide(MCM.characters.Yuri);
            await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positions.bottomcenter);
            await MCM.ƒS.update(0.1);
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Haha, good one!");
            await MCM.ƒS.Character.hide(MCM.characters.Yuri);
            await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
            await MCM.ƒS.update(0.1);
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Consider it payback for the 20% off I get here. I'm sure a nice cyberarm or two will help you with difficult tasks at work.");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "But back to the party I'm throwing, it starts at eight. You don't need to bring anything.");
            if (MCM.saveData.d1evening == "work") {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I would love to, but I already promised auntie, I would take over the sleepy boi hours.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Kuso, just my luck. I really .");
            }
        }
    }
    MCM.D1_Noon = D1_Noon;
})(MCM || (MCM = {})); //await ƒS.Speech.tell(characters., ".");
//# sourceMappingURL=MCM.js.map