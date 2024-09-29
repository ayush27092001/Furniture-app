import { REGISTER_ERROR, REGISTER_START, REGISTER_SUCCESS } from "../constant/authenticaton.constant"

export const registerStart = (user) => ({
    type: REGISTER_START,
    payload: user

})

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user
})

export const registerError = (error) => ({
    type: REGISTER_ERROR,
    payload: error
})

