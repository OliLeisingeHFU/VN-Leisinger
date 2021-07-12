"use strict";
var MCM;
(function (MCM) {
    MCM.ƒ = FudgeCore;
    MCM.ƒS = FudgeStory;
    MCM.saveData = {
        score: 0,
        started: false,
        ended: false,
        waiting: false,
        state: {
            yero: 0
        },
        friendship: {
            Yuri: {
                state: "best friend",
                happiness: 100
            },
            Ame: {
                state: "stranger",
                happiness: 10
            }
        },
        drunkness: 0,
        sobbering: false,
        yuriRabbit: "Pekora",
        d1evening: "",
        d1Ame: "",
        d1YuriUpgrade: "",
        d1Dio: ""
    };
    MCM.miniGameAnswer = new Array;
    // Audio Control
    MCM.volume = 1.0;
    MCM.playing = "";
    function incrementVolume() {
        if (MCM.volume <= 0.95) {
            MCM.volume = MCM.volume + 0.05;
            console.log(MCM.volume);
            MCM.ƒS.Sound.setMasterVolume(MCM.volume);
        }
    }
    MCM.incrementVolume = incrementVolume;
    function decrementVolume() {
        if (MCM.volume >= 0.04) {
            MCM.volume = MCM.volume - 0.05;
            console.log(MCM.volume);
            MCM.ƒS.Sound.setMasterVolume(MCM.volume);
        }
    }
    MCM.decrementVolume = decrementVolume;
    MCM.music = {
        moringBGM: "Sound/Music/Alumo - Tapes.wav",
        noonBGM: "Sound/Music/Alumo - Vice.wav",
        eveningBGM: "Sound/Music/Alumo - Diotic.wav",
        partyBGM: "Sound/Music/Alumo - Outlander.wav",
        synthAdiago: "Sound/Music/.wav"
    };
    // Lazy functions
    function higherFriendship(person, value) {
        if ((person.happiness + value) <= 100) {
            person.happiness += value;
        }
        else {
            person.happiness = 100;
        }
    }
    MCM.higherFriendship = higherFriendship;
    function lowerFriendship(person, value) {
        if ((person.happiness + value) >= -100) {
            person.happiness += value;
        }
        else {
            person.happiness = -100;
        }
    }
    MCM.lowerFriendship = lowerFriendship;
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
        party: {
            name: "YU_party",
            background: "Images/Backgrounds/YU_party.jpg"
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
    MCM.transitions = {
        eye: {
            duration: 2.5,
            alpha: "Images/Transitions/Eye.png",
            edge: 0.01
        },
        car: {
            duration: 1,
            alpha: "Images/Transitions/car.png",
            edge: 0.05
        }
    };
    MCM.characters = {
        Thoughts: {
            name: "Thoughts"
        },
        Unknown: {
            name: "???"
        },
        Speakers: {
            name: "Speakers"
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
                thinking: "Images/Characters/Justice/thinking.png",
                closed: "Images/Characters/Justice/closed.png"
            }
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
                thinking: "Images/Characters/Yuri/thinking.png",
                explaining: "Images/Characters/Yuri/explaining.png",
                wink: "Images/Characters/Yuri/wink.png",
                smug: "Images/Characters/Yuri/smug.png",
                surprised: "Images/Characters/Yuri/smug.png"
            }
        },
        Dio: {
            name: "Dionysos",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Dio/.png",
                normal: "Images/Characters/Dio/neutral.png",
                smile: "Images/Characters/Dio/smile.png",
                angry: "Images/Characters/Dio/angry.png",
                sad: "Images/Characters/Dio/sad.png",
                questioning: "Images/Characters/Amelia/questioning.png"
            }
        },
        Nao: {
            name: "Nao",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Nao/.png",
                normal: "Images/Characters/Nao/normal.png",
                happy: "Images/Characters/Nao/happy.png",
                surprised: "Images/Characters/Nao/surprised.png",
                sad: "Images/Characters/Nao/sad.png"
            }
        },
        MinigameOverlays: {
            name: "Minigames",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Minigames/CarsScan-DN-Name.png",
                AmeD1: "Images/Minigames/CarScan-D1-Amelia.png",
                DioD1: "Images/Minigames/CarsScan-D1-Dio.png",
            }
        }
    };
    //Items
    MCM.items = {
        Rum: {
            name: "Rum",
            description: "A bottle of cheap white 'rum'",
            image: "Images/Items/Rum.png",
            handler: gettingDrunk
        },
        Asacoco: {
            name: "Merchandise",
            description: "An item of unknown function honoring the greatest dragon out there. Matane, Kaich&#333;! Arigathanks for all the kuso.",
            image: "Images/Items/Asacoco.png",
            handler: useAsacoco,
            static: true
        },
        Stop: {
            name: "Stop drinking",
            description: "",
            image: "",
            handler: stopDrinking
        }
    };
    function gettingDrunk() {
        console.log("getting drunk");
        MCM.saveData.drunkness += 100;
        if (!MCM.saveData.sobbering) {
            MCM.saveData.sobbering = true;
            setTimeout(unDrunk, 1000);
        }
    }
    function unDrunk() {
        if (MCM.saveData.drunkness - 5 >= 5) {
            MCM.saveData.drunkness -= 5;
            setTimeout(unDrunk, 1000);
        }
        else {
            MCM.saveData.drunkness = 0;
            MCM.saveData.sobbering = false;
        }
    }
    async function useAsacoco() {
        await MCM.ƒS.Speech.tell(MCM.characters.Unknown, "Good morning, motherfuckers");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Huh? Who said that?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Weird...");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Why would someone gift me something like this?");
    }
    function stopDrinking() {
        MCM.openinv = false;
        MCM.ƒS.Inventory.close();
    }
    // Keyboard Control
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
                decrementVolume();
                break;
            case MCM.ƒ.KEYBOARD_CODE.NUMPAD_ADD:
                incrementVolume();
                break;
        }
    }
    /*   export function checklistFiller(elements: string[][]): void {
        for (let x: number = 0; x < elements.length; x++) {
          let li: HTMLLIElement = document.createElement("li");
          let input: HTMLInputElement = document.createElement("input");
          input.type = "checkbox";
          input.id = elements[x][0];
          input.name = elements[x][0];
          let label: HTMLLabelElement = document.createElement("label");
          label.innerHTML = elements[x][1];
          li.appendChild(input);
          li.appendChild(label);
          li.addEventListener("click", checkToggle);
          checklist.children[0].appendChild(li);
        }
    
        menu.style.visibility = "hidden";
        money.style.visibility = "hidden";
        checklist.style.visibility = "visible";
      }
    
      function checkToggle(this: HTMLElement): void {
        let checkbox: HTMLInputElement = <HTMLInputElement>this.children[0];
        if (checkbox.checked) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
      }
    
      function confirmRep(): void {
        saveData.waiting = false;
        let checklistEntries: HTMLCollection = checklist.children[0].children;
        for (let x: number = 0; x < checklistEntries.length; x++) {
          if (checklistEntries[x].tagName == "LI") {
            let checkbox: HTMLInputElement = <HTMLInputElement>checklistEntries[x].children[0];
            if (checkbox.checked) {
              miniGameAnswer.push(checklistEntries[x].children[0].id);
            }
            checklistEntries[x].remove();
          }
        }
        checklist.style.visibility = "hidden";
      }
    
      export async function minigameInput(): Promise<void> {
        if (saveData.waiting) {
          await ƒS.Progress.delay(1);
          console.log("why");
          minigameInput();
        }
      } */
    document.addEventListener("keydown", hndKeyPress);
    window.addEventListener("load", start);
    function start(_event) {
        //Menu
        gameMenu = MCM.ƒS.Menu.create(ingameMenu, menuFunctions, "gameMenu");
        // Important HTML Elements
        MCM.menu = document.getElementsByClassName("gameMenu")[0];
        MCM.money = document.getElementsByClassName("moneybar")[0];
        MCM.checklist = document.getElementById("checklist");
        //document.getElementById("confirmRep").addEventListener("click", confirmRep);
        let scenes = [
            { scene: MCM.D1_Morning, name: "Scene1" },
            //{ scene: D1_Noon, name: "Scene2" },
            //{ scene: D1_Evening_Free, name: "D1_Evening_Free", id: "D1_Evening_Free" },
            //{ scene: D1_Evening_Work, name: "D1_Evening_Work", id: "D1_Evening_Work" },
            //{ scene: D1_Evening_Party, name: "D1_Evening_Party", id: "D1_Evening_Party" },
            //{ scene: Ending_Depression, name: "Ending_Depression", id: "Ending_Depression", next: "End_Credits" },
            //{ scene: End_Credits, name: "End_Credits", id: "End_Credits" }
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
    async function End_Credits() {
        MCM.menu.className += " hidden";
        MCM.money.className += " hidden";
        MCM.ƒS.Speech.hide();
        MCM.ƒS.Text.addClass("credits");
        MCM.ƒS.Text.print("Thank you very much for playing!");
    }
    MCM.End_Credits = End_Credits;
})(MCM || (MCM = {}));
//Tsubasa wo kudasai
var MCM;
//Tsubasa wo kudasai
(function (MCM) {
    async function D1_Evening_Free() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Finally home!");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Hmm... 18:23... I think I'm just gonna relax a bit. My responisilities won't be running away in the next 5 minutes.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
        await MCM.ƒS.Location.show(MCM.locations.black);
        await MCM.ƒS.update(MCM.transitions.eye.duration, MCM.transitions.eye.alpha, MCM.transitions.eye.edge);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(MCM.transitions.eye.duration, MCM.transitions.eye.alpha, MCM.transitions.eye.edge);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I feel like crap... how long did I sleep?");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "It's 01:37. Amelias race is already over. Yuris party is probably still going strong.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Maybe the result of the race are already on the Net.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Or, I could watch some anime...");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "...Play a VR game...");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hmmmmmm");
        let doing = {
            net: "Check the Net",
            anime: "Watch anime",
            games: "Play VR games"
        };
        let doingElem = await MCM.ƒS.Menu.getInput(doing, "choice");
        switch (doingElem) {
            case doing.anime:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Guess I could get catched up on some seasonals.");
                await MCM.ƒS.Location.show(MCM.locations.black);
                await MCM.ƒS.update(MCM.transitions.eye.duration, MCM.transitions.eye.alpha, MCM.transitions.eye.edge);
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "2 hours of anime later.");
                await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
                await MCM.ƒS.update(0.3);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Guess I should head to bed, catch some more z's before I gotta work.");
                break;
            case doing.games:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I've got more than enough RPGs I haven't finished yet.");
                await MCM.ƒS.Location.show(MCM.locations.black);
                await MCM.ƒS.update(MCM.transitions.eye.duration, MCM.transitions.eye.alpha, MCM.transitions.eye.edge);
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "2 hours of gaming later.");
                await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
                await MCM.ƒS.update(0.3);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Guess I should head to bed, catch some more z's before I gotta work.");
                break;
            case doing.net:
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Let's see how the race went.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "...");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "There it is, a summary.");
                await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Hello amigos, this one's for all you that missed the original stream of the midnight city race.");
                await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "In first place we've got:");
                switch (MCM.saveData.d1Ame) {
                    case "correct":
                    case "more":
                    case "most":
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Everyones favorite gremlin! Amelia Cox!");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Her driving style is even more furiosa than her attitude.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Next up: Arakawa Naoko in second place!");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "This hombre was speed, but just lacking in a tiny bit of skill to make it to first place.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "And in third place: Jenny Vogelweide.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "A novice from Neo Glitch, California.");
                        break;
                    case "fewer":
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Arakawa Naoko! Motor City legend.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "My hombre definitely had speed on his side.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "And in second place: Jenny Vogelweide.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Ah novice from Neo Glitch, California.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Taking the last spot in the top 3: Amelia Cox!");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Looks like someone botched it right at the end! She would've probably won, if it wasn't for that small crash at the end.");
                        break;
                    case "fewest":
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Arakawa Naoko! Motor City legend.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "My hombre definitely had speed on his side.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "And in second place: Jenny Vogelweide.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Ah novice from Neo Glitch, California.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Taking the last spot in the top 3: Just Dan!");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Yes, he wanted me to introduce him as just Dan.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "Lastly, damage report...");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "It... would've been one of the safest races ever carried out in MC...");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "But, sadly, Amelia Cox... had a terrible crash. She didn't survive, and with her KX-1 being as wrecked as it is, there is no way to find out what the reason was.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "So... to all of Amelia's fans... my sympathies.");
                        break;
                }
                await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "And that would be all. Good night viewers, see you again next time.");
                switch (MCM.saveData.d1Ame) {
                    case "fewest":
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "No... it.. it can't be...");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "There was nothing else seriously wrong with her car... It... must've been an accident...");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I need a drink...");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Make that 3.");
                        await MCM.ƒS.Location.show(MCM.locations.black);
                        MCM.ƒS.Character.hideAll();
                        MCM.ƒS.Sound.fade(MCM.playing, 0, 2, true);
                        await MCM.ƒS.update(2);
                        return "Ending_Depression";
                    case "fewer":
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Aw, kuso, how unlucky...");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Maybe she'll get the win next time.");
                        return "End_Credits";
                    //break;
                    default:
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hell yeah, Amelia!! Nice going, first place.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hopefully, she'll come back again, so I can congratulate her on her win.");
                        return "End_Credits";
                    //break;
                }
                break;
        }
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.Character.hideAll();
        MCM.ƒS.Sound.fade(MCM.playing, 0, 2, true);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "to be continued...");
    }
    MCM.D1_Evening_Free = D1_Evening_Free;
})(MCM || (MCM = {}));
//levan polkka
var MCM;
//levan polkka
(function (MCM) {
    async function D1_Evening_Party() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        let text = {
            Thoughts: {
                T0000: "I should probably get ready for the party.",
                T0001: "Hmm, but what should I wear?",
                T0002: "Yuri said something about kakkoii clothes...",
                T0003: "Let's open up the closet and see..",
                T0004: "I hope there's some people I can connect with."
            },
            Yuri: {
                T0000: "JJ! There you are, my tomodachi!",
                T0001: "Nyahallo!!!",
                T0002: "Well, why don't I show you my new input you helped me get and then I introduce you to some hot singles in the area.",
                T0003: "Anyway, meet Nao-chan. Isn't he the cutest?",
                T0004: "Amelia Cox? I actually invited her as well. She said she'd come after the race.",
                T0005: "On that note, JJ, you still need to meet the other guests. Sorry Nao-chan.",
                T0006: "Ok, let me think about who you would like...",
                T0007: "For starters there's Books over there. Not really a party person, but I managed to drag her here anyway. Big anime fan.",
                T0008: "Next up, there's Urban. He came here from Switzerland to race. Talks about tuning cars about as much as you, if someone would let you.",
                T0009: "And then over to the kitchen we got Azami. Quite the gamer. Also very S."
            },
            JJ: {
                T0000: "Time to go.",
                T0001: "Yuri! Nyahallo!",
                T0002: "Sure, let's go.",
                T0003: "Nice to meet you, Nao. I'm James.",
                T0004: "Well yes, mostly I fix cars. The more experienced employees actually work mostly on tuning cars though.",
                T0005: "Actually, Amelia was at the shop today for some repair. I hope she wins, that would be nice PR."
            },
            Nao: {
                T0000: "Ah, oh. He-hello.",
                T0001: "N-Nice to meet you, James-san, Yu-kun has t-told me a lot about you. You fix cars for a living? That's kinda cool. I'm sure you get a lot of work here, in MC!",
                T0002: "Ah, yes, I've heard about a race this evening. Some there probably got their cars tuned at your bodyshop.",
                T0003: "It's fine. but come back soon, Yu-kun."
            }
        };
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0003);
        let clothing = {
            anime: "Anime T-shirt and jeans",
            mcmjacket: "Official Motor City Mechanic Jacket, a simple T-shirt and jeans",
            otokonoko: "Long, pink hair and a cute dress.",
            suit: "A nice suit."
        };
        let clothingElem = await MCM.ƒS.Menu.getInput(clothing, "choice");
        switch (clothingElem) {
            case clothing.anime:
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Maybe there's another weeb at the party.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Someone I could watch anime with would be nice.");
                break;
            case clothing.mcmjacket:
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Oh, right, I remember, Yuri said a bunch of racer will be there, and they dig mechs.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I'll wear something simple with it, as not to distract from the jacket.");
                break;
            case clothing.otokonoko:
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I always thought I looked good in a dress. I could try that again.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Just were did I put my insta-hair?");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Ah, found it.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "The bottle read: 'Instantly grow your hair out with Haarwachstum.'");
                break;
            case clothing.suit:
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I could go for my fancy suit.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Pff... pf... pahahahAHAHHA... yeah, right.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I think I'll wear a yukata. It's still summer after all.");
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0000);
        await MCM.ƒS.Location.show(MCM.locations.black);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0004);
        MCM.ƒS.Sound.fade(MCM.playing, 0, 1);
        MCM.playing = MCM.music.partyBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.party);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0001);
        switch (clothingElem) {
            case clothing.anime:
                MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ah, you fucking weeb...");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Did I not tell you to wear your MCM jacket?");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Yeah, but I thought I'd rather wear this and meet someone who likes anime.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Fucking <b>weeb</b>...");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "You said that already.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Yes, because I had to.");
                break;
            case clothing.mcmjacket:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Damn, you look hot in this. Nice choice!");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "You chose this outfit.");
                MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.wink, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "'Xactly. But You listened.");
                MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I can promise you, you'll get some tonight. As long as you try a bit.");
                break;
            case clothing.otokonoko:
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You're a bold one!");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Yes, maybe a little.");
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I never thought about the otokonoko look, but now that I see it, I might think it's even better than the MCM stuff I told you to wear.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Haha, yeah thanks, I always thought I looked good in it, but long hair was annoying during work. I don't know how auntie deals with it.");
                break;
            case clothing.suit:
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "A yukata? Did you want to flaunt your heritage or something? Though honestly, you are kinda rocking it!");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It's just so nice to wear this during summer's evenings. Very comfortable. You should try it, too!");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You know what? maybe I will! Not today though. But next time.");
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0002);
        let car = {
            spoiler: "Get the spoiler",
            neon: "Get the neon lights",
            both: "get both",
        };
        switch (MCM.saveData.d1YuriUpgrade) {
            case car.spoiler:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You know, Nao didn't even ntoce the spoiler. Bummer.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "But a bunch of other people complimented me on it so it was worth it after all. T-Y, tomodachi.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "You're welcome.");
                break;
            case car.neon:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "The neon was a sweet idea, JJ, Nao really liked the color I chose.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh really, what color was it set to?");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Well, purple.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "So the color I told Ronald to set as default?");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Because you know I really like that color, 'xactly. So I basicly chose it.");
                break;
            case car.both:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "By the way, your recommendation this afternoon helped a bit. Nao-chan really seems to like my car.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "BUT, it also attracted some unfriendlies. You owe me some booze, to pay for the troubles.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Aw, come on, I know you liked the attention, aho...");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "That doesn't change anything. On Saturday we'll go out for beers with our I/Os. You better meet someone till then.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hai, I get it.");
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0003);
        MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Nao.pose.surprised, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0003);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Nao.pose.normal, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0005);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0006);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0007);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0008);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0009);
    }
    MCM.D1_Evening_Party = D1_Evening_Party;
})(MCM || (MCM = {}));
var MCM;
(function (MCM) {
    async function D1_Evening_Work() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        let text = {
            Justice: {
                T0000: "Hey, James, thanks for doing this tonight. I'll zap your pay and be on my way.",
                T0001: "Of course! Dionysos. He is a night elf, from Glitch, 'Fornia.",
                T0002: "Well, he is really attached to his car apparently, and he trusts me.",
                T0003: "and since he is meccha rich, he has no problem at all getting it here.",
                T0004: "Anyway, he wanted us not to replace anything on his car, only repairing broken parts.",
                T0005: "Uh, yes, actually, Clean the car inside out, but do not touch the glove box.",
                T0006: "Bye, see you tomorrow!"
            },
            JJ: {
                T0000: "Mondainai, auntie, can you tell me more about this customer?",
                T0001: "Oh ok, whats he doing here then?",
                T0002: "Hai. Anything else he said?",
                T0003: "Got it! Good night, auntie!",
                T0004: "Of course, Dionysos-san."
            },
            Dio: {
                T0000: "Guten Tag, I'm here about my car. I'm sure Frau Justice has filled you in already?",
                T0001: "Na dann! get to work!"
            }
        };
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.smile, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0003);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0003);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0006);
        if (MCM.saveData.d1Ame == "fewer" || MCM.saveData.d1Ame == "fewest") {
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Ok, I should have more than enough time to call in Amelia, before this night elf arrives.");
            await MCM.ƒS.Speech.tell(MCM.characters.Speakers, "beep. . . beep. . . beep. . . ");
            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Who dis?");
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey Amelia, it's me, James, I just noticed something on your scan I missed earlier. Big gomenasorry! Could you come over real quick, before your race starts?");
            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Sure, no prob, I'll head right out. Thanks for not letting me hang on this one.");
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Mondainai. I'd feel really bad if you lost the race because of me.");
            await MCM.ƒS.Location.show(MCM.locations.black);
            await MCM.ƒS.update(2);
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "All fixed now, let's get back to Amelia.");
            await MCM.ƒS.Location.show(MCM.locations.workshop);
            await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.smile, MCM.ƒS.positions.bottomcenter);
            await MCM.ƒS.update(2);
            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Thanks, how much do I owe you?");
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I'm just charging you for the parts, not the work time. My mistake after all.");
            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Still gonna give you a hunney for your honesty. I'll definitely come back here, so don't you dare mess up again.");
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I won't, good luck at the race, I gotta get to my next customer.");
            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "I don't need luck, but thanks! See ya soon, punk!");
            MCM.saveData.state.yero += 100;
            MCM.higherFriendship(MCM.saveData.friendship.Ame, 35);
            MCM.ƒS.Character.hide(MCM.characters.Amelia);
        }
        await MCM.ƒS.Character.show(MCM.characters.Dio, MCM.characters.Dio.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(0.3);
        await MCM.ƒS.Speech.tell(MCM.characters.Dio, text.Dio.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.Dio, text.Dio.T0001);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Location.show(MCM.locations.carscanner);
        MCM.ƒS.Speech.hide();
        await MCM.ƒS.Character.show(MCM.characters.MinigameOverlays, MCM.characters.MinigameOverlays.pose.DioD1, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(1);
        MCM.saveData.waiting = true;
        let miniGameAnswersD1Dio = {
            replaceall: "Replace tires, remove foreign objects from motor, replace batteries. (1100¥€)",
            replacemot: "Repair tires and remove bullet. replace motor. (1800¥€)",
            correct: "Repair tires and remove bullet. remove foreign objects from motor. repair Batteries. (1500¥€)"
        };
        let minigameElem;
        while (MCM.saveData.waiting) {
            minigameElem = await MCM.ƒS.Menu.getInput(miniGameAnswersD1Dio, "choice");
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
        switch (minigameElem) {
            case miniGameAnswersD1Dio.replaceall:
            case miniGameAnswersD1Dio.replacemot:
                await MCM.ƒS.Character.show(MCM.characters.Dio, MCM.characters.Dio.pose.angry, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(1);
                await MCM.ƒS.Speech.tell(MCM.characters.Dio, "Wie <b>dumm</b> kann ein Mensch eigentlich sein!? I specifi-fucking-ly a-ha-sked your boss <b>not</b> to replace anything and you just don't care, huh?");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I'm so sorry, sir, I can fix it right away. I don't know, what came over me.");
                await MCM.ƒS.Speech.tell(MCM.characters.Dio, "You better. Don't expect me not to call your boss or pay for all this shit though!");
                MCM.saveData.state.yero += 500;
                MCM.saveData.d1Dio = "failed";
                break;
            case miniGameAnswersD1Dio.correct:
                await MCM.ƒS.Character.show(MCM.characters.Dio, MCM.characters.Dio.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(1);
                await MCM.ƒS.Speech.tell(MCM.characters.Dio, "Thank you very much for this. I know it must've been a lot of work, but this car is really important to me, exactly the way it is.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey, mondainai, listening to our customers is very important at this workshop.");
                await MCM.ƒS.Speech.tell(MCM.characters.Dio, "Well, either way, you deserve a tip.");
                MCM.saveData.state.yero += 1000;
                MCM.saveData.d1Dio = "success";
        }
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Speech.tell(MCM.characters.Dio, "Guess that was it for today. Time to close up shop.");
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.update(2);
        MCM.ƒS.Sound.fade(MCM.playing, 0, 2, true);
        return "End_Credits";
        //return "D2_Morning";
    }
    MCM.D1_Evening_Work = D1_Evening_Work;
})(MCM || (MCM = {}));
// いじめっ子Bully
var MCM;
// いじめっ子Bully
(function (MCM) {
    async function D1_Morning() {
        MCM.ƒS.Sound.play(MCM.music.moringBGM, 0, true);
        MCM.ƒS.Sound.fade(MCM.music.moringBGM, MCM.volume, 1, true);
        MCM.playing = MCM.music.moringBGM;
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(2);
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
        await MCM.ƒS.update(MCM.transitions.eye.duration, MCM.transitions.eye.alpha, MCM.transitions.eye.edge);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0006);
        await MCM.ƒS.Location.show(MCM.locations.workshop);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.smile, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(MCM.transitions.eye.duration, MCM.transitions.eye.alpha, MCM.transitions.eye.edge);
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
                MCM.saveData.d1evening = "D1_Evening_Free";
                break;
            case overTimeDia.yes:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, overTimeDia.yes);
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Great. Thanks, sweetie.");
                await MCM.ƒS.Speech.tell(MCM.characters.Justice, "Anyway, get to your customer, she's looking kinda mad.");
                MCM.saveData.d1evening = "D1_Evening_Work";
                break;
        }
        await MCM.ƒS.Character.hide(MCM.characters.Justice);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.angry, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(0.1);
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
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0003);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "fewest";
                MCM.saveData.state.yero += 150;
                MCM.lowerFriendship(MCM.saveData.friendship.Ame, 50);
                MCM.saveData.friendship.Ame.state = "hater";
                break;
            case miniGameAnswersD1Ame.fewer:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0006);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0007);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, (text.JJ.T0012 + " 600¥€"));
                MCM.ƒS.Character.hide(MCM.characters.Amelia);
                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0003);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "fewer";
                MCM.saveData.state.yero += 300;
                MCM.lowerFriendship(MCM.saveData.friendship.Ame, 15);
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
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0004);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0013);
                MCM.saveData.d1Ame = "correct";
                MCM.saveData.state.yero += 400;
                MCM.higherFriendship(MCM.saveData.friendship.Ame, 20);
                MCM.saveData.friendship.Ame.state = "customer";
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
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "more";
                MCM.saveData.state.yero += 800;
                MCM.higherFriendship(MCM.saveData.friendship.Ame, 10);
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
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0005);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0014);
                MCM.saveData.d1Ame = "most";
                MCM.saveData.state.yero += 900;
                MCM.lowerFriendship(MCM.saveData.friendship.Ame, 50);
                MCM.saveData.friendship.Ame.state = "hater";
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0006);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0015);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, text.Amelia.T0007);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0016);
        MCM.ƒS.Character.hide(MCM.characters.Amelia);
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, text.Justice.T0006);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0017);
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.Sound.fade(MCM.music.moringBGM, 0, 2, true);
        await MCM.ƒS.update(2);
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
                T0000: "In the back! How's it going, tomodachi?"
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
        await MCM.ƒS.update(2);
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
                if (MCM.saveData.d1evening == "D1_Evening_Work") {
                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh, yeah, actually, Justice asked me to cover the nightshift. I'll probably have at least <b>some</b> time to do that. Thanks.");
                    await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                    await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.sad, MCM.ƒS.positions.bottomcenter);
                    await MCM.ƒS.update(0.1);
                    await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oh, dreck! I actually came here to ask you, if you wanted to head to my place this evening. I'm throwing a party.");
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
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Thanks, tomo. You're the best.");
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
        console.log(MCM.saveData.d1evening);
        console.log(MCM.saveData.d1Ame);
        if (!(MCM.saveData.d1evening == "D1_Evening_Work" && (MCM.saveData.d1Ame == "fewer" || MCM.saveData.d1Ame == "fewest"))) {
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Well, what I actually came here for was to inform you, that tonight I'm having a party at my place.");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Casual clothing, enough ethanol to desinfect a whole bodyshop, as well as lots of potential inputs and outputs that dig nice rides.");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "On the topic of bodyshops, I heard you get 20% off of all cyberware from Jackie's place! sugoi ne~");
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
            if (MCM.saveData.d1evening == "D1_Evening_Work") {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I would love to, but I already promised auntie, I would take over the sleepy boi hours.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.sad, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Kuso, just my luck. I really thought I could get you hooked up this time.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Look I appreciate it, but you don't need to worry about my love life this much.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "If it was just your love life, I really wouldn't care all that much, it's about all of your social life.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Sometimes you get so absorbed in your goals, you completely forget all other important things in life. Also, you are shit at socialising!");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Or do you have any <b>real</b> friends other than me? You know, people outside of your family that would help you in any situation, with all resources avaiable to them?");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I know, I know, you're right. Next time I'll make sure I can make it. Promise.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Yeah, you better. Else I'll force you to go speed dating or some shit like that.");
                await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(0.1);
            }
            else {
                let partyDia = {
                    no: "Sorry, but I really don't think I can go today.",
                    yes: "Yeah, I've got time."
                };
                let partyDiaElem = await MCM.ƒS.Menu.getInput(partyDia, "choice");
                switch (partyDiaElem) {
                    case partyDia.no:
                        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.angry, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Kuso, cooooooome on, tomo. I really thought I could get you hooked up this time.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Look I appreciate it, but you don't need to worry about my love life this much.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "If it was just your love life, I really wouldn't care all that much, it's about all of your social life.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "If you never go out or do anything, you'll never meet new people. Also, you are shit at socialising! So it's twice as hard for you to make friends.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Or do you have any <b>real</b> friends other than me? You know, people outside of your family that would help you in any situation, with all resources avaiable to them?");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I know, I know, you're right. Next time I'll make sure I can make it. Promise.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Yeah, you better. Else I'll force you to go speed dating or some shit like that.");
                        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        break;
                    case partyDia.yes:
                        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.happy, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Dope! Based! Superlit!");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Don't forget to wear your MCM jacket. Some of the riders really dig mechanics. Also, you look great in it.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Will do.");
                        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
                        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oh, also, come in your wyvern! As I said, cool ride equals free I/Os.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Come on, don't give me that look. You've been in a dry streak for to long!");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "No need to rub it in.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You know I love to rub in.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hahaha, yeah, you sure do.");
                        MCM.saveData.d1evening = "D1_Evening_Party";
                        break;
                }
            }
        }
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I think my car could use some more glitz. Got anything kakkoii here?");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I think the two best options are either the neon lights or the new spoiler.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "A spoiler is definitely the less imp option, but also cheaper. It would cost him about 250 yero");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "The new neon lights are preem, but at 1450 yero they are very expensive.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Getting both will ensure he scores an output, but might attract thrillers.");
        let car = {
            spoiler: "Get the spoiler",
            neon: "Get the neon lights",
            both: "get both",
        };
        let carElem = await MCM.ƒS.Menu.getInput(car, "choice");
        switch (carElem) {
            case car.spoiler:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "One of the spoilers we got will def look clean on your ride.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It would cost you 250 ¥€, and it's so quick, I can easily squeeze you in between some other work.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oh yeah, I've seen some of them. Get me the one with the shark fins.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "'Course. Gonna start the painting machine asap after lunch.");
                MCM.saveData.state.yero += 125;
                MCM.saveData.d1YuriUpgrade = "spoiler";
                break;
            case car.neon:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Def! We got new neon lights! some hi-qual stuff.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sure, they cost about 1450 yero, but they are highly customizable and look bretty damn amazing. I'm getting some myself, if I can afford it after the bills.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "That does sound imp, tomo! I'm gonna have lots of fun setting them up.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Preem. I'll ask Roland to get them fitted. I'm to swamped to do that.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Mondainai.");
                MCM.saveData.state.yero += 725;
                MCM.saveData.d1YuriUpgrade = "neon";
                break;
            case car.both:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Def! We got new neon lights! some hi-qual stuff. Together with a nice spoiler they'll work like magic.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "But, they cost about 1700 yero in total..");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ah, sure, I got the extra bank. I better score tonight, though.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I guarantee you will. I'll ask Roland to get them built in. I'm to swamped to do that.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Mondainai.");
                MCM.saveData.state.yero += 1050;
                MCM.saveData.d1YuriUpgrade = "both";
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sorry, tomodachi. Break's over, gotta go.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Mondainai. I need to buzz anyway, even small corpos don't run them-");
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.surprised, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.angry, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, "What's the aho doing here? You know he annoys the essence out of me.");
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Well, actually, I'm here as a customer.");
        switch (MCM.saveData.d1YuriUpgrade) {
            case car.spoiler:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I wanted to get a kakkoii spoiler.");
                break;
            case car.neon:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "JJ recommended the new neonlights, and I'd like them in my car.");
                break;
            case car.both:
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Some neonlights and a spoiler would make my car meccha kakkoii. JJ has a good eye for these things.");
                break;
        }
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.sad, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "But I don't know if I can handle you being so mean to me. I might have to go to a different shop. Maybe they'll appreciate their dear, dear customers.");
        await MCM.ƒS.Character.hide(MCM.characters.Justice);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.closed, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, "<i>inhales</i>");
        await MCM.ƒS.Character.hide(MCM.characters.Justice);
        await MCM.ƒS.Character.show(MCM.characters.Justice, MCM.characters.Justice.pose.normal, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Justice, "That's xactly what I meant. Anyway... You and Roland are gonna run the front alone for a while.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Will do. See ya in a while.");
        await MCM.ƒS.Character.hide(MCM.characters.Justice);
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I'll bounce too. Good luck, tomodachi.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Later, tomo.");
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.Character.hideAll();
        MCM.ƒS.Sound.fade(MCM.music.noonBGM, 0, 2, true);
        await MCM.ƒS.update(2);
        return MCM.saveData.d1evening;
    }
    MCM.D1_Noon = D1_Noon;
})(MCM || (MCM = {})); //await ƒS.Speech.tell(characters., ".");
//Bakai mitai
var MCM;
//Bakai mitai
(function (MCM) {
    async function Ending_Depression() {
        MCM.playing = MCM.music.synthAdiago;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "3 weeks later.");
        MCM.ƒS.Inventory.open();
        MCM.openinv = true;
        document.getElementsByClassName("close")[0].className += "hidden";
        for (let i = 15; i > 0; i--) {
            MCM.ƒS.Inventory.add(MCM.items.Rum);
        }
        MCM.ƒS.Inventory.add(MCM.items.Stop);
        while (MCM.openinv) {
            console.log(MCM.openinv);
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "One... more drink can't hurt");
        }
        await MCM.ƒS.Location.show(MCM.locations.black);
        await MCM.ƒS.update(2);
        MCM.ƒS.Character.hideAll();
        if (MCM.saveData.drunkness < 500) {
            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "JJ calls Yuri while drunk. After talking it out over the course of a few hours, James feels like he has the courage to go back to work.");
        }
        if (MCM.saveData.drunkness > 500 && MCM.saveData.drunkness < 1000) {
            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Several drinks made JJ pass out, the next morning he decides, never to set a foot into a bodyshop ever again.");
        }
        if (MCM.saveData.drunkness > 1000) {
            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "After one last drink JJ passes out, never waking up again.");
        }
        MCM.ƒS.Sound.fade(MCM.playing, 0, 2, true);
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "The end.");
        return "End_Credits";
    }
    MCM.Ending_Depression = Ending_Depression;
})(MCM || (MCM = {}));
//# sourceMappingURL=MCM.js.map