const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
id = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0';

exports.handler = async function (event, context) {
	try {
		const client = new stytch.Client({
			project_id: id,
			secret: secret,
			env: stytch.envs.test
		});

		const params = {
			user_id: "user-test-a522bcec-552a-46b3-b476-34f98a164acf",
		    trusted_metadata: {
		        role: "ADMIN"
		    }
		}
		console.log('awaiting');

		await client.users.update(params)
		    .then(resp => {
		    	console.log(resp);
		        return {
		        	statusCode: 200,
		        	body: JSON.stringify({"result":resp}),
		        	headers: {
		          		"Access-Control-Allow-Origin" : "*", 
		        	}, 
		      	};
		    })
		    .catch(err => {
		        console.log(err);
		        return {
		        	statusCode: 500,
		        	body: JSON.stringify({"result":err}),
		        	headers: {
		          		"Access-Control-Allow-Origin" : "*", 
		        	}, 
		      	};
		    });

		console.log("nothing");
	}
	catch (clientErr) {
		 return {
		    statusCode: 500,
		    body: JSON.stringify({"error":clientErr}),
		    headers: {
		    	"Access-Control-Allow-Origin" : "*",
		   	}, 
	   	}; 	
	}
};