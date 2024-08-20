const stytch = require('stytch');

const { STYTCH_TEST_PROJECT_ID, STYTCH_TEST_SECRET, STYTCH_TEST_TOKEN } = process.env;

const client = new stytch.Client({
  project_id: STYTCH_TEST_PROJECT_ID,
  secret: STYTCH_TEST_SECRET,
});

exports.handler = async function (event, context) {
  const params = {
    email: "marianne.voidofcourse@gmail.com",
  };

  client.users.create(params)
    .then(resp => { console.log(resp) })
    .catch(err => { console.log(err) });
};
