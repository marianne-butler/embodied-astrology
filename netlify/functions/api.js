const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
id = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0';

exports.handler = async function (event, context) {
	let error, response, session_jwt;
	const cookies = event.headers.cookie;
	if (cookies != null) {
		const sesh = cookies.split(";").filter((s) => s.includes("session_jwt"));
		if (sesh.length > 0) {
			session_jwt = sesh[0].split("=")[1];
		}
	}
	const {action, user_id, email, cookie} = event.queryStringParameters;

	function composeResponse() {
		const jwt = response.session_jwt;

		return {
        	statusCode: 200,
        	body: JSON.stringify(response),
        	headers: cookie != "yes" || jwt == null ? { 
        		"Access-Control-Allow-Origin" : "https://embodied-astrology.netlify.app"
        	} : { 
        		"Access-Control-Allow-Origin" : "https://embodied-astrology.netlify.app",
        		"Set-Cookie": `session_jwt=${jwt};SameSite=Strict;Max-Age=2592000;secure;HttpOnly`
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
				if (session_jwt == null) {
					error = {"error_type": "session_jwt_null"};
					return composeError();
				}
				else {
					await client.sessions.authenticate({session_jwt: session_jwt})
					    .then(resp => response = resp)
					  	.catch(err => error = err);
					return error == null ? composeResponse() : composeError();
				}
				break;
			case "MAGIC":
				await client.users.search({
	    			limit: 1,
	    			query: {
	    				operator: "AND",
	    				operands: [{filter_name: "email_address", filter_value: [email]}]}
	    			})
				    .then(resp => response = {"user": resp['results'][0]})
					.catch(err => error = err);

				if (response != null) {
					if (response['user']['emails'][0].verified) return composeResponse();
					else response = null;
				}

				await client.magicLinks.email.loginOrCreate({email: email})
					.then(resp => response = resp)
				  	.catch(err => error = err);
				return error == null ? composeResponse() : composeError();
				
				break;
			case "LOGIN":
				const {token, stytch_token_type} = event.queryStringParameters;

				switch (stytch_token_type) {
					case "magic_links":
					await client.magicLinks.authenticate({
							token: token, 
							// options: {
							// 	ip_match_required: true,
							// 	user_agent_match_required: true,
							// },
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
				const {name, place, year, month, day, hour, minute} = event.queryStringParameters;

				await fetch(`https://astro-api-a4afb1474dd8.herokuapp.com/snapshot?place=${place}&year=${year}&month=${month}&day=${day}&hour=${hour}&minute=${minute}`)
				.then(res => res.json().then(json => natal = json));
				
				await client.users.update({
					user_id: user_id,
					name: { first_name: name },
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