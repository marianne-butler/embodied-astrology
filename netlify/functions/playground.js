const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
id = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0';

exports.handler = async function (event, context) {
	let error, response;
	const {action, user_id, email, token, stytch_token_type} = event.queryStringParameters;

	async function getAstrochart() {

	}

	function composeResponse(jwt) {
		// if (jwt) head["set-Cookie"] = `jwt=${jwt}; secure; httpOnly; sameSite=Lax`
		console.log(jwt);

		return {
        	statusCode: 200,
        	body: JSON.stringify(response),
        	headers: { "Access-Control-Allow-Origin" : "https://embodied-astrology.netlify.app" }
      	}
	}

	function composeError() {
		return {
        	statusCode: 500,
        	body: JSON.stringify(error),
        	headers: { "Access-Control-Allow-Origin" : "https://embodied-astrology.netlify.app" }
      	}
	}

	try {
		const client = new stytch.Client({
			project_id: id,
			secret: secret,
			env: stytch.envs.test
		});

		switch (action) {
			case "PROFILE":
				await client.users.get({user_id: user_id})
				    .then(resp => response = resp)
				    .catch(err => error = err);
	    	    return error == null ? composeResponse() : composeError();
				break;
			case "SESSIONS":
				await client.sessions.get({user_id: user_id})
				    .then(resp => response = resp)
				    .catch(err => error = err);
	    	    return error == null ? composeResponse() : composeError();
				break;
			case "MAGIC":
				await client.magicLinks.email.loginOrCreate({email: email})
					.then(resp => response = resp)
				  	.catch(err => error = err);
				return error == null ? composeResponse() : composeError();
				break;
			case "LOGIN":
				switch (stytch_token_type) {
					case "magic_links":
					await client.magicLinks.authenticate({
							token: token, 
							session_duration_minutes: 42480
						})
						.then(resp => response = resp)
					  	.catch(err => error = err);
					return error == null ? composeResponse() : composeError();
					break;

					default:
						error = "token type not handled";
						return composeError();
						break;
				}
				break;
			case "CHART":
				await fetch('https://astro-api-a4afb1474dd8.herokuapp.com/snapshot?place=macclesfield%20england&year=1983&month=3&day=15&hour=15&minute=35')
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