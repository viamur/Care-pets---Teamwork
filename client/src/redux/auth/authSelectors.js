export const getUserEmail = state => state.auth.email;
export const getUserToken = state => state.auth.accessToken;
export const getIsAuth = state => Boolean(state.auth.accessToken);
export const getAuthIsLoading = state => state.auth.isLoading;
export const getAuthError = state => state.auth.error;

export const getMustCurUser = state => state.auth.accessToken && !state.user.email;
