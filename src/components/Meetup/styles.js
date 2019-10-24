import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const Banner = styled.Image`
  height: 150px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  margin-left: 18px;
`;

export const Infos = styled.View`
  flex-direction: column;
  margin-left: 20px;
  margin-top: 7px;
`;

export const Info = styled.View`
  flex-direction: row;
  height: 16px;
  align-items: center;
  margin-bottom: 8px;
`;

export const InfoText = styled.Text`
  font-size: 13px;
  margin-left: 10px;
  color: #999999;
`;

export const SubscriptionButton = styled(Button)`
  height: 40px;
  margin: 9px 20px 20px;
`;
