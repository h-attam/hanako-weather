import { useEffect, useState } from 'react'

const WeatherEffects = ({ weatherMain }) => {
  const [elements, setElements] = useState([])

  useEffect(() => {
    const newElements = []
    let count = 0
    let type = ''

    if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
      count = 50
      type = 'rain'
    } else if (weatherMain === 'Snow') {
      count = 40
      type = 'snow'
    } else if (weatherMain === 'Thunderstorm') {
      count = 30
      type = 'rain'
    }

    for (let i = 0; i < count; i++) {
      newElements.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: type === 'rain' ? 0.5 + Math.random() * 0.5 : 3 + Math.random() * 5,
        opacity: 0.2 + Math.random() * 0.5,
        size: type === 'snow' ? 10 + Math.random() * 20 : 1 + Math.random() * 2
      })
    }
    setElements(newElements)
  }, [weatherMain])

  if (elements.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${el.left}%`,
            top: '-10vh',
            width: `${el.size}px`,
            height: weatherMain.includes('Rain') || weatherMain === 'Thunderstorm' ? '80px' : `${el.size}px`,
            opacity: el.opacity,
            background: weatherMain.includes('Rain') || weatherMain === 'Thunderstorm' 
              ? 'linear-gradient(transparent, rgba(136, 181, 161, 0.4))' 
              : 'white',
            animation: `fall ${el.duration}s linear ${el.delay}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  )
}

export default WeatherEffects
