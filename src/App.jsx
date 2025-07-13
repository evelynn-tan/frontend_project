import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicationListPage from "./components/PublicationListPage";
import AddPublicationPage from "./components/AddPublicationPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import PublicationListPage from "./components/PublicationListPage";
// import AddPublicationPage from "./components/AddPublicationPage";
import Footer from "./components/footer";
import EditPub from "./components/EditPub";
import LoginPage from "./components/LoginPage";
export default function App() {
  // const [publications, setPublications] = useState(initialPublications);
  // const [currentPage, setCurrentPage] = useState("publications");
  // const [editPublication, setEditPublication] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(true); // true = sudah login
  // const handleAddPublication = (newPub) => {
  //   setPublications([newPub, ...publications]);
  // };
  // let pageContent;
  // if (currentPage === "editpub" && editPublication) {
  //   pageContent = (
  //     <EditPub
  //       publication={editPublication}
  //       setCurrentPage={setCurrentPage}
  //     />
  //   );
  // } else if (currentPage === "add") {
  //   pageContent = (
  //     <AddPublicationPage
  //       onAddPublication={handleAddPublication}
  //       setCurrentPage={setCurrentPage}
  //     />
  //   );
  // } else {
  //   pageContent = (
  //     <PublicationListPage
  //       publications={publications}
  //       onEditPublication={(pub) => {
  //         setEditPublication(pub);
  //         setCurrentPage("editpub");
  //       }}
  //     />
  //   );
  // }
  // if (!isLoggedIn) {
  //   return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  // }
  return (
    <div className="bg-gray-100 min-h-screen font-calibri">
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/publications" element={
            <ProtectedRoute>
              <PublicationListPage />
            </ProtectedRoute>
          } />
          <Route path="/publications/add" element={
            <ProtectedRoute>
              <AddPublicationPage />
            </ProtectedRoute>
          } />
          <Route path="/publications/edit/:id" element={
            <ProtectedRoute>
              <EditPub />
            </ProtectedRoute>
          } />
          {/* <Route path="/Register" element={<RegisterPage />} /> */}
          <Route path="/" element={<Navigate to="/publications" replace />} />
          <Route path="*" element={<Navigate to="/publications" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
