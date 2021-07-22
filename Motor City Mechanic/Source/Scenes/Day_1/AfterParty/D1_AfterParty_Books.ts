//Nyanpasuuuuu
namespace MCM {
    export async function D1_AfterParty_Books(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);
        
        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Books, "Nice place! And you even got a Nanasuke figurine!");
        await ƒS.Speech.tell(characters.JJ, "Of course! He is my favourite Nana.");
        await ƒS.Speech.tell(characters.Books, "Mine too!");
        await ƒS.Character.hide(characters.Books);
        await ƒS.Character.show(characters.Books, characters.Books.pose.cute, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Books, "Hey, so there's this anime movie I wanted to see, but I haven't come around to it yet. It's psychological horror. You interested?");
        await ƒS.Speech.tell(characters.JJ, "Sure! You got it with you?");
        await ƒS.Character.hide(characters.Books);
        await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Books, "One sec.");
        await ƒS.Speech.tell(characters.Thoughts, "Did she just pull a cyberdeck out of her bag?");
        await ƒS.Speech.tell(characters.Thoughts, "Damn, I've never seen anyone tip that fast. She must be a great decker!");
        await ƒS.Speech.tell(characters.Books, "Got it. Let's start watching.");

        fadeToBlackMusicOff();
        playing = music.moringBGM;
        await ƒS.Speech.tell(characters.JJ, "The movie was great, but cuddling together made it even better. Then we went to bed and cuddled all night long.");
        await ƒS.Location.show(locations.kitchen);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.thinking, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "That's so...");
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.angry, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "Boring. Sappy too. What the hell?");
        await ƒS.Speech.tell(characters.JJ, "She wasn't comfortable with putting out on the first night.");
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, "Aw man, You sure?");
        await ƒS.Speech.tell(characters.JJ, "Yeah! Of course.");
        await ƒS.Speech.tell(characters.Yuri, "Well... You like her?");
        await ƒS.Speech.tell(characters.JJ, "Kinda, though I don't know that much about her yet. Other than what anime she likes.");
        await ƒS.Speech.tell(characters.Yuri, "Then, don't fuck this up. I gotta go, see ya!");
        await ƒS.Speech.tell(characters.JJ, "Matane!");
        fadeToBlackMusicOff();
        return "Ending_Normal";
    }
}