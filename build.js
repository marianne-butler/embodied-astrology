// import { StytchUIClient } from '@stytch/vanilla-js';

// const stytch = new StytchUIClient('public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa');

// // Call Stytch APIs from the browser
// stytch.magicLinks.email.loginOrCreate('marianne.butler@gmail.com');

// // Render prebuilt UI
// stytch.mountLogin({
//   elementId: '#magic-link',
//   config: {
//     products: ['emailMagicLinks', 'oauth'],
//     emailMagicLinksOptions: {
//       loginRedirectURL: 'https://embodied-astrology.netlify-app.com/authenticate',
//       loginExpirationMinutes: 30,
//       signupRedirectURL: 'https://embodied-astrology.netlify-app.com/authenticate',
//       signupExpirationMinutes: 30,
//       createUserAsPending: true,
//     },
//     oauthOptions: {
//       providers: [{ type: 'google' }, { type: 'microsoft' }, { type: 'apple' }],
//       loginRedirectURL: 'https://embodied-astrology.netlify-app.com/authenticate',
//       signupRedirectURL: 'https://embodied-astrology.netlify-app.com/authenticate',
//     },
//   },
// });