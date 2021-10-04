# Learning project for iCode program.

This project is focusing on a front-end development.
It is based on React and uses React Bootstrap (4) library and Firebase.
Bootstrap was chosen for better screen size adaptability.

Implemented two different approaches for context use:
React Context for User's Authentication 
and Redux for Cart.

# Parts of the project:

- User authentication using Firebase Auth and Firebase Realtime base for role assigning.
Implemented using React Context. Parts: Sign up, Sign in, Sign out, Forget password;
Users account and Admin (accessible only with Admin role) pages.

- Ecommerce part with Store page and cart. Products are loaded from Realtime Firebase.
Cart implemented using Redux. In a cart user can add, substact or remove a product. 
Admin page shows list of all products with quantities.

- Navigation bar with two rows and CSS animation (stars blinking) on hover on the top image. Some menu options are visible only to an  authorized user or to a user with "Admin" role.
