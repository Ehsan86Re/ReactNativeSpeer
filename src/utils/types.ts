type User = {
    id: number,
    userName: string,
    name: string,
    avatar: string,
    following: number,
    followers: number,
    description?: string
};

type UserStateType = Record<string, {
    data: User | null,
    loading: boolean,
    error: string
}>

type HomeStateType = {
    data: User | null,
    loading: boolean,
    error: string
}

type UsersStateType = Record<string, {
    data: User[] | null,
    loading: boolean,
    error: string,
    endReached: boolean
}>

type GetUsersPayloadType = {
    id: string,
    type: 'following' | 'followers',
    pageNumber?: number
}

type GetUserPayloadType = {
    id: string,
    userPage?: boolean
}


export type { User, UserStateType, UsersStateType, GetUsersPayloadType, GetUserPayloadType, HomeStateType };
