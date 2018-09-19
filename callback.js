/*
This is an example of how JavaScript callbacks work.
*/

// x parameter is expecting a number.
function callMain(x) {
	// callSub() function is called, and the x value is passed into its first parameter "z".
	// An anonymous function with two parameters (err, res) is also passed into callSub()'s second parameter "cb".
	callSub(x, function (err, res) {
		console.log("=================================");
		console.log("==== Beginning Callback Test ====");
		console.log("=================================");
		console.log("Error:", err);
		console.log("Result:", res);
	});
}

// z parameter is expecting a number.
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
	// We don't care about implementing anything into the cb function here.
	// We only know that we need to pass in two values into the two parameters.

	// In "callMain()", when "callSub()" was called, an anonymous function was passed into the second parameter.
	// The anonymous function is "function(err, res) {...}",
	// and the {...} implementation happened in that anonymous function as it was getting passed in.

	// When cb here is called, it is actually invoking the original anonymous function by REFERENCE
	// and the two parameter values that are passed in here are going to be handled in callMain()'s body!

	// cb(value, value) here is called.
	// The cb call bubbles back up to callSub() with the (value, value).
	// The cb call further bubbles back up to callMain() where callSub() was invoked.
	// In callSub()'s second parameter "cb", function(err, res) {...} can finally begin its process.
	// err has received the text value "This is an error!", and res received the null value.
	// Several console.log() functions will write out the values of err and res inside {...}.
	cb("This is an error!", null);
}

function callSuccess(cb) {
	// Same as noted in callError() function.
	cb(null, "This is a success!");
}

// After the functions have been defined above, call the initial function "callMain()" and pass into its parameter a numeric value.
// There are two acceptable numeric values implemented in "callSub()", and that is 1 for error, and 2 for success.
// Any other numbers or objects passed into callSub()'s parameter will invoke the callback reference sooner with an error message.
callMain(1); // Error.
callMain(2); // Success.
callMain(9); // Erroneous value.