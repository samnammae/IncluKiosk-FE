import styled from "styled-components";
import MenuItem from "./MenuItem";
import { useMenuStore } from "../../../stores/menuStore";
import { Grow } from "@mui/material";
import InfoOutlineRoundedIcon from "@mui/icons-material/InfoOutlineRounded";
const MenuList = () => {
  const { menusByCategory, selectedMenuCategory } = useMenuStore();

  const isNomMenu = Object.entries(menusByCategory).find(
    (ele) => ele[0] === selectedMenuCategory
  );
  const hasMenus = selectedMenuCategory !== null && isNomMenu !== undefined;
  return (
    <BaseContainer $hasMenus={hasMenus}>
      {hasMenus ? (
        menusByCategory[selectedMenuCategory].map((item, index) => (
          <Grow
            in={true}
            key={item.id}
            style={{ transformOrigin: "0 0 0" }}
            {...(index > 0 ? { timeout: 300 + index * 200 } : {})}
          >
            <div>
              <MenuItem item={item} />
            </div>
          </Grow>
        ))
      ) : (
        <NoMenuComponent />
      )}
    </BaseContainer>
  );
};
export default MenuList;

const BaseContainer = styled.div<{ $hasMenus: boolean }>`
  width: 100%;
  padding: 20px;

  ${({ $hasMenus }) =>
    $hasMenus
      ? `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      `
      : `
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        min-height: 400px;
      `}
`;
const NoMenuComponent = () => {
  return (
    <NoMenuContainer>
      <IconWrapper>
        <InfoOutlineRoundedIcon sx={{ fontSize: 64 }} />
      </IconWrapper>
      <TextWrapper>
        <NoMenuText>등록된 메뉴가 없습니다</NoMenuText>
        <SubText>더 좋은 메뉴로 곧 찾아뵙겠습니다!</SubText>
      </TextWrapper>
    </NoMenuContainer>
  );
};

const NoMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 80px 20px;
  text-align: center;
  min-height: 300px;
`;

const NoMenuText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const SubText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: #6c757d;
  line-height: 1.5;
`;
const IconWrapper = styled.div`
  color: #495057;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
