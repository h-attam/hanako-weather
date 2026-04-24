import { FiSearch, FiCalendar, FiEdit3 } from "react-icons/fi";

const Header = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  greeting,
  playClickSound,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 md:px-8">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg rounded-3xl md:rounded-[2rem] px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 hover:bg-white/50">
        {/* Logo Bölümü */}
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {/* Fuji Dağı İkonu (Logo İçin) */}
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              {/* Dağ Gövdesi */}
              <path d="M10 85L50 25L90 85H10Z" fill="#2D3436" className="group-hover:fill-night transition-colors" />
              {/* Karlı Zirve */}
              <path d="M50 25L63 45H37L50 25Z" fill="white" />
              {/* Güneş (Arka Planda) */}
              <circle cx="25" cy="35" r="8" fill="#FFB7C5" opacity="0.6" className="group-hover:opacity-100 transition-opacity" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-japanese font-bold bg-gradient-to-r from-night to-night/70 bg-clip-text text-transparent leading-none">
              Hanako
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-night/40 font-japanese font-bold">
              Weather •
            </span>
          </div>
        </div>

        {/* Arama Barı */}
        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-md group order-3 md:order-2"
        >
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-night/30 group-focus-within:text-momo transition-colors"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Şehir ara... "
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-white/60 bg-white/30 backdrop-blur-md focus:border-momo outline-none font-japanese text-sm text-night transition-all focus:bg-white/60"
          />
        </form>

        {/* Tarih ve Selamlama */}
        <div className="hidden lg:flex items-center gap-4 text-night/60 font-japanese text-sm order-2 md:order-3">
          <div className="flex items-center gap-2 bg-white/30 px-4 py-2 rounded-xl border border-white/40">
            {greeting.icon}
            <span>{greeting.text}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/30 px-4 py-2 rounded-xl border border-white/40 uppercase tracking-wider text-[11px] font-bold">
            <FiCalendar size={14} className="text-momo" />
            {new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>

        {/* Mobil Selamlama (Sadece Mobilde) */}
        <div className="lg:hidden flex items-center gap-2 text-xs text-night/40 font-japanese order-2">
          {greeting.icon} {greeting.text} •{" "}
          {new Date().toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
