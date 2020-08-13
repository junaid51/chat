import React, { useState, useEffect } from "react";
import { initCap, setValue, getValue } from "../../utils/globalFunctions";
import { globals } from "../../utils/globals";

const Theme = () => {
  const [theme, setTheme] = useState(globals.supportedThemes[0].theme);

  useEffect(() => {
    const initColor = async () => {
      const theme = await getValue("theme");
      theme && setTheme(theme);
    };
    initColor();
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    html.dataset.theme = theme;
    setValue("theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-link"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {initCap(theme === "dark" ? "light" : "dark")} mode
    </button>
  );
};

export default Theme;
