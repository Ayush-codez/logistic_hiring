import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Form Submitted Successfully!</h1>
      <p className="text-gray-700 text-center mb-6">
        Thank you for registering. We’ll get in touch with you shortly.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition-all"
      >
        Go Back to Form
      </Link>
    </div>
  );
};

export default Success;
