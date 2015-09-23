var app = document.querySelector('#app');

app.setMainContent = function(element) {
    document.querySelector('#main-content').innerHTML = '<' + element + '></' + element + '>';
};

app.onMenuSelect = function() {
    // Close the drawer after selection on mobile.
    var drawerPanel = document.querySelector('paper-drawer-panel');
    if (drawerPanel.narrow) {
        drawerPanel.closeDrawer();
    }
};

app.addEventListener('dom-change', function() {
    page('*', function(ctx, next) {
        var mainContent = document.querySelector('#main-content');
        mainContent.classList.add('transition');
        setTimeout(function() {
            mainContent.classList.remove('transition');
            next();
        }, 340);
    });

    // Set up the application routes.
    page('/customers', function() {
        app.route = 'customers';
        app.setMainContent('customers-page');
    });

    page('/analyze', function() {
        app.route = 'analyze';
        app.setMainContent('analyze-page');
    });

    page('/map', function() {
        app.route = 'map';
        app.setMainContent('map-page');
    });
    page('/about', function() {
        app.route = 'about';
        app.setMainContent('about-page');
    });
    page('*', function() {
        app.route = 'customers';
        app.setMainContent('customers-page');
    });

    // Define the base path for the cases we're not running the app in '/'.
    var path = document.location.pathname;
    if (path !== '/') {
        path = path.substring(0, document.location.pathname.length - 1);
        page.base(path);
    }

    // Use #! in urls.
    page({
        hashbang: true
    });
});
