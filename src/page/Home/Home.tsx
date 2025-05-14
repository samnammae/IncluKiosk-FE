import styled from 'styled-components';
import Header from './components/Header';
import Category from './components/Category';
import MenuList from './components/MenuList';

import DetailModal from '../DetailModal/DetailModal';
import ShoppingCart from './components/ShoppingCart';
const Home = () => {
  return (
    <BaseContainer>
      <DetailModal />
      <Header />
      <Category />
      <ScrollWrapper>
        <MenuList />
      </ScrollWrapper>
      <ShoppingCart />
    </BaseContainer>
  );
};

export default Home;
const BaseContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ScrollWrapper = styled.div`
  height: calc(1920px - 300px);
  overflow-y: auto;
  display: block;
  flex: 1;
`;
