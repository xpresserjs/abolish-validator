# Xpresser Abolish Plugin

This Plugin uses Abolish to validate your request body and query.

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

##### Documentation comming soon