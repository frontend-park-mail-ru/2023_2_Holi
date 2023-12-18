import { logoutRequest } from './api/auth';
import { navigate } from './router/Router';

export const logoutHandle = () => {
    document.querySelectorAll('.logout').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', async function() {
                const response = await logoutRequest();
                if (response.ok) {
                    navigate('/login');
                }
            });
        }
    });
};
