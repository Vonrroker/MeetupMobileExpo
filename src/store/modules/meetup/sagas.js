import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import {
  meetupSuccess,
  meetupSubscribeSuccess,
  meetupSubscriptionsSuccess,
  meetupUnsubscribeSuccess,
  meetupSubscribeFailure,
} from './actions';

function* meetup({ payload }) {
  try {
    const { date, page } = payload;

    const response = yield call(
      api.get,
      date ? `meetups?date=${date}&page=${page}` : `meetups?page=${page}`
    );

    yield put(meetupSuccess(response.data));
  } catch (error) {
    // toast.error('falha ao requisitar meetups');
  }
}

function* subscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `subscriptions/${id}`);
    const { subscription } = response.data;

    Alert.alert(
      'Inscrição bem sucedida',
      'Para ver ou cancelar suas inscriçoes clique na aba "Incrições"'
    );

    yield put(meetupSubscribeSuccess(subscription.meetup_id));
  } catch (error) {
    yield put(meetupSubscribeFailure());
    Alert.alert(
      'Erro ao se increver.',
      'Veriique se você já esta inscrito no meetup'
    );
  }
}

function* unsubscribeMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `subscriptions/${id}`);

    Alert.alert(
      'Inscrição cancelada',
      'Para se increver novamente vá na aba "Meetups"'
    );

    yield put(meetupUnsubscribeSuccess(id));
  } catch (error) {
    Alert.alert(
      'Erro ao se increver.',
      'Veriique se você já esta inscrito no meetup'
    );
  }
}

function* subscriptionsMeetups() {
  try {
    const response = yield call(api.get, 'subscriptions');

    yield put(meetupSubscriptionsSuccess(response.data));
  } catch (error) {
    Alert.alert('Erro ao buscar inscrições.');
  }
}

export default all([
  takeLatest('@meetup/REQUEST', meetup),
  takeLatest('@meetup/SUBSCRIBE_REQUEST', subscribeMeetup),
  takeLatest('@meetup/UNSUBSCRIBE_REQUEST', unsubscribeMeetup),
  takeLatest('@meetup/SUBSCRIPTIONS_REQUEST', subscriptionsMeetups),
]);
