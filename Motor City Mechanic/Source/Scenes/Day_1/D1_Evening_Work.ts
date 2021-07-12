namespace MCM {
    export async function D1_Evening_Work(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);

        await ƒS.Location.show(locations.workshop);
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
        }
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.smile, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0000);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0001);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0001);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0002);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0003);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0004);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0002);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0005);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0003);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0006);

        if(saveData.d1Ame == "fewer" || saveData.d1Ame == "fewest"){
            await ƒS.Speech.tell(characters.JJ, "Ok, I should have more than enough time to call in Amelia, before this night elf arrives.");
            await ƒS.Speech.tell(characters.Speakers, "beep. . . beep. . . beep. . . ");
            await ƒS.Speech.tell(characters.Amelia, "Who dis?");
            await ƒS.Speech.tell(characters.JJ, "Hey Amelia, it's me, James, I just noticed something on your scan I missed earlier. Big gomenasorry! Could you come over real quick, before your race starts?");
            await ƒS.Speech.tell(characters.Amelia, "Sure, no prob, I'll head right out. Thanks for not letting me hang on this one.");
            await ƒS.Speech.tell(characters.JJ, "Mondainai. I'd feel really bad if you lost the race because of me.");
            await ƒS.Location.show(locations.black);
            await ƒS.update(2);
            await ƒS.Speech.tell(characters.JJ, "All fixed now, let's get back to Amelia.");
            await ƒS.Location.show(locations.workshop);
            await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.smile, ƒS.positions.bottomcenter);
            await ƒS.update(2);
            await ƒS.Speech.tell(characters.Amelia, "Thanks, how much do I owe you?");
            await ƒS.Speech.tell(characters.JJ, "I'm just charging you for the parts, not the work time. My mistake after all.");
            await ƒS.Speech.tell(characters.Amelia, "Still gonna give you a hunney for your honesty. I'll definitely come back here, so don't you dare mess up again.");
            await ƒS.Speech.tell(characters.JJ, "I won't, good luck at the race, I gotta get to my next customer.");
            await ƒS.Speech.tell(characters.Amelia, "I don't need luck, but thanks! See ya soon, punk!");
            saveData.state.yero += 100;
            higherFriendship(saveData.friendship.Ame, 35);
            ƒS.Character.hide(characters.Amelia);
        }

        await ƒS.Character.show(characters.Dio, characters.Dio.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(0.3);

        await ƒS.Speech.tell(characters.Dio, text.Dio.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
        await ƒS.Speech.tell(characters.Dio, text.Dio.T0001);

        ƒS.Character.hideAll();
        await ƒS.Location.show(locations.carscanner);
        ƒS.Speech.hide();
        await ƒS.Character.show(characters.MinigameOverlays, characters.MinigameOverlays.pose.DioD1, ƒS.positions.bottomcenter);
        await ƒS.update(1);
        saveData.waiting = true;
        let miniGameAnswersD1Dio = {
            replaceall: "Replace tires, remove foreign objects from motor, replace batteries. (1100¥€)",
            replacemot: "Repair tires and remove bullet. replace motor. (1800¥€)",
            correct: "Repair tires and remove bullet. remove foreign objects from motor. repair Batteries. (1500¥€)"
        }

        let minigameElem;

        while (saveData.waiting) {
            minigameElem = await ƒS.Menu.getInput(miniGameAnswersD1Dio, "choice");

            await ƒS.Speech.tell(characters.Thoughts, ("You want to work on the following:" + minigameElem + " is that alright? (Quicktip: You earn half of the price of the procedure)"));

            let confirmChoice = {
                confirm: "CONFIRM",
                cancel: "CANCEL"
            }

            let confirmChoiceElem = await ƒS.Menu.getInput(confirmChoice, "choice");

            switch (confirmChoiceElem) {
                case confirmChoice.cancel:
                    saveData.waiting = true;
                    break;
                case confirmChoice.confirm:
                    saveData.waiting = false;
                    break;
            }
        }

        ƒS.Character.hideAll();
        await ƒS.Location.show(locations.workshop);

        switch(minigameElem){
            case miniGameAnswersD1Dio.replaceall:
            case miniGameAnswersD1Dio.replacemot:
                await ƒS.Character.show(characters.Dio, characters.Dio.pose.angry, ƒS.positions.bottomcenter);
                await ƒS.update(1);
                await ƒS.Speech.tell(characters.Dio, "Wie <b>dumm</b> kann ein Mensch eigentlich sein!? I specifi-fucking-ly a-ha-sked your boss <b>not</b> to replace anything and you just don't care, huh?");
                await ƒS.Speech.tell(characters.JJ, "I'm so sorry, sir, I can fix it right away. I don't know, what came over me.");
                await ƒS.Speech.tell(characters.Dio, "You better. Don't expect me not to call your boss or pay for all this shit though!");
                saveData.state.yero += 500;
                saveData.d1Dio = "failed";
                break;
            case miniGameAnswersD1Dio.correct:
                await ƒS.Character.show(characters.Dio, characters.Dio.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(1);
                await ƒS.Speech.tell(characters.Dio, "Thank you very much for this. I know it must've been a lot of work, but this car is really important to me, exactly the way it is.");
                await ƒS.Speech.tell(characters.JJ, "Hey, mondainai, listening to our customers is very important at this workshop.");
                await ƒS.Speech.tell(characters.Dio, "Well, either way, you deserve a tip.");
                saveData.state.yero += 1000;
                saveData.d1Dio = "success";
        }

        ƒS.Character.hideAll();
        await ƒS.Speech.tell(characters.Dio, "Guess that was it for today. Time to close up shop.");

        await ƒS.Location.show(locations.black);
        ƒS.Character.hideAll();
        await ƒS.update(2);
        ƒS.Sound.fade(playing, 0, 2, true);
        return "End_Credits";
        //return "D2_Morning";
    }
}