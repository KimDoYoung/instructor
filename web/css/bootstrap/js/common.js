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
/**
 * AssetEdu의 공통 유틸리티
 * 일부함수에서 jQuery를 사용함
 */

var JuliaUtil = (function(){
    var isString = function (s) {
        return typeof s === 'string';
    };
    var isNumber = function(s){
        return typeof s === 'number';
    }
    var isEmpty = function(e){
            if( Object.prototype.toString.call( e ) === '[object Array]' ) {
                if(e.length === 0) return true;
                return false;
            }
            if( Object.prototype.toString.call( e ) === '[object Object]' ){
                for(var p in e){
                    if(e.hasOwnProperty(p)) {
                        return false;
                    }
                }
                return true;
            }
            if((typeof e) == 'undefined' ) return true;
            switch(e) {
                case "":
                case null:
                case typeof this == "undefined":
                    return true;
                default : 
                    return false;
            }            
    };
    var dateFormat = function (format, date){
        var weekName1 = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
            weekName2 = ["일", "월", "화", "수", "목", "금", "토"],
            d = date,
            zf = function(n,len){
                var zero = '', n = n+'';
                if(n.length >= len) return n;
                for(var i=0; i < (len-n.length);i++) zero+='0';
                return zero+n;
            };
        return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return zf( (d.getFullYear() % 1000), 2);
                case "MM": return zf( (d.getMonth() + 1), 2) ;
                case "dd": return zf( d.getDate(), 2) ;
                case "E": return weekName1[d.getDay()];
                case "e": return weekName2[d.getDay()];
                case "HH": return zf( d.getHours(), 2);
                case "hh": return zf( ((h = d.getHours() % 12) ? h : 12), 2);
                case "mm": return zf( d.getMinutes(), 2);
                case "ss": return zf(  d.getSeconds(), 2) ;
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        }); 
    };
    var diffDays = function (fromDate, toDate) {
        if(!isString(fromDate) || !isString(toDate)) return undefined;
        var fromDate = fromDate.replace(/[-.\/]/gi, ''),// '-'가 있다면 제거
            toDate   = toDate.replace(/[-.\/]/gi, '');
        if(fromDate.length === 8 && toDate.length == 8){
            var date1  = new Date(fromDate.substring(0,4), fromDate.substring(4,6)-1, fromDate.substring(6,8) ),
                date2  = new Date(toDate.substring(0,4), toDate.substring(4,6)-1,toDate.substring(6,8));

            return Math.abs(Math.floor(( date2 - date1 )/86400000));
        }
        return undefined;
    }
    var displayLoading = function(show) {
		if( $("#loading_div").length > 0 ){
			;
		}else{
			var doc = document.documentElement;
			var body = document.body;
			var top = (doc.clientHeight / 2 ) + (doc.scrollTop + body.scrollTop)-190;
			var left = (doc.clientWidth / 2 );
			var div_html = `<div id='loading_div' style='display:none;position:absolute;top:${top}px;left:${left}px'><img src='/image/loading.gif'></div>`;
			$("body").append(div_html);
		} 
		if( show ){
			$("#loading_div").show();
		}else{
			$("#loading_div").hide();
		}
	}
    var displayComma = function (str){
        var str = str;
        if(isNumber(str)){
            str = str + '';
        }
        var chars = str.split("").reverse();
        var reChars = [];

        for (var i = 0; chars.length > i; i++){
             if( i != 0 &&( ( i+1 ) % 3) == 1){
                reChars[reChars.length] = ",";
             }
            reChars[reChars.length] = chars[i];
        }

        return reChars.reverse().join("");
    };
    var extendsOptions = function(options, defaults){
        var options = options || {},
            defaults  = defaults || {},
            settings = {};
        for(var opt in options){
            if(options.hasOwnProperty(opt)){
             settings[opt] = options[opt];
            }
        }
        for(var opt in defaults){
            if(defaults.hasOwnProperty(opt) && !options.hasOwnProperty(opt)){
                settings[opt] = defaults[opt];
            }
        }
        return settings;
    }
    var Ajax = function(url, data, options){
        var options = extendsOptions(options, 
            {
                method:'GET', processData: true, contentType: 'application/json;charset=utf-8', dataType:'json',
                beforeSend : ()=> { 
					console.log('beforeSend...');
                },
                success : (response, status, xhr) => {
					console.log(`status:${status}, response: ${response}, xhr:${xhr}`);
				},
                error : (request, status, error) => {
					console.error(`code:${request.status}, message: ${request.responseText}, error: ${error}`);
				},
                complete: (xhr, status)=>{
					console.log(`xhr:${xhr}, status:${status}`);
				}
            }
        );
        //console.log(data);
        //console.log(options);
        //data = JSON.stringify(data);
        $.ajax({
            type	: options.method, //요청 메소드 타입
            url		: url, //요청 경로
            async : true, //비동기 여부
            data  : data, //요청 시 포함되어질 데이터
            processData : true, //데이터를 컨텐트 타입에 맞게 변환 여부
            cache : options.processData, //캐시 여부
            contentType : options.contentType, //요청 컨텐트 타입 "application/x-www-form-urlencoded; charset=UTF-8"
            dataType	: options.dataType, //응답 데이터 형식 명시하지 않을 경우 자동으로 추측
            beforeSend  : options.beforeSend,// XHR Header를 포함해서 HTTP Request를 하기전에 호출됩니다.
            success	: options.success,
            error	: options.error,
            complete : options.complete
        });
    }
    var formSubmit = function(method, action, dataObject){
        var method = method || 'GET' ;
        var action = action || '/';
        var data = dataObject || {};
        var $form = $(`<form action="${action}"></form>`).appendTo('body');
        $.each( data, function( key, val ) {
            $form.append($('<input/>', {type: 'hidden', name: key, value: val }));
        });
        $form.submit();
    }
    var popupWindow = function popupWin(url, name, prop, pWidth, pHeight){
		if( pWidth == null ) pWidth = 0;
		if( pHeight == null ) pHeight = 0;
		var winL = (screen.width - pWidth) / 2;
        var winT = (screen.height - pHeight) / 2;
		prop+= ", top=" + winT + ", left=" + winL + ", width=" + pWidth + ", height=" + pHeight;
		return window.open(url,name,prop);
	}
	var formToJson = function($form){
        var unindexed_array = $form.serializeArray();
        var obj = {};
		
        $.map(unindexed_array, function(n, i){
            obj[n['name']] = n['value'];
        });
		
        return obj;
	}
    var displayYmd = function(ymd, gubun){
        if(ymd == false || ymd.length < 8) return ymd;
        var ymd = ymd.replaceAll(/\D/g, '');
        var gubun = gubun || '-';
        return ymd.substring(0,4) + gubun + ymd.substring(4,6) + gubun + ymd.substring(6);
    }
    var toNumber = function(str) {
        var str = str.replaceAll(/[^0-9.+-]/g,'');
        return Number(str);
    }    
    return {
        isString : isString,
        isNumber : isNumber,
        isEmpty  : isEmpty,
        dateFormat :dateFormat ,
        today : (dateformat)=>{
            return isEmpty(dateformat) ? dateFormat('yyyy-MM-dd', new Date()) : dateFormat(dateformat, new Date());
        },
        //두날짜사이의 일수
        diffDays : diffDays,        
        //금액표시
        displayComma : displayComma,
        //option 확장
        extendsOptions : extendsOptions,
        // 로딩이미지를 보여준다 
        displayLoading : displayLoading,
        ajax : Ajax,
        submitGet: function(action, dataObject){
            formSubmit('GET', action, dataObject);
        },
        submitPost: function(action, dataObject){
            formSubmit('POST', action, dataObject);
        },
        popupWindow : popupWindow,
        formToJson : formToJson,
        displayYmd : displayYmd, 
        toNumber   : toNumber
    };    
})();

