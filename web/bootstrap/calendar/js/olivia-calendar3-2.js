class OliviaCalendar {
    constructor(containerId, options) {
        this.container = document.getElementById(containerId); // 컨테이너 요소 저장
        this.options = options; // 옵션 저장
        this.currentYear = new Date().getFullYear(); // 현재 연도
        this.currentMonth = new Date().getMonth() + 1; // 현재 월 (1월=1)
        this.holidays = {}; // 공휴일 저장 객체
        this.schedules = {}; // 스케줄 저장 객체
        this.division24={}; //24절기
        // 콜백 함수를 옵션에서 설정
        this.dateClickCallback = options.onDateClick || function(ymd) { console.log(ymd); };
        // 기타 초기화 로직...        
    }

    // 공휴일 설정
    setHolidays(holidayArray) {
        this.holidays = {}; // 공휴일 데이터 초기화
        holidayArray.forEach(holiday => {
            this.holidays[holiday.ymd] = holiday.name;
        });
    }

    // 24절기 설정
    setDivision24(division24Array) {
        this.division24 = {}; // division24
        division24Array.forEach(div24 => {
            this.division24[div24.ymd] = div24.name;
        });
    }

    // 스케줄 설정
    setSchedule(scheduleArray) {
        this.schedules = {}; // 스케줄 데이터 초기화
        scheduleArray.forEach(schedule => {
            if (!this.schedules[schedule.ymd]) {
                this.schedules[schedule.ymd] = [];
            }
            this.schedules[schedule.ymd].push({
                type: schedule.scheduleType,
                content: schedule.content
            });
        });
    }
    scheduleTypeStyles = {
        '01': 'schedule-item bg-success', // 예시: "01" 타입에 대한 스타일
        '02': 'schedule-item bg-warning', // 예시: "02" 타입에 대한 스타일
        // 여기에 더 많은 스케줄 타입과 해당 스타일을 추가할 수 있습니다.
        'default': 'schedule-item bg-secondary' // 기본 스타일
    };    
    // 달력 렌더링
    render(year, month) {
        this.currentYear = year;
        this.currentMonth = month;
        const calendarHTML = this.#generateCalendarHTML(year, month);
        this.container.innerHTML = calendarHTML;
        this.#addDateClickEventListeners();
    }
    
    // 날짜 클릭 이벤트 리스너를 추가하는 새로운 메서드
    #addDateClickEventListeners() {
        const days = this.container.querySelectorAll('.day');
        days.forEach(day => {
            day.addEventListener('click', () => {
                const ymd = day.getAttribute('data-ymd');
                this.dateClickCallback(ymd);
            });
        });
    }

    #getClassName = (yyyy, mm, dd) => {
        const today = new Date();
        const date = new Date(yyyy, mm - 1, dd);
        const isToday = today.toDateString() === date.toDateString();
        const isInCurrentMonth = mm === this.currentMonth;
        const ymd = `${yyyy}${this.#zeroPad(mm)}${this.#zeroPad(dd)}`;
        const isHoliday = this.holidays.hasOwnProperty(ymd);
        const dayOfWeek = this.#getDayOfWeek(yyyy, mm, dd); // dayOfWeek 계산 추가

        let classNames = 'col day';
        //if (isToday) classNames += 'badge';
        if (!isInCurrentMonth) classNames += ' text-muted small fst-italic';
        if (isHoliday) classNames += ' text-danger';
        if (dayOfWeek === 0) classNames += ' text-danger';
        else if (dayOfWeek === 6) classNames += ' text-primary';
        return classNames;
    }

    // 주어진 날짜의 요일을 반환하는 함수 (0: 일요일, 6: 토요일)
    #getDayOfWeek = (year, month, day) => new Date(year, month - 1, day).getDay();

    // 한 자리 숫자 앞에 0을 붙여 두 자리 문자열로 만드는 함수
    #zeroPad = (value) => value.toString().padStart(2, '0');

    // 주어진 날짜에 일수를 더하거나 뺀 결과를 반환하는 함수
    #adjustDate = (ymd, days) => {
        const date = new Date(ymd.slice(0, 4), parseInt(ymd.slice(4, 6)) - 1, ymd.slice(6));
        date.setDate(date.getDate() + days);
        return `${date.getFullYear()}${this.#zeroPad(date.getMonth() + 1)}${this.#zeroPad(date.getDate())}`;
    };

    // 주어진 년월의 마지막 날을 반환하는 함수
     #getMonthEndDay = (year, month) => {
        const lastDay = new Date(year, month, 0).getDate();
        return `${year}${this.#zeroPad(month)}${this.#zeroPad(lastDay)}`;
    };    
    // 달력 HTML 생성
    #generateCalendarHTML(year, month) {
        this.currentYear = year;
        this.currentMonth = month;
        
        const startDayOfWeek = this.#getDayOfWeek(year, month, 1);
        let endDay = this.#getMonthEndDay(year, month);
        let startDay = `${year}${this.#zeroPad(month)}01`;

        // 시작일과 종료일을 주의 시작과 끝으로 조정
        startDay = this.#adjustDate(startDay, -startDayOfWeek);
        endDay = this.#adjustDate(endDay, 6 - this.#getDayOfWeek(year, month, parseInt(endDay.slice(6))));

        // 달력의 요일 헤더를 생성
        let html = '<div class="row">';
        const namesOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        namesOfWeek.forEach((day, index) => {
            html += `<div class="col bg-light text-center  ${index === 0 ? 'text-danger' : index === 6 ? 'text-primary' : ''} week">${day}</div>`;
        });
        html += '</div>';

        //음력을 모두 구해서 
        let lunarYmds = {};
        for (let ymd = startDay; ymd <= endDay; ymd = this.#adjustDate(ymd, 1)) {
            lunarYmds[ymd]=LunarCalendar.toMoon(ymd);
        }
        // 달력의 날짜를 생성 (수정됨)
        for (let ymd = startDay; ymd <= endDay; ymd = this.#adjustDate(ymd, 1)) {
            const year = parseInt(ymd.slice(0, 4));
            const month = parseInt(ymd.slice(4, 6));
            const day = parseInt(ymd.slice(6));
            const dayOfWeek = this.#getDayOfWeek(year, month, day); // dayOfWeek 계산 추가
            const classNames = this.#getClassName(year, month, day); // 수정된 부분
            const isHoliday = this.holidays.hasOwnProperty(ymd);
            let dayContent ='',  span24 = '', today=`${day}`, lunar=''; 

            //24절기
            if(this.division24[ymd]){
                span24 = `<span class="ml-2 small fst-italic text-primary">${this.division24[ymd]}</span>`; // 오늘 날짜를 뱃지로 표현
            }
            if (new Date(year, month - 1, day).toDateString() === new Date().toDateString()) {
                today = `<div class="today-highlight">${day}</div>`; // 오늘 날짜를 뱃지로 표현
            }
            if(['01','07','15','21'].includes(lunarYmds[ymd].slice(6))){
                let lunarMMdd = `(${Number(lunarYmds[ymd].slice(4,6))}.${Number(lunarYmds[ymd].slice(6))})`;
                lunar = `<span class="ml-2 small fst-italic text-secondary">${lunarMMdd}</span>`;
            }   

            dayContent = `${today} ${lunar} ${span24} `;
            //휴일표시
            let holiday = '';
            if(isHoliday){
                holiday = ` <div class="badge bg-danger" style="width: 100%;">${this.holidays[ymd]}</div>`;
            }
            dayContent += holiday;;
            //스케줄 표시
            if (this.schedules[ymd]) {
                this.schedules[ymd].forEach(scheduleItem => {
                    // 스케줄 타입에 따른 추가적인 클래스 결정
                    let additionalClass = this.scheduleTypeStyles[scheduleItem.type] || scheduleTypeStyles['default'];
                    let scheduleClass = `badge ${additionalClass} schedule-badge`;
                    dayContent += `<div class="${scheduleClass}">${scheduleItem.content}</div>`;
                });
            }

            if (dayOfWeek === 0) html += '<div class="row">'; // 새로운 주의 시작
            html += `<div class="${classNames}" data-ymd="${ymd}">${dayContent}</div>`; // 수정된 부분
            if (dayOfWeek === 6) html += '</div>'; // 주의 끝
        }
        return html;
    }

    // 필요에 따라 추가 메서드 구현
}


class CalendarDataService {
    static getEventsForMonth(year, month) {
        // 예시: 서버에서 이벤트를 가져오거나 로컬 소스에서 반환
        return [
              {ymd: '20240219', scheduleType:'01', content: 'jt와 점심'},
              {ymd: '20240219', scheduleType:'02', content: '경남 천지창조 점검'},
              {ymd: '20240216', scheduleType:'02', content: '우리는 빛이 없는 어둠 속에서도 찾을 수 있는'},
        ]
    }

    static getHolidaysForMonth(year, month) {
        // 예시: 서버에서 공휴일을 가져오거나 로컬 소스에서 반환
        // return [];
        return [{ymd:'20240216', name:'테스트'},{ymd:'20240217', name:'휴가'}]
    }

    static getDivision24ForMonth(year, month) {
        // 예시: 서버에서 공휴일을 가져오거나 로컬 소스에서 반환
        // return [];
        return [
                {ymd:'20240204', name:'입춘'},
                {ymd:'20240219', name:'우수'},
                {ymd:'20240216', name:'우수'},
                {ymd:'20240217', name:'우수'},
        ]
    }
}