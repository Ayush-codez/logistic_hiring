// import "./App.css";
// import RegistrationForm from "./pages/RegistrationForm";

// function App() {
//   return (
//     <>
//       <RegistrationForm />
//     </>
//   );
// }

// export default App;

// App.jsx
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import Success from "./pages/Success"; // Create this file (next step)
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;

