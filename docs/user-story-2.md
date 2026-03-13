# User story 2

As a visitor of “Digital Banking Summit” I want to get information and times of all of the sessions.
Visitors want to get information on when, where and what will be presented. There should be a simple overview that shows this information, and a detail view for each session with speaker and session content information.

## Scope

This is about creating a styled, responsive list view with ability to navigate between a list and details. It’s important that this should work well on mobile devices, as visitors will want to use the website on mobile devices when visiting the summit.

## Acceptance Criteria

- The session overview must be in chronological order and also show parallel sessions (they don’t have to be displayed next to each other, just the times may correspond).
- Each session can be selected/clicked to get a detail view that has a presenter profile and session detail description
- From the detail, it should be easy to navigate back to the overview
- The frontend should be built in React and should be mobile-friendly
- Data can be fixed, but would preferably be in a json format so that it can be linked up to an API in the future
