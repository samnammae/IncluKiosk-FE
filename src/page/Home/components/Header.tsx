import styled from "styled-components";
import { useShopStore } from "../../../stores/shopStore";
import { useEffect } from "react";
import { setShopData } from "../../../apis/setShopData";
import TranslateContainer from "../../../components/TranslateContainer";
import LockButton from "../../../components/LockButton";

const Header = () => {
  const { titleImg } = useShopStore();

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");
    setShopData(Number(shopId));
  }, []);

  return (
    <BaseContainer>
      <LockButton isHeader={true} />
      {titleImg ? <BrandLogo src={titleImg} alt="브랜드 로고 이미지" /> : <></>}
      <TranslateContainer />
    </BaseContainer>
  );
};

export default Header;
const BaseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  position: relative;
`;
const BrandLogo = styled.img`
  height: 40%;
`;
