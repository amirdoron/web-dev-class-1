// expose module as a object
// User should instantiate with a parameter (similar to ctor)
module.exports = function(app)
{
	// Simulate PersonDAL object
	var personDB = CreatePersons();
	CreateRestApi(app);

	// Alternative for the above.
	// Class like example.
	// A Person type that requires 3 parameters during creation
	// This is a function (not a Person object yet).
	// You'll need to use new Person(...) for creating a Person instance.
	function Person(id, name, gender)
	{
		// Person's data members
		this.Id = id;
		this.Name = name;
		this.Gender = gender;

		// Person's method
		this.ToString = function ()
		{
			return "Person ID " + this.Id + " Name " + this.Name + " Gender " + this.Gender;
		}
	}

	function CreatePersons()
	{
		var persons =	[
			new Person(1, "person1", "Male"),
			new Person(2, "person2", "Female"),
			new Person(3, "person3", "Male")
		];

		return persons;
	}

	function CreateRestApi(app)
	{
		// define person REST API
		// define a REST route for getting a Person
		// to access this route you can call from web-browser to http://localhost:8000/person/get
		app.get('/person/get/:id', function (req, res)
		{
			// create a list of Persons with ID that match the requested id
			// consider moving such logic to an object that represents PersonDB e.g. PersonDAL
			var foundPersons = personDB.filter(function(person){
				return person.Id == req.params.id;
			});

			if(foundPersons[0] != null)
			{
				// use Person method
				console.log("sending " + foundPersons[0].ToString());

				// sending a javascript object is automatically serialized to a JSON
				res.send(foundPersons[0]);
			}
			else
			{
				res.send("Person " + req.params.id + " not found");
			}
		});

		// REST API to retrieve all persons in one shot
		app.get('/person/get', function(req, res)
		{
			res.send(personDB);
		});

		// define person REST API to add a new person into the DB
		app.post('/person/add', function(req, res)
		{
			var newPerson = new Person(req.body.Id, req.body.Name, req.body.Gender);
			// insert only if not exist
			var personNotExist = !IsPersonExist(personDB, newPerson);
			if(personNotExist)
			{
				console.log("adding new Person " + newPerson.ToString() );
				personDB.push(newPerson);
			}

			res.send(200);

			function IsPersonExist(arr, personToFind)
			{
				var found = arr.filter(function(person){
					return person.Id == personToFind.Id;
				});

				return found.length > 0;
			}
		});
	}

	// return an object that contains the public API related to this service
	return {
		// Each method may access other data members and functions that are
		// defined in this closure (you may consider everything that is external
		// these methods as private elements of this closure i.e. module
		SomeMethod1: function ()
		{

		},
		SomeMethod2: function ()
		{

		}
	};
}