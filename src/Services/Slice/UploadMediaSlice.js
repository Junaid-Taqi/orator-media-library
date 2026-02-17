import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../Constants/Constants';

const initialState = {
    uploadStatus: 'idle',
    error: null,
    uploadedMedia: [],
};

export const uploadMedia = createAsyncThunk(
    'UploadMedia/uploadMedia',
    async ({ files, groupId, userId, title }) => {
        try {
            const formData = new FormData();
            if (files && files.length > 0) {
                files.forEach((file) => {
                    formData.append('file', file);
                });
            }
            formData.append('groupId', groupId);
            formData.append('userId', userId);
            formData.append('title', title);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            };

            const response = await axios.post(`${serverUrl}/o/mediaApplication/uploadMedia`, formData, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const UploadMediaSlice = createSlice({
    name: 'UploadMedia',
    initialState,
    reducers: {
        resetUploadMediaState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadMedia.pending, (state) => {
                state.uploadStatus = 'loading';
            })
            .addCase(uploadMedia.fulfilled, (state, action) => {
                state.uploadStatus = 'succeeded';
                state.uploadedMedia = action.payload;
            })
            .addCase(uploadMedia.rejected, (state, action) => {
                state.uploadStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetUploadMediaState } = UploadMediaSlice.actions;
export default UploadMediaSlice.reducer;
