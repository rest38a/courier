<template>
  <q-page class="q-pa-md items-start" style="max-width: 500px; margin: 0 auto;">

    <div v-if="!base" class="flex flex-center on-base">
      <q-btn color="primary" size="lg" label="На базе" @click="onHandleBase" />
    </div>
    <div v-else>
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
              <div>{{ item.updated_at | date('date') }}</div>
            </div>
            <div class="float-right">
              {{ item.delivery_time | date('time') }}<br>осталось
            </div>
            <div style="clear: both"></div>
            <div>{{ JSON.parse(item.address.address_json).string }}, {{ JSON.parse(item.address.address_json).apartment }}</div>
            <div>{{ item.payments.sum }} руб. {{ item.payments.payment_type ? 'наличные' : 'картой' }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div v-else class="text-h5 text-center" style="margin-top: 50%">
        У вас нет активных заказов
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Order",
  data: () => ({
    loading: true,
    base: true
  }),
  mounted () {
    this.$store.dispatch('fetchOrder', 1)
  },
  computed: {
    ...mapGetters(['getOrders'])
  },
  methods: {
    clickToOrderItem (id) {
      this.$router.push({ name: 'orderById', params: { id: id } })
    },
    onHandleBase () {
      this.$store.dispatch('sendOnBase', 1)
        .then(res => {}).catch(err => {})
    }
  }
}
</script>

<style scoped>
  .on-base{
    height: 80vh;
  }
</style>
