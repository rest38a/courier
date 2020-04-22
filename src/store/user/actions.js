import axios from 'axios'

/**
 * Аутентификация пользователя
 */
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

/**
 *
 * Выход пользователя из системы
 */
export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    resolve()
  })
}

/**
 * Отметка о нахождении на базе
 */
export function sendOnBase ({ getters }, id) {
  //console.log('onBase')
  return new Promise((resolve, reject) => {
    axios.post(`${getters.getBaseUrl}/api/deliveryman/onbase/`, id)
      .then(res => {
        console.log('успешно', res)
        resolve(res.data.state)
      })
      .catch(err => {
        console.log('ошибка', err)
        reject(err)
      })
  })
}
