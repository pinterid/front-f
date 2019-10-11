    //console.log(keyMatch(commits,/^2018/))

    // Returns an object containing only those objects whose key matched the regex
var keyMatch = function(o,r){
    var no = {};
  
    Object.keys(o).forEach(function(k){
        if(r.test(k)){
          no[k] = o
        }
    });
  
    return no
  };