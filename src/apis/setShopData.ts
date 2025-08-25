import { useBrandStore } from "../stores/brandStore";
import { MenuItemType, useMenuStore } from "../stores/menuStore";
import { menuAPI } from "./menu";
import { shopAPI } from "./shop";
interface categoryType {
  displayOrder: number;
  id: number;
  name: string;
}
export const setShopData = async (shopId: number) => {
  const {
    setMenuCategories,
    menuCategories,
    menusByCategory,
    setMenusByCategory,
    selectMenuCategory,
  } = useMenuStore.getState();
  const {
    setName,
    setIntroduction,
    setTitleImg,
    setLogoImg,
    setStartBackground,
  } = useBrandStore.getState();
  try {
    const shopDate = await shopAPI.getShop(shopId);
    const menuData = await menuAPI.getAllMenu(shopId);
    const categories = await menuAPI.getCategory(shopId);
    const categoriesData = categories.map((item: categoryType) => {
      return item.name;
    });

    setName(shopDate.name);
    setIntroduction(shopDate.startPage.introduction);
    setTitleImg(shopDate.mainImg);
    setLogoImg(shopDate.startPage.logoImg);
    setStartBackground(shopDate.startPage.startBackground);

    console.log("매장 데이터:", shopDate);
    console.log("메뉴 데이터:", menuData);
    console.log("카테고리 데이터:", categoriesData);

    //카테고리 설정
    setMenuCategories(categoriesData);
    selectMenuCategory(categoriesData[0]); // 선택된 카테고리 초기화

    // 카테고리별 메뉴 설정
    Object.entries(
      menuData.menusByCategory as { [key: string]: MenuItemType[] }
    ).forEach(([category, menus]) => {
      setMenusByCategory(category, menus);
    });

    // // 메뉴 데이터 설정
    // setMenuCategories(data.menuData.categories);
    // selectMenuCategory(data.menuData.categories[0]);

    // Object.entries(data.menuData.menusByCategory).forEach(
    //   ([category, menus]) => {
    //     setMenusByCategory(category, menus);
    //   }
    // );

    // setOptionCategories(data.menuData.optionCategories);

    // // 브랜드 테마 설정
    // setName(data.brandTheme.name);
    // setTitleImg(data.brandTheme.titleImg);
    // setLogoImg(data.brandTheme.logoImg);
    // setStartBackground(data.brandTheme.startBackground);
  } catch (error) {
    console.error("매장 데이터 로드 실패:", error);
    throw error;
  }
};
