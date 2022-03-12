# Xpresser Validator (Abolish)

This plugins extends xpresser's RequestEngine to provide different validation methods that `abolish` supports.

## Installation
```shell
npm install @xpresser/abolish
# or
yarn add @xpresser/abolish
```

### Add to your project
Add the plugin to your `plugins.json` file:
```json
{
  "npm://@xpresser/abolish": true
}
```

### Add Types (For TypeScript)
Add to the bottom your `xpresser.d.ts` file:
```typescript
import "@xpresser/abolish/xpresser";
```

### Import Plugin Config
Note: Make sure you have `xjs-cli` installed.

```shell
xjs import abolish configs
```

This should create a `configs/abolish.(ts|js)` file. where you can extend Abolish and configure it.



## Http Methods
These methods are available in the `http` object.

 - `http.validate` - Validate objects on the fly.
 - `http.validateAsync` - Async version of `http.validate`.
 - `http.validateQuery` - Validate `query` object with defined rules.
 - `http.validateQueryAsync` - Async version of `http.validateQuery`.
 - `http.validateBody` - Validate `body` object with defined rules.
 - `http.validateBodyAsync` - Async version of `http.validateBody`.
 - `http.validatedBody` - Returns validated `body` set by Abolish Middleware.


If you are conversant with Abolish you should be able to understand how the methods mentioned above works.

For example if we have a controller action.

```typescript
export = {
    async index(http) {
        // `http.validate`
        const [error, validatedData] = http.validate(someObject, rules);
        // `http.validateAsync`
        const [error2, validatedData2] = await http.validateAsync(someObject, rules);
        
        // `http.validateQuery`
        const [error3, validatedData3] = http.validateQuery(rules);
        // `http.validateQueryAsync`
        const [error4, validatedData4] = await http.validateQueryAsync(rules);
        
        // `http.validateBody`
        const [error5, validatedData5] = http.validateBody(rules);
        // `http.validateBodyAsync`
        const [error6, validatedData6] = await http.validateBodyAsync(rules);
        
        // `http.validatedBody`
        const validatedData7 = http.validatedBody();
        
    }
}
```

## Abolish Middleware
This plugin provides a middleware that will validate the request body and return the validated data via `http.validatedBody()`.

### Register Middleware
To register the Middleware, add the following to your `use.json` file:
```json
{
  "middlewares": {
    "Abolish": "npm://@xpresser/abolish/dist/AbolishMiddleware.js"
  }
}
```

### Add Validation Routes Files
Create a file @ `backend/ValidationRules.(js|ts)` and add the following to it:

```typescript
import AbolishRoutes from "@xpresser/abolish/dist/AbolishRoutes"; // (TypeScript)
// or 
const AbolishRoutes = require("@xpresser/abolish/dist/AbolishRoutes"); // (NodeJS)

// ===== Initialize AbolishRoutes =====
const routes = new AbolishRoutes();

// ===== Define validation for Routes =====
// ===== Syntax =====
routes["post" | "patch" | "put"]("Controller@action", rules);
routes["post" | "patch" | "put"]("/exact/path/to/route", rules);

// ===== Example =====
routes.post("AuthController@login", {
    email: "required|email",
    password: "required|min:6"
});

// ===== Export Defined Routes =====
export = routes; // (Typscript)
// or
module.exports = routes; // (NodeJS)
```


### Apply Middleware
To apply the middleware, add the following to your controller middlewares;

```javascript
const controller = {
    middlewares: {
        "Abolish": "*", // for all actions
        // OR
        "Abolish": "action", // for specific action
        // OR
        "Abolish": ["action1", "action2"] // for multiple actions
    }
}
```