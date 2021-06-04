declare namespace Droidhaven {
    function restaurant(): ƒS.SceneReturn;
}
declare namespace Droidhaven {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let sound: {
        backgroundTheme: string;
        restaurant: string;
    };
    let locations: {
        restaurant: {
            name: string;
            background: string;
        };
    };
    let characters: {
        Karen: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
            };
        };
        Waiter: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
            };
        };
    };
    function signalDelay(seconds: number): Promise<ƒS.Signal>;
}
