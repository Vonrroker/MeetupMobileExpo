export function userUpdateRequest(user) {
  return {
    type: '@user/UPDATE_REQUEST',
    payload: { user },
  };
}

export function userUpdateSuccess(user) {
  return {
    type: '@user/UPDATE_SUCCESS',
    payload: { user },
  };
}
