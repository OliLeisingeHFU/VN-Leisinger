//Bakai mitai
namespace MCM {
    export async function Ending_Depression(): ƒS.SceneReturn {
        playing = music.synthAdiago;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);

        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.update(2);

        await ƒS.Speech.tell(characters.Thoughts, "3 weeks later.");

        ƒS.Inventory.open();
        openinv = true;
        document.getElementsByClassName("close")[0].className += "hidden";
        
        for(let i: number = 15; i > 0; i--){
            ƒS.Inventory.add(items.Rum);
        }
        ƒS.Inventory.add(items.Stop);
        while(openinv){
            console.log(openinv)
            await ƒS.Speech.tell(characters.JJ, "One... more drink can't hurt");
        }
        await ƒS.Location.show(locations.black);
        await ƒS.update(2);
        ƒS.Character.hideAll();
        if(saveData.drunkness < 500){
            await ƒS.Speech.tell(characters.Thoughts, "JJ calls Yuri while drunk. After talking it out over the course of a few hours, James feels like he has the courage to go back to work.");
        }
        if(saveData.drunkness > 500 && saveData.drunkness < 1000){
            await ƒS.Speech.tell(characters.Thoughts, "Several drinks made JJ pass out, the next morning he decides, never to set a foot into a bodyshop ever again.");
        }
        if(saveData.drunkness > 1000){
            await ƒS.Speech.tell(characters.Thoughts, "After one last drink JJ passes out, never waking up again.");
        }

        ƒS.Sound.fade(playing, 0, 2, true);
        await ƒS.Speech.tell(characters.Thoughts, "The end.");
        return "End_Credits"
        }
    }