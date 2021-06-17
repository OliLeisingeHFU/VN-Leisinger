declare namespace MCM {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let saveData: {
        score: number;
        ended: boolean;
        state: {
            scratch: number;
        };
    };
    function incrementVolume(): void;
    function decrementVolume(): void;
    let music: {
        backGroundTheme: string;
    };
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
        black: {
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
            };
        };
    };
    let items: {
        Rum: {
            name: string;
            description: string;
            image: string;
        };
    };
}
declare namespace MCM {
    function D1_Morning(): ƒS.SceneReturn;
}
