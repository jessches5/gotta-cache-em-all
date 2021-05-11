function getCharImage(pokecharID) {
    var charImageStubURL = "https://pokeres.bastionbot.org/images/pokemon/";
    var charImageURL = charImageStubURL + pokecharID + ".png";
  
    d3.select("#character-image")
      .append("img")
      .attr("src", charImageURL)
      .attr("width", "40%")
      .attr("id", "char-image");
  }
  
  //--------------get character description from API--------------//
  function getCharDesc(pokecharID) {
    var charDescStubURL = "https://pokeapi.co/api/v2/ability/";
    var charDescURL = charDescStubURL + pokecharID;
  
    d3.json(charDescURL)
      .then((data) => {
        var charDesc = data.effect_entries[1].effect;
        d3.select('#character-description')
          .append('div')
          .attr('id', 'char-desc')
          .append('p')
          .text(charDesc);
      })
      .catch(function (error) {
        var charDesc = "No description found for this Pokemon character.";
        d3.select('#character-description')
          .append('div')
          .attr('id', 'char-desc')
          .append('p')
          .text(charDesc);
      });  
  }
  
  function init() {
    var queryUrl = "/api/v1/names";
    var selector = d3.select("#selDataset");
  
    selector.html("");
  
    d3.json(queryUrl).then((data) => {
      var pokeList = data;
      var pokeAlpha = pokeList.sort();
      var pokeNames = [];
  
      for (var i = 0; i < pokeAlpha.length; i++) {
        var pokeID = pokeAlpha[i][0];
        var pokeName = pokeAlpha[i][1];
        pokeNames.push(pokeName + "-" + pokeID);
      }
  
      pokeNames.sort();
  
      pokeNames.forEach((pokemon) => {
        selector.append("option").text(pokemon).property("value", pokemon);
      });
  
      var firstID = 190
      getCharDesc(firstID);
      getCharImage(firstID);
    });
  }
  
  function optionChanged(pokecharID) {
    var dropdownMenu = d3.select("#selDataset");
    var pokechar_nameID = dropdownMenu.property("value");
    var values = pokechar_nameID.split("-");
    var pokecharID = values[1];
  
    //remove previous selection before rebuilding page
    var img = d3.select("#char-image");
    img.remove();
  
    var p = d3.select("#char-desc");
    p.remove();
  
    //update character image to match new selection
    getCharImage(pokecharID);
    getCharDesc(pokecharID);
  }
  
  init();
  