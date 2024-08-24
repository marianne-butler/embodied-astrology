const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
id = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0';

exports.handler = async function (event, context) {
	let error, response;
	const cookies = event.headers.cookie.split(";");
	console.log(cookies);

	const {action, user_id, email, token, stytch_token_type} = event.queryStringParameters;

	function composeResponse() {
		const jwt = response.session_jwt;

		return {
        	statusCode: 200,
        	body: JSON.stringify(response),
        	headers: jwt == null ? { 
        		"Access-Control-Allow-Origin" : "https://embodied-astrology.netlify.app",
        		"Set-Cookie": "cookie_name3=o;expires:0"
        	} : { 
        		"Access-Control-Allow-Origin" : "https://embodied-astrology.netlify.app",
        		"Set-Cookie": `session_jwt=${jwt};SameSite=Strict;secure;HttpOnly`,
        		"Set-Cookie": "cookie_name3=o;expires:0"
        	}
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
				if (user_id != null) {
					await client.users.get({user_id: user_id})
					    .then(resp => response = resp)
					    .catch(err => error = err);
		    	    return error == null ? composeResponse() : composeError();
		    	}
		    	else {
		    		client.users.search({
		    			limit: 1,
		    			query: {
		    				operands: [
		    				{filter_name: "email_address", filter_value: email}]}})
					    .then(resp => response = resp)
						.catch(err => error = err);
		    	}
				break;
			case "USER_SESSIONS":
				await client.sessions.get({user_id: user_id})
				    .then(resp => response = resp)
				    .catch(err => error = err);
	    	    return error == null ? composeResponse() : composeError();
				break;
			case "AUTH":
				await client.sessions.authenticate({session_jwt: null})
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
				let natal;
				
				await fetch('https://astro-api-a4afb1474dd8.herokuapp.com/snapshot?place=macclesfield%20england&year=1983&month=3&day=15&hour=15&minute=35')
				.then(res => res.json().then(json => natal = json));
				
				await client.users.update({
					user_id: user_id,
					name: { first_name: "Maz" },
					trusted_metadata: { "natal": natal}
				})
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