import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice.js';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            validateState: (response, result) => {
                return response.status === 20 && !result.isError;
            },
            keepUnusedDataFor: 5, // Keeps unused data for 5sec, remove when deploy!
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((u) => {
                    u.id = u._id;
                    return u;
                });

                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{ type: 'User', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'User', id }``))];
                } else {
                    return [{ type: 'User', id: 'LIST' }];
                }
            },
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(selectUsersResult, (userResult) => userResult.data);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
