<template>
  <q-dialog v-model="dialog" :position="position" @hide="hideDialog">
    <q-card>
      <q-card-section>
        <div id="info">
          <div class="text-weight-bold">Адрес доставки</div>
          <p>{{ toAddress }}</p>
        </div>
        <div id="map"></div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "Map",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    toAddress: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      status: {},
      fromAddress: '',
      myMap: null,
      apiKey: '83aafa99-0b83-4e89-908a-dc88d325158d'
    }
  },
  mounted() {
    const map = document.createElement('script');
    map.setAttribute('src', `https://api-maps.yandex.ru/2.1/?&apikey=${this.apiKey}&lang=ru_RU`);
    document.head.appendChild(map);
  },
  updated () {
    this.geoFind();
  },
  methods: {
    hideDialog () {
      this.$emit('update-dialog', false)
    },
    geoFind () {
      if (!navigator.geolocation) {
        this.status.textContent = 'Геолокация не поддерживается вашим браузером';
      } else {
        this.status.textContent = 'Загрузка…';
        navigator.geolocation.getCurrentPosition(position => {

          // Получаем координаты.
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Инициализируем карту.
          this.initMap(latitude, longitude)

        }, err => {
          console.warn(`Ошибка(${err.code}): ${err.message}`);
        });
      }
    },
    initMap (latitude, longitude) {
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          // Координаты отправления.
          [latitude, longitude],
          // Координаты прибытия.
          this.toAddress
        ],
        params: {
          results: 2
        }
      }, {
        boundsAutoApply: true
      });

      // Создаем карту.
      this.myMap = new ymaps.Map('map', {
        center: [52.287054, 104.281047],
        zoom: 7
      }, {
        buttonMaxWidth: 300
      });

      // Добавляем маршрут на карту.
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
