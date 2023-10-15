if (!String.format) {
	String.prototype.format = function() {
	    var formatted = this, i = 0;
	    while (/%s/.test(formatted))
	    	formatted = formatted.replace("%s", arguments[i++]);
	    return formatted;
	}
}
//console.log("%s + %s = %s".format(4, 5, 9));
if (!String.hashCode) {
	String.prototype.hashCode = function() {
	  var hash = 0,
	    i, chr;
	  if (this.length === 0) return hash;
	  for (i = 0; i < this.length; i++) {
	    chr = this.charCodeAt(i);
	    hash = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
	  }
	  return hash;
	}
}