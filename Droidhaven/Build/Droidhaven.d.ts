declare namespace Droidhaven {
    function Text(): ƒS.SceneReturn;
}
declare namespace Droidhaven {
    function mageClass(): ƒS.SceneReturn;
}
declare namespace Droidhaven {
    export import ƒ = FudgeCore;
    export import ƒS = FudgeStory;
    let saveData: {
        ProtagName: {
            name: string;
        };
        ProtagClass: {
            name: string;
            level: number;
        };
    };
    let transitions: {
        car: {
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
        school_outside: {
            name: string;
            background: string;
        };
        teacherroom_outside: {
            name: string;
            background: string;
        };
        classroom_front: {
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
        Dorothy: {
            name: string;
            origin: ƒ.ORIGIN2D;
            pose: {
                normal: string;
                smile: string;
            };
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
    function signalDelay(seconds: number): Promise<ƒS.Signal>;
}
