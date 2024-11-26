import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersStateType, GetUsersPayloadType } from "../utils/types"

const initialState: UsersStateType = {}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersAction: (state: UsersStateType, { payload: { id } }: PayloadAction<GetUsersPayloadType>) => {
      state[id] = {
        ...state[id],
        loading: true,
        error: '',
      }
    },
    getUsersSuccessAction: (state: UsersStateType, { payload: { users, pageNumber, id } }: PayloadAction<{ users: User[], pageNumber: number, id: string }>) => {
      state[id] = {
        loading: false,
        data: pageNumber != 1 && state[id]['data'] ? [...state[id]['data'], ...users] : users,
        error: '',
        endReached: false,
      }
    },
    getUsersErrorAction: (state: UsersStateType, { payload: { error, id } }: PayloadAction<{ error: string, id: string }>) => {
      state[id] = {
        loading: false,
        data: null,
        error: error,
        endReached: false,
      }
    },
    getUsersEndReachedAction: (state: UsersStateType, { payload: { reached, id } }: PayloadAction<{ reached: boolean, id: string }>) => {
      state[id] = {
        loading: false,
        data: state[id]['data'],
        error: '',
        endReached: true,
      }
    },
  }
});

export const {
  getUsersAction,
  getUsersSuccessAction,
  getUsersErrorAction,
  getUsersEndReachedAction
} = usersSlice.actions;

export default usersSlice.reducer;