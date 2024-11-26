import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UserStateType, GetUserPayloadType } from "../utils/types"

const initialState: UserStateType = {}

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserAction: (state: UserStateType, { payload: { id } }: PayloadAction<GetUserPayloadType>) => {
        state = {
            ...state,
            [id]: {
                loading: true,
                error: '',
                data: null
            }
        }
    },
    getUserSuccessAction: (state: UserStateType, { payload: user }: PayloadAction<User>) => {
        state[user.userName] = {
            loading: false,
            error: '',
            data: user
        }
    },
    getUserErrorAction: (state: UserStateType, { payload: { error, id } }: PayloadAction<{ error: string, id: string }>) => {
        state[id] = {
            loading: false,
            error: error,
            data: null
        }
    },
    getUserResetAction: (state: UserStateType, { payload: id }: PayloadAction<string>) => {
        state[id] = {
            loading: true,
            error: '',
            data: null
        }
    },
  }
});

export const {
  getUserAction,
  getUserSuccessAction,
  getUserErrorAction,
  getUserResetAction
} = usersSlice.actions;

export default usersSlice.reducer;