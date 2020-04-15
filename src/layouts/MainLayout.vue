<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="account_box" style="font-size: 3rem;" />

        <q-toolbar-title>{{ user.login }}</q-toolbar-title>

        <q-btn flat round dense icon="ion-log-out" label="Выйти" @click="logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data: () => ({
    user: ''
  }),
  mounted () {
    this.user = this.$store.getters.getFakeUser
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'login' }))
        .catch(err => {
          throw err
        })
    }
  }
}
</script>
