import { checkAccess } from '../api/auth.js';

/**
 * Класс, представляющий роутер приложения.
 * @class
 * @classdesc Этот класс обрабатывает навигацию в приложении на основе зарегистрированных маршрутов.
 */
export class Router {
    /**
     * Создает экземпляр класса Router.
     * @constructor
     * @param {Array<Route>} routes - Массив маршрутов, доступных в приложении.
     */
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    /**
     * Инициализация роутера.
     * Устанавливает обработчики событий для загрузки и изменения URL, а также для нажатия на элементы с атрибутом 'spa-link'.
     */
    init() {
        //Обработка загрузки странички
        window.addEventListener('load', () => this.loadRoute());
        //Обработка удаления маршрута из пути
        window.addEventListener('popstate', () => this.loadRoute());
        document.body.addEventListener('click', e => {
            let target = e.target;

            while (target) {
                if (target.tagName === 'A' && target.matches('[spa-link]')) {
                    e.preventDefault();
                    this.navigateTo(target.href);
                    break;
                }
                //Ищем среди родителей элемент ссылку
                target = target.parentElement;
            }
        });
    }

    /**
     * Переходит по указанному URL, обновляя историю браузера и загружая соответствующий маршрут.
     * @param {string} url - URL, по которому следует перейти.
     */
    navigateTo(url) {
        document.getElementById('toasts').innerHTML = '';
        history.pushState(null, null, url);
        this.loadRoute();
    }

    /**
     * Загружает маршрут, соответствующий текущему URL, и отображает соответствующую страницу.
     */
    async loadRoute() {
        console.info(location.pathname);
        const route = this.routes.find((r) => {
            if (r.path instanceof RegExp) {
                return r.path.test(location.pathname);
            } else if (r.path === location.pathname) {
                return true;
            }

            return false;
        }) || this.routes.find((r) => r.path === '*');
        if (route instanceof ProtectedRoute) {
            const auth = await checkAccess();
            if (route.accessLevel === 'auth') {
                if (auth.ok) {
                    // Маршрут доступен авторизованным
                    await route.page.render();
                } else {
                    this.navigateTo('/login');
                }
            } else if (route.accessLevel === 'anonim') {
                if (!auth.ok) {
                    // Маршрут доступен неавторизованным
                    await route.page.render();
                } else {
                    // Перенаправление авторизованных пользователей
                    this.navigateTo('/feed');
                }
            }
        } else if (route instanceof Route) {
            // Обработка не защищенных маршрутов
            await route.page.render();
        }
    }
}

/**
 * Класс, представляющий маршрут приложения.
 * @class
 * @classdesc Этот класс описывает маршрут, который состоит из пути и соответствующей страницы.
 */
export class Route {
    /**
     * Создает экземпляр класса Route.
     * @constructor
     * @param {string} path - Путь маршрута.
     * @param {Object} page - Страница, связанная с маршрутом.
     */
    constructor(path, page) {
        this.path = path;
        this.page = page;
    }
}

/**
 * Класс, представляющий защищенный маршрут приложения.
 * @class
 * @classdesc Этот класс расширяет базовый маршрут и добавляет флаг, указывающий на защищенность маршрута.
 */
export class ProtectedRoute extends Route {
    /**
     * Создает экземпляр класса ProtectedRoute.
     * @constructor
     * @param {string} path - Путь маршрута.
     * @param {Object} page - Страница, связанная с маршрутом.
     * @param {string} [accessLevel='all'] - Флаг, указывающий на защищенность маршрута. По умолчанию авторизованные
     */
    constructor(path, page, accessLevel = 'auth') {
        super(path, page);
        this.accessLevel = accessLevel;
    }
}

//Эммитит событие popstate для последующей обработки в роутере
export const navigate = (url) => {
    const popStateEvent = new PopStateEvent('popstate', { state: null, url: url });
    window.dispatchEvent(popStateEvent);
};
