// FileReader API code to read zip of the credentials, based on http://stackoverflow.com/a/13709663
var reader; //GLOBAL File Reader object for demo purpose only

    /**
     * Check for the various File API support.
     */
    function checkFileAPI() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
            return true; 
        } else {
            alert('The File APIs are not fully supported by your browser. Fallback required.');
            return false;
        }
    }

    /**
     * read text input
     */
    function readText(filePath) {
        var output = ""; //placeholder for text output
        if(filePath.files && filePath.files[0]) {           
            reader.onload = function (e) {
                output = e.target.result;
                getkeys(output);
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }//end if html5 filelist support
        else { //this is where you could fallback to Java Applet, Flash or similar
            return false;
        }       
        return true;
    }   



// Function based on http://stackoverflow.com/a/3354277
// Given the contents of ec2rc.sh, extract the EC2 credentials and insert 
function getkeys(txt) {
  var results = [];
  var reaccess = /EC2_ACCESS_KEY=(.*)\n/g;
  var resecret = /EC2_SECRET_KEY=(.*)\n/g;
  var access_element = document.getElementById('id_access_key');
  var secret_element = document.getElementById('id_secret_key');

  // add first match, the actual matched string in [1]
  results.push(reaccess.exec(txt)[1]);
  results.push(resecret.exec(txt)[1]);

  // results should be [access,secret]
  //return results;

  access_element.value = results[0];
  secret_element.value = results[1];
}



