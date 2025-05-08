import styled from 'styled-components';
import { useMenuStore } from '../../../../stores/menuStore';

const Infosection = () => {
  const { selectedMenu } = useMenuStore();

  return (
    <>
      {!selectedMenu ? null : (
        <>
          <ImageSection>
            <ItemImage src={selectedMenu.image} alt={selectedMenu.name} />
          </ImageSection>
          <InfoContent>
            <ItemHeader>
              <ItemName>{selectedMenu.name}</ItemName>
            </ItemHeader>

            <ItemDescription>
              {selectedMenu.description || '맛있는 메뉴를 지금 바로 맛보세요.'}
            </ItemDescription>

            <ItemPrice>{selectedMenu.price.toLocaleString()}원</ItemPrice>
          </InfoContent>
        </>
      )}
    </>
  );
};

export default Infosection;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ItemImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ItemName = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.standardText};
  margin: 0;
`;

const ItemDescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.grey[600]};
  margin-bottom: 16px;
`;

const ItemPrice = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.standardText};
`;
