import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../Constants/Constants';

const initialState = {
    viewStatus: 'idle',
    mediaUrl: null,
    mediaDetails: null,
    error: null,
};

export const viewMedia = createAsyncThunk(
    'ViewMedia/viewMedia',
    async ({ mediaId }) => {
        try {
            const payload = { mediaId };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            };

            const response = await axios.post(`${serverUrl}/o/mediaApplication/viewMedia`, payload, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const ViewMediaSlice = createSlice({
    name: 'ViewMedia',
    initialState,
    reducers: {
        resetViewMediaState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(viewMedia.pending, (state) => {
                state.viewStatus = 'loading';
            })
            .addCase(viewMedia.fulfilled, (state, action) => {
                state.viewStatus = 'succeeded';
                if (action.payload.success) {
                    state.mediaUrl = action.payload.url;
                    state.mediaDetails = action.payload; // Store full details just in case
                }
            })
            .addCase(viewMedia.rejected, (state, action) => {
                state.viewStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetViewMediaState } = ViewMediaSlice.actions;
export default ViewMediaSlice.reducer;
