// const stytch = require('@stytch');

// const { STYTCH_TEST_PROJECT_ID, STYTCH_TEST_SECRET, STYTCH_TEST_TOKEN } = process.env;

// let response, error;

// const client = new stytch.Client({
//   env:'TEST',
//   project_id: STYTCH_TEST_PROJECT_ID,
//   secret: STYTCH_TEST_SECRET,
// });

// exports.handler = async function (event, context) {
//   client.users.create({
//     email: "marianne.voidofcourse@gmail.com",
//   })
//     .then(resp => { response = resp; })
//     .catch(err => { error = err; });

//    return {
//        statusCode: 200,
//        body: JSON.stringify({"result": response, "error": error}),
//        headers: {
//          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
//        }, 
//    };

// };
