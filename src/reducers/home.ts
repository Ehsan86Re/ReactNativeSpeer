import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GetUserPayloadType, User, HomeStateType } from "../utils/types"

const initialState: HomeStateType = {
    data: null,
    loading: false,
    error: ''
}

export const usersSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    searchUserAction: (state: HomeStateType, { payload }: PayloadAction<GetUserPayloadType>) => {
      state.loading = true;
      state.error = '';
    },
    searchUserSuccessAction: (state: HomeStateType, { payload: user }: PayloadAction<User>) => {
      state.loading = false;
      state.data = user;
      state.error = '';
    },
    searchUserErrorAction: (state: HomeStateType, { payload: error }: PayloadAction<string>) => {
      state.loading = false;
      state.error = error;
    },
    searchUserEmptyAction: (state: HomeStateType) => {
      state.loading = false;
      state.error = '';
      state.data = null;
    }
  }
});

export const {
  searchUserAction,
  searchUserSuccessAction,
  searchUserErrorAction,
  searchUserEmptyAction  
} = usersSlice.actions;

export default usersSlice.reducer;