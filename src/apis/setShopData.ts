import { useShopStore } from "../stores/shopStore";
import { MenuItemType, useMenuStore } from "../stores/menuStore";
import { menuAPI } from "./menu";
import { shopAPI } from "./shop";
interface categoryType {
  displayOrder: number;
  id: number;
  name: string;
}
export const setShopData = async (shopId: number) => {
  //매장 기본정보
  const {
    setName,
    setIntroduction,
    setTitleImg,
    setLogoImg,
    setStartBackground,
  } = useShopStore.getState();

  //매장 카테고리, 메뉴, 옵션 설정
  const {
    setMenuCategories,
    setMenusByCategory,
    selectMenuCategory,
    setOptionCategories,
  } = useMenuStore.getState();

  try {
    //조회 api연결
    const shopDate = await shopAPI.getShop(shopId);
    const menuData = await menuAPI.getAllMenu(shopId);
    const categories = await menuAPI.getCategory(shopId);
    const optios = await menuAPI.getAllOptions(shopId);
    const categoriesData = categories.map((item: categoryType) => {
      return item.name;
    });

    //매장 기본정보 store 설정
    setName(shopDate.name);
    setIntroduction(shopDate.startPage.introduction);
    setTitleImg(shopDate.mainImg);
    setLogoImg(shopDate.startPage.logoImg);
    setStartBackground(shopDate.startPage.startBackground);

    console.log("매장 데이터:", shopDate);
    console.log("메뉴 데이터:", menuData);
    console.log("카테고리 데이터:", categoriesData);

    //해당 매장 메뉴, 카테고리, 옵션 설정
    //카테고리 설정
    setMenuCategories(categoriesData);
    selectMenuCategory(categoriesData[0]); // 선택된 카테고리 초기화

    // 카테고리별 메뉴 설정
    Object.entries(
      menuData.menusByCategory as { [key: string]: MenuItemType[] }
    ).forEach(([category, menus]) => {
      setMenusByCategory(category, menus);
    });
    //옵션 설정
    setOptionCategories(optios);
  } catch (error) {
    console.error("매장 데이터 로드 실패:", error);
    throw error;
  }
};
