<template>
  <q-page class="q-pa-md items-start" style="max-width: 500px; margin: 0 auto;">

    <div v-if="getOrders.length">
      <q-card
        v-for="item of getOrders"
        :key="item.id"
        class="my-card q-mb-sm"
        @click="clickToOrderItem(item.id)"
      >
        <q-card-section>
          <div class="float-left">
            <div>Номер заказа: {{ item.id }}</div>
            <div>{{ item.deliveryInfo.date }}</div>
          </div>
          <div class="float-right">
            {{ item.deliveryInfo.time }}<br>осталось
          </div>
          <div style="clear: both"></div>
          <div>{{ item.clientInfo.addressString }}</div>
          <div>{{ item.payments.sum }} руб. {{ item.payments.isPaid }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="text-h5 text-center" style="margin-top: 50%">
        У вас нет активных заказов
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Order",
  data: () => ({
    loading: true
  }),
  mounted () {
  },
  computed: {
    ...mapGetters(['getOrders'])
  },
  methods: {
    clickToOrderItem (id) {
      this.$router.push(`/order/${id}`)
    }
  }
}
</script>

<style scoped>

</style>
