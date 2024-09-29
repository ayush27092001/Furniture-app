import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "../reducer/root.reducer";
import createSagaMiddleware from 'redux-saga'

import { root } from "../saga/root.saga";


const sagaMiddleWare = createSagaMiddleware()


const store = configureStore({
    reducer: RootReducer,
    middleware: (middleware) => middleware({
        serializableCheck: false,
    }).concat(sagaMiddleWare),
    devTools: process.env.NODE_ENV !== "production" ? true : false

})

sagaMiddleWare.run(root)

export default store;