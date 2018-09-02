/**
 * Query string
 */

function getQueryParam(param) {
  var params = window.location.search.substr(1).split("&");
  for(var i=0; i<params.length; i++) {
      var pair = params[i].split("=");
      if(pair[0] == param){return pair[1];}
  }
  return null;
}
