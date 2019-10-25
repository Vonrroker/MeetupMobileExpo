import { produce } from 'immer';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/esm/locale';

const INITIAL_STATE = {
  meetups: [],
  subscriptions: [],
  nextPage: false,
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/NEXT_PAGE_SUCCESS': {
        const { meetups } = action.payload;

        if (meetups.length < 10) {
          draft.nextPage = false;
        } else {
          draft.nextPage = true;
        }

        const data = meetups.map(m => {
          return {
            ...m,
            formatedDate: format(parseISO(m.date), "d 'de' MMMM 'às' HH:mm", {
              locale: pt,
            }),
          };
        });

        draft.meetups.push(...data);
        break;
      }
      case '@meetup/SUCCESS': {
        const { meetups } = action.payload;

        if (meetups.length < 10) {
          draft.nextPage = false;
        } else {
          draft.nextPage = true;
        }

        const data = meetups.map(m => {
          return {
            ...m,
            formatedDate: format(parseISO(m.date), "d 'de' MMMM 'às' HH:mm", {
              locale: pt,
            }),
          };
        });

        draft.meetups = data;
        break;
      }

      case '@meetup/SUBSCRIPTIONS_SUCCESS': {
        const { subscriptions } = action.payload;

        const data = subscriptions.map(m => {
          return {
            ...m,
            meetup: {
              ...m.meetup,
              formatedDate: format(
                parseISO(m.meetup.date),
                "d 'de' MMMM 'às' HH:mm",
                {
                  locale: pt,
                }
              ),
            },
          };
        });

        draft.subscriptions = data;

        break;
      }

      case '@meetup/SUBSCRIBE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@meetup/SUBSCRIBE_SUCCESS': {
        const { meetup_id } = action.payload;

        const index = draft.meetups.findIndex(
          m => String(m.id) === String(meetup_id)
        );

        draft.meetups.splice(index, 1);
        draft.loading = false;
        break;
      }

      case '@meetup/UNSUBSCRIBE_SUCCESS': {
        const { sub_id } = action.payload;

        const index = draft.subscriptions.findIndex(
          m => String(m.id) === String(sub_id)
        );

        draft.subscriptions.splice(index, 1);

        break;
      }

      case '@meetup/SUBSCRIBE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
