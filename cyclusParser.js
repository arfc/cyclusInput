input = document.getElementById('input');
output = document.getElementById('testOutput');
var fileContent, f, r,outputString;

function readFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
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