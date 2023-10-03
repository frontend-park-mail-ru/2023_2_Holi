import { checkAccess } from "../api/auth.js";
import { goToLink } from "../goToLink.js";

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
        if (!auth.ok) {
            // Если пользователь не авторизован
            if (route instanceof ProtectedRoute) {
                // Попытка доступа к защищенной странице, перенаправляем на страницу входа
                this.navigateTo('/login');
                return
            }
        } else {
            // Если пользователь авторизован
            if (route instanceof Route) {
                // Попытка доступа к обычной странице, перенаправляем на страницу /feed
                this.navigateTo('/feed');
                return
            }
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