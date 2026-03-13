# User Story 1

As a visitor of “Digital Banking Summit” I want to have a website where I can login and see my basic profile information.

All attendees from digital banking summit in Berlin will receive a link to a website. They can login to that website using their GitHub account. The website will then show basic profile information.

## Scope

This user story is about setting up the website solution locally. The website should have a link that allows the user to login using their GitHub credentials. After successful login, basic profile information from GitHub should be shown.

## Acceptance Criteria

- The site is setup to use Node.js as a simple webserver backend
- Unauthenticated users get a link to a login page from GitHub
- GitHub will ask permission for the website to ask for basic profile information
- Authenticated users get a profile view that includes their own username and avatar
- The frontend should be built in React and should be mobile-friendly
- Design is not very important, but it should look clean and responsive
