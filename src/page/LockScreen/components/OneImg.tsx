import { BaseContainer, SlideImage } from '../LockPage';
import { screenImgs } from '../../../../data/screen';

const OneImg = () => {
  return (
    <BaseContainer>
      <SlideImage src={screenImgs.imgs[0]} alt="img" />
    </BaseContainer>
  );
};

export default OneImg;
