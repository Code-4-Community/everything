# Monarch Backend

[Back to top level README]('../../README.md')

TODO: PlantUML diagram

Most important technologies:

- Typescript
- Express
- Zod for data validation + types
- Zodios for type driven API development
  - Endpoints must fulfill Zod schemas (input/output validation)
- AWS DynamoDB SDK for access to DynamodDB
- AWS Cognito for authentication
  - We only need to verify tokens on the monarch-monarch-backend, the frontend communites with Cognito directly to receive tokens
