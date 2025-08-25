import styled from "styled-components";
import { useBrandStore } from "../../../stores/brandStore";

const Header = () => {
  const { titleImg } = useBrandStore();
  return (
    <BaseContainer>
      {titleImg ? <BrandLogo src={titleImg} /> : <></>}
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
