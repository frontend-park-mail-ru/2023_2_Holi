import store from '../..';
import { $sentUserInfoRequest, USER_REDUCER } from './flux/actions/user-info';

export const avatarUpdate = () => {
    console.log(store.getState());

    if (store.getState() && store.getState().user.userInfo && store.getState().user.userInfo.user.imagePath) {

        const cacheBuster = Math.random().toString(36).substring(7);

        // Формирование URL с cache-busting параметром
        const updatedImageUrl = store.getState().user.userInfo.user.imagePath.includes('?')
            ? `${store.getState().user.userInfo.user.imagePath}&cache=${cacheBuster}`
            : `${store.getState().user.userInfo.user.imagePath}?cache=${cacheBuster}`;

        document.querySelector('.avatar').src = updatedImageUrl;

    } else {
        store.dispatch($sentUserInfoRequest());

        /**
         * Подписка сраюотает при изменении стора
         */
        store.subscribe(USER_REDUCER, () => {
            const stateUser = store.getState().user.userInfo;
            if (stateUser) {
                if (stateUser.user.imagePath) {
                    const cacheBuster = Math.random().toString(36).substring(7);

                    // Формирование URL с cache-busting параметром
                    const updatedImageUrl = stateUser.user.imagePath.includes('?')
                        ? `${stateUser.user.imagePath}&cache=${cacheBuster}`
                        : `${stateUser.user.imagePath}?cache=${cacheBuster}`;

                    document.querySelector('.avatar').src = updatedImageUrl;
                }

            }

        });
    }

};
