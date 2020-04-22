export function setOrders (state, data) {
  state.orders = data.orders
  state.server_time = data.serverTime
}

export function setOrder (state, order) {
  state.order = order
}
