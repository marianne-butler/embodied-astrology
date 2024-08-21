const stytch = require('stytch');

const token = 'public-token-test-426746fe-aad7-4abd-8733-3b9a68c375fa',
secret = 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0',
id = 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY';

const client = new stytch.Client({
	project_id: id,
	secret: secret,
});

exports.handler = async function (event, context) {
	console.log('handler');

	const params = {
		email: "marianne.voidofcourse@gmail.com",
	};

  	client.users.create(params)
    	.then(resp => { 
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
};