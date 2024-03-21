The profile changer front end application. This is a simple application that:
- Allows a user to signup by filling in a few details (path: /signup).
- Allows a user to login (path: /) using the email and password they used while signing up.
- Once logged in, the user is taken to their profile where they can add some additional details about themselves (path: /profile).
- The profile page is only accessible if one is logged in. If they are not logged in then an error message is displayed.
- There is a logout button on the profile page which logs them out.

There is enough functionality to write some e2e tests. Some functionality does not work, this is intentional.

## Prerequisites
Node.js v21+
Backend services should be accessible locally on port 3001. CORS has been configured on the backend to allow requests from localhost:3000.

## Local execution
Open [http://localhost:3000/signup](http://localhost:3000/signup) with your browser to first sign up. Remember your email and password.

Then open [http://localhost:3000/](http://localhost:3000/)
to go to the login page. On a successful login you should be brought to your profile page.

The profile page can be directly accessed at http://localhost:3000/profile. You should see what happens when you try to access the page without logging in first.
