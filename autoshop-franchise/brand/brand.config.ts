export const brandConfig = {
  identity: {
    name: "Royal Motors Shymkent",
    description: "Автосалон в Шымкенте. Trade-In, Выкуп, Продажа.",
    domain: "royal-motors.kz", // placeholder
  },
  meta: {
    title: {
      kz: "Royal Motors - Шымкенттегі автосалон. Сату, Сатып алу, Trade-In",
      ru: "Royal Motors - Автосалон в Шымкенте. Продажа, Покупка, Trade-In"
    },
    description: {
      kz: "Тексерілген автомобильдер. Автокредит 5% немесе 0% бастапқы жарнамен.",
      ru: "Проверенные автомобили по лучшим ценам. Автокредитование с 5% ПВ и БЕЗ ПВ."
    }
  },
  contact: {
    phone: "+7 (778) 767-67-67",
    whatsapp: "77787676767",
    address: "г. Шымкент",
    mapLink: "#", // Needs update when address is known
    email: "info@royal-motors.kz",
    workingHours: "10:00 - 20:00 без выходных"
  },
  social: {
    instagram: "https://instagram.com/royalmotors_shymkent",
    facebook: "#",
    youtube: "#"
  }
};

export const getBrandConfig = () => brandConfig;
