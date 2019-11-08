# Frizio Development (branch master-frizio)

So in summary what we need in order to implement all these features is a state management solution and that's exactly what NgRX is.
- It's an angular specific state management solution that will allow us to create the client's site database with our data and it will allow us to minimize the number of HTTP requests done to the server.
- It will allow us to easily have different parts of our view reflect new versions of the data.
- It's going to allow us to have a much improved user experience with minimal loading indicators and having the UI immediately reflect the data modifications without having to call again the server.
So when compared to a traditional application made without any state management this is really a next generation application that we are talking about with a much improved user experience and performance.  We're going to learn how to use NgRX in order to implement all those features in our application. NgRx is based on the Store architecture, so let's quickly cover it and then let's get started adding NgRx to our application and adding all this statement management features one by one.

## ACTIONS and REDUCERS

### Add ngrx-store
Notice that we often refer to the store as being an in memory database but it's not an actual database in the sense that there are no transactions or a query language etc. 
It's simply a centralized place in our front end where we can store and read data from in order to prove that that is the case.

### Add ngrx-store-devtools
The store-devtools their tools are a browser extension that is going to allow us to see the content of our in-memory database easily using the Chrome dev tools.
- Add Chrome extension Redux DevTools from remotedevio.

### Modular structure of the application
Scope: Smaller size of the initial application bundle (The Initial boilerplate javascript loaded at startup).
- AuthModule is a EAGER Loading module
- CoursesModule is a LAZY Loading module

### Store Service API
- Inject the Store service;
- Modify the data inside the store: -> Create action and Dispatch it (instead of CRU API)
- Read the data inside the store: -> Subscribe

### Actions
An action is a plain javascript object that we send to the store in order to trigger some modification of the store state. It has 'type' + 'payload'.
There are multiple types of actions an action, the two most typical types of actions are: 
- a command that we send to the store. We explicitly tell the store to perform a certain operation;
- an event reporting something that has happened at the level of the component.
In any case dispatching an action it's the only way of modifying the stored state.
In pratice,  dispatching of an action itself does not affect the store status. So an action is simply a plain javascript payload either a command or an event that informs the store that something has occurred externally but by itself inaction is not going to directly modify the state. In order to modify the store State and save here the user profile under the off property. We need to tell the store how to handle the action (the reducer).
- Grouping Action together 
It's very important that we don't reuse multiple actions in different parts of the application. It's important instead to create different actions for different screens and components in the application

### Reducer
An action is a simply a plain javascript payload that informing the store that typically something has happened at the level of the component and we have sent it to the store by calling the dispatched method.
Now we need to define what should the store do in response to the action. So for that we are going to need a new function which is called a reducer.
This function does not modify the state of the store directly. Instead it calculates a new version of the state based on the previous state and the action that just got dispatched. It's a function that we need to pass to the store so that the store knows how to react to a given action.

### Conclusion
So to summarize the store it's like an in-memory database that contains data that is going to get shared by multiple components of the application. Each component does not modify the state directly instead of its component that wants to modify the ata will dispatch an action. 
An action is just a plain javascript payload containing some data and a type. The type tells to the store what to do with the action. 
Depending on the type the store is going to call a reducer function. The reducer function it's a plain javascript function that calculates a new version of the state.

## SELECTORS and EFFECTS

### Selector
So we these we have defined here our first selector. This is a mapping function that using the createselector utility has memory. So as long as our input state object does not change the output is not going to be recalculated.
These type of function is known in functional programming terms as a memorized function, meaning that it keeps memory of previous executions and only executes itself if the inputs of the function have not been calculated before after each new execution of the function the memorized function is going to keep in the memory cache specific to the function the results of each calculation.
So in summary it's a mapping function with memory 

### Feature Selector
A selector is simply a plain mapping function with memory. We use these mapping functions to query our Auth State and get back the values that the view needs to display later to the user in order to find that is logged in selected.
The authentication state corresponds to the authentication feature module. So this is a module that is part of our application that is included in the root module that is known as a feature module which typically contains a series of screens Components Services that are related to one particular functionality of our application. In this case the authentication functionality.

### Review
So at this point in the course we have introduced some of the key concepts of our NgRX. We know how to interact with the store by creating and dispatching actions. We know how to change the state contained inside the store by implementing reduce service. And we know how to query the data in the store using selectors.

### Effects
A side effect is something that is done in response to a given action. So the action gets dispatched. It reducer gets triggered. And then after that we want to do something else describe in the effect.

- Example we would like to be able to fetch these list of courses from a back in and store them in the store. And whenever we edit one of the courses using here the edit button and lets say we change the title of the course we would like to press save and have those changes immediately reflected in the UI meaning that the store should be immediately updated with the new information without blocking the user. However in the background as a side effect of the modification that we just did in the store of data such as changing the title of the course we would like the store to also save those changes to the backend. Well that extra backend request that these synchronizing the data that we have in the store with a database is a good example of a side effect.
- We would like our authentication state to survive browser refresh. Actually authentication state is going to be deleted. Implement this feature wsing the Local Storage.

## Development Tools

### Router Store Time-Travelling debbugger

### Runtime-CHecks
In redudcer, instead of creating new object and return it, it's possibile (but strongly not suggested) mutate directi the input state object. This is problematic it's because this would brake on push change detection in case that we would be using it in our application. So unpolished change detection is a spatial angular shames detection mode that we are going to cover at the end of this course that allows our application to get the view updated in a more performance way assuming that the data does not get mutated and that we push each time new versions of the data to the view.So if we mutate directly the data inside the store we would break that guarantee and our application

