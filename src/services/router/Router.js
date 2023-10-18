//import { checkAccess } from '../api/auth.js';

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
        window.addEventListener('load', () => this.loadRoute());
        window.addEventListener('popstate', () => this.loadRoute());
        document.body.addEventListener('click', e => {
            let target = e.target;
            while (target) {
                if (target.tagName === 'A' && target.matches('[spa-link]')) {
                    e.preventDefault();
                    this.navigateTo(target.href);
                    break;
                }
                target = target.parentElement;
            }
        });
    }

    /**
     * Переходит по указанному URL, обновляя историю браузера и загружая соответствующий маршрут.
     * @param {string} url - URL, по которому следует перейти.
     */
    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute();
    }

    /**
     * Загружает маршрут, соответствующий текущему URL, и отображает соответствующую страницу.
     */
    async loadRoute() {
        const route = this.routes.find(r => r.path === location.pathname) || this.routes.find(r => r.path === '*');
        /*const auth = await checkAccess();
        if (route instanceof ProtectedRoute && !auth.ok && location.pathname !== '/login') {
            this.navigateTo('/login');
    
            return;
        }
        if (auth.ok && route instanceof Route && location.pathname !== '/feed') {
            this.navigateTo('/feed');
    
            return;
        }*/
        await route.page.render();
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
     * @param {boolean} [isProtected=true] - Флаг, указывающий на защищенность маршрута.
     */
    constructor(path, page, isProtected = true) {
        super(path, page);
        this.isProtected = isProtected;
    }
}
