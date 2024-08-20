const stytch = require('stytch');

exports.handler = async function (event, context) {
  try {
    const client = new stytch.Client({
      env: 'live',
      project_id: 'project-live-294d69b5-32ae-4470-a64e-4294d30e0ad4',
      secret: 'secret-live-ryRf7hFoNfsAT3uJRcfyh1vfUBmKk3jeYYg=',
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
