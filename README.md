# Everything

This is the C4C monorepo containing all of our active projects.

Deployable units exist in `/apps`, inside each folder there is a README explaining how that unit is tested and deployed.

Business logic and supporting library for those deployable units exist in `/libs`. These are composable units of software that are not coupled to a specific deployment framework or strategy, and are meant to be easily reused in future projects.

The purpose of `README.md`s in this repository are to explain the usage of the application. The bare minimum you need to get it running. More detailed developer and public documentation exists on the wiki. `README.md`s will often link to relevant wiki pages.

Links to Project `README.md`

- [Monarch](./apps/monarch/README.md)
- [c4cneu.com](./apps/dotcom/README.md)

## 🔨 Development

1. Install Node v16.x
2. Clone this repo
3. `yarn install`

When adding new dependencies, use `yarn add` or its dev dependency equivalent. Thanks to Nx, each package will only be installed once, and each app knows how to bundle itself correctly based on its dependencies.

## Challenge Submission:

Three things I would do to do improve the quality of the codebase in order of importance:

1. Security Measures: While cors adds a layer of protection against XSS attacks by preventing unauthorized requests on different domains, there is little to no security measures against other kinds of attacks such as SQL injection that could put the user's privacy at risk.
2. Input Validation/Error Handling: For such a simple web app, there is not much room for error in the user experience. However, without any feedback or handling of a user improperly submitting a URL, it remains a very
3. Logging: Error and event logging could be for an easier time debugging and monitoring.

## Improvement Implemented:

For this submission, I chose to improve the app by adding the ability to encode URL's as QR codes.
