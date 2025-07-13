// import React,{useState} from "react";
// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     // Handle registration logic here
//     const res = await fetch("/api/register", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ name, email, password }),
//                     });
//     const data = await res.json();
//     if (res.ok) {
//       // Handle successful registration
//       console.log("Registration successful:", data);
//     } else {
//       // Handle registration error
//       console.error("Registration failed:", data);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor="Name">
//               Name
//             </label>
//             <input
//               type="text"
//               id="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }