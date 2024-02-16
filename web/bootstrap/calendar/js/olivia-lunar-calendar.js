var LunarCalendar = (function(){
    let LUNAR_LAST_YEAR = 1939;
    let lunarMonthTable = [
        [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],   /* 양력 1940년 1월은 음력 1939년에 있음 그래서 시작년도는 1939년*/
        [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1],   /* 1941 */
        [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
        [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
        [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
        [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
        [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],   /* 1951 */
        [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
        [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
        [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],   /* 1961 */
        [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
        [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
        [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
        [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2],   /* 1971 */
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
        [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
        [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
        [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],   /* 1981 */
        [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
        [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
        [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
        [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
        [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        [1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
        [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],   /* 1991 */
        [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
        [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
        [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2],   /* 2001 */
        [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
        [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1],
        [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
        [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
        [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],   /* 2011 */
        [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],   /* 2021 */
        [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
        [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
        [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
        [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
        [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1],   /* 2031 */
        [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
        [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
        [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],   /* 2041 */
        [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2]
    ];

    let myDate = function (year, month, day, leapMonth) {
        return {
          year: year,
          month: month,
          day: day,
          leapMonth: leapMonth,
        };
    }
    
    let lunarCalc = function (year, month, day, type, leapmonth) {
               var solYear, solMonth, solDay;
                var lunYear, lunMonth, lunDay;
    
                // lunLeapMonth는 음력의 윤달인지 아닌지를 확인하기위한 변수
                // 1일 경우 윤달이고 0일 경우 음달
                var lunLeapMonth, lunMonthDay;
                var i, lunIndex;
    
                var solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
                /* range check */
                if (year < 1940 || year > 2040) {
                    alert('1940년부터 2040년까지만 지원합니다');
                    return;
                }
    
                /* 속도 개선을 위해 기준 일자를 여러개로 한다 */
                if (year >= 2000) {
                    /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
                    solYear = 2000;
                    solMonth = 1;
                    solDay = 1;
                    lunYear = 1999;
                    lunMonth = 11;
                    lunDay = 25;
                    lunLeapMonth = 0;
    
                    solMonthDay[1] = 29;    /* 2000 년 2월 28일 */
                    lunMonthDay = 30;   /* 1999년 11월 */
                }
                else if (year >= 1970) {
                    /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
                    solYear = 1970;
                    solMonth = 1;
                    solDay = 1;
                    lunYear = 1969;
                    lunMonth = 11;
                    lunDay = 24;
                    lunLeapMonth = 0;
    
                    solMonthDay[1] = 28;    /* 1970 년 2월 28일 */
                    lunMonthDay = 30;   /* 1969년 11월 */
                }
                else {
                    /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
                    solYear = 1940;
                    solMonth = 1;
                    solDay = 1;
                    lunYear = 1939;
                    lunMonth = 11;
                    lunDay = 22;
                    lunLeapMonth = 0;
    
                    solMonthDay[1] = 29;    /* 1940 년 2월 28일 */
                    lunMonthDay = 29;   /* 1939년 11월 */
                }
    
                lunIndex = lunYear - LUNAR_LAST_YEAR;
    
                // type이 1일때는 입력받은 양력 값에 대한 음력값을 반환
                // 2일 때는 입력받은 음력 값에 대한 양력값을 반환
                // 반복문이 돌면서 양력 값들과 음력 값들을 1일 씩 증가시키고
                // 입력받은 날짜값과 양력 값이 일치할 때 음력값을 반환함
                while (true) {
                    if (type == 1 &&
                        year == solYear &&
                        month == solMonth &&
                        day == solDay) {
                        return new myDate(lunYear, lunMonth, lunDay, lunLeapMonth);
                    }
                    else if (type == 2 &&
                        year == lunYear &&
                        month == lunMonth &&
                        day == lunDay &&
                        leapmonth == lunLeapMonth) {
                        return new myDate(solYear, solMonth, solDay, 0);
                    }
    
                    // 양력의 마지막 날일 경우 년도를 증가시키고 나머지 초기화
                    if (solMonth == 12 && solDay == 31) {
                        solYear++;
                        solMonth = 1;
                        solDay = 1;
    
                        // 윤년일 시 2월달의 총 일수를 1일 증가
                        if (solYear % 400 == 0)
                            solMonthDay[1] = 29;
                        else if (solYear % 100 == 0)
                            solMonthDay[1] = 28;
                        else if (solYear % 4 == 0)
                            solMonthDay[1] = 29;
                        else
                            solMonthDay[1] = 28;
    
                    }
                    // 현재 날짜가 달의 마지막 날짜를 가리키고 있을 시 달을 증가시키고 날짜 1로 초기화
                    else if (solMonthDay[solMonth - 1] == solDay) {
                        solMonth++;
                        solDay = 1;
                    }
                    else
                        solDay++;
    
                    // 음력의 마지막 날인 경우 년도를 증가시키고 달과 일수를 초기화
                    if (lunMonth == 12 &&
                        ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) ||
                            (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))) {
                        lunYear++;
                        lunMonth = 1;
                        lunDay = 1;
    
                        if (lunYear > 2043) {
                            alert("입력하신 달은 없습니다.");
                            break;
                        }
    
                        // 년도가 바꼈으니 index값 수정
                        lunIndex = lunYear - LUNAR_LAST_YEAR;
    
                        // 음력의 1월에는 1 or 2만 있으므로 1과 2만 비교하면됨
                        if (lunarMonthTable[lunIndex][lunMonth - 1] == 1)
                            lunMonthDay = 29;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2)
                            lunMonthDay = 30;
                    }
                    // 현재날짜가 이번달의 마지막날짜와 일치할 경우
                    else if (lunDay == lunMonthDay) {
    
                        // 윤달인데 윤달계산을 안했을 경우 달의 숫자는 증가시키면 안됨
                        if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3
                            && lunLeapMonth == 0) {
                            lunDay = 1;
                            lunLeapMonth = 1;
                        }
                        // 음달이거나 윤달을 계산 했을 겨우 달을 증가시키고 lunLeapMonth값 초기화
                        else {
                            lunMonth++;
                            lunDay = 1;
                            lunLeapMonth = 0;
                        }
    
                        // 음력의 달에 맞는 마지막날짜 초기화
                        if (lunarMonthTable[lunIndex][lunMonth - 1] == 1)
                            lunMonthDay = 29;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2)
                            lunMonthDay = 30;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3)
                            lunMonthDay = 29;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
                            lunLeapMonth == 0)
                            lunMonthDay = 29;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
                            lunLeapMonth == 1)
                            lunMonthDay = 30;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
                            lunLeapMonth == 0)
                            lunMonthDay = 30;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
                            lunLeapMonth == 1)
                            lunMonthDay = 29;
                        else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6)
                            lunMonthDay = 30;
                    }
                    else
                        lunDay++;
                }
    }; 
    let toMoon = function (solYmd) {
        // solYmd를 년, 월, 일로 분리
        var solYear = parseInt(solYmd.substring(0, 4));
        var solMonth = parseInt(solYmd.substring(4, 6));
        var solDay = parseInt(solYmd.substring(6, 8));

        // 양력을 음력으로 변환
        var lunarDate = lunarCalc(solYear, solMonth, solDay, 1);

        // 음력 날짜를 YYYYMMDD 형태의 문자열로 변환
        var lunarYmd = String(lunarDate.year) +
            (lunarDate.month < 10 ? '0' : '') + lunarDate.month +
            (lunarDate.day < 10 ? '0' : '') + lunarDate.day;

        return lunarYmd;
    }

    return {
        toMoon : toMoon
    }
})();