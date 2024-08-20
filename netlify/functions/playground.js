const stytch = require('stytch');

const { STYTCH_TEST_PROJECT_ID, STYTCH_TEST_SECRET, STYTCH_TEST_TOKEN } = process.env;

exports.handler = async function (event, context) {
  try {
    const client = new stytch.Client({
      project_id: STYTCH_TEST_PROJECT_ID,
      secret: STYTCH_TEST_SECRET,
    });

// const params = {
//   email: "marianne.voidofcourse@gmail.com",
// };

// client.magicLinks.email.send(params)
//   .then(resp => { console.log(resp) })
//   .catch(err => { console.log(err) });

    return {
        statusCode: 200,
        body: JSON.stringify({"result":"ok"}),
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        }, 
      }; 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({"error":e}),
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      }, 
    }; 
  }
  

  // const params = {
  //   email: "marianne.voidofcourse@gmail.com",
  // };

  // client.users.create(params)
  //   .then(resp => { 
      // return {
      //   statusCode: 200,
      //   body: JSON.stringify({"result":"ok"}),
      //   headers: {
      //     "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      //   }, 
      // }; 
  //   })
  //  .catch(err => { 
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({"error":err}),
  //     headers: {
  //       "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  //     }, 
  //   }; 
  // });
};
