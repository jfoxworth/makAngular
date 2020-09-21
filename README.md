
# Mak Studio - Angular App

This repo is the angular app for Mak Studios. The app is a place where users can look at designs created by Mak, alter specific dimensions and other parameters, and then purchase that altered project. The user can save as many projects as desired and as many versions of those projects as desired.


## Components

There are 14 top level components for the app. Seven of those components are viewable to a user that is logged in with specific credentials. Six are available if the user does not have creator permissions, and three that are visible if the user is not logged in.


### Top level components

#### Profile component

The profile component displays the information for the logged in user or for a user specified in the URL. A user can also change their display name, website, image, and other items.


#### Chat / Messages

The chat component lets the user exchange messages instantly with Mak Studio. In the future, this will also allow for messages with other users.

#### Knowledge Base

This is similar to a FAQ. It is a place where users can see how to use the app. This is one of the views available to all users.


#### My Projects

A tab where the user can view and alter their projects. Links to the invoice and to the design studio for each project is given.


#### Design Studio

The design studio provides a 3D view of the designs as well as a menu to alter the properties of that version. This is one of the views available to all users.


#### Market Place

The marketplace provides information on all available designs. The can see a description, images, an entry price, and other items. This is one of the views available to all users. The items in the market place are created in set in the creator studio.


#### Creator Studio

The creator studio is where specific users create and edit designs. The menu and the shapediver ticket are edited as well.



### Second level components

These are the items that are not directly available to users.


#### Standard components

These are the items that are not unique to the app. They include the login, the register, the the mail-confirm components. 


#### Invoice

The invoice component is a place where users can view the cost of the item as well as the final settings. They are provided with a link to purchase the version in question.



## Code setup

For every database table, there is an associated model. For each of those models, there is a service that handles the CRUD operations for that model. There are multiple read options with ones getting a single document by ID, getting all documents for the user, etc. There is an additional service for each component that handles organizational and formatting items for that component.

All models are held in a separate folder with that name. All services are held in a separate folder with that name as well.


## How to create the development server

The standard command `ng serve` creates a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

The standard `ng build` will build the project. The --prod will build the production code. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
