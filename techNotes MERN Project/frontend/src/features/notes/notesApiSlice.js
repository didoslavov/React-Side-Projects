import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice.js';

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => '/notes',
            validateState: (response, result) => {
                return response.status === 20 && !result.isError;
            },
            keepUnusedDataFor: 5, // Keeps unused data for 5sec, remove when deploy!
            transformResponse: (responseData) => {
                const loadedNotes = responseData.map((u) => {
                    u.id = u._id;
                    return u;
                });

                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{ type: 'Note', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Note', id }``))];
                } else {
                    return [{ type: 'Note', id: 'LIST' }];
                }
            },
        }),
    }),
});

export const { useGetNotesQuery } = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(selectNotesResult, (noteResult) => noteResult.data);

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);
