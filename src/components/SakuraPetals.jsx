import { useEffect, useState } from 'react'

const SakuraPetals = () => {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    // 20 adet yaprak oluştur
    const newPetals = []
    for (let i = 0; i < 20; i++) {
      newPetals.push({
        id: i,
        left: Math.random() * 100, // %0 - %100 arası pozisyon
        animationDuration: 8 + Math.random() * 12, // 8-20 saniye
        animationDelay: Math.random() * 10, // 0-10 saniye gecikme
        size: 12 + Math.random() * 18, // 12-30px boyut
        opacity: 0.4 + Math.random() * 0.5, // 0.4-0.9 opaklık
        rotation: Math.random() * 360 // rastgele dönüş
      })
    }
    setPetals(newPetals)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-30px',
            fontSize: `${petal.size}px`,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotation}deg)`,
            animation: `sakuraFall ${petal.animationDuration}s linear ${petal.animationDelay}s infinite`
          }}
        >
          🌸
        </div>
      ))}
      
      {/* CSS Animasyonu */}
      <style>{`
        @keyframes sakuraFall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(720deg) translateX(${Math.random() > 0.5 ? '' : '-'}100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default SakuraPetals