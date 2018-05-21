import { add, isNum } from "../src/index";

describe('运算功能单元测试', function() {
    it('isNum函数测试', function() {
        expect(isNum(1)).toBe(true)
    });

    it("乘法函数测试",function(){
        var add5 = add(5)
        expect(add5(5)).toBe(10)
        var add6 = add(1)
        expect(add6(5)).toBe(6)
    })
})