import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ articles: 0, drafts: 0 });
  const [description, setDescription] = useState("");
  const [articles, setArticles] = useState([]);
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState("");
  const photoInputRef = useRef(null);

  useEffect(() => {
    // 1) Profilo admin
    fetch("https://atrazzera.altervista.org/backend/get_admin_profile.php")
      .then((r) => r.json())
      .then(setProfile)
      .catch((e) => console.error("Errore profile:", e));

    // 2) Statistiche
    fetch("https://atrazzera.altervista.org/backend/get_stats.php")
      .then((r) => r.json())
      .then(setStats)
      .catch((e) => console.error("Errore stats:", e));

    // 3) Descrizione
    fetch("https://atrazzera.altervista.org/backend/get_admin_description.php")
      .then((r) => r.json())
      .then((data) => {
        setDescription(data.descrizione || "");
        setDescDraft(data.descrizione || "");
      })
      .catch((e) => console.error("Errore description:", e));

    // 4) Tutti gli articoli
    fetch("https://atrazzera.altervista.org/backend/get_all_articles.php")
      .then((r) => r.json())
      .then(setArticles)
      .catch((e) => console.error("Errore articles:", e));
  }, []);

  // Caricamento non terminato?
  if (profile === null) {
    return (
      <div className="bg-[#424B54] text-white font-sans min-h-screen flex items-center justify-center">
        Caricamento admin…
      </div>
    );
  }

  // Salva descrizione modificata
  const saveDescription = () => {
    fetch(
      "https://atrazzera.altervista.org/backend/update_admin_description.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descrizione: descDraft }),
      }
    )
      .then((r) => r.json())
      .then(() => {
        setDescription(descDraft);
        setEditingDesc(false);
      })
      .catch((e) => console.error("Errore save description:", e));
  };

  // Apri file picker per foto
  const handlePhotoClick = () => photoInputRef.current?.click();

  // Gestisci upload foto profilo
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(
        "https://atrazzera.altervista.org/backend/upload_admin_photo.php",
        { method: "POST", body: fd }
      );
      const json = await res.json();
      if (json.success && json.url) {
        setProfile((p) => ({ ...p, foto: json.url }));
      } else {
        console.error("Upload failed:", json.error);
      }
    } catch (err) {
      console.error("Errore upload foto:", err);
    }
  };

  return (
    <div className="bg-[#424B54] text-white font-sans min-h-screen">
      <Navbar />

      {/* PROFILO & STATISTICHE */}
      <div className="mt-20 px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profile.foto ? (
                <img
                  src={profile.foto}
                  alt="Profilo"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-600" />
              )}

              <button
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 bg-[#E1CE7A] p-1 rounded-full"
                title="Cambia foto"
              >
                <img src="/home.svg" alt="Modifica" className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={photoInputRef}
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <p className="text-lg font-semibold">
              {profile.nome} {profile.cognome}
            </p>
          </div>

          <div className="flex space-x-8">
            <div className="text-center">
              <p className="text-xl font-semibold">Articoli</p>
              <h2 className="text-4xl font-bold">{stats.articles}</h2>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">Bozze</p>
              <h2 className="text-4xl font-bold">{stats.drafts}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* DESCRIZIONE */}
      <div className="mt-8 px-4 md:px-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Descrizione</h2>
            {!editingDesc ? (
              <button
                onClick={() => setEditingDesc(true)}
                className="bg-[#E1CE7A] text-black px-3 py-1 rounded"
              >
                Modifica
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={saveDescription}
                  className="bg-green-600 px-3 py-1 rounded"
                >
                  Salva
                </button>
                <button
                  onClick={() => {
                    setEditingDesc(false);
                    setDescDraft(description);
                  }}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Annulla
                </button>
              </div>
            )}
          </div>
          <div className="mt-4">
            {editingDesc ? (
              <textarea
                value={descDraft}
                onChange={(e) => setDescDraft(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
                rows={4}
              />
            ) : (
              <p className="text-gray-300 italic">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* TUTTI GLI ARTICOLI */}
      <div className="mt-8 px-4 md:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Tutti gli articoli</h2>
          <Link
            to="/post"
            className="bg-[#E1CE7A] text-black px-4 py-2 rounded-lg"
          >
            + Nuovo articolo
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((a, idx) => (
            <Link
              key={a.id_articolo}
              to={`/articolo?id=${a.id_articolo}`}
              className={`block rounded-lg overflow-hidden shadow-md p-4 text-center ${
                idx % 2 === 0 ? "bg-yellow-200" : "bg-gray-200"
              }`}
            >
              {a.copertina ? (
                <img
                  src={a.copertina}
                  alt={a.titolo}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 rounded mb-3" />
              )}
              <p className="font-semibold text-gray-800">{a.titolo}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
