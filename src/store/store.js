import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import issueReducer from './slices/issueSlice';
import updateReducer from './slices/updateSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        issues: issueReducer,
        updates: updateReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore timestamp fields (LocalDateTime from backend comes as array)
                ignoredPaths: ['auth.user.createdAt', 'issues.currentIssue.createdAt', 'issues.currentIssue.resolvedAt'],
                ignoredActionPaths: ['payload.createdAt', 'payload.resolvedAt', 'payload.user.createdAt'],
            },
        }),
});

export default store;
