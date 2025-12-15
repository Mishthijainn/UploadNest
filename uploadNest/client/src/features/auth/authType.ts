
export interface RegisterPayloadType {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayloadType {
    email: string;
    password: string;
}

export interface LoginResponseType {
    accessToken: string;
    expiresAt: string;
    user: {
        id: string;
        name: string;
        email: string;
        profilePicture: string;
    },
    reportSetting: {
        id: string;
        frequency: string;
        isEnabled: boolean;
    }
}