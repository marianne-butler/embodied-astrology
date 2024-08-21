const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
id = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0';

exports.handler = async function (event, context) {
	let error, response;
	function composeResponse() {
		return {
        	statusCode: 200,
        	body: JSON.stringify(response),
        	headers: { "Access-Control-Allow-Origin" : "*" }
      	}
	}

	function composeError() {
		return {
        	statusCode: 500,
        	body: JSON.stringify(error),
        	headers: { "Access-Control-Allow-Origin" : "*" }
      	}
	}

	try {
		const client = new stytch.Client({
			project_id: id,
			secret: secret,
			env: stytch.envs.test
		});

		switch (event.queryStringParameters.action) {
			case "PROFILE":
				await client.users.get({user_id: event.queryStringParameters.user_id})
				    .then(resp => response = resp)
				    .catch(err => error = err);
	    	    return error == null ? composeResponse() : composeError();
				break;
			case "MAGIC":
				await client.magicLinks.email.loginOrCreate({email: event.queryStringParameters.email})
					.then(resp => response = resp)
				  	.catch(err => error = err);
				return error == null ? composeResponse() : composeError();
				break;
			default:
				error = "action not handled";
			    return composeError();
				break;
		}
	}
	catch (clientErr) {
		clientErr = clientErr;
		return composeError();
	}
};