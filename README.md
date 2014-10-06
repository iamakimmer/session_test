session_test
============
try going to localhost:3000 and logging in (username/password doesn't matter)
upon login, you should see the user object populated in view.

now clear cookies (connect.sid) and try going to localhost:3001 and logging in.
upon login, you will get an error because the user isn't found. Why is this? I've set cross domain:

i've set the headers:

res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);

And in the front end I'm sending the cookie:

$httpProvider.defaults.withCredentials = true; 

What is missing here?
