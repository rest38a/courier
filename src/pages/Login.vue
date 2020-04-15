<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 400px">
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          outlined
          v-model="login"
          label="Логин"
          :rules="[ val => val && val.length > 0 || 'Введите логин']"
        />
        <q-input
          outlined
          v-model="password"
          label="Пароль"
          :rules="[ val => val && val.length > 0 || 'Введите пароль']"
        />
        <div class="text-center">
          <q-btn size="md" icon="input" label="Войти" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    login: null,
    password: null
  }),
  created () {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: 'order' })
    }
  },
  methods: {
    onSubmit () {
      const user = {
        login: this.login,
        password: this.password
      }
      this.$store.dispatch('login', user)
        .then(() => {
          this.$router.push({ name: 'order' })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: `Неправильно ввели логин или пароль.`
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
