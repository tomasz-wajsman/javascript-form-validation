# JavaScript Data Validators
This library can validate the user input before processing.

### Contents
The library contains simple username, password and email address validator functions. You can change the minimum and maximum length of username and the minimum length of the password by supplying the *config* object to the function.
There are also login and register example validators available.

Functions return `true` value when the input data is correct. If it's not, the error is thrown.

### Username, password and email address validators
1. Import the validator object. The relative path from *root* is `./validators/basic`.
2. Use the function `validate` as follows:

	> Username: `validators.Username.validate(username, config)`
		Password: `validators.Password.validate(password, config)`
		Email: `validators.Email.validate(email)`
	
	where `validators` is the imported object and `config` is the custom config object.

### Login and register validators
1. Import the validator object. The relative path from *root* is `./validators/advanced`.
2. Use the function `validate` as follows:

	> Login: `validators.Login.validate(username, password)`
		Register: `validators.Register.validate(username, password, passwordRepeat, email)`
	
	where `validators` is the imported object.
