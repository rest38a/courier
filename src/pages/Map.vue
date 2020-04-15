<template>
  <div class="parent">
    <div id="map"></div>
    <div class="information text-center">
      {{ route }}
    </div>
    <div class="button-bottom q-pa-md q-gutter-sm">
      <q-btn size="md" icon="arrow_back" label="Назад" type="button" color="primary" @click="back" class="q-mb-md"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mapp",
  data () {
    return {
      status: {},
      fromAddress: '',
      toAddress: this.$route.params.address,
      apiKey: '83aafa99-0b83-4e89-908a-dc88d325158d'
    }
  },
  mounted () {
    this.geoFind();
  },
  computed: {
    route () {
      return `${this.fromAddress} - ${this.toAddress}`
    }
  },
  methods: {
    geoFind () {
      if (!navigator.geolocation) {
        this.status.textContent = 'Геолокация не поддерживается вашим браузером';
      } else {
        this.status.textContent = 'Загрузка…';
        navigator.geolocation.getCurrentPosition(position => {

          // Получаем координаты.
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(latitude + ':', longitude);

          // Получаем адрес.
          this.$axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${this.apiKey}&geocode=${latitude},${longitude}`)
            .then(res => {
              //console.log('Адрес', res);
            })
            .catch(err => {
              throw err
            });

          // Инициализируем карту.
          ymaps.ready(this.init(latitude, longitude))
        }, err => {
          console.warn(`Ошибка(${err.code}): ${err.message}`);
        });
      }
    },
    init (latitude, longitude) {
      /**
       * Создаем мультимаршрут.
       * Первым аргументом передаем модель либо объект описания модели.
       * Вторым аргументом передаем опции отображения мультимаршрута.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
       */
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: [
          [latitude, longitude],
          this.toAddress
        ],
        // Параметры маршрутизации.
        params: {
          // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
          results: 2
        }
      }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true
      });

      console.log(multiRoute.getWayPoints());

      // Создаем кнопки для управления мультимаршрутом.
      const trafficButton = new ymaps.control.Button({
          data: { content: "Учитывать пробки" },
          options: { selectOnClick: true }
        }),
        viaPointButton = new ymaps.control.Button({
          data: { content: "Добавить транзитную точку" },
          options: { selectOnClick: true }
        });

      // Объявляем обработчики для кнопок.
      trafficButton.events.add('select', function () {
        /**
         * Задаем параметры маршрутизации для модели мультимаршрута.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml#setParams
         */
        multiRoute.model.setParams({ avoidTrafficJams: true }, true);
      });

      trafficButton.events.add('deselect', function () {
        multiRoute.model.setParams({ avoidTrafficJams: false }, true);
      });

      viaPointButton.events.add('select', function () {
        const referencePoints = multiRoute.model.getReferencePoints();
        referencePoints.splice(1, 0, "Москва, ул. Солянка, 7");
        /**
         * Добавляем транзитную точку в модель мультимаршрута.
         * Обратите внимание, что транзитные точки могут находится только
         * между двумя путевыми точками, т.е. не могут быть крайними точками маршрута.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml#setReferencePoints
         */
        multiRoute.model.setReferencePoints(referencePoints, [1]);
      });

      viaPointButton.events.add('deselect', function () {
        var referencePoints = multiRoute.model.getReferencePoints();
        referencePoints.splice(1, 1);
        multiRoute.model.setReferencePoints(referencePoints, []);
      });

      // Создаем карту с добавленными на нее кнопками.
      var myMap = new ymaps.Map('map', {
        center: [52.287054, 104.281047],
        zoom: 7,
        controls: [trafficButton, viaPointButton]
      }, {
        buttonMaxWidth: 300
      });

      // Добавляем мультимаршрут на карту.
      myMap.geoObjects.add(multiRoute);
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  #map {
    height: 80vh;
  }
  .button-bottom {
    height: 10vh;
  }
</style>
