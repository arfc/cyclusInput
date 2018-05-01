input = document.getElementById('input');
output = document.getElementById('testOutput');
var fileContent, f, r,outputString;

/*  This work is licensed under Creative Commons GNU LGPL License.

  License: http://creativecommons.org/licenses/LGPL/2.1/
   Version: 0.9
  Author:  Stefan Goessner/2006
  Web:     http://goessner.net/ 
*/
function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
 }
///////////////////////////////////////////////////////////////////////


//@author Daniel Chiu
function makeOutputText(text){
  var outputEle= document.createElement("P");
  var outputText= document.createTextNode(text);
  outputEle.appendChild(outputText);
  document.getElementById("testOutput").append(outputEle);
  console.log("made output text");
}

function readFile(evt) {
    f = evt.target.files[0]; 
    if (f) {
      r = new FileReader();
      fileContent = r.readAsText(f);
      r.onload = function(e) { 
        fileContent = e.target.result;
      }
    } else { 
      alert("Failed to load file");
    }
  }

input.addEventListener('change',readFile,false);

function resetOutputText(){
  console.log("resetted");
  $("#testOutput").empty();
}

function checkFileType(filename){
 if (filename.split('.').pop() == ".json"){
    fileContent=json2xml(fileContent);
  }
}

function xmlCheck(tag_name, value){
  //Check if it is in json format. Convert to xml if it is
 try{
    //Parse into javscript object and check value of tags
    parser = new DOMParser();
    xmlOutput = parser.parseFromString(fileContent,"text/xml");
    outputValue = xmlOutput.getElementsByTagName(tag_name)[0].childNodes[0].nodeValue;
    console.log(xmlOutput.getElementsByTagName(tag_name)[0].childNodes[0].nodeValue);
    if( outputValue == value) {
      output.innerHTML = "Correct. Values match";
      console.log("Values match");
    } 
    else{
      var text= "Exptected " + value + " for " + tag_name + " but instead found value " + outputValue ;
      var outputEle= document.createElement("P");
      var outputText= document.createTextNode(text);
      outputEle.appendChild(outputText);
      document.getElementById("testOutput").append(outputEle);
    }
  }
  catch(error){
      var text= tag_name + " not found"
      var outputEle= document.createElement("P");
      var outputText= document.createTextNode(text);
      outputEle.appendChild(outputText);
      document.getElementById("testOutput").append(outputEle);
  }
}