var DateRange = (function(){
    let getSunDay =  function getSunDay(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    let  getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1);
    
    let  addMonth = (date, months) =>  new Date(date.setMonth(date.getMonth()+months));
    //-------- API
    //오늘~오늘  
    let today = () => {
        return {from : JuliaUtil.today(), to: JuliaUtil.today()};
    }


    //이번주 시작 ~ 오늘
    let thisweek = () => {
        let monday = getSunDay(new Date());
        return {from : JuliaUtil.dateFormat("yyyy-MM-dd", monday), to: JuliaUtil.today()}
    }
    //이번달 시작 ~ 오늘
    let thismonth = () =>{
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        let thisMonthFirstDate = getFirstDayOfMonth(year, month + 1);
        return { 
            from : JuliaUtil.dateFormat("yyyy-MM-dd", thisMonthFirstDate),
            to : JuliaUtil.today()
        };
    }
    //지난주 시작 ~ 오늘
    let lastweek = () =>{
        let thisSunDay = getSunDay(new Date());
        let lastSunDay = getSunDay( thisSunDay.setDate( thisSunDay.getDate() - 1) );
        return { 
            from : JuliaUtil.dateFormat("yyyy-MM-dd", lastSunDay),
            to: JuliaUtil.today()
        };
    }
    let lastmonth = () =>{
        let lastMonthToday = addMonth(new Date(), -1);
        let firstDay = getFirstDayOfMonth(lastMonthToday.getFullYear(), lastMonthToday.getMonth() + 1);
        return {
            from : JuliaUtil.dateFormat("yyyy-MM-dd", firstDay),
            to: JuliaUtil.today()
        }
    }
    let thisyear = () => {
        let year = new Date().getFullYear();
        return {
            from : JuliaUtil.dateFormat("yyyy-MM-dd", new Date(year, 0, 1)),
            to: JuliaUtil.today()
        }
    }
    let lastyearonly = () => {
        let year = new Date().getFullYear() -1;
        return {
            from : JuliaUtil.dateFormat("yyyy-MM-dd", new Date(year, 0, 1)),
            to: JuliaUtil.today()
        }    
    }
    return {
        get : (name)=> eval(name)()
    }
})();