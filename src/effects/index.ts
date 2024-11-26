import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { searchUserErrorAction, searchUserSuccessAction } from "../reducers/home";
import { getUserAPI } from "./api";
import type { GetUserPayloadType } from "../utils/types";



export default function* () {
    yield all([
        fork(app)
    ]);
};

function* app() {
    yield takeLatest("home/searchUserAction", getUser);
}

function* getUser({ payload: { id } }: PayloadAction<GetUserPayloadType>): SagaIterator<void> {

    const result = yield call(getUserAPI, id);

    if (result === "User Not Found") {
        yield put(searchUserErrorAction(result));
    } else {
        let payload = {
            id: result.id,
            userName: result.login,
            name: result.name,
            avatar: result.avatar_url,
            following: result.following,
            followers: result.followers,
            description: result.bio
        }

        yield put(searchUserSuccessAction(payload));
    }

};