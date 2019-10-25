import React, { useState, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';

import { format, addDays, subDays } from 'date-fns';
import { pt } from 'date-fns/locale';
import Background from '~/components/Background';

import {
  Container,
  ListMeetups,
  DateSelect,
  DateButtonChange,
  DateText,
} from './styles';

import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import {
  meetupRequest,
  meetupSubscribeRequest,
  meetupNextPageRequest,
} from '~/store/modules/meetup/actions';

function Dashboard({ isFocused }) {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const meetups = useSelector(state => state.meetup.meetups);
  const loading = useSelector(state => state.meetup.loading);
  const nextPage = useSelector(state => state.meetup.nextPage);

  const dateFormated = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  const isToday = useMemo(() => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, [date]);

  function handleNextPage() {
    dispatch(meetupNextPageRequest(format(date, 'yyyy-MM-dd'), page + 1));
    setPage(page + 1);
  }

  useEffect(() => {
    if (isFocused) {
      dispatch(meetupRequest(format(date, 'yyyy-MM-dd'), page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, date]);

  async function handleSubscribe(id) {
    dispatch(meetupSubscribeRequest(id));
  }

  function handleAddDay() {
    setPage(1);
    setDate(addDays(date, 1));
  }

  function handleSubDay() {
    setPage(1);
    setDate(subDays(date, 1));
  }

  return (
    <Background>
      <Spinner
        visible={loading}
        textContent="Realizando Inscrição..."
        textStyle={{ color: '#fff' }}
        color="#f94d6a"
        animation="slide"
        size="large"
        overlayColor="rgba(0, 0, 0, 0.7)"
      />
      <Container>
        <Header />
        <DateSelect>
          <DateButtonChange onPress={handleSubDay} disabled={isToday}>
            <Icon
              name="chevron-left"
              size={30}
              color={isToday ? 'rgba(255,255,255,0.3)' : '#fff'}
            />
          </DateButtonChange>
          <DateText>{dateFormated}</DateText>
          <DateButtonChange onPress={handleAddDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </DateButtonChange>
        </DateSelect>

        {meetups.length > 0 ? (
          <ListMeetups
            data={meetups}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={nextPage ? 0.2 : -1} // Carrega mais itens quando chegar em 20% do fim
            onEndReached={handleNextPage} // Função que carrega mais itens
            renderItem={({ item }) => (
              <Meetup meetup={item} onPress={() => handleSubscribe(item.id)} />
            )}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>
              Sem meetups nessa data.
            </Text>
          </View>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool,
};

Dashboard.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(Dashboard);
