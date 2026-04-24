# Hanako Weather

Hanako Weather, Japon estetiği ile modern web teknolojilerini birleştiren, kullanıcı dostu bir hava durumu ve kişisel günlük uygulamasıdır. Geleneksel Japon tasarım öğelerini (Washi, Wamon, Enso) minimalist bir kullanıcı deneyimi ile sunar.

<div align="center">
  <img src="./src/assets/Screen-2026-04-24-034631.gif" width="300" alt="Hanako Weather Önizleme" />
</div>

## Özellikler

- Anlık hava durumu verileri ve 5 günlük detaylı tahmin sunar.
- Kullanıcıların ruh hallerini ve günlük notlarını kaydedebileceği entegre bir günlük sistemi içerir.
- Japon kültürüne ait dinamik SVG öğeleri (Sakura yaprakları, Fuji Dağı, Torii kapısı, yüzen Koi balıkları, bambu dalları ve Origami turna kuşu) ile zenginleştirilmiş bir tema sunar.
- Hava durumuna göre dinamik olarak değişen arka plan efektleri ve Japon atasözleri (Kotowaza) gösterilir.
- Glassmorphism ve Washi kağıdı dokusu ile modern bir arayüz tasarımına sahiptir.
- Verilerin yerel hafızada (LocalStorage) saklanması sayesinde oturumlar arası veri sürekliliği sağlar.

## Kullanılan Teknolojiler

- **Frontend:** React.js
- **Yapı Aracı:** Vite
- **Stil Yönetimi:** Tailwind CSS
- **Veri Haberleşmesi:** Axios
- **İkon Seti:** React Icons (Feather, Fi)
- **Veri Kaynağı:** OpenWeather Map API
- **Animasyon ve Çizim:** Custom SVG & CSS Keyframes

## Kurulum ve Çalıştırma

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Depoyu yerel bilgisayarınıza klonlayın:

   ```bash
   git clone [depo-adresi]
   ```

2. Proje dizinine gidin:

   ```bash
   cd hanako-weather
   ```

3. Gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

4. Kök dizinde bir `.env` dosyası oluşturun ve OpenWeather API anahtarınızı ekleyin:

   ```env
   VITE_OPENWEATHER_API_KEY=api_anahtariniz
   ```

5. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Lisans

Bu proje kişisel gelişim ve eğitim amacıyla geliştirilmiştir.
