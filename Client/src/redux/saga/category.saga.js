import { put, takeLatest } from "redux-saga/effects";
import { ADD_CATEGORY_START, DELETE_CATEGORY_START, GET_CATEGORY_START, UPDATE_CATEGORY_START } from "../constant/category.constant";
import { addCategoryError, deleteCategoryError, getCategoryError, getCategoryStart, getCategorySuccess, updateCategoryError } from "../action/category.action";
import { addCategortToApi, deleteCategortToApi, getCategoryFromApi, updateCategortToApi } from "../services/category.service";

function* getCategory() {
   try {
      let response = yield getCategoryFromApi()
      yield put(getCategorySuccess(response))
   } catch (error) {
      yield put(getCategoryError(error.message))
   }


}

function* addCategory({ payload }) {
   try {

      yield addCategortToApi(payload)
      yield put(getCategoryStart())
   } catch (error) {
      yield put(addCategoryError(error.message))
   }
}

function* deleteCategory({ payload }) {
   try {

      yield deleteCategortToApi(payload)
      yield put(getCategoryStart())
   } catch (error) {
      yield put(deleteCategoryError(error.message))
   }
}

function* updateCategory({ payload }) {
   try {

      yield updateCategortToApi(payload.category, payload.id)
      yield put(getCategoryStart())
   } catch (error) {
      yield put(updateCategoryError(error.message))
   }
}


export function* category() {
   yield takeLatest(GET_CATEGORY_START, getCategory)
   yield takeLatest(ADD_CATEGORY_START, addCategory)
   yield takeLatest(DELETE_CATEGORY_START, deleteCategory)
   yield takeLatest(UPDATE_CATEGORY_START, updateCategory)
}