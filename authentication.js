module.exports = {
	label: "Connect to Monday",
	mock_input: {
		api_key: "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjkwOTIyMTYxLCJ1aWQiOjE2MDk2MzQ5LCJpYWQiOiIyMDIwLTExLTE1VDAzOjQzOjEwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.-5MwqPHctI0Wo94aXX5AahuJJAHk3zGvicrlHD7lfbM"
	},
	validate: function (input, output) {
		// validate function will used for validating user input while adding connection for this connector
		// credential will be available in input.auth object
		// var apikey = input.auth.api_key;
		// callback pattern
		// output(error, success)
		output(null, true);
	}
}