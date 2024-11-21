'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 overflow-hidden">
      <div 
        className="relative"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      >
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        
        <div className="relative">
          <div 
            className="bg-white border-[8px] border-black p-8 max-w-2xl mx-auto transform hover:-rotate-1 transition-transform duration-200"
            style={{ boxShadow: '15px 15px 0 #000' }}
          >
            <h1 className="text-[150px] leading-none font-black text-black mb-4 font-mono">
              404
            </h1>
            <p className="text-4xl font-bold mb-8 font-mono text-black">
              PAGE NOT FOUND
            </p>
            <Link 
              href="/"
              className="inline-block bg-black text-white text-2xl font-bold py-4 px-8 hover:bg-blue-500 transition-colors duration-200 font-mono transform hover:translate-x-2"
            >
              RETURN HOME →
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}