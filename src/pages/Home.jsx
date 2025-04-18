import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Mappa nomi di categoria → nome del file SVG
  const iconMap = {
    "Storia": "Storia",
    "Chiese e Monumenti": "chiesa",
    "Feste e Tradizioni": "FesteIcon",
    "Arti e Mestieri": "MestieriIcon",
    "Biografie": "BiografieIcon",
    "Pubblicazioni": "PubblicazioniIcon",
    "Contadini": "ContadiniIcon",
    "Civiltà Minerarie": "MinatoriIcon",
    "Partigiani": "PartigianiIcon"
  };

  useEffect(() => {
    // Fetch articoli
    fetch("https://atrazzera.altervista.org/backend/get_recent_articles.php")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Errore articoli:", err));

    // Fetch categorie
    fetch("https://atrazzera.altervista.org/backend/get_categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Errore categorie:", err));
  }, []);

  return (
    <div className="bg-[#424B54] text-white font-sans">
      <Navbar />

      {/* Hero */}
      <div className="pt-20 relative">
        <img
          src="/sfondo.svg"
          alt="Sfondo"
          className="w-full h-[400px] object-cover brightness-75"
        />
      </div>

      {/* Ultimi Articoli */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-[#D9D9D9] mb-12 bg-[#2e3740] py-4 rounded-md">
            Ultimi Articoli
          </h2>

          {articles.length > 0 ? (
            articles.map((article, idx) => {
              const testo = article.paragraphs?.[0]?.testo || "";
              const preview =
                testo.length > 100 ? testo.slice(0, 100) + "..." : testo;

              return (
                <div
                  key={article.id_articolo}
                  className={`flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg mb-12 ${
                    idx % 2 === 0 ? "bg-[#E1CE7A]" : "bg-[#D9D9D9]"
                  }`}
                  style={{ height: "300px" }}
                >
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {article.titolo}
                    </h3>
                    {preview && (
                      <p className="mt-3 text-gray-800">{preview}</p>
                    )}
                    <Link
                      to={`/articolo?id=${article.id_articolo}`}
                      className="mt-4 inline-block text-blue-800 hover:underline font-medium"
                    >
                      Continua a leggere...
                    </Link>
                  </div>
                  <div className="md:w-1/2 h-full">
                    <img
                      src={article.copertina || "/sfondo.svg"}
                      alt={article.titolo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">Nessun articolo trovato.</p>
          )}
        </div>
      </section>

      {/* Categorie */}
      <section className="py-16 text-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-[#D9D9D9] mb-12 bg-[#2e3740] py-4 rounded-md">
            Categorie
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const iconName = iconMap[cat.nome_categoria] || "sfondo";
              return (
                <Link
                  key={cat.id_categoria}
                  to={`/categoria?id=${cat.id_categoria}`}
                  className="text-center transition duration-300"
                >
                  <img
                    src={`/${iconName}.svg`}
                    alt={cat.nome_categoria}
                    className="w-30 h-30 mx-auto mb-3 object-contain"
                  />
                  
                </Link>
              );
            })}
            {categories.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Caricamento categorie…
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2e3740] py-6 mt-12">
        <div className="text-center text-white text-sm font-light">
          <p>© 2025 aTrazzera. Matteo il Pipo &amp; Tano l'Ano Production.</p>
        </div>
      </footer>
    </div>
  );
}
