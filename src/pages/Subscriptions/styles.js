import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight};
`;

export const ListMeetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 30px 20px 0;
`;
