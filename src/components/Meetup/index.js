import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Banner,
  Title,
  Infos,
  Info,
  InfoText,
  SubscriptionButton,
} from './styles';

const { baseURL } = api.defaults;

export default function Meetup({ meetup, onPress, loading, subscribed }) {
  return (
    <Container>
      <Banner source={{ uri: `${baseURL}/files/${meetup.file.path}` }} />

      <Title>{meetup.title}</Title>

      <Infos>
        <Info>
          <Icon name="event" size={13} color="#999999" />
          <InfoText>{meetup.formatedDate}</InfoText>
        </Info>
        <Info>
          <Icon name="place" size={13} color="#999999" />
          <InfoText>{meetup.locale}</InfoText>
        </Info>
        <Info>
          <Icon name="person" size={13} color="#999999" />
          <InfoText>Organizador: {meetup.user.name}</InfoText>
        </Info>
      </Infos>

      <SubscriptionButton subscribed loading={loading} onPress={onPress}>
        {subscribed ? 'Cancelar inscrição' : 'Realizar inscrição'}
      </SubscriptionButton>
    </Container>
  );
}

Meetup.propTypes = {
  meetup: PropTypes.shape({
    file: PropTypes.shape({
      path: PropTypes.string,
    }),
    title: PropTypes.string,
    formatedDate: PropTypes.string,
    locale: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  subscribed: PropTypes.bool,
};

Meetup.defaultProps = {
  loading: false,
  subscribed: false,
};
