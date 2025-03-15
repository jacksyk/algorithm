// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/daily-temperatures/description/
 */

// ==========  //

// 暴力解法 时间复杂度 O(n^2)
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    let curDayIdx = 0
    const res = new Array(temperatures.length).fill(0)
    while (curDayIdx < temperatures.length) {
        let explorePointer = curDayIdx
        while (explorePointer < temperatures.length && temperatures[explorePointer] <= temperatures[curDayIdx]) {
            explorePointer++
        }
        if (explorePointer === temperatures.length) {
            res[curDayIdx] = 0
        }else {
            res[curDayIdx] = explorePointer - curDayIdx
        }
        curDayIdx++
    }
    return res
};

// 单调栈 时间复杂度 O(n)
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

var dailyTemperatures = function(temperatures) {
    const stack = []
    const res = new Array(temperatures.length).fill(0)
    for (let i = 0; i < temperatures.length; i++) {
        const temperature = temperatures[i]
        if (!stack.length) {
            stack.push(i)
        }else {
            while (stack.length && temperature > temperatures[stack[stack.length - 1]]) {
                res[stack[stack.length - 1]] = i - stack[stack.length - 1]
                stack.pop()
            }
            stack.push(i)
        }
    }
    return res
};