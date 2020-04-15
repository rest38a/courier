export default function () {
  return {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    fakeUser: {
      login: 'demo',
      password: 'demo'
    }
  }
}
