export const brandConfig = {
  identity: {
    name: "Aqylbay auto market",
    description: "Автосалон в Шымкенте. Продажа, покупка, Trade-In.",
    domain: "aqylbay.kz", // placeholder
  },
  meta: {
    title: {
      kz: "AQYLBAY auto market - Көлік сату, сатып алу, Trade-In",
      ru: "AQYLBAY auto market - Автосалон в Шымкенте"
    },
    description: {
      kz: "Шымкенттегі ең үздік автосалон. Көліктерді тиімді бағада сатып алыңыз немесе сатыңыз.",
      ru: "Лучший автосалон в Шымкенте. Покупка, продажа и обмен автомобилей по выгодным ценам."
    }
  },
  contact: {
    phone: "+7 (777) 111-65-05",
    whatsapp: "77711165050", // clean number for links
    address: "г. Шымкент, ул. Еримбетова 159/1",
    mapLink: "https://2gis.kz/shymkent/inside/70030076945635824/query/%D0%9F%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B0%20%D0%BB%D0%B5%D0%B3%D0%BA%D0%BE%D0%B2%D1%8B%D1%85%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D0%B5%D0%B9/firm/70000001094336032?m=69.637619%2C42.351062%2F15.82",
    email: "info@aqylbay.kz",
    workingHours: "Ежедневно: 09:00 - 20:00"
  },
  social: {
    instagram: "https://instagram.com/aqylbay.automarket",
    facebook: "#",
    youtube: "#"
  }
};

export const getBrandConfig = () => brandConfig;
