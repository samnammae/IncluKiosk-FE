import React from "react";
import styled from "styled-components";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "ko", name: "한국어", flag: "kr" }, // 한국어
  { code: "en", name: "English", flag: "us" }, // 영어
  { code: "zh-CN", name: "中文(简体)", flag: "cn" }, // 중국어
  { code: "ja", name: "日本語", flag: "jp" }, // 일본어
];

const TranslateContainer: React.FC = () => {
  const handleLanguageChange = (lang: Language) => {
    const value = lang.code;
    const gtCombo = document.querySelector<HTMLSelectElement>(".goog-te-combo");

    if (gtCombo) {
      gtCombo.value = value;
      gtCombo.dispatchEvent(new Event("change"));
      console.log("언어 변경:", lang);
      setTimeout(() => {
        gtCombo.dispatchEvent(new Event("change"));
      }, 200);
    } else {
      console.warn("⚠️ Google Translate element (.goog-te-combo) not found");
    }
  };

  return (
    <Container>
      {languages.map((lang) => (
        <LanguageItem
          key={lang.code}
          className="notranslate"
          onClick={() => handleLanguageChange(lang)}
        >
          <Flag flag={lang.flag} />
        </LanguageItem>
      ))}
    </Container>
  );
};

export default TranslateContainer;

/* === styled-components === */

const Container = styled.div`
  display: flex;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  gap: 16px;
  position: absolute;
  top: 80px;
  right: 30px;
`;

const LanguageItem = styled.div`
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.2s ease;
  border-radius: 8px;
  padding: 2px;

  &:hover {
    background-color: #f3f4f6;
    transform: scale(1.05);
  }
`;

const Flag = styled.div<{ flag: string }>`
  width: 49px;
  height: 35px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 6px;
  background-image: ${({ flag }) => `url(https://flagcdn.com/w40/${flag}.png)`};
`;
