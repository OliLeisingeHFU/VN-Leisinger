namespace MCM {
    export async function D1_Morning(): ƒS.SceneReturn {
        await ƒS.Location.show(locations.JJ_apartement_in);
        ƒS.update(1);

        let text = {
            Thoughts: {
                T0000: "Guh, I'm so nervous I could puke.",
                T0001: "Ok, JJ, it's your first day, no need for worry, you haven't done anything wrong.",
                T0002: "YET.",
                T0003: "I'm sure Justice won't fire me on the first mistake.",
                T0004: "Just breath in...",
                T0005: ". . .",
                T0006: "And out."
            },
            JJ: {
                T0000: "Good Evening, Justice.",
                T0001: "I know, I know, I'm on it, ok?",
                T0002: "Not at work, please, it's embarassing."
            },
            Justice: {
                T0000: "Konbanwa, James.",
                T0001: "Don't you think it's time to finally learn Japanese?",
                T0002: "Also, just because I'm your boss, doesn't mean you have to stop calling me auntie"
            }
        }

        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
        await ƒS.Location.show(locations.JJ_apartement_out);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0001);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0002);
        await ƒS.Location.show(locations.MC_street_day);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0003);
        await ƒS.Location.show(locations.workshop);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0004);
        await ƒS.Location.show(locations.black);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0005);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0006);
        await ƒS.Location.show(locations.workshop);
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.smile, ƒS.positions.bottomcenter);
        ƒS.update(1);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0000);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0001);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0001);
        await ƒS.Speech.tell(characters.Justice, text.Justice.T0002);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0002);
    }
  }