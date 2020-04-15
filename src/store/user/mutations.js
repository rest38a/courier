export function auth_success (state, token) {
  state.status = 'success'
  state.token = token
}

export function auth_error (state) {
  state.status = 'error'
}

export function logout ( state ) {
  state.status = ''
  state.token = ''
}

export function set_user ( state, user ) {
  state.user = user
}
