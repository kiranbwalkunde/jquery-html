function Employee(name, city, state, country, salary) {
  this.name = name;
  this.city = city;
  this.state = state;
  this.country = country;
  this.salary = salary;
}

function ListOfEmployees(employee) {
  this.employees = employee;
  self = this;
  this.showEmployees = function (emps) {
    var element = document.getElementById('component-mount');
    element.innerHTML = '';
    console.log('The Element is ', element);
    var lengthOfEmps = emps.length;
    for (var index = 0; index < lengthOfEmps; index ++) {
      var emp = emps[index];
      var child = document.createElement('div');
      child.className='emp-root';
      this.appendEmployeeHtml(child, emp);
      element.appendChild(child);
    }
  };
  this.appendEmployeeHtml= function(element, emp) {

    // Create Name of Emp.
    var name = document.createElement('div');
    name.className = 'emp name text-center';
    name.innerHTML = emp.name;
    element.appendChild(name);

    // Create City Element.
    var city = document.createElement('div');
    city.className='emp city';
    city.innerHTML = emp.city;
    element.appendChild(city);

    // Create Employee State.
    var state = document.createElement('div');
    state.className='emp state';
    state.innerHTML = emp.state;
    element.appendChild(state);

    // Create Employee Country;
    var country = document.createElement('div');
    country.className = 'emp country';
    country.innerHTML = emp.country;
    element.appendChild(country);

    // Create Employee Salary.
    var salary = document.createElement('div');
    salary.className='emp salary';
    salary.innerHTML = emp.salary;
    element.appendChild(salary);
  };
  this.addOptions = function() {
    var element = document.getElementById('dropdown-emp');

    var option0 = document.createElement('option');
    option0.innerHTML = 'Select Option';
    option0.setAttribute('title', 'Select Option');
    element.appendChild(option0);

    var option1 = document.createElement('option');
    option1.innerHTML = 'Print employee’s details in tabular format having salary more than 500000 in ascending order.';
    option1.setAttribute('title', 'Print employee’s details in tabular format having salary more than 500000 in ascending order.');
    option1.onclick=this.printSalariesInAscendingOrder;
    element.appendChild(option1);

    var option2 = document.createElement('option');
    option2.innerHTML = 'Print salary per month for each employee in tabular format.';
    option2.setAttribute('title', 'Print salary per month for each employee in tabular format.');
    option2.onclick=this.showSalaryPerMonth;
    element.appendChild(option2);

    var option3 = document.createElement('option');
    option3.innerHTML = 'Print number of employee in each city in tabular format.';
    option3.setAttribute('title', 'Print number of employee in each city in tabular format.');
    option3.onclick=this.showNumberOfEmpsPerCity;
    element.appendChild(option3);

    var option4 = document.createElement('option');
    option4.innerHTML = 'Print top 2 salary for each city in tabular format showing employee name, city, state, salary.';
    option4.setAttribute('title', 'Print top 2 salary for each city in tabular format showing employee name, city, state, salary.');
    option4.onclick=this.showTopTwoSalariesOfEmps;
    element.appendChild(option4);

  };
  this.printSalariesInAscendingOrder = function(){
    console.log('The Print Button has been clicked.');
    var emps = self.employees.filter(function(item){
      return item.salary > 500000;
    }).sort(function(item1, item2) {
      return item1.salary > item2.salary;
    });
    self.showEmployees(emps);
  };
  this.showSalaryPerMonth = function(){
    var dummyEmp = [];
    self.employees.forEach(function(item){
      var newItem = Object.create(item);
      newItem.salary = newItem.salary / 12;
      dummyEmp.push(newItem);
    });
    self.showEmployees(dummyEmp);
  };
  this.showNumberOfEmpsPerCity = function() {
    var resultObject = {};
    self.employees.map(function(emp){
      var city = emp.city;
      if (!resultObject[city]) {
        resultObject[city] = [emp];
      } else {
        resultObject[city].push(emp);
      }
    });

    var keys = Object.keys(resultObject);
    var element = document.getElementById('component-mount');
    element.innerHTML = '';
    for (var index = 0; index < keys.length; index ++) {
      var keyString = keys[index];
      var empArray = resultObject[keyString];
      var heading = document.createElement('h6');
      heading.innerHTML='For City :' + keyString + ', Employees are :' + empArray.length;
      element.appendChild(heading);
      for (var keyIndex = 0; keyIndex < empArray.length; keyIndex ++) {
        var currentEmp = empArray[keyIndex];
        var item = document.createElement('div');
        item.className='emp-root';
        self.appendEmployeeHtml(item, currentEmp);
        element.appendChild(item);
      }
    }

  };
  this.showTopTwoSalariesOfEmps = function() {
    // Sort the Employees per City.
    self.employees.sort(function(item1, item2){
      if (item1.city === item2.city) {
         var result = item1.salary >= item2.salary ? 0 : 1;
        return result;
      } else {
        return item1.city < item2.city;
      }
    });

    var resultObject = {};
    self.employees.map(function(emp){
      var city = emp.city;
      if (!resultObject[city]) {
        resultObject[city] = [emp];
      } else {
        resultObject[city].push(emp);
      }
    });

    var keys = Object.keys(resultObject);
    var values = [];
    for (var index = 0; index < keys.length; index ++) {
      var keyString = keys[index];
      var empArray = resultObject[keyString];
      console.log('\nFor City :', keyString, ' with no. of Employees are :', empArray.length);
      for (var keyIndex = 0; keyIndex < 2; keyIndex ++) {
        var currentEmp = empArray[keyIndex];
        values.push(currentEmp);
      }
    }
    self.showEmployees(values);
  }
}

var employees = [
	new Employee('A', 'Mumbai', 'Maharashtra', 'India', 250000),
	new Employee('B','Chennai','Bengal','India',550000),
	new Employee('C','Pune','Maharashtra','India',500000),
	new Employee('D','Mumbai','Maharashtra','India',1200000),
	new Employee('E','Pune','UtterPradesh','India',1100000),
	new Employee('F','Chennai','Tamilnadu','India',400000),
	new Employee('G','Mumbai','Tamilnadu','India',500400),
	new Employee('H','Pune','UtterPradesh','India',259000),
	new Employee('I','Kolhapur','Maharashtra','India',213000),
	new Employee('J','Kolhapur','Maharashtra','India',456666)
];

var listOfEmpl = new ListOfEmployees(employees);
listOfEmpl.showEmployees(listOfEmpl.employees);
listOfEmpl.addOptions();