# Xpresser Abolish Plugin

This Plugin uses [Abolish Object Validator](https://npmjs.org/package/abolish) to validate your request body and query.

Check abolish object validator docs [here](https://npmjs.org/package/abolish)

```javascript
class UserController extends ControllerClass {
  
  login(http) {
    const [error, data] = http.validateBody({
      email: "email",
      password: "typeof:string|minLength:6",
    })
    
    console.log({error, data})
  }

}
```

##### Documentation coming soon