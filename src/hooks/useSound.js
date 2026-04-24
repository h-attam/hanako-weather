import { useCallback } from 'react'

const useSound = () => {
  
  // Buton tıklama sesi
  const playClickSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      
      // Kısa bir "pika" sesi oluştur
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2)
      
      oscillator.start(audioCtx.currentTime)
      oscillator.stop(audioCtx.currentTime + 0.2)
    } catch (e) {
      // Ses çalınamazsa sessizce devam et
    }
  }, [])

  // Kaydetme başarı sesi (tapınak çanı benzeri)
  const playSaveSound = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      
      // İlk çan sesi
      const osc1 = audioCtx.createOscillator()
      const gain1 = audioCtx.createGain()
      osc1.connect(gain1)
      gain1.connect(audioCtx.destination)
      
      osc1.frequency.setValueAtTime(520, audioCtx.currentTime)
      gain1.gain.setValueAtTime(0.4, audioCtx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5)
      
      osc1.start(audioCtx.currentTime)
      osc1.stop(audioCtx.currentTime + 1.5)
      
      // İkinci çan sesi (biraz gecikmeli)
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator()
        const gain2 = audioCtx.createGain()
        osc2.connect(gain2)
        gain2.connect(audioCtx.destination)
        
        osc2.frequency.setValueAtTime(680, audioCtx.currentTime)
        gain2.gain.setValueAtTime(0.3, audioCtx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2)
        
        osc2.start(audioCtx.currentTime)
        osc2.stop(audioCtx.currentTime + 1.2)
      }, 200)
      
    } catch (e) {
      // Ses çalınamazsa sessizce devam et
    }
  }, [])

  return { playClickSound, playSaveSound }
}

export default useSound