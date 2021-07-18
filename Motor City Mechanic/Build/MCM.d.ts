declare namespace MCM {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    export let saveData: {
        score: number;
        started: boolean;
        ended: boolean;
        waiting: boolean;
        inv: boolean;
        sobbering: boolean;
        state: {
            yero: number;
        };
        happiness: number;
        friendship: {
            Yuri: {
                state: string;
                happiness: number;
            };
            Ame: {
                state: string;
                happiness: number;
            };
            Azami: {
                state: string;
                happiness: number;
            };
            Urban: {
                state: string;
                happiness: number;
            };
            Books: {
                state: string;
                happiness: number;
            };
        };
        drunkness: number;
        yuriRabbit: string;
        d1evening: string;
        d1Ame: string;
        d1YuriUpgrade: string;
        d1Dio: string;
        d1AfterPartyDate: string;
    };
    export let miniGameAnswer: string[];
    export let volume: number;
    export let playing: string;
    export function incrementVolume(): void;
    export function decrementVolume(): void;
    export let music: {
        moringBGM: string;
        noonBGM: string;
        eveningBGM: string;
        partyBGM: string;
        synthAdiago: string;
    };
    export function higherFriendship(person: any, value: number): void;
    export function lowerFriendship(person: any, value: number): void;
    export let yesno: {
        yes: string;
        no: string;
    };
    export function fadeToBlack(): Promise<void>;
    export function fadeToBlackMusicOff(): Promise<void>;
    export let menu: HTMLDialogElement;
    export let openinv: boolean;
    export let money: HTMLDialogElement;
    export let checklist: HTMLDialogElement;
    export let locations: {
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
        party: {
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
    export let characters: {
        Thoughts: {
            name: string;
        };
        Unknown: {
            name: string;
        };
        Speakers: {
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
        Amelia: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                happy: string;
                angry: string;
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
        Dio: {
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
        Nao: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                happy: string;
                surprised: string;
                sad: string;
            };
        };
        Azami: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                happy: string;
                surprised: string;
                angry: string;
                cute: string;
            };
        };
        Books: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                happy: string;
                surprised: string;
                sad: string;
                cute: string;
            };
        };
        Urban: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                normal: string;
                happy: string;
                surprised: string;
                angry: string;
            };
        };
        MinigameOverlays: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                pathtemplate: string;
                AmeD1: string;
                DioD1: string;
            };
        };
    };
    export let items: {
        Rum: {
            name: string;
            description: string;
            image: string;
            handler: typeof gettingDrunk;
        };
        Asacoco: {
            name: string;
            description: string;
            image: string;
            handler: typeof useAsacoco;
            static: boolean;
        };
        Stop: {
            name: string;
            description: string;
            image: string;
            handler: typeof stopDrinking;
        };
    };
    function gettingDrunk(): void;
    function useAsacoco(): Promise<void>;
    function stopDrinking(): void;
    export {};
}
declare namespace MCM {
    function End_Credits(): ƒS.SceneReturn;
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
declare namespace MCM {
    function D1_AfterParty_Ame(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_AfterParty_Azami(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_AfterParty_Books(): ƒS.SceneReturn;
}
declare namespace MCM {
    function D1_AfterParty_Urban(): ƒS.SceneReturn;
}
declare namespace MCM {
    function Ending_Depression(): ƒS.SceneReturn;
}
declare namespace MCM {
    function Ending_Normal(): ƒS.SceneReturn;
}
