const kotowazas = [
  {
    text: "雨降って地固まる",
    reading: "Ame futte ji katamaru",
    meaning: "Yağmurdan sonra toprak sertleşir.",
    description: "Zorluklardan sonra durumun daha sağlam ve iyi bir hale gelmesi.",
    weatherMatch: ["Rain", "Drizzle", "Thunderstorm"]
  },
  {
    text: "明日は明日の風が吹く",
    reading: "Ashita wa ashita no kaze ga fuku",
    meaning: "Yarın yarının rüzgarı eser.",
    description: "Yarının sorunlarını bugünden dert etme, her gün kendi şansıyla gelir.",
    weatherMatch: ["Clear", "Clouds", "Wind"]
  },
  {
    text: "雲の上はいつも晴れ",
    reading: "Kumo no ue wa itsumo hare",
    meaning: "Bulutların üzerinde her zaman güneş vardır.",
    description: "Kötü zamanlar geçse de umudunu kaybetme, aydınlık yakındır.",
    weatherMatch: ["Clouds", "Rain"]
  },
  {
    text: "花鳥風月",
    reading: "Kachou Fuugetsu",
    meaning: "Çiçek, Kuş, Rüzgar, Ay.",
    description: "Doğanın güzelliğini takdir etmek ve ondan ilham almak.",
    weatherMatch: ["Clear", "Clouds"]
  },
  {
    text: "雪月花",
    reading: "Setsu-getsu-ka",
    meaning: "Kar, Ay, Çiçek.",
    description: "Dört mevsimin ve doğanın en zarif halleri.",
    weatherMatch: ["Snow"]
  }
];

export const getRandomKotowaza = (weatherMain) => {
  const filtered = kotowazas.filter(k => k.weatherMatch.includes(weatherMain));
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  return kotowazas[1]; // Varsayılan
};

export default kotowazas;
