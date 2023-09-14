import { useEffect, useState } from "react";
import "./headerBanner.css";

const HeaderBanner = () => {
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    const updatePageName = () => {
      const url = window.location.href;
      const newPageName = url.split("/")[3] || "My Gym";
      setPageName(newPageName);
    };

    updatePageName();

    window.addEventListener("popstate", updatePageName);

    return () => {
      window.removeEventListener("popstate", updatePageName);
    };
  }, []);

  return (
    <header className="header">
      <img
        src="/images/background.jpg"
        alt="Our best gym."
        className="header__img"
      />
      <div className="header__wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
          <path
            fill="#111111"
            d="M0,125L48,135C96,145,192,165,288,160C384,155,480,125,576,122C672,119,768,141,864,150C960,159,1056,149,1152,146C1248,143,1344,147,1392,149.3L1440,151L1440,250L1392,250C1344,250,1248,250,1152,250C1056,250,960,250,864,250C768,250,672,250,576,250C480,250,384,250,288,250C192,250,96,250,48,250L0,250Z"
          ></path>
        </svg>
      </div>

      <h1 className="header__title">{pageName}</h1>
    </header>
  );
};

export default HeaderBanner;
