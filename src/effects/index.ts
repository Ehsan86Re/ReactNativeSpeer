import { all, call, fork, put, takeLatest } from "redux-saga/effects";


export default function* () {
    yield all([
        fork(app)
    ]);
};

function* app() {
}
