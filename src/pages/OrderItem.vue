<template>
  <q-page class="q-pa-md items-start" style="max-width: 500px; margin: 0 auto;">
    <q-btn size="md" icon="arrow_back" label="Назад" type="button" color="primary" @click="back" class="q-mb-md"/>
    <div class="row q-mb-md">
      <div class="col">
        <div class="q-mb-md"><span class="text-weight-bold">Заказ:</span> {{ getOrder.id }}</div>
        <div><span class="text-weight-bold">Время доставки:</span><br><span class="text-h5">{{ getOrder.deliveryInfo.date }}</span></div>
      </div>
      <div class="col text-right">
        <div class="text-h5">{{ getOrder.deliveryInfo.time }}</div>
        <div>осталось</div>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <div class="q-mb-sm text-weight-bold">{{ getOrder.clientInfo.client.name }}</div>
        <div><q-btn color="white" text-color="black" :label="getOrder.clientInfo.phoneString" /></div>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <div class="text-weight-bold">Адрес доставки:</div>
        <div class="q-mb-sm">{{ getOrder.clientInfo.addressString }}</div>
        <div><q-btn color="white" text-color="black" label="Посмотреть на карте" @click="openDialog" /></div>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <div class="text-weight-bold">Состав:</div>
        <div class="row" v-for="item of getOrder.products" :key="item.id">
          <div class="col col-auto">{{ item.name }}</div>
          <div class="col text-right">{{ item.count }} шт.</div>
          <div class="col text-right">{{ item.price }} руб.</div>
        </div>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col">
        <div class="text-weight-bold">Оплата: </div>
        <div class="row">
          <div class="col">{{ getOrder.payments.isPaid }}</div>
          <div class="col text-right">{{ getOrder.payments.sum }} руб.</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-btn-group spread>
          <q-btn size="md" color="red" push label="Отмена" @click="confirm = !confirm" />
          <q-btn size="md" style="background: goldenrod; color: white" push label="Заказ доставлен" @click="confirm = !confirm" />
        </q-btn-group>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Подтвердите ваше действие</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup />
          <q-btn flat label="Продолжить" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <Map
      :dialog="dialog"
      :position="position"
      :toAddress="getOrder.clientInfo.addressString"
      @update-dialog="updateDialog"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from 'components/Map'

export default {
  name: "OrderItem",
  data: () => ({
    confirm: false,
    dialog: false,
    position: 'bottom'
  }),
  components: {
    Map
  },
  computed: {
    ...mapGetters(['getOrders']),
    getOrder () {
      return this.getOrders.filter(item => item.id === +this.$route.params.id)[0]
    }
  },
  methods: {
    back () {
      this.$router.push('/order')
    },
    openDialog () {
      this.dialog = true
    },
    updateDialog (status) {
      this.dialog = status
    }
    /*clickToMap () {
      this.$router.push({ name: 'orderByIdMap', params: { address: this.getOrder.clientInfo.addressString } })
    }*/
  }
}
</script>

<style scoped>

</style>
