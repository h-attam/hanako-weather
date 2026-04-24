import { useState, useEffect } from "react";
import { getWeatherByCity, getForecastByCity } from "./services/weatherApi";
import {
  FiDroplet,
  FiWind,
  FiSunrise,
  FiSunset,
  FiEye,
  FiThermometer,
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCloudSnow,
  FiCloudDrizzle,
  FiCloudLightning,
  FiMoon,
  FiSmile,
  FiCoffee,
  FiRefreshCw,
  FiMapPin,
  FiCalendar,
  FiEdit3,
  FiSave,
  FiChevronDown,
  FiBookOpen,
  FiSearch, FiInfo, FiHeart, FiBell, FiTrash2
} from "react-icons/fi";
import SakuraPetals from "./components/SakuraPetals";
import WeatherEffects from "./components/WeatherEffects";
import Header from "./components/Header";
import useSound from "./hooks/useSound";
import { getRandomKotowaza } from "./services/JapaneseKotowaza";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState({ icon: null, text: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [kotowaza, setKotowaza] = useState(null);

  const { playClickSound, playSaveSound } = useSound();

  // Günün saatine göre selamlama
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6)
      setGreeting({
        icon: <FiMoon className="inline text-indigo-400" size={20} />,
        text: "İyi Geceler",
      });
    else if (hour < 12)
      setGreeting({
        icon: <FiSun className="inline text-yellow-400" size={20} />,
        text: "Günaydın",
      });
    else if (hour < 18)
      setGreeting({
        icon: <FiSun className="inline text-orange-400" size={20} />,
        text: "İyi Günler",
      });
    else
      setGreeting({
        icon: <FiSun className="inline text-orange-500" size={20} />,
        text: "İyi Akşamlar",
      });
  }, []);

  // Hava durumunu getir
  const fetchWeather = async (city = "Istanbul") => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(city);
      const forecastData = await getForecastByCity(city);

      setWeather(data);
      setForecast(forecastData.list.filter((_, index) => index % 8 === 0)); // Her gün için bir tahmin
      setKotowaza(getRandomKotowaza(data.weather[0].main));
    } catch (error) {
      console.error("Hata:", error);
      setError(error.message || "Şehir bulunamadı veya bir API hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
      playClickSound();
    }
  };

  // Ruh hali butonları - tamamen ikonlu
  const moods = [
    {
      icon: <FiSun className="text-2xl" />,
      label: "Enerjik",
      color: "from-yellow-100 to-orange-100 border-yellow-300 text-yellow-600",
    },
    {
      icon: <FiCloudRain className="text-2xl" />,
      label: "Huzurlu",
      color: "from-blue-100 to-cyan-100 border-blue-300 text-blue-600",
    },
    {
      icon: <FiCloudSnow className="text-2xl" />,
      label: "Sakin",
      color: "from-indigo-100 to-purple-100 border-indigo-300 text-indigo-600",
    },
    {
      icon: <FiSmile className="text-2xl" />,
      label: "Mutlu",
      color: "from-orange-100 to-pink-100 border-orange-300 text-orange-600",
    },
    {
      icon: <FiCoffee className="text-2xl" />,
      label: "Melankolik",
      color: "from-gray-100 to-slate-100 border-gray-300 text-gray-600",
    },
    {
      icon: <FiHeart className="text-2xl" />,
      label: "Heyecanlı",
      color: "from-red-100 to-rose-100 border-red-300 text-red-600",
    },
  ];

  // Günlüğe kaydet
  const saveEntry = () => {
    if (!mood && !note.trim()) return;
    playSaveSound();

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      weather: weather,
      mood: mood,
      note: note,
    };

    const updatedEntries = [newEntry, ...savedEntries].slice(0, 10);
    setSavedEntries(updatedEntries);
    localStorage.setItem("hanako-entries", JSON.stringify(updatedEntries));
    setNote("");
    setMood(null);
  };

  // Günlük sil
  const deleteEntry = (id) => {
    playClickSound();
    const updatedEntries = savedEntries.filter((entry) => entry.id !== id);
    setSavedEntries(updatedEntries);
    localStorage.setItem("hanako-entries", JSON.stringify(updatedEntries));
  };

  // Sayfa yüklendiğinde kayıtları getir
  useEffect(() => {
    const saved = localStorage.getItem("hanako-entries");
    if (saved) {
      setSavedEntries(JSON.parse(saved));
    }
  }, []);

  // Hava durumu ikonunu belirle
  const getWeatherIcon = (code) => {
    const iconClass = "text-6xl md:text-7xl";
    if (code >= 200 && code < 300)
      return <FiCloudLightning className={`${iconClass} text-yellow-400`} />;
    if (code >= 300 && code < 400)
      return <FiCloudDrizzle className={`${iconClass} text-blue-400`} />;
    if (code >= 500 && code < 600)
      return <FiCloudRain className={`${iconClass} text-blue-500`} />;
    if (code >= 600 && code < 700)
      return <FiCloudSnow className={`${iconClass} text-indigo-300`} />;
    if (code >= 700 && code < 800)
      return <FiWind className={`${iconClass} text-gray-400`} />;
    if (code === 800)
      return <FiSun className={`${iconClass} text-yellow-400`} />;
    if (code > 800) return <FiCloud className={`${iconClass} text-gray-400`} />;
    return <FiSun className={`${iconClass} text-yellow-400`} />;
  };

  // Yükleme ekranı
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-washi via-sakura/20 to-matcha/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 border-4 border-momo/20 border-t-momo rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiSun className="text-5xl text-momo animate-pulse" />
            </div>
          </div>
          <p className="text-night text-xl font-japanese mt-8 animate-pulse">
            Hava durumu yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-washi via-red-50 to-pink-50 flex items-center justify-center p-4">
        <SakuraPetals />
        <div className="text-center max-w-md backdrop-blur-lg bg-white/50 rounded-3xl p-8 shadow-xl border border-white/60">
          <FiCloudRain className="text-7xl text-momo mx-auto mb-4" />
          <h2 className="text-2xl font-japanese font-bold text-night mb-4">
            Bir Sorun Oluştu
          </h2>
          <p className="text-night/70 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-momo to-sakura hover:from-momo/90 hover:to-sakura/90 text-white font-japanese px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg active:scale-95 inline-flex items-center gap-2"
          >
            <FiRefreshCw size={20} /> Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-8 relative transition-all duration-1000 bg-gradient-to-br ${
        weather?.weather[0].main === "Clear"
          ? "from-yellow-50 via-orange-50 to-pink-50"
          : weather?.weather[0].main === "Rain" ||
              weather?.weather[0].main === "Drizzle"
            ? "from-blue-50 via-cyan-50 to-teal-50"
            : weather?.weather[0].main === "Snow"
              ? "from-indigo-50 via-purple-50 to-pink-50"
              : weather?.weather[0].main === "Clouds"
                ? "from-gray-50 via-slate-50 to-zinc-50"
                : "from-washi via-sakura/10 to-matcha/10"
      }`}
    >
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        greeting={greeting}
        playClickSound={playClickSound}
      />

      {/* Koi Balıkları - Geleneksel Turuncu Tonlarda */}
      <div className="koi-fish top-[20vh] left-0">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M10 20C10 20 25 5 45 5C65 5 75 20 75 20C75 20 65 35 45 35C25 35 10 20 10 20Z" fill="#FF8343" fillOpacity="0.4" stroke="#FF8343" strokeWidth="1" strokeOpacity="0.6"/>
          <path d="M75 20L85 15M75 20L85 25" stroke="#FF8343" strokeWidth="2" strokeOpacity="0.6"/>
          <circle cx="20" cy="15" r="1.5" fill="white" fillOpacity="0.8"/>
        </svg>
      </div>

      <div className="koi-fish top-[70vh] left-0" style={{ animationDelay: '-12s' }}>
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <path d="M8 15C8 15 20 5 35 5C50 5 58 15 58 15C58 15 50 25 35 25C20 25 8 15 8 15Z" fill="#D90429" fillOpacity="0.3" stroke="#D90429" strokeWidth="1" strokeOpacity="0.5"/>
          <path d="M58 15L65 12M58 15L65 18" stroke="#D90429" strokeWidth="2" strokeOpacity="0.5"/>
        </svg>
      </div>

      <SakuraPetals />
      <WeatherEffects weatherMain={weather?.weather[0].main} />

      {/* Bambu Dalları (Sol Kenar - Daha Gerçekçi ve Eklemli) */}
      <div className="fixed left-0 top-0 h-screen pointer-events-none opacity-[0.06] z-0 hidden lg:block">
        <svg width="200" height="800" viewBox="0 0 200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ana Gövde 1 */}
          <path d="M40 800V700M40 690V550M40 540V400M40 390V250M40 240V100M40 90V0" stroke="#004D40" strokeWidth="8" strokeLinecap="round"/>
          {/* Ana Gövde 2 */}
          <path d="M80 800V730M80 720V600M80 590V480M80 470V350" stroke="#004D40" strokeWidth="6" strokeLinecap="round"/>
          
          {/* Yapraklar */}
          <g fill="#004D40">
            <path d="M45 150C60 140 100 130 120 140C100 150 60 160 45 150Z" />
            <path d="M45 400C65 380 110 370 130 390C110 410 65 420 45 400Z" />
            <path d="M85 500C100 480 150 480 170 500C150 520 100 520 85 500Z" />
            <path d="M45 100C60 80 90 60 110 70C90 90 60 110 45 100Z" />
            <path d="M85 620C105 600 140 590 160 610C140 630 105 640 85 620Z" />
          </g>
        </svg>
      </div>

      <div className="max-w-2xl mx-auto relative pt-4" style={{ zIndex: 1 }}>
        {/* Hava Durumu Kartı */}
        {weather && (
          <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-white/40 hover:shadow-momo/10 transition-all duration-500 relative overflow-hidden bg-washi-paper">
            <div className="bg-asanoha absolute inset-0 opacity-[0.03] pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-japanese font-bold text-night flex items-center gap-2">
                  <FiMapPin className="text-momo" size={24} />
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className="text-night/60 capitalize text-lg mt-1">
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="animate-float">
                {getWeatherIcon(weather.weather[0].id)}
              </div>
            </div>

            {/* Sıcaklık Area (Enso Dairesi ile) */}
            <div className="text-center mb-10 relative flex justify-center items-center py-6">
              <div className="enso-container relative inline-flex items-center justify-center p-12">
                {/* Zen Enso Çemberi SVG - Daha otantik fırça darbesi */}
                <svg className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] opacity-20 pointer-events-none" viewBox="0 0 100 100">
                  <path 
                    d="M 50,15 A 35,35 0 1,1 45,16" 
                    fill="none" 
                    stroke="#FFB7C5" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeDasharray="220"
                    style={{ filter: 'url(#brush)' }}
                  />
                  <defs>
                    <filter id="brush">
                      <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" />
                      <feDisplacementMap in="SourceGraphic" scale="3" />
                    </filter>
                  </defs>
                </svg>
                
                <div className="relative z-10 flex items-start">
                  <span className="text-8xl md:text-9xl font-japanese font-bold text-night drop-shadow-sm">
                    {Math.round(weather.main.temp)}
                  </span>
                  <span className="text-3xl md:text-4xl font-japanese text-night/60 mt-4 ml-1">
                    °C
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center text-night/50 mb-10 flex items-center justify-center gap-1 font-japanese font-bold bg-white/30 py-2 px-4 rounded-full border border-white/40 w-fit mx-auto">
              <FiThermometer size={16} className="text-momo" />
              Hissedilen {Math.round(weather.main.feels_like)}°C
            </p>

            {/* Detaylar Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 text-center border border-white/30 hover:scale-105 transition-transform flex flex-col items-center">
                <div className="h-16 flex items-center justify-center mb-1">
                  <FiDroplet className="text-2xl text-blue-400" />
                </div>
                <p className="text-[10px] text-night/40 uppercase tracking-widest mb-1">
                  Nem
                </p>
                <p className="text-xl font-bold text-night">
                  {weather.main.humidity}%
                </p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 text-center border border-white/30 hover:scale-105 transition-transform flex flex-col items-center group">
                <div className="h-16 flex flex-col items-center justify-center mb-1">
                  <div className="furin-animate relative">
                    <div className="w-[1px] h-3 bg-night/20 mx-auto"></div>
                    <FiWind className="text-2xl text-teal-400" />
                    <div className="w-2 h-6 bg-gradient-to-b from-white/60 to-transparent border-x border-teal-200/50 mx-auto rounded-b-sm shadow-sm"></div>
                  </div>
                </div>
                <p className="text-[10px] text-night/40 uppercase tracking-widest mb-1">
                  Rüzgar
                </p>
                <p className="text-base font-bold text-night">
                  {weather.wind.speed} m/s
                </p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 text-center border border-white/30 hover:scale-105 transition-transform flex flex-col items-center">
                <div className="h-16 flex items-center justify-center mb-1">
                  <FiEye className="text-2xl text-purple-400" />
                </div>
                <p className="text-[10px] text-night/40 uppercase tracking-widest mb-1">
                  Görüş
                </p>
                <p className="text-xl font-bold text-night">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 text-center border border-white/30 hover:scale-105 transition-transform flex flex-col items-center">
                <div className="h-16 flex items-center justify-center mb-1">
                  <FiSunrise className="text-2xl text-orange-400" />
                </div>
                <p className="text-[10px] text-night/40 uppercase tracking-widest mb-1">
                  Gün Doğumu
                </p>
                <p className="text-lg font-bold text-night">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                    "tr-TR",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 relative z-10">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 text-center border border-white/30 hover:scale-105 transition-transform flex flex-col items-center">
                <div className="h-12 flex items-center justify-center mb-1">
                  <FiSunset className="text-2xl text-pink-400" />
                </div>
                <p className="text-[10px] text-night/40 uppercase tracking-widest mb-1">
                  Gün Batımı
                </p>
                <p className="text-lg font-bold text-night">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                    "tr-TR",
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 text-center border border-white/30 hover:scale-105 transition-transform flex flex-col items-center">
                <div className="h-12 flex items-center justify-center mb-1">
                  <FiRefreshCw className="text-2xl text-indigo-400" />
                </div>
                <p className="text-[10px] text-night/40 uppercase tracking-widest mb-1">
                  Basınç
                </p>
                <p className="text-xl font-bold text-night">
                  {weather.main.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Kotowaza - Geleneksel Bilgelik */}
        {kotowaza && (
          <div className="backdrop-blur-lg bg-white/50 rounded-3xl shadow-xl p-6 md:p-8 mb-6 border-l-8 border-l-momo border border-white/60 relative overflow-hidden group">
            <div className="bg-seigaiha absolute inset-0 opacity-[0.03]"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-momo">
                <FiInfo size={20} />
                <span className="font-japanese font-bold text-sm uppercase tracking-widest">
                  KOTOWAZA • GÜNÜN BİLGELİĞİ
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-japanese font-bold text-night mb-2">
                    {kotowaza.text}
                  </h3>
                  <p className="text-night/40 italic text-sm mb-4">
                    {kotowaza.reading}
                  </p>
                  <div className="bg-momo/10 p-4 rounded-2xl">
                    <p className="text-night font-bold mb-1">
                      {kotowaza.meaning}
                    </p>
                    <p className="text-night/60 text-sm leading-relaxed">
                      {kotowaza.description}
                    </p>
                  </div>
                </div>
                <div className="vertical-text text-4xl font-japanese font-black text-night/10 group-hover:text-night/20 transition-colors hidden md:block">
                  智慧
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5 Günlük Tahmin */}
        {forecast && (
          <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-white/40 relative overflow-hidden bg-washi-paper">
            <div className="bg-asanoha absolute inset-0 opacity-[0.03] pointer-events-none"></div>
            <h3 className="text-xl font-japanese font-bold text-night mb-6 flex items-center gap-2 relative z-10">
              <FiCalendar className="text-2xl text-purple-400" /> 5 Günlük Tahmin
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
              {forecast.map((item, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-md bg-white/20 p-4 rounded-2xl flex flex-col items-center gap-2 hover:scale-105 transition-all text-center border border-white/30"
                >
                  <p className="text-xs font-japanese text-night/50 uppercase tracking-wider">
                    {new Date(item.dt * 1000).toLocaleDateString("tr-TR", {
                      weekday: "short",
                    })}
                  </p>
                  <div className="text-3xl">
                    {getWeatherIcon(item.weather[0].id)}
                  </div>
                  <p className="text-xl font-bold text-night">
                    {Math.round(item.main.temp)}°C
                  </p>
                  <p className="text-[10px] text-night/40 capitalize leading-tight">
                    {item.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ruh Hali Seçimi */}
        <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-white/40 relative overflow-hidden bg-washi-paper">
          <div className="bg-asanoha absolute inset-0 opacity-[0.03] pointer-events-none"></div>
          <h3 className="text-xl font-japanese font-bold text-night mb-4 flex items-center gap-2 relative z-10">
            <FiSmile className="text-2xl text-momo" /> Bugün nasıl
            hissediyorsun?
          </h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => {
                  setMood(m);
                  playClickSound();
                }}
                className={`px-5 py-3 rounded-2xl border-2 transition-all duration-300 font-japanese text-base bg-gradient-to-br flex items-center gap-2
                  ${
                    mood?.label === m.label
                      ? "scale-110 shadow-lg border-momo ring-2 ring-momo/30"
                      : "border-transparent hover:scale-105"
                  }
                  ${m.color}`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Not Defteri */}
        <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border border-white/40 relative overflow-hidden bg-washi-paper">
           {/* Gerçekçi Origami Turna (Orizuru) */}
           <div className="absolute right-4 top-4 opacity-[0.15] hover:opacity-100 transition-all duration-1000 rotate-[-15deg] hover:rotate-0 hover:scale-110">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-night filter drop-shadow-sm">
              {/* Kanatlar ve Gövde */}
              <path d="M50 80L10 40L40 30L50 10L60 30L90 40L50 80Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              {/* Boyun ve Baş */}
              <path d="M40 30L20 15L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Kuyruk */}
              <path d="M60 30L85 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              {/* İç Katlama Çizgileri */}
              <path d="M40 30L50 50L60 30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              <path d="M50 10V50" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
            </svg>
          </div>

          <h3 className="text-xl font-japanese font-bold text-night mb-4 flex items-center gap-2">
            <FiEdit3 className="text-2xl text-matcha" /> Günün Notu
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bugün hava çok güzel, parka gittim..."
            className="w-full p-5 rounded-2xl border-2 border-white/60 bg-white/60 backdrop-blur-sm focus:border-momo outline-none resize-none font-body text-night placeholder:text-night/30 min-h-[120px] transition-all focus:bg-white/80"
          />
          <button
            onClick={saveEntry}
            className="mt-4 w-full bg-gradient-to-r from-momo to-sakura hover:from-momo/90 hover:to-sakura/90 text-white font-japanese text-lg py-4 rounded-2xl transition-all duration-300 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <FiSave size={20} /> Günlüğe Kaydet
          </button>
        </div>

        {/* Geçmiş Günlükler */}
        {savedEntries.length > 0 && (
          <div className="backdrop-blur-lg bg-white/50 rounded-3xl shadow-xl p-6 md:p-8 mb-6 border border-white/60">
            <h3 className="text-xl font-japanese font-bold text-night mb-4 flex items-center gap-2">
              <FiBookOpen className="text-2xl text-purple-400" /> Geçmiş
              Günlükler
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 relative z-10">
              {savedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="backdrop-blur-md bg-white/40 rounded-2xl p-5 border border-white/60 hover:scale-[1.02] transition-transform relative group overflow-hidden"
                >
                  {/* Silme Butonu - Sol Üstte */}
                  <button 
                    onClick={() => deleteEntry(entry.id)}
                    className="absolute left-2 top-2 p-1.5 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100 z-20 shadow-lg scale-75 hover:scale-100"
                    title="Sil"
                  >
                    <FiTrash2 size={12} />
                  </button>

                  {/* Ruh Hali - Sağ Üstte */}
                  {entry.mood && (
                    <div className="absolute top-4 right-4 z-10 scale-90 md:scale-100 origin-right">
                      <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-white/40 shadow-sm bg-gradient-to-br ${entry.mood.color}`}>
                        {entry.mood.icon} {entry.mood.label}
                      </span>
                    </div>
                  )}

                  {/* Hanko Mührü - Ruh Halinin Altında (Sağ Tarafta) */}
                  <div className="absolute right-4 top-14 hanko-stamp scale-75 rotate-[-10deg] opacity-20 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0">
                     <span className="text-xs font-black">済</span> 
                  </div>

                  <div className="flex justify-between items-start mb-3 relative z-10 pl-6">
                    <span className="text-sm text-night/50 font-japanese flex items-center gap-1">
                      <FiCalendar size={14} /> {entry.date}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-night font-body leading-relaxed mb-3 relative z-10 pl-6 pr-16">{entry.note}</p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-sm text-night/40 flex-wrap relative z-10 pl-6 pr-16">
                    <span className="flex items-center gap-1">
                      <FiMapPin size={12} /> {entry.weather.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiThermometer size={12} />{" "}
                      {Math.round(entry.weather.main.temp)}°C
                    </span>
                    <span>•</span>
                    <span className="capitalize">{entry.weather.weather[0].description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-6 flex flex-col items-center gap-4">
           {/* Torii Kapısı SVG */}
           <div className="opacity-[0.15] hover:opacity-40 transition-opacity">
            <svg width="40" height="35" viewBox="0 0 60 50" fill="none" className="text-night">
              <path d="M5 10H55V15H5V10Z" fill="currentColor"/>
              <path d="M10 5H50V10H10V5Z" fill="currentColor"/>
              <path d="M15 15V50M45 15V50" stroke="currentColor" strokeWidth="6"/>
              <path d="M15 25H45" stroke="currentColor" strokeWidth="4"/>
            </svg>
          </div>

          <p className="text-night/30 text-sm font-japanese flex items-center justify-center gap-1">
            <FiSun size={14} className="text-momo/50" />
            Hanako Weather © {new Date().getFullYear()} •
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
