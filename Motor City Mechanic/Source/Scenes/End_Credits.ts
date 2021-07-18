namespace MCM {
    export async function End_Credits(): ƒS.SceneReturn {
        menu.className += " hidden";
        money.className += " hidden";
        ƒS.Speech.hide();

        ƒS.Text.addClass("credits");
        ƒS.Text.print("Thank you very much for playing!");
    }
}