import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="bg-[#424B54] text-white">
      {/* Sfondo e Navbar */}
      <div className="relative">
        <img src="/sfondo.svg" alt="Sfondo" className="w-full h-96 object-cover" />
        <nav className="absolute top-0 left-0 right-0 z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6 backdrop-blur-sm bg-white/10">
            <div className="flex items-center">
              <img src="/Group 14.svg" alt="Logo" className="w-32" />
            </div>
            <div className="flex space-x-6 text-sm font-medium">
              <Link to="/chi-siamo" className="hover:text-blue-300 transition">Chi Siamo</Link>
              <Link to="/valguarnera" className="hover:text-blue-300 transition">Valguarnera</Link>
              <Link to="/sicilia" className="hover:text-blue-300 transition">Sicilia</Link>
              <Link to="/eventi" className="hover:text-blue-300 transition">Eventi</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Sezione Ultimi Articoli */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="text-center bg-[#D9D9D9] py-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800">Ultimi Articoli</h1>
          </div>
          <div className="flex flex-col md:flex-row mt-8 bg-[#E1CE7A] rounded-xl overflow-hidden shadow-lg">
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold text-gray-900">Titolo</h2>
              <p className="mt-4 text-gray-700">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              </p>
              <Link to="/articolo" className="mt-4 inline-block text-blue-600 hover:underline">
                Continua a leggere...
              </Link>
            </div>
            <div className="flex-1">
              <img src="/sfondo.svg" alt="Copertina" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Seconda Notizia */}
          <div className="flex flex-col md:flex-row-reverse mt-12 bg-[#D9D9D9] rounded-xl overflow-hidden shadow-lg">
            <div className="flex-1 p-6">
              <h2 className="text-2xl font-bold text-gray-900">Titolo</h2>
              <p className="mt-4 text-gray-700">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              </p>
              <Link to="/articolo" className="mt-4 inline-block text-blue-600 hover:underline">
                Continua a leggere...
              </Link>
            </div>
            <div className="flex-1">
              <img src="/sfondo.svg" alt="Copertina" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Tutti gli Articoli */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center bg-[#D9D9D9] py-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800">Tutti gli articoli</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {[
              "Storia",
              "Chiesa",
              "Feste",
              "Mestieri",
              "Biografie",
              "Pubblicazioni",
              "Contadini",
              "Minatori",
              "Partigiani"
            ].map((cat, idx) => (
              <div key={idx} className="text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
                <img src={`/${cat}.svg`} alt={cat} className="w-24 mx-auto" />
                <p className="mt-2 text-gray-800 font-semibold">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-xl font-semibold">Piedini di pagina, matteo il pipo, tano l'ano</h1>
        </div>
      </footer>
    </div>
  )
}

export default Home
