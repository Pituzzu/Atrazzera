import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-[#424B54] text-white font-sans">
      {/* Navbar importata dal componente esterno */}
      <Navbar />

      {/* Sezione Hero con padding per evitare la sovrapposizione con la navbar */}
      <div className="pt-20 relative">
        <img
          src="/sfondo.svg"
          alt="Sfondo"
          className="w-full h-[400px] object-cover brightness-75"
        />
      </div>

      {/* Sezione Ultimi Articoli */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#D9D9D9] mb-12 bg-[#2e3740] py-4 rounded-md">
            Ultimi Articoli
          </h2>

          {/* Articolo 1 */}
          <div className="flex flex-col md:flex-row bg-[#E1CE7A] rounded-xl overflow-hidden shadow-lg mb-12">
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold text-gray-900">Titolo</h3>
              <p className="mt-3 text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              </p>
              <Link
                to="/articolo"
                className="mt-4 inline-block text-blue-800 hover:underline font-medium"
              >
                Continua a leggere...
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="/sfondo.svg"
                alt="Articolo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Articolo 2 */}
          <div className="flex flex-col md:flex-row-reverse bg-[#D9D9D9] rounded-xl overflow-hidden shadow-lg">
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold text-gray-900">Titolo 2</h3>
              <p className="mt-3 text-gray-800">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              </p>
              <Link
                to="/articolo"
                className="mt-4 inline-block text-blue-800 hover:underline font-medium"
              >
                Continua a leggere...
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="/sfondo.svg"
                alt="Articolo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Tutti gli Articoli - Categorie */}
      <section className="py-16 text-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-[#D9D9D9] mb-12 bg-[#2e3740] py-4 rounded-md">
            Categorie
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {[
              "Storia",
              "chiesa",
              "FesteIcon",
              "MestieriIcon",
              "BiografieIcon",
              "PubblicazioniIcon",
              "ContadiniIcon",
              "MinatoriIcon",
              "PartigianiIcon",
            ].map((cat, idx) => (
              <div key={idx} className=" text-center transition duration-300">
                <img
                  src={`/${cat}.svg`}
                  alt={cat}
                  className="w-30 h-30 mx-auto mb-3 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2e3740] py-6 mt-12">
        <div className="text-center text-white text-sm font-light">
          <p>© 2025 aTrazzera. Matteo il Pipo & Tano l'Ano Production.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
