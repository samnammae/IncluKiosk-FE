import styled from 'styled-components';
import kakaoIcon from '../../../assets/icons/kakaoIcon.png';
import GoogleIcon from '../../../assets/icons/GoogleIcon.png';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../../../apis/auth';
import { AuthProps } from '../interface';
import {
  AuthCard,
  AuthContainer,
  FormGroup,
  Input,
  Label,
  LabelWrapper,
  AuthButton,
} from '../styles';

const Login = ({ changeMode }: AuthProps) => {
  const nav = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      nav('/lock');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({
      ...loginForm,
      [id]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login form submitted:', loginForm);
    loginMutation.mutate(loginForm);
  };
  return (
    <AuthContainer>
      <AuthCard>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </FormGroup>

          <AuthButton type="submit">로그인</AuthButton>
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
          <a onClick={changeMode}>가입하기</a>
        </SignUpLink>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;

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
