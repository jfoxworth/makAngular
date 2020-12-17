# Mak Studio App

## App explanation
This app has two parts. The first shows the user the commercial side of the mak studio website. The 
second shows the app that a user would use to design their own product (TBD).

## App organization

### Common Modules
Common modules are those that are generally common to all apps. This includes a login and registration page, 404, email response, etc.

### Shared modules
Shared modules are those that are used by one or more modules. This includes the toolbar across the top, the banner showing the page location, and other items.

### Main modules
These are modules that are specific to mak studio. Generally, each page in the app has its own module and there is a top level folder in the main folder for each module. In this app, the modules are ...

<ul>
  <li>Chat</li>
  <li>Creator Studio</li>
  <li>Design Studio</li>
  <li>Invoices</li>
  <li>Knowledge Base</li>
  <li>Profile</li>
  <li>Projects</li>
  <li>The Marketplace</li>
  <li>Shared</li>
  <ul>
    <li>Nav bar for design</li>
    <li>Nav bar for commercial site</li>
    <li>Title banner</li>
  </ul>
</ul>

### Data models
There is a models folder with typescript interfaces for every model used and represented in this app. Those models have a corresponding table in the databases. Type casting is used extensively in this app.

### Components
There isn't a great deal in the way of reusable components as there isn't a lot of overlapping data to be displayed. As a general rule, every module as a top level component that holds the layout for the page. Every effort is made to keep the component template at or less than the length of one screen. Every section of the page is then broken out into smaller components. A component is intended to handle one aspect of each page.


## Building the app and running it locally
ng build --prod
npm start
