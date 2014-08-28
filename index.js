require('shellscript').globalize();

//hard-coded HR ips. We will add ips to this as we cast our votes from them
var offLimitIps = ['173.247.199.46', '199.87.82.66', '50.250.208.114'];


var checkIfICanVote = function(){
  
  var hackerNewsLink = 'https://news.ycombinator.com/';

  //a call to this website will give us a text version of our public facing ip.
  //it has a trailing white space we have to get rid of
  var publicIp = $('curl icanhazip.com -s').slice(0, -1);

  //if we do not have wifi
  if( publicIp.length === 0 ){
    return;
  }


  var canVote = true;
  for(var i = 0; i < offLimitIps.length; i++){
    var offLimitIp = offLimitIps[i];
    if( offLimitIp === publicIp ){
      canVote = false;
      break;
    }
  }

  if( canVote ){
    offLimitIps.push(publicIp);
    shell('open ' + hackerNewsLink);
  }

};

module.exports = function(){
  setInterval(checkIfICanVote, 1000);
}();