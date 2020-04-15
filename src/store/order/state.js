export default function () {
  return {
    orders: [
      {
        id: 1,
        sourceId: 'process.env.sourceList.PHONE',
        comment: null,
        isDelete: false,
        isApprove: true,
        clientInfo: {
          client: {
            id: 1,
            name: 'Петров Петр',
            hash: '123',
          },
          phone: 1,
          phoneString: '8(999)999-99-99',
          addressString: 'Иркутск Трудовая улица, 115',
          address: {},
        },
        deliveryInfo: {
          date: '15:00',
          time: '12:59',
          type: Number,
        },
        payments: {
          sum: 12500,
          type: Number,
          isPaid: 'наличные'
        },
        products: [
          { id: 1, name: 'Пицца Пепперони', count: 2, price: 560 },
          { id: 2, name: 'Пицца Альфредо', count: 2, price: 560 },
        ]
      },
      {
        id: 2,
        sourceId: 'process.env.sourceList.PHONE',
        comment: null,
        isDelete: false,
        isApprove: true,
        clientInfo: {
          client: {
            id: 2,
            name: 'Иванов Иван',
            hash: '123',
          },
          phone: 2,
          phoneString: '8(888)888-88-88',
          addressString: 'Иркутск Волжская улица, 51',
          address: {},
        },
        deliveryInfo: {
          date: '15:00',
          time: '12:59',
          type: Number,
        },
        payments: {
          sum: 15250,
          type: Number,
          isPaid: 'наличные'
        },
        products: [
          { id: 1, name: 'Пицца Пепперони', count: 2, price: 560 },
          { id: 2, name: 'Пицца Альфредо', count: 2, price: 560 },
        ]
      },
      {
        id: 3,
        sourceId: 'process.env.sourceList.PHONE',
        comment: null,
        isDelete: false,
        isApprove: true,
        clientInfo: {
          client: {
            id: 3,
            name: 'Иванов Константин',
            hash: '123',
          },
          phone: 1,
          phoneString: '8(777)777-77-77',
          addressString: 'Иркутск улица Безбокова, 32/5',
          address: {},
        },
        deliveryInfo: {
          date: '15:00',
          time: '12:59',
          type: Number,
        },
        payments: {
          sum: 22140,
          type: Number,
          isPaid: 'картой'
        },
        products: [
          { id: 1, name: 'Пицца Пепперони', count: 2, price: 560 },
          { id: 2, name: 'Пицца Альфредо', count: 2, price: 560 },
        ]
      }
    ]
  }
}
