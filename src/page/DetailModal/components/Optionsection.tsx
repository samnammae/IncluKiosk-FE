import styled from "styled-components";
import { useMenuStore } from "../../../stores/menuStore";
import { useState, useEffect } from "react";

interface OptionsectionProps {
  setOptionCost: (value: number) => void;
  setIsAllCheck: (value: boolean) => void;
}

const Optionsection = ({
  setOptionCost,
  setIsAllCheck,
}: OptionsectionProps) => {
  const { selectedMenu, optionCategories, setSelectedOptions } = useMenuStore();

  // 선택된 메뉴의 옵션 카테고리 ID로 실제 옵션 카테고리 찾기
  const availableOptions =
    selectedMenu?.optionCategoryIds
      ?.map((id) => optionCategories.find((category) => category.id === id))
      .filter(
        (category): category is NonNullable<typeof category> =>
          category !== undefined
      ) || [];

  // 로컬 선택 상태 관리
  const [selectedOptions, setLocalSelectedOptions] = useState<{
    [categoryId: number]: number[];
  }>({});

  // 옵션 선택 핸들러
  const handleOptionSelect = (categoryId: number, optionId: number) => {
    setLocalSelectedOptions((prev) => {
      const newOptions = { ...prev };
      const category = availableOptions.find((cat) => cat.id === categoryId);

      if (!category) return prev;

      if (category.type === "SINGLE") {
        // 단일 선택: 이미 선택된 것이면 해제, 아니면 새로 선택
        if (newOptions[categoryId]?.includes(optionId)) {
          newOptions[categoryId] = [];
        } else {
          newOptions[categoryId] = [optionId];
        }
      } else {
        // 다중 선택: 토글 방식
        if (!newOptions[categoryId]) {
          newOptions[categoryId] = [];
        }

        if (newOptions[categoryId].includes(optionId)) {
          newOptions[categoryId] = newOptions[categoryId].filter(
            (id) => id !== optionId
          );
        } else {
          newOptions[categoryId] = [...newOptions[categoryId], optionId];
        }
      }

      return newOptions;
    });
  };

  // 옵션 비용 계산
  useEffect(() => {
    let totalCost = 0;

    Object.entries(selectedOptions).forEach(([categoryId, optionIds]) => {
      const category = availableOptions.find(
        (cat) => cat.id === Number(categoryId)
      );

      // optionIds는 배열이므로 forEach로 순회
      optionIds.forEach((optionId) => {
        const option = category?.options.find((opt) => opt.id === optionId);
        if (option) {
          totalCost += option.price;
        }
      });
    });

    setOptionCost(totalCost);
  }, [selectedOptions, availableOptions, setOptionCost]);

  // 필수 옵션 체크
  useEffect(() => {
    const requiredCategories = availableOptions.filter((cat) => cat.required);
    const allRequiredSelected = requiredCategories.every(
      (cat) => selectedOptions[cat.id] && selectedOptions[cat.id].length > 0
    );

    setIsAllCheck(allRequiredSelected);
  }, [selectedOptions, availableOptions, setIsAllCheck]);

  // 전역 스토어에 선택된 옵션 저장 (장바구니 담기 시 사용)
  useEffect(() => {
    const globalSelectedOptions: { [categoryId: number]: number[] } = {};

    Object.entries(selectedOptions).forEach(([categoryId, optionIds]) => {
      globalSelectedOptions[Number(categoryId)] = optionIds;
    });

    setSelectedOptions(globalSelectedOptions);
  }, [selectedOptions, setSelectedOptions]);

  return (
    <Container>
      {availableOptions.map((category) => (
        <OptionContainer key={category.id}>
          <OptionCategoryName>
            {category.name}
            {category.required && <span> 필수 선택 *</span>}
          </OptionCategoryName>
          <OptionsWrapper>
            {category.options.map((option) => (
              <OptionItem
                key={option.id}
                $isSelected={selectedOptions[category.id]?.includes(option.id)}
                onClick={() => handleOptionSelect(category.id, option.id)}
              >
                <OptionLabel>
                  <OptionName>{option.name}</OptionName>
                  <OptionPrice
                    $isSelected={selectedOptions[category.id]?.includes(
                      option.id
                    )}
                  >
                    +{option.price.toLocaleString()}원
                  </OptionPrice>
                </OptionLabel>
              </OptionItem>
            ))}
          </OptionsWrapper>
        </OptionContainer>
      ))}
    </Container>
  );
};

export default Optionsection;

const Container = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  overflow-y: auto;
`;

const OptionContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const OptionCategoryName = styled.div`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  margin-bottom: 12px;
  position: relative;

  span {
    color: ${({ theme }) => theme.colors.main};
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    margin-left: 12px;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const OptionItem = styled.div<{ $isSelected?: boolean }>`
  padding: 12px;
  border: 1px solid
    ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.main : theme.colors.grey[300]};
  border-radius: 8px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.main : "transparent"};
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white : "")};
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    border-color: ${({ theme }) => theme.colors.main};
  }
`;

const OptionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const OptionName = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
`;

const OptionPrice = styled.div<{ $isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.grey[600]};
  transition: all 0.1s ease-in;
`;
