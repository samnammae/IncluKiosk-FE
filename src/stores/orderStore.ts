import { create } from "zustand";
import { orderAPI } from "../apis/order";

// 주문 타입 및 결제 방법
export type OrderType = "STORE" | "TAKEOUT";
export type PaymentMethod = "CARD" | "CASH" | "MOBILE" | null;

// 결제 단계
export enum PaymentStep {
  ORDER_TYPE = "ORDER_TYPE",
  CHECK_ORDER = "CHECK_ORDER",
  PAYMENT_METHOD = "PAYMENT_METHOD",
  PROCESSING = "PROCESSING",
  COMPLETE = "COMPLETE",
}

// 주문 아이템 타입
export interface OrderItem {
  menuId: string;
  menuName: string;
  basePrice: number;
  selectedOptions: {
    [categoryId: string]: string[];
  };
  optionPrice: number;
  quantity: number;
  totalPrice: number;
}

// 주문 요청 타입
export interface OrderRequest {
  storeId: string;
  storeName: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
}

// 주문 응답 타입
export interface OrderResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    orderId: string;
    orderNumber: string;
  };
}

interface OrderStore {
  // UI 상태
  isOpen: boolean;
  currentStep: PaymentStep;
  isLoading: boolean;
  error: string | null;

  // 주문 선택 상태
  orderType: OrderType | null;
  paymentMethod: PaymentMethod | null;

  // 주문 데이터
  orderRequest: OrderRequest | null;
  orderResponse: OrderResponse | null;

  // 매장 정보 (매장/포장 선택(오더타입)에서 설정)
  storeInfo: {
    storeId: string;
    storeName: string;
  } | null;

  // UI 액션들
  setIsOpen: (value: boolean) => void;
  setCurrentStep: (step: PaymentStep) => void;
  setOrderType: (type: OrderType) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // 매장 정보 설정
  setStoreInfo: (info: { storeId: string; storeName: string }) => void;

  // 주문 데이터 관련
  buildOrderRequest: (cartItems: any[], cartSummary: any) => void;
  submitOrder: () => Promise<void>;

  // 네비게이션
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
  onClose: () => void;

  // 유효성 검사
  canProceedToNext: () => boolean;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  // 초기 상태
  isOpen: false,
  currentStep: PaymentStep.ORDER_TYPE,
  isLoading: false,
  error: null,
  orderType: null,
  paymentMethod: null,
  orderRequest: null,
  orderResponse: null,
  storeInfo: null,

  // UI 액션들
  setIsOpen: (value) => set({ isOpen: value }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setOrderType: (type) => set({ orderType: type }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),

  // 매장 정보 설정
  setStoreInfo: (info) => set({ storeInfo: info }),

  // 장바구니 데이터를 주문 요청 형태로 변환
  buildOrderRequest: (cartItems, cartSummary) => {
    const { storeInfo, orderType } = get();

    if (!storeInfo || !orderType) {
      set({ error: "매장 정보와 주문 타입이 필요합니다." });
      return;
    }
    // CartItem을 OrderItem으로 변환
    const items: OrderItem[] = cartItems.map((cartItem: any) => ({
      menuId: cartItem.MenuItemType.id,
      menuName: cartItem.MenuItemType.name,
      basePrice: cartItem.MenuItemType.price,
      selectedOptions: Object.fromEntries(
        Object.entries(cartItem.selectedOptions).map(
          ([categoryId, optionIds]) => [
            String(categoryId),
            (optionIds as number[]).map((id) => String(id)),
          ]
        )
      ),
      optionPrice:
        cartItem.totalPrice - cartItem.MenuItemType.price * cartItem.quantity,
      quantity: cartItem.quantity,
      totalPrice: cartItem.totalPrice,
    }));

    const orderRequest: OrderRequest = {
      storeId: storeInfo.storeId,
      storeName: storeInfo.storeName,
      orderType,
      paymentMethod: "CARD",
      items,
      totalAmount: cartSummary.totalAmount,
      totalItems: cartSummary.totalItems,
    };

    set({ orderRequest, error: null });
  },

  // 주문 제출
  submitOrder: async () => {
    const { orderRequest } = get();
    console.log("주문 전 리퀘스트", orderRequest);
    if (!orderRequest) {
      set({ error: "주문 데이터가 없습니다." });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const result = await orderAPI.addOrder(orderRequest);
      console.log("주문 후 리스펀스", result);
      if (result.success) {
        set({
          orderResponse: result,
          isLoading: false,
        });
      } else {
        set({
          error: result.message || "주문 처리 중 오류가 발생했습니다.",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: "네트워크 오류가 발생했습니다.",
        isLoading: false,
      });
    }
  },

  // 다음 단계 이동
  moveToNextStep: () => {
    const { currentStep } = get();

    if (!get().canProceedToNext()) return;

    switch (currentStep) {
      case PaymentStep.ORDER_TYPE:
        set({ currentStep: PaymentStep.CHECK_ORDER });
        break;
      case PaymentStep.CHECK_ORDER:
        set({ currentStep: PaymentStep.PAYMENT_METHOD });
        break;
      case PaymentStep.PAYMENT_METHOD:
        set({ currentStep: PaymentStep.PROCESSING });
        get().submitOrder();
        break;
      case PaymentStep.PROCESSING:
        set({ currentStep: PaymentStep.COMPLETE });
        break;
      case PaymentStep.COMPLETE:
        get().onClose();
        break;
    }
  },

  // 이전 단계 이동
  moveToPreviousStep: () => {
    const { currentStep } = get();

    switch (currentStep) {
      case PaymentStep.CHECK_ORDER:
        set({ currentStep: PaymentStep.ORDER_TYPE });
        break;
      case PaymentStep.PAYMENT_METHOD:
        set({ currentStep: PaymentStep.CHECK_ORDER });
        break;
    }
  },

  // 다음 단계로 진행 가능한지 확인
  canProceedToNext: () => {
    const { currentStep, orderType, paymentMethod, orderRequest } = get();

    switch (currentStep) {
      case PaymentStep.ORDER_TYPE:
        return orderType !== null;
      case PaymentStep.CHECK_ORDER:
        return orderRequest !== null;
      case PaymentStep.PAYMENT_METHOD:
        return paymentMethod !== null;
      default:
        return true;
    }
  },

  // 모달 닫기 및 초기화
  onClose: () => {
    set({
      isOpen: false,
      currentStep: PaymentStep.ORDER_TYPE,
      isLoading: false,
      error: null,
      orderType: null,
      paymentMethod: null,
      orderRequest: null,
      orderResponse: null,
    });
  },
}));
