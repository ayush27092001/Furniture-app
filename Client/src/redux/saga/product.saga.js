import { put, takeLatest } from "redux-saga/effects";
import { ADD_PRODUCT_START, DELETE_PRODUCT_START, GET_PRODUCT_START, UPDATE_PRODUCT_START } from "../constant/product.constant";
import { addProductError, deleteProductError, getProductError, getProductStart, getProductSuccess, updateProductError } from "../action/product.action";
import { addProductToApi, deleteProductToApi, getProductFromApi, updateProductToApi } from "../services/product.service";

function* getProduct() {
   try {
      let response = yield getProductFromApi()
      yield put(getProductSuccess(response))
   } catch (error) {
      yield put(getProductError(error.message))
   }


}

function* addProduct({ payload }) {
   try {
      console.log(payload);
      yield addProductToApi(payload)
      yield put(getProductStart())
   } catch (error) {
      yield put(addProductError(error.message))
   }
}

function* deleteProduct({ payload }) {
   try {

      yield deleteProductToApi(payload)
      yield put(getProductStart())
   } catch (error) {
      yield put(deleteProductError(error.message))
   }
}

function* updateProduct({ payload }) {
   try {

      yield updateProductToApi(payload.product, payload.id)
      yield put(getProductStart())
   } catch (error) {
      yield put(updateProductError(error.message))
   }
}


export function* product() {
   yield takeLatest(GET_PRODUCT_START, getProduct)
   yield takeLatest(ADD_PRODUCT_START, addProduct)
   yield takeLatest(DELETE_PRODUCT_START, deleteProduct)
   yield takeLatest(UPDATE_PRODUCT_START, updateProduct)
}