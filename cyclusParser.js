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
///////////////////////////////////////////////////////////////////////


//@author Daniel Chiu
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

function setOutput(outSet){
  xmlCheck("duration",500);
  //console.log(fileContent);
  //output.innerHTML = outSet; 
}


function xmlCheck(tag_name, value){
  //Check if it is in json format. Convert to xml if it is
  if (input.split('.').pop() == ".json"){
    fileContent=json2xml(fileContent);
  }
  //Parse into javscript object and check value of tags
  parser = new DOMParser();
  xmlOutput = parser.parseFromString(fileContent,"text/xml");
  if(xmlOutput.getElementsByTagName(tag_name)[0].childNodes[0].nodeValue == value) {
    output.innerHTML = "Correct. Values match";
    console.log("Values match");
  } 
  else{
    output.innerHTML= "Incorrect. Try Again";
  }
}

