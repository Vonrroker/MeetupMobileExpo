import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  padding-top: ${Constants.statusBarHeight};
`;

export const DateSelect = styled.View`
  width: 190px;
  height: 30px;
  margin: 30px auto 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DateButtonChange = styled.TouchableOpacity``;

export const DateText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin: 0 15px;
`;

export const ListMeetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 30px 20px 0;
`;
