import store from '../../../..';
import { getLike } from '../../api/like';

export const GET_FAVOURITES = 'GET_FAVOURITES';

export const $getFavourites = (data) => ({ type: GET_FAVOURITES, payload: data, reducerName: 'FAVOURITES_REDUCER' });

export const $sendGetFavourites = () => {
    getLike()
        .then(response => {
            store.dispatch($getFavourites(response.body));
        });
};
