import { useEffect } from "react";

const GoogleTranslateLoader = () => {
  useEffect(() => {
    if (window.googleTranslateElementInit) return;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "ko", autoDisplay: true },
          "google_translate_element"
        );
      }
    };
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
};

export default GoogleTranslateLoader;
