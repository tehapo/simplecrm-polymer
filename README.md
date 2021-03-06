# Simple CRM

This is a [Polymer](https://www.polymer-project.org/) version of an example application generated by [Vaadin Bluemix Boilerplate](https://vaadin.com/blog/-/blogs/vaadin-boilerplate-in-bluemix).

See the application running [live](http://demo.vaadin.com/SimpleCRM).

Main features of this application:

 * Responsive UI created using [Polymer elements](https://elements.polymer-project.org/) and [Vaadin Components](https://vaadin.com/components).
 * Routing between views is done using the [Page.js](https://visionmedia.github.io/page.js/) client-side router.
 * A static file is used as the data source, but it could easily be replaced with a REST API.

![](screenshot.png)

## Views

The application consists of four views.

 * **About** (```pages/about-page.html```)
    * Simple HTML view.
 * **Customers** (```pages/customers-page.html```)
    * Table of customers displayed using ```<v-grid>```.
    * Selecting a row opens up an editor for customer details.
 * **Analyze** (```pages/analyze-page.html```)
    * Set of charts based on customer data.
    * Charts are displayed with ```<v-charts>```.
 * **Map** (```pages/map-page.html```)
    * Map of customer locations displayed with ```<google-map>``` element.

Each view is a Polymer element that is dynamically inserted into DOM of the main page according to the routing configuration.

## Routing

Routing between views is done using the [Page.js](https://visionmedia.github.io/page.js/) client-side router.
During navigation a CSS class ```transition``` is defined for the main content which enables a transition animation
between different views. See ```app.js``` for the routing configuration.

#### Routing Example
```javascript
page('/customers', function() {
    app.route = 'customers';
    app.setMainContent('customers-page');
});
```

## Data Access

Accessing the customer data is done with ```<iron-ajax>``` element. Its usage is wrapped within ```<customer-data>``` element
which maintains an in-memory cache of the data to prevent requesting the same data multiple times. That custom element also
provides methods that can be used to update or delete customer entries.

Currently the data is provided as a static JSON file (```data/customers-snapshot.json```), but the ```<customer-data>``` element
could be upgraded to use a real REST service without too much effort.

## Data Editing

Selecting a row in the Customers view opens up an editor form that is constructed from various ```<paper-*>``` elements.
The editor is contained in the ```<customer-form>``` element. The ```<customer-form>``` fires three kinds of events
corresponding to the buttons in the form.
These events are ```save```, ```cancel``` and ```delete```. The containing ```<customer-page>``` registers itself to
listen for these events and reacts accordingly.

## Charts

The Analyze view displays couple of visualizations from the customer data. These are created using the web components
API of [Vaadin Charts](https://vaadin.com/add-ons/charts). The actual calculation of data presented in these charts is done
in JavaScript functions of the ```<analyze-page>```.
