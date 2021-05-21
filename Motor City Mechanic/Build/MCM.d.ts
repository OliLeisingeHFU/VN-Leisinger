declare namespace MCM {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let locations: {
        nightstreet: {
            name: string;
            background: string;
        };
    };
    let characters: {
        Thoughts: {
            name: string;
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
    function Drinking(): ƒS.SceneReturn;
}
