import styled from 'styled-components';
import { useMenuStore } from '../../Home/stores/menuStore';
import { useState, useEffect } from 'react';

interface OptionsectionProps {
  setOptionCost: (value: number) => void;
}
const Optionsection = ({ setOptionCost }: OptionsectionProps) => {
  const { selectedMenu, optionCategories, setSelectedOptions } = useMenuStore();

  const optionList = selectedMenu!
    .optionCategories!.map((categoryId) => optionCategories[categoryId])
    .filter((category) => category !== undefined)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  useEffect(() => {
    if (selectedMenu && selectedMenu.optionCategories) {
      const initialOptions: { [key: string]: string[] } = {};
      selectedMenu.optionCategories.forEach((categoryId) => {
        if (optionCategories[categoryId]) {
          initialOptions[categoryId] = [];
        }
      });
      setChooseOption(initialOptions);
    }
  }, [selectedMenu, optionCategories]);

  const [chooseOption, setChooseOption] = useState<{ [key: string]: string[] }>(
    {}
  );

  useEffect(() => {
    let totalOptionCost = 0;

    // 모든 카테고리 순회
    Object.keys(chooseOption).forEach((categoryId) => {
      const selectedOptionIds = chooseOption[categoryId];
      const category = optionCategories[categoryId];

      if (category) {
        selectedOptionIds.forEach((optionId) => {
          const option = category.options.find((opt) => opt.id === optionId);
          if (option) {
            totalOptionCost += option.price;
          }
        });
      }
    });

    // 부모 컴포넌트에 옵션 비용 전달
    setOptionCost(totalOptionCost);
  }, [chooseOption, optionCategories]);

  // 옵션 선택 핸들러 함수
  const handleOptionSelect = (categoryId: string, optionId: string) => {
    setChooseOption((prev) => {
      const newOptions = { ...prev };

      if (newOptions[categoryId]?.includes(optionId))
        newOptions[categoryId] = [];
      else newOptions[categoryId] = [optionId];
      setSelectedOptions(newOptions);
      return newOptions;
    });
  };

  return (
    <Container>
      {optionList.map((category) => (
        <OptionContainer key={category.id}>
          <OptionCategoryName>
            {category.name}
            <span>{category.required ? ' *' : ''}</span>
          </OptionCategoryName>
          <OptionsWrapper>
            {category.options.map((option) => (
              <OptionItem
                key={option.id}
                $isSelected={chooseOption[category.id]?.includes(option.id)}
                onClick={() => handleOptionSelect(category.id, option.id)}
              >
                <OptionLabel>
                  <OptionName>{option.name}</OptionName>
                  <OptionPrice
                    $isSelected={chooseOption[category.id]?.includes(option.id)}
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
    $isSelected ? `${theme.colors.main}` : 'transparent'};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? `${theme.colors.white}` : ''};
  transition: all 0.1s ease-in;
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

const OptionPrice = styled.div<{ $isSelected: boolean }>`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme }) => theme.colors.grey[600]};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? `${theme.colors.white}` : ''};
  transition: all 0.1s ease-in;
`;
