# mobile-flexits

A hobby project that I started in November 2020. It is a rewrite of the original app I developed for Transact2 Sdn. Bhd. named Transact2 ClockIT, which is available in both Google Play and Apple Store. I do not have the original's source code due to legal bindings after I left the company in August 2020.

The initial code of this project started with the bare workflow (using React Native CLI) like the original app. I decided to try Expo and rewrote what I've wrote initial for ease of testing using Expo's services. This app UI is different from the original's.

## Timeline

-   Nov 11, 2020: Initialization of the project.
-   Dec 14, 2020: Last edit for the React Native CLI version.
-   Jan 6, 2021: Initialization of the project using Expo.
-   Jan 9, 2021: Impletemented geolocation for the main clocking screen.
-   Jan 10, 2021: Authentication screen completed.
-   Jan 10 - 13, 2021: Clean up clocking screen and fixed indefinte looping issue.
-   Jan 14, 2021: Relocate Reason screen as its own stack instead of part of the home stack.
    Reason being, to stop users from accidently submitting another transaction after the finish
    button is click and forwarded to Attendance screen. This is because if this screen is part of
    home stack, when user click the clocking tab, it just brings the user back to Reason screen, and
    hence my concern above.
-   Jan 21, 2021: Attendance screen completed.
-   Jan 22, 2022: Push clocking record to API completed.

## Todos:

-   Authentication screen.
    -   Forget password screen.
-   Clocking screen: push clocking record to API.
-   Settings screen.
-   Change Password screen.

# Installation

### Prerequisite

-   NodeJs to use npm command.
-   Expo

1. run npm install
2. run npm start android / ios to launch the app
