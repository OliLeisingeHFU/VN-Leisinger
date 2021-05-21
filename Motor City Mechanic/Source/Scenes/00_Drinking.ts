namespace MCM {
    export async function Drinking(): ƒS.SceneReturn {
        await ƒS.Location.show(locations.nightstreet);
        ƒS.update(1);

        let text = {
            Thoughts: {
                T0000: "Guh, I could really use a drink, good thing I've always got some handy in my backpack."
            }
        }

        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);

        ƒS.Inventory.add(items.Rum);
        ƒS.Inventory.add(items.Rum);
        ƒS.Inventory.add(items.Rum);
        await ƒS.Inventory.open();
    }
  }