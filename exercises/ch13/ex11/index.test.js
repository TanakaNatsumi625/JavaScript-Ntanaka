import { retryWithExponentialBackoff } from "./index.js";
import { afterEach, describe, jest } from '@jest/globals';

global.fetch = jest.fn();

describe("retryWithExponentialBackoff", () => {
    beforeEach(() => {
        fetch.mockClear();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should retry the function with exponential backoff on failure', async () => {
        //モックのプロミスのパターン(Reject→Reject→Resolve)＝試行回数が3回目で成功のテスト
        const mockFunc = jest.fn()
            .mockRejectedValueOnce(new Error('First failure'))
            .mockRejectedValueOnce(new Error('Second failure'))
            .mockResolvedValue('Success on third attempt');
        //setTimeOutをモック化すればawaitせずに自動で進められる
        //しかし非同期とのテスト相性が悪いため今回はそのまま
        const promise = await retryWithExponentialBackoff(mockFunc, 5);

        expect(promise).toBe('Success on third attempt');
        expect(mockFunc).toHaveBeenCalledTimes(3);
    });
    it('should reject after exceeding max retries', async () => {
        //モックのプロミスのパターン(Rejectが3回)＝最大試行回数超過のテスト
        const mockFunc = jest.fn()
            .mockRejectedValue(new Error('Always fails'));

        const promise = retryWithExponentialBackoff(mockFunc, 2);
        await expect(promise).rejects.toThrow('Always fails');

        expect(mockFunc).toHaveBeenCalledTimes(3); // 初回 + 2回リトライ
    });
});


