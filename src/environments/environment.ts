// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firestoreConfig: {
    apiKey: "AIzaSyAFyqBjbEciqC_01xgEhWLJ-flpKHQAuTs",
    authDomain: "students-5baf7.firebaseapp.com",
    databaseURL: "https://students-5baf7.firebaseio.com",
    projectId: "students-5baf7",
    storageBucket: "students-5baf7.appspot.com",
    messagingSenderId: "326206224956"
  }
};
