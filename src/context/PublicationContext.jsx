// src/context/PublicationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { publicationService } from "../services/publicationService";
import { useAuth } from "../hooks/useAuth";
const PublicationContext = createContext(null);
const PublicationProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      } 

      try {
        setLoading(true);
        // Ambil data publikasi dari server
        const data = await publicationService.getPublications();
        setPublications(data);
        setError(null);
        // setPublications(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);
  const addPublication = async (newPublication) => {
    try {
      const added = await publicationService.addPublication(newPublication);
      setPublications((prev) => [added, ...prev]);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  const editPublication = async (id, updatedPub) => {
    try {
      const updated = await publicationService.editPublication(id, updatedPub);
      setPublications((prev) =>
        prev.map((pub) => (pub.id === id ? updated : pub))
      );
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }
  const deletePublication = async (id) => {
    try {
      await publicationService.deletePublication(id);
      setPublications((prev) => prev.filter((pub) => pub.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  return (
    <PublicationContext.Provider
      value={{
        publications,
        loading,
        error,
        addPublication,
        editPublication,
        setPublications,
        deletePublication,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};
export { PublicationContext, PublicationProvider };
