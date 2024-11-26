import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { searchUserErrorAction, searchUserSuccessAction } from "../reducers/home";
import { getUserAPI, getListAPI } from "./api";
import type { GetUsersPayloadType, User, GetUserPayloadType } from "../utils/types";
import { getUsersEndReachedAction, getUsersErrorAction, getUsersSuccessAction } from "../reducers/users";
import { getUserErrorAction, getUserSuccessAction } from "../reducers/user";


export default function* () {
    yield all([
        fork(app)
    ]);
};

function* app() {
    yield takeLatest("home/searchUserAction", getUser);
    yield takeLatest("user/getUserAction", getUser);
    yield takeLatest("users/getUsersAction", getUsers);
}

function* getUser({ payload: { id, userPage } }: PayloadAction<GetUserPayloadType>): SagaIterator<void> {

    const result = yield call(getUserAPI, id);

    if (result === "User Not Found") {
        if (userPage) {
            yield put(getUserErrorAction({ error: result, id }));
        } else {
            yield put(searchUserErrorAction(result));
        }
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
        if (userPage) {
            yield put(getUserSuccessAction(payload));
        } else {
            yield put(searchUserSuccessAction(payload));
        }
    }

};

function* getUsers({ payload: { id, type, pageNumber } }: PayloadAction<GetUsersPayloadType>): SagaIterator<void> {

    const result = yield call(getListAPI, id, type, pageNumber);

    if (result === "Something went wrong!") {
        if (pageNumber && pageNumber > 1) {
            yield put(getUsersEndReachedAction({ id, reached: true }));
        } else {
            yield put(getUsersErrorAction({ error: result, id }));
        }
    } else {
        let usersList: User[] = []
        result.forEach((user: any) => {
            user = {
                id: user.id,
                userName: user.login,
                avatar: user.avatar_url,
            }
            usersList.push(user)
        });
        yield put(getUsersSuccessAction({ users: usersList, pageNumber: pageNumber ?? 1, id }));
    }

};

