import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Post() {
  // Stato paragrafi dinamici
  const [paragraphs, setParagraphs] = useState([{ id: Date.now(), imageId: 0 }]);
  // Stato categorie caricate dal backend
  const [categories, setCategories] = useState([]);
  // Stato categorie selezionate
  const [selectedCategories, setSelectedCategories] = useState([]);
  // Refs per ogni input file dei paragrafi
  const paragraphFileInputRefs = useRef({});
  // Ref per l'input copertina
  const coverFileInputRef = useRef(null);
  // Stato per la notifica toast
  const [toastVisible, setToastVisible] = useState(false);

  // Carica le categorie all'avvio
  useEffect(() => {
    fetch("https://atrazzera.altervista.org/backend/get_categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Errore fetch categorie:", err));
  }, []);

  // Aggiunge un nuovo paragrafo
  const addParagraph = () => {
    setParagraphs((prev) => [...prev, { id: Date.now(), imageId: 0 }]);
  };

  // Rimuove un paragrafo
  const removeParagraph = (id) => {
    setParagraphs((prev) => prev.filter((p) => p.id !== id));
    delete paragraphFileInputRefs.current[id];
  };

  // Apre il file picker per un paragrafo
  const handleClickParagraphImage = (id) => {
    const input = paragraphFileInputRefs.current[id];
    if (input) input.click();
  };

  // Gestisce il caricamento dell'immagine di un paragrafo
  const handleParagraphImageChange = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(
        "https://atrazzera.altervista.org/backend/upload_image.php",
        { method: "POST", body: fd }
      );
      const { id: imgId } = await res.json();
      setParagraphs((prev) =>
        prev.map((p) => (p.id === id ? { ...p, imageId: imgId } : p))
      );
    } catch (err) {
      console.error("Errore upload paragrafo:", err);
    }
  };

  // Carica l'immagine di copertina
  const uploadCoverImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(
        "https://atrazzera.altervista.org/backend/upload_image.php",
        { method: "POST", body: fd }
      );
      const { id } = await res.json();
      return id;
    } catch {
      return 0;
    }
  };

  // Aggiunge o rimuove una categoria selezionata
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      const exists = prev.find((c) => c.id_categoria === cat.id_categoria);
      if (exists) {
        return prev.filter((c) => c.id_categoria !== cat.id_categoria);
      } else {
        return [...prev, cat];
      }
    });
  };

  // Gestione submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);

    // Upload copertina
    let coverId = 0;
    const coverInput = form.elements.namedItem("copertina");
    if (coverInput?.files?.length) {
      coverId = await uploadCoverImage(coverInput.files[0]);
    }
    fd.append("coverImageId", coverId);

    // ID immagini paragrafi
    paragraphs.forEach((p) => {
      fd.append("paragrafo_immagine[]", p.imageId);
    });

    // ID categorie selezionate
    selectedCategories.forEach((cat) => {
      fd.append("categorie[]", cat.id_categoria);
    });

    try {
      const res = await fetch(
        "https://atrazzera.altervista.org/backend/insert_article.php",
        { method: "POST", body: fd }
      );
      const text = await res.text();
      console.log("Server:", text);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (err) {
      console.error("Errore invio form:", err);
    }
  };

  return (
    <div className="bg-[#424B54] text-white font-sans min-h-screen pt-40 p-4">
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto space-y-8"
        encType="multipart/form-data"
      >
        {/* Titolo & Copertina */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <input
            type="text"
            name="titolo"
            placeholder="Titolo"
            required
            className="w-full p-3 mb-4 rounded-lg bg-[#C5BAAF] text-gray-900"
          />
          <p className="mb-2">Carica immagine di copertina</p>
          <input
            type="file"
            name="copertina"
            ref={coverFileInputRef}
            className="block w-full text-gray-900 file:rounded-lg file:bg-[#E1CE7A] file:px-4 file:py-2"
          />
        </div>

        {/* Paragrafi */}
        {paragraphs.map((p, idx) => (
          <div
            key={p.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Paragrafo {idx + 1}</h2>
              {paragraphs.length > 1 && (
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600"
                  onClick={() => removeParagraph(p.id)}
                >
                  Elimina paragrafo
                </button>
              )}
            </div>

            <input
              type="text"
              name="sottotitolo[]"
              placeholder="Sottotitolo"
              className="w-full p-3 mb-4 rounded-lg bg-[#C5BAAF] text-gray-900"
            />

            <textarea
              name="testo[]"
              placeholder="Testo"
              required
              className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
              style={{ height: "100px" }}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="bg-[#E1CE7A] px-4 py-2 rounded-lg text-black hover:bg-[#EBCFB2]"
                onClick={() => handleClickParagraphImage(p.id)}
              >
                Carica immagine
              </button>
              <input
                type="file"
                className="hidden"
                ref={(el) => (paragraphFileInputRefs.current[p.id] = el)}
                onChange={(e) => handleParagraphImageChange(e, p.id)}
              />
              <div className="flex space-x-2 text-xl">
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="strikethrough"
                    aria-label="Toggle strikethrough"
                  >
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              {p.imageId > 0 && (
                <span className="text-green-300 text-sm">
                  Caricata (ID {p.imageId})
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            type="button"
            onClick={addParagraph}
            className="bg-[#EBCFB2] px-6 py-3 rounded-lg text-black font-bold hover:bg-[#E1CE7A]"
          >
            + Paragrafo
          </button>
        </div>

        {/* Ringraziamenti */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Ringraziamenti e co-autori
          </h2>
          <textarea
            name="ringraziamenti"
            placeholder="Ringraziamenti"
            required
            className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
            style={{ height: "100px" }}
          />
        </div>

        {/* Categorie multi-selezione */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Seleziona categorie
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const selected = selectedCategories.some(
                (c) => c.id_categoria === cat.id_categoria
              );
              return (
                <button
                  key={cat.id_categoria}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded-full border ${
                    selected
                      ? "bg-[#E1CE7A] text-black border-transparent"
                      : "bg-transparent text-white border-gray-400"
                  } transition`}
                >
                  {cat.nome_categoria}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#EBCFB2] px-8 py-4 rounded-lg text-black font-bold hover:bg-[#E1CE7A]"
          >
            PUBBLICA
          </button>
        </div>
      </form>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 px-4 py-2 rounded-md text-white shadow-lg">
          Post creato
        </div>
      )}
    </div>
  );
}
