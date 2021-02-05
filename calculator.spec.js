const calculator = require('./calculator');

test('add 1 + 2', () => {
    expect(calculator("1 + 2")).toBe("3");
});

test('(2+4)*5+(9-8*(2*2))', () => {
    expect(calculator("(2+4)*5+(9-8*(2*2))")).toBe("7");
})

test('2*5*3-8/(2-1)', () => {
    expect(calculator("2*5*3-8/(2-1)")).toBe("22");
})

test('-4', () => {
    expect(calculator("-4")).toBe("-4");
})

test('-5-6', () => {
    expect(calculator("-5-6")).toBe("-11");
})

test('(1+5-20)*2', () => {
    expect(calculator("(1+5-20)*2")).toBe("-28");
})

test('-(6+1)', () => {
    expect(calculator("-(6+1)")).toBe("-7");
})

test('5+(-4)', () => {
    expect(calculator("5+(-4)")).toBe("1");
})

test('5+(-4+7)', () => {
    expect(calculator("5+(-4+7)")).toBe("8");
})

test('5+(-(-4+7))', () => {
    expect(calculator("5+(-(-4+7))")).toBe("2");
})


test('5+(-(-4+7))', () => {
    expect(calculator("5+(-(-4+7))")).toBe("2");
})

test('-(-5)', () => {
    expect(calculator("-(-5)")).toBe("5");
})

test('5-(-(-5))', () => {
    expect(calculator("5-(-(-5))")).toBe("0");
})

test('5*(-(-5))', () => {
    expect(calculator("5*(-(-5))")).toBe("25");
})

test('5/(-(-5))', () => {
    expect(calculator("5/(-(-5))")).toBe("1");
})

test('8/4/2', () => {
    expect(calculator("8/4/2")).toBe("1");
})

test('8/2*(2+2)', () => {
    expect(calculator("8/2*(2+2)")).toBe("1");
})

test('8/(2*(2+2))', () => {
    expect(calculator("8/(2*(2+2))")).toBe("1");
})

test('8(2-1)', () => {
    expect(calculator("8(2-1)")).toBe("8");
})

test('8(2-9)/(2-3)', () => {
    expect(calculator("8(2-9)/(2-3)")).toBe("56");
})

test('8(2-9)/(3-2)', () => {
    expect(calculator("8(2-9)/(3-2)")).toBe("-56");
})

test('8**4', () => {
    expect(calculator("8**4")).toBe("Syntax Error");
})

test('8+-4', () => {
    expect(calculator("8+-4")).toBe("Syntax Error");
})

test('8//4', () => {
    expect(calculator("8//4")).toBe("Syntax Error");
})

test('84-', () => {
    expect(calculator("84-")).toBe("Syntax Error");
})

test('/84', () => {
    expect(calculator("/84")).toBe("Syntax Error");
})

test('*84', () => {
    expect(calculator("*84")).toBe("Syntax Error");
})

test('+84', () => {
    expect(calculator("+84")).toBe("Syntax Error");
})

test('*84!', () => {
    expect(calculator("*84!")).toBe("Lexical Error");
})

test('*84abc', () => {
    expect(calculator("*84abc")).toBe("Lexical Error");
})

test('*84!@', () => {
    expect(calculator("*84!@")).toBe("Lexical Error");
})

test('-(-(-(5+9)))', () => {
    expect(calculator("-(-(-(5+9)))")).toBe("-14");
})