import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Categoria() {
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const catId = searchParams.get("id");

  useEffect(() => {
    if (!catId) {
      setError("Nessuna categoria selezionata.");
      setLoading(false);
      return;
    }

    fetch(`https://atrazzera.altervista.org/backend/get_category.php?id=${catId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Risposta non valida");
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCategory({
          id: data.id_categoria,
          nome: data.nome_categoria,
          descrizione: data.descrizione,
          cover: data.copertina || "",       // se in futuro aggiungi copertina categoria
        });
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Errore nel recupero dati.");
      })
      .finally(() => setLoading(false));
  }, [catId]);

  if (loading) {
    return (
      <div className="bg-[#424B54] text-white font-sans min-h-screen">
        <Navbar />
        <div className="px-4 py-8 text-center">Caricamento...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-[#424B54] text-white font-sans min-h-screen">
        <Navbar />
        <div className="px-4 py-8 text-center text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#424B54] text-white font-sans relative min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative mt-4">
        {category.cover ? (
          <img
            src={category.cover}
            alt={category.nome}
            className="w-full h-[300px] object-cover opacity-70"
          />
        ) : (
          <div className="w-full h-[300px] " />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            {category.nome}
          </h1>
        </div>
      </div>

      {/* Descrizione */}
      <div className="py-8 px-4 md:px-8">
        <h2 className="text-xl font-semibold text-center text-gray-300">
          {category.descrizione}
        </h2>
      </div>

      {/* Griglia articoli */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-8 pb-8">
        {articles.length > 0 ? (
          articles.map((art, idx) => (
            <Link
              key={art.id_articolo}
              to={`/articolo?id=${art.id_articolo}`}
              className={`block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition p-4 text-center ${
                idx % 2 === 0 ? "bg-yellow-200" : "bg-gray-200"
              }`}
            >
              {art.copertina ? (
                <img
                  src={art.copertina}
                  alt={art.titolo}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-[#2e3740] rounded mb-3" />
              )}
              <p className="font-semibold text-gray-800">{art.titolo}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-300">
            Nessun articolo disponibile.
          </p>
        )}
      </div>
    </div>
  );
}
