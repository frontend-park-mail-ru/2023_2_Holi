import { checkAccess } from '../api/auth.js';

export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('load', () => this.loadRoute());
        window.addEventListener('popstate', () => this.loadRoute());
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute();
    }

    async loadRoute() {
        const route = this.routes.find(r => r.path === location.pathname) || this.routes.find(r => r.path === '*');
        const auth = await checkAccess();
        // Проверка флага для избежания бесконечного рендера
        if (route instanceof ProtectedRoute && !auth.ok && location.pathname !== '/login') {
            // Попытка доступа к защищенной странице, перенаправляем на страницу входа
            this.navigateTo('/login');

            return; // Прекратить выполнение функции
        }

        // Проверка флага для избежания бесконечного рендера
        if (auth.ok && route instanceof Route && location.pathname !== '/feed') {
            // Попытка доступа к обычной странице, перенаправляем на страницу /feed
            this.navigateTo('/feed');

            return;
        }
        await route.page.render();
    }
}

export class Route {
    constructor(path, page) {
        this.path = path;
        this.page = page;
    }
}

export class ProtectedRoute extends Route {
    constructor(path, page, isProtected = true) {
        super(path, page);
        this.isProtected = isProtected;
    }
}