### Metareducer
A Metareducer is a reducer of function. Just like any other it follows the same concepts such as it takes the current state and action and produces a new version of a state. But the difference is that a meta reducer is going to be processed before the normal reduced certs are invoked. So that's the main difference.

## Entity Data and library

### NgRx Feature Design - Defining Actions First
Action of the functionality: So to summarize our courses resolver it is going to emit this action which is going to trigger this effect called the back end and dispatch this new action that will save the courses data in the store.

So let's now start implementing our functionality in a logical way. We are going into our courses resolver that is going to trigger the loading of actions from the back end. We are then going to implement our effect that performance the fetch from the back end. We're going to dispatch this action implement its reducer logic. And finally we are going to write a series of new selectors and we're going to grab our data in our home component from the store instead of calling here the http service.

### (Router Resolver)
A router resolver is a special service that runs before the router completes its transition. If the target component needs some data from the back end, the resolved is the best place to fetch that data because the router will ensure that the target screen does not get displayed if the data has not been fetched yet. So this means that our target screen is only going to be displayed to the user if the data that it needs is already available. If there's something wrong while fetching the data from the back and the router navigation is going to be cancelled. So this is a great way of ensuring that we never should use it empty screens that contain no data.
## Ngrx (with NgRx Data) - The Complete Guide

This repository contains the code of the video course [Ngrx (with NgRx Data) - The Complete Guide](https://angular-university.io/course/ngrx-course).

This course repository is updated to Angular v8 and NgRx 8:

![Ngrx (with NgRx Data) - The Complete Guide](https://angular-university.s3-us-west-1.amazonaws.com/course-images/ngrx-v2.png)


# Installation pre-requisites

For taking the course we recommend installing Node 12. These are some tutorials to install node in different operating systems:

- [Install Node and NPM on Windows](https://www.youtube.com/watch?v=8ODS6RM6x7g)
- [Install Node and NPM on Linux](https://www.youtube.com/watch?v=yUdHk-Dk_BY)
- [Install Node and NPM on Mac](https://www.youtube.com/watch?v=Imj8PgG3bZU)

To easily switch between node versions on your machine, we recommend using a node virtual environment tool such as [nave](https://www.npmjs.com/package/nave) or [nvm-windows](https://github.com/coreybutler/nvm-windows), depending on your operating system. 

For example, here is how you switch to a new node version using nave:

    # note that you don't even need to update your node version before installing nave
    npm install -g nave
    
    nave use 12.3.1
    node -v
    v12.3.1

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 


# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/angular-ngrx-course.git
    
This repository is made of several separate npm modules, that are installable separately. For example, to run the au-input module, we can do the following:
    
    cd ngrx-course
    npm install

Its also possible to install the modules as usual using npm:

    npm install 

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

# To Run the Development Backend Server

We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)



# Important 

This repository has multiple branches, have a look at the beginning of each section to see the name of the branch.

At certain points along the course, you will be asked to checkout other remote branches other than master. You can view all branches that you have available remotely using the following command:

    git branch -a

  The remote branches have their starting in origin, such as for example 1-start.

We can checkout the remote branch and start tracking it with a local branch that has the same name, by using the following command:

      git checkout -b 1-start 

It's also possible to download a ZIP file for a given branch,  using the branch dropdown on this page on the top left, and then selecting the Clone or Download / Download as ZIP button.

# Other Courses

# Angular Core Deep Dive Course

If you are looking for the [Angular Core Deep Dive Course](https://angular-university.io/course/angular-course), the repo with the full code can be found here:

![Angular Core Deep Dive](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png)

# RxJs In Practice

If you are looking for the [RxJs In Practice](https://angular-university.io/course/rxjs-course), the repo with the full code can be found here:

![RxJs In Practice Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png)


# Angular Testing Course

If you are looking for the [Angular Testing Course](https://angular-university.io/course/angular-testing-course), the repo with the full code can be found here:

![Angular Testing Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png)

# Serverless Angular with Firebase Course

If you are looking for the [Serverless Angular with Firebase Course](https://angular-university.io/course/firebase-course), the repo with the full code can be found here:

![Serverless Angular with Firebase Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/serverless-angular-small.png)

# Angular Universal Course

If you are looking for the [Angular Universal Course](https://angular-university.io/course/angular-universal-course), the repo with the full code can be found here:

![Angular Universal Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-universal-small.png)

# Angular PWA Course

If you are looking for the [Angular PWA Course](https://angular-university.io/course/angular-pwa-course), the repo with the full code can be found here:

![Angular PWA Course - Build the future of the Web Today](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png)

# Angular Security Masterclass

If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course), the repo with the full code can be found here:

[Angular Security Masterclass](https://github.com/angular-university/angular-security-course).

![Angular Security Masterclass](https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png)

# Angular Advanced Library Laboratory Course

If you are looking for the Angular Advanced Course, the repo with the full code can be found here:

[Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-university.io/course/angular-advanced-course).

![Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png)


## RxJs and Reactive Patterns Angular Architecture Course

If you are looking for the RxJs and Reactive Patterns Angular Architecture Course code, the repo with the full code can be found here:

[RxJs and Reactive Patterns Angular Architecture Course](https://angular-university.io/course/reactive-angular-architecture-course)

![RxJs and Reactive Patterns Angular Architecture Course](https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png)


## Complete Typescript Course - Build A REST API

If you are looking for the Complete Typescript 2 Course - Build a REST API, the repo with the full code can be found here:

[https://angular-university.io/course/typescript-2-tutorial](https://github.com/angular-university/complete-typescript-course)

[Github repo for this course](https://github.com/angular-university/complete-typescript-course)

![Complete Typescript Course](https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png)

