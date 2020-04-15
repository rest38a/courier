export function setOrders ( state, data ) {
  state.orders = data.orders
  state.server_time = data.server_time
}

export function setOrder ( state, order ) {
  state.order = order
}
