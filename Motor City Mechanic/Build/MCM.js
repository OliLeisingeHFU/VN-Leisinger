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
        inv: false,
        sobbering: false,
        state: {
            yero: 0
        },
        happiness: 25,
        friendship: {
            Yuri: {
                state: "best friend",
                happiness: 100
            },
            Ame: {
                state: "stranger",
                happiness: 10
            },
            Azami: {
                state: "stranger",
                happiness: 10
            },
            Urban: {
                state: "stranger",
                happiness: 10
            },
            Books: {
                state: "stranger",
                happiness: 10
            },
        },
        drunkness: 0,
        yuriRabbit: "Pekora",
        d1evening: "",
        d1Ame: "",
        d1YuriUpgrade: "",
        d1Dio: "",
        d1AfterPartyDate: ""
    };
    MCM.miniGameAnswer = new Array;
    let credits = [
        "<b>Titlescreen:</b></br>\
    <i>Car:</i> Daniel Zhabotinsky on Sketchfab</br>\
    <i>Font:</i> Perfect Dark BRK by Ænigma Fonts",
        "<b>Backgrounds:</b></br>\
    Futuristic Reality 2 Pack by Rachel Chen",
        "<b>Hairstyles:</b></br>\
    <i>JJ & Dio:</i> https://booth.pm/en/items/2870629 / Male protagonist hair by Atelier Echo ~ アトリエ・エコー</br>\
    <i>Justice:</i> https://booth.pm/en/items/3028807 / Vroid Blonde Ponytail by nyxxxnoctis</br>\
    <i>Yuri:</i> 【Serena Kupopo - https://kupopo.net/】</br>\
    <i>Amelia:</i> https://booth.pm/en/items/3020826 / Vroid Hair Preset ane texture by nyxxxnoctis</br>\
    <i>Books:</i> https://booth.pm/ja/items/2933774 / Long Curly hair With headbang Preset by scarletanimefox</br>\
    <i>Nao:</i> https://booth.pm/ja/items/3044682 / Vroid~ Free hair preset 3 by alis</br>\
    <i>Azami:</i> https://booth.pm/ja/items/3044516 / Vroid~ Free hair preset by alis</br>\
    ",
        "<b>Music:</b></br>\
    <i>Alumo:</i> https://soundcloud.com/alumomusic/sets/synthwave",
        "<b>Textbox:</b></br>\
    https://otomeflag.itch.io/futuristic-hologram-01 by OTOME	&#10084; FLAG"
    ];
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
        if ((person.happiness - value) >= -100) {
            person.happiness -= value;
        }
        else {
            person.happiness = -100;
        }
    }
    MCM.lowerFriendship = lowerFriendship;
    MCM.yesno = {
        yes: "Yes",
        no: "No"
    };
    async function fadeToBlack() {
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.update(2);
    }
    MCM.fadeToBlack = fadeToBlack;
    async function fadeToBlackMusicOff() {
        MCM.ƒS.Sound.fade(MCM.playing, 0, 2, true);
        await MCM.ƒS.Location.show(MCM.locations.black);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.update(2);
    }
    MCM.fadeToBlackMusicOff = fadeToBlackMusicOff;
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
            case ingameMenu.credits:
                let current = 0;
                let flip = { back: "Back", next: "Next", done: "Close" };
                let choice;
                MCM.ƒS.Text.addClass("credits");
                do {
                    MCM.ƒS.Text.print(credits[current]);
                    choice = await MCM.ƒS.Menu.getInput(flip, "flip");
                    switch (choice) {
                        case flip.back:
                            current = Math.max(0, current - 1);
                            break;
                        case flip.next:
                            current = Math.min(credits.length - 1, current + 1);
                            break;
                    }
                } while (choice != flip.done);
                MCM.ƒS.Text.close();
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
                happy: "Images/Characters/Amelia/happy.png",
                angry: "Images/Characters/Amelia/angry.png",
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
        Azami: {
            name: "Azami",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Azami/.png",
                normal: "Images/Characters/Azami/neutral.png",
                happy: "Images/Characters/Azami/happy.png",
                surprised: "Images/Characters/Azami/surprised.png",
                angry: "Images/Characters/Azami/angry.png",
                cute: "Images/Characters/Azami/cute.png",
            }
        },
        Books: {
            name: "Books",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Books/.png",
                normal: "Images/Characters/Books/neutral.png",
                happy: "Images/Characters/Books/happy.png",
                surprised: "Images/Characters/Books/surprised.png",
                sad: "Images/Characters/Books/sad.png",
                cute: "Images/Characters/Books/cute.png",
            }
        },
        Urban: {
            name: "Urban",
            origin: MCM.ƒS.ORIGIN.BOTTOMCENTER,
            pose: {
                pathtemplate: "Images/Characters/Urban/.png",
                normal: "Images/Characters/Urban/neutral.png",
                happy: "Images/Characters/Urban/happy.png",
                surprised: "Images/Characters/Urban/surprised.png",
                angry: "Images/Characters/Urban/angry.png"
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
        await MCM.ƒS.Speech.tell(MCM.characters.Unknown, "Good morning, motherfuckers!");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Huh? Who said that?");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Weird...");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Must've been the wind.");
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
            case MCM.ƒ.KEYBOARD_CODE.I:
                if (MCM.saveData.inv) {
                    MCM.ƒS.Inventory.close();
                    MCM.saveData.inv = false;
                }
                else {
                    MCM.ƒS.Inventory.open();
                    MCM.saveData.inv = true;
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
    document.addEventListener("keydown", hndKeyPress);
    window.addEventListener("load", start);
    function start(_event) {
        //Menu
        gameMenu = MCM.ƒS.Menu.create(ingameMenu, menuFunctions, "gameMenu");
        // Important HTML Elements
        MCM.menu = document.getElementsByClassName("gameMenu")[0];
        MCM.money = document.getElementsByClassName("moneybar")[0];
        MCM.checklist = document.getElementById("checklist");
        let scenes = [
            /*       { scene: D1_Morning, name: "Scene1" },
                  { scene: D1_Noon, name: "Scene2" },
                  { scene: D1_Evening_Free, name: "D1_Evening_Free", id: "D1_Evening_Free" },
                  { scene: D1_Evening_Work, name: "D1_Evening_Work", id: "D1_Evening_Work" },
                  { scene: D1_Evening_Party, name: "D1_Evening_Party", id: "D1_Evening_Party" },
                  { scene: D1_Evening_Free, name: "D1_AfterParty_Ame", id: "D1_AfterParty_Ame" },
                  { scene: D1_Evening_Work, name: "D1_AfterParty_Azami", id: "D1_AfterParty_Azami" },
                  { scene: D1_Evening_Party, name: "D1_AfterParty_Books", id: "D1_AfterParty_Books" },
                  { scene: D1_Evening_Party, name: "D1_AfterParty_Urban", id: "D1_AfterParty_Urban" },
                  { scene: Ending_Depression, name: "Ending_Depression", id: "Ending_Depression", next: "End_Credits" }, */
            { scene: MCM.End_Credits, name: "End_Credits", id: "End_Credits" }
        ];
        let uiElement = document.querySelector("[type=interface]");
        MCM.saveData.state = MCM.ƒS.Progress.setData(MCM.saveData.state, uiElement);
        // start the sequence
        MCM.ƒS.Progress.go(scenes);
    }
})(MCM || (MCM = {}));
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
        MCM.fadeToBlack();
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(2);
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
                MCM.fadeToBlack();
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "2 hours of anime later.");
                await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
                await MCM.ƒS.update(0.3);
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Guess I should head to bed, catch some more z's before I gotta work.");
                break;
            case doing.games:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I've got more than enough RPGs I haven't finished yet.");
                MCM.fadeToBlack();
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
                        MCM.fadeToBlack();
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
        }
        MCM.fadeToBlackMusicOff();
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "to be continued...");
    }
    MCM.D1_Evening_Free = D1_Evening_Free;
})(MCM || (MCM = {}));
//levan polkka
var MCM;
//levan polkka
(function (MCM) {
    async function D1_Evening_Party() {
        // for debugging:
        MCM.saveData.d1YuriUpgrade = "both";
        MCM.saveData.d1Ame = "fewest";
        //start:
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.update(2);
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
            yukata: "A nice suit."
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
            case clothing.yukata:
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I could go for my fancy suit.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Pff... pf... pahahahAHAHHA... yeah, right.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I think I'll wear a yukata. It's still summer after all.");
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0000);
        MCM.ƒS.Sound.fade(MCM.playing, 0, 1);
        MCM.fadeToBlack();
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
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "You chose this outfit.");
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
            case clothing.yukata:
                await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "A yukata? Did you want to flaunt your heritage or something? Though honestly, you are kinda rocking it! No matter how out of place it is.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It's just so nice to wear this during summer's evenings. Very comfortable. You should try it, too!");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You know what? maybe I will! Not today though. But next time.");
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0002);
        switch (MCM.saveData.d1YuriUpgrade) {
            case "spoiler":
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You know, Nao didn't even ntoce the spoiler. Bummer.");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "But a bunch of other people complimented me on it so it was worth it after all. T-Y, tomodachi.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "You're welcome.");
                break;
            case "neon":
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "The neon was a sweet idea, JJ, Nao really liked the color I chose.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh really, what color was it set to?");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Well, purple.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "So the color I told Ronald to set as default?");
                await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Because you know I really like that color, 'xactly. So I basicly chose it.");
                break;
            case "both":
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
        await MCM.ƒS.Character.show(MCM.characters.Nao, MCM.characters.Nao.pose.surprised, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0000);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0003);
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Character.show(MCM.characters.Nao, MCM.characters.Nao.pose.normal, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0001);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0002);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, text.JJ.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0004);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0005);
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, text.Nao.T0003);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oh, I just remembered, I got this weird rabbit yesterday, they gave pets away after some weird experiment.");
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, "They tried to invent a way to understand pets, I think. But something about it was weird, so they stopped.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Something? A lot of things went wrong. It's just talking japanese in a really high voice and has a strange laugh.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Strange? In what way?");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Like this:");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ha &#8599; Ha &#8600; Ha &#8599;");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What the hell?");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I know, right? Anyway, Nao and I couldn't decide on a good name.");
        MCM.saveData.yuriRabbit = await MCM.ƒS.Speech.getInput();
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What about " + MCM.saveData.yuriRabbit + "?");
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, "I kinda like it.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, MCM.saveData.yuriRabbit + " it is I guess. Anyway, let me show you the people I was talking about.");
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0006);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0007);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0008);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, text.Yuri.T0009);
        let guests = {
            azami: "Talk to Azami.",
            urban: "Talk to Urban.",
            books: "Talk to Books.",
            ame: "Amelia is not here yet."
        };
        let choice;
        for (let i = 0; i < 3; i++) {
            MCM.ƒS.Character.hideAll();
            await MCM.ƒS.update(1);
            if (i == 2 && MCM.saveData.d1Ame != "fewest") {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Looks like Amelia has arrived");
                guests.ame = "Talk to Amelia";
            }
            else if (i == 2) {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Looks like Amelia won't come after all.");
                i++;
            }
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Now, who should I talk to?");
            let guestelem = await MCM.ƒS.Menu.getInput(guests, "choice");
            switch (guestelem) {
                case guests.azami:
                    if (guests.azami == "I already talked to Azami") {
                        if (MCM.saveData.friendship.Azami.happiness > 50) {
                            await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey, I would like to come with you now... if that's alright with you.");
                            await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Sure, Let's go cutie.");
                            MCM.saveData.d1AfterPartyDate = "Azami";
                            return "D1_AfterParty_Azami";
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What am I doing, I already talked to her.");
                        i--;
                        break;
                    }
                    else {
                        await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "H-Hi, I'm JJ. Great party, isn't it?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Hello JJ, I'm Azami. Great party indeed.");
                        switch (clothingElem) {
                            case clothing.anime:
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Never much cared for anime, but oh well.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Haha, no problem, I like other things too.");
                                break;
                            case clothing.mcmjacket:
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Soooooo, you thought you could get some, with this MCM jacket?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Actually, Yuri said I look kakkoii in it.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Can't argue with that, but it's still suspicious.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Azami, 5);
                                break;
                            case clothing.otokonoko:
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.cute, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "I must say, you look very cute. <sub>There's a lot of fun I can have with you.</sub>");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sorry, I didn't get that last part?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Oh, nothing important, I was just thinking out loud.");
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 15);
                                break;
                            case clothing.yukata:
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "A yukata? Interesting choice for a party.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I just think they are neat.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "They are comfortable!");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "And looks pretty good too, I guess.");
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 10);
                                break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Yuri told me a bit about you. You love video games, huh?");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yes, he told me that's something we have in common.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Oh yes, there's some other... activities I'm more interested in, but gaming is fun.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Tell me, what games do you like?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I wonder what genres we have in common?");
                        let games = {
                            rpg: "Storydriven RPGs",
                            vn: "Visual Novels",
                            fps: "FPS",
                            hack: "Hack'n'Slay"
                        };
                        choice = await MCM.ƒS.Menu.getInput(games, "choice");
                        switch (choice) {
                            case games.rpg:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I like a good storydriven RPG, like 'Shadewalk: Hong Kong' or 'Cavaliers of the Ancient Democracy");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "I can definitely see why, but they are just not quite my cup of synthtea.");
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 5);
                                break;
                            case games.vn:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I am a Visual Novel enjoyer. My favorites are 'T4RT-4RU5' and 'FELSEN;ENTRANCE'.");
                                if (clothingElem == clothing.anime) {
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "You're a weeb, I really should've seen that coming.");
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "In my opinion, VNs are not real games.");
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hmm, I wouldn't say that. Some have quite a lot more than just the story aspect.");
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "But I must admit, being an anime fan probably played a role in this decision.");
                                    MCM.lowerFriendship(MCM.saveData.friendship.Azami, 12);
                                }
                                else {
                                    await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                    await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.angry, MCM.ƒS.positions.bottomcenter);
                                    await MCM.ƒS.update(0.1);
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Guh, okay...");
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "In my opinion, VNs are not real games.");
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "You have no idea what you are talking about! Visual Novels are great! 'T4RT-4RU5' is an amazing slice-of-life!");
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Oof, sorry...");
                                    await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                    await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                                    await MCM.ƒS.update(0.1);
                                    MCM.lowerFriendship(MCM.saveData.friendship.Azami, 20);
                                }
                                break;
                            case games.fps:
                            case games.hack:
                                if (choice == games.fps) {
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I really like FPS games, like 'Halation' and 'Peak Sagas'.");
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "'Halation 3: SDST' had such an amazing soundtrack! The smooth jazz and the rain sounds really perfected the atmosphere at night.");
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Exactly my thoughts! No game I've ever played could capture this feeling of loneliness as well as 'SDST'. It really enhanced the play experience.");
                                    MCM.higherFriendship(MCM.saveData.friendship.Azami, 3);
                                }
                                else {
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I love Hack'n'Slay games. 'Devil', for example, or 'Diavolo May Cry'.");
                                }
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.cute, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Hmm, fast-paced action, your fingers must be very dextrous.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I-I guess, yeah.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Well, I kinda like them too, though they aren't my favorite.");
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 12);
                                break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, what about you though? What are your favourite games?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "I think..., hm, yes, definitely strategy and simulation games. Building a zoo or city or something and then managing it.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Seeing the numbers go up is kinda fun, I don't know.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Huh. Not quite what I expected. Maybe because I've never played one.");
                        await MCM.ƒS.Character.hide(MCM.characters.Azami);
                        await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.surprised, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Never?! Seriously? I can't believe that!");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yeah, it just never quite caught my attention, I suppose.");
                        await MCM.ƒS.Character.hide(MCM.characters.Azami);
                        await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        MCM.lowerFriendship(MCM.saveData.friendship.Azami, 3);
                        console.log(MCM.saveData.friendship.Azami.happiness);
                        if (MCM.saveData.friendship.Azami.happiness > 25) {
                            await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Hmm, maybe we can play one together sometime, you might end up liking them!");
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yeah, maybe.");
                        }
                        else if (MCM.saveData.friendship.Azami.happiness < -12) {
                            await MCM.ƒS.Speech.tell(MCM.characters.Azami, "You know what? I gotta go. Talk to you some other time.");
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yeah, goodbye.");
                            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "She definitely won't talk to me again.");
                            MCM.saveData.friendship.Azami.state = "disliked";
                            break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Well, what other interests do you have?");
                        let interests = {
                            anime: "Talk about Anime",
                            car: "Talk about work",
                            music: "Talk about music",
                            horni: "Talk about bedroom preferences",
                            shy: "Be reserved"
                        };
                        choice = await MCM.ƒS.Menu.getInput(interests, "choice");
                        switch (choice) {
                            case interests.anime:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I love anime. Could watch it for hours.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Hmm, maybe I should watch some too, but I'm not sure I like that stuff.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, in the end anime is not a genre, just a type of visuals. Though I guess it's story-telling differs from UNAS or European productions.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I could recommend something based on what genres you like.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Well, there is all kinds of stuff I like. Maybe some drama, action and sci-fi?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh yes, I got something for that. I'll send you the address. To be fair, the story may get confusing at times, but it's a worthy watch.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Hmm, let's see... Action, Sci-fi, Psychological, Drama, Mecha. Does sound interesting. There are some different versions though, which should I watch?");
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, I would recommend watching the original show, except for the last 2 episodes and then watch this movie right here.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Or you could just watch the remake movies. The story starts out the same, but diverges a lot as the movies go on. I like both versions though.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Cool, I guess I'll start with the remakes then. Kinda cute how you love talking about anime like that.");
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 10);
                                break;
                            case interests.car:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I spend a ton of time around cars, both at work and home. Fixing and tuning them is a ton of fun for me");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Meh, I don't care that much about cars.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Azami, 5);
                                break;
                            case interests.music:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sometimes I like to just lay down, listen to music for a few hours. Do nothing.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "What genre of music?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Depends on the mood, mostly J-Pop and Rock though.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Rock? Now we're talking! I love listening to that too!");
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 5);
                                break;
                            case interests.horni:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I kinda have a thing for... You know what? nevermind that.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Oi, don't leave me having now!");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "<i>sigh</i> Alright. Well, I like getting dommed. There, I already regret it.");
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.cute, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Oh, my, my, my. Someone who isn't afraid of talking about that kinda stuff during the first time meeting, <b>and</b> that is my type?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "You better mean it, I could show you my toys at home.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "You started this, no need to get red. Though you do look very adorable right now.");
                                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Azami, 45);
                                MCM.saveData.friendship.Azami.state = "liked";
                                break;
                            case interests.shy:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Uh, I dunno, not m-much to be honest.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Don't wanna tell? I guess that's fair.");
                                break;
                        }
                        if (MCM.saveData.friendship.Azami.happiness > 50) {
                            await MCM.ƒS.Character.hide(MCM.characters.Azami);
                            await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.cute, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Why don't we... take this to my place?");
                            choice = await MCM.ƒS.Menu.getInput(MCM.yesno, "choice");
                            switch (choice) {
                                case MCM.yesno.yes:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I would absolutely love to!");
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Great! Let's go!");
                                    MCM.saveData.d1AfterPartyDate = "Azami";
                                    return "D1_AfterParty_Azami";
                                case MCM.yesno.no:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sorry, but not yet, there is still someone I want to talk to.");
                                    await MCM.ƒS.Character.hide(MCM.characters.Azami);
                                    await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                                    await MCM.ƒS.update(0.1);
                                    await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Sure, mondainai.");
                                    break;
                            }
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Nice talk, gotta go though, Yuri wants me to meet other people as well.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "See ya.");
                        guests.azami = "I already talked to Azami";
                    }
                    break;
                case guests.urban:
                    if (guests.urban == "I already talked to Urban") {
                        if (MCM.saveData.friendship.Urban.happiness > 50) {
                            await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey, I would like to come with you now... please?");
                            await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Hell yeah, I wanna see your ride! Let's take your car.");
                            MCM.saveData.d1AfterPartyDate = "Urban";
                            return "D1_AfterParty_Urban";
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What am I doing, I already talked to him.");
                        i--;
                        break;
                    }
                    else {
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Uh, hey, I'm JJ.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Oh, 'sup JJ, am Urban.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "daijoobu desu. And you?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "I'm good. Sorry, I'm not great with local talk yet.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Ah, my bad, Yuri did say you were from Switzerland. I'm fine.");
                        switch (clothingElem) {
                            case clothing.anime:
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Oh, you watch those weird japanese cartoons, huh?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yes, I like anime...");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Aren't cartoons just for children?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Just... don't, okay?");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.angry, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "What's your problem?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It's just so annoying that people still think animation is a genre for kids. It's really not. It's a fucking form of art. Thankyouverymuch.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Daamn, alright Kumpel, sorry.");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.lowerFriendship(MCM.saveData.friendship.Urban, 15);
                                break;
                            case clothing.mcmjacket:
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "You're a mech, huh? That's awesome, I love cars, and racing. Yuri only said you like cars.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Mhm, I work at Justice's place. I can ping the location for you.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Dunno, what did you work on so far?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Aside from my Wyvern I also often worked on Yuri's Speed-Wagon and Amelia's KX-1.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Preem, maybe I should visit after all. Also, Muscle car? Nice choice, though I personally prefer sport compacts.");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Urban, 25);
                                break;
                            case clothing.otokonoko:
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.surprised, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Now that I'm taking a closer look, I didn't expect such a cute girl to be here.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Ah, w-well thank you, but fair w-warning, I'm not a girl.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Oh sorry, dude, It's jus-");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Don't even worry about it, I... k-kindly liked it when you called me cute.");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "<i>under his breath</i> <sub>Damn, that's cute.</sub> Ahem, no problem, dude. I don't mind either way.");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Urban, 12);
                                break;
                            case clothing.yukata:
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "The fuck are you wearing, by the way?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "That is a yukata. A type of japanese clothing.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Well it looks weird, why are you dressed like that?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I like wearing them, they are perfect for summer. So fuck off.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Hmm, can't argue with that, I s'pose.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Urban, 10);
                                break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "So, you love cars, hm?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Absolutely, I came here from Switzerland, just for racing, and the tuning freedom.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What car you got?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "A Marina E-8.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "That's a sweet sport compact. But can be a pain. You should probably replace the catalyst. Gonna save you a lot of trouble down the road.");
                        if (clothingElem != clothing.mcmjacket) {
                            await MCM.ƒS.Character.hide(MCM.characters.Urban);
                            await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.surprised, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Oh, you're a mech? That's so preem.");
                            await MCM.ƒS.Character.hide(MCM.characters.Urban);
                            await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yup, at Justice's shop.");
                            MCM.higherFriendship(MCM.saveData.friendship.Urban, 5);
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Thanks for the tip. I'll look out for that.");
                        if (MCM.saveData.friendship.Urban.happiness < 10) {
                            await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Nothing personal, but this is boring, I'll talk to someone else.");
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Uh huh...");
                            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "What a dick.");
                            MCM.saveData.friendship.Urban.state = "disliked";
                            break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What kinda races you riding in?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Mostly circuit races. Uptown has a nice track.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh, nice. If you like circuits, there is a lesser known race in the kanashii district.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It's kind of a secret newer racers are not aware of. It's an amazing track though.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Duuuude... Thanks for the tip. I'll check it out.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Let's not just talk about cars though, what's your life like?.");
                        let life = {
                            family: "Talk about family.",
                            friends: "talk about friends.",
                            love: "Talk about love life.",
                            hobbies: "Talk about hobbies."
                        };
                        choice = await MCM.ƒS.Menu.getInput(life, "choice");
                        switch (choice) {
                            case life.family:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, I'm a Motor City native, but my mothers family is from Japan.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Justice is actually my aunt. She has been nagging forever, trying to get me to learn japanese.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "But it's kinda hard, outside of MC slang.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "I totally get what you mean. Aunt Melanie is still calling me once a week to tell me I'm a fuck-up, just cause I don't wanna work in the family business.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What kinda business?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Cheese-making. Do I look like someone who wants to make cheese for a living?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hehe, no not really.");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Exactly. Hahaha.");
                                await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                MCM.higherFriendship(MCM.saveData.friendship.Urban, 10);
                                break;
                            case life.friends:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, my best friend Yuri is the host of this party. And he invited me and told me who has similar interests.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "He is way to worried about my love life, but I couldn't wish for a better friend.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Hmm, yes. I've only met him a few weeks ago, but he really is a stand up guy.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Helped me a lot, getting to know MC and arranging stuff.");
                                MCM.higherFriendship(MCM.saveData.friendship.Urban, 5);
                                break;
                            case life.love:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "At the moment? Very lonely. Haven't had an I/O in at least 2 years.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I would never tell Yuri, but I think it's starting to get to me.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Dude, you're coming on way to strong. Chill a bit.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sometimes I talk without thinking, sorry.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Urban, 10);
                                break;
                            case life.hobbies:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, if I'm not working, at the shop or on my own car, I like to watch anime, play video games, that kinda stuff.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Those japanese cartoons?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yes.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Huh, ok.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What do you do in your free time?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Ahh, you know, mostly racing, but also doing sports. Or play a few games too.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hmm, interesting.");
                                break;
                        }
                        if (MCM.saveData.friendship.Urban.happiness > 50) {
                            await MCM.ƒS.Character.hide(MCM.characters.Urban);
                            await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.happy, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Wanna come to my place?");
                            choice = await MCM.ƒS.Menu.getInput(MCM.yesno, "choice");
                            switch (choice) {
                                case MCM.yesno.yes:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I would absolutely love to!");
                                    await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Great! Let's go!");
                                    MCM.saveData.d1AfterPartyDate = "Urban";
                                    return "D1_AfterParty_Urban";
                                case MCM.yesno.no:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sorry, but there's still guests I want to talk to.");
                                    await MCM.ƒS.Character.hide(MCM.characters.Urban);
                                    await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
                                    await MCM.ƒS.update(0.1);
                                    await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Sure, no problem.");
                                    break;
                            }
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Nice talk, gotta go though, Yuri wants me to meet other people as well.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "See ya.");
                        guests.urban = "I already talked to Urban";
                    }
                    break;
                case guests.books:
                    if (guests.books == "I already talked to Books") {
                        if (MCM.saveData.friendship.Books.happiness > 50) {
                            await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey, I thought maybe you would like to go to my place now?");
                            await MCM.ƒS.Speech.tell(MCM.characters.Books, "Y-yes, please, that would be lovely!");
                            MCM.saveData.d1AfterPartyDate = "Books";
                            return "D1_AfterParty_Books";
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What am I doing, I already talked to her.");
                        i--;
                        break;
                    }
                    else {
                        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "H-hey, you're Books, right?");
                        await MCM.ƒS.Character.hide(MCM.characters.Books);
                        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.surprised, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "UH WAHHH!");
                        await MCM.ƒS.Character.hide(MCM.characters.Books);
                        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Ugh, t-that's so embarrassing, s-sorry. Yes I am Books. Have w-we met?");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Not that I know, no. I'm JJ.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Oh yes, I was told about you. But Nao-chan didn't tell me why. He just said that his new input has a friend I would like.");
                        switch (clothingElem) {
                            case clothing.anime:
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "But looking at you, it's kind of obvious. Nanas weird escapade is my all time favorite franchise. Especially Part 4.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Nanasuke is just the most adorable cinnamon roll.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Wow...");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.surprised, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "OhmygodimsosorryididntmeantocomeoffsostronglyijustgetsoexcitedwhentalkingaboutNNWE. Eep!");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh, hey, no don't even worry about it, it's just that...");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well...");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.sad, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Uhm...");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "My heart s-skipped a beat there... Yabe. This is so embarrassing.");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "You don't think it was weird?");
                                choice = await MCM.ƒS.Menu.getInput(MCM.yesno, "choice");
                                switch (choice) {
                                    case MCM.yesno.yes:
                                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It was a lil weird, but I don't mind. Bit it was a lil cute too.");
                                        await MCM.ƒS.Character.hide(MCM.characters.Books);
                                        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                                        await MCM.ƒS.update(0.1);
                                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Oh, okay.");
                                        MCM.higherFriendship(MCM.saveData.friendship.Books, 25);
                                        break;
                                    case MCM.yesno.no:
                                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "No, I think it's adorable seeing you get excited over something like this. I love seeing people this happy.");
                                        await MCM.ƒS.Character.hide(MCM.characters.Books);
                                        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.cute, MCM.ƒS.positions.bottomcenter);
                                        await MCM.ƒS.update(0.1);
                                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Ah, t-tha-thank you-u.");
                                        await MCM.ƒS.Character.hide(MCM.characters.Books);
                                        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                                        await MCM.ƒS.update(0.1);
                                        MCM.higherFriendship(MCM.saveData.friendship.Books, 35);
                                        MCM.saveData.friendship.Books.state = "crush";
                                        break;
                                }
                                break;
                            case clothing.mcmjacket:
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Oh... you're a mechanic. I must admit I'm not the biggest fan of racing. It's scary.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Huh?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Ah yeah, the jacket. Well, actually I don't race. I just really like working on cars. Learning how they work, making them look kakkoii. That kinda stuff.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Hmm, I guess people like that can be found here in MC too.");
                                break;
                            case clothing.otokonoko:
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "That is a very cute dress. Did you get it at the place next to Jackie's bodyshop?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Thank you. Yes, actually. Do you visit that shop often?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Yes, both actually. The cutest clothes and the best service for high quality datajacks. Going there is always a dream.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "High quality datajack? For rigging, decking or just VRnime?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Decking and VRnime.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "May I ask whether-");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "I'm a white hat or a runner? Yes, I don't mind. I'm a runner, actually.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Huh, Didn't expect that.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "That's the point. No one expects me. Also, how else could I afford all the anime figurines.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Haha, yeah I get what you mean.");
                                MCM.higherFriendship(MCM.saveData.friendship.Books, 20);
                                break;
                            case clothing.yukata:
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Hmm, a yukata. Almost out of place for an event like this.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I don't think so. A party in summer kind of is a summer festival, right?");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Hahaha! Man, you're funny.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "That wasn't a joke!");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Pfft.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Aww come oooon...");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Sorry. You are right. Totally not...");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "hihihi.");
                                await MCM.ƒS.Character.hide(MCM.characters.Books);
                                await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Totally not funny.");
                                MCM.higherFriendship(MCM.saveData.friendship.Books, 10);
                                break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "What kind of animes do you usually watch?");
                        let anime = {
                            shonen: "Shonen",
                            romcom: "Romcom",
                            horror: "Horror",
                            isekai: "Isekai"
                        };
                        choice = await MCM.ƒS.Menu.getInput(anime, "choice");
                        switch (choice) {
                            case anime.shonen:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I usually watch shonen. Like Nanas weird escapade. Or the fantasy one with the magic guilds.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Ugh, I dunno, aside from a few exceptions, of wich Nana definitely is the best, shonen is too generic for me.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Books, 5);
                                break;
                            case anime.romcom:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I watch romcoms. Like that one where the boy works as a tutor for several girls, cause he is poor.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "My favorite is the one where the main characters are geniuses and in love with each other, but both are too stubborn to confess, so they try to force each other to do so.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Oh yeah, that one is great. But I prefer the one where the girl has a communication disorder, and the guy looks amazing while crossdressing.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Ah, I haven't seen that one yet.");
                                MCM.higherFriendship(MCM.saveData.friendship.Books, 5);
                                break;
                            case anime.horror:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I like horror and psychological stuff.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Now we're talking! Those are definitelly my favorite genres!");
                                MCM.higherFriendship(MCM.saveData.friendship.Books, 20);
                                break;
                            case anime.isekai:
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Mostly isekais. No matter how trashy, wether the MC dies and reincarnates or gets summoned. It's usually entertaining.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Books, "Yikes! I hate isekais. So many shitty fantasy light novels get made every year, just because they are forced to be isekais.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Books, 5);
                                break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "I actually prefer light novels over anime though.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Which is how I got my nickname. 'Because you're always buried in your books, and probably the only runner with purely booksmarts.'");
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "They say that as if it wasn't the most important thing while decking!");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I don't know much about decking. But for rigging, streetsmarts are kinda important too. Maybe that's what really sets them apart?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Yeah, I'd say so.");
                        if (MCM.saveData.friendship.Books.happiness > 50) {
                            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "She's got kind of a lonely look. Maybe I should invite her over?");
                            choice = await MCM.ƒS.Menu.getInput(MCM.yesno, "choice");
                            switch (choice) {
                                case MCM.yesno.yes:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey, would you, just maybe, like to come to my place, we could watch anime and hang.");
                                    await MCM.ƒS.Character.hide(MCM.characters.Books);
                                    await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.cute, MCM.ƒS.positions.bottomcenter);
                                    await MCM.ƒS.update(0.1);
                                    await MCM.ƒS.Speech.tell(MCM.characters.Books, "Oh my, that would be great!");
                                    MCM.saveData.d1AfterPartyDate = "Books";
                                    return "D1_AfterParty_Books";
                                case MCM.yesno.no:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I think I'll talk to the others first.");
                                    break;
                            }
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, I'm gonna go talk to the other guests, Yuri is forcing me to socialise.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Til' later. Was nice talking to you!");
                        guests.books = "I already talked to Books";
                    }
                    break;
                case guests.ame:
                    if (guests.ame == "I already talked to Amelia") {
                        if (MCM.saveData.friendship.Ame.happiness > 50) {
                            await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.normal, MCM.ƒS.positions.bottomcenter);
                            await MCM.ƒS.update(0.1);
                            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey, so, the invitation still stands?");
                            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "It do, let's get to my car.");
                            MCM.saveData.d1AfterPartyDate = "Amelia";
                            return "D1_AfterParty_Ame";
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "What am I doing, I already talked to her.");
                        i--;
                        break;
                    }
                    else if (guests.ame == "Amelia is not here yet.") {
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Too bad Amelia isn't here yet. I wanted to talk to her.");
                        i--;
                        break;
                    }
                    else {
                        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.normal, MCM.ƒS.positions.bottomcenter);
                        await MCM.ƒS.update(0.1);
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hey Amelia.");
                        switch (MCM.saveData.d1Ame) {
                            case "fewer":
                                await MCM.ƒS.Character.hide(MCM.characters.Amelia);
                                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.angry, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Hey Asshat.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "I lost the fucking race because you missed something on my scan this morning.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "What the fuck do you want now?");
                                break;
                            case "correct":
                            case "more":
                                await MCM.ƒS.Character.hide(MCM.characters.Amelia);
                                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.happy, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Nice to see you again punk, Guess what? I won the race. Guess you got yourself a loyal customer.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Congrats! I'm glad it worked out.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Yup, me too, that was a great paycheck.");
                                break;
                            case "most":
                                await MCM.ƒS.Character.hide(MCM.characters.Amelia);
                                await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.angry, MCM.ƒS.positions.bottomcenter);
                                await MCM.ƒS.update(0.1);
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Hey Asshat.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "I won the race, no thanks to you.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "I know you ripped me off, this morning, so what the fuck do you want?");
                                break;
                        }
                        if (MCM.saveData.friendship.Ame.happiness <= 10) {
                            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Actually, i don't even wanna hear it.");
                            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "So buzz off!");
                            break;
                        }
                        switch (clothingElem) {
                            case clothing.anime:
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "So, you're a weeb?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yup, what about you?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Every once in a while, if the show is really good.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Nice, was Nana on that list?");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Uh huh, I've seen it. It's... weirds though.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "That... joke was horrible.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Can't fault someone for trying.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Fair enough.");
                                MCM.higherFriendship(MCM.saveData.friendship.Ame, 10);
                                break;
                            case clothing.mcmjacket:
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "You know what? that jacket actually looks pretty good on you.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Thank you. I like it, too.");
                                break;
                            case clothing.otokonoko:
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "That is quite the style change, compared to this morning.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yes, I used to walk around like this all the time, but it's really inconvenient on the job.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Because you're not putting in the effort you could.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "That's one of the reason why it is annoying. You nailed it.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "But when you look that good, why not make sure you always look like that.");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Maybe I will, for you.");
                                MCM.higherFriendship(MCM.saveData.friendship.Ame, 15);
                                break;
                            case clothing.yukata:
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "This really isn't the type of festival to wear a yukata, don't you thinK?");
                                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Whatever, I can do what I want.");
                                await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Nice fake tough guy talk.");
                                MCM.lowerFriendship(MCM.saveData.friendship.Ame.happiness, 10);
                                break;
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "So, what's your deal? What do you do aside from racing?");
                        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "I- well, I like singing, actually. Sometimes I like to watch anime and play video games.");
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oh nice, you're voice <i>is</i> pretty, so I can totally imagine that");
                        MCM.higherFriendship(MCM.saveData.friendship.Ame, 10);
                        if (MCM.saveData.friendship.Ame.happiness > 50) {
                            await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Let's go to my place.");
                            choice = await MCM.ƒS.Menu.getInput(MCM.yesno, "choice");
                            switch (choice) {
                                case MCM.yesno.yes:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Right behind you!");
                                    await MCM.ƒS.Character.hide(MCM.characters.Amelia);
                                    await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.happy, MCM.ƒS.positions.bottomcenter);
                                    await MCM.ƒS.update(0.1);
                                    await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Oh my, that would be great!");
                                    MCM.saveData.d1AfterPartyDate = "Amelia";
                                    return "D1_AfterParty_Ame";
                                case MCM.yesno.no:
                                    await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I think I'll talk to the others first.");
                                    break;
                            }
                        }
                        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "See ya, there are still some I haven't talked to here.");
                        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Yup, see ya.");
                        guests.ame = "I already talked to Amelia";
                    }
                    break;
            }
        }
        MCM.ƒS.Character.hideAll();
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positionPercent(25, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Character.show(MCM.characters.Nao, MCM.characters.Nao.pose.normal, MCM.ƒS.positionPercent(75, 100));
        await MCM.ƒS.update(0.1);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "So, did you talk to everyone?");
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, "Anyone you like? Anyone that likes you?");
        if (MCM.saveData.friendship.Ame.happiness > 50 || MCM.saveData.friendship.Azami.happiness > 50 || MCM.saveData.friendship.Urban.happiness > 50 || MCM.saveData.friendship.Books.happiness > 50) {
            if (MCM.saveData.friendship.Ame.happiness > 50) {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "I think Amelia likes me.");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "At least I'll definitely see her again, she is gonna come by the shop more often.");
            }
            if (MCM.saveData.friendship.Azami.happiness > 50) {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Azami wanted me to go home with her, but I think I missed my window, she is already gone.");
            }
            if (MCM.saveData.friendship.Urban.happiness > 50) {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Urban seemed interested. I hope I'll see him again.");
            }
            if (MCM.saveData.friendship.Books.happiness > 50) {
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Books is hella kawaii. And I think she likes me back. I should ask her out some time.");
            }
        }
        else {
            await MCM.ƒS.Speech.tell(MCM.characters.JJ, "No, I'm sorry, Yuri, I appreciate the effort, but it didn't pan out.");
            await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ah, don't worry about it, you'll do it next time.");
            await MCM.ƒS.Speech.tell(MCM.characters.Nao, "Yes, I am certain you can do it. Ganbaru, JJ.");
        }
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, I'm sorry, but I gotta work tomorrow. I'll be heading out now.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "See ya!");
        await MCM.ƒS.Speech.tell(MCM.characters.Nao, "Matanee, JJ.");
        //return "D2_Morning";
        MCM.fadeToBlackMusicOff();
        return "End_Credits";
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
            await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.happy, MCM.ƒS.positions.bottomcenter);
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
        MCM.fadeToBlack();
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
        MCM.fadeToBlackMusicOff();
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
                        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Oh, also, come in your Wyvern! As I said, cool ride equals free I/Os.");
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
        MCM.fadeToBlackMusicOff();
        await MCM.ƒS.update(2);
        return MCM.saveData.d1evening;
    }
    MCM.D1_Noon = D1_Noon;
})(MCM || (MCM = {})); //await ƒS.Speech.tell(characters., ".");
//WEATHER HACKER
var MCM;
//WEATHER HACKER
(function (MCM) {
    async function D1_AfterParty_Ame() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Well, this is my place.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Huh, you got your furniture at the MegaCentra too?");
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Yep.");
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Guess we got similar tastes.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yup...");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
        await MCM.ƒS.Character.hide(MCM.characters.Amelia);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.questioning, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Hey, some dude left this anime stuff at my place. Know what it is?");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Received " + MCM.items.Asacoco.name + ". Press I to open Inventory.");
        MCM.ƒS.Inventory.add(MCM.items.Asacoco);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Not sure, merch of some sorts. I'll look on the net sometime.");
        await MCM.ƒS.Character.hide(MCM.characters.Amelia);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "So, uhm, what did you think of doing next?");
        await MCM.ƒS.Character.hide(MCM.characters.Amelia);
        await MCM.ƒS.Character.show(MCM.characters.Amelia, MCM.characters.Amelia.pose.happy, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Amelia, "Oh, I've got an idea.");
        MCM.fadeToBlackMusicOff();
        MCM.playing = MCM.music.moringBGM;
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Anyway, you can guess what happened next.");
        await MCM.ƒS.Location.show(MCM.locations.kitchen);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Ohh, you're serious about her. Wish you luck!");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "How-");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You never say how it was when you're serious with someone.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hmm...");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "But yes, there is something about her. I haven't figured it out yet, though.");
        MCM.fadeToBlackMusicOff();
        return "End_Credits";
    }
    MCM.D1_AfterParty_Ame = D1_AfterParty_Ame;
})(MCM || (MCM = {}));
// KUZEEEEEEE
var MCM;
// KUZEEEEEEE
(function (MCM) {
    async function D1_AfterParty_Azami() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Before I show you my bedroom, I wanna see your gaming skills. Best of three in this fighting game.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Kay, let's go.");
        let game = {
            tryhard: "Tryhard",
            casual: "Casual"
        };
        let gamingElem = await MCM.ƒS.Menu.getInput(game, "choice");
        switch (gamingElem) {
            case game.tryhard:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "But don't think I'm gonna go easy on you, just because I wanna have sex!");
                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "You better give your best!");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "I've never tried this hard in any game. But for some reason I really wanna beat her.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.normal, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(2);
                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Take this!!!");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Nah ah, you take this!!");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Damn, we are getting nowhere. This is gonna take a while.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Oof.");
                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.happy, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(2);
                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "What? Out of stamina?");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Ha! you wish.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Haha! I won!");
                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.angry, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(2);
                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Ara ara, rubbing your win in my face? You must be really desperate for a punishment!");
                break;
            case game.casual:
                await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Well, this is gonna be fun!");
                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Yes it is.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Oh no she's really good at this. Maybe I should've tried harder.");
                await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, ". . .");
                await MCM.ƒS.Character.hide(MCM.characters.Azami);
                await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.cute, MCM.ƒS.positions.bottomcenter);
                await MCM.ƒS.update(2);
                await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Ara Ara. Looks like you lost. are you ready for your punishment?");
                break;
        }
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Hold up, you were gonna punish me either way, weren't you?");
        await MCM.ƒS.Character.hide(MCM.characters.Azami);
        await MCM.ƒS.Character.show(MCM.characters.Azami, MCM.characters.Azami.pose.happy, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Azami, "Aren't you a smart boy. Oide, oide.");
        MCM.fadeToBlackMusicOff();
        MCM.playing = MCM.music.moringBGM;
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "She was into some weird stuff, but it was kinda fun too.");
        await MCM.ƒS.Location.show(MCM.locations.kitchen);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Always nice to try some new stuff isn't it?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "If only it wasn't still sore...");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "It is, what it is.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Guess I'll head to work now. See ya.");
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Yeah, me too. Meet for lunch?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sure!");
        MCM.fadeToBlackMusicOff();
        return "End_Credits";
    }
    MCM.D1_AfterParty_Azami = D1_AfterParty_Azami;
})(MCM || (MCM = {}));
//Nyanpasuuuuu
var MCM;
//Nyanpasuuuuu
(function (MCM) {
    async function D1_AfterParty_Books() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Nice place! And you even got a Nanasuke figurine!");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Of course! He is my favourite Nana.");
        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Mine too!");
        await MCM.ƒS.Character.hide(MCM.characters.Books);
        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.cute, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Hey, so there's this anime movie I wanted to see, but I haven't come around to it yet. It's psychological horror. You interested?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Sure! You got it with you?");
        await MCM.ƒS.Character.hide(MCM.characters.Books);
        await MCM.ƒS.Character.show(MCM.characters.Books, MCM.characters.Books.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Books, "One sec.");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Did she just pull a cyberdeck out of her bag?");
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Damn, I've never seen anyone tip that fast. She must be a great decker!");
        await MCM.ƒS.Speech.tell(MCM.characters.Books, "Got it. Let's start watching.");
        MCM.fadeToBlackMusicOff();
        MCM.playing = MCM.music.moringBGM;
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "The movie was great, but cuddling together made it even better. Then we went to bed and cuddled all night long.");
        await MCM.ƒS.Location.show(MCM.locations.kitchen);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.thinking, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "That's so...");
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.angry, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Boring. Sappy too. What the hell?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "She wasn't comfortable with putting out on the first night.");
        await MCM.ƒS.Character.hide(MCM.characters.Yuri);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Aw man, You sure?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yeah! Of course.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Well... You like her?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Kinda, though I don't know that much about her yet. Other than what anime she likes.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Then, don't fuck this up. I gotta go, see ya!");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Matane!");
        MCM.fadeToBlackMusicOff();
        return "End_Credits";
    }
    MCM.D1_AfterParty_Books = D1_AfterParty_Books;
})(MCM || (MCM = {}));
//RUNNING IN THE 90s
var MCM;
//RUNNING IN THE 90s
(function (MCM) {
    async function D1_AfterParty_Urban() {
        MCM.playing = MCM.music.eveningBGM;
        MCM.ƒS.Sound.play(MCM.playing, 0, true);
        MCM.ƒS.Sound.fade(MCM.playing, MCM.volume, 1, true);
        await MCM.ƒS.Location.show(MCM.locations.JJ_apartement_in);
        await MCM.ƒS.Character.show(MCM.characters.Urban, MCM.characters.Urban.pose.normal, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "Damn, your ride is smooth as fuck. You use it for drifting?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yeah, took some time to get 'er like that, but in the end it was worth it.");
        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "You thought about adding neon?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yes, actually, we got this preem new model at the store. RGB and all that tech.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "It's too expensive for me though. Need to work for at least a month more, but it's gonna be worth it.");
        await MCM.ƒS.Speech.tell(MCM.characters.Urban, "So, uhm, you wanna go to bed? You know, for... some fun.");
        MCM.fadeToBlackMusicOff();
        MCM.playing = MCM.music.moringBGM;
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Surprisingly he was an M.");
        await MCM.ƒS.Location.show(MCM.locations.kitchen);
        await MCM.ƒS.Character.show(MCM.characters.Yuri, MCM.characters.Yuri.pose.smug, MCM.ƒS.positions.bottomcenter);
        await MCM.ƒS.update(2);
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "You never really know before you find out, huh.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "You're right about that!");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "I'm not gonna hold you off any longer though, I still got a shitload of work.");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yeah, I gotta go too.");
        await MCM.ƒS.Speech.tell(MCM.characters.Yuri, "Meet for lunch though?");
        await MCM.ƒS.Speech.tell(MCM.characters.JJ, "Yes. As always.");
        MCM.fadeToBlackMusicOff();
        return "End_Credits";
    }
    MCM.D1_AfterParty_Urban = D1_AfterParty_Urban;
})(MCM || (MCM = {}));
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
var MCM;
(function (MCM) {
    async function Ending_Normal() {
        MCM.menu.className += " hidden";
        MCM.money.className += " hidden";
        if (MCM.saveData.state.yero >= 1000) {
            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Not being able to pay all bills, JJ was kicked out of his appartment.");
            switch (MCM.saveData.d1AfterPartyDate) {
                case "Azami":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "But Azami has taken a liking to him, and so she allowed him to live with her, for as long as he performed certain chores.");
                    break;
                case "Amelia":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Amelia didn't want her favorite mechanic to be homeless, or lose sleep living in a noisy bodyshop. Though that my have only been an excuse for her to have him available quicker.");
                    break;
                case "Books":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Books took pity on him, and decided to let him crash at her place, until JJ finds a new home. A roommate to talk about anime too wasn't that bad either.");
                    break;
                case "Urban":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Since Urban knew what being homeless was like, he offered up his couch to JJ.");
                    break;
                default:
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Yuri's flat was to small for 3 people, so JJ had no choice than to sleep in Justice's shop until he can find a new place.");
                    break;
            }
        }
        else {
            await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "JJ managed to pay all bills and keep his home.");
            switch (MCM.saveData.d1AfterPartyDate) {
                case "Azami":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Azami had his fun with JJ and never called him again. Which he didn't mind, as he never expected anything serious.");
                    break;
                case "Amelia":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Amelia and JJ became a couple and went on lots of dates with Nao and Yuri.");
                    break;
                case "Books":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Quickly he found that he had a lot more in common with Books than JJ thought. She also fell in love with him");
                    break;
                case "Urban":
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Things with Urban didn't work out, but they stayed friends, and he often came to the garage for repairs and tuning.");
                    break;
                default:
                    await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, "Another month went by, and JJ couldn't get over his ex. Being lonely and sad.");
                    break;
            }
        }
        return "End_Credits";
    }
    MCM.Ending_Normal = Ending_Normal;
})(MCM || (MCM = {}));
//# sourceMappingURL=MCM.js.map