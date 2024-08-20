const stytch = require('stytch');

exports.handler = async function (event, context) {
  try {
    const client = new stytch.Client({
      // env: "test",
      project_id: 'project-test-1428e3ef-4f31-46d1-bcb8-3906f21a3715',
      secret: 'secret-test--IMJaaO8tgFRZa2WPtffO4xuQcOv-CqYWPM=',
    });

    return {
        statusCode: 200,
        body: JSON.stringify({"result":"ok"}),
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        }, 
      }; 
  } catch (e) {
    return {
      statusCode: 200,
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
      return {
        statusCode: 200,
        body: JSON.stringify({"result":"ok"}),
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        }, 
      }; 
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
