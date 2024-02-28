import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";
import { FaArrowLeft } from "react-icons/fa";

interface ButtonProps {
  children: React.ReactNode;
}

const HomeButton: React.FC<ButtonProps> = ({ children }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const buttonClass = `flex justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${
    theme === "light"
      ? "bg-ultra-light-mode text-ultra-dark-mode"
      : "bg-ultra-dark-mode text-light-mode"
  }`;

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <button className={buttonClass} onClick={goToHomePage}>
      {children}
    </button>
  );
};

const NotFound: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Error 404 - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex justify-center w-full flex-col items-center text-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <p className="mt-20 mb-12 text-7xl font-jost font-extrabold">
        Error 404 - Page Not Found
      </p>
      <p className="mb-4 mx-4 font-jost font-bold">
        The page you are looking for does not exist
      </p>
      <HomeButton>
        <FaArrowLeft className="mr-2" />
        Go back to safety
      </HomeButton>
    </div>
  );
};

export default NotFound;
