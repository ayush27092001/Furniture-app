import { put, takeLatest } from "redux-saga/effects";
import { ADD_CART_START, DELETE_CART_START, GET_CART_START, UPDATE_CART_START } from "../constant/cart.constant ";
import { addCartError, deleteCartError, getCartError, getCartStart, getCartSuccess, updateCartError } from "../action/cart.action";
import { addCartToApi, deleteCartToApi, getCartFromApi, updateCartToApi } from "../services/cart.service";


function* getCart() {
   try {
      let response = yield getCartFromApi()
      yield put(getCartSuccess(response))
   } catch (error) {
      yield put(getCartError(error.message))
   }


}

function* addCart({ payload }) {
   try {
      yield addCartToApi(payload.cartItemObject, payload.userId)
      yield put(getCartStart())
   } catch (error) {
      yield put(addCartError(error.message))
   }
}

function* updateCart({ payload }) {
   try {
      console.log(payload);
      yield updateCartToApi(payload)
      yield put(getCartStart())
   } catch (error) {
      yield put(updateCartError(error.message))
   }
}

function* deleteCart({ payload }) {
   try {
      console.log(payload);
      yield deleteCartToApi(payload)
      yield put(getCartStart())
   } catch (error) {
      yield put(deleteCartError(error.message))
   }
}



export function* Cart() {
   yield takeLatest(GET_CART_START, getCart)
   yield takeLatest(ADD_CART_START, addCart)
   yield takeLatest(UPDATE_CART_START, updateCart)
   yield takeLatest(DELETE_CART_START, deleteCart)

}