import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "../Slice/AuthSlice";
import UploadMediaReducer from "../Slice/UploadMediaSlice";
import GetMediaReducer from "../Slice/GetMediaSlice";
import DeleteMediaReducer from "../Slice/DeleteMediaSlice";
import ViewMediaReducer from "../Slice/ViewMediaSlice";


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
