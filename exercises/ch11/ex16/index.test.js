import { retryWithExponentialBackoff } from "./index.js";
import { jest } from '@jest/globals';

// Jestのタイマーをモック化
jest.useFakeTimers();

describe('retryWithExponentialBackoff', () => {
    test('should succeed on the third attempt', () => {
        let count = 0;
        const func = jest.fn(() => {
            count++;
            return count === 3; // 3回目で成功
        });
        const callback = jest.fn((success) => {
            if (success) {
                return "Operation succeeded";
            } else {
                return "Operation failed";
            }
        });

        retryWithExponentialBackoff(func, 5, callback);

        // まず最初の0msタイマーを進める
        jest.advanceTimersByTime(0);

        // 最初の試行が実行されたはず
        expect(func).toHaveBeenCalledTimes(1);
        expect(callback).not.toHaveBeenCalled();

        // 1回目失敗 → 1秒後に再試行
        jest.advanceTimersByTime(1000);
        expect(func).toHaveBeenCalledTimes(2);
        expect(callback).not.toHaveBeenCalled();

        // 2回目失敗 → 2秒後に再試行
        jest.advanceTimersByTime(2000);
        expect(func).toHaveBeenCalledTimes(3);

        // 3回目で成功 → callbackが呼ばれる
        expect(callback).toHaveBeenCalledWith(true);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should fail after max retries', () => {
        let count = 0;
        const func = jest.fn(() => {
            count++;
            return count === 4; // 4回目で成功
        });
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 2, callback);
        // まず最初の0msタイマーを進める
        jest.advanceTimersByTime(0);

        // 最初の試行が実行されたはず
        expect(func).toHaveBeenCalledTimes(1);
        expect(callback).not.toHaveBeenCalled();

        // 1回目失敗 → 1秒後に再試行
        jest.advanceTimersByTime(1000);
        expect(func).toHaveBeenCalledTimes(2);
        expect(callback).not.toHaveBeenCalled();

        // 2回目失敗 → 2秒後に再試行
        jest.advanceTimersByTime(2000);
        expect(func).toHaveBeenCalledTimes(3);
        // 最大試行回数を超えたので、callbackがfalseで呼ばれる
        expect(callback).toHaveBeenCalledWith(false);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});

// タイマーのモックを元に戻す
afterAll(() => {
    jest.useRealTimers();
});