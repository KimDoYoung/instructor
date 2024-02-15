"use strict";
const awk = (function(){
    var srcArray  = [];
    var format = undefined;
    var FS = undefined; // "\t";
    var LS = undefined; // "\n";


    var parse =  function (lineObject, lineNo){
      var toProperty = function(columnName){
        if(columnName === null || columnName === undefined ) return '';
        var ss = columnName.split('_'), r = '';
        for(var i=0; i < ss.length; i++){
          if( i === 0){
              r += ss[i].toLowerCase();
          }else {
              r += ss[i].substring(0, 1).toUpperCase() + ss[i].substring(1).toLowerCase();
          }
        }
        return r;
      }  
  

        var format = lineObject.format;
        var array = lineObject.array;
        var FS = lineObject.FS;
        console.log(array);
        debugger;
        var r = format;
        for(var i=1; i <= array.length ; i++){
          var re = new RegExp("\\$" +i, 'g');
          var v = array[i-1].trim();
          var p = toProperty(array[0]);
           r = r.replace(/\$\#/gi, lineNo).replace(re, v).replace(/\$P/,p)
        }
        var re = new RegExp("\\$0");
        r = r.replace(re, array.join(FS));
        
        return r;
      }
      var pad = function(str, len, chr, leftJustify){
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding  + str;
      }      
      var fixPosition = function(src){
        var maxLen = [];
        src.split('\n').forEach(function(line){
          var fields = line.split('^');
          for(var i=0; i < fields.length; i++){
            if(!maxLen[i]){
              maxLen[i] = Math.max(-1, ((fields[i])).trim().length);
            } else {
              maxLen[i] = Math.max(maxLen[i], ((fields[i])).trim().length);
            }
          }
        });
        var r = '';
        src.split('\n').forEach(function(line){
          var fields = line.split('^');
          for(var i=0; i < fields.length; i++){
            r += pad((fields[i]).trim(), maxLen[i] + 1, ' ', true);
          }
          r += '\n';
        });
        return r.replace(/\s\s*$/, '');
      }
          
      var run = function (){
          var r = [];
          var lineNo=0;
          srcArray.forEach(function(a){
            var o = {
                format : format,
                FS : FS,
                array : a
            };
            r.push( parse(o, ++lineNo) );
          });
          var s = r.join("\n");
          if(format.indexOf("^")>-1){
              return fixPosition(s);
          }
          return s;
      }
      return {
          setSource : function(src){
            srcArray  = [];
            debugger;
            var lines = src.split(LS);
            let i = 1;
            lines.forEach(function(line){
                console.log(line);
                var a = line.split(FS);
                console.log(a);
                srcArray.push(a);
            });
          },
          setFormat : function(f) {
              format = f;
          },
          setFS : function(fs){
            if(fs === "TAB") {
              FS = "\t";
            }else{
              FS = fs;
            }
            // FS = fs;
            // FS = fs.charCodeAt(0)
            // FS = fs.fromChar
          },
          setLS : function(ls) {
            // LS = ls;
            // LS = ls.charCodeAt();
            if(ls === 'CR'){
              LS = "\n";
            }else{
              LS = ls;
            }
          },
          run :  run
      }  
})();
module.exports = awk;