//import { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar';
import spidy from './assets/spidy.png'
import './assets/spidy.png'
import './App.css'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
      {/* Responsive Navigation Shell */}
      <Sidebar />

      {/* Main Content Area (Offset for Desktop Sidebar & Mobile Bottom Bar) */}

      <main className="flex-1 md:ml-16 xl:ml-64 pb-16 md:pb-0 flex justify-center p-4">
        <div className="max-w-[470px] w-full pt-4">
          <h2 className="text-xl font-bold mb-4">Feed Placeholder</h2>
          <div className="p-8 border border-dashed border-gray-300 rounded bg-white text-center text-gray-500">
            Layout connected successfully! feed components will render here.
            <img src= {spidy} alt="spidy" />
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default App
