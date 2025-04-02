import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Post() {
  const fileInputRef = useRef(null);

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className="bg-[#424B54] text-white font-sans min-h-screen p-4">
      {/* Header (senza navbar) */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Creazione Articolo</h1>
      </div>
      <Link
        to="/"
        className="fixed left-4 top-20 transform -translate-y-1/2 bg-[#2e3740] hover:bg-white/30 p-3 rounded shadow-lg flex items-center space-x-2 z-50"
      >
        <img src="/BackArrow.svg" alt="Indietro" className="w-6 h-6" />
        <span className="text-sm font-medium">Indietro</span>
      </Link>
      <form className="max-w-3xl mx-auto space-y-8">
        {/* Sezione Titolo e Copertina */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Titolo" 
              required 
              className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
            />
          </div>
          <div>
            <p className="mb-2">Carica immagine di copertina</p>
            <input 
              type="file" 
              className="block w-full text-gray-900 file:py-2 file:px-4 file:border file:border-transparent file:rounded-lg file:bg-[#E1CE7A]"
            />
          </div>
        </div>

        {/* Sezione Paragrafo */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Paragrafo 1</h2>
            <button type="button" className="text-red-400 hover:text-red-600">
              Elimina paragrafo
            </button>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Sottotitolo paragrafo" 
              required 
              className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900 mb-4"
            />
            <textarea 
              placeholder="Descrivere paragrafo" 
              required 
              className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900" 
              style={{ height: '100px' }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              onClick={handleFileClick} 
              className="bg-[#E1CE7A] text-black px-4 py-2 rounded-lg hover:bg-[#EBCFB2] transition"
            >
              Carica immagine
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              multiple 
              className="hidden"
            />
            <div className="flex space-x-2 text-xl">
              <span className="bg-[#E1CE7A] text-black px-2 py-1 rounded">G</span>
              <span className="bg-[#E1CE7A] text-black px-2 py-1 rounded">C</span>
              <span className="bg-[#E1CE7A] text-black px-2 py-1 rounded">S</span>
            </div>
          </div>
        </div>

        {/* Pulsante Aggiungi Paragrafo */}
        <div className="text-center">
          <button 
            type="button" 
            className="bg-[#EBCFB2] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#E1CE7A] transition"
          >
            + Paragrafo
          </button>
        </div>

        {/* Sezione Ringraziamenti e Co-autori */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ringraziamenti e co-autori</h2>
          <textarea 
            placeholder="Descrizione" 
            required 
            className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900" 
            style={{ height: '100px' }}
          />
        </div>

        {/* Sezione Categorie */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Categorie articolo</h2>
          <select 
            required 
            className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
          >
            <option value="">Pippo</option>
            <option value="">Pippo</option>
            <option value="">Pippo</option>
            <option value="">Pippo</option>
            <option value="">Pippo</option>
            <option value="">Pippo</option>
          </select>
        </div>

        {/* Pulsante Pubblica */}
        <div className="text-center">
          <button 
            type="submit" 
            className="bg-[#EBCFB2] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#E1CE7A] transition"
          >
            PUBBLICA
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
