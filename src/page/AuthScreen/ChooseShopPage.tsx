import { AuthCard, AuthContainer, Background, Title } from "./styles";
import IncluKiosk from "../../assets/imgs/IncluKiosk.png";
import { useEffect, useState } from "react";
import { shopAPI } from "../../apis/shop";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { chooseShopType } from "../../stores/shopStore";
import { setShopData } from "../../apis/setShopData";
import { useNavigate } from "react-router-dom";

const ChooseShopPage = () => {
  const [shopList, setShopList] = useState<chooseShopType[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["shop"],
    queryFn: shopAPI.getAllShop,
  });
  useEffect(() => {
    setShopList(data);
    console.log("data", data);
  }, [data, isLoading]);
  useEffect(() => {
    console.log("shopList", shopList);
  }, [shopList]);
  return (
    <Background>
      <Title>
        <img src={IncluKiosk} />
      </Title>
      <AuthContainer>
        {isLoading ? (
          <IsLodingContainer />
        ) : shopList?.length > 0 ? (
          <IsShopSelect shopList={shopList} />
        ) : (
          <IsShopNotFound />
        )}
      </AuthContainer>
    </Background>
  );
};

export default ChooseShopPage;
interface IsShopSelectProps {
  shopList: chooseShopType[];
}
const IsShopSelect = ({ shopList }: IsShopSelectProps) => {
  const nav = useNavigate();

  return (
    <AuthCard>
      <Container>
        <Message>매장을 선택해주세요</Message>
        <ListWrapper>
          {shopList.map((shop) => (
            <ListItem
              key={shop.storeId}
              onClick={() => {
                nav("/home");
                setShopData(shop.storeId);
              }}
            >
              {shop.mainImg ? (
                <ItemImg src={shop.mainImg} />
              ) : (
                <NoImg>이미지 없음</NoImg>
              )}
              <ItemWrapper>
                <ItemTitle>{shop.name}</ItemTitle>
                <ItemAddress>{shop.address}</ItemAddress>
              </ItemWrapper>
            </ListItem>
          ))}
        </ListWrapper>
      </Container>
    </AuthCard>
  );
};

const IsLodingContainer = () => {
  return <LoadingStyle>매장을 불러오는 중 ...</LoadingStyle>;
};

const IsShopNotFound = () => {
  return (
    <AuthCard>
      <Container>
        <IconWrapper>
          <StyledInfoIcon />
        </IconWrapper>
        <Message>등록된 매장이 없습니다.</Message>
        <SubMessage>관리자페이지에서 새로운 매장을 등록해보세요!</SubMessage>
      </Container>
    </AuthCard>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
  gap: 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledInfoIcon = styled(InfoOutlinedIcon)`
  width: 80px !important;
  height: 80px !important;
  color: ${({ theme }) => theme.colors.grey[400]};
`;

const Message = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.grey[700]};
  text-align: center;
`;

const SubMessage = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  color: ${({ theme }) => theme.colors.grey[700]};
  text-align: center;
  white-space: nowrap;
`;

const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20%;
  padding-bottom: 60%;
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  color: ${({ theme }) => theme.colors.white};
  animation: pulse 3s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 450px;
  overflow-y: auto;
  padding: 8px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey[300]};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.grey[400]};
    }
  }
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 64px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${({ theme }) => theme.colors.standard};
    background: ${({ theme }) => theme.colors.grey[100]};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ItemImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.grey[200]};
  flex-shrink: 0;
`;

const NoImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.grey[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme }) => theme.colors.grey[500]};
  text-align: center;
  flex-shrink: 0;
  border: 3px solid ${({ theme }) => theme.colors.grey[300]};
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const ItemTitle = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  color: ${({ theme }) => theme.colors.grey[700]};
  line-height: 1.2;
`;

const ItemAddress = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.grey[600]};
  line-height: 1.4;
  word-break: keep-all;
`;
