declare interface User {
    id: number;
    fullName: string;
    email: string;
}

declare interface User2 {
    id: number;
    fullName: string;
    email: string;
    about: string;
    params: {
        id: string;
    };
}

