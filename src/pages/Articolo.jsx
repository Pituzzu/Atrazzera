import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Articolo() {
  return (
    <div className="bg-[#424B54] text-white font-sans relative">
      {/* Navbar fissata in alto */}
      <Navbar />

      {/* Pulsante "Indietro" fisso sulla sinistra */}
      <Link
        to="/"
        className="fixed left-4 top-30 transform -translate-y-1/2 bg-[#2e3740] hover:bg-white/30 p-3 rounded shadow-lg flex items-center space-x-2 z-50"
      >
        <img src="/BackArrow.svg" alt="Indietro" className="w-6 h-6" />
        <span className="text-sm font-medium">Indietro</span>
      </Link>

      {/* Sezione copertina con titolo sovrapposto */}
      <div className="relative mt-20 bg-black">
        <img
          src="/sfondo.svg"
          alt="Copertina Articolo"
          className="w-full h-[300px] object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Titolo Articolo
          </h1>
        </div>
      </div>

      {/* Contenuto dell'articolo */}
      <div className="px-4 md:px-8 py-8 space-y-8">
        <div>
          <p className="text-lg text-gray-300 italic">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </p>
        </div>

        <div className="my-8">
          <img
            src="/sfondo.svg"
            alt="Immagine aggiuntiva"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        <div>
          <p className="text-lg text-gray-300 italic">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s.
          </p>
        </div>

        {/* Sottotitolo */}
        <div className="py-4">
          <h2 className="text-xl text-yellow-300 font-semibold">Sottotitolo bellissimo</h2>
        </div>

        <div>
          <p className="text-lg text-gray-300 italic">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
      </div>

      {/* Card per Autore e Ringraziamenti */}
      {/* Card per Autore e Ringraziamenti */}
<div className="max-w-2xl mx-auto px-4 md:px-8 py-6">
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 text-center">
    {/* Autore centrato */}
    <div className="flex flex-col items-center space-y-2">
      <img
        src="/R.jpeg"
        alt="Autore"
        className="w-16 h-16 rounded-full object-cover"
      />
      <p className="text-gray-300 font-medium">Autore.</p>
    </div>
    {/* Ringraziamenti e coautori */}
    <div>
      <p className="text-gray-300">
        Ringraziamenti e coautori. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
  </div>
</div>

    </div>
  )
}

export default Articolo
