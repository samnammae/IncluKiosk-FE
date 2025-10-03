import styled from "styled-components";
import { useShopStore } from "../../../stores/shopStore";
import { useEffect } from "react";
import { setShopData } from "../../../apis/setShopData";

const Header = () => {
  const { titleImg } = useShopStore();

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");
    setShopData(Number(shopId));
  }, []);

  return (
    <BaseContainer>
      {titleImg ? <BrandLogo src={titleImg} alt="브랜드 로고 이미지" /> : <></>}
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
`;
const BrandLogo = styled.img`
  height: 40%;
`;
