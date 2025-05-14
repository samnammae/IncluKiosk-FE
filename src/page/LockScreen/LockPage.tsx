import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { screenImgs } from '../../../data/screen';

const LockPage = () => {
  const nav = useNavigate();
  const { maxIndex, imgs } = screenImgs;
  const [imgIndex, setImgIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  //시간에 따른 슬라이더 효과 구현
  useEffect(() => {
    const timer = setInterval(() => {
      if (imgIndex === maxIndex - 1) {
        setShowOverlay(true);

        setTimeout(() => {
          setImgIndex(0);
          setTimeout(() => {
            setShowOverlay(false);
          }, 50);
        }, 50);
      } else {
        setImgIndex((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [imgIndex, maxIndex]);

  return (
    <BaseContainer onClick={() => nav('/start')}>
      <SliderWrapper>
        <SliderContainer
          $translateX={-imgIndex * 100}
          $transition={!showOverlay} // showOverlay일 때는 트랜지션 비활성화
        >
          {imgs.map((img, index) => (
            <Slide key={index}>
              <SlideImage src={img} alt={`slide-${index}`} />
            </Slide>
          ))}
        </SliderContainer>

        {/* 마지막 -> 첫번째 많은 x축이동을 없애기 위한 오버레이 */}
        {showOverlay && (
          <OverlayContainer $showOverlay={showOverlay}>
            <SlideImage src={imgs[0]} alt="first-slide-overlay" />
          </OverlayContainer>
        )}

        {/* 몇 페이지인지 표시 */}
        <Indicators>
          {Array.from({ length: maxIndex }).map((_, index) => (
            <Indicator
              key={index}
              $isActive={index === imgIndex}
              onClick={(e) => {
                e.stopPropagation();
                setImgIndex(index);
              }}
            />
          ))}
        </Indicators>
      </SliderWrapper>
    </BaseContainer>
  );
};

export default LockPage;

const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const SliderContainer = styled.div<{
  $translateX: number;
  $transition: boolean;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${({ $translateX }) => $translateX}%);
  transition: ${({ $transition }) =>
    $transition ? 'transform 0.5s ease-in-out' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
`;

const Slide = styled.div`
  min-width: 100%;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const OverlayContainer = styled.div<{ $showOverlay: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $showOverlay }) => ($showOverlay ? 1 : 0)};
  transition: opacity 0.6s ease-out;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
  object-position: center;
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Indicator = styled.div<{ $isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $isActive }) =>
    $isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
