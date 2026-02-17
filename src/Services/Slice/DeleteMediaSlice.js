import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../Constants/Constants';

const initialState = {
    deleteStatus: 'idle',
    error: null,
};

export const deleteMedia = createAsyncThunk(
    'DeleteMedia/deleteMedia',
    async ({ mediaId }) => {
        try {
            const payload = { mediaId };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            };

            const response = await axios.post(`${serverUrl}/o/mediaApplication/deleteMedia`, payload, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const DeleteMediaSlice = createSlice({
    name: 'DeleteMedia',
    initialState,
    reducers: {
        resetDeleteMediaState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteMedia.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(deleteMedia.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
            })
            .addCase(deleteMedia.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetDeleteMediaState } = DeleteMediaSlice.actions;
export default DeleteMediaSlice.reducer;
