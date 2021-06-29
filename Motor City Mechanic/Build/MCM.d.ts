declare namespace MCM {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let saveData: {
        score: number;
        ended: boolean;
        state: {
            yero: number;
        };
        friendship: {
            Yuri: {
                state: string;
                happiness: number;
            };
            Ame: {
                state: string;
                happiness: number;
            };
        };
        waiting: boolean;
        d1evening: string;
        d1Ame: string;
        d1YuriUpgrade: string;
    };
    let miniGameAnswer: string[];
    let volume: number;
    let playing: string;
    function incrementVolume(): void;
    function decrementVolume(): void;
    let music: {
        moringBGM: string;
        noonBGM: string;
        eveningBGM: string;
        partyBGM: string;
    };
    function higherFriendship(person: any, value: number): void;
    function lowerFriendship(person: any, value: number): void;
    let menu: HTMLDialogElement;
    let money: HTMLDialogElement;
    let checklist: HTMLDialogElement;
    let locations: {
        JJ_apartement_out: {
            name: string;
            background: string;
        };
        JJ_apartement_in: {
            name: string;
            background: string;
        };
        MC_street_day: {
            name: string;
            background: string;
        };
        workshop: {
            name: string;
            background: string;
        };
        kitchen: {
            name: string;
            background: string;
        };
        black: {
            name: string;
            background: string;
        };
        carscanner: {
            name: string;
            background: string;
        };
    };
    let characters: {
        Thoughts: {
            name: string;
        };
        JJ: {
            name: string;
        };
        Justice: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                smile: string;
                angry: string;
                sad: string;
                thinking: string;
                closed: string;
            };
        };
        Unknown: {
            name: string;
        };
        Amelia: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                smile: string;
                angry: string;
                sad: string;
                questioning: string;
            };
        };
        Yuri: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                happy: string;
                angry: string;
                sad: string;
                thinking: string;
                explaining: string;
                wink: string;
                smug: string;
                surprised: string;
            };
        };
        MinigameOverlays: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                AmeD1: string;
            };
        };
    };
    let items: {
        Rum: {
            name: string;
            description: string;
            image: string;
        };
        Asacoco: {
            name: string;
            description: string;
            image: string;
        };
    };
    function checklistFiller(elements: string[][]): void;
    function minigameInput(): Promise<void>;
}
declare namespace MCM {
    function D1_Evening_Free(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_Evening_Party(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_Evening_Work(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_Morning(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_Noon(): ƒS.SceneReturn;
}
