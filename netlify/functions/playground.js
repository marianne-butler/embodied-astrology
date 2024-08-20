const stytch = require('stytch');

exports.handler = async function (event, context) {
  const client = new stytch.Client({
    env: "test",
    project_id: 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0',
    secret: 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
  });

  const params = {
    email: "marianne.voidofcourse@gmail.com",
  };

  client.users.create(params)
    .then(resp => { 
      return {
        statusCode: 200,
        body: JSON.stringify({"result":"ok"}),
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        }, 
      }; 
    })
   .catch(err => { 
    return {
      statusCode: 500,
      body: JSON.stringify({"error":err}),
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      }, 
    }; 
  });
};
