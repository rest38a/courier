<template>
  <q-page class="q-pa-md items-start" style="max-width: 500px; margin: 0 auto;">
    <div v-if="getOrder">
      <q-btn size="md" icon="arrow_back" label="Назад" type="button" color="primary" @click="back" class="q-mb-md"/>
      <div class="row q-mb-md">
        <div class="col">
          <div class="q-mb-md"><span class="text-weight-bold">Заказ:</span> {{ getOrder.id }}</div>
          <div><span class="text-weight-bold">Время доставки:</span><br><span class="text-h5">{{ getOrder.updated_at | date('date') }}</span></div>
        </div>
        <div class="col text-right">
          <div class="text-h5">{{ getOrder.delivery_time | date('time') }}</div>
          <div>осталось</div>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <div class="q-mb-sm text-weight-bold">{{ getOrder.client.name }}</div>
          <div><q-btn color="white" text-color="black" :label="getOrder.phone.phone" /></div>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <div class="text-weight-bold">Адрес доставки:</div>
          <div class="q-mb-sm">{{ getAddress }}</div>
          <div><q-btn color="white" text-color="black" label="Посмотреть на карте" @click="dialog = !dialog" /></div>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <div class="text-weight-bold">Состав:</div>
          <div class="row" v-for="item of getOrder.products" :key="item.id">
            <div class="col col-auto">{{ item.name }}</div>
            <div class="col text-right"><!--{{ item.count }}--> шт.</div>
            <div class="col text-right"><!--{{ item.product.base_price }}--> руб.</div>
          </div>
        </div>
      </div>
      <div class="row q-mb-md">
        <div class="col">
          <div class="text-weight-bold">Оплата: </div>
          <div class="row">
            <div class="col"><!--{{ getOrder.payments.isPaid }}--></div>
            <div class="col text-right">{{ getOrder.payments[0].sum }} руб.</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-btn-group spread>
            <q-btn size="md" color="red" push label="Отмена" @click="setCancelOrDelivery('cancel')" />
            <q-btn size="md" style="background: goldenrod; color: white" push label="Заказ доставлен" @click="setCancelOrDelivery('delivery')" />
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
            <q-btn
              flat
              label="Продолжить"
              color="primary"
              v-close-popup
              @click="onCancelOrDelivery" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialog" :position="position">
        <q-card>
          <q-card-section>
            <div id="info">
              <div class="text-weight-bold">Адрес доставки</div>
              <p>{{ getAddress }}</p>
            </div>
            <div id="map"></div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "OrderItem",
  data: () => ({
    confirm: false,
    dialog: false,
    position: 'bottom',
    cancelOrDelivery: '',
    yandexMapScript: null,
    apiKey: '83aafa99-0b83-4e89-908a-dc88d325158d'
  }),
  mounted() {
    this.$store.dispatch('fetchOrder', 1)
  },
  beforeUpdate() {
    if (this.dialog) {
      this.yandexMapScript = document.createElement('script')
      this.yandexMapScript.setAttribute('src', `https://api-maps.yandex.ru/2.1/?&apikey=${this.apiKey}&lang=ru_RU`)
      this.yandexMapScript.setAttribute('async', '');
      this.yandexMapScript.setAttribute('defer', '');

      document.head.appendChild(this.yandexMapScript);

      this.yandexMapScript.onload = () => {
        ymaps.ready(() => {
          this.geoFind();
        });
      };
    } else {
      if (this.yandexMapScript) {
        this.yandexMapScript.remove()
      }
    }
  },
  computed: {
    ...mapGetters(['getOrders']),
    getOrder () {
      return this.getOrders.filter(item => item.id === +this.$route.params.id)[0]
    },
    getAddress () {
      return `Иркутск, ${JSON.parse(this.getOrder.address.address_json).string}, ${JSON.parse(this.getOrder.address.address_json).apartment}`
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'order' })
    },
    setCancelOrDelivery (value) {
      this.cancelOrDelivery = value
      this.confirm = !this.confirm
    },
    onCancelOrDelivery () {
      if (this.cancelOrDelivery === 'delivery') {
        this.orderDelivery()
      } else {
        this.orderCancel()
      }
    },
    orderCancel () {
      this.$store.dispatch('orderCancel', {
        id: this.getOrder.id,
        time: new Date()
      }).then(res => {}).catch(err => {})
    },
    orderDelivery () {
      this.$store.dispatch('orderDelivery', {
        id: this.getOrder.id,
        time: new Date()
      }).then(res => {}).catch(err => {})
    },
    geoFind () {
      if (!navigator.geolocation) {
        this.$q.notify({
          type: 'negative',
          message: 'Геолокация не поддерживается вашим браузером.'
        })
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.initMap(latitude, longitude)
        }, err => {
          this.$q.notify({
            type: 'negative',
            message: `Ошибка(${err.code}): ${err.message}`
          })
        });
      }
    },
    initMap (latitude, longitude) {
      if (!window.ymaps || !ymaps.GeoObjectCollection) return;

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          [latitude, longitude],
          this.getAddress
        ],
        params: {
          results: 2
        }
      }, {
        boundsAutoApply: true
      });

      this.myMap = new ymaps.Map('map', {
        center: [52.287054, 104.281047],
        zoom: 7
      });

      this.myMap.geoObjects.add(multiRoute);
    }
  }
}
</script>

<style scoped>
  #map {
    width: 100%;
    height: 400px;
  }
</style>
