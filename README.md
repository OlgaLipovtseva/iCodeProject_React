# Learning project for iCode program.

This project is focusing on the front-end development.
It is based on React and uses React Bootstrap (4) library and Firebase.
Bootstrap was chosen to implement better screen size adaptability.

In the project implemented two different approaches using context:
React Context for User's Authentication and Redux for Cart.

# Parts of the project:

- User authentication using Firebase Auth and Firebase Realtime base for role assigning.
Implemented using React Context. Parts: Sign up, Sign in, Sign out, Forget password;
Users account and Admin (accessible only with Admin role) pages.

- Ecommerce part with Store page and cart. Products are loaded from Realtime Firebase.
Cart implemented using Redux. It has options to add or remove a product.
