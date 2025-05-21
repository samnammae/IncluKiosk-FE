import {
  AuthCard,
  AuthContainer,
  FormGroup,
  Input,
  Label,
  LabelWrapper,
  AuthButton,
} from '../styles';
import { AuthProps } from '../interface';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { ChangeEvent, useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authAPI } from '../../../apis/auth';

export interface JoinFormType {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const Join = ({ changeMode }: AuthProps) => {
  // 유효성 검사 상태
  const [validations, setValidations] = useState({
    email: true,
    name: true,
    phone: true,
    password: true,
    passwordCheck: true,
  });

  const [joinForm, setJoinForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인용 상태

  const joinMutation = useMutation({
    mutationFn: authAPI.join,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      changeMode();
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // 폼 제출
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 필드 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // 모든 필드 검사 (비어있는 필드도 포함)
    const newValidations = {
      email: joinForm.email.trim() !== '' && emailRegex.test(joinForm.email),
      name: joinForm.name.trim() !== '',
      phone: joinForm.phone.trim() !== '' && phoneRegex.test(joinForm.phone),
      password:
        joinForm.password !== '' && passwordRegex.test(joinForm.password),
      passwordCheck:
        passwordCheck !== '' && joinForm.password === passwordCheck,
    };

    // 모든 검사 결과 적용 (이전 값을 덮어쓰기)
    setValidations(newValidations);
    console.log('validations');
    console.log(validations);
    console.log(validations);
    console.log(validations);
    const isAllValid = Object.values(newValidations).every((value) => value);
    console.log('isAllValid');
    console.log(isAllValid);

    if (isAllValid) {
      joinMutation.mutate(joinForm);
    }
  };
  // 입력값 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // 비밀번호 확인 필드 처리
    if (id === 'passwordCheck') {
      setPasswordCheck(value);
      setValidations({
        ...validations,
        passwordCheck: value === joinForm.password || value === '',
      });
      return;
    }

    // 폼 데이터 업데이트
    setJoinForm({
      ...joinForm,
      [id]: value,
    });

    // 사용자가 입력하는 동안은 유효성 검사 메시지 숨김
    setValidations({
      ...validations,
      [id]: true,
    });
  };

  // onBlur 처리 - 필드를 벗어날 때 유효성 검사
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // 값이 비어있으면 유효성 검사 스킵
    if (!value.trim()) return;

    // 필드별 유효성 검사
    switch (id) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidations({
          ...validations,
          email: emailRegex.test(value),
        });
        break;
      }

      case 'name': {
        setValidations({
          ...validations,
          name: value.trim().length > 0,
        });
        break;
      }

      case 'phone': {
        const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        setValidations({
          ...validations,
          phone: phoneRegex.test(value),
        });
        break;
      }

      case 'password': {
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setValidations({
          ...validations,
          password: passwordRegex.test(value),
          // 비밀번호 변경시 비밀번호 확인 필드 유효성도 업데이트
          passwordCheck: passwordCheck === value || passwordCheck === '',
        });
        break;
      }

      case 'passwordCheck': {
        setValidations({
          ...validations,
          passwordCheck: value === joinForm.password,
        });
        break;
      }
    }
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numbers = value.replace(/[^0-9]/g, ''); // 숫자만 추출
    const trimmed = numbers.slice(0, 11); // 최대 11자리로 제한

    // 하이픈 추가 포맷팅
    let formattedNumber = '';
    if (trimmed.length <= 3) {
      formattedNumber = trimmed;
    } else if (trimmed.length <= 7) {
      formattedNumber = `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
    } else {
      formattedNumber = `${trimmed.slice(0, 3)}-${trimmed.slice(
        3,
        7
      )}-${trimmed.slice(7)}`;
    }

    setJoinForm({
      ...joinForm,
      phone: formattedNumber,
    });

    // 유효성 검사 (전화번호가 완성되었을 때만)
    if (trimmed.length === 11) {
      const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      setValidations({
        ...validations,
        phone: phoneRegex.test(formattedNumber),
      });
    } else {
      // 입력 중일 때는 유효성 에러 표시 안 함
      setValidations({
        ...validations,
        phone: true,
      });
    }
  };
  return (
    <AuthContainer>
      <AuthCard>
        <CardHeader>
          <BackButton onClick={() => changeMode()}>
            <ArrowBackIosNewRoundedIcon />
            <span>로그인으로 돌아가기</span>
          </BackButton>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
              value={joinForm.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={!validations.email ? 'invalid' : ''}
            />
            {!validations.email && (
              <ErrorMessage>
                {joinForm.email.trim() === ''
                  ? '이메일을 입력해주세요.'
                  : '유효한 이메일 주소를 입력해주세요.'}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              autoComplete="name"
              value={joinForm.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={!validations.name ? 'invalid' : ''}
            />
            {!validations.name && (
              <ErrorMessage>이름을 입력해주세요.</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              autoComplete="tel"
              value={joinForm.phone}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              className={!validations.phone ? 'invalid' : ''}
            />
            {!validations.phone && (
              <ErrorMessage>
                {joinForm.phone.trim() === ''
                  ? '전화번호를 입력해주세요.'
                  : '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)'}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="password">비밀번호</Label>
            </LabelWrapper>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              value={joinForm.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={!validations.password ? 'invalid' : ''}
            />
            {!validations.password && (
              <ErrorMessage>
                {joinForm.password === ''
                  ? '비밀번호를 입력해주세요.'
                  : '비밀번호는 8자 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.'}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <LabelWrapper>
              <Label htmlFor="passwordCheck">비밀번호 확인</Label>
            </LabelWrapper>
            <Input
              id="passwordCheck"
              type="password"
              autoComplete="new-password"
              value={passwordCheck}
              onChange={handleChange}
              onBlur={handleBlur}
              className={!validations.passwordCheck ? 'invalid' : ''}
            />
            {!validations.passwordCheck && (
              <ErrorMessage>
                {passwordCheck === ''
                  ? '비밀번호 확인을 입력해주세요.'
                  : '비밀번호가 일치하지 않습니다.'}
              </ErrorMessage>
            )}
          </FormGroup>

          <AuthButton type="submit">회원가입</AuthButton>
        </form>
      </AuthCard>
    </AuthContainer>
  );
};

export default Join;

// 스타일드 컴포넌트
const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  padding: 8px 0;
  transition: color 0.2s;

  svg {
    font-size: 20px;
    margin-right: 4px;
  }

  span {
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.standard};
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};

  margin-top: 8px;
  margin-bottom: 0;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  transition: all 0.2s ease;
  animation: shake 0.5s ease-in-out;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-5px);
    }
    40%,
    80% {
      transform: translateX(5px);
    }
  }
`;
