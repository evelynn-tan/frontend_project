import React from "react";
import editIcon from "../assets/edit.png"
import removeIcon from "../assets/remove.png"
import { usePublications } from "../hooks/usePublications";
import { useNavigate } from "react-router-dom";
export default function PublicationListPage() {
  const { publications, editPublication, deletePublication } = usePublications(); //ini js hook
  const navigate = useNavigate();
  const handleEdit = (id) => {
    // Navigasi ke halaman edit dengan ID publikasi
    navigate(`/publications/edit/${id}`);
  };
  const handleDelete = (id, title) => {
    // Tampilkan dialog konfirmasi
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) {
      // Panggil fungsi delete dari context
      deletePublication(id).catch(err => {
        alert("Gagal menghapus publikasi: " + err.message);
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Daftar Publikasi BPS Provinsi Kepulauan Riau
        </h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>
      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-m text-center text-gray-500">
          <thead className="text-xs text-white uppercase bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-center w-16 text-sm">
                No
              </th>
              <th scope="col" className="px-6 py-3 text-sm">
                Judul
              </th>
              <th scope="col" className="px-6 py-3 text-sm">
                Tanggal Rilis
              </th>
              <th scope="col" className="px-6 py-3 text-center text-sm">
               Deskripsi
              </th>
              <th scope="col" className="px-6 py-3 text-center text-sm">
                Sampul
              </th>
              <th scope="col" className="px-6 py-3 text-center text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {publications.map((pub, idx) => (
              <tr
                key={pub.id}
                className="bg-white border-b hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 font-medium text-gray-900 text-center">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {pub.title}
                </td>
                <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
                <td className="px-6 py-4 text-gray-600">
                  {pub.description.length > 100
                    ? `${pub.description.substring(0, 100)}...`
                    : pub.description}
                </td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <img
                    src={pub.coverUrl}
                    alt={`Sampul ${pub.title}`}
                    className="h-24 w-auto object-cover rounded shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/100x140/cccccc/ffffff?text=Error";
                    }}
                  />
                </td>
                <td className="px-6 py-4 items-center gap-2">
                  <button
                    className="inline-block p-1 hover:bg-yellow-100 rounded"
                    title="Edit"
                    onClick={() => handleEdit(pub.id)}
                  >
                    <img src={editIcon} alt="edit" className="w-6 h-6 inline"/>
                  </button>
                  <button
                    className="inline-block p-1 hover:bg-red-100 rounded"
                    onClick={() => handleDelete(pub.id, pub.title)}
                  >
                    <img src={removeIcon} alt="edit" className="w-6 h-6 inline"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
