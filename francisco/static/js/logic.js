var url = "http://127.0.0.1:5000/read-data";

d3.json(url, function (json) {
  
  console.log(json);
  
  var arrests = []
  
  var noArrests = []
  
  for (var i = 0; i < json.length; i++) {
  
      if (json[i].arrest_made == true) {
        arrests.push(json[i].arrest_made);
      }
        else {
          noArrests.push(json[i].arrest_made);
        }
      };
  
  var totalArrests = arrests.length
  
  var free = noArrests.length
  
  console.log(totalArrests);
  
  console.log(free);

});

