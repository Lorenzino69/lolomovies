// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA7mlIwmU-0b_GNh40wdawulNouYH_b-NU',
    authDomain: 'lolomovie.firebaseapp.com',
    databaseURL: 'https://lolomovie.firebaseio.com',
    projectId: 'lolomovie',
    storageBucket: 'lolomovie.appspot.com',
    messagingSenderId: '481268786777'
  }
};
