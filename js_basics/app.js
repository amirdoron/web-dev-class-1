
console.log("hello world");

// a way to create a js object
// This is a hard-coded object instance.
// In case we'll need another instance with different value in its data members
// we'll need to use copy paste (not so good)
var shirhanPerson =
{
	// data members
	Id : 4321,
	Name : "Shirhan the Tiger",
	Gender : "Male",

	// method
	ToString : function ()
	{
		return "Person ID " + this.Id + " Name " + this.Name + " Gender " + this.Gender;
	}
};

// Alternative for the above.
// Class like example.
// A Person type that requires 3 parameters during creation
// This is a function (not a Person object yet).
// You'll need to use new Person(...) for creating a Person instance.
function Person(id, name, gender)
{
	// Person's data members
	this.mId = id;
	this.mName = name;
	this.mGender = gender;

	// Person's method
  this.ToString = function ()
  {
    return "Person ID " + this.mId + " Name " + this.mName + " Gender " + this.mGender;
  }
}

var p1 = new Person(1, "person 1", "Male");
var p2 = new Person(2, "person 2", "Female");

console.log("Person p1 " + p1.ToString());
console.log("Person p1 " + p2.ToString());