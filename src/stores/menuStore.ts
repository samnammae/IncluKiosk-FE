import { create } from 'zustand';

// 메뉴 아이템 타입
export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  isSoldOut?: boolean;
  optionCategories?: string[];
}

// 개별 옵션 타입
interface OptionType {
  id: string;
  name: string;
  price: number;
  isSoldOut?: boolean;
}

// 옵션 카테고리 타입
export interface OptionCategoryType {
  id: string;
  name: string;
  type: 'single' | 'multiple'; // 단일 선택 또는 다중 선택
  required: boolean;
  min?: number; // 최소 선택 개수 (multiple일 때)
  max?: number; // 최대 선택 개수 (multiple일 때)
  displayOrder?: number; // 표시 순서
  options: OptionType[];
}

// 선택된 옵션 타입
export interface SelectedOptions {
  [categoryId: string]: string[]; // 카테고리별 선택된 옵션 ID들
}

// 장바구니 아이템 타입
export interface CartItem {
  id: string;
  MenuItemType: MenuItemType;
  selectedOptions: SelectedOptions;
  quantity: number;
  totalPrice: number;
}
// 장바구니 요약 정보
export interface CartSummary {
  totalItems: number; // 총 아이템 개수 (수량 합계)
  totalAmount: number; // 총 금액
}
// 스토어 인터페이스
export interface MenuStore {
  menuCategories: string[]; // 메뉴 카테고리들 (커피, 디저트 등)

  // 메뉴 카테고리별 메뉴 목록
  menusByCategory: {
    [category: string]: MenuItemType[];
  };

  // 모든 옵션 카테고리들
  optionCategories: {
    [categoryId: string]: OptionCategoryType;
  };

  selectedMenuCategory: string | null; // 현재 선택된 메뉴 카테고리
  selectedMenu: MenuItemType | null; // 현재 선택된 메뉴
  selectedOptions: SelectedOptions; // 현재 선택된 옵션들
  cart: CartItem[]; // 장바구니
  cartSummary: CartSummary;
  isDetailModalOpen: boolean;

  // 액션들
  setMenuCategories: (categories: string[]) => void;
  setMenusByCategory: (category: string, menus: MenuItemType[]) => void;
  setOptionCategories: (optionCategories: {
    [id: string]: OptionCategoryType;
  }) => void;
  selectMenuCategory: (category: string) => void;
  selectMenu: (menu: MenuItemType) => void;
  setSelectedOptions: (options: SelectedOptions) => void;
  setCart: (cart: CartItem[]) => void;
  clearSelection: () => void;
  setIsDetailModalOpen: (value: boolean) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;
  calculateCartSummary: () => void;
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  menuCategories: [],
  menusByCategory: {},
  optionCategories: {},
  selectedMenuCategory: null,
  selectedMenu: null,
  selectedOptions: {},
  cart: [],
  isDetailModalOpen: false,
  cartSummary: { totalItems: 0, totalAmount: 0 },

  setMenuCategories: (categories) => set({ menuCategories: categories }),

  setMenusByCategory: (category, menus) =>
    set((state) => ({
      menusByCategory: {
        ...state.menusByCategory,
        [category]: menus,
      },
    })),

  setOptionCategories: (optionCategories) => set({ optionCategories }),

  selectMenuCategory: (category) => set({ selectedMenuCategory: category }),

  selectMenu: (menu) => set({ selectedMenu: menu, selectedOptions: {} }),

  setSelectedOptions: (options) => set({ selectedOptions: options }),

  setCart: (cart) => {
    set({ cart });
    get().calculateCartSummary();
  },

  clearSelection: () => set({ selectedMenu: null, selectedOptions: {} }),
  setIsDetailModalOpen: (value) => set({ isDetailModalOpen: value }),

  // 장바구니 아이템 제거
  removeCartItem: (cartItemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== cartItemId),
    }));

    // 장바구니가 업데이트되면 요약 정보도 업데이트
    get().calculateCartSummary();
  },

  // 장바구니 비우기
  clearCart: () => {
    set({ cart: [] });
    get().calculateCartSummary();
  },

  // 장바구니 요약 정보 계산
  calculateCartSummary: () => {
    set((state) => {
      const totalItems = state.cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalAmount = state.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      return {
        cartSummary: {
          totalItems,
          totalAmount,
        },
      };
    });
  },
}));
