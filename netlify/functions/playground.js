const stytch = require('stytch');

const client = new stytch.Client({
  project_id: 'project-test-6f387723-84a0-4c92-8f67-4f1b259d9ba0',
  secret: 'secret-test-zgxGcqbRPjKEr_MkhBWag2-KSXvaY1MoCKY=',
});

const params = {
  email: "marianne.voidofcourse@gmail.com",
};

client.users.create(params)
  .then(resp => { console.log(resp) })
  .catch(err => { console.log(err) });