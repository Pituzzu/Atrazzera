import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function Post() {
  // Stato per gestire i paragrafi dinamici; per ogni paragrafo memorizziamo anche l'imageId (inizialmente 0)
  const [paragraphs, setParagraphs] = useState([{ id: Date.now(), imageId: 0 }]);
  // Stato per il toast
  const [toastVisible, setToastVisible] = useState(false);
  // Ref per l'input copertina
  const coverFileInputRef = useRef(null);

  // Aggiunge un nuovo paragrafo
  const addParagraph = () => {
    setParagraphs((prev) => [...prev, { id: Date.now(), imageId: 0 }]);
  };

  // Rimuove un paragrafo se ce ne sono più di uno
  const removeParagraph = (id) => {
    setParagraphs((prev) => prev.filter((p) => p.id !== id));
  };

  // Attiva l'input file nascosto per il paragrafo specifico
  const handleClickParagraphImage = (paragraphId) => {
    document.getElementById(`paragraph-image-${paragraphId}`).click();
  };

  // Carica l'immagine del paragrafo tramite il suo input file
  const handleParagraphImageChange = async (e, paragraphId) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const uploadRes = await fetch(
        "https://atrazzera.altervista.org/backend/upload_image.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadResult = await uploadRes.json();
      setParagraphs((prev) =>
        prev.map((p) =>
          p.id === paragraphId ? { ...p, imageId: uploadResult.id } : p
        )
      );
    } catch (err) {
      console.error("Errore nel caricamento dell'immagine del paragrafo:", err);
    }
  };

  // Carica la copertina tramite un endpoint separato
  const uploadCoverImage = async (coverFile) => {
    const coverFormData = new FormData();
    coverFormData.append("image", coverFile);
    try {
      const uploadRes = await fetch(
        "https://atrazzera.altervista.org/backend/upload_image.php",
        {
          method: "POST",
          body: coverFormData,
        }
      );
      const uploadResult = await uploadRes.json();
      return uploadResult.id;
    } catch (err) {
      console.error("Errore nel caricamento della copertina:", err);
      return 0;
    }
  };

  // Gestione dell'invio del form al backend PHP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Caricamento della copertina, se presente
    const coverInput = form.elements.namedItem("copertina");
    let coverImageId = 0;
    if (coverInput && coverInput.files && coverInput.files.length > 0) {
      coverImageId = await uploadCoverImage(coverInput.files[0]);
    }
    formData.append("coverImageId", coverImageId);

    // Per ogni paragrafo, aggiunge il relativo imageId al FormData
    paragraphs.forEach((p) => {
      formData.append("paragrafo_immagine[]", p.imageId);
    });

    try {
      const response = await fetch(
        "https://atrazzera.altervista.org/backend/insert_article.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.text();
      console.log("Risultato dal server:", result);
      // Mostra il toast per 3 secondi
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (error) {
      console.error("Errore durante l'invio:", error);
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
        {/* Sezione Titolo e Copertina */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              type="text"
              name="titolo"
              placeholder="Titolo"
              required
              className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
            />
          </div>
          <div>
            <p className="mb-2">Carica immagine di copertina</p>
            <input
              type="file"
              name="copertina"
              ref={coverFileInputRef}
              className="block w-full text-gray-900 file:py-2 file:px-4 file:border file:border-transparent file:rounded-lg file:bg-[#E1CE7A]"
            />
          </div>
        </div>

        {/* Sezione Paragrafi */}
        {paragraphs.map((paragraph, index) => (
          <div
            key={paragraph.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Paragrafo {index + 1}</h2>
              {paragraphs.length > 1 && (
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600"
                  onClick={() => removeParagraph(paragraph.id)}
                >
                  Elimina paragrafo
                </button>
              )}
            </div>
            <div>
              <input
                type="text"
                name="sottotitolo[]"
                placeholder="Sottotitolo paragrafo"
                className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900 mb-4"
              />
              <textarea
                name="testo[]"
                placeholder="Descrivere paragrafo"
                required
                className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
                style={{ height: "100px" }}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleClickParagraphImage(paragraph.id)}
                className="bg-[#E1CE7A] text-black px-4 py-2 rounded-lg hover:bg-[#EBCFB2] transition"
              >
                Carica immagine
              </button>
              <input
                type="file"
                id={`paragraph-image-${paragraph.id}`}
                onChange={(e) => handleParagraphImageChange(e, paragraph.id)}
                className="hidden"
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
              {paragraph.imageId ? (
                <span className="text-green-300 text-sm">
                  Immagine caricata (ID: {paragraph.imageId})
                </span>
              ) : null}
            </div>
          </div>
        ))}

        {/* Pulsante Aggiungi Paragrafo */}
        <div className="text-center">
          <button
            type="button"
            onClick={addParagraph}
            className="bg-[#EBCFB2] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#E1CE7A] transition"
          >
            + Paragrafo
          </button>
        </div>

        {/* Sezione Ringraziamenti e Co-autori */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Ringraziamenti e co-autori
          </h2>
          <textarea
            name="ringraziamenti"
            placeholder="Descrizione"
            required
            className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
            style={{ height: "100px" }}
          ></textarea>
        </div>

        {/* Sezione Categorie */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Categorie articolo</h2>
          <select
            name="categoria"
            required
            className="w-full p-3 rounded-lg bg-[#C5BAAF] text-gray-900"
          >
            <option value="">Seleziona una categoria</option>
            <option value="1">Pippo</option>
            <option value="2">Pippo</option>
            <option value="3">Pippo</option>
            <option value="4">Pippo</option>
            <option value="5">Pippo</option>
            <option value="6">Pippo</option>
          </select>
        </div>

        {/* Pulsante di submit "PUBBLICA" */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#EBCFB2] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#E1CE7A] transition"
          >
            PUBBLICA
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">
          Post creato
        </div>
      )}
    </div>
  );
}

export default Post;
