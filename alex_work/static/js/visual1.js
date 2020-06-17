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
        id: 'mapbox/light-v10',
        accessToken: "pk.eyJ1IjoiYWx4cHJ5IiwiYSI6ImNrYW9saHZjNDA0Z3ozMG82cHZpcm0xbm8ifQ.yM3ZhZhGelQpcJBz0wtaiw"
    }).addTo(myMap);

    

  for (var i = 0; i < arrestedH.length; i++) {
    var location = arrestedH[i];
        L.circle((location.coordinates),{
          color: "green",
          fillColor: "green",
          fillOpacity: 0.50,
          radius: 50})
        .addTo(myMap).bindPopup("<h3>Age: "+ location.age +"</h3><h3>Sex: " + location.sex +
        "</h3><hr><h3>Arrest: " + location.arrest + "</h3><hr><h3>Race:" + location.race + "</h3>");
  }
  for (var i = 0; i < arrestedB.length; i++) {
    var location = arrestedB[i];
        L.circle((location.coordinates),{
          color: "orange",
          fillColor: "orange",
          fillOpacity: 0.50,
          radius: 50})
          .addTo(myMap).bindPopup("<h3>Age: "+ location.age +"</h3><h3>Sex: " + location.sex +
          "</h3><hr><h3>Arrest: " + location.arrest + "</h3><hr><h3>Race:" + location.race + "</h3>");
      }
  for (var i = 0; i < arrestedW.length; i++) {
    var location = arrestedW[i];
        L.circle((location.coordinates),{
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.50,
          radius: 50})
          .addTo(myMap).bindPopup("<h3>Age: "+ location.age +"</h3><h3>Sex: " + location.sex +
          "</h3><hr><h3>Arrest: " + location.arrest + "</h3><hr><h3>Race:" + location.race + "</h3>");
  }
  for (var i = 0; i < arrestedA.length; i++) {
    var location = arrestedA[i];
        L.circle((location.coordinates),{
          color: "pink",
          fillColor: "pink",
          fillOpacity: 0.50,
          radius: 50})
          .addTo(myMap).bindPopup("<h3>Age: "+ location.age +"</h3><h3>Sex: " + location.sex +
          "</h3><hr><h3>Arrest: " + location.arrest + "</h3><hr><h3>Race:" + location.race + "</h3>");
  }

});