const awk = require('../awk'); // awk 객체의 경로를 적절히 설정해야 합니다.

describe('awk object tests', () => {
  test('setSource should correctly set the source array', () => {
    const sourceData = "line1\nline2";
    const format= "$1";
    awk.setSource(sourceData);
    awk.setLS("\n");
    awk.setFS("\t");
    awk.setSource(sourceData);
    awk.setFormat(format);
    var r = awk.run();
    console.log(r);
    // setSource의 결과를 검증하는 로직을 구현
    // 예: expect(awk.getSource()).toEqual(['line1', 'line2']);
  });

  test('setFormat should correctly set the format', () => {
    const format = "$1";
    awk.setFormat(format);
    // setFormat 결과를 검증하는 로직을 구현
    // 예: expect(awk.getFormat()).toBe(format);
  });

  test('run should correctly process the source with the given format', () => {
    const sourceData = "a,b\n1,2";
    const format = "$1 $2";
    awk.setFS(',');
    awk.setLS('\n');
    awk.setSource(sourceData);
    awk.setFormat(format);
    const result = awk.run();
    // run의 결과를 검증하는 로직을 구현
    // 예: expect(result).toBe("a 1\nb 2");
    console.log(result);
    expect(result).toBe("a b\n1 2");
  });
});
