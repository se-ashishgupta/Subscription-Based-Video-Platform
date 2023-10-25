import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, {
    createCourseRequest: (state) => {
        state.loading = true;
    },
    createCourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    createCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    getAdminStatsRequest: state => {
        state.loading = true;
    },
    getAdminStatsSuccess: (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.viewsCount = action.payload.viewsCount;
        state.subscriptionCount = action.payload.subscriptionCount;
        state.usersCount = action.payload.usersCount;
        state.subscriptionPercentage = action.payload.subscriptionPercentage;
        state.viewsPercentage = action.payload.viewsPercentage;
        state.usersPercentage = action.payload.usersPercentage;
        state.subscriptionProfit = action.payload.subscriptionProfit;
        state.viewsProfit = action.payload.viewsProfit;
        state.usersProfit = action.payload.usersProfit;
    },
    getAdminStatsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});