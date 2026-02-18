import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "../Slices/AuthSlice";
import UploadMediaReducer from "../Slices/UploadMediaSlice";
import GetMediaReducer from "../Slices/GetMediaSlice";
import DeleteMediaReducer from "../Slices/DeleteMediaSlice";
import ViewMediaReducer from "../Slices/ViewMediaSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    UploadMedia: UploadMediaReducer,
    GetMedia: GetMediaReducer,
    DeleteMedia: DeleteMediaReducer,
    ViewMedia: ViewMediaReducer,
});
const Store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export default Store;
