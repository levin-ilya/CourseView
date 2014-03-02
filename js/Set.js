// Credit by: http://www.javascriptexamples.org/2011/01/17/how-to-implement-a-set-in-javascript/
var Set = function() {}
Set.prototype.add = function(o) { this[o] = true; }
Set.prototype.remove = function(o) { delete this[o]; }