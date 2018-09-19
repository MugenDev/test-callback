/*
This is an example of how JavaScript callbacks work.
*/

// x parameter is expecting a number.
function callMain(x) {
	// Variable in the scope of callMain()'s body.
	var callMainScopeVariable;

	// callSub() function is called, and the "x" value is passed into its first parameter "z".
	// An anonymous function "function(err, res) {...}" is passed into callSub()'s second parameter "cb".
	callSub(x, function (err, res) {
		console.log("=================================");
		console.log("==== Beginning Callback Test ====");
		console.log("=================================");
		console.log("Error:", err);
		console.log("Result:", res);
		
		// In order to retrieve the value of res into callMain()'s scope, set it to a variable defined in callMain().
		callMainScopeVariable = res;
	});

	// Should only show a value on success, and null for errors.
	// The value of res is set to callMainScopeVariable, therefore it can be accessed outside in callMain()'s body.
	console.log("callMainScopeVariable:", callMainScopeVariable);
}

// z parameter is expecting a number (i.e. 1, 2 and 9).
// cb parameter is expecting a function to be passed in, and the function SHOULD have two parameters.
function callSub(z, cb) {
	switch (z) {
		case 1:
			callError(cb);
			break;
		case 2:
			callSuccess(cb);
			break;
		default:
			cb("You passed in an unknown value!", null);
	}
}

function callError(cb) {
	// We don't implement anything into the cb function here, but we invoke it.
	// We only know that we need to pass a value into each of the two parameters.
	// When we call cb(value1, value2) here, we're actually calling function(err, res) {...} back in callMain().

	// When cb() here is called, it is actually invoking the original anonymous function by REFERENCE
	// and the two parameter values that are passed in here are going to be handled in callMain()'s body!

	// cb(value1, value2) here is called.
	// The cb() call bubbles back up to callSub(), carrying value1 and value2 back up the chain.
	// The cb() call further bubbles back up to callMain() with value1 and value2.
	// In callSub()'s second parameter "cb", function(err, res) {...} can finally begin its process.
	// err has received the text value1 "This is an error!", and res received the null value2.
	// Several console.log() functions will write out the values of err and res inside {...}.

	// Keep in mind that err and res remains in the scope of the anonymous function and not callMain()'s body,
	// so you'll have to do various things to set variables of parent or global scope to access err and res.
	cb("This is an error!", null);
}

function callSuccess(cb) {
	// Same as noted in callError() function, except that err is null and res is "This is a success!"
	// Now, imagine several database access routines happen here and builds a JSON object.
	// Instead of passing back a simple text like "This is a success!", we can also pass back the JSON object with business data!
	cb(null, "This is a success!");
}

// After the functions have been defined above, call the initial function "callMain()" and pass into its parameter a numeric value.
// There are two acceptable numeric values implemented in "callSub()", and that is 1 for error, and 2 for success.
// Any other numbers or objects passed into callSub()'s parameter will invoke the callback reference sooner with an error message.
callMain(1); // Error.
callMain(2); // Success.
callMain(9); // Erroneous value.