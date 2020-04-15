export function isLoggedIn ( state ) {
  return !!state.token
}

export function authStatus ( state ) {
  return state.status
}

export function getToken ( state ) {
  return state.token
}

export function getUser ( state ) {
  return state.user
}

export function getFakeUser ( state ) {
  return state.fakeUser
}
