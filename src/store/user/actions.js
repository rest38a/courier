export function login ({ commit, getters }, user) {
  return new Promise((resolve, reject) => {
    if (user.login === 'demo' && user.password === 'demo') {
      const token = 'token' + Math.floor(Math.random() * (999 - 888)) + 888
      localStorage.setItem('token', token)
      commit('auth_success', token)
      commit('set_user', user)
      resolve()
    } else {
      commit('auth_error')
      localStorage.removeItem('token')
      reject()
    }
  })
}

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    resolve()
  })
}

