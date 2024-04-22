const PageAttr = require('../page-attr');

describe('PageAttr', () => {
    let pageAttr;

    beforeEach(() => {
        pageAttr = new PageAttr(100, 10, 1);
    });

    test('should calculate the total number of pages correctly', () => {
        expect(pageAttr.totalPageCount).toBe(10);
    });

    test('should calculate the total number of pages correctly when totalItemCount is not divisible by pageSize', () => {
        pageAttr = new PageAttr(105, 10, 1);
        expect(pageAttr.totalPageCount).toBe(11);
    });

    test('should calculate the current page correctly', () => {
        expect(pageAttr.currentPageNumber).toBe(1);
    });

    test('should update the current page correctly', () => {
        pageAttr.currentPageNumber = 5;
        expect(pageAttr.currentPageNumber).toBe(5);
    });
});