//check control
function xmlControlCheck(duration,month,year,mode){
  //Check if it is in json format. Convert to xml if it is
 try{
    //Parse into javscript object and check value of tags
    parser = new DOMParser();
    xmlOutput = parser.parseFromString(fileContent,"text/xml");
    controlValue =xmlOutput.getElementsByTagName("control")[0];
    durationValue = controlValue.getElementsByTagName("duration")[0].childNodes[0].nodeValue;
    startmonth = controlValue.getElementsByTagName("startmonth")[0].childNodes[0].nodeValue;
    startyear = controlValue.getElementsByTagName("startyear")[0].childNodes[0].nodeValue;
    console.log(xmlOutput.getElementsByTagName("control")[0]);
    //duration check
    if( duration == duration) {
      console.log("Duration match");
    } 
    else{
      var text= "Exptected " + duration + " for duration but instead found value " + outputValue ;
      var outputEle= document.createElement("P");
      var outputText= document.createTextNode(text);
      outputEle.appendChild(outputText);
      document.getElementById("testOutput").append(outputEle);
    }
    //if start month and date doesnt really matter so only check if correct mode
    if (mode == 1){
      if( startmonth == month) {
        console.log("Month match");
      } 
      else{
        var text= "Exptected " + month + " for start month but instead found value " + startmonth ;
        var outputEle= document.createElement("P");
        var outputText= document.createTextNode(text);
        outputEle.appendChild(outputText);
        document.getElementById("testOutput").append(outputEle);
      }
      if( year == startyear) {
        console.log("Year match");
      } 
      else{
        var text= "Exptected " + year + " for start year but instead found value " + startmonth ;
        var outputEle= document.createElement("P");
        var outputText= document.createTextNode(text);
        outputEle.appendChild(outputText);
        document.getElementById("testOutput").append(outputEle);
      }
    }
  }
  catch(error){
      var text= "Control values not found or properly set up"
      var outputEle= document.createElement("P");
      var outputText= document.createTextNode(text);
      outputEle.appendChild(outputText);
      document.getElementById("testOutput").append(outputEle);
  }
}
//check archetypes
function xmlArchetypeCheck(archeName){
  parser = new DOMParser();
  xmlOutput = parser.parseFromString(fileContent,"text/xml");
  var text= archeName +" archetype not found"
  archeValue =xmlOutput.getElementsByTagName("archetypes")[0];
  specValue = archeValue.getElementsByTagName("spec");
  console.log(specValue[0].getElementsByTagName("name")[0].childNodes[0].nodeValue);
  for (i=0 ; i < specValue.length ; i++ ){
    nameValue = specValue[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    if (nameValue == archeName){
      text = "Archetype " + archeName+ " is set correctly"
      console.log("Archetype matches")
      return
    }
  }
  makeOutputText(text);
}


//check commodities
function xmlCheckCommodities(name, priority){
  parser = new DOMParser();
  xmlOutput = parser.parseFromString(fileContent,"text/xml");
  commodValue =xmlOutput.getElementsByTagName("commodity");
  console.log(commodValue[0].getElementsByTagName("name")[0]);
  for (i=0; i<commodValue.length ; i++){
    nameValue = commodValue[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    priorityValue = commodValue[i].getElementsByTagName("solution_priority")[0].childNodes[0].nodeValue;
    if(nameValue != name){
      var nameMatch = "Commodity name does not match";
      makeOutputText(nameMatch);
    }
    if(priorityValue != priority){
      var prioMatch = "Commodity priority does not match";
      makeOutputText(priority);
    }
    if (nameValue == name && priorityValue == priority){
      console.log("matches");
      return;
    }   
  }
}
//check facilities

//check region
function xmlCheckRegionEntry(name, prototype, number){
  parser = new DOMParser();
  xmlOutput = parser.parseFromString(fileContent,"text/xml");
  regionValue =xmlOutput.getElementsByTagName("region");
  console.log(regionValue[0].getElementsByTagName("institution"));
  //Check through regions for correct name
  for (i=0 ; i < regionValue.length; i++ ){
    regionNameValue = regionValue[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    if (regionNameValue == name){
      institutionValue = regionValue[0].getElementsByTagName("institution")[0];
      //If correct region check through instutions if there are more than one in that region
      for (instCount = 0 ; instCount < institutionValue.length ; instCount++){
        initialFacilityList = institutionValue[instCount].getElementsByTagName("initialfacilitylist")[0];
        entryValue = initialFacilityList.getElementsByTagName("entry");
        //look through each entry and check if the prototype values and number values match
        for (entryCount = 0; entryCount < entryValue.length; entryCount++){
          prototypeValue = entryValue[entryCount].getElementsByTagName("prototype")[0].childNodes[0].nodeValue;
          numberValue = entryValue[entryCount].getElementsByTagName("number")[0].childNodes[0].nodeValue;
          if (prototypeValue != prototype[entryCount]){
            text = "Expected prototype value" + prototype[entryCount]+ " for region "+ name + " but instead found value: " + prototypeValue;
            makeOutputText(text);
          }

          if (numberValue != number[entryCount]){
            text = "Expected number value" + number[entryCount]+ " for prototype "+ prototype[entryCount]+ " but instead found value: " + numberValue;
            makeOutputText(text);
          }     

        }
      }
    }
  }
  console.log("valid");
}

//check recipe
function xmlCheckRecipe(name,basis,nuclide_id,nuclide_comp){
  parser = new DOMParser();
  xmlOutput = parser.parseFromString(fileContent,"text/xml");
  recipeValue =xmlOutput.getElementsByTagName("recipe");
  //console.log(recipeValue);
  //Go through each recipe and check for the proper name to check
  for (i=0; i<recipeValue.length ; i++){
    nuclideValue = recipeValue[i].getElementsByTagName("nuclide");
    //console.log(recipeValue[0].getElementsByTagName("name")[0].childNodes[0].nodeValue);
    recipeNameValue = recipeValue[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
    recipeBasisValue = recipeValue[i].getElementsByTagName("basis")[0].childNodes[0].nodeValue;
    //Go through each nuclide in that recipe and check correpsonding values in lists
    if (recipeNameValue == name && recipeBasisValue == basis){
      //console.log(nuclide_id[0]);
      for (x=0; x<nuclideValue.length; x++){
        idValue = nuclideValue[x].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        compValue = nuclideValue[x].getElementsByTagName("comp")[0].childNodes[0].nodeValue;
        if (nuclide_id[x] != idValue){
          outText = "Nuclide id " + nuclide_id[x] +" does not match expected id, " + nuclide_id;
          makeOutputText(outText);
        }
        if (nuclide_comp[x] != compValue){
          outText = "Composition value " + nuclide_comp[x] +" does not match expected value, " + nuclide_comp;
          makeOutputText(outText);
        }   
      }
      console.log("valid");
    }
  }
} 

function setOutput(outSet){
  //xmlControlCheck(500,6,2015,0);
  // xmlArchetypeCheck("Ent");
  // xmlCheckCommodities("U-ore",1.0);
  //xmlCheckRecipe("Nat-U","mass",[92235,92238],[.0070002,.9930002]);
  xmlCheckRegionEntry("Nuclandia",["EnrichPlant","ALWR","U mine","NuclearUnderground"],[1,5,1,1]);
}

$(document).ready(function(){
    $("#submitButton").click(function(){
      resetOutputText();
      console.log("form sumbitted");
      setOutput();
    })
})

