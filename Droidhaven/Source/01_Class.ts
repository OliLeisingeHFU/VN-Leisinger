namespace Droidhaven {
  export async function Text(): ƒS.SceneReturn {
    console.log("Class Choosing Process");

    let text = {
      Thoughts: {
        T0000: "Finally, I've arrived. Droidhaven, the university of my dreams.",
        T0001: "Just gotta get to the reception. What was it again? Through the main entrance then to the right.",
        T0002: "Dorothy seems nice enough. I hope my fellow students are the same!",
        T0003: "A few messages are popping up on my commlink.",
        T0004: "Oh, and a route opened up on the map."
      },

      Protagonist: {
        T0000: "Oh, uhh, hello there!",
        T0001: "Pleased to meet you. I'm Fumio.",
        T0002: "This is the way?",
        T0003: "Thank you very much, miss Dorothy!"
      },

      Dorothy: {
        T0000: "Hi Honey!",
        T0001: "The Name's Dorothy. I am the receptionist of this wonderful university",
        T0002: "I'm here to show you the way. To your class, that is. Tell me, in what Major did you choose to enroll?",
        T0003: "Let me just upload the campus map, your timetable and important connections to your commlink.",  
        T0004: "This is the way.",
        T0005: "You're welcome. have a nice first day in Droidhaven, honey."
      }
    }

    let firstDialogueAnswers = {
      pSayMage: "I'm part of the Mage course!",
      pSayEngi: "Well, I am an Engineer.",
      pSayGuns: "I'm here for the Gunslinger Classes",
      pSayHeal: "I'm here to become a Healer.",
      pSayBlade: "I want to become a master of the blade."
    }

    await ƒS.Location.show(locations.school_outside);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
    await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0001);
    await ƒS.Character.show(characters.Dorothy, characters.Dorothy.pose.smile, ƒS.positions.bottomcenter);
    await ƒS.update(1);
    await ƒS.Speech.tell(characters.Dorothy, text.Dorothy.T0000);
    await ƒS.Speech.tell(characters.Protagonist, text.Protagonist.T0000);
    await ƒS.Speech.tell(characters.Dorothy, text.Dorothy.T0001);
    await ƒS.Speech.tell(characters.Protagonist, text.Protagonist.T0001);
    await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0002);
    await ƒS.Speech.tell(characters.Dorothy, text.Dorothy.T0002);

    // Choice:
    let firstDialogueElement = await ƒS.Menu.getInput(firstDialogueAnswers, "class");

    switch (firstDialogueElement){
      case firstDialogueAnswers.pSayMage:
        await ƒS.Speech.tell(characters.Dorothy, "An aspiring magician. I see! For that you'll want to go to room M1A1.");
        break;
      case firstDialogueAnswers.pSayEngi:
        await ƒS.Speech.tell(characters.Dorothy, "Engineer, you say? Those are probably my favorite students. They can be found in 2187. That's in a different building.");
        break;
      case firstDialogueAnswers.pSayGuns:
        await ƒS.Speech.tell(characters.Dorothy, "Oh, a gunslinger? And they still sent you to me? Have fun getting there. The shooting range is on the other side of campus, that's quite the walk. On the map that would be building CT-99.");
        break;
      case firstDialogueAnswers.pSayHeal:
        await ƒS.Speech.tell(characters.Dorothy, "Ah, a very noble goal. I'm sure the students there are all very nice. That would be in room H3A1.");
        break;
      case firstDialogueAnswers.pSayBlade:
        await ƒS.Speech.tell(characters.Dorothy, "Very Cool! Gonna go for the noble white knight or an edgelord lone wanderer type of swordsman? haha, just kidding. Anyway, you'd have to go to room X0W0.");
        break;
    }

    await ƒS.Speech.tell(characters.Dorothy, text.Dorothy.T0003);
    await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0003);
    await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0004);
    await ƒS.Speech.tell(characters.Protagonist, text.Protagonist.T0002);
    await ƒS.Speech.tell(characters.Dorothy, text.Dorothy.T0004);
    await ƒS.Speech.tell(characters.Protagonist, text.Protagonist.T0003);
    await ƒS.Speech.tell(characters.Dorothy, text.Dorothy.T0005);

    switch (firstDialogueElement){
      case firstDialogueAnswers.pSayMage:
        
        break;
      case firstDialogueAnswers.pSayEngi:
        
        break;
      case firstDialogueAnswers.pSayGuns:
        
        break;
      case firstDialogueAnswers.pSayHeal:
        
        break;
      case firstDialogueAnswers.pSayBlade:
        
        break;
    }
  }
}