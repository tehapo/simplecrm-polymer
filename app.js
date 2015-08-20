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
        }, 300);
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

    var defaultRoute = function() {
        app.route = 'about';
        app.setMainContent('about-page');
    };
    page('/about', defaultRoute);
    page('*', defaultRoute);

    // Use #! in urls.
    page({
        hashbang: true
    });
});
