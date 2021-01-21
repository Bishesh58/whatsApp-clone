import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Components/features/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
