export function meetupRequest(date, page) {
  return {
    type: '@meetup/REQUEST',
    payload: { date, page },
  };
}

export function meetupSuccess(meetups) {
  return {
    type: '@meetup/SUCCESS',
    payload: { meetups },
  };
}

export function meetupNextPageRequest(date, page) {
  return {
    type: '@meetup/NEXT_PAGE_REQUEST',
    payload: { date, page },
  };
}

export function meetupNextPageSuccess(meetups) {
  return {
    type: '@meetup/NEXT_PAGE_SUCCESS',
    payload: { meetups },
  };
}

export function meetupSubscribeRequest(id) {
  return {
    type: '@meetup/SUBSCRIBE_REQUEST',
    payload: { id },
  };
}

export function meetupSubscribeSuccess(meetup_id) {
  return {
    type: '@meetup/SUBSCRIBE_SUCCESS',
    payload: { meetup_id },
  };
}

export function meetupUnsubscribeRequest(id) {
  return {
    type: '@meetup/UNSUBSCRIBE_REQUEST',
    payload: { id },
  };
}

export function meetupSubscribeFailure() {
  return {
    type: '@meetup/SUBSCRIBE_FAILURE',
  };
}

export function meetupUnsubscribeSuccess(sub_id) {
  return {
    type: '@meetup/UNSUBSCRIBE_SUCCESS',
    payload: { sub_id },
  };
}

export function meetupSubscriptionsRequest() {
  return {
    type: '@meetup/SUBSCRIPTIONS_REQUEST',
  };
}

export function meetupSubscriptionsSuccess(subscriptions) {
  return {
    type: '@meetup/SUBSCRIPTIONS_SUCCESS',
    payload: { subscriptions },
  };
}
