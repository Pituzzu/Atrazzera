import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Articolo() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://atrazzera.altervista.org/backend/get_articles.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore recupero articolo:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#424B54] text-white font-sans">
        <Navbar />
        <div className="px-4 py-8 text-center text-gray-300">
          Caricamento articolo…
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-[#424B54] text-white font-sans">
        <Navbar />
        <div className="px-4 py-8 text-center text-red-400">
          Articolo non trovato.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#424B54] text-white font-sans relative">
      <Navbar />

      {/* Copertina */}
      <div className="relative mt-20">
  {article.copertina ? (
    <img
      src={article.copertina}
      alt={article.titolo}
      className="w-full h-[300px] object-cover opacity-60"
    />
  ) : (
    // Se non c’è copertina, creiamo comunque uno spazio alto 300px
    <div className="w-full h-[300px] " />
  )}

  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
      {article.titolo}
    </h1>
  </div>
</div>


      {/* Paragrafi */}
      <div className="px-8 md:px-80 py-8 space-y-12">
        {article.paragraphs && article.paragraphs.length > 0 ? (
          article.paragraphs.map((p, idx) => (
            <div key={idx} className="space-y-6">
              {p.sottotitolo && (
                <h2 className="text-xl text-yellow-300 font-semibold">
                  {p.sottotitolo}
                </h2>
              )}
              {p.testo && (
                <p className="text-lg text-gray-300 italic">{p.testo}</p>
              )}
              {p.immagine && (
                <div className="w-full flex justify-center">
                  <img
                    src={p.immagine}
                    alt={p.sottotitolo || `Paragrafo ${idx + 1}`}
                    className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-300 italic">Nessun paragrafo disponibile.</p>
        )}
      </div>

      {/* Autore & Ringraziamenti */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-6">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center space-y-4">
          <img
            src={article.autore?.foto || "/R.jpeg"}
            alt={`${article.autore?.nome || "Autore"}`}
            className="w-16 h-16 rounded-full mx-auto object-cover"
          />
          <p className="text-gray-300 font-medium">
            {article.autore
              ? `${article.autore.nome} ${article.autore.cognome}`
              : "Autore"}
          </p>
          {article.ringraziamenti && (
            <p className="text-gray-300">{article.ringraziamenti}</p>
          )}
        </div>
      </div>
    </div>
  );
}
