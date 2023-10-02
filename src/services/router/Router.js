export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('load', () => this.loadRoute());
        window.addEventListener('popstate', () => this.loadRoute());
        console.log(3345435345345)
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

         if (route instanceof ProtectedRoute) {
            //TODO Как проверить что мы авторизованы
             const auth = true;
 
             if (!auth) {
                 this.navigateTo('/login');
                 return;
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