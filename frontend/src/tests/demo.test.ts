const add = (a: number, b: number) => a + b;

describe('testing test setup', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
