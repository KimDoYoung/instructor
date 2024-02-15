const CalendarMaker = (function() {
    let currentYear, currentMonth;
    let holidays = {}; // 공휴일을 저장하기 위한 객체
    let schedules = {}; // 스케줄 저장 구조

    // 스케줄 설정 함수 수정
    const setSchedule = (scheduleArray) => {
        schedules = {}; // 기존 스케줄 데이터 초기화
        scheduleArray.forEach(schedule => {
            if (!schedules[schedule.ymd]) {
                schedules[schedule.ymd] = [];
            }
            schedules[schedule.ymd].push({
                type: schedule.scheduleType, // 스케줄 타입 저장
                content: schedule.content
            });
        });
    };

    // 공휴일 설정 함수
    const setHolidays = (holidayArray) => {
        holidays = {}; // 기존 공휴일 데이터 초기화
        holidayArray.forEach(holiday => {
            holidays[holiday.ymd] = holiday.name;
        });
    };


    // 주어진 날짜의 요일을 반환하는 함수 (0: 일요일, 6: 토요일)
    const getDayOfWeek = (year, month, day) => new Date(year, month - 1, day).getDay();

    // 한 자리 숫자 앞에 0을 붙여 두 자리 문자열로 만드는 함수
    const zeroPad = (value) => value.toString().padStart(2, '0');

    // 주어진 날짜에 일수를 더하거나 뺀 결과를 반환하는 함수
    const adjustDate = (ymd, days) => {
        const date = new Date(ymd.slice(0, 4), parseInt(ymd.slice(4, 6)) - 1, ymd.slice(6));
        date.setDate(date.getDate() + days);
        return `${date.getFullYear()}${zeroPad(date.getMonth() + 1)}${zeroPad(date.getDate())}`;
    };

    // 주어진 년월의 마지막 날을 반환하는 함수
    const getMonthEndDay = (year, month) => {
        const lastDay = new Date(year, month, 0).getDate();
        return `${year}${zeroPad(month)}${zeroPad(lastDay)}`;
    };

    //날짜에 따라서 일자표현에 쓸 클래스를 정의
    const getClassName = (yyyy, mm, dd) => {
        const today = new Date();
        const date = new Date(yyyy, mm - 1, dd);
        const isToday = today.toDateString() === date.toDateString();
        const isInCurrentMonth = mm === currentMonth;
        const ymd = `${yyyy}${zeroPad(mm)}${zeroPad(dd)}`;
        const isHoliday = holidays.hasOwnProperty(ymd);
        const dayOfWeek = getDayOfWeek(yyyy, mm, dd); // dayOfWeek 계산 추가

        let classNames = 'col day';
        //if (isToday) classNames += 'badge';
        if (!isInCurrentMonth) classNames += ' text-muted small';
        if (isHoliday) classNames += ' text-danger';
        if (dayOfWeek === 0) classNames += ' text-danger';
        else if (dayOfWeek === 6) classNames += ' text-primary';
        return classNames;
    };
    const scheduleTypeStyles = {
        '01': 'schedule-item bg-success', // 예시: "01" 타입에 대한 스타일
        '02': 'schedule-item bg-info', // 예시: "02" 타입에 대한 스타일
        // 여기에 더 많은 스케줄 타입과 해당 스타일을 추가할 수 있습니다.
        'default': 'schedule-item bg-secondary' // 기본 스타일
    };
    // 달력 HTML 문자열을 생성하는 함수
    const generateCalendarHTML = (year, month) => {
        currentYear = year;
        currentMonth = month;
        
        const startDayOfWeek = getDayOfWeek(year, month, 1);
        let endDay = getMonthEndDay(year, month);
        let startDay = `${year}${zeroPad(month)}01`;

        // 시작일과 종료일을 주의 시작과 끝으로 조정
        startDay = adjustDate(startDay, -startDayOfWeek);
        endDay = adjustDate(endDay, 6 - getDayOfWeek(year, month, parseInt(endDay.slice(6))));

        // 달력의 요일 헤더를 생성
        let html = '<div class="row">';
        const namesOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        namesOfWeek.forEach((day, index) => {
            html += `<div class="col bg-light text-center  ${index === 0 ? 'text-danger' : index === 6 ? 'text-primary' : ''} week">${day}</div>`;
        });
        html += '</div>';

        // 달력의 날짜를 생성 (수정됨)
        for (let ymd = startDay; ymd <= endDay; ymd = adjustDate(ymd, 1)) {
            const year = parseInt(ymd.slice(0, 4));
            const month = parseInt(ymd.slice(4, 6));
            const day = parseInt(ymd.slice(6));
            const dayOfWeek = getDayOfWeek(year, month, day); // dayOfWeek 계산 추가
            const classNames = getClassName(year, month, day); // 수정된 부분
            const isHoliday = holidays.hasOwnProperty(ymd);
            let dayContent = `${day}`;
            if (isHoliday) {
                // 공휴일 이름을 파란색 뱃지로 표출하고, 가로 방향으로 가득 차게끔 스타일 조정
                dayContent += ` <span class="badge bg-success" style="width: 100%;">${holidays[ymd]}</span>`;
            }            
            if (new Date(year, month - 1, day).toDateString() === new Date().toDateString()) {
                dayContent = `<span class="badge bg-primary">${dayContent}</span>`; // 오늘 날짜를 뱃지로 표현
            }
            // if (schedules[ymd]) {
            //     schedules[ymd].forEach(scheduleItem => {
            //         let scheduleClass = ''; // 스케줄 타입에 따른 클래스 결정 로직
            //         switch (scheduleItem.type) {
            //             case '01':
            //                 scheduleClass = 'badge bg-warning'; // 예시: "01" 타입에 대한 스타일
            //                 break;
            //             // 여기에 다른 스케줄 타입별 스타일을 추가할 수 있습니다.
            //             default:
            //                 scheduleClass = 'badge bg-secondary'; // 기본 스타일
            //         }
            //         dayContent += ` <span class="${scheduleClass}">${scheduleItem.content}</span>`; // 스케줄 표시
            //     });
            // }
            // if (schedules[ymd]) {
            //     schedules[ymd].forEach(scheduleItem => {
            //         let scheduleClass = 'schedule-item'; // 스케줄 타입에 따른 클래스 결정 로직을 이곳에 포함시킬 수 있음
            //         dayContent += `<div class="${scheduleClass}">${scheduleItem.content}</div>`; // 스케줄 표시를 div로 변경
            //     });
            // }
            // if (schedules[ymd]) {
            //     schedules[ymd].forEach(scheduleItem => {
            //         // 스케줄 타입에 따른 스타일 클래스 결정
            //         let scheduleClass = scheduleTypeStyles[scheduleItem.type] || scheduleTypeStyles['default'];
            //         dayContent += `<div class="${scheduleClass}">${scheduleItem.content}</div>`; // 스케줄 표시를 div로 변경
            //     });
            // }
            // if (schedules[ymd]) {
            //     schedules[ymd].forEach(scheduleItem => {
            //         let scheduleClass = 'badge'; // 기본 Bootstrap badge 스타일
            //         let additionalClass = ''; // 스케줄 타입에 따른 추가적인 클래스 결정 로직이 여기 들어갈 수 있음
            //         dayContent += `<span class="${scheduleClass} ${additionalClass} schedule-badge">${scheduleItem.content}</span>`;
            //     });
            // }
            if (schedules[ymd]) {
                schedules[ymd].forEach(scheduleItem => {
                    // 스케줄 타입에 따른 추가적인 클래스 결정
                    let additionalClass = scheduleTypeStyles[scheduleItem.type] || scheduleTypeStyles['default'];
                    let scheduleClass = `badge ${additionalClass} schedule-badge`;
                    dayContent += `<span class="${scheduleClass}">${scheduleItem.content}</span>`;
                });
            }
                        

            if (dayOfWeek === 0) html += '<div class="row">'; // 새로운 주의 시작
            html += `<div class="${classNames}">${dayContent}</div>`; // 수정된 부분
            if (dayOfWeek === 6) html += '</div>'; // 주의 끝
        }

        return html;
    };

    // 년월을 조정하는 함수 (다음 또는 이전 년월 계산)
    const adjustYearMonth = (year, month, adjustment) => {
        const newDate = new Date(year, month - 1 + adjustment, 1);
        return [newDate.getFullYear(), newDate.getMonth() + 1];
    };

    // 공개 메서드 및 속성
    return {
        generateCalendarHTML,
        nextYearMonth: (year, month) => adjustYearMonth(year, month, 1),
        prevYearMonth: (year, month) => adjustYearMonth(year, month, -1),
        currentYearMonth: () => [currentYear, currentMonth],
        setHolidays,
        setSchedule 
    };
})();
