describe('index.js: ', function() {
    it('isNum() should work fine.', function() {
        expect(isNum(1)).toBe(true)
        expect(isNum('1')).toBe(false)
        expect(isNum(true)).toBe(false)

        var add5 = add(5)
        expect(add5(5)).toBe(10)
        var add6 = add(true)
        expect(add6(5)).toBe(6)
    })
})