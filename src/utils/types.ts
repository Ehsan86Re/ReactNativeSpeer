type User = {
    id: number,
    userName: string,
    name: string,
    avatar: string,
    following: number,
    followers: number,
    description?: string
};

type HomeStateType = {
    data: User | null,
    loading: boolean,
    error: string
}

type GetUserPayloadType = {
    id: string,
    userPage?: boolean
}


export type { User, GetUserPayloadType, HomeStateType };
