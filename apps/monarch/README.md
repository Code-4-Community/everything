# Monarch

## Install

Make a copy of `.env.example` named `.env` in `/monarch-frontend`, replace the dummy value with the appropriate one(s).

```sh

# Serve the frontend & backend
nx run-many -t serve -p monarch-frontend monarch-backend

# lint, test, and build application
nx run-many -t lint,test,build -p monarch-frontend monarch-backend

```

## Description

Monarch is our internal code name for the prototype application we are developing to create a central hub for practitioners of integrative therapy. Our online search network will allow families across New England to discover which practitioners are in their area.
