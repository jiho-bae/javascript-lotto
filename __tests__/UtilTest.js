const { isMultipleOf1000, divide1000, getRandomNumbers } = require('../src/lib/utilFns');
const MissionUtils = require('@woowacourse/mission-utils');

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

describe('유틸 함수 테스트', () => {
  describe('isMultipleOf1000 함수 테스트', () => {
    it('1000의 배수라면 true를 반환한다.', () => {
      const inputs = ['1000', '100000000', '999000', '1000 ', ' 1000 '];

      inputs.forEach((input) => {
        const result = isMultipleOf1000(input);
        expect(result).toBeTruthy();
      });
    });

    it('1000의 배수가 아니면, false를 반환한다', () => {
      const inputs = ['0', '0000', '1001', '9999100', 'qwer', '0001', 'q1000'];

      inputs.forEach((input) => {
        const result = isMultipleOf1000(input);
        expect(result).toBeFalsy();
      });
    });
  });

  describe('divide1000 함수 테스트', () => {
    it('1000의 배수라면, 1000으로 나눈 몫을 반환한다', () => {
      const inputs = ['1000', '11000', '999000'];
      const answers = [1, 11, 999];

      inputs.forEach((input, i) => {
        const result = divide1000(input);
        expect(result).toEqual(answers[i]);
      });
    });
  });

  describe('getRandomNumbers 함수 테스트', () => {
    it('size 크기의 배열을 반환한다.', () => {
      const inputs = [
        [1, 45, 6],
        [1, 45, 6],
      ];

      inputs.forEach(([start, end, size]) => {
        const result = getRandomNumbers(start, end, size);
        expect(result.length).toBe(size);
      });
    });

    it('start <= x <= end의 숫자 size개를 반환한다.', () => {
      const input = [1, 45, 6];
      const [start, end, size] = input;
      const result = getRandomNumbers(start, end, size);

      const cnt = result.filter((el) => el >= start && el <= end).length;
      expect(cnt).toBe(size);
    });

    it('오름차순 정렬된 배열을 반환한다.', () => {
      mockRandoms([[6, 5, 4, 3, 2, 1]]);

      const input = [1, 45, 6];
      const [start, end, size] = input;
      const result = getRandomNumbers(start, end, size);

      let cnt = 0;
      for (let i = 0; i < result.length - 1; i++) {
        if (result[i] > result[i + 1]) cnt++;
      }

      expect(cnt).toBe(0);
    });
  });
});
