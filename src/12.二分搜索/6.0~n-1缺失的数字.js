/**
 * @url https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/description/
 */

// ps: 可以使用二分查找来高效定位缺失的学号：
// ps: 如果 records[mid] == mid，说明左侧部分没有缺失，缺失的学号在右半部分。
// ps: 如果 records[mid] != mid，说明缺失的学号在左半部分或当前位置。通过最后的区间来排除掉

/**
 * @param {number[]} records
 * @return {number}
 */

// 0 2 3 4
var takeAttendance = function (records) {
    let left = 0;
    let right = records.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (records[mid] === mid) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
};