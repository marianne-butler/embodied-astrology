const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0',
id = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY';

exports.handler = async function (event, context) {
	const params = {
	  user_id: "user-test-a522bcec-552a-46b3-b476-34f98a164acf",
	};

	try {
		await const client = new stytch.Client({
			project_id: id,
			secret: secret,
			env: stytch.envs.test
		});


	  	client.users.get(params)
	    	.then(resp => { 
		      	console.log(err);

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
				    body: JSON.stringify({"error":err}),
				    headers: {
				    	"Access-Control-Allow-Origin" : "*",
				   	}, 
			   	}; 	
			});
	}
	catch (clientErr) {
		console.log(clientErr);

		 return {
		    statusCode: 500,
		    body: JSON.stringify({"error":"clientErr"}),
		    headers: {
		    	"Access-Control-Allow-Origin" : "*",
		   	}, 
	   	}; 	
	}
};