export const menu = {
  ediya: {
    categories: ['커피', '음료', '디저트', '베이커리'],
    menusByCategory: {
      커피: [
        {
          id: 'americano',
          name: '아메리카노',
          price: 3200,
          description: '이디야 블렌드 원두로 추출한 에스프레소 아메리카노',
          image: '/images/ediya/americano.jpg',
          optionCategories: ['serving', 'temperature', 'shot', 'size'],
        },
        {
          id: 'cafe-latte',
          name: '카페라떼',
          price: 3700,
          description: '부드러운 우유와 진한 에스프레소의 조화',
          image: '/images/ediya/cafe-latte.jpg',
          optionCategories: ['serving', 'temperature', 'shot', 'size', 'milk'],
        },
      ],
      음료: [
        {
          id: 'sweet-peach-iced-tea',
          name: '복숭아 아이스티',
          price: 3500,
          description: '달콤한 복숭아와 홍차의 만남',
          image: '/images/ediya/peach-tea.jpg',
          optionCategories: ['serving', 'ice'],
        },
      ],
    },
    optionCategories: {
      serving: {
        id: 'serving',
        name: '매장/포장',
        type: 'single',
        required: true,
        displayOrder: 1,
        options: [
          { id: 'dine-in', name: '매장', price: 0 },
          { id: 'take-out', name: '포장', price: 0 },
        ],
      },
      temperature: {
        id: 'temperature',
        name: '온도',
        type: 'single',
        required: true,
        displayOrder: 2,
        options: [
          { id: 'hot', name: 'HOT', price: 0 },
          { id: 'iced', name: 'ICED', price: 0 },
        ],
      },
      size: {
        id: 'size',
        name: '사이즈',
        type: 'single',
        required: true,
        displayOrder: 3,
        options: [
          { id: 'regular', name: 'Regular', price: 0 },
          { id: 'extra', name: 'Extra', price: 500 },
        ],
      },
      shot: {
        id: 'shot',
        name: '샷 추가',
        type: 'multiple',
        required: false,
        max: 3,
        displayOrder: 4,
        options: [{ id: 'extra-shot', name: '샷 추가', price: 500 }],
      },
      milk: {
        id: 'milk',
        name: '우유 선택',
        type: 'single',
        required: false,
        displayOrder: 5,
        options: [
          { id: 'regular-milk', name: '일반 우유', price: 0 },
          { id: 'low-fat', name: '저지방 우유', price: 0 },
          { id: 'soy-milk', name: '두유', price: 500 },
          { id: 'oat-milk', name: '오트밀크', price: 500 },
        ],
      },
      ice: {
        id: 'ice',
        name: '얼음량',
        type: 'single',
        required: false,
        displayOrder: 6,
        options: [
          { id: 'regular-ice', name: '보통', price: 0 },
          { id: 'less-ice', name: '적게', price: 0 },
          { id: 'no-ice', name: '없음', price: 0 },
        ],
      },
    },
  },
};
