import { all, fork } from "redux-saga/effects";
import { category } from "./category.saga";
import { product } from "./product.saga";
import { user } from "./user.saga";
import { Cart } from "./cart.saga";
import { order } from "./order.saga";
import { Authentication } from "./authentication.saga";

export function* root(){
    yield all([
        fork(category),
        fork(product),
        fork(user),
        fork(Cart),
        fork(order),
        fork(Authentication)
    ])
}