//levan polkka
namespace MCM {
    export async function D1_Evening_Party(): ƒS.SceneReturn {
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);

        await ƒS.Location.show(locations.JJ_apartement_in);
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
        }

        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0000);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0001);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0002);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0003);

        let clothing = {
            anime: "Anime T-shirt and jeans",
            mcmjacket: "Official Motor City Mechanic Jacket, a simple T-shirt and jeans",
            otokonoko: "Long, pink hair and a cute dress.",
            suit: "A nice suit."
        }

        let clothingElem = await ƒS.Menu.getInput(clothing, "choice");

        switch (clothingElem) {
            case clothing.anime:
                await ƒS.Speech.tell(characters.Thoughts, "Maybe there's another weeb at the party.");
                await ƒS.Speech.tell(characters.Thoughts, "Someone I could watch anime with would be nice.");
                break;
            case clothing.mcmjacket:
                await ƒS.Speech.tell(characters.Thoughts, "Oh, right, I remember, Yuri said a bunch of racer will be there, and they dig mechs.");
                await ƒS.Speech.tell(characters.Thoughts, "I'll wear something simple with it, as not to distract from the jacket.");
                break;
            case clothing.otokonoko:
                await ƒS.Speech.tell(characters.Thoughts, "I always thought I looked good in a dress. I could try that again.");
                await ƒS.Speech.tell(characters.Thoughts, "Just were did I put my insta-hair?");
                await ƒS.Speech.tell(characters.Thoughts, "Ah, found it.");
                await ƒS.Speech.tell(characters.Thoughts, "The bottle read: 'Instantly grow your hair out with Haarwachstum.'");
                break;
            case clothing.suit:
                await ƒS.Speech.tell(characters.Thoughts, "I could go for my fancy suit.");
                await ƒS.Speech.tell(characters.JJ, "Pff... pf... pahahahAHAHHA... yeah, right.");
                await ƒS.Speech.tell(characters.Thoughts, "I think I'll wear a yukata. It's still summer after all.");
                break;
        }

        await ƒS.Speech.tell(characters.JJ, text.JJ.T0000);
        await ƒS.Location.show(locations.black);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Thoughts, text.Thoughts.T0004);
        ƒS.Sound.fade(playing, 0, 1);
        playing = music.partyBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);
        await ƒS.Location.show(locations.party);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positions.bottomcenter);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0001);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0001);
        switch(clothingElem){
            case clothing.anime:
                ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "Ah, you fucking weeb...");
                await ƒS.Speech.tell(characters.Yuri, "Did I not tell you to wear your MCM jacket?");
                await ƒS.Speech.tell(characters.Thoughts, "Yeah, but I thought I'd rather wear this and meet someone who likes anime.");
                await ƒS.Speech.tell(characters.Yuri, "Fucking <b>weeb</b>...");
                await ƒS.Speech.tell(characters.Thoughts, "You said that already.");
                await ƒS.Speech.tell(characters.Yuri, "Yes, because I had to.");
                break;
            case clothing.mcmjacket:
                await ƒS.Speech.tell(characters.Yuri, "Damn, you look hot in this. Nice choice!");
                await ƒS.Speech.tell(characters.Thoughts, "You chose this outfit.");
                ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.wink, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "'Xactly. But You listened.");
                ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "I can promise you, you'll get some tonight. As long as you try a bit.");
                break;
            case clothing.otokonoko:
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "You're a bold one!");
                await ƒS.Speech.tell(characters.Thoughts, "Yes, maybe a little.");
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "I never thought about the otokonoko look, but now that I see it, I might think it's even better than the MCM stuff I told you to wear.");
                await ƒS.Speech.tell(characters.Thoughts, "Haha, yeah thanks, I always thought I looked good in it, but long hair was annoying during work. I don't know how auntie deals with it.");
                break;
            case clothing.suit:
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "A yukata? Did you want to flaunt your heritage or something? Though honestly, you are kinda rocking it!");
                await ƒS.Speech.tell(characters.JJ, "It's just so nice to wear this during summer's evenings. Very comfortable. You should try it, too!");
                await ƒS.Speech.tell(characters.Yuri, "You know what? maybe I will! Not today though. But next time.");
                break;
        }

        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0002);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0002);
        let car = {
            spoiler: "Get the spoiler",
            neon: "Get the neon lights",
            both: "get both",
        }
        switch(saveData.d1YuriUpgrade){
            case car.spoiler:
                await ƒS.Speech.tell(characters.Yuri, "You know, Nao didn't even ntoce the spoiler. Bummer.");
                await ƒS.Speech.tell(characters.Yuri, "But a bunch of other people complimented me on it so it was worth it after all. T-Y, tomodachi.");
                await ƒS.Speech.tell(characters.JJ, "You're welcome.");
                break;
            case car.neon:
                await ƒS.Speech.tell(characters.Yuri, "The neon was a sweet idea, JJ, Nao really liked the color I chose.");
                await ƒS.Speech.tell(characters.JJ, "Oh really, what color was it set to?");
                await ƒS.Speech.tell(characters.Yuri, "Well, purple.");
                await ƒS.Speech.tell(characters.JJ, "So the color I told Ronald to set as default?");
                await ƒS.Speech.tell(characters.Yuri, "Because you know I really like that color, 'xactly. So I basicly chose it.");
                break;
            case car.both:
                await ƒS.Speech.tell(characters.Yuri, "By the way, your recommendation this afternoon helped a bit. Nao-chan really seems to like my car.");
                await ƒS.Speech.tell(characters.Yuri, "BUT, it also attracted some unfriendlies. You owe me some booze, to pay for the troubles.");
                await ƒS.Speech.tell(characters.JJ, "Aw, come on, I know you liked the attention, aho...");
                await ƒS.Speech.tell(characters.Yuri, "That doesn't change anything. On Saturday we'll go out for beers with our I/Os. You better meet someone till then.");
                await ƒS.Speech.tell(characters.JJ, "Hai, I get it.");
                break;
        }

        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0003);
        ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Character.show(characters.Justice, characters.Nao.pose.surprised, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0003);
        ƒS.Character.hideAll();
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Character.show(characters.Justice, characters.Nao.pose.normal, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0001);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0002);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0004);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0005);
        ƒS.Character.hideAll();
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0006);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0007);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0008);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0009);
    }
}