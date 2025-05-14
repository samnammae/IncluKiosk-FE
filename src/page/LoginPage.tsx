import styled from 'styled-components';
import kakaoIcon from '../assets/icons/kakaoIcon.png';
import GoogleIcon from '../assets/icons/GoogleIcon.png';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const nav = useNavigate();
  return (
    <Background>
      <Title>
        <span>IncluKiosk</span>
      </Title>
      <LoginContainer>
        <LoginCard>
          <form>
            <FormGroup>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
              />
            </FormGroup>

            <FormGroup>
              <LabelWrapper>
                <Label htmlFor="password">비밀번호</Label>
                <ForgotPassword href="#">비밀번호를 잊으셨나요?</ForgotPassword>
              </LabelWrapper>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
              />
            </FormGroup>

            <LoginButton type="submit" onClick={() => nav('/start')}>
              로그인
            </LoginButton>
          </form>

          <Divider>
            <span>Or continue with</span>
          </Divider>

          <ButtonWrapper>
            <KakaoButton>
              <IconImg src={kakaoIcon} />
              카카오톡으로 시작하기
            </KakaoButton>
            <GoogleButton>
              <IconImg src={GoogleIcon} />
              구글로 시작하기
            </GoogleButton>
          </ButtonWrapper>

          <SignUpLink>
            계정이 필요하신가요?
            <a href="#">가입하기</a>
          </SignUpLink>
        </LoginCard>
      </LoginContainer>
    </Background>
  );
};

export default LoginPage;

const Background = styled.div`
  min-height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.standard} 0%, ${theme.colors.background} 100%)`};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fonts.sizes.logo};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const LoginContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.98);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 80px;
  width: 100%;
  max-width: 720px;
  backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
  margin-bottom: 40px;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 24px 32px;
  border: 3px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.white};

  &:focus {
    border-color: ${({ theme }) => theme.colors.standard};
    outline: none;
    box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey[400]};
  }
`;

const ForgotPassword = styled.a`
  color: ${({ theme }) => theme.colors.standard};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  text-decoration: none;
  display: inline-block;
  transition: color 0.2s;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 28px;
  background: ${({ theme }) => theme.colors.standard};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 48px;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 48px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 2px solid ${({ theme }) => theme.colors.grey[200]};
  }

  span {
    padding: 0 24px;
    color: ${({ theme }) => theme.colors.grey[500]};
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SocialButton = styled.button`
  position: relative;
  width: 100%;
  padding: 24px;
  border: 3px solid ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  &:active {
    transform: scale(1.02);
  }
`;

const KakaoButton = styled(SocialButton)`
  background-color: #fee500;
  color: #191600;
  border: none;
`;

const GoogleButton = styled(SocialButton)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const IconImg = styled.img`
  width: 36px;
  height: 36px;
  position: absolute;
  left: 32px;
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 48px;
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};

  a {
    color: ${({ theme }) => theme.colors.standard};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    text-decoration: none;
    margin-left: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
