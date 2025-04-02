import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="bg-[#424B54] text-white font-sans">
      {/* Navbar fissata in alto */}
      <Navbar />

      {/* Primo Layer: Profilo e Statistiche */}
      <div className="mt-20 px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <img
                src="/R.jpeg"
                alt="Profilo"
                className="w-24 h-24 rounded-full object-cover"
              />
              <p className="mt-2 text-lg font-semibold">Nome Cognome</p>
            </div>
            <div className="ml-8 space-y-2">
              <button className="flex items-center space-x-2 bg-[#E1CE7A] text-black px-3 py-1 rounded hover:bg-[#EBCFB2]">
                <img src="/home.svg" alt="Cambia foto" className="w-5 h-5" />
                <span className="text-sm">Cambia foto</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#E1CE7A] text-black px-3 py-1 rounded hover:bg-[#EBCFB2]">
                <img src="/home.svg" alt="Elimina foto" className="w-5 h-5" />
                <span className="text-sm">Elimina foto</span>
              </button>
            </div>
          </div>

          {/* Statistiche aggiornate */}
          <div className="flex space-x-8 mt-4 md:mt-0 justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold">Articoli</p>
              <h2 className="text-4xl font-bold">50</h2>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">Bozze</p>
              <h2 className="text-4xl font-bold">50</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Terzo Layer: Descrizione */}
      <div className="mt-8 px-4 md:px-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Descrizione</h2>
            <button className="flex items-center space-x-2 bg-[#E1CE7A] text-black px-3 py-1 rounded hover:bg-[#EBCFB2]">
              <img src="/home.svg" alt="Modifica descrizione" className="w-5 h-5" />
              <span className="text-sm">Modifica descrizione</span>
            </button>
          </div>
          <p className="mt-4 text-gray-300 italic">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...
          </p>
        </div>
      </div>

      {/* Sezione "Tutti gli articoli" */}
      <div className="mt-8 px-4 md:px-8">
        <h2 className="text-2xl font-bold text-center mb-4">Tutti gli articoli</h2>
      </div>

      {/* Griglia degli articoli */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-8 pb-8">
        {/* Bottone per Aggiungere Articolo */}
        <div className="flex items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition p-4">
          <button className="text-4xl font-bold text-gray-500">+</button>
        </div>
        {/* Card Articolo - placeholder */}
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 text-center ${idx % 2 === 0 ? "bg-yellow-200" : "bg-gray-200"}`}
            >
              <img 
                src="/sfondo.svg" 
                alt="Immagine articolo" 
                className="w-full h-40 object-cover rounded mb-3" 
              />
              <p className="font-semibold text-gray-800">Titolo articolo</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Admin;
