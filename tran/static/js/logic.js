var url = "http://127.0.0.1:5000/read-data";

data = d3.json(url, function (json) {
  
  console.log(json)})
  
var filteredData = data.filter(gender --> gender.subject_sex === "male")
console.log(filteredData)


