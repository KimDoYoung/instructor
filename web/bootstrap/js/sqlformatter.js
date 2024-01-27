const SqlFormatter = function(){
    const sqlKeywords = [
        "ADD", "ALL", "ALTER", "AND", "AS", "ASC", "BETWEEN", "BY", "CASE", "CHECK",
        "COLUMN", "CONSTRAINT", "CREATE", "DATABASE", "DELETE", "DESC", "DISTINCT", 
        "DROP", "ELSE", "END", "EXISTS", "FOREIGN", "FROM", "GROUP", "HAVING", "IN", 
        "INDEX", "INNER", "INSERT", "INTO", "IS", "JOIN", "LEFT", "LIKE", "LIMIT", 
        "NOT", "NULL", "OR", "ORDER", "OUTER", "SELECT", "SET", "TABLE", "THEN", 
        "UNION", "UNIQUE", "UPDATE", "VALUES", "WHERE",
        // PostgreSQL 예약어
        "ANALYSE", "ANALYZE", "ANY", "ARRAY", "ASymmetric", "BINARY", "BOTH", "CASE",
        "CAST", "COLLATE", "CONCURRENTLY", "COPY", "CROSS", "CURRENT_DATE", "CURRENT_ROLE",
        "CURRENT_TIME", "CURRENT_TIMESTAMP", "CURRENT_USER", "DEFAULT", "DISTINCT", 
        "FREEZE", "FULL", "ILIKE", "INOUT", "ISNULL", "JOIN", "LEADING", "LEFT", 
        "LIKE", "LIMIT", "LOCALTIME", "LOCALTIMESTAMP", "NATURAL", "NORMALIZE", 
        "NOTNULL", "OFFSET", "OLD", "OUTER", "OVERLAPS", "PLACING", "PRECEDING", 
        "PRIMARY", "REFERENCES", "RIGHT", "SIMILAR", "TABLE", "TO", "TRAILING", 
        "TREAT", "TRIM", "UNFREEZE", "USING", "VARIADIC", "VERBOSE", "WHEN", "WINDOW", 
        "WITH"
      ];

    let sqlKeywordSet = new Set(sqlKeywords);

    function isSeperator(ch) {
        if (ch == ' '||ch == '\n'||ch == '('||ch == ')') return true;
        return false;
    }

    function keywordUpper(keyword) {
        var upper = keyword.toUpperCase();

        if (sqlKeywordSet.has(upper)) {
            return upper;
        }
        return keyword;
    }
    function isSpace(ch){
        if (ch == ' '||ch == '\n'||ch=='\t'||ch == '\n') return true;
        return false;
    }
    function sqlKeywordToUpper(sql) {
        let des = ''; // 최종 변환된 문자열이 담길 변수
        let inComment = false; // 주석 내부에 있는지 여부
        let word = '';
        for (let i = 0; i < sql.length; i++) {
            let ch = sql[i];
            let nextCh = i + 1 < sql.length ? sql[i + 1] : '';

            //inline 주석
            if (ch === '-' && nextCh === '-') {
                do{
                    ch = sql[i];
                    des += ch;
                    i++;
                }while(i < sql.length && ch != '\n');
                i--;
                continue;
            }

            if (ch === '/' && nextCh === '*') {
                inComment = true;
                des += ch;
                i++;
                continue;
            }

            if (inComment && ch === '*' && nextCh === '/') {
                inComment = false;
                des += ch + nextCh;
                i++; // 주석 종료 부분까지 건너뛰기
                continue;
            }

            if (inComment) {
                // 주석 내부이면 추가
                des += ch;
                continue;
            }

            if (isSeperator(ch)) {
                des += keywordUpper(word);
                des += ch;
                word='';
                continue;
            }
            if(isSpace(ch)){
                des += ch;
            }else{
                word += ch;
            }
        }

        return des;
    }

    return {
        sqlKeywordToUpper: sqlKeywordToUpper
    };
}();
