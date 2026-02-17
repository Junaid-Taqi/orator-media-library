import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../Constants/Constants';

const initialState = {
    mediaList: [],
    mediaStats: null,
    status: 'idle',
    error: null,
};

export const getAllMedia = createAsyncThunk(
    'GetMedia/getAllMedia',
    async ({ groupId, type }) => {
        try {
            const payload = { groupId, type };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            };

            const response = await axios.post(`${serverUrl}/o/mediaApplication/getAllMedia`, payload, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const GetMediaSlice = createSlice({
    name: 'GetMedia',
    initialState,
    reducers: {
        resetGetMediaState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMedia.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllMedia.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload.success) {
                    state.mediaList = action.payload.media;
                    state.mediaStats = action.payload.stats;
                }
            })
            .addCase(getAllMedia.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetGetMediaState } = GetMediaSlice.actions;
export default GetMediaSlice.reducer;
