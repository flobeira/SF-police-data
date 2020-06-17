var url = "http://127.0.0.1:5000/mongo2-data";
var results = []

d3.json(url ,function(data) {
  // Loop through mongodb data; combine 'lat'/'lng' columns into coordinates; retrieve other data.
  data.forEach(element =>  {
        var result = {}
        result["coordinates"] = [element.lat, element.lng]
        result["age"] = element.subject_age
        result["sex"] = element.subject_sex
        result["race"] = element.subject_race
        result["arrest"] = element.arrest_made
        results.push(result);
  });
    // create function to return data on hispanic individuals only.
    function hispanic(person) {
      return person.race == "hispanic";
  }
    function black(person) {
      return person.race == "black";
}
    function white(person) {
      return person.race == "white";
}
    function asian(person) {
      return person.race == "asian/pacific islander";
}
  var hispanicData = results.filter(hispanic);
    console.log(hispanicData);
  var blackData = results.filter(black);
    console.log(blackData);
  var whiteData = results.filter(white);
    console.log(whiteData);
  var asianData = results.filter(asian)
  
  // create function to return data on arrested hispanic individuals only.
  function arrestedHispanic(person) {
    return person.arrest == true;
  }
  function arrestedBlack(person) {
    return person.arrest == true;
  }

  function arrestedWhite(person) {
    return person.arrest == true;
  }

  function arrestedAsian(person) {
    return person.arrest == true;
  }
  // Pass through results array and store hispanic data in variable
  var arrestedH = hispanicData.filter(arrestedHispanic);

  var arrestedB = blackData.filter(arrestedBlack);

  var arrestedW = whiteData.filter(arrestedWhite);

  var arrestedA = asianData.filter(arrestedAsian);

  var myMap = L.map("map", {
      center: [37.76, -122.431297],
      zoom: 13
  });

 

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/dark-v10",
      accessToken: API_KEY
    }).addTo(myMap);

    

  for (var i = 0; i < arrestedH.length; i++) {
    var location1 = arrestedH[i];
        L.circle((location1.coordinates),{
          color: "green",
          fillColor: "green",
          fillOpacity: 0.50,
          radius: 50})
        .addTo(myMap).bindPopup("<h3>Age: "+ location1.age +"</h3><h3>Sex: " + location1.sex +
        "</h3><hr><h3>Arrest: " + location1.arrest + "</h3><hr><h3>Race:" + location1.race + "</h3>");
  }
  for (var i = 0; i < arrestedB.length; i++) {
    var location2 = arrestedB[i];
        L.circle((location2.coordinates),{
          color: "orange",
          fillColor: "orange",
          fillOpacity: 0.50,
          radius: 50})
          .addTo(myMap).bindPopup("<h3>Age: "+ location2.age +"</h3><h3>Sex: " + location2.sex +
          "</h3><hr><h3>Arrest: " + location2.arrest + "</h3><hr><h3>Race:" + location2.race + "</h3>");
      }
  for (var i = 0; i < arrestedW.length; i++) {
    var location3 = arrestedW[i];
        L.circle((location3.coordinates),{
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.50,
          radius: 50})
          .addTo(myMap).bindPopup("<h3>Age: "+ location3.age +"</h3><h3>Sex: " + location3.sex +
          "</h3><hr><h3>Arrest: " + location3.arrest + "</h3><hr><h3>Race:" + location3.race + "</h3>");
  }
  for (var i = 0; i < arrestedA.length; i++) {
    var location4 = arrestedA[i];
        L.circle((location4.coordinates),{
          color: "magenta",
          fillColor: "magenta",
          fillOpacity: 0.50,
          radius: 50})
          .addTo(myMap).bindPopup("<h3>Age: "+ location4.age +"</h3><h3>Sex: " + location4.sex +
          "</h3><hr><h3>Arrest: " + location4.arrest + "</h3><hr><h3>Race:" + location4.race + "</h3>");
  }

  // Create a legend to display information about our map
var info = L.control({
  position: "topright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div","legend");
  return div;
};
// Add the info legend to the map
info.addTo(myMap);

updateLegend(location1,location2,location3,location4);
});

// Update the legend's innerHTML with the last updated time and station count
function updateLegend(location1,location2,location3,location4) {
  document.querySelector(".legend").innerHTML = [
    "<p class='hsp'>" + location1.race + "</p>",
    "<p class='bl'> " + location2.race + "</p>",
    "<p class='wh'>" + location3.race + "</p>",
    "<p class='asn'>" + location4.race+ "</p>"
  ].join("");
}