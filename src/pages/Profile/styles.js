import styled from 'styled-components/native';
import Constants from 'expo-constants';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight};
`;

export const Form = styled.View`
  align-self: stretch;
  margin: 20px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  margin-bottom: 10px;
  background: #e5556e;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 10px 0 20px;
`;
