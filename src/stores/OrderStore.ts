import { create } from 'zustand';

export enum PaymentStep {
  ORDER_TYPE = 'ORDER_TYPE',
  CHECK_ORDER = 'CHECK_ORDER',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
}

type OrderType = 'STORE' | 'TAKEOUT' | null;
type PaymentMethod = 'CARD' | 'CASH' | 'MOBILE' | null;

interface OrderStore {
  isOpen: boolean; // 모달 상태
  currentStep: PaymentStep; // 현재 결제 단계
  orderType: OrderType; // 선택된 주문 타입 (매장/포장)
  paymentMethod: PaymentMethod; // 선택된 결제 방법

  // 상태 설정 함수들
  setIsOpen: (value: boolean) => void;
  setCurrentStep: (step: PaymentStep) => void;
  setOrderType: (type: OrderType) => void;
  setPaymentMethod: (method: PaymentMethod) => void;

  // 내비게이션 함수들
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;

  onClose: () => void; // 모달 닫기 함수
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  // 초기 상태
  isOpen: false,
  currentStep: PaymentStep.ORDER_TYPE,
  orderType: null,
  paymentMethod: null,

  // 상태 설정 함수들
  setIsOpen: (value) => set({ isOpen: value }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setOrderType: (type) => set({ orderType: type }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  // 다음 단계로 이동하는 함수
  moveToNextStep: () => {
    const { currentStep } = get();

    switch (currentStep) {
      case PaymentStep.ORDER_TYPE:
        set({ currentStep: PaymentStep.CHECK_ORDER });
        break;
      case PaymentStep.CHECK_ORDER:
        set({ currentStep: PaymentStep.PAYMENT_METHOD });
        break;
      case PaymentStep.PAYMENT_METHOD:
        set({ currentStep: PaymentStep.PROCESSING });
        break;

      case PaymentStep.PROCESSING:
        set({ currentStep: PaymentStep.COMPLETE });
        break;

      case PaymentStep.COMPLETE:
        get().onClose();
        break;
    }
  },

  // 이전 단계로 돌아가는 함수
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

  // 모달 닫기 및 초기화 함수
  onClose: () => {
    set({
      isOpen: false,
      currentStep: PaymentStep.ORDER_TYPE,
      orderType: null,
      paymentMethod: null,
    });
  },
}));
