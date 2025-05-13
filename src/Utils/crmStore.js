import { configureStore } from "@reduxjs/toolkit";
import { roleAndRightReducer } from "./Slices/roleAndRightSlice";
import { useInfoReducers } from "./Slices/userInfoSlice";
import { systemReducers } from "./Slices/systemSlice";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import ciperText from "../Private/ciperText";

const persistConfig = {
    key: "root", 
    storage, 
    transforms:[ciperText],
    whitelist: ["permisions", "user","system"],
}; 

const rootReducer= combineReducers({
    permisions:roleAndRightReducer,
    user:useInfoReducers,
    system:systemReducers
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const crmStore=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor=persistStore(crmStore);
export default crmStore;