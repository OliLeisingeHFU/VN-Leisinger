namespace MCM {
    export async function D1_Noon(): ƒS.SceneReturn {
        let text = {
            JJ: {
                T0000: "In the back! How's it going, choomba?"
            },
            Yuri: {
                T0000: "Yo! JJ? Where you at?",
                T0001: "As preem as always, bud. How is your job treating you?"
            }
        }

        ƒS.Sound.play(music.noonBGM, 0, true);
        ƒS.Sound.fade(music.noonBGM, volume, 1, true);
        playing = music.noonBGM;

        await ƒS.Location.show(locations.kitchen);
        await ƒS.update(2);
        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0000);
        await ƒS.Speech.tell(characters.JJ, text.JJ.T0000);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positions.bottomcenter);
        await ƒS.update(0.1);

        await ƒS.Speech.tell(characters.Yuri, text.Yuri.T0001);

        switch(saveData.d1Ame){
            case "fewest":
            case "fewer":
                await ƒS.Speech.tell(characters.JJ, "There's this customer from this morning, I'm kinda afraid I might've missed something during her carscan.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.thinking, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "Hmm, You should probably call her in again, just to be sure.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.explaining, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "I don't want you to lose your job. After all, how else would you afford that sweet apartment you scored.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                if(saveData.d1evening == "work"){
                    await ƒS.Speech.tell(characters.JJ, "Oh, yeah, actually, Justice asked me to cover the nightshift. I'll probably have at least <b>some</b> time to do that. Thanks.");
                    await ƒS.Character.hide(characters.Yuri);
                    await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.sad, ƒS.positions.bottomcenter);
                    await ƒS.update(0.1);
                    await ƒS.Speech.tell(characters.Yuri, "Oh, dreck! I actually came here to ask you, if you wanted to head to my place this evening. I'm throwing a party.");
                    await ƒS.Speech.tell(characters.Yuri, "");
                }else{
                    await ƒS.Speech.tell(characters.JJ, "I am totally swamped until my shift is over. And the race is tonight, so she doesn't have the time either.");
                    if(saveData.d1Ame == "fewest"){
                        await ƒS.Character.hide(characters.Yuri);
                        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Yuri, "Ah, what's the worst that could happen. If it was small enough for you to miss, it's probably nothing serious.");
                        await ƒS.Character.hide(characters.Yuri);
                        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.JJ, "I really hope you are right.");
                    }
                    await ƒS.Speech.tell(characters.Yuri, "Let's just hope she isn't to angry once she finds out.");
                }
                break;
            case "correct":
                await ƒS.Speech.tell(characters.JJ, "I had this customer this morning, she plans on participating in the street race tonight.");
                await ƒS.Speech.tell(characters.Yuri, "The one at midnight? Nice! News of a good mechanic spread like a virus during these. Sadly I can't make it this time."); // you know I had to do it to 'em
                await ƒS.Speech.tell(characters.JJ, "Oh, right you got something special planned. Good luck with that! But anyway, the problem is, I think I got everything right, but what if I didn't? I might've missed something, or screwed up!");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "Ah, come on, I know you. Gíve yourself more cred. If you think you did not miss anything, then I know for sure you didn't");
                await ƒS.Speech.tell(characters.JJ, "Thanks, choom. You're the best.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.wink, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "I know I am.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                break;
            case "more":
            case "most":
                await ƒS.Speech.tell(characters.JJ, "I had this customer this morning, told me she didn't want anything fixed that wasn't needed, but still wanted me to make sure it's in preem condition for her race.");
                await ƒS.Speech.tell(characters.JJ, "I might have fixed more than needed after all, but what was I supposed to do.");
                await ƒS.Speech.tell(characters.Yuri, "Oof, customers being hard. Don't you love it.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "Maybe you should tell her that if she complains.");
                await ƒS.Speech.tell(characters.Yuri, "'Don't give such confusing instructions then, you brat'");
                await ƒS.Speech.tell(characters.JJ, "Oh, yeah, I'm suuuuure she's gonna appreciate that.");
                await ƒS.Speech.tell(characters.Yuri, "Who knows, what if she likes it.");
                await ƒS.Speech.tell(characters.JJ, "I think it's the other way around. She seems like someone that likes ordering her I/O around.");
                await ƒS.Speech.tell(characters.Yuri, "Sure, but what about people she wants to get serious with?");
                await ƒS.Speech.tell(characters.JJ, "Enough of that, she is a customer.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "Sure.");
                break;
        }

        if(saveData.d1evening != "work" && (saveData.d1Ame != "fewer" && saveData.d1Ame != "fewest")){
            await ƒS.Speech.tell(characters.Yuri, "Well, what I actually came here for was to inform you, that tonight I'm having a party at my place.");
            await ƒS.Speech.tell(characters.Yuri, "Casual clothing, enough ethanol to desinfect a whole bodyshop, as well as lots of potential inputs and outputs that dig nice rides.");
            await ƒS.Speech.tell(characters.Yuri, "On the topic of bodyshops, I heard from mine got a deal with your boss, 20% off all cyberware! sugoi ne~");
            await ƒS.Speech.tell(characters.Yuri, "If you ever plan on chippin' in, I'll gladly chip in.");
            await ƒS.Character.hide(characters.Yuri);
            await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positions.bottomcenter);
            await ƒS.update(0.1);
            await ƒS.Speech.tell(characters.Yuri, "Haha, good one!");
            await ƒS.Character.hide(characters.Yuri);
            await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
            await ƒS.update(0.1);
            await ƒS.Speech.tell(characters.Yuri, "Consider it payback for the 20% off I get here. I'm sure a nice cyberarm or two will help you with difficult tasks at work.");
            await ƒS.Speech.tell(characters.Yuri, "But back to the party I'm throwing, it starts at eight. You don't need to bring anything.");

            if(saveData.d1evening == "work"){
                await ƒS.Speech.tell(characters.JJ, "I would love to, but I already promised auntie, I would take over the sleepy boi hours.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.sad, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
                await ƒS.Speech.tell(characters.Yuri, "Kuso, just my luck. I really thought I could get you hooked up this time.");
                await ƒS.Speech.tell(characters.JJ, "Look I appreciate it, but you don't need to worry about my love life this much.");
                await ƒS.Speech.tell(characters.Yuri, "If it was just your love life, I really wouldn't care all that much, it's about all of your social life.");
                await ƒS.Speech.tell(characters.Yuri, "Sometimes you get so absorbed in your goals, you completely forget all other important things in life. Also, you are shit at socialising!");
                await ƒS.Speech.tell(characters.Yuri, "Or do you have any <b>real</b> friends other than me? You know, people outside of your family that would help you in any situation, with all resources avaiable to them?");
                await ƒS.Speech.tell(characters.JJ, "I know, I know, you're right. Next time I'll make sure I can make it. Promise.");
                await ƒS.Speech.tell(characters.Yuri, "Yeah, you better. Else I'll force you to go speed dating or some shit like that.");
                await ƒS.Character.hide(characters.Yuri);
                await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                await ƒS.update(0.1);
            }else{
                let partyDia = {
                    no: "Sorry, but I really don't think I can go today.",
                    yes: "Yeah, I've got time."
                }
        
                let partyDiaElem = await ƒS.Menu.getInput(partyDia, "choice");

                switch(partyDiaElem){
                    case partyDia.no:
                        await ƒS.Character.hide(characters.Yuri);
                        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.angry, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Yuri, "Kuso, cooooooome on, choom. I really thought I could get you hooked up this time.");
                        await ƒS.Speech.tell(characters.JJ, "Look I appreciate it, but you don't need to worry about my love life this much.");
                        await ƒS.Speech.tell(characters.Yuri, "If it was just your love life, I really wouldn't care all that much, it's about all of your social life.");
                        await ƒS.Speech.tell(characters.Yuri, "If you never go out or do anything, you'll never meet new people. Also, you are shit at socialising! So it's twice as hard for you to make friends.");
                        await ƒS.Speech.tell(characters.Yuri, "Or do you have any <b>real</b> friends other than me? You know, people outside of your family that would help you in any situation, with all resources avaiable to them?");
                        await ƒS.Speech.tell(characters.JJ, "I know, I know, you're right. Next time I'll make sure I can make it. Promise.");
                        await ƒS.Speech.tell(characters.Yuri, "Yeah, you better. Else I'll force you to go speed dating or some shit like that.");
                        await ƒS.Character.hide(characters.Yuri);
                        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        break;
                    case partyDia.yes:
                        await ƒS.Character.hide(characters.Yuri);
                        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.happy, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Yuri, "Dope! Based! Superlit!");
                        await ƒS.Speech.tell(characters.Yuri, "Don't forget to wear your MCM jacket. Some of the riders really dig mechanics. Also, you look great in it.");
                        await ƒS.Speech.tell(characters.JJ, "Will do.");
                        await ƒS.Character.hide(characters.Yuri);
                        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positions.bottomcenter);
                        await ƒS.update(0.1);
                        await ƒS.Speech.tell(characters.Yuri, "Oh, also, come in your wyvern! As I said, cool ride equals free I/Os.");
                        await ƒS.Speech.tell(characters.Yuri, "Come on, don't give me that look. You've been in a dry streak for to long!");
                        await ƒS.Speech.tell(characters.JJ, "No need to rub it in.");
                        await ƒS.Speech.tell(characters.Yuri, "You know I love to rub in.");
                        await ƒS.Speech.tell(characters.JJ, "Hahaha, yeah, you sure do.");
                        saveData.d1evening = "D1_Evening_Party";
                        break;
                }
            }
        }

        await ƒS.Speech.tell(characters.Yuri, "I think my car could use some more glitz. Got anything kakkoii here?");
        await ƒS.Speech.tell(characters.Thoughts, "I think the two best options are either the neon lights or the new spoiler.");
        await ƒS.Speech.tell(characters.Thoughts, "A spoiler is definitely the less imp option, but also cheaper. It would cost him about 250 yero");
        await ƒS.Speech.tell(characters.Thoughts, "The new neon lights are preem, but at 1450 yero they are very expensive.");
        await ƒS.Speech.tell(characters.Thoughts, "Getting both will ensure he scores an output, but might attract thrillers.");

        let car = {
            spoiler: "Get the spoiler",
            neon: "Get the neon lights",
            both: "get both",
        }

        let carElem = await ƒS.Menu.getInput(car, "choice");

        switch(carElem){
            case car.spoiler:
                await ƒS.Speech.tell(characters.JJ, "One of the spoilers we got will def look clean on your ride.");
                await ƒS.Speech.tell(characters.JJ, "It would cost you 250 ¥€, and it's so quick, I can easily squeeze you in between some other work.");
                await ƒS.Speech.tell(characters.Yuri, "Oh yeah, I've seen some of them. Get me the one with the shark fins.");
                await ƒS.Speech.tell(characters.JJ, "'Course. Gonna start the painting machine asap after lunch.");
                saveData.state.yero += 125;
                saveData.d1YuriUpgrade = "spoiler";
                break;
            case car.neon:
                await ƒS.Speech.tell(characters.JJ, "Def! We got new neon lights! some hi-qual stuff.");
                await ƒS.Speech.tell(characters.JJ, "Sure, they cost about 1450 yero, but they are highly customizable and look bretty damn amazing. I'm getting some myself, if I can afford it after the bills.");
                await ƒS.Speech.tell(characters.Yuri, "That does sound imp, choom! I'm gonna have lots of fun setting them up.");
                await ƒS.Speech.tell(characters.JJ, "Preem. I'll ask Roland to get them fitted. I'm to swamped to do that.");
                await ƒS.Speech.tell(characters.Yuri, "No prob. Just be in time for tonight.");
                saveData.state.yero += 725;
                saveData.d1YuriUpgrade = "neon";
                break;
            case car.both:
                await ƒS.Speech.tell(characters.JJ, "Def! We got new neon lights! some hi-qual stuff. Together with a nice spoiler they'll work like magic.");
                await ƒS.Speech.tell(characters.JJ, "But, they cost about 1700 yero in total..");
                await ƒS.Speech.tell(characters.Yuri, "Ah, sure, I got the extra bank. I better score tonight, though.");
                await ƒS.Speech.tell(characters.JJ, "I guarantee you will. I'll ask Roland to get them built in. I'm to swamped to do that.");
                await ƒS.Speech.tell(characters.Yuri, "No prob. Just be in time for tonight.");
                saveData.state.yero += 1050;
                saveData.d1YuriUpgrade = "both";
                break;
        }
        await ƒS.Speech.tell(characters.JJ, "Sorry, tomodachi. Break's over, gotta go.");
        await ƒS.Speech.tell(characters.Yuri, "Mondainai. I need to buzz anyway, even small corpos don't run them-");
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.surprised, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.angry, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Justice, "What's the aho doing here? You know he annoys the essence out of me.");
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.smug, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Yuri, "Well, actually, I came here as a customer.");
        switch(saveData.d1YuriUpgrade){
            case car.spoiler:
                await ƒS.Speech.tell(characters.Yuri, "I wanted to get a kakkoii spoiler.");
                break;
            case car.neon:
                await ƒS.Speech.tell(characters.Yuri, "JJ recommended the new neonlights, and I'd like them in my car.");
                break;
            case car.both:
                await ƒS.Speech.tell(characters.Yuri, "Some neonlights and a spoiler would make my car meccha kakkoii. JJ has a good eye for these things.");
                break;
        }
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.sad, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Yuri, "But I don't know if I can handle you being so mean to me. I might have to go to a different shop. Maybe they'll appreciate their dear, dear customers.");
        await ƒS.Character.hide(characters.Justice);
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.closed, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Justice, "<i>inhales</i>");
        await ƒS.Character.hide(characters.Justice);
        await ƒS.Character.show(characters.Justice, characters.Justice.pose.normal, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positionPercent(25, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Justice, "That's xactly what I meant. Anyway... You and Roland are gonna run the front alone for a while.");
        await ƒS.Speech.tell(characters.JJ, "Will do. See ya in a while.");
        await ƒS.Character.hide(characters.Justice);
        await ƒS.Character.hide(characters.Yuri);
        await ƒS.Character.show(characters.Yuri, characters.Yuri.pose.normal, ƒS.positionPercent(75, 100));
        await ƒS.update(0.1);
        await ƒS.Speech.tell(characters.Yuri, "I'll bounce too. Good luck, choomba.");
        await ƒS.Speech.tell(characters.JJ, "Later, choom.");
        await ƒS.Location.show(locations.black);
        ƒS.Character.hideAll();
        ƒS.Sound.fade(music.noonBGM, 0, 2, true);
        await ƒS.update(2);
        
        return saveData.d1evening;
    }
} //await ƒS.Speech.tell(characters., ".");