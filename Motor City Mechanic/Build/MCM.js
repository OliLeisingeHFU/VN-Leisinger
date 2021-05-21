"use strict";
var MCM;
(function (MCM) {
    MCM.ƒ = FudgeCore;
    MCM.ƒS = FudgeStory;
    MCM.locations = {
        nightstreet: {
            name: "nightstreet",
            background: "Images/Backgrounds/Street-at-Night.jpg"
        }
    };
    MCM.characters = {
        Thoughts: {
            name: "Thoughts"
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
            { scene: MCM.Drinking, name: "Scene" }
        ];
        // start the sequence
        MCM.ƒS.Progress.go(scenes);
    }
})(MCM || (MCM = {}));
var MCM;
(function (MCM) {
    async function Drinking() {
        await MCM.ƒS.Location.show(MCM.locations.nightstreet);
        MCM.ƒS.update(1);
        let text = {
            Thoughts: {
                T0000: "Guh, I could really use a drink, good thing I've always got some handy in my backpack."
            }
        };
        await MCM.ƒS.Speech.tell(MCM.characters.Thoughts, text.Thoughts.T0000);
        MCM.ƒS.Inventory.add(MCM.items.Rum);
        MCM.ƒS.Inventory.add(MCM.items.Rum);
        MCM.ƒS.Inventory.add(MCM.items.Rum);
        await MCM.ƒS.Inventory.open();
    }
    MCM.Drinking = Drinking;
})(MCM || (MCM = {}));
//# sourceMappingURL=MCM.js.map