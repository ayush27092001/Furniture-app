import { put, takeLatest } from "redux-saga/effects";
import { REGISTER_START } from "../constant/authenticaton.constant";
import { registerError } from "../action/authentication.action";
import { registerUserFromApi } from "../services/authentication.service";




function* registerUser({ payload }) {
    try {
        yield registerUserFromApi(payload)

    } catch (error) {
        yield put(registerError(error.message))
    }
}




export function* Authentication() {
    yield takeLatest(REGISTER_START, registerUser)

}