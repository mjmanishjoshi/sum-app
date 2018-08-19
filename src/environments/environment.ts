// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB54tLyM2RH5fwy9Ig5E4fwHZIDY59sQ_g",
    authDomain: "mj-sum-app.firebaseapp.com",
    databaseURL: "https://mj-sum-app.firebaseio.com",
    projectId: "mj-sum-app",
    storageBucket: "mj-sum-app.appspot.com",
    messagingSenderId: "741144800512"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
