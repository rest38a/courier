/**
 * Получение списка активных заказов
 */
export function fetchOrder ({ commit, getters }, user) {
  return new Promise((resolve, reject) => {
    this.$axios.get(`${getters.getBaseUrl}/api/deliveryman/activeorders/${user}`)
      .then(res => {
        commit('setOrders', res.data)
        resolve(res.data.orders)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Получение одного заказа
 */
export function fetchOrderById ({ commit, getters }, id) {
  return new Promise((resolve, reject) => {
    this.$axios.get(`${getters.getBaseUrl}/`)
      .then(res => {
        commit('setOrder', res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Доставка заказа
 */
export function orderDelivery ({ getters }, order) {
  return new Promise((resolve, reject) => {
    this.$axios.post(`${getters.getBaseUrl}/api/deliveryman/order/done`, order)
      .then(res => {
        resolve(res.data.state)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * Отмена заказа
 */
export function orderCancel ({ getters }, order) {
  return new Promise((resolve, reject) => {
    this.$axios.post(`${getters.getBaseUrl}/api/deliveryman/order/cancel`, order)
      .then(res => {
        resolve(res.data.state)
      })
      .catch(err => {
        reject(err)
      })
  })
}
