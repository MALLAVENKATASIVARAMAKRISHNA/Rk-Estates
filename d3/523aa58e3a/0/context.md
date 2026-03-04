# Session Context

## User Prompts

### Prompt 1

read opencode.md and understand the project and read the entire repo and then update if anything misssing

### Prompt 2

I am building a React + Vite real estate app called RK Estates.
I have an AuthContext at src/context/AuthContext.jsx that provides 
user, token, login(), logout() and isAdmin().
I have an AdminRoute at src/components/AdminRoute.jsx and 
PrivateRoute at src/components/PrivateRoute.jsx.
Backend is FastAPI running at http://localhost:8000.

Create a complete profile.jsx file at src/pages/profile.jsx.
It should fetch GET http://localhost:8000/api/auth/me with the 
Authorization: Bearer <token> he...

### Prompt 3

I am building a React + Vite real estate app called RK Estates.
Backend is FastAPI running at http://localhost:8000.

Create a complete api.js utility file at src/utils/api.js.
It should export a function called authFetch(url, options) that 
automatically reads the JWT token from localStorage under the key 
"token" and adds the Authorization: Bearer <token> header to every 
request. It should work as a wrapper around the native fetch() 
function and pass through any other options like method,...

