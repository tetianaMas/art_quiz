import Utils from './services/Utils';

export default class Router {
  constructor(options) {
    this.routes = options.routes;
    this.mode = null;
    this.root = '/main';
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) {
      this.mode = options.mode;
    }
    if (options.root) {
      this.root = options.root;
    }
    this.isStopListening = false;
    this.navigates = [];
    this.listen();
  }

  addPath(path, callback) {
    this.routes.push({
      path,
      callback,
    });

    return this;
  }

  removePath(path) {
    const routeToDelete = this.routes.filter((route) => route.path === path);
    this.routes.slice(this.routes.indexOf(routeToDelete), 1);

    return this;
  }

  getRoute() {
    let route = '';

    if (this.mode === 'history') {
      route = Utils.getPath(
        decodeURI(window.location.pathname + window.location.search)
      );
      route = route.replace(/\?(.*)$/, '');
      route = this.root !== '/main' ? route.replace(this.root, '/main') : route;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      route = match && match[1] ? match[1] : '/main';
    }

    return Utils.getPath(route);
  }

  findCurrentRoute(route) {
    if (!route) {
      return false;
    }
    return this.routes.find((item) => item.path.test(route));
  }

  navigate(path = '') {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + Utils.getPath(path));
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        ''
      )}#/${Utils.getPath(path)}`;
    }

    return this;
  }

  listen() {
    clearInterval(this.interval);
    if (!this.isStopListening) {
      this.interval = setInterval(this.interval.bind(this), 50);
    }
  }

  interval() {
    if (this.current === this.getRoute()) {
      return;
    }

    this.current = this.getRoute();
    this.routes.some((route) => {
      const match = this.current.match(route.path);

      if (match) {
        const currRoute = match.shift();
        this.navigate(currRoute);
        this.navigates.push(currRoute);

        route.callback.apply({}, match);
        return this;
      }
      this.navigate(this.root);

      return false;
    });
  }

  return(e) {
    if (e) {
      e.stopPropagation();
    }
    const path = this.navigates[this.navigates.length - 1 - 1];
    this.navigate(path);
    this.navigates = [];
  }

  stopListening() {
    this.isStopListening = true;
  }

  startListening() {
    this.isStopListening = false;
    this.listen();
  }

  navToprevRoot(e) {
    if (e) {
      e.stopPropagation();
    }
    let hash = window.location.hash.match(/#\/([\w-]*)\//);
    if (hash) {
      [, hash] = hash;
      this.navigate(hash);
    }
  }
}
