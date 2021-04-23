declare namespace Droidhaven {
    function Text(): ƒS.SceneReturn;
}
declare namespace Droidhaven {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let transitions: {
        clock: {
            duration: number;
            alpha: string;
            edge: number;
        };
    };
    let sound: {
        backgroundTheme: string;
        click: string;
    };
    let locations: {
        school: {
            name: string;
            background: string;
        };
    };
    let characters: {
        Thoughts: {
            name: string;
        };
        Protagonist: {
            name: string;
        };
        Nanako: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
                smile: string;
            };
        };
    };
}
