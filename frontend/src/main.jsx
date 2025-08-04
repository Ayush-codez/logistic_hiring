import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { FormProvider } from "./context/FormContext.jsx";
import { AdminProvider } from "./context/AdminProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FormProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </FormProvider>
    </BrowserRouter>
  </StrictMode>
);
