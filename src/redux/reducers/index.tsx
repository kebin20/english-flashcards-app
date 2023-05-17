import { combineReducers } from "@reduxjs/toolkit";

import isLoadingReducer from "./isLoadingReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  isLoading: isLoadingReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer;
