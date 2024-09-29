import { put, takeLatest } from "redux-saga/effects";
import {  GET_ORDERS_START, PLACE_ORDER_START } from "../constant/order.constant";
import { getOrderError, getOrderStart, getOrderSuccess, placeOrderError } from "../action/order.action";
import { getCartStart } from "../action/cart.action";
import { getOrderFromApi, placeOrderToApi } from "../services/order.service";



function* getOrder() {
   try {
      let response = yield getOrderFromApi()
      yield put(getOrderSuccess(response))
   } catch (error) {
      yield put(getOrderError(error.message))
   }

}


function* PlaceOrder({ payload }) {
   try {
      yield placeOrderToApi(payload)
      yield put(getOrderStart())
      yield put(getCartStart())
   } catch (error) {
      yield put(placeOrderError(error.message))
   }
}




export function* order() {
   yield takeLatest(GET_ORDERS_START, getOrder)
   yield takeLatest(PLACE_ORDER_START, PlaceOrder)

}