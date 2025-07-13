import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePublications } from "../hooks/usePublications";
import { publicationService, uploadImageToCloudinary } from "../services/publicationService";

export default function EditPub() {
  // 1. Ambil ID dari URL
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Ambil data publikasi dari context
  const { editPublication } = usePublications();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Gunakan useEffect untuk mencari data publikasi berdasarkan ID
  useEffect(() => {
    // Fungsi async di dalam useEffect untuk mengambil data
    const fetchPublicationData = async () => {
      try {
        // Gunakan fungsi service yang baru
        const data = await publicationService.getPublicationById(id);
        setTitle(data.title);
        setDescription(data.description);
        setReleaseDate(data.releaseDate);
        setCoverUrl(data.coverUrl);
      } catch (error) {
        console.error("Failed to fetch publication:", error);
        alert("Publikasi dengan ID ini tidak ditemukan.");
        navigate("/publications");
      } finally {
        setIsLoading(false); // Hentikan loading setelah selesai (sukses atau gagal)
      }
    };

    fetchPublicationData();
  }, [id, navigate]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalCoverUrl = coverUrl;
      // Jika ada file baru, upload dulu
      if (coverFile) {
        finalCoverUrl = await uploadImageToCloudinary(coverFile);
      }

      const updatedData = {
        title,
        description,
        releaseDate,
        coverUrl: finalCoverUrl,
      };

      // 3. Gunakan try...catch yang benar
      await editPublication(parseInt(id), updatedData);

      alert("Publikasi berhasil diupdate!");
      navigate("/publications");
    } catch (error) {
      alert("Gagal mengedit publikasi: " + error.message);
      setIsSubmitting(false); // Jangan lupa set false jika ada error
    }
  };

  // 4. Tampilkan loading berdasarkan status dari context
  if (isLoading) {
    return <div>Memuat data publikasi...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Publikasi</h2>

        {/* -- Input Judul -- */}
        <label className="block mb-2 font-semibold">Judul</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* ... sisa form Anda ... */}
        <label className="block mb-2 font-semibold">Tanggal Rilis</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2 mb-4"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <label className="block mb-2 font-semibold">Deskripsi</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          rows={4}
        />
        <label className="block mb-2 font-semibold">Sampul (Gambar)</label>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
          />
        </div>
        <img
          src={
            coverFile
              ? URL.createObjectURL(coverFile)
              : coverUrl || "/placeholder.jpg"
          }
          alt="Preview Sampul"
          className="h-24 w-auto mb-4 rounded shadow"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => navigate("/publications")}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-sky-700 text-white hover:bg-sky-800 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
