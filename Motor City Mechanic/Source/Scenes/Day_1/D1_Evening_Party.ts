//levan polkka
namespace MCM {
    export async function D1_Evening_Party(): ƒS.SceneReturn {
        // for debugging:
        saveData.d1YuriUpgrade = "both";
        saveData.d1Ame = "fewest";
        //start:
        playing = music.eveningBGM;
        ƒS.Sound.play(playing, 0, true);
        ƒS.Sound.fade(playing, volume, 1, true);
        await ƒS.Location.show(locations.JJ_apartement_in);
        await ƒS.update(2);

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
            yukata: "A nice suit."
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
            case clothing.yukata:
                await ƒS.Speech.tell(characters.Thoughts, "I could go for my fancy suit.");
                await ƒS.Speech.tell(characters.JJ, "Pff... pf... pahahahAHAHHA... yeah, right.");
                await ƒS.Speech.tell(characters.Thoughts, "I think I'll wear a yukata. It's still summer after all.");
                break;
        }

        await ƒS.Speech.tell(characters.JJ, text.JJ.T0000);
        ƒS.Sound.fade(playing, 0, 1);
        fadeToBlack();
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
        switch (clothingElem) {
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
                await ƒS.Speech.tell(characters.JJ, "You chose this outfit.");
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
            case clothing.yukata:
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.Speech.tell(characters.Yuri, "A yukata? Did you want to flaunt your heritage or something? Though honestly, you are kinda rocking it! No matter how out of place it is.");
                await ƒS.Speech.tell(characters.JJ, "It's just so nice to wear this during summer's evenings. Very comfortable. You should try it, too!");
                await ƒS.Speech.tell(characters.Yuri, "You know what? maybe I will! Not today though. But next time.");
                break;
        }

        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0002);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0002);
        switch (saveData.d1YuriUpgrade) {
            case "spoiler":
                await ƒS.Speech.tell(characters.Yuri, "You know, Nao didn't even ntoce the spoiler. Bummer.");
                await ƒS.Speech.tell(characters.Yuri, "But a bunch of other people complimented me on it so it was worth it after all. T-Y, tomodachi.");
                await ƒS.Speech.tell(characters.JJ, "You're welcome.");
                break;
            case "neon":
                await ƒS.Speech.tell(characters.Yuri, "The neon was a sweet idea, JJ, Nao really liked the color I chose.");
                await ƒS.Speech.tell(characters.JJ, "Oh really, what color was it set to?");
                await ƒS.Speech.tell(characters.Yuri, "Well, purple.");
                await ƒS.Speech.tell(characters.JJ, "So the color I told Ronald to set as default?");
                await ƒS.Speech.tell(characters.Yuri, "Because you know I really like that color, 'xactly. So I basicly chose it.");
                break;
            case "both":
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
        await ƒS.Character.show(characters.Nao, characters.Nao.pose.surprised, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0003);
        ƒS.Character.hideAll();
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Character.show(characters.Nao, characters.Nao.pose.normal, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0001);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0004);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0002);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0005);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0004);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0005);
        await ƒS.Speech.tell(characters.Nao, text.Nao.T0003);
        await ƒS.Speech.tell(characters.Yuri, "Oh, I just remembered, I got this weird rabbit yesterday, they gave pets away after some weird experiment.");
        await ƒS.Speech.tell(characters.Nao, "They tried to invent a way to understand pets, I think. But something about it was weird, so they stopped.");
        await ƒS.Speech.tell(characters.Yuri, "Something? A lot of things went wrong. It's just talking japanese in a really high voice and has a strange laugh.");
        await ƒS.Speech.tell(characters.JJ, "Strange? In what way?");
        await ƒS.Speech.tell(characters.Yuri, "Like this:");
        await ƒS.Speech.tell(characters.Yuri, "Ha &#8599; Ha &#8600; Ha &#8599;");
        await ƒS.Speech.tell(characters.JJ, "What the hell?");
        await ƒS.Speech.tell(characters.Yuri, "I know, right? Anyway, Nao and I couldn't decide on a good name.");
        saveData.yuriRabbit = await ƒS.Speech.getInput();
        await ƒS.Speech.tell(characters.JJ, "What about " + saveData.yuriRabbit + "?");
        await ƒS.Speech.tell(characters.Nao, "I kinda like it.");
        await ƒS.Speech.tell(characters.Yuri, saveData.yuriRabbit + " it is I guess. Anyway, let me show you the people I was talking about.");
        ƒS.Character.hideAll();
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0006);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0007);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0008);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0009);

        let guests = {
            azami: "Talk to Azami.",
            urban: "Talk to Urban.",
            books: "Talk to Books.",
            ame: "Amelia is not here yet."
        }
        let choice;

        for (let i: number = 0; i < 3; i++) {
            ƒS.Character.hideAll();
            await ƒS.update(1);
            if (i == 2 && saveData.d1Ame != "fewest") {
                await ƒS.Speech.tell(characters.JJ, "Looks like Amelia has arrived");
                guests.ame = "Talk to Amelia";
            } else if (i == 2) {
                await ƒS.Speech.tell(characters.JJ, "Looks like Amelia won't come after all.");
                i++;
            }

            await ƒS.Speech.tell(characters.JJ, "Now, who should I talk to?");
            let guestelem = await ƒS.Menu.getInput(guests, "choice");

            switch (guestelem) {
                case guests.azami:
                    if (guests.azami == "I already talked to Azami") {
                        if (saveData.friendship.Azami.happiness > 50) {
                            await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.JJ, "Hey, I would like to come with you now... if that's alright with you.");
                            await ƒS.Speech.tell(characters.Azami, "Sure, Let's go cutie.");
                            saveData.d1AfterPartyDate = "Azami";
                            return "D1_AfterParty_Azami";
                        }
                        await ƒS.Speech.tell(characters.JJ, "What am I doing, I already talked to her.");
                        i--;
                        break;
                    } else {
                        await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.JJ, "H-Hi, I'm JJ. Great party, isn't it?");
                        await ƒS.Speech.tell(characters.Azami, "Hello JJ, I'm Azami. Great party indeed.");
                        switch (clothingElem) {
                            case clothing.anime:
                                await ƒS.Speech.tell(characters.Azami, "Never much cared for anime, but oh well.");
                                await ƒS.Speech.tell(characters.JJ, "Haha, no problem, I like other things too.");
                                break;
                            case clothing.mcmjacket:
                                await ƒS.Speech.tell(characters.Azami, "Soooooo, you thought you could get some, with this MCM jacket?");
                                await ƒS.Speech.tell(characters.JJ, "Actually, Yuri said I look kakkoii in it.");
                                await ƒS.Speech.tell(characters.Azami, "Can't argue with that, but it's still suspicious.");
                                lowerFriendship(saveData.friendship.Azami, 5);
                                break;
                            case clothing.otokonoko:
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.cute, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Azami, "I must say, you look very cute. <sub>There's a lot of fun I can have with you.</sub>");
                                await ƒS.Speech.tell(characters.JJ, "Sorry, I didn't get that last part?");
                                await ƒS.Speech.tell(characters.Azami, "Oh, nothing important, I was just thinking out loud.");
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Azami, 15);
                                break;
                            case clothing.yukata:
                                await ƒS.Speech.tell(characters.Azami, "A yukata? Interesting choice for a party.");
                                await ƒS.Speech.tell(characters.JJ, "I just think they are neat.");
                                await ƒS.Speech.tell(characters.JJ, "They are comfortable!");
                                await ƒS.Speech.tell(characters.Azami, "And looks pretty good too, I guess.");
                                higherFriendship(saveData.friendship.Azami, 10);
                                break;
                        }
                        await ƒS.Speech.tell(characters.Azami, "Yuri told me a bit about you. You love video games, huh?");
                        await ƒS.Speech.tell(characters.JJ, "Yes, he told me that's something we have in common.");
                        await ƒS.Speech.tell(characters.Azami, "Oh yes, there's some other... activities I'm more interested in, but gaming is fun.");
                        await ƒS.Speech.tell(characters.Azami, "Tell me, what games do you like?");
                        await ƒS.Speech.tell(characters.Thoughts, "I wonder what genres we have in common?");
                        let games = {
                            rpg: "Storydriven RPGs",
                            vn: "Visual Novels",
                            fps: "FPS",
                            hack: "Hack'n'Slay"
                        }
                        choice = await ƒS.Menu.getInput(games, "choice");
                        switch (choice) {
                            case games.rpg:
                                await ƒS.Speech.tell(characters.JJ, "I like a good storydriven RPG, like 'Shadewalk: Hong Kong' or 'Cavaliers of the Ancient Democracy");
                                await ƒS.Speech.tell(characters.Azami, "I can definitely see why, but they are just not quite my cup of synthtea.");
                                higherFriendship(saveData.friendship.Azami, 5);
                                break;
                            case games.vn:
                                await ƒS.Speech.tell(characters.JJ, "I am a Visual Novel enjoyer. My favorites are 'T4RT-4RU5' and 'FELSEN;ENTRANCE'.");
                                if (clothingElem == clothing.anime) {
                                    await ƒS.Speech.tell(characters.Azami, "You're a weeb, I really should've seen that coming.");
                                    await ƒS.Speech.tell(characters.Azami, "In my opinion, VNs are not real games.");
                                    await ƒS.Speech.tell(characters.JJ, "Hmm, I wouldn't say that. Some have quite a lot more than just the story aspect.");
                                    await ƒS.Speech.tell(characters.JJ, "But I must admit, being an anime fan probably played a role in this decision.");
                                    lowerFriendship(saveData.friendship.Azami, 12);
                                } else {
                                    await ƒS.Character.hide(characters.Azami);
                                    await ƒS.Character.show(characters.Azami, characters.Azami.pose.angry, ƒS.positions.bottomcenter);
                                    await ƒS.update(0.1);
                                    await ƒS.Speech.tell(characters.Azami, "Guh, okay...");
                                    await ƒS.Speech.tell(characters.Azami, "In my opinion, VNs are not real games.");
                                    await ƒS.Speech.tell(characters.JJ, "You have no idea what you are talking about! Visual Novels are great! 'T4RT-4RU5' is an amazing slice-of-life!");
                                    await ƒS.Speech.tell(characters.Azami, "Oof, sorry...");
                                    await ƒS.Character.hide(characters.Azami);
                                    await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                                    await ƒS.update(0.1);
                                    lowerFriendship(saveData.friendship.Azami, 20);
                                }
                                break;
                            case games.fps:
                            case games.hack:
                                if (choice == games.fps) {
                                    await ƒS.Speech.tell(characters.JJ, "I really like FPS games, like 'Halation' and 'Peak Sagas'.");
                                    await ƒS.Speech.tell(characters.Azami, "'Halation 3: SDST' had such an amazing soundtrack! The smooth jazz and the rain sounds really perfected the atmosphere at night.");
                                    await ƒS.Speech.tell(characters.JJ, "Exactly my thoughts! No game I've ever played could capture this feeling of loneliness as well as 'SDST'. It really enhanced the play experience.");
                                    higherFriendship(saveData.friendship.Azami, 3);
                                } else {
                                    await ƒS.Speech.tell(characters.JJ, "I love Hack'n'Slay games. 'Devil', for example, or 'Diavolo May Cry'.");
                                }
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.cute, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Azami, "Hmm, fast-paced action, your fingers must be very dextrous.");
                                await ƒS.Speech.tell(characters.JJ, "I-I guess, yeah.");
                                await ƒS.Speech.tell(characters.Azami, "Well, I kinda like them too, though they aren't my favorite.");
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Azami, 12);
                                break;
                        }
                        await ƒS.Speech.tell(characters.JJ, "Well, what about you though? What are your favourite games?");
                        await ƒS.Speech.tell(characters.Azami, "I think..., hm, yes, definitely strategy and simulation games. Building a zoo or city or something and then managing it.");
                        await ƒS.Speech.tell(characters.Azami, "Seeing the numbers go up is kinda fun, I don't know.");
                        await ƒS.Speech.tell(characters.JJ, "Huh. Not quite what I expected. Maybe because I've never played one.");
                        await ƒS.Character.hide(characters.Azami);
                        await ƒS.Character.show(characters.Azami, characters.Azami.pose.surprised, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Azami, "Never?! Seriously? I can't believe that!");
                        await ƒS.Speech.tell(characters.JJ, "Yeah, it just never quite caught my attention, I suppose.");
                        await ƒS.Character.hide(characters.Azami);
                        await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        lowerFriendship(saveData.friendship.Azami, 3);
                        console.log(saveData.friendship.Azami.happiness);
                        if (saveData.friendship.Azami.happiness > 25) {
                            await ƒS.Speech.tell(characters.Azami, "Hmm, maybe we can play one together sometime, you might end up liking them!");
                            await ƒS.Speech.tell(characters.JJ, "Yeah, maybe.");
                        } else if (saveData.friendship.Azami.happiness < -12) {
                            await ƒS.Speech.tell(characters.Azami, "You know what? I gotta go. Talk to you some other time.");
                            await ƒS.Speech.tell(characters.JJ, "Yeah, goodbye.");
                            await ƒS.Speech.tell(characters.Thoughts, "She definitely won't talk to me again.");
                            saveData.friendship.Azami.state = "disliked";
                            break;
                        }
                        await ƒS.Speech.tell(characters.Azami, "Well, what other interests do you have?");
                        let interests = {
                            anime: "Talk about Anime",
                            car: "Talk about work",
                            music: "Talk about music",
                            horni: "Talk about bedroom preferences", // remember, you chose this path. I didn't make you do it.
                            shy: "Be reserved"
                        }
                        choice = await ƒS.Menu.getInput(interests, "choice");

                        switch (choice) {
                            case interests.anime:
                                await ƒS.Speech.tell(characters.JJ, "I love anime. Could watch it for hours.");
                                await ƒS.Speech.tell(characters.Azami, "Hmm, maybe I should watch some too, but I'm not sure I like that stuff.");
                                await ƒS.Speech.tell(characters.JJ, "Well, in the end anime is not a genre, just a type of visuals. Though I guess it's story-telling differs from UNAS or European productions.");
                                await ƒS.Speech.tell(characters.JJ, "I could recommend something based on what genres you like.");
                                await ƒS.Speech.tell(characters.Azami, "Well, there is all kinds of stuff I like. Maybe some drama, action and sci-fi?");
                                await ƒS.Speech.tell(characters.JJ, "Oh yes, I got something for that. I'll send you the address. To be fair, the story may get confusing at times, but it's a worthy watch.");
                                await ƒS.Speech.tell(characters.Azami, "Hmm, let's see... Action, Sci-fi, Psychological, Drama, Mecha. Does sound interesting. There are some different versions though, which should I watch?");
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.JJ, "Well, I would recommend watching the original show, except for the last 2 episodes and then watch this movie right here.");
                                await ƒS.Speech.tell(characters.JJ, "Or you could just watch the remake movies. The story starts out the same, but diverges a lot as the movies go on. I like both versions though.");
                                await ƒS.Speech.tell(characters.Azami, "Cool, I guess I'll start with the remakes then. Kinda cute how you love talking about anime like that.");
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Azami, 10);
                                break;
                            case interests.car:
                                await ƒS.Speech.tell(characters.JJ, "I spend a ton of time around cars, both at work and home. Fixing and tuning them is a ton of fun for me");
                                await ƒS.Speech.tell(characters.Azami, "Meh, I don't care that much about cars.");
                                lowerFriendship(saveData.friendship.Azami, 5);
                                break;
                            case interests.music:
                                await ƒS.Speech.tell(characters.JJ, "Sometimes I like to just lay down, listen to music for a few hours. Do nothing.");
                                await ƒS.Speech.tell(characters.Azami, "What genre of music?");
                                await ƒS.Speech.tell(characters.JJ, "Depends on the mood, mostly J-Pop and Rock though.");
                                await ƒS.Speech.tell(characters.Azami, "Rock? Now we're talking! I love listening to that too!");
                                higherFriendship(saveData.friendship.Azami, 5);
                                break;
                            case interests.horni:
                                await ƒS.Speech.tell(characters.JJ, "I kinda have a thing for... You know what? nevermind that.");
                                await ƒS.Speech.tell(characters.Azami, "Oi, don't leave me having now!");
                                await ƒS.Speech.tell(characters.JJ, "<i>sigh</i> Alright. Well, I like getting dommed. There, I already regret it.");
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.cute, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Azami, "Oh, my, my, my. Someone who isn't afraid of talking about that kinda stuff during the first time meeting, <b>and</b> that is my type?");
                                await ƒS.Speech.tell(characters.Azami, "You better mean it, I could show you my toys at home.");
                                await ƒS.Speech.tell(characters.Azami, "You started this, no need to get red. Though you do look very adorable right now.");
                                await ƒS.Character.hide(characters.Azami);
                                await ƒS.Character.show(characters.Azami, characters.Azami.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Azami, 45);
                                saveData.friendship.Azami.state = "liked";
                                break;
                            case interests.shy:
                                await ƒS.Speech.tell(characters.JJ, "Uh, I dunno, not m-much to be honest.");
                                await ƒS.Speech.tell(characters.Azami, "Don't wanna tell? I guess that's fair.");
                                break;
                        }

                        if (saveData.friendship.Azami.happiness > 50) {
                            await ƒS.Character.hide(characters.Azami);
                            await ƒS.Character.show(characters.Azami, characters.Azami.pose.cute, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.Azami, "Why don't we... take this to my place?");

                            choice = await ƒS.Menu.getInput(yesno, "choice");
                            switch (choice) {
                                case yesno.yes:
                                    await ƒS.Speech.tell(characters.JJ, "I would absolutely love to!");
                                    await ƒS.Speech.tell(characters.Azami, "Great! Let's go!");
                                    saveData.d1AfterPartyDate = "Azami";
                                    return "D1_AfterParty_Azami";
                                case yesno.no:
                                    await ƒS.Speech.tell(characters.JJ, "Sorry, but not yet, there is still someone I want to talk to.");
                                    await ƒS.Character.hide(characters.Azami);
                                    await ƒS.Character.show(characters.Azami, characters.Azami.pose.normal, ƒS.positions.bottomcenter);
                                    await ƒS.update(0.1);
                                    await ƒS.Speech.tell(characters.Azami, "Sure, mondainai.");
                                    break;
                            }
                        }
                        await ƒS.Speech.tell(characters.JJ, "Nice talk, gotta go though, Yuri wants me to meet other people as well.");
                        await ƒS.Speech.tell(characters.Azami, "See ya.");
                        guests.azami = "I already talked to Azami";
                    }
                    break;
                case guests.urban:
                    if (guests.urban == "I already talked to Urban") {
                        if (saveData.friendship.Urban.happiness > 50) {
                            await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.JJ, "Hey, I would like to come with you now... please?");
                            await ƒS.Speech.tell(characters.Urban, "Hell yeah, I wanna see your ride! Let's take your car.");
                            saveData.d1AfterPartyDate = "Urban";
                            return "D1_AfterParty_Urban";
                        }
                        await ƒS.Speech.tell(characters.JJ, "What am I doing, I already talked to him.");
                        i--;
                        break;
                    } else {
                        await ƒS.Speech.tell(characters.JJ, "Uh, hey, I'm JJ.");
                        await ƒS.Speech.tell(characters.Urban, "Oh, 'sup JJ, am Urban.")
                        await ƒS.Speech.tell(characters.JJ, "daijoobu desu. And you?");
                        await ƒS.Speech.tell(characters.Urban, "I'm good. Sorry, I'm not great with local talk yet.")
                        await ƒS.Speech.tell(characters.JJ, "Ah, my bad, Yuri did say you were from Switzerland. I'm fine.");
                        switch (clothingElem) {
                            case clothing.anime:
                                await ƒS.Speech.tell(characters.Urban, "Oh, you watch those weird japanese cartoons, huh?");
                                await ƒS.Speech.tell(characters.JJ, "Yes, I like anime...");
                                await ƒS.Speech.tell(characters.Urban, "Aren't cartoons just for children?");
                                await ƒS.Speech.tell(characters.JJ, "Just... don't, okay?");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.angry, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Urban, "What's your problem?");
                                await ƒS.Speech.tell(characters.JJ, "It's just so annoying that people still think animation is a genre for kids. It's really not. It's a fucking form of art. Thankyouverymuch.");
                                await ƒS.Speech.tell(characters.Urban, "Daamn, alright Kumpel, sorry.");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                lowerFriendship(saveData.friendship.Urban, 15);
                                break;
                            case clothing.mcmjacket:
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Urban, "You're a mech, huh? That's awesome, I love cars, and racing. Yuri only said you like cars.");
                                await ƒS.Speech.tell(characters.JJ, "Mhm, I work at Justice's place. I can ping the location for you.");
                                await ƒS.Speech.tell(characters.Urban, "Dunno, what did you work on so far?");
                                await ƒS.Speech.tell(characters.JJ, "Aside from my Wyvern I also often worked on Yuri's Speed-Wagon and Amelia's KX-1.");
                                await ƒS.Speech.tell(characters.Urban, "Preem, maybe I should visit after all. Also, Muscle car? Nice choice, though I personally prefer sport compacts.");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Urban, 25);
                                break;
                            case clothing.otokonoko:
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.surprised, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Urban, "Now that I'm taking a closer look, I didn't expect such a cute girl to be here.");
                                await ƒS.Speech.tell(characters.JJ, "Ah, w-well thank you, but fair w-warning, I'm not a girl.");
                                await ƒS.Speech.tell(characters.Urban, "Oh sorry, dude, It's jus-");
                                await ƒS.Speech.tell(characters.JJ, "Don't even worry about it, I... k-kindly liked it when you called me cute.");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Urban, "<i>under his breath</i> <sub>Damn, that's cute.</sub> Ahem, no problem, dude. I don't mind either way.");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Urban, 12);
                                break;
                            case clothing.yukata:
                                await ƒS.Speech.tell(characters.Urban, "The fuck are you wearing, by the way?");
                                await ƒS.Speech.tell(characters.JJ, "That is a yukata. A type of japanese clothing.");
                                await ƒS.Speech.tell(characters.Urban, "Well it looks weird, why are you dressed like that?");
                                await ƒS.Speech.tell(characters.JJ, "I like wearing them, they are perfect for summer. So fuck off.");
                                await ƒS.Speech.tell(characters.Urban, "Hmm, can't argue with that, I s'pose.");
                                lowerFriendship(saveData.friendship.Urban, 10);
                                break;
                        }
                        await ƒS.Speech.tell(characters.JJ, "So, you love cars, hm?");
                        await ƒS.Speech.tell(characters.Urban, "Absolutely, I came here from Switzerland, just for racing, and the tuning freedom.");
                        await ƒS.Speech.tell(characters.JJ, "What car you got?");
                        await ƒS.Speech.tell(characters.Urban, "A Marina E-8.");
                        await ƒS.Speech.tell(characters.JJ, "That's a sweet sport compact. But can be a pain. You should probably replace the catalyst. Gonna save you a lot of trouble down the road.");
                        if (clothingElem != clothing.mcmjacket) {
                            await ƒS.Character.hide(characters.Urban);
                            await ƒS.Character.show(characters.Urban, characters.Urban.pose.surprised, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.Urban, "Oh, you're a mech? That's so preem.");
                            await ƒS.Character.hide(characters.Urban);
                            await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.JJ, "Yup, at Justice's shop.");
                            higherFriendship(saveData.friendship.Urban, 5);
                        }
                        await ƒS.Speech.tell(characters.Urban, "Thanks for the tip. I'll look out for that.");
                        if (saveData.friendship.Urban.happiness < 10) {
                            await ƒS.Speech.tell(characters.Urban, "Nothing personal, but this is boring, I'll talk to someone else.");
                            await ƒS.Speech.tell(characters.JJ, "Uh huh...");
                            await ƒS.Speech.tell(characters.Thoughts, "What a dick.");
                            saveData.friendship.Urban.state = "disliked";
                            break;
                        }

                        await ƒS.Speech.tell(characters.JJ, "What kinda races you riding in?");
                        await ƒS.Speech.tell(characters.Urban, "Mostly circuit races. Uptown has a nice track.");
                        await ƒS.Speech.tell(characters.JJ, "Oh, nice. If you like circuits, there is a lesser known race in the kanashii district.");
                        await ƒS.Speech.tell(characters.JJ, "It's kind of a secret newer racers are not aware of. It's an amazing track though.");
                        await ƒS.Speech.tell(characters.Urban, "Duuuude... Thanks for the tip. I'll check it out.");
                        await ƒS.Speech.tell(characters.Urban, "Let's not just talk about cars though, what's your life like?.");

                        let life = {
                            family: "Talk about family.",
                            friends: "talk about friends.",
                            love: "Talk about love life.",
                            hobbies: "Talk about hobbies."
                        }
                        choice = await ƒS.Menu.getInput(life, "choice");
                        switch (choice) {
                            case life.family:
                                await ƒS.Speech.tell(characters.JJ, "Well, I'm a Motor City native, but my mothers family is from Japan.");
                                await ƒS.Speech.tell(characters.JJ, "Justice is actually my aunt. She has been nagging forever, trying to get me to learn japanese.");
                                await ƒS.Speech.tell(characters.JJ, "But it's kinda hard, outside of MC slang.");
                                await ƒS.Speech.tell(characters.Urban, "I totally get what you mean. Aunt Melanie is still calling me once a week to tell me I'm a fuck-up, just cause I don't wanna work in the family business.");
                                await ƒS.Speech.tell(characters.JJ, "What kinda business?");
                                await ƒS.Speech.tell(characters.Urban, "Cheese-making. Do I look like someone who wants to make cheese for a living?");
                                await ƒS.Speech.tell(characters.JJ, "Hehe, no not really.");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Urban, "Exactly. Hahaha.");
                                await ƒS.Character.hide(characters.Urban);
                                await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                higherFriendship(saveData.friendship.Urban, 10);
                                break;
                            case life.friends:
                                await ƒS.Speech.tell(characters.JJ, "Well, my best friend Yuri is the host of this party. And he invited me and told me who has similar interests.");
                                await ƒS.Speech.tell(characters.JJ, "He is way to worried about my love life, but I couldn't wish for a better friend.");
                                await ƒS.Speech.tell(characters.Urban, "Hmm, yes. I've only met him a few weeks ago, but he really is a stand up guy.");
                                await ƒS.Speech.tell(characters.Urban, "Helped me a lot, getting to know MC and arranging stuff.");
                                higherFriendship(saveData.friendship.Urban, 5);
                                break;
                            case life.love:
                                await ƒS.Speech.tell(characters.JJ, "At the moment? Very lonely. Haven't had an I/O in at least 2 years.");
                                await ƒS.Speech.tell(characters.JJ, "I would never tell Yuri, but I think it's starting to get to me.");
                                await ƒS.Speech.tell(characters.Urban, "Dude, you're coming on way to strong. Chill a bit.");
                                await ƒS.Speech.tell(characters.JJ, "Sometimes I talk without thinking, sorry.");
                                lowerFriendship(saveData.friendship.Urban, 10);
                                break;
                            case life.hobbies:
                                await ƒS.Speech.tell(characters.JJ, "Well, if I'm not working, at the shop or on my own car, I like to watch anime, play video games, that kinda stuff.");
                                await ƒS.Speech.tell(characters.Urban, "Those japanese cartoons?");
                                await ƒS.Speech.tell(characters.JJ, "Yes.");
                                await ƒS.Speech.tell(characters.Urban, "Huh, ok.");
                                await ƒS.Speech.tell(characters.JJ, "What do you do in your free time?");
                                await ƒS.Speech.tell(characters.Urban, "Ahh, you know, mostly racing, but also doing sports. Or play a few games too.");
                                await ƒS.Speech.tell(characters.JJ, "Hmm, interesting.");
                                break;
                        }

                        if (saveData.friendship.Urban.happiness > 50) {
                            await ƒS.Character.hide(characters.Urban);
                            await ƒS.Character.show(characters.Urban, characters.Urban.pose.happy, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.Urban, "Wanna come to my place?");

                            choice = await ƒS.Menu.getInput(yesno, "choice");
                            switch (choice) {
                                case yesno.yes:
                                    await ƒS.Speech.tell(characters.JJ, "I would absolutely love to!");
                                    await ƒS.Speech.tell(characters.Urban, "Great! Let's go!");
                                    saveData.d1AfterPartyDate = "Urban";
                                    return "D1_AfterParty_Urban";
                                case yesno.no:
                                    await ƒS.Speech.tell(characters.JJ, "Sorry, but there's still guests I want to talk to.");
                                    await ƒS.Character.hide(characters.Urban);
                                    await ƒS.Character.show(characters.Urban, characters.Urban.pose.normal, ƒS.positions.bottomcenter);
                                    await ƒS.update(0.1);
                                    await ƒS.Speech.tell(characters.Urban, "Sure, no problem.");
                                    break;
                            }
                        }
                        await ƒS.Speech.tell(characters.JJ, "Nice talk, gotta go though, Yuri wants me to meet other people as well.");
                        await ƒS.Speech.tell(characters.Urban, "See ya.");
                        guests.urban = "I already talked to Urban";
                    }
                    break;
                case guests.books:
                    if (guests.books == "I already talked to Books") {
                        if (saveData.friendship.Books.happiness > 50) {
                            await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.JJ, "Hey, I thought maybe you would like to go to my place now?");
                            await ƒS.Speech.tell(characters.Books, "Y-yes, please, that would be lovely!");
                            saveData.d1AfterPartyDate = "Books"
                            return "D1_AfterParty_Books";
                        }
                        await ƒS.Speech.tell(characters.JJ, "What am I doing, I already talked to her.");
                        i--;
                        break;
                    } else {
                        await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.JJ, "H-hey, you're Books, right?");
                        await ƒS.Character.hide(characters.Books);
                        await ƒS.Character.show(characters.Books, characters.Books.pose.surprised, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Books, "UH WAHHH!");
                        await ƒS.Character.hide(characters.Books);
                        await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Books, "Ugh, t-that's so embarrassing, s-sorry. Yes I am Books. Have w-we met?");
                        await ƒS.Speech.tell(characters.JJ, "Not that I know, no. I'm JJ.");
                        await ƒS.Speech.tell(characters.Books, "Oh yes, I was told about you. But Nao-chan didn't tell me why. He just said that his new input has a friend I would like.");

                        switch (clothingElem) {
                            case clothing.anime:
                                await ƒS.Speech.tell(characters.Books, "But looking at you, it's kind of obvious. Nanas weird escapade is my all time favorite franchise. Especially Part 4.");
                                await ƒS.Speech.tell(characters.Books, "Nanasuke is just the most adorable cinnamon roll.");
                                await ƒS.Speech.tell(characters.JJ, "Wow...");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.surprised, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Books, "OhmygodimsosorryididntmeantocomeoffsostronglyijustgetsoexcitedwhentalkingaboutNNWE. Eep!");
                                await ƒS.Speech.tell(characters.JJ, "Oh, hey, no don't even worry about it, it's just that...");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.JJ, "Well...");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.sad, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.JJ, "Uhm...");
                                await ƒS.Speech.tell(characters.JJ, "My heart s-skipped a beat there... Yabe. This is so embarrassing.");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Books, "You don't think it was weird?");
                                choice = await ƒS.Menu.getInput(yesno, "choice");
                                switch (choice) {
                                    case yesno.yes:
                                        await ƒS.Speech.tell(characters.JJ, "It was a lil weird, but I don't mind. Bit it was a lil cute too.");
                                        await ƒS.Character.hide(characters.Books);
                                        await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                                        await ƒS.update(0.1);
                                        await ƒS.Speech.tell(characters.Books, "Oh, okay.");
                                        higherFriendship(saveData.friendship.Books, 25);
                                        break;
                                    case yesno.no:
                                        await ƒS.Speech.tell(characters.JJ, "No, I think it's adorable seeing you get excited over something like this. I love seeing people this happy.");
                                        await ƒS.Character.hide(characters.Books);
                                        await ƒS.Character.show(characters.Books, characters.Books.pose.cute, ƒS.positions.bottomcenter);
                                        await ƒS.update(0.1);
                                        await ƒS.Speech.tell(characters.Books, "Ah, t-tha-thank you-u.");
                                        await ƒS.Character.hide(characters.Books);
                                        await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                                        await ƒS.update(0.1);
                                        higherFriendship(saveData.friendship.Books, 35);
                                        saveData.friendship.Books.state = "crush";
                                        break;
                                }
                                break;
                            case clothing.mcmjacket:
                                await ƒS.Speech.tell(characters.Books, "Oh... you're a mechanic. I must admit I'm not the biggest fan of racing. It's scary.");
                                await ƒS.Speech.tell(characters.JJ, "Huh?");
                                await ƒS.Speech.tell(characters.JJ, "Ah yeah, the jacket. Well, actually I don't race. I just really like working on cars. Learning how they work, making them look kakkoii. That kinda stuff.");
                                await ƒS.Speech.tell(characters.Books, "Hmm, I guess people like that can be found here in MC too.");
                                break;
                            case clothing.otokonoko:
                                await ƒS.Speech.tell(characters.Books, "That is a very cute dress. Did you get it at the place next to Jackie's bodyshop?");
                                await ƒS.Speech.tell(characters.JJ, "Thank you. Yes, actually. Do you visit that shop often?");
                                await ƒS.Speech.tell(characters.Books, "Yes, both actually. The cutest clothes and the best service for high quality datajacks. Going there is always a dream.");
                                await ƒS.Speech.tell(characters.JJ, "High quality datajack? For rigging, decking or just VRnime?");
                                await ƒS.Speech.tell(characters.Books, "Decking and VRnime.");
                                await ƒS.Speech.tell(characters.JJ, "May I ask whether-");
                                await ƒS.Speech.tell(characters.Books, "I'm a white hat or a runner? Yes, I don't mind. I'm a runner, actually.");
                                await ƒS.Speech.tell(characters.JJ, "Huh, Didn't expect that.");
                                await ƒS.Speech.tell(characters.Books, "That's the point. No one expects me. Also, how else could I afford all the anime figurines.");
                                await ƒS.Speech.tell(characters.JJ, "Haha, yeah I get what you mean.");
                                higherFriendship(saveData.friendship.Books, 20);
                                break;
                            case clothing.yukata:
                                await ƒS.Speech.tell(characters.Books, "Hmm, a yukata. Almost out of place for an event like this.");
                                await ƒS.Speech.tell(characters.JJ, "I don't think so. A party in summer kind of is a summer festival, right?");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Books, "Hahaha! Man, you're funny.");
                                await ƒS.Speech.tell(characters.JJ, "That wasn't a joke!");
                                await ƒS.Speech.tell(characters.Books, "Pfft.");
                                await ƒS.Speech.tell(characters.JJ, "Aww come oooon...");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Books, "Sorry. You are right. Totally not...");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Books, "hihihi.");
                                await ƒS.Character.hide(characters.Books);
                                await ƒS.Character.show(characters.Books, characters.Books.pose.normal, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Books, "Totally not funny.");
                                higherFriendship(saveData.friendship.Books, 10);
                                break;
                        }
                        await ƒS.Speech.tell(characters.Books, "What kind of animes do you usually watch?");

                        let anime = {
                            shonen: "Shonen",
                            romcom: "Romcom",
                            horror: "Horror",
                            isekai: "Isekai"
                        }

                        choice = await ƒS.Menu.getInput(anime, "choice");
                        switch(choice){
                            case anime.shonen:
                                await ƒS.Speech.tell(characters.JJ, "I usually watch shonen. Like Nanas weird escapade. Or the fantasy one with the magic guilds.");
                                await ƒS.Speech.tell(characters.Books, "Ugh, I dunno, aside from a few exceptions, of wich Nana definitely is the best, shonen is too generic for me.");
                                lowerFriendship(saveData.friendship.Books, 5);
                                break;
                            case anime.romcom:
                                await ƒS.Speech.tell(characters.JJ, "I watch romcoms. Like that one where the boy works as a tutor for several girls, cause he is poor.");
                                await ƒS.Speech.tell(characters.JJ, "My favorite is the one where the main characters are geniuses and in love with each other, but both are too stubborn to confess, so they try to force each other to do so.");
                                await ƒS.Speech.tell(characters.Books, "Oh yeah, that one is great. But I prefer the one where the girl has a communication disorder, and the guy looks amazing while crossdressing.");
                                await ƒS.Speech.tell(characters.JJ, "Ah, I haven't seen that one yet.");
                                higherFriendship(saveData.friendship.Books, 5);
                                break;
                            case anime.horror:
                                await ƒS.Speech.tell(characters.JJ, "I like horror and psychological stuff.");
                                await ƒS.Speech.tell(characters.Books, "Now we're talking! Those are definitelly my favorite genres!");
                                higherFriendship(saveData.friendship.Books, 20);
                                break;
                            case anime.isekai:
                                await ƒS.Speech.tell(characters.JJ, "Mostly isekais. No matter how trashy, wether the MC dies and reincarnates or gets summoned. It's usually entertaining.");
                                await ƒS.Speech.tell(characters.Books, "Yikes! I hate isekais. So many shitty fantasy light novels get made every year, just because they are forced to be isekais.");
                                lowerFriendship(saveData.friendship.Books, 5);
                                break;
                        }
                        await ƒS.Speech.tell(characters.Books, "I actually prefer light novels over anime though.");
                        await ƒS.Speech.tell(characters.Books, "Which is how I got my nickname. 'Because you're always buried in your books, and probably the only runner with purely booksmarts.'");
                        await ƒS.Speech.tell(characters.Books, "They say that as if it wasn't the most important thing while decking!");
                        await ƒS.Speech.tell(characters.JJ, "I don't know much about decking. But for rigging, streetsmarts are kinda important too. Maybe that's what really sets them apart?");
                        await ƒS.Speech.tell(characters.Books, "Yeah, I'd say so.");
                        if(saveData.friendship.Books.happiness > 50){
                            await ƒS.Speech.tell(characters.Thoughts, "She's got kind of a lonely look. Maybe I should invite her over?");

                            choice = await ƒS.Menu.getInput(yesno, "choice");
                            switch (choice) {
                                case yesno.yes:
                                    await ƒS.Speech.tell(characters.JJ, "Hey, would you, just maybe, like to come to my place, we could watch anime and hang.");
                                    await ƒS.Character.hide(characters.Books);
                                    await ƒS.Character.show(characters.Books, characters.Books.pose.cute, ƒS.positions.bottomcenter);
                                    await ƒS.update(0.1);
                                    await ƒS.Speech.tell(characters.Books, "Oh my, that would be great!");
                                    saveData.d1AfterPartyDate = "Books";
                                    return "D1_AfterParty_Books";
                                case yesno.no:
                                    await ƒS.Speech.tell(characters.JJ, "I think I'll talk to the others first.");
                                    break;
                            }
                        }
                        await ƒS.Speech.tell(characters.JJ, "Well, I'm gonna go talk to the other guests, Yuri is forcing me to socialise.");
                        await ƒS.Speech.tell(characters.Urban, "Til' later. Was nice talking to you!");
                        guests.books = "I already talked to Books";
                    }
                    break;
                case guests.ame:
                    if (guests.ame == "I already talked to Amelia") {
                        if (saveData.friendship.Ame.happiness > 50) {
                            await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.normal, ƒS.positions.bottomcenter);
                            await ƒS.update(0.1);
                            await ƒS.Speech.tell(characters.JJ, "Hey, so, the invitation still stands?");
                            await ƒS.Speech.tell(characters.Amelia, "It do, let's get to my car.");
                            saveData.d1AfterPartyDate = "Amelia";
                            return "D1_AfterParty_Ame";
                        }
                        await ƒS.Speech.tell(characters.JJ, "What am I doing, I already talked to her.");
                        i--;
                        break;
                    } else if (guests.ame == "Amelia is not here yet.") {
                        await ƒS.Speech.tell(characters.JJ, "Too bad Amelia isn't here yet. I wanted to talk to her.");
                        i--;
                        break;
                    } else {
                        await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.JJ, "Hey Amelia.");
                        switch(saveData.d1Ame){
                            case "fewer":
                                await ƒS.Character.hide(characters.Amelia);
                                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.angry, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Amelia, "Hey Asshat.");
                                await ƒS.Speech.tell(characters.Amelia, "I lost the fucking race because you missed something on my scan this morning.");
                                await ƒS.Speech.tell(characters.Amelia, "What the fuck do you want now?");
                                break;
                            case "correct":
                            case "more":
                                await ƒS.Character.hide(characters.Amelia);
                                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.happy, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Amelia, "Nice to see you again punk, Guess what? I won the race. Guess you got yourself a loyal customer.");
                                await ƒS.Speech.tell(characters.JJ, "Congrats! I'm glad it worked out.");
                                await ƒS.Speech.tell(characters.Amelia, "Yup, me too, that was a great paycheck.");
                                break;
                            case "most":
                                await ƒS.Character.hide(characters.Amelia);
                                await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.angry, ƒS.positions.bottomcenter);
                                await ƒS.update(0.1);
                                await ƒS.Speech.tell(characters.Amelia, "Hey Asshat.");
                                await ƒS.Speech.tell(characters.Amelia, "I won the race, no thanks to you.");
                                await ƒS.Speech.tell(characters.Amelia, "I know you ripped me off, this morning, so what the fuck do you want?");
                                break;
                        }
                        if(saveData.friendship.Ame.happiness <= 10){
                            await ƒS.Speech.tell(characters.Amelia, "Actually, i don't even wanna hear it.");
                            await ƒS.Speech.tell(characters.Amelia, "So buzz off!");
                            break;
                        }

                        switch(clothingElem){
                            case clothing.anime:
                                await ƒS.Speech.tell(characters.Amelia, "So, you're a weeb?");
                                await ƒS.Speech.tell(characters.JJ, "Yup, what about you?");
                                await ƒS.Speech.tell(characters.Amelia, "Every once in a while, if the show is really good.");
                                await ƒS.Speech.tell(characters.JJ, "Nice, was Nana on that list?");
                                await ƒS.Speech.tell(characters.Amelia, "Uh huh, I've seen it. It's... weirds though.");
                                await ƒS.Speech.tell(characters.JJ, "That... joke was horrible.");
                                await ƒS.Speech.tell(characters.Amelia, "Can't fault someone for trying.");
                                await ƒS.Speech.tell(characters.JJ, "Fair enough.");
                                higherFriendship(saveData.friendship.Ame, 10);
                                break;
                            case clothing.mcmjacket:
                                await ƒS.Speech.tell(characters.Amelia, "You know what? that jacket actually looks pretty good on you.");
                                await ƒS.Speech.tell(characters.JJ, "Thank you. I like it, too.");
                                break;
                            case clothing.otokonoko:
                                await ƒS.Speech.tell(characters.Amelia, "That is quite the style change, compared to this morning.");
                                await ƒS.Speech.tell(characters.JJ, "Yes, I used to walk around like this all the time, but it's really inconvenient on the job.");
                                await ƒS.Speech.tell(characters.Amelia, "Because you're not putting in the effort you could.");
                                await ƒS.Speech.tell(characters.JJ, "That's one of the reason why it is annoying. You nailed it.");
                                await ƒS.Speech.tell(characters.Amelia, "But when you look that good, why not make sure you always look like that.");
                                await ƒS.Speech.tell(characters.JJ, "Maybe I will, for you.");
                                higherFriendship(saveData.friendship.Ame, 15);
                                break;
                            case clothing.yukata:
                                await ƒS.Speech.tell(characters.Amelia, "This really isn't the type of festival to wear a yukata, don't you thinK?");
                                await ƒS.Speech.tell(characters.JJ, "Whatever, I can do what I want.");
                                await ƒS.Speech.tell(characters.Amelia, "Nice fake tough guy talk.");
                                lowerFriendship(saveData.friendship.Ame.happiness, 10);
                                break;
                        }

                        await ƒS.Speech.tell(characters.JJ, "So, what's your deal? What do you do aside from racing?");
                        await ƒS.Speech.tell(characters.Amelia, "I- well, I like singing, actually. Sometimes I like to watch anime and play video games.");
                        await ƒS.Speech.tell(characters.JJ, "Oh nice, you're voice <i>is</i> pretty, so I can totally imagine that");
                        higherFriendship(saveData.friendship.Ame, 10);

                        if (saveData.friendship.Ame.happiness > 50) {
                            await ƒS.Speech.tell(characters.Amelia, "Let's go to my place.");
                            choice = await ƒS.Menu.getInput(yesno, "choice");
                            switch (choice) {
                                case yesno.yes:
                                    await ƒS.Speech.tell(characters.JJ, "Right behind you!");
                                    await ƒS.Character.hide(characters.Amelia);
                                    await ƒS.Character.show(characters.Amelia, characters.Amelia.pose.happy, ƒS.positions.bottomcenter);
                                    await ƒS.update(0.1);
                                    await ƒS.Speech.tell(characters.Amelia, "Oh my, that would be great!");
                                    saveData.d1AfterPartyDate = "Amelia";
                                    return "D1_AfterParty_Ame";
                                case yesno.no:
                                    await ƒS.Speech.tell(characters.JJ, "I think I'll talk to the others first.");
                                    break;
                            }
                        }
                        await ƒS.Speech.tell(characters.JJ, "See ya, there are still some I haven't talked to here.");
                        await ƒS.Speech.tell(characters.Amelia, "Yup, see ya.");

                        guests.ame = "I already talked to Amelia";
                    }
                    break;
            }
        }
        ƒS.Character.hideAll();
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Character.show(characters.Nao, characters.Nao.pose.normal, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Yuri, "So, did you talk to everyone?");
        await ƒS.Speech.tell(characters.Nao, "Anyone you like? Anyone that likes you?");
        if(saveData.friendship.Ame.happiness > 50 || saveData.friendship.Azami.happiness > 50 || saveData.friendship.Urban.happiness > 50 || saveData.friendship.Books.happiness > 50){
            if(saveData.friendship.Ame.happiness > 50){
                await ƒS.Speech.tell(characters.JJ, "I think Amelia likes me.");
                await ƒS.Speech.tell(characters.JJ, "At least I'll definitely see her again, she is gonna come by the shop more often.");
            }
            if(saveData.friendship.Azami.happiness > 50){
                await ƒS.Speech.tell(characters.JJ, "Azami wanted me to go home with her, but I think I missed my window, she is already gone.");
            }
            if(saveData.friendship.Urban.happiness > 50){
                await ƒS.Speech.tell(characters.JJ, "Urban seemed interested. I hope I'll see him again.");
            }
            if(saveData.friendship.Books.happiness > 50){
                await ƒS.Speech.tell(characters.JJ, "Books is hella kawaii. And I think she likes me back. I should ask her out some time.");
            }
        }else{
            await ƒS.Speech.tell(characters.JJ, "No, I'm sorry, Yuri, I appreciate the effort, but it didn't pan out.");
            await ƒS.Speech.tell(characters.Yuri, "Ah, don't worry about it, you'll do it next time.");
            await ƒS.Speech.tell(characters.Nao, "Yes, I am certain you can do it. Ganbaru, JJ.");
        }
        await ƒS.Speech.tell(characters.JJ, "Well, I'm sorry, but I gotta work tomorrow. I'll be heading out now.");
        await ƒS.Speech.tell(characters.Yuri, "See ya!");
        await ƒS.Speech.tell(characters.Nao, "Matanee, JJ.");

        //return "D2_Morning";
        fadeToBlackMusicOff();
        return "Ending_Normal";
    }
}