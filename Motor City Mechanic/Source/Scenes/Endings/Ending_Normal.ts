namespace MCM {
    export async function Ending_Normal(): ƒS.SceneReturn {
        menu.className += " hidden";
        money.className += " hidden";

        if (saveData.state.yero >= 1000) {
            await ƒS.Speech.tell(characters.Thoughts, "Not being able to pay all bills, JJ was kicked out of his appartment.");
            switch (saveData.d1AfterPartyDate) {
                case "Azami":
                    await ƒS.Speech.tell(characters.Thoughts, "But Azami has taken a liking to him, and so she allowed him to live with her, for as long as he performed certain chores.");
                    break;
                case "Amelia":
                    await ƒS.Speech.tell(characters.Thoughts, "Amelia didn't want her favorite mechanic to be homeless, or lose sleep living in a noisy bodyshop. Though that my have only been an excuse for her to have him available quicker.");
                    break;
                case "Books":
                    await ƒS.Speech.tell(characters.Thoughts, "Books took pity on him, and decided to let him crash at her place, until JJ finds a new home. A roommate to talk about anime too wasn't that bad either.");
                    break;
                case "Urban":
                    await ƒS.Speech.tell(characters.Thoughts, "Since Urban knew what being homeless was like, he offered up his couch to JJ.");
                    break;
                default:
                    await ƒS.Speech.tell(characters.Thoughts, "Yuri's flat was to small for 3 people, so JJ had no choice than to sleep in Justice's shop until he can find a new place.");
                    break;
            }
        } else {
            await ƒS.Speech.tell(characters.Thoughts, "JJ managed to pay all bills and keep his home.");
            switch (saveData.d1AfterPartyDate) {
                case "Azami":
                    await ƒS.Speech.tell(characters.Thoughts, "Azami had his fun with JJ and never called him again. Which he didn't mind, as he never expected anything serious.");
                    break;
                case "Amelia":
                    await ƒS.Speech.tell(characters.Thoughts, "Amelia and JJ became a couple and went on lots of dates with Nao and Yuri.");
                    break;
                case "Books":
                    await ƒS.Speech.tell(characters.Thoughts, "Quickly he found that he had a lot more in common with Books than JJ thought. She also fell in love with him");
                    break;
                case "Urban":
                    await ƒS.Speech.tell(characters.Thoughts, "Things with Urban didn't work out, but they stayed friends, and he often came to the garage for repairs and tuning.");
                    break;
                default:
                    await ƒS.Speech.tell(characters.Thoughts, "Another month went by, and JJ couldn't get over his ex. Being lonely and sad.");
                    break;
            }
        }
        return "End_Credits";
    }
}