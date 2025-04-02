import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function Categoria() {
  // Se in realtà le immagini degli articoli sono diverse, potresti sostituire "/sfondo.svg" con il percorso corretto
  const categories = [
    "Storia", "chiesa", "FesteIcon", "MestieriIcon",
    "BiografieIcon", "PubblicazioniIcon", "ContadiniIcon",
    "MinatoriIcon", "PartigianiIcon"
  ];

  return (
    <div className="bg-[#424B54] text-white font-sans relative">
      {/* Navbar fissata in alto */}
      <Navbar />

      {/* Sezione Hero con immagine e titolo sovrapposto */}
      <div className="relative mt-4">
        <img 
          src="/sfondo.svg" 
          alt="Background Categoria" 
          className="w-full h-[300px] object-cover opacity-70" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Titolo Categoria</h1>
        </div>
      </div>

      {/* Descrizione della categoria */}
      <div className="py-8 px-4 md:px-8">
        <h2 className="text-xl font-semibold text-center text-gray-300">
          Qui sono presenti tutti gli articoli che riguardano i bla bla bla
        </h2>
      </div>

      {/* Griglia delle sottocategorie/articoli */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-8 pb-8">
        {categories.map((cat, idx) => {
          // Rimuove la parola "Icon" se presente per mostrare solo il nome dell'articolo
          const displayTitle = cat.replace("Icon", "");
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 text-center ${idx % 2 === 0 ? "bg-yellow-200" : "bg-gray-200"}`}
            >
              {/* Qui si usa "/sfondo.svg" come placeholder, sostituisci con il percorso reale se disponibile */}
              <img 
                src="/sfondo.svg" 
                alt={displayTitle} 
                className="w-full h-40 object-cover rounded mb-3" 
              />
              <p className="font-semibold text-gray-800">{displayTitle}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Categoria;
