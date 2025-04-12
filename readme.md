# 算法题目整理

## 🎲 1.数组

### 🧩 1.二分查找.ts
```typescript
/**
 * @url https://leetcode.cn/problems/binary-search/description/
 */
function search(nums: number[], target: number): number {
    let left = 0,
        right = nums.length - 1

    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        if (nums[mid] < target) {
            left = mid + 1
        }
        if (nums[mid] > target) {
            right = mid - 1
        }
    }
    return -1
}

console.log(search([1, 2, 3, 4, 5], 2))

```

### ⭐ 2.移除元素.ts
```typescript
/**
 * @url https://leetcode.cn/problems/remove-element/description/
 */
function removeElement(nums: number[], val: number): number {
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    nums[slow] = nums[fast]; // PS: 这里可以优化，不需要交换，直接覆盖即可。
    if (nums[fast] === val) {
      fast++;
    } else {
      slow++;
      fast++;
    }
  }
  return slow;
}
console.log(removeElement([3, 2, 2, 3], 3));

```

### 💡 3.有序数组的平方.ts
```typescript
/**
 * @url https://leetcode.cn/problems/squares-of-a-sorted-array/description/
 */
function sortedSquares(nums: number[]): number[] {
  const result: number[] = [];
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let leftRow = Math.pow(nums[left], 2),
      rightRow = Math.pow(nums[right], 2);
    if (leftRow <= rightRow) {
      result.unshift(rightRow);
      right--;
    } else {
      result.unshift(leftRow);
      left++;
    }
  }
  return result;
}
console.log(sortedSquares([-4, -1, 0, 3, 10]));

```

### 💫 4.长度最小的子数组.ts
```typescript
/**
 * @url https://leetcode.cn/problems/minimum-size-subarray-sum/
 */
function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0,
        res = Number.MAX_SAFE_INTEGER,
        sum = 0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
        while (sum >= target) {
            res = Math.min(i - left + 1, res)
            sum -= nums[left++]
        }
    }
    return res === Number.MAX_SAFE_INTEGER ? 0 : res
}


```

### 🛠️ 5.螺旋矩阵2.ts
```typescript
/**
 * @url https://leetcode.cn/problems/spiral-matrix-ii/description/
 */
function generateMatrix(n: number): number[][] {
    let top = 0,
        bottom = n - 1,
        left = 0,
        right = n - 1,
        count = 0, // 转几圈
        result = new Array(n).fill(0).map((_item) => new Array(n).fill(0)),
        num = 1
    while (count <= Math.floor(n / 2)) {
        // notice:执行一个循环需要做的事情
        for (let i = left; i <= right; i++) {
            result[top][i] = num++
        }
        top += 1
        for (let i = top; i <= bottom; i++) {
            result[i][right] = num++
        }
        right -= 1
        for (let i = right; i >= left; i--) {
            result[bottom][i] = num++
        }
        bottom -= 1
        for (let i = bottom; i >= top; i--) {
            result[i][left] = num++
        }
        left += 1
        count += 1
    }
    return result
}
console.table(generateMatrix(100))

```

### ⭐ 6.和为k的子数组.ts
```typescript
/**
 * @url https://leetcode.cn/problems/subarray-sum-equals-k/description/?envType=study-plan-v2&envId=top-100-liked
 */

// ps: 因为没有正负数，所以遍历所有的子数组
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    let count = 0
    for (let i = 0; i < nums.length; i++) {
        let fast = i, sum = 0
        while (fast < nums.length) {
            sum += nums[fast]
            fast++
            if (sum === k) {
                count++
            }
        }
    }
    return count
};
```

### 🔰 7.除数组以外的数组乘积.ts
```typescript
/**
 * @url https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// ps: 前缀积
var productExceptSelf = function (nums) {
    const prefixArr = new Array(nums.length).fill(1)
    const postfixArr = new Array(nums.length).fill(1)
    let prefix = 1
    for (let i = 0; i < nums.length; i++) {
        prefixArr[i] = prefix
        prefix *= nums[i]
    }
    let postfix = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        postfixArr[i] = postfix
        postfix *= nums[i]
    }
    for (let i = 0; i < nums.length; i++) {
        nums[i] = prefixArr[i] * postfixArr[i]
    }
    return nums
};
```

## 📚 2.链表

### 🔥 1.移除链表元素.ts
```typescript
/**
 * @url https://leetcode.cn/problems/remove-linked-list-elements/description/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (!head) return null
    let vitrualHead = new ListNode(0)
    vitrualHead.next = head
    let fast: ListNode | null = head,
        slow = vitrualHead
    while (fast) {
        if (fast.val === val) {
            slow.next = fast.next
            fast = fast.next
        } else {
            slow = fast
            fast = fast.next
        }
    }
    return vitrualHead.next
}

```

### 🧩 2.设计链表.ts
```typescript
/**
 * @url https://leetcode.cn/problems/design-linked-list/
 * @description 实现 MyLinkedList 类：
  MyLinkedList() 初始化 MyLinkedList 对象。
   int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
   void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
   void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
   void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。
   void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。
 */

class MyLinkedList {
    val: number
    next: null | MyLinkedList
    constructor(val: number, next: null | MyLinkedList) {
        this.val = val
        this.next = next
    }

    get(index: number): number {
        let count = 0,
            prev: MyLinkedList | null = this
        while (count <= index) {
            if (prev) {
                prev = prev.next
            }
            count++
        }
        if (prev) return prev.val
        return -1
    }

    addAtHead(val: number): void {
        let newHead = new MyLinkedList(val, this)
        this.next = newHead
    }

    addAtTail(val: number): void {
        let prev: MyLinkedList | null = this
        while (prev?.next) {
            prev = prev.next
        }
        let newHead = new MyLinkedList(val, null)
        prev.next = newHead
    }

    addAtIndex(index: number, val: number): void {
        let count = 0,
            prev: MyLinkedList | null = this,
            newHead = new MyLinkedList(val, null)
        while (count <= index) {
            if (prev) {
                prev = prev.next
            }
            count++
        }
        if (prev) {
            prev.next = newHead
        }
    }

    deleteAtIndex(index: number): void {
        let count = 0,
            prev: MyLinkedList | null = this
        while (count <= index - 1 && prev) {
            prev = prev.next
            count++
        }
        if (prev) {
            prev.next = !prev.next ? null : prev.next.next
        }
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

```

### 🎮 3.反转链表.ts
```typescript
/**
 * @url https://leetcode.cn/problesms/reverse-linked-list/description/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null
    let pre = head,
        qo = head,
        fast = head.next
    while (fast && fast.next) {
        qo = fast
        fast = fast.next
        qo.next = pre
        pre = qo
    }
    return fast
}

// 1 2 3 4 5

```

### ✨ 4.两两交换链表中的节点.ts
```typescript
/**
 * @url https://leetcode.cn/problems/swap-nodes-in-pairs/description/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
export {}

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head) return null
    if (!head.next) return head
    let vitrualNode: ListNode | null = new ListNode(0)
    vitrualNode.next = head
    let cur: ListNode | null = vitrualNode
    while (cur && cur.next && cur.next.next) {
        let p = cur.next,
            q = cur.next.next
        p.next = q.next
        q.next = p
        cur.next = q
        cur = cur.next!.next
    }
    return vitrualNode.next
}

// notice 要思考一个节点换位后前后关联的关系

```

### 🔰 5.删除链表的倒数第n个节点.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
export {};
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
//  v 1 1
var removeNthFromEnd = function (head, n) {
  const Vnode = new ListNode(0, head);
  let fast = Vnode;
  let count = 0;
  while (count < n) {
    fast = fast.next;
    count++;
  }
  let slow = Vnode;
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return Vnode.next;
};

```

### 📚 6.链表相交.js
```typescript
/**
 * @url https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/
 */
function ListNode(val) {
    this.val = val
    this.next = null
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

const getLens = (head) => {
    let count = 0,
        curNode = head
    while (curNode) {
        count++
        curNode = curNode.next
    }
    return count
}

var getIntersectionNode = function (headA, headB) {
    let len1 = getLens(headA),
        len2 = getLens(headB),
        curNodeA = headA,
        curNodeB = headB,
        chazhi = Math.abs(len1 - len2),
        count = 0
    if (len1 > len2) {
        while (count < chazhi) {
            curNodeA = curNodeA.next
            count++
        }
    } else {
        while (count < chazhi) {
            curNodeB = curNodeB.next
            count++
        }
    }

    while (curNodeA) {
        if (curNodeA === curNodeB) return curNodeA
        curNodeA = curNodeA.next
        curNodeB = curNodeB.next
    }
    return null
}

```

### 📚 7.环形链表.ts
```typescript
/**
 * @url https://leetcode.cn/problems/linked-list-cycle-ii/
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
function detectCycle(head: ListNode | null): ListNode | null {
    let slow: ListNode | null = head,
        fast: ListNode | null = head
    while (slow && fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            // 这个时候是相遇点
            slow = head
            while (slow !== fast) {
                slow = slow!.next
                fast = fast!.next
            }
            return slow
        }
    }
    return null
}

```

### ✨ 8.判断链表是否有环.ts
```typescript
/**
 * @url https://leetcode.cn/problems/linked-list-cycle/description/
 */
export {}
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: null) {
        this.val = val === undefined ? 0 : val
        this.next = next === undefined ? null : next
    }
}
function hasCycle(head: ListNode | null): boolean {
    if (!head) return false
    if (!head.next) return false
    let slow: ListNode | null = head,
        fast: ListNode | null = head
    while (slow && fast) {
        slow = slow.next
        fast = fast.next?.next || null
        if (slow === fast) {
            return true
        }
    }
    return false
}

```

### ⭐ 9.合并两个有序链表.ts
```typescript
/**
 * @url https://leetcode.cn/problems/merge-two-sorted-lists/description/
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// !分而治之中的治
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let _vitrual = new ListNode(0); // 虚拟头结点
  let cur1 = list1,
    cur2 = list2,
    _head = _vitrual;

  while (cur1 && cur2) {
    if (cur1.val < cur2.val) {
      _head.next = cur1;
      cur1 = cur1.next;
      _head = _head.next;
    } else {
      _head.next = cur2;
      cur2 = cur2.next;
      _head = _head.next;
    }
  }
  if (cur1) {
    _head.next = cur1;
    cur1 = cur1.next;
  }
  if (cur2) {
    _head.next = cur2;
    cur2 = cur2.next;
  }
  return _vitrual.next;
}

```

### 🔥 10.合并k个有序链表.ts
```typescript
/**
 * @url https://leetcode.cn/problems/merge-k-sorted-lists/description/
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  let _vitrual = new ListNode(0); // 虚拟头结点
  let cur1 = list1,
    cur2 = list2,
    _head = _vitrual;

  while (cur1 && cur2) {
    if (cur1.val < cur2.val) {
      _head.next = cur1;
      cur1 = cur1.next;
      _head = _head.next;
    } else {
      _head.next = cur2;
      cur2 = cur2.next;
      _head = _head.next;
    }
  }
  if (cur1) {
    _head.next = cur1;
    cur1 = cur1.next;
  }
  if (cur2) {
    _head.next = cur2;
    cur2 = cur2.next;
  }
  return _vitrual.next;
}

// function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
//     if (lists.length === 0) return null
//     if (lists.length === 1) return lists[0]
//     let res: ListNode | null = null
//     for (let i = 0; i < lists.length; i++) {
//         res = mergeTwoLists(res, lists[i])
//     }
//     return res
// }

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;
  if (lists.length === 1) {
    return lists[0]; // ps：返回头结点
  }
  const midIndex = Math.floor(lists.length / 2);
  const left = lists.slice(0, midIndex + 1);
  const right = lists.slice(midIndex);
  return mergeTwoLists(mergeKLists(left), mergeKLists(right));
}

```

### 🔰 11.反转k个一组链表.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/reverse-nodes-in-k-group/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

function ReverseHeadAndTail(head, tail) {
  let pre = null,
    cur = null,
    fast = head;
  while (fast !== tail) {
    cur = fast;
    fast = fast.next;
    cur.next = pre;
    pre = cur;
  }
  if (fast) {
    cur = fast;
    cur.next = pre;
  }
  return [cur, head];
}

var reverseKGroup = function (head, k) {
  const _VNode = new ListNode(0);
  _VNode.next = head;
  let fast = _VNode;
  while (fast) {
    let p = fast; // 翻转前的一个节点
    let count = 0;
    let tail = fast; // 要翻转链表的最后一个节点
    while (count < k && tail) {
      tail = tail.next;
      count++;
    }
    if (k === count && tail) {
      const tailNext = tail.next;
      tail.next = null;
      const [reverseHead, reverseTail] = ReverseHeadAndTail(p.next, tail);
      p.next = reverseHead;
      reverseTail.next = tailNext;
      fast = reverseTail;
    } else {
      break; // ps: 不足k个直接退出循环了。
    }
  }
  return _VNode.next;
};

```

### 🌟 12.排序链表.ts
```typescript
/**
 * @url https://leetcode.cn/problems/sort-list/description/?envType=study-plan-v2&envId=top-100-liked
 */
// @ts-nocheck

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 先拆，再和
var sortList = function(head) {
    if (!head) return null
    if (!head.next) return head
    let slow = head, fast = head.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }
    const postHead = slow.next
    slow.next = null
    let left = sortList(head)
    let right = sortList(postHead)

    const _Vnode = new ListNode(0)
    let fastVnode = _Vnode
    while (left && right) {
        if (left.val < right.val) {
            fastVnode.next = left
            left = left.next
        }else {
            fastVnode.next = right
            right = right.next
        }
        fastVnode = fastVnode.next
    }
    if (left) {
        fastVnode.next = left
    }
    if (right) {
        fastVnode.next = right
    }
    return _Vnode.next
};

```

## 🎯 3.哈希表

### 💡 1.有效的字母异位词.ts
```typescript
/**
 * @url https://leetcode.cn/problems/valid-anagram/description/
 */

function isAnagram(s: string, t: string): boolean {
    const mapS = new Map()
    for (let i = 0; i < s.length; i++) {
        if (mapS.has(s[i])) {
            mapS.set(s[i], mapS.get(s[i]) + 1)
        } else {
            mapS.set(s[i], 1)
        }
    }
    for (let i = 0; i < t.length; i++) {
        if (mapS.has(t[i])) {
            mapS.set(t[i], mapS.get(t[i]) - 1)
        } else {
            return false
        }
    }

    for (let value of mapS.values()) {
        if (value !== 0) return false
    }
    return true
}
// notice：使用Map能够覆盖所有情况的字母异味词

```

### ⭐ 2.两个数组的交集.ts
```typescript
/**
 * @url https://leetcode.cn/problems/intersection-of-two-arrays/description/
 */
function intersection(nums1: number[], nums2: number[]): number[] {
    const set = new Set()
    const set1 = new Set()
    nums1.forEach((_num) => set.add(_num))
    nums2.forEach((_num) => {
        if (set.has(_num)) {
            set1.add(_num)
        }
    })
    return Array.from(set1) as number[]
}

// notice：在add的时候就已经去重了

```

### 🎲 3.快乐数.ts
```typescript
/**
 * @url https://leetcode.cn/problems/happy-number/description/
 */

// notice:取模技巧  从个位开始取
const getNext = (n) => {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
};

const getSqrtNum = (num: string) => {
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    sum += Math.pow(Number(num[i]), 2);
  }
  return sum;
};
function isHappy(n: number): boolean {
  const set = new Set();
  while (true) {
    if (n === 1) {
      return true;
    }
    if (set.has(n)) return false;
    set.add(n);
    n = getSqrtNum(n.toString());
  }
}

```

### 🎯 4.两数之和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/two-sum/description/
 */
function twoSum(nums: number[], target: number): number[] {
    const map = new Map()
    for (let index = 0; index < nums.length; index++) {
        if (map.has(target - nums[index])) {
            return [index, map.get(target - nums[index])]
        }
        map.set(nums[index], index)
    }
    return [-1, -1]
}

```

### 🎮 5.四数之和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/4sum-ii/description/
 */
// function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
//     let res1: number[] = [],
//         res2: number[] = [],
//         count = 0
//     for (let i = 0; i < nums1.length; i++) {
//         for (let j = 0; j < nums2.length; j++) {
//             res1.push(nums1[i] + nums2[j])
//         }
//     }
//     for (let i = 0; i < nums3.length; i++) {
//         for (let j = 0; j < nums4.length; j++) {
//             res2.push(nums3[i] + nums4[j])
//         }
//     }

//     for (let i = 0; i < res1.length; i++) {
//         for (let j = 0; j < res2.length; j++) {
//             if (res1[i] + res2[j] === 0) {
//                 count++
//             }
//         }
//     }
//     return count
// }

function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let map1 = new Map(),
    map2 = new Map(),
    count = 0;

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      let sum = nums1[i] + nums2[j];
      if (map1.has(sum)) {
        map1.set(sum, map1.get(sum) + 1);
      } else {
        map1.set(sum, 1);
      }
    }
  }

  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      let sum = nums3[i] + nums4[j];
      if (map2.has(sum)) {
        map2.set(sum, map2.get(sum) + 1);
      } else {
        map2.set(sum, 1);
      }
    }
  }

  for (let [key1, value1] of map1.entries()) {
    for (let [key2, value2] of map2.entries()) {
      if (key1 + key2 === 0) {
        count += value1 * value2;
      }
    }
  }

  return count;
}
// notice:用数组来比较，最后会展示超时，优化的点就是利用Map减少最后遍历的次数

```

### 🎲 6.赎金信.ts
```typescript
/**
 * @url https://leetcode.cn/problems/ransom-note/description/
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
    let arr = new Array(26).fill(0)
    for (let index = 0; index < magazine.length; index++) {
        arr[magazine[index].charCodeAt(0) - "a".charCodeAt(0)]++
    }
    for (let index = 0; index < ransomNote.length; index++) {
        arr[ransomNote[index].charCodeAt(0) - "a".charCodeAt(0)]--
    }
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] < 0) {
            return false
        }
    }
    return true
}

```

### 🌟 7.三数之和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/3sum/description/
 */

// -1 -1 -1 0 1 2
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    const res: number[][] = []

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        let left = i + 1,
            right = nums.length - 1
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right]
            if (sum === 0) {
                while (nums[left] === nums[left + 1]) {
                    left++
                }
                while (nums[right] === nums[right - 1]) {
                    right--
                }
                res.push([nums[i], nums[left], nums[right]])
                right--
                left++
            } else if (sum < 0) {
                left++
            } else {
                right--
            }
        }
    }

    return res
}

// notice：固定两边移动之间是可以覆盖全的，排列组合计算方式
// todo:难点，关于找到后去重

```

### 🧩 8.四数之和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/4sum/
 */
// 这里的不重复是指值不能重复
// 2 2 2 1 1
function fourSum(nums: number[], target: number): number[][] {
    const res: number[][] = []
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i - 1] === nums[i]) {
            continue
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue // 如果是初始给过滤，那么将不会获取到这个值
            let left = j + 1,
                right = nums.length - 1
            while (left < right) {
                let sum = nums[left] + nums[right] + nums[i] + nums[j]
                if (sum === target) {
                    res.push([nums[left], nums[right], nums[i], nums[j]])
                    while (nums[left] === nums[left + 1]) {
                        left++
                    }
                    while (nums[right] === nums[right - 1]) {
                        right--
                    }
                    left++
                    right--
                } else if (sum > target) {
                    right--
                } else {
                    left++
                }
            }
        }
    }
    return res
}

// -2 -1 0 0 1 2

```

### 🔰 9.字符异位词分组.ts
```typescript
/**
 * @url https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked
 */

// ps:map的key用charcode拼接为字符串的值来区分
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map()
    for (let i = 0; i < strs.length; i++) {
        const charArray = new Array(26).fill(0)
        // 遍历每个字符串
        for (let j = 0; j < strs[i].length; j++) {
            const diff = strs[i][j].charCodeAt(0) - 'a'.charCodeAt(0)
            charArray[diff]++
        }
        const charStr = charArray.join('-') // 这里的key注意有区分度
        if (map.has(charStr)) {
            const val = map.get(charStr)
            val.unshift(strs[i])
            map.set(charStr, val)
        } else {
            const res = []
            res.push(strs[i])
            map.set(charStr, res)
        }
    }
    return Array.from(map.values())
};

let strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
console.log('groupAnagrams(strs)', groupAnagrams(strs))

const set = new Set()
set.add('hello word')
set.add('hello word1')
set.add('hello word2')
set.add('hello word3')
```

### 🎯 10.最长连续序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const set: Set<number> = new Set(nums)
    let res = 0
    for (let num of set.values()) {
        // ps：这里进行了剪枝操作
        if (!set.has(num - 1)) {
            let count = 0
            while (set.has(num)) {
                count++
                num++
            }
            res = Math.max(res, count)
        }

    }
    return res
};
```

## 🎮 4.字符串

### ✨ 1.反转字符串.ts
```typescript
/**
 * @url https://leetcode.cn/problems/reverse-string/
 */

function reverseString(s: string[]): void {
    let left = 0,
        right = s.length - 1
    while (right > left) {
        ;[s[right], s[left]] = [s[left], s[right]]
        right--
        left++
    }
}

```

### 💡 2.反转字符串二.ts
```typescript
/**
 * @url https://leetcode.cn/problems/reverse-string-ii/
 */

// 字符串的长度为j-i+1 i+k其实就是索引在原先的基础上去加一了。所以这里判断的时候也就是判断index+k>s.length了
function reverseStr(s: string, k: number): string {
    for (let index = 0; index < s.length; index += 2 * k) {
        if (index + k > s.length) {
            s =
                s.slice(0, index) +
                s
                    .slice(index + k)
                    .split("")
                    .reverse()
                    .join("")
        } else {
            s =
                s.slice(0, index) +
                s
                    .slice(index, index + k)
                    .split("")
                    .reverse()
                    .join("") +
                s.slice(index + k)
        }
    }
    return s
}

// notice:主要坑点注意下标位置  index 后面的 index + k
// notice:index 后面的 index + k

```

### 🎨 3.反转字符串中的单词.ts
```typescript
/**
 * @url https://leetcode.cn/problems/reverse-words-in-a-string/description/
 */

// todo：获取字符串的单词
// todo：死循环？不太可能，因为每一次循环都会走一次判空和非判空的处理。
const getTokens = (s: string) => {
    let trimS = s.trim(),
        left = trimS.length - 1,
        right = trimS.length - 1,
        words: Array<string> = []
    while (left >= 0) {
        while (left >= 0 && trimS[left] !== " ") {
            left--
        }
        words.push(trimS.slice(left + 1, right + 1))
        while (left >= 0 && trimS[left] === " ") {
            left--
        }
        right = left
    }
    return words
}

function joinTokens(words: Array<string>) {
    return words
        .reduce((res, _cur) => {
            return res + " " + _cur
        }, "")
        .trimStart()
}

function reverseWords(s: string): string {
    return joinTokens(getTokens(s))
}

```

### 🎲 4.实现strStr().ts
```typescript
/**
 * @url https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/
 * @description 实际考察kmp算法，// todo
 */
function strStr(haystack: string, needle: string): number {
    return haystack.indexOf(needle)
}

```

### 🔰 5.重复的子字符串.ts
```typescript
/**
 * @url https://leetcode.cn/problems/repeated-substring-pattern/description/
 */
function repeatedSubstringPattern(s: string): boolean {
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        let len = Math.floor(s.length / s.slice(0, i + 1).length)
        if (s.slice(0, i + 1).repeat(len) === s) return true
    }
    return false
}

```

### 🔥 6.字符串压缩.ts
```typescript
/**
 * @url https://leetcode.cn/problems/string-compression/description/
 */
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars: string[]) {
    const res: Array<string> = []
    for (let i = 0; i < chars.length; i++) {
        let start = i
        let count = 1
        while (chars[start] === chars[start + 1]) {
            start++
            count++
        }
        res.push(chars[i])
        if (count !== 1) {
            for (let item of count.toString().split('')) {
                res.push(item)
            }
        }
        i = start
    }
    chars.splice(0, res.length)
    chars.unshift(...res)
    return res.length
};
```

### 🎮 7.无重复字符的最长子串.ts
```typescript
/**
 * @url https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let res = 0 // 结果
    let slow = 0

    for (let fast = 0; fast < s.length; fast++) {
        const cur = s[fast]
        const str = s.slice(slow, fast)
        const idx = str.indexOf(cur)
        if (idx !== -1) {
            slow += idx + 1
        }
        res = Math.max(res, fast - slow + 1)
    }
    return res
};
```

### 🚀 8.找到字符串所有字母异味词.ts
```typescript
/**
 * @url https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// @ts-nocheck
// 字符串 -> 下标26位索引
const generateKey = (str) => {
    const positionArray = new Array(26).fill(0)
    for (let i = 0; i < str.length; i++) {
        const diff = str[i].charCodeAt(0) - 'a'.charCodeAt(0)
        positionArray[diff]++
    }
    return positionArray.join('-')
}

var findAnagrams = function (s, p) {
    const key = generateKey(p)
    const res = []
    for (let i = 0; i < s.length - p.length + 1; i++) {
        const str = s.slice(i, i + p.length)
        const strKey = generateKey(str)
        if (strKey === key) {
            res.push(i)
        }
    }
    return res
};
```

### 🎮 9.最小覆盖子串.ts
```typescript
/**
 * @url https://leetcode.cn/problems/minimum-window-substring/description/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    const map1 = new Map()
    for (let char of t) {
        map1.set(char, (map1.get(char) ?? 0) + 1)
    }
    let slow = 0, fast = 0, count = Number.MAX_SAFE_INTEGER, res = '', formed = 0
    const map2 = new Map()
    while (fast < s.length) {
        const char = s[fast]
        map2.set(char, (map2.get(char) ?? 0) + 1)
        // 判断当前字符满不满足要求
        if (map1.get(char) === map2.get(char)) {
            formed++
        }
        // 滑动窗口进行缩小
        while (formed === map1.size && slow <= fast) {
            const len = fast - slow + 1
            if (len < count) {
                res = s.slice(slow, fast + 1)
                count = len
            }
            const slowChar = s[slow]
            map2.set(slowChar, (map2.get(slowChar) ?? 0) - 1)
            // ps: 注意这块的一个判断条件，只有小于，才会是不满足！！！
            if (map1.get(slowChar) > map2.get(slowChar)) {
                formed--
            }
            slow++
        }
        fast++
    }
    return res
};
```

### 🚀 10.字符串解码.ts
```typescript
/**
 * @url https://leetcode.cn/problems/decode-string/description/?envType=study-plan-v2&envId=top-100-liked
 */

// @ts-nocheck

/**
 * @param {string} s
 * @return {string}
 */

// "3[a]2[bc]"
var decodeString = function (s: string) {
    const stack: Array<string> = []
    if (s.length === 0) return ''
    for (let i = 0; i < s.length; i++) {
        const curWord = s[i]
        if (curWord === ']') {
            const tmpStrArray: string[] = []
            while (stack.length && stack[stack.length - 1] !== '[') {
                tmpStrArray.push(stack.pop())
            }
            stack.pop() // 去掉左括号
            const numArr: number[] = []
            while (stack[stack.length - 1] >= '0' && stack[stack.length - 1] <= '9') {
                numArr.unshift(stack.pop())
            }
            let num = Number(numArr.join(''))
            while (num--) {
                stack.push(...tmpStrArray.toReversed())
            }
        } else {
            stack.push(curWord)
        }
    }
    return stack.join('')
};
```

## 🎮 5.栈与队列

### 🎯 1.用栈实现队列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/implement-queue-using-stacks/description/
 */
class MyQueue {
    queue: Array<number>
    constructor() {
        this.queue = []
    }

    push(x: number): void {
        this.queue.push(x)
    }

    pop(): number {
        return this.queue.shift() || 0
    }

    peek(): number {
        return this.queue.concat([]).shift() || 0
    }

    empty(): boolean {
        return this.queue.length === 0
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

```

### 💡 2.用队列实现栈.ts
```typescript
/**
 * @url https://leetcode.cn/problems/implement-stack-using-queues/description/
 */

class MyStack {
    queue: Array<number>
    constructor() {
        this.queue = []
    }

    push(x: number): void {
        this.queue.push(x)
    }

    pop(): number {
        return this.queue.pop() || -1
    }

    top(): number {
        return this.queue.concat([]).pop() || -1
    }

    empty(): boolean {
        return this.queue.length === 0
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

```

### ✨ 3.有效的括号.ts
```typescript
/**
 * @url https://leetcode.cn/problems/valid-parentheses/
 */
function isValid(s: string): boolean {
    let obj = {
            ")": "(",
            "}": "{",
            "]": "[",
        },
        stack: Array<string> = []
    for (let i = 0; i < s.length; i++) {
        if (obj[s[i]] && stack.length > 0) {
            const top = stack[stack.length - 1]
            if (top === obj[s[i]]) {
                stack.pop()
            } else {
                stack.push(s[i])
            }
        } else {
            stack.push(s[i])
        }
    }

    return stack.length === 0
}

```

### ✨ 4.删除字符串中的所有相邻重复项.ts
```typescript
/**
 * @url https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/
 */
function removeDuplicates(s: string): string {
    const sArray = s.split("")
    let stack: Array<string> = []
    for (let i = 0; i < sArray.length; i++) {
        if (stack.length === 0) {
            stack.push(sArray[i])
        } else {
            let top = stack[stack.length - 1]
            // let top = stack.concat().pop() // todo 这样会超时
            if (sArray[i] === top) {
                stack.pop()
            } else {
                stack.push(sArray[i])
            }
        }
    }
    return stack.join("")
}
// notice:超时我就不是很理解

```

### 🚀 5.逆波兰表达式求值.ts
```typescript
/**
 * @url https://leetcode.cn/problems/evaluate-reverse-polish-notation/description/
 */

const operators = ["+", "-", "*", "/"]
type computeType = "+" | "-" | "*" | "/"
const compute = (operators: computeType, top1: string, top2: string) => {
    switch (operators) {
        case "+":
            return String(Number(top1) + Number(top2))
        case "-":
            return String(Number(top1) - Number(top2))
        case "*":
            return String(Number(top1) * Number(top2))
        case "/":
            return String(Number.parseInt(String(Number(top1) / Number(top2)))) //notice: Math.floor向下取整,注意负数的形式。 -0.4 会取整为-1
    }
}

function evalRPN(tokens: string[]): number {
    let stack: Array<string> = [] // 存储栈
    for (let i = 0; i < tokens.length; i++) {
        console.log("tokens", stack)

        if (operators.includes(tokens[i])) {
            if (stack.length < 2) {
                stack.push(tokens[i])
            } else {
                const top2 = stack.pop()
                const top1 = stack.pop()
                stack.push(compute(tokens[i] as computeType, top1!, top2!))
            }
        } else {
            stack.push(tokens[i])
        }
    }
    return Number(stack.pop())
}

// console.log(evalRPN(["2", "1", "+", "3", "*"]))
// console.log(evalRPN(["4", "13", "5", "/", "+"]))

```

### 🚀 6.滑动窗口求最大值.todo.ts
```typescript
/**
 * @url https://leetcode.cn/problems/sliding-window-maximum/description/
 */

```

### 🔰 7.前k个高频元素.todo.ts
```typescript
/**
 * @url https://leetcode.cn/problems/top-k-frequent-elements/description/
 */

```

### ✨ 8.移除无效的括号.ts
```typescript
/**
 * @url https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/description/
 */

/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
    const indexArray = new Array(s.length).fill(false)
    const strArray: Array<number> = []
    for (let i = 0; i < s.length; i++) {
        const str = s[i]
        if (str === '(') {
            strArray.push(i)
            indexArray[i] = true
        }
        if (str === ')') {
            if (strArray.length === 0) {
                indexArray[i] = true
            } else {
                const idx = strArray.pop()
                indexArray[idx!] = false
            }
        }
    }
    const res: Array<string> = []
    for (let i = 0; i < s.length; i++) {
        if (!indexArray[i]) {
            res.push(s[i])
        }
    }
    return res.join('')
};
```

### 🧩 9.删除无效的括号.ts
```typescript
/**
 * @url https://leetcode.cn/problems/remove-invalid-parentheses/description/
 */

// ps =================================

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
    let l = 0, r = 0 // 左括号需要删除的数量，右括号需要删除的数量
    const set = new Set()
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            l++
        } else if (s[i] === ')') {
            if (l > 0) {
                l--
            } else {
                r++
            }
        }
    }

    const dfs = (l, r, idx, score, path) => {
        if (score < 0) return // 小于0代表已经不合法了
        if (idx === s.length) {
            if (score === 0) {
                set.add(path.join(''))
            }
            return
        }
        const word = s[idx]
        if (word === '(') {
            if (l > 0) {
                dfs(l - 1, r, idx + 1, score, [...path])
            }
            path.push(word)
            dfs(l, r, idx + 1, score + 1, [...path])
        } else if (word === ')') {
            if (r > 0) {
                dfs(l, r - 1, idx + 1, score, [...path])
            }
            path.push(word)
            dfs(l, r, idx + 1, score - 1, [...path])
        } else {
            path.push(word)
            dfs(l, r, idx + 1, score, [...path])
        }
    }
    dfs(l, r, 0, 0, [])
    return Array.from(set)
};

```

## 🌟 6.二叉树

### 📚 1.二叉树的递归遍历.ts
```typescript
/**
 * @description 前序遍历
 * @url https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
 *
 * @description 中序遍历
 * @url https://leetcode.cn/problems/binary-tree-inorder-traversal/description/
 *
 * @description 后序遍历
 * @url https://leetcode.cn/problems/binary-tree-postorder-traversal/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

/** 前序遍历 */
function preorderTraversal(root: TreeNode | null): number[] {
    let stack: number[] = []
    if (!root) return stack
    stack.push(root.val)
    stack.push(...preorderTraversal(root.left))
    stack.push(...preorderTraversal(root.right))
    return stack
}

/** 中序遍历 */
function inorderTraversal(root: TreeNode | null): number[] {
    let stack: number[] = []
    if (!root) return stack
    stack.push(...inorderTraversal(root.left))
    stack.push(root.val)
    stack.push(...inorderTraversal(root.right))
    return stack
}

/** 后续遍历 */
function postorderTraversal(root: TreeNode | null): number[] {
    let stack: number[] = []
    if (!root) return stack
    stack.push(...postorderTraversal(root.left))
    stack.push(...postorderTraversal(root.right))
    stack.push(root.val)
    return stack
}

```

### ✨ 2.二叉树的迭代遍历.ts
```typescript
/**
 * @description 迭代遍历
 * @url url是1中的
 */

// notice:处理节点和遍历节点

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

let root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null))

/** 前序遍历 */
function preorderTraversal(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let top = stack.pop()
        if (top) {
            result.push(top.val)
            stack.push(top.right)
            stack.push(top.left)
        }
    }
    return result
}

/** 中序遍历 */
// 左中右
// TODO:可以再来尝试一下
function inorderTraversal(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    while (root || stack.length !== 0) {
        if (root) {
            stack.push(root)
            root = root?.left
        } else {
            let node = stack.pop()
            root = node || null
            if (node) {
                result.push(node.val)
            }
            root = root?.right || null
        }
    }

    return result
}

/** 后续遍历 */
// TODO:先写前序，改变前序的顺序，然后反转前序遍历的数组
function postorderTraversal(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let top = stack.pop()
        if (top) {
            result.push(top?.val)
            stack.push(top.left)
            stack.push(top.right)
        }
    }
    return result.reverse()
}

```

### 🔥 3.二叉树的层序遍历.ts
```typescript
/**
 * @url https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 */
// 层序遍历用队列
function levelOrder(root: TreeNode | null): number[][] {
    let stack: Array<TreeNode | null> = [],
        result: number[][] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        const copyStack = stack.concat([])
        const res: number[] = []
        for (let i = 0; i < copyStack.length; i++) {
            const queue = stack.shift()
            if (queue) {
                res.push(queue.val)
            }
            if (queue?.left) {
                stack.push(queue.left)
            }
            if (queue?.right) {
                stack.push(queue.right)
            }
        }
        result.push(res)
    }
    return result
}

/**
 * @url https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/
 */
function levelOrderBottom(root: TreeNode | null): number[][] {
    let stack: Array<TreeNode | null> = [],
        result: number[][] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let traverseStack = stack.concat(),
            temRes: number[] = []
        for (let i = 0; i < traverseStack.length; i++) {
            let top = stack.shift()
            if (top) {
                temRes.push(top?.val)
            }
            if (top?.left) {
                stack.push(top.left)
            }
            if (top?.right) {
                stack.push(top.right)
            }
        }
        result.push(temRes)
    }
    return result.reverse()
}

/**
 * @url https://leetcode.cn/problems/binary-tree-right-side-view/
 */
function rightSideView(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let traverseStack = stack.concat(),
            temRes: number[] = []
        for (let i = 0; i < traverseStack.length; i++) {
            let top = stack.shift()
            if (top) {
                temRes.push(top?.val)
            }
            if (top?.left) {
                stack.push(top.left)
            }
            if (top?.right) {
                stack.push(top.right)
            }
        }
        result.push(temRes[temRes.length - 1])
    }
    return result
}

/**
 * @url https://leetcode.cn/problems/average-of-levels-in-binary-tree/description/
 */
function averageOfLevels(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let traverseStack = stack.concat(),
            temRes: number[] = []
        for (let i = 0; i < traverseStack.length; i++) {
            let top = stack.shift()
            if (top) {
                temRes.push(top?.val)
            }
            if (top?.left) {
                stack.push(top.left)
            }
            if (top?.right) {
                stack.push(top.right)
            }
        }
        result.push(
            temRes.reduce((acc, cur) => {
                return acc + cur
            }, 0) / temRes.length
        )
    }
    return result
}

/**
 * @url https://leetcode.cn/problems/n-ary-tree-level-order-traversal/description/
 */

// class _Node {
//     val: number
//     children: _Node[]
//     constructor(v: number) {
//         this.val = v
//         this.children = []
//     }
// }

// function levelOrderN(root: _Node | null): number[][] {
//     let stack: Array<_Node | null> = [],
//         result: number[][] = []
//     if (!root) return result
//     stack.push(root)
//     while (stack.length) {
//         let traverseStack = stack.concat(),
//             temRes: number[] = []
//         for (let i = 0; i < traverseStack.length; i++) {
//             let top = stack.shift()
//             if (top) {
//                 temRes.push(top?.val)
//             }
//             if (top?.children.length) {
//                 top.children.forEach((_childNode) => {
//                     stack.push(_childNode)
//                 })
//             }
//         }
//         result.push(temRes)
//     }
//     return result
// }

/**
 * @description 在每个树行中找最大值
 * @url https://leetcode.cn/problems/find-largest-value-in-each-tree-row/description/
 */

function largestValues(root: TreeNode | null): number[] {
    let stack: Array<TreeNode | null> = [],
        result: number[] = []
    if (!root) return result
    stack.push(root)
    while (stack.length) {
        let traverseStack = stack.concat(),
            temRes: number[] = []
        for (let i = 0; i < traverseStack.length; i++) {
            let top = stack.shift()
            if (top) {
                temRes.push(top?.val)
            }
            if (top?.left) {
                stack.push(top.left)
            }
            if (top?.right) {
                stack.push(top.right)
            }
        }
        result.push(Math.max(...temRes))
    }
    return result
}

class _Node {
    val: number
    left: _Node | null
    right: _Node | null
    next: _Node | null
    constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
        this.next = next === undefined ? null : next
    }
}
/**
 * @description 填充每个节点的下一个右侧节点指针
 * @url https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/description/
 */
function connect(root: _Node | null): _Node | null {
    let stack: Array<_Node | null> = []
    if (!root) return root
    stack.push(root)
    while (stack.length) {
        let tempQueue = stack.concat()
        for (let i = 0; i < tempQueue.length; i++) {
            let _node = stack.shift()
            if (tempQueue.length !== 1) {
                if (i !== tempQueue.length - 1) {
                    _node!.next = stack[0]
                }
            }
            if (_node?.left) {
                stack.push(_node?.left)
            }
            if (_node?.right) {
                stack.push(_node?.right)
            }
        }
    }
    return root
}

/**
 * @description 最大深度
 * @url https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
 */
function maxDepth(root: TreeNode | null): number {
    let stack: Array<TreeNode | null> = [],
        depth = 0
    if (!root) return depth
    stack.push(root)
    while (stack.length) {
        let tempStack = stack.concat()
        for (let i = 0; i < tempStack.length; i++) {
            let node = stack.pop()
            node?.left && stack.push(node.left)
            node?.right && stack.push(node.right)
        }
        depth += 1
    }
    return depth
}

/**
 * @description 最小深度
 * @url https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
 */
function minDepth(root: TreeNode | null): number {
    let stack: Array<TreeNode | null> = [],
        depth = 0
    if (!root) return depth
    stack.push(root)

    while (stack.length) {
        let tempStack = stack.concat()
        let flag = false
        for (let i = 0; i < tempStack.length; i++) {
            let node = stack.shift()

            if (!node?.left && !node?.right) {
                flag = true
            }

            node?.left && stack.push(node.left)
            node?.right && stack.push(node.right)
        }
        depth += 1

        if (flag) {
            return depth
        }
    }
    return depth
}

```

### 🔥 4.翻转二叉树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/invert-binary-tree/description/
 */

import { rootCertificates } from "tls"

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null
    if (root) {
        let p = root.left
        root.left = root.right
        root.right = p
        invertTree(root.left)
        invertTree(root.right)
    }
    return root
}

```

### 💡 5.对称二叉树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/symmetric-tree/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// notice:compare比较单个单点的函数，然后比较左子树，右子树的节点

function isSymmetric(root: TreeNode | null): boolean {
    const compare = (left: TreeNode | null, right: TreeNode | null) => {
        const specialCondition = (left && !right) || (!left && right)
        const empty = !left && !right
        if (specialCondition) {
            return false
        }
        if (empty) {
            return true
        }
        if (left?.val !== right?.val) {
            return false
        }
        const inSide = compare(left!.left, right!.right)
        const outSide = compare(left!.right, right!.left)
        return inSide && outSide
    }
    if (!root) return true
    return compare(root.left, root.right)
}

/**
 * @description 相同的树
 * @url https://leetcode.cn/problems/same-tree/
 */
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    const compare = (p: TreeNode | null, q: TreeNode | null) => {
        // 比较单节点
        const special = (!p && q) || (p && !q)
        if (special) return false
        const isEmpty = !p && !q
        if (isEmpty) return true
        if (p?.val !== q?.val) return false
        // 比较子树
        return compare(p!.left, q!.left) && compare(p!.right, q!.right)
    }
    return compare(p, q)
}

/**
 * @description 另一个树的子树
 * @url https://leetcode.cn/problems/subtree-of-another-tree/description/
 */

// compare比较根节点相同的两个子树是否相同
const compare = (root: TreeNode | null, subRoot: TreeNode | null) => {
    const specialCondition = (root && !subRoot) || (!root && subRoot)
    const empty = !root && !subRoot
    if (specialCondition) {
        return false
    }
    if (empty) {
        return true
    }
    if (root?.val !== subRoot?.val) {
        return false
    }
    return compare(root!.left, subRoot!.left) && compare(root!.right, subRoot!.right)
}
function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    // 对root进行dfs的遍历
    if (!root) return false
    return compare(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}

```

### 🎮 6.二叉树的最大深度.ts
```typescript
/**
 * @description 递归法
 * @url https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// 自上而下求深度
function maxDepth(root: TreeNode | null): number {
    const dfs = (root, depth) => {
        if (!root) return depth
        return Math.max(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
    }
    return dfs(root, 0)
}
// 自下而上求高度
function maxDepthDeep(root: TreeNode | null): number {
    const dfs = (root) => {
        if (!root) return 0
        return 1 + Math.max(dfs(root.left), dfs(root.right))
    }
    return dfs(root)
}

```

### 🎨 7.二叉树的最小深度.ts
```typescript
/**
 * @url https://leetcode.cn/problems/minimum-depth-of-binary-tree/description/
 */

// TODO:有特殊case，单链表类型的特殊case
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// 通过计算高度来算的
function minDepth(root: TreeNode | null): number {
    const dfs = (root: TreeNode | null) => {
        if (!root) return 0
        if (!root.left && root.right) {
            return 1 + dfs(root.right)
        }
        if (root.left && !root.right) {
            return 1 + dfs(root.left)
        }
        return 1 + Math.min(dfs(root.left), dfs(root.right))
    }
    return dfs(root)
}

// 通过深度来计算
function minDepthTwo(root: TreeNode | null): number {
    const dfs = (root: TreeNode | null, depth) => {
        if (!root) return 0
        if (!root.left && root.right) {
            return dfs(root.right, depth + 1)
        }
        if (root.left && !root.right) {
            return dfs(root.left, depth + 1)
        }
        return Math.min(dfs(root.left, depth + 1), dfs(root.right, depth + 1))
    }
    return dfs(root, 0)
}

```

### 🎯 8.完全二叉树的节点个数.ts
```typescript
/**
 * @url https://leetcode.cn/problems/count-complete-tree-nodes/description/
 * @videoUrl https://www.bilibili.com/video/BV1eW4y1B7pD/?spm_id_from=333.788&vd_source=1c79b7395f5d242a2f6786026aac6213
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// TODO:完全二叉树和满二叉树的概念

function countNodes(root: TreeNode | null): number {
    if (!root) {
        // console.log(leftDepth, rightDepth)
        return 0
    }

    let left = root.left,
        right = root.right,
        leftDepth = 1,
        rightDepth = 1
    while (left) {
        left = left.left
        leftDepth++
    }
    while (right) {
        right = right.right
        rightDepth++
    }
    if (leftDepth === rightDepth) {
        if (leftDepth !== 1) {
            return 2 ** leftDepth - 1
        }
        return 1
    }

    return 1 + countNodes(root.left) + countNodes(root.right)
}

// let root = new TreeNode(1)
// console.log(countNodes(root))

```

### 📚 9.平衡二叉树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/balanced-binary-tree/description/
 * @videoUrl https://www.bilibili.com/video/BV1Ug411S7my/?spm_id_from=333.788&vd_source=1c79b7395f5d242a2f6786026aac6213
 */

// TODO:准备二刷了（高度和深度的理解）
// 这题只能求高度
function isBalanced(root: TreeNode | null): boolean {
    const dfs = (root: TreeNode | null) => {
        if (!root) return 0
        // notice:单层递归的逻辑
        let leftHeight = dfs(root.left)
        if (leftHeight === -1) {
            return -1
        }
        let rightHeight = dfs(root.right)
        if (rightHeight === -1) {
            return -1
        }
        return Math.abs(leftHeight - rightHeight) > 1 ? -1 : Math.max(leftHeight, rightHeight) + 1
    }
    if (!root) return true
    return dfs(root) !== -1
}

```

### 🎨 10.二叉树的所有路径.ts
```typescript
/**
 * @url https://leetcode.cn/problems/binary-tree-paths/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
function binaryTreePaths(root: TreeNode | null): string[] {
    let path: Array<string> = []
    const dfs = (root: TreeNode | null | undefined, pathTempArray: Array<string>) => {
        if (!root) return
        pathTempArray.push(String(root?.val))

        if (!root?.left && !root?.right) {
            path.push(pathTempArray.join("->"))
            return
        }
        dfs(root?.left, pathTempArray.concat())
        dfs(root?.right, pathTempArray.concat())
    }
    dfs(root, [])
    return path
}

```

### 🧩 11.左叶子之和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/sum-of-left-leaves/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function sumOfLeftLeaves(root: TreeNode | null): number {
  let sum = 0;
  const dfs = (root: TreeNode | null | undefined) => {
    if (!root) return;
    if (root.left && !root.left.left && !root.left.right) {
      sum += root.left.val;
      // return
      // PS:notice：这里容易return掉
    }
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return sum;
}

// ;[3, 9, 20, null, null, 15, 7]

let root = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(sumOfLeftLeaves(root));

```

### 📚 12.找树左下角的值.ts
```typescript
/**
 * @url https://leetcode.cn/problems/find-bottom-left-tree-value/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function findBottomLeftValue(root: TreeNode | null): number {
  let maxDepth = Number.MIN_SAFE_INTEGER,
    res;
  const dfs = (root: TreeNode | null | undefined, depth) => {
    if (!root) return -1;
    if (!root.left && !root.right) {
      if (maxDepth < depth) {
        maxDepth = depth;
        res = root.val;
        return;
      }
    }
    // 找最左下角的值，所以先遍历左边，然后先判断下手为强
    dfs(root.left, depth + 1);
    dfs(root.right, depth + 1);
  };
  dfs(root, 1);
  return res;
}

// 层序遍历去做，不过会超时
// function findBottomLeftValue(root: TreeNode | null): number {
//     let val  = 0;
//     const stack = []
//     stack.push(root)
//     while(stack.length){
//         let copyStack = stack.concat()
//         console.log(copyStack)
//         for(let i = 0; i < copyStack.length; i++){
//             const top = stack.shift()
//             if(i === 0){
//                 val = top.val
//             }
//             if(top?.left){
//                 stack.push(top.left)
//             }
//             if(top?.right){
//                 stack.push(top.right)
//             }
//         }
//     }
//     return val
// };

```

### 🎨 13.路径总和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/path-sum/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    const dfs = (root: TreeNode | null, sum) => {
        if (!root) {
            // 这里返回什么都无所谓，主要是return 掉
            return 0
        }
        if (!root.left && !root.right) {
            sum += root.val
            if (sum === targetSum) {
                return true
            } else {
                return false
            }
        }

        return dfs(root.left, sum + root.val) || dfs(root.right, sum + root.val)
    }
    return dfs(root, 0)
}

```

### 🎮 14.从中序与后序遍历序列构造二叉树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 * @videoUrl https://www.bilibili.com/video/BV1vW4y1i7dn/?vd_source=1c79b7395f5d242a2f6786026aac6213
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (postorder.length === 0) return null
    let midValue = postorder.pop()
    const root = new TreeNode(midValue)
    let _index = inorder.indexOf(midValue!)
    root.left = buildTree(inorder.slice(0, _index), postorder.slice(0, _index)) // notice：注意中间节点需要去掉
    root.right = buildTree(inorder.slice(_index + 1), postorder.slice(_index))
    return root
}

/**
 * @description 从前序与中序遍历序列构造二叉树
 * @url https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null
    let _mid = preorder.shift() // notice:一定要注意！！！真的闹糊涂了
    let _root = new TreeNode(_mid)
    let _index = inorder.indexOf(_mid!)
    _root.left = buildTree(preorder.slice(0, _index), inorder.slice(0, _index))
    _root.right = buildTree(preorder.slice(_index), inorder.slice(_index + 1))
    return _root
}

```

### 📚 15.最大二叉树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/maximum-binary-tree/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
    if (nums.length === 0) return null
    if (nums.length === 1) return new TreeNode(nums[0])
    let _maxIdx = nums.indexOf(Math.max(...nums))
    let _root = new TreeNode(nums[_maxIdx])
    _root.left = constructMaximumBinaryTree(nums.slice(0, _maxIdx))
    _root.right = constructMaximumBinaryTree(nums.slice(_maxIdx + 1))
    return _root
}

```

### 🎲 16.合并二叉树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/merge-two-binary-trees/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (!root1 && !root2) {
        return null
    }
    if (!root1) return root2
    if (!root2) return root1
    root1.left = mergeTrees(root1.left, root2.left)
    root1.right = mergeTrees(root1.right, root2.right)
    root1.val += root2.val

    return root1
}

```

### 🔰 17.二叉搜索树的搜索.ts
```typescript
/**
 * @url https://leetcode.cn/problems/search-in-a-binary-search-tree/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
// TODO:注意二叉搜索树的特性
/** 暴力法 */
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return null

        if (root.left) {
            const res = dfs(root.left)
            if (res) {
                return res
            }
        }

        if (root.val === val) {
            return root
        }
        if (root.right) {
            const res = dfs(root.right)
            if (res) {
                return res
            }
        }
        return null
    }
    return dfs(root)
}

/** 利用二叉搜索树的特性法 */
function searchBSTDeep(root: TreeNode | null, val: number): TreeNode | null {
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return null

        if (root.val === val) {
            return root
        } else if (root.val < val && root.right) {
            const res = dfs(root.right)
            if (res) {
                return res
            }
        } else {
            if (root.left) {
                const res = dfs(root.left)
                if (res) {
                    return res
                }
            }
        }

        return null
    }
    return dfs(root)
}

```

### 🎲 18.验证二叉搜索树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/validate-binary-search-tree/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// TODO:细节挺多的
function isValidBST(root: TreeNode | null): boolean {
    let last: TreeNode
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return true
        const left = dfs(root.left)
        if (last && root.val <= last.val) return false
        last = root
        const right = dfs(root.right)
        return left && right
    }
    return dfs(root)
}

```

### 🚀 19.二叉搜索树的最小绝对值差.ts
```typescript
/**
 * @url https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

function getMinimumDifference(root: TreeNode | null): number {
    let pre: TreeNode,
        res = Number.MAX_SAFE_INTEGER
    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return Number.MAX_SAFE_INTEGER
        dfs(root.left)
        if (pre) {
            res = Math.min(Math.abs(root.val - pre.val), res)
        }
        pre = root
        dfs(root.right)
        return res
    }
    return dfs(root)
}

```

### 🔰 20.二叉搜索树的众数.ts
```typescript
/**
 * @url https://leetcode.cn/problems/find-mode-in-binary-search-tree/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// TODO:有坑
function findMode(root: TreeNode | null): number[] {
    let res: number[] = [],
        maxCount = Number.MIN_SAFE_INTEGER,
        prev: TreeNode | null | undefined,
        curCount = 0

    const dfs = (root: TreeNode | null | undefined) => {
        if (!root) return
        dfs(root.left)
        if (prev && root.val === prev.val) {
            curCount++
            if (curCount === maxCount) {
                res.push(root.val)
            } else if (curCount > maxCount) {
                res = []
                res.push(root.val)
                maxCount = curCount
            }
        } else {
            curCount = 1
        }
        if (!prev) {
            res.push(root.val)
        }
        prev = root

        dfs(root.right)
    }
    dfs(root)
    return res
}

// 构造二叉树
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    let _mid = preorder.shift() // notice:一定要注意！！！真的闹糊涂了
    if (preorder.length === 0) return null
    let _root = new TreeNode(_mid)
    let _index = inorder.indexOf(_mid!)
    _root.left = buildTree(preorder.slice(0, _index), inorder.slice(0, _index))
    _root.right = buildTree(preorder.slice(_index), inorder.slice(_index + 1))
    return _root
}

const root = buildTree([1, 2], [1, 2])
console.log(root)

```

### 🔰 21.二叉树的最近公共祖先.ts
```typescript
/**
 * @url https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// notice:后序遍历将结果返回上去，最后返回最终结果！
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root) return null
    if (root === q || root === p) return root
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (left && !right) {
        return left
    }
    if (!left && right) {
        return right
    }
    if (left && right) {
        return root
    }
    return null
}

```

### 🎮 22.二叉搜索树的最近公共祖先.ts
```typescript
/**
 * @url https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/
 */

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (!root) return null
    if (root === q || root === p) return root

    if (root.val > p!.val && root.val > q!.val) {
        const left = lowestCommonAncestor(root.left, p, q)
        if (left) {
            return left
        }
    }
    if (root.val < p!.val && root.val < q!.val) {
        const right = lowestCommonAncestor(root.right, p, q)
        if (right) {
            return right
        }
    }
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (!left && right) return right
    if (left && !right) return left
    if (left && right) return root
    return null
}

```

### 🧩 23.二叉搜索树的插入操作.ts
```typescript
/**
 * @url https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
// function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
//     const dfs = (root: TreeNode | null, val: number) => {
//         if (!root) {
//             return
//         }
//         if (!root.left && !root.right) {
//             // TODO:这样没有返回值的算法，会丢失掉左子树全为空的情况
//             if (root.val > val) {
//                 root.left = new TreeNode(val)
//             } else {
//                 root.right = new TreeNode(val)
//             }
//             return null
//         }
//         if (root.val > val) {
//             dfs(root.left, val)
//         }
//         if (root.val < val) {
//             dfs(root.right, val)
//         }
//     }
//     if (!root) return new TreeNode(val)
//     dfs(root, val)
//     return root
// }
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// //========
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  const dfs = (root) => {
    if (!root) return new TreeNode(val);
    if (root.val > val) {
      const left = dfs(root.left);
      root.left = left;
    } else {
      const right = dfs(root.right);
      root.right = right;
    }
    return root;
  };
  return dfs(root);
};

```

### 🧩 24.删除二叉搜索树的节点.ts
```typescript
/**
 * @url https://leetcode.cn/problems/delete-node-in-a-bst/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// notice
// 总共有五种情况
// 叶子节点，直接删掉就可以
// 没有找到节点
// 删除的节点只有左孩子，没有右孩子
// 删除的节点只有右孩子，没有左孩子
// 删除的节点既有右孩子，也有左孩子
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (root.val === key) {
    if (!root.left && !root.right) {
      return null;
    }
    if (root.left && !root.right) {
      return root.left;
    }
    if (!root.left && root.right) {
      return root.right;
    }
    if (root.left && root.right) {
      let cur = root.right;
      while (cur.left) {
        cur = cur.left;
      }
      cur.left = root.left;
      return root.right;
    }
  }

  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else {
    root.right = deleteNode(root.right, key);
  }
  return root;
}

```

### 💫 25.修剪二叉搜素树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/trim-a-binary-search-tree/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
// TODO: 如果直接返回左右子树的话，没有考虑左右子树里面还有不符合条件的子树
/**
 * 沿用上一题的思路稍微改一下就可以了。上一题只需要删除一个结点,然后直接return,导致其下面还符合条件的结点没法删除。原因是因为上一题实
   际上是个先序遍历,符合条件直接return,如果我们改为后序遍历就可以了,每次判定都会是最底下的结点先判定,也就是把判断的代码写到递归代码  
   的后面。
 */
function trimBST(
  root: TreeNode | null,
  low: number,
  high: number
): TreeNode | null {
  if (!root) return null;

  // 先处理子树里面的子树,这里的遍历顺序有一定的讲究。
  root.left = trimBST(root.left, low, high); // 需要先将左子树进行修剪。
  root.right = trimBST(root.right, low, high); // 需要将右子树进行修剪。

  if (root.val < low || root.val > high) {
    if (!root.left && !root.right) {
      return null;
    }
    if (root.left && !root.right) {
      return root.left;
    }
    if (!root.left && root.right) {
      return root.right;
    }
    if (root.left && root.right) {
      let cur = root.right;
      while (cur.left) {
        cur = cur.left;
      }
      cur.left = root.left;
      return root.right;
    }
  }
  return root;
}

```

### 🛠️ 26.将有序数组转换为二叉搜索树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  let mid = Math.floor(nums.length / 2);
  let root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));
  return root;
}

```

### 🔥 27.把二叉搜索树转换为累加树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/convert-bst-to-greater-tree/description/
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  let mid = Math.floor(nums.length / 2);
  let root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));
  return root;
}

// TODO:一种是维护全局的一个sum。代表累加的值   一种是用prev指针来指向上一个遍历的指针。
function convertBST(root: TreeNode | null): TreeNode | null {
  let sum = 0;
  const dfs = (root: TreeNode | null) => {
    if (!root) return 0;
    dfs(root.right);
    sum += root.val;
    root.val = sum;
    dfs(root.left);
  };
  dfs(root);
  return root;
}

const rootArray = [1, 2, 3, 4, 5, 6, 7, 8];
const root = sortedArrayToBST(rootArray);
console.log(convertBST(root));

```

### ⭐ 28.二叉树的直径.ts
```typescript
/**
 * @url https://leetcode.cn/problems/diameter-of-binary-tree/description/?envType=study-plan-v2&envId=top-100-liked 
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let res = 0
    const dfs = (root) => {
        if (!root) return 0
        if (!root.left && !root.right) return 1
        const lDepth = dfs(root.left)
        const rDepth = dfs(root.right)
        res = Math.max(res, lDepth + rDepth)
        return Math.max(lDepth, rDepth) + 1
    }
    dfs(root)
    return res
};
```

### 🎲 29.路径总和3.ts
```typescript
/**
 * @url https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */

const rootSum = (root, targetSum) => {
    let res = 0
    if (!root) return res
    const val = root.val
    if (val === targetSum) {
        res++
    }
    res += rootSum(root.left, targetSum - val)
    res += rootSum(root.right, targetSum - val)
    return res
}



var pathSum = function(root, targetSum) {
    if (!root) return 0
    let res = rootSum(root, targetSum)
    res += pathSum(root.left, targetSum)
    res += pathSum(root.right, targetSum)
    return res
};
```

## 📚 7.回溯算法

### 🎨 1.组合.ts
```typescript
/**
 * @url https://leetcode.cn/problems/combinations/description/
 */

// TODO:后期关于回溯的题目，统一看看是否能够剪枝。

function combine(n: number, k: number): number[][] {
    const result: Array<Array<number>> = []
    const traceBacking = (idx: number, acc: number[]) => {
        if (acc.length === k) {
            result.push(acc)
            return
        }

        for (let i = idx; i <= n; i++) {
            acc.push(i)
            traceBacking(i + 1, acc.concat([]))
            acc.pop()
        }
    }
    traceBacking(1, [])
    return result
}

```

### 🌟 2.组合总和三.ts
```typescript
/**
 * @url https://leetcode.cn/problems/combination-sum-iii/description/
 */

function combinationSum3(k: number, n: number): number[][] {
    const result: number[][] = []
    const dfs = (idx: number, path: number[]) => {
        if (path.length === k) {
            if (path.reduce((acc, cur) => acc + cur, 0) === n) {
                result.push(path)
            }
            return
        }
        for (let i = idx + 1; i <= 9; i++) {
            path.push(i)
            dfs(i, path.concat([]))
            path.pop()
        }
    }
    dfs(0, [])
    return result
}

```

### 🔥 3.电话号码的字母组合.ts
```typescript
/**
 * @url https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/
 */

function init(): Map<string, string> {
    let map = new Map()
    map.set("2", "abc")
    map.set("3", "def")
    map.set("4", "ghi")
    map.set("5", "jkl")
    map.set("6", "mno")
    map.set("7", "pqrs")
    map.set("8", "tuv")
    map.set("9", "wxyz")
    return map
}
function letterCombinations(digits: string): string[] {
    const result: string[] = []
    const map = init()
    const dfs = (path: string[], idx: number) => {
        if (path.length === digits.length) {
            result.push(path.join(""))
            return
        }
        const str = map.get(digits[idx])
        for (let i = 0; i < str!.length; i++) {
            path.push(str![i])
            dfs(path.concat([]), idx + 1)
            path.pop()
        }
    }
    dfs([], 0)
    return result.filter((_str) => _str !== "")
}
// console.log(letterCombinations("23"))

```

### 🎮 4.组合总和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/combination-sum/description/
 */

// notice：没有去重操作，用Set来进行去重
// function combinationSum(candidates: number[], target: number): number[][] {
//     const result: number[][] = []
//     const set = new Set()
//     const dfs = (path: number[]) => {
//         const sum = path.reduce((acc, cur) => acc + cur, 0)
//         if (sum > target) {
//             return
//         }
//         if (sum === target) {
//             set.add(JSON.stringify(path.sort((a, b) => a - b)))
//             return
//         }
//         for (let idx = 0; idx < candidates.length; idx++) {
//             path.push(candidates[idx])
//             dfs(path.concat())
//             path.pop()
//         }
//     }
//     dfs([])

//     for (let item of set) {
//         result.push(JSON.parse(item as string))
//     }
//     return result
// }
// 去重操作，在traverse的时候进行去重 // ps:利用startIdx来去进行去重
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const dfs = (idx: number, path: number[]) => {
    const sum = path.reduce((acc, cur) => acc + cur, 0);
    if (sum > target) {
      return;
    }
    if (sum === target) {
      res.push(path);
      return;
    }
    for (let i = idx; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, path.concat([]));
      path.pop();
    }
  };
  dfs(0, []);
  return res;
}

```

### ⭐ 5.组合总和2.ts
```typescript
/**
 * @url https://leetcode.cn/problems/combination-sum-ii/description/
 */
// PS:难点去重
function combinationSum2(candidates: number[], target: number): number[][] {
  const result: Array<Array<number>> = [];
  const used: Array<boolean> = new Array(candidates.length).fill(false);
  candidates.sort((a, b) => a - b); // ps:这里排序的意义是防止后面有与前面相同的元素
  const dfs = (startIdx, path) => {
    const sum = path.reduce((acc, cur) => acc + cur, 0);
    if (sum === target) {
      result.push(path);
      return;
    }
    if (sum > target) {
      return;
    }
    for (let i = startIdx; i < candidates.length; i++) {
      if (i > 0 && candidates[i] === candidates[i - 1] && !used[i - 1]) {
        continue;
      }
      used[i] = true;
      path.push(candidates[i]);
      dfs(i + 1, path.concat([]));
      path.pop();
      used[i] = false;
    }
  };
  dfs(0, []);
  return result;
}

```

### 🚀 6.分割回文串.ts
```typescript
/**
 * @url https://leetcode.cn/problems/palindrome-partitioning/description/
 */

const isBackString = (str: string) => {
    return str === str.split("").reverse().join("")
}

function partition(s: string): string[][] {
    const result: string[][] = []
    const dfs = (startIdx: number, path: string[]) => {
        if (startIdx >= s.length) {
            result.push(path)
            return
        }
        for (let idx = startIdx; idx < s.length; idx++) {
            const str = s.slice(startIdx, idx + 1)
            if (isBackString(str)) {
                path.push(str)
                dfs(idx + 1, path.concat([]))
                path.pop()
            } else {
                continue
            }
        }
    }
    dfs(0, [])
    return result
}

```

### ✨ 7.复原ip地址.ts
```typescript
/**
 * @url https://leetcode.cn/problems/restore-ip-addresses/description/
 */

// 是否是有效字符串
const isValidStr = (str: string) => {
    if (str.length > 1) {
        if (str.startsWith("0")) {
            return false
        }
        if (Number(str) >= 0 && Number(str) <= 255) {
            return true
        }
        return false
    }
    return true
}
function restoreIpAddresses(s: string): string[] {
    const result: string[] = []
    const dfs = (path: string[], startIdx: number) => {
        if (path.length === 4 && path.length === s.length) {
            result.push(path.join("."))
            return
        }
        for (let i = startIdx; i < s.length; i++) {
            const str = s.slice(startIdx, i + 1)
            if (isValidStr(str)) {
                path.push(str)
                dfs(path.concat([]), i + 1)
                path.pop()
            } else {
                continue
            }
        }
    }
    dfs([], 0)
    return result
}

```

### 🎲 8.子集.ts
```typescript
/**
 * @url https://leetcode.cn/problems/subsets/description/
 */
function subsets(nums: number[]): number[][] {
    const result: number[][] = []
    const dfs = (path: number[], startIdx: number) => {
        result.push(path)
        if (startIdx >= nums.length) {
            return
        }
        for (let i = startIdx; i < nums.length; i++) {
            path.push(nums[i])
            dfs(path.concat([]), i + 1)
            path.pop()
        }
    }
    dfs([], 0)
    return result
}

```

### 🔰 9.子集二.ts
```typescript
/**
 * @url https://leetcode.cn/problems/subsets-ii/description/
 */

// [1,2,2,3]
function subsetsWithDup(nums: number[]): number[][] {
    const result: number[][] = []
    const used: boolean[] = new Array(nums.length).fill(false)
    nums.sort((a, b) => a - b)
    const dfs = (path: number[], startIdx: number) => {
        result.push(path)
        if (startIdx >= nums.length) {
            return
        }
        for (let i = startIdx; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }
            used[i] = true
            path.push(nums[i])
            dfs(path.concat(), i + 1)
            used[i] = false
            path.pop()
        }
    }
    dfs([], 0)
    return result
}

```

### 🎲 10.非递减子序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/non-decreasing-subsequences/description/
 */

// TODO:1.边界条件 2.去重逻辑 (不能排序之后用used数组进行去重，会打乱原数组的顺序。)3.用set来去重，在树层的地方判断
// 想要用used[i]去重，数组就必须要是有序的

function findSubsequences(nums: number[]): number[][] {
    const result: Array<Array<number>> = []
    const dfs = (path: number[], startIdx: number) => {
        if (path.length >= 2) {
            result.push(path)
        }
        if (startIdx >= nums.length) {
            return
        }
        const set: Set<number> = new Set()
        for (let i = startIdx; i < nums.length; i++) {
            if (nums[i] < path[path.length - 1]) {
                continue
            }
            if (set.has(nums[i])) {
                continue
            }
            set.add(nums[i])
            path.push(nums[i])
            dfs(path.concat([]), i + 1)
            path.pop()
        }
    }
    dfs([], 0)
    return result
}

function findSubsequences1(nums: number[]): number[][] {
    const res: number[][] = []
    const dfs = (startIdx: number, path: number[]) => {
        if (path.length >= 2) {
            res.push(path)
        }

        if (startIdx >= nums.length) {
            return
        }
        const set = new Set()

        for (let i = startIdx; i < nums.length; i++) {
            if (nums[i] < path[path.length - 1]) {
                continue
            }
            if (set.has(nums[i])) {
                continue
            }
            path.push(nums[i])
            set.add(nums[i])
            dfs(i + 1, [...path])
            path.pop()
        }
    }
    dfs(0, [])
    return res
}

console.log(findSubsequences1([1, 1, 1, 1, 1, 1]))

```

### 🌟 11.全排列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/permutations/description/
 */
// TODO：组合问题是通过startIndex来取下标的，排列问题是通过used数组来取的
function permute(nums: number[]): number[][] {
    const result: number[][] = []
    const dfs = (path: number[], used: boolean[]) => {
        if (path.length === nums.length) {
            result.push(path)
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] === true) {
                continue
            }
            path.push(nums[i])
            used[i] = true
            dfs(path.concat([]), used)
            path.pop()
            used[i] = false
        }
    }
    dfs([], new Array(nums.length).fill(false))
    return result
}

```

### 🎯 12.全排列二.ts
```typescript
/**
 * @url https://leetcode.cn/problems/permutations-ii/description/
 */
// 跟11比起来就是数层去重
function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = []
    nums.sort((a, b) => a - b)
    const dfs = (path: number[], used: boolean[]) => {
        if (path.length === nums.length) {
            result.push(path)
            return
        }

        for (let i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue
            }
            if (used[i] === true) {
                continue
            }
            path.push(nums[i])
            used[i] = true
            dfs(path.concat([]), used)
            path.pop()
            used[i] = false
        }
    }
    dfs([], new Array(nums.length).fill(false))
    return result
}

```

### 🎮 13.N皇后.ts
```typescript
/**
 * @url https://leetcode.cn/problems/n-queens/description/
 */

function solveNQueens(n: number): string[][] {
    const final: string[][] = []
    const result: string[][] = new Array(n).fill(0).map((_v) => new Array(n).fill("."))

    const isValid = (row: number, col: number) => {
        // 检查列上是否有冲突
        for (let i = row; i >= 0; i--) {
            if (result[i][col] === "Q") {
                return false
            }
        }
        // 检查右上角上是否有冲突
        for (let i = row, j = col; i >= 0 && j >= 0; j--, i--) {
            if (result[i][j] === "Q") {
                return false
            }
        }
        // 检查左上角上是否有冲突
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (result[i][j] === "Q") {
                return false
            }
        }
        return true
    }

    const dfs = (row: number) => {
        if (row === n) {
            final.push(result.concat([]).map((_row) => _row.join("")))
            return
        }
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                result[row][col] = "Q"
                dfs(row + 1)
                result[row][col] = "."
            }
        }
    }
    dfs(0)
    return final
}

console.log(solveNQueens(4))

```

### 🔰 14.单词搜索.ts
```typescript
/**
 * @url https://leetcode.cn/problems/word-search/?envType=study-plan-v2&envId=top-100-liked
 */

// ps: ================================
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const dfs = (r, c, wordIdx) => {
        // 越界或者字符不匹配，直接return false
        if (r >= board.length || c >= board[0].length || r < 0 || c < 0 || board[r][c] !== word[wordIdx]) {
            return false
        }
        if (wordIdx === word.length - 1) return true
        // 四个方向
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
        const tmp = board[r][c]
        board[r][c] = '#'

        for (let direction of directions) {
            if (dfs(r + direction[0], c + direction[1], wordIdx + 1)) return true
        }
        board[r][c] = tmp
        return false
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            if (dfs(r, c, 0)) {
                return true
            }
        }
    }
    return false
};
```

## ⭐ 8.动态规划

### 🎲 1.斐波那契数.ts
```typescript
/**
 * @url https://leetcode.cn/problems/fibonacci-number/description/
 */
function fib(n: number): number {
    let dp = new Array(n + 1).fill(0)
    dp[0] = 0
    dp[1] = 1
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}

```

### 🎨 2.爬楼梯.ts
```typescript
/**
 * @url https://leetcode.cn/problems/climbing-stairs/description/
 */

// ps: 注意题意
function climbStairs(n: number): number {
    const dp = new Array(n + 1).fill(false)
    dp[0] = 0
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}

```

### 🚀 3.使用最小花费爬楼梯.ts
```typescript
/**
 * @url https://leetcode.cn/problems/min-cost-climbing-stairs/description/
 */

// notice：注意审题，可以从下标为0，下标为1开始爬
function minCostClimbingStairs(cost: number[]): number {
    const dp = new Array(cost.length + 1).fill(0) // notice：dp表示当前爬下标为n的楼梯所需要的最小花费, 到楼顶表示当前下标要溢出数组
    dp[0] = 0
    dp[1] = 0

    for (let i = 2; i <= cost.length; i++) {
        dp[i] = Math.min(dp[i - 2] + cost[i - 2], dp[i - 1] + cost[i - 1])
    }
    console.log(dp)

    return dp[dp.length - 1]
}

```

### 💫 4.不同路径.ts
```typescript
/**
 * @url https://leetcode.cn/problems/unique-paths/description/
 */

function uniquePaths(m: number, n: number): number {
    const dp = new Array(m).fill(0).map((_num) => new Array(n).fill(0)) // m * n 的二维数组

    // TODO:注意这个是路径，不是走了多少步
    // const initDp = () => {
    //     for (let row = 0; row < m; row++) {
    //         dp[row][0] = row
    //     }
    //     for (let col = 0; col < n; col++) {
    //         dp[0][col] = col
    //     }
    // }

    const initDp = () => {
        for (let row = 0; row < m; row++) {
            dp[row][0] = 1
        }
        for (let col = 0; col < n; col++) {
            dp[0][col] = 1
        }
    }
    dp[0][0] = 0
    initDp()

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }

    return dp[m - 1][n - 1]
}

console.log(uniquePaths(3, 2))

```

### 🎮 5.不同路径2.ts
```typescript
/**
 * @url https://leetcode.cn/problems/unique-paths-ii/description/
 */

// TODO:注意初始化的操作
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const dp = new Array(obstacleGrid.length)
    .fill(0)
    .map((_num) => new Array(obstacleGrid[0].length).fill(0)); // m * n 的二维数组
  if (obstacleGrid[0][0] === 1) return 0;
  const initDp = () => {
    for (let row = 0; row < obstacleGrid.length; row++) {
      if (obstacleGrid[row][0] === 1) {
        dp[row][0] = 0;
        break;
      } else {
        dp[row][0] = 1;
      }
    }
    for (let col = 0; col < obstacleGrid[0].length; col++) {
      if (obstacleGrid[0][col] === 1) {
        dp[0][col] = 0;
        break;
      } else {
        dp[0][col] = 1;
      }
    }
  };
  dp[0][0] = 0;
  initDp();

  for (let i = 1; i < obstacleGrid.length; i++) {
    for (let j = 1; j < obstacleGrid[0].length; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  console.log(dp);

  return dp[obstacleGrid.length - 1][obstacleGrid[0].length - 1];
}

// ! 暴力解法
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstaclesViolent = function (obstacleGrid) {
  // 如果起点或终点是障碍，直接返回0
  if (
    obstacleGrid[0][0] === 1 ||
    obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1] === 1
  ) {
    return 0;
  }

  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  let pathCount = 0;

  // 方向数组：向下和向右
  const directions = [
    [1, 0],
    [0, 1],
  ]; // [row, col]

  function backtrack(row, col) {
    // 到达终点，路径数加1
    if (row === m - 1 && col === n - 1) {
      pathCount++;
      return;
    }

    // 尝试每个方向
    for (let [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // 检查边界和障碍
      if (newRow < m && newCol < n && obstacleGrid[newRow][newCol] !== 1) {
        backtrack(newRow, newCol);
      }
    }
  }

  // 从起点开始
  backtrack(0, 0);
  return pathCount;
};

// 测试用例
console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
); // 输出 2

console.log(
  uniquePathsWithObstacles([
    [0, 1],
    [0, 0],
  ])
); // 输出 1

```

### 🎲 6.整数拆分.ts
```typescript
/**
 * @url https://leetcode.cn/problems/integer-break/description/
 */

// dp[n]表示n拆分至少两个数的最大乘积
function integerBreak(n: number): number {
    const dp = new Array(n + 1).fill(0)
    dp[0] = 0
    dp[1] = 0
    dp[2] = 1
    for (let i = 3; i <= n; i++) {
        // 拆分成0其实没有意义，所以这里拆分成1开始
        for (let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j])
        }
    }
    return dp[n]
}

```

### 🔰 7.不同的二叉搜索树.ts
```typescript
/**
 * @url https://leetcode.cn/problems/unique-binary-search-trees/description/
 * @resolve https://leetcode.cn/problems/unique-binary-search-trees/solutions/6693/hua-jie-suan-fa-96-bu-tong-de-er-cha-sou-suo-shu-b/
 */
// G[n]代表n个节点的二叉搜索树的个数
// f[i]代表以i为根节点的二叉搜索树的个数

// G[n] = f(1)+f(2)+....f(n)
// f(i) = G(i-1)*G(n-i) // 左子树的个数有i-1个，右子树的个数有n-i个
// G(n) = G(0)*G(n-1)+G(1)*G(1)+.....G(n-1)*G(0)

function numTrees(n: number): number {
    const dp = new Array(n + 1).fill(0) // dp[n]表示n个节点的二叉树的个数
    dp[1] = 1
    dp[0] = 1 // 其实没有任何意义
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j]
        }
    }

    return dp[n]
}

```

### 🎨 9.分割等和子集.ts
```typescript
/**
 * @url https://leetcode.cn/problems/partition-equal-subset-sum/description/
 */

// dp[i][j]表示从[0,i]个物品中选取，是否有一种方案恰好能够装满容量j。
// 提示：
// 1 <= nums.length <= 200
// 1 <= nums[i] <= 100

// function canPartition(nums: number[]): boolean {
//     const target = nums.reduce((acc, cur) => acc + cur, 0) / 2
//     if (!Number.isInteger(target)) return false

//     const dp: boolean[][] = new Array(nums.length).fill(false).map((_arr) => new Array(target + 1).fill(false))

//     dp[0][nums[0]] = true

//     for (let row = 0; row < nums.length; row++) {
//         dp[row][0] = true
//     }

//     for (let row = 1; row < nums.length; row++) {
//         for (let col = 1; col < target + 1; col++) {
//             if (col - nums[row] >= 0) {
//                 dp[row][col] = dp[row - 1][col] || dp[row - 1][col - nums[row]]
//             } else {
//                 dp[row][col] = dp[row - 1][col]
//             }
//         }
//     }

//     return dp[nums.length - 1][target]
// }

//TODO:优化 dp[j]表示是否有一种方案能够装满dp[j]
function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((acc, cur) => acc + cur);
  const capaticy = sum / 2;
  if (!Number.isInteger(capaticy)) {
    return false;
  }
  const dp: boolean[] = new Array(capaticy + 1).fill(false); // 数组下标和容量的差距

  dp[0] = true;
  for (let row = 0; row < nums.length; row++) {
    for (let col = capaticy; col >= nums[row]; col--) {
      dp[col] = dp[col] || dp[col - nums[row]];
    }
  }
  return dp[capaticy];
}

```

### ⭐ 10.最后一块石头的重量 II.ts
```typescript
/**
 * @url https://leetcode.cn/problems/last-stone-weight-ii/description/
 */

// TODO:如何将问题抽象成01背包问题？

// 要使最后一块石头的重量尽可能地小，neg 需要在不超过 ⌊sum/2⌋ 的前提下尽可能地大。因此本问题可以看作是背包容量为 ⌊sum/2⌋，物品重量和价值均为 stones

// function lastStoneWeightII(stones: number[]): number {
//     const sum = stones.reduce((acc, cur) => acc + cur, 0)
//     const target = Math.floor(sum / 2)
//     const dp = new Array(stones.length).fill(0).map((_arr) => new Array(target + 1).fill(0))
//     for (let i = 0; i < stones.length; i++) {
//         dp[i][0] = 0
//     }
//     for (let j = 0; j <= target; j++) {
//         if (j >= stones[0]) {
//             dp[0][j] = stones[0]
//         } else {
//             dp[0][j] = 0
//         }
//     }

//     for (let row = 1; row < stones.length; row++) {
//         for (let col = 1; col <= target; col++) {
//             if (col - stones[row] >= 0) {
//                 dp[row][col] = Math.max(dp[row - 1][col], dp[row - 1][col - stones[row]] + stones[row])
//             } else {
//                 dp[row][col] = dp[row - 1][col]
//             }
//         }
//     }
//     return Math.abs(sum - dp[stones.length - 1][target] - dp[stones.length - 1][target])
// }

// notice：抽离成一维数组
function lastStoneWeightII(stones: number[]): number {
  const sum = stones.reduce((acc, cur) => acc + cur, 0);
  const target = Math.floor(sum / 2);

  const dp: number[] = new Array(target + 1).fill(0);
  dp[0] = 0;

  for (let row = 0; row < stones.length; row++) {
    console.dir(dp);

    for (let col = target; col >= stones[row]; col--) {
      dp[col] = Math.max(dp[col - stones[row]] + stones[row], dp[col]);
    }
  }

  console.dir(dp);
  return Math.abs(sum - dp[target] - dp[target]);
}

lastStoneWeightII([2, 7, 4, 1, 8, 1]);

```

### 🛠️ 11.目标和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/target-sum/description/
 */
// left + right = sum
// left - right = target
// left = (sum + target) / 2

// TODO:初始化很难
// notice:01背包应用之“有多少种不同的填满背包最大容量的方法“
// function findTargetSumWays(nums: number[], target: number): number {
//     let sum = nums.reduce((acc, cur) => acc + cur, 0)
//     if (Math.abs(target) > sum) return 0
//     let beibao = (sum + target) / 2
//     if (!Number.isInteger(beibao)) return 0
//     if (target > sum) return 0
//     const dp = new Array(nums.length).fill(0).map((_arr) => new Array(beibao + 1 || 1).fill(0))

//     dp[0][nums[0]] = 1 // 注意这个顺序

//     // 背包容量为0，只要出现了0，就可以代表2^n

//     let numZeros = 0
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] == 0) {
//             numZeros++
//         }
//         dp[i][0] = Math.pow(2, numZeros)
//     }

//     for (let i = 1; i < nums.length; i++) {
//         for (let j = 1; j < beibao + 1; j++) {
//             if (j - nums[i] < 0) {
//                 dp[i][j] = dp[i - 1][j]
//             } else {
//                 dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]]
//             }
//         }
//     }
//     console.table(dp)

//     // console.log(dp)
//     return dp[nums.length - 1][beibao]
// }

// TODO:优化 一维数组
// left + right = target  left -right = sum  left = (sum + target) / 2
// dp[target]  装满背包容量target有多少种方法
function findTargetSumWays(nums: number[], target: number): number {
    const sum = nums.reduce((acc, cur) => acc + cur, 0)
    const capacity = (sum + target) / 2
    if (!Number.isInteger(capacity)) return 0
    if (Math.abs(target) > sum) return 0
    const dp = new Array(capacity + 1).fill(0)
    dp[0] = 1 // 装满背包容量为0，可以什么都不装也为一种方案
    for (let row = 0; row < nums.length; row++) {
        console.log(dp)
        for (let col = capacity; col >= nums[row]; col--) {
            dp[col] = dp[col - nums[row]] + dp[col]
        }
    }

    return dp[capacity]
}

findTargetSumWays([1, 2, 1, 2], 4)

```

### 🎨 12.一和零.ts
```typescript
/**
 * @url https://leetcode.cn/problems/ones-and-zeroes/description/
 */

// dp表示不超过容量的情况下，有多少个子集
// !本质还是01背包，维度从1维变成2维了，0 和 1
function findMaxForm(strs: string[], m: number, n: number): number {
  const dp = new Array(m + 1).fill(0).map((_v) => new Array(n + 1).fill(0));

  dp[0][0] = 0;

  const getMandN = (str: string) => {
    let m = 0,
      n = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "1") {
        n++;
      } else {
        m++;
      }
    }
    return {
      m,
      n,
    };
  };

  for (let i = 0; i < strs.length; i++) {
    const { m: strm, n: strn } = getMandN(strs[i]);
    for (let j = m; j >= strm; j--) {
      for (let k = n; k >= strn; k--) {
        dp[j][k] = Math.max(dp[j - strm][k - strn] + 1, dp[j][k]);
      }
    }
  }

  return dp[m][n];
}

findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3);

```

### 🛠️ 14.零钱兑换二.ts
```typescript
/**
 * @url https://leetcode.cn/problems/coin-change-ii/description/
 */

// notice：背包容量为j的最大价值是否能为j，物品可以被选取多少次
// TODO:遍历顺序的考量。dp概念的理解
// []如果求组合数就是外层for循环遍历物品，内层for遍历背包。
// []如果求排列数就是外层for遍历背包，内层for循环遍历物品。
function change(amount: number, coins: number[]): number {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }
  console.log(dp);

  return dp[amount];
}

change(5, [1, 2, 5]);

```

### 🎨 15.组合总和四.ts
```typescript
/**
 * @url https://leetcode.cn/problems/combination-sum-iv/description/
 */

// dp[j]表示装满背包为j的元素组合的个数
// notice:其实这个地方就是一个排列

function combinationSum4(nums: number[], target: number): number {
    const dp = new Array(target + 1).fill(0)
    dp[0] = 1
    for (let j = 0; j < target + 1; j++) {
        for (let i = 0; i < nums.length; i++) {
            if (j - nums[i] >= 0) {
                dp[j] += dp[j - nums[i]]
            }
        }
    }

    return dp[target]
}

console.log(combinationSum4([1, 2, 3], 4))

// TODO: 暴力算出所有的组合
```

### 🌟 16.零钱兑换.ts
```typescript
/**
 * @url https://leetcode.cn/problems/coin-change/description/
 */

// dp[j]表示刚好装满容量为j的最少硬币个数
function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER) // notice：初始化的时候：保证能够不是最初的小值
    dp[0] = 0
    for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
        }
    }
    console.log(dp)
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount]
}

```

### 📚 17.完全平方数.ts
```typescript
/**
 * @url https://leetcode.cn/problems/perfect-squares/description/
 */

// dp[n]表示容量为n的情况下，最少需要多少整数来组成n
function numSquares(n: number): number {
    const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER)
    dp[0] = 0
    for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
        for (let j = Math.pow(i, 2); j <= n; j++) {
            dp[j] = Math.min(dp[j], dp[j - Math.pow(i, 2)] + 1)
        }
    }
    return dp[n]
}

```

### 📚 18.单词拆分.ts
```typescript
/**
 * @url https://leetcode.cn/problems/word-break/description/
 */

// 排列还是组合，遍历顺序的考量 dp[j]表示长度为j的字符串是否能够被拼接
// !notice：这一维度的赋值
function wordBreak(s: string, wordDict: string[]): boolean {
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let j = 1; j <= s.length; j++) {
    // 这个for循环每次都会对dp进行覆盖操作
    for (let i = 0; i < wordDict.length; i++) {
      const word = wordDict[i];
      if (j >= word.length) {
        const word1 = s.slice(j - word.length, j);
        if (word === word1 && dp[j - word.length]) {
          dp[j] = true;
          break; // 如果不加break，后面遍历上来，可能会把他给覆盖。
        } else {
          dp[j] = false;
        }
      } else {
        dp[j] = false;
      }
    }
  }

  return dp[s.length];
}

wordBreak("applepenapple", ["apple", "pen"]);

// !notice：暴力回溯递归解法
function wordBreak1(s, wordDict) {}

// const wordBreak = (s, wordDict) => {
//   let dp = Array(s.length + 1).fill(false);
//   dp[0] = true;

//   for (let i = 0; i <= s.length; i++) {
//     for (let j = 0; j < wordDict.length; j++) {
//       if (i >= wordDict[j].length) {
//         if (
//           s.slice(i - wordDict[j].length, i) === wordDict[j] &&
//           dp[i - wordDict[j].length]
//         ) {
//           dp[i] = true;
//         }
//       }
//     }
//   }

//   return dp[s.length];
// };

```

### 📚 19.打家劫舍.ts
```typescript
export {};
/**
 * @url https://leetcode.cn/problems/house-robber/description/
 */

// dp[i]表示偷窃第i+1间房屋所能获得的最大金额
// dp[2] = dp[0]+cur, dp[1]
// dp[3] = dp[1]+cur,dp[2]
// dp[n] = dp[n-2]+cur dp[n-1]
// !notice:因为题目中都是正数，所以这里不需要考虑前面()，dp[i-1]一定是没有选择i的最大值，实际上也是运用到了一点贪心的策略
function rob(nums: number[]): number {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  if (nums.length === 1) {
    return dp[0];
  }
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1], dp[i]);
  }

  return dp[nums.length - 1];
}

/**
 * @url https://leetcode.cn/problems/house-robber/description/
 */

// dp[i]表示偷窃第i+1间房屋所能获得的最大金额，
// dp[2] = dp[0]+cur, dp[1]
// dp[3] = dp[1]+cur,dp[2]
// dp[n] = dp[n-2]+cur dp[n-1]
function rob1(nums: number[]): number {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  if (nums.length === 1) {
    return dp[0];
  }
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    for (let j = 0; j < i - 1; j++) {
      // dp[j] + nums[i] 表示需要当天的
      // dp[i - 1] 不要当天
      // dp[i] 对比
      dp[i] = Math.max(dp[j] + nums[i], dp[i], dp[i - 1]);
    }
  }

  return dp[nums.length - 1];
}

```

### 🧩 20.打家劫舍二.ts
```typescript
/**
 * @url https://leetcode.cn/problems/house-robber-ii/description/
 */

// 偷了1就不能够偷最后一个，偷了最后一个就不能偷第一个
// TODO:dp[i]表示到达第[i+1]房屋所能偷到的最大额度
function rob(nums: number[]): number {
    const dp1 = new Array(nums.length - 1).fill(0)
    const dp2 = new Array(nums.length - 1).fill(0)
    if (nums.length === 1) return nums[0]
    dp1[0] = nums[0]
    dp1[1] = Math.max(nums[0], nums[1])
    dp2[0] = nums[1]
    dp2[1] = Math.max(nums[1], nums[2])

    const nums1 = nums.concat([])
    const nums2 = nums.concat([])
    nums1.pop()
    nums2.shift()
    for (let i = 2; i < nums1.length; i++) {
        dp1[i] = Math.max(dp1[i - 2] + nums1[i], dp1[i - 1])
    }
    for (let i = 2; i < nums2.length; i++) {
        dp2[i] = Math.max(dp2[i - 2] + nums2[i], dp2[i - 1])
    }

    console.log(dp1, dp2)

    return Math.max(dp1[nums.length - 2], dp2[nums.length - 2])
}
console.log(rob([1, 3, 2]))

```

### 🚀 21.打家劫舍三.ts
```typescript
/**
 * @url https://leetcode.cn/problems/house-robber-iii/description/
 */
export {} // 表明是一个模块，防止ts报错

// TODO:树形dp，与数组的区别是定义每个节点的一个状态
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val
        this.left = left === undefined ? null : left
        this.right = right === undefined ? null : right
    }
}

// dp[0]表示当前节点未偷 dp[1]表示当前节点已经被偷
// function rob(root: TreeNode | null): number {
//     const traverse = (root: TreeNode | null): Array<number> => {
//         const dp: number[] = new Array(2).fill(0)

//         if (!root) return dp.concat([])
//         if (!root.left && !root.right) {
//             dp[1] = root.val
//             return dp.concat()
//         }
//         // 节点被偷
//         dp[1] = root.val + traverse(root.left)[0] + traverse(root.right)[0]

//         // 节点未被偷，但也不一定是会去子节点的最大值呀！！！！
//         dp[0] = traverse(root.left)[1] + traverse(root.right)[1]

//         return dp.concat([])
//     }

//     return Math.max(...traverse(root))
// }

function rob(root: TreeNode | null): number {
    const traverse = (root: TreeNode | null): Array<number> => {
        const dp: number[] = new Array(2).fill(0)

        if (!root) return dp.concat([])
        if (!root.left && !root.right) {
            dp[1] = root.val
            return dp.concat()
        }

        // 后序遍历
        const left = traverse(root.left)
        const right = traverse(root.right)

        // 节点被偷
        dp[1] = root.val + left[0] + right[0]

        // 节点未被偷，但也不一定是会去子节点的最大值呀！！！！
        dp[0] = Math.max(...left) + Math.max(...right)

        return dp.concat([])
    }

    return Math.max(...traverse(root))
}

```

### ⭐ 22.买卖股票的最佳时机.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/
 */
export { };
// [7,1,5,3,6,4]  5
// 暴力解法--超时
// function maxProfit(prices: number[]): number {
//     let max = Number.MIN_SAFE_INTEGER
//     for (let i = 0; i < prices.length; i++) {
//         for (let j = i + 1; j < prices.length; j++) {
//             max = Math.max(max, prices[j] - prices[i])
//         }
//     }
//     return max < 0 ? 0 : max
// }

// dp[i][0] 表示 第i天持有股票所拥有的最大金额
//     保持上一次的持有股票状态
//     刚买入
// dp[i][1] 表示 第i天不持有股票所拥有的最大金额
//     上一次没有持有股票的状态
//     按照今天的股价卖出

// !notice：表示一天时间
function maxProfit(prices: number[]): number {
  const dp = new Array(prices.length)
    .fill(0)
    .map((_item) => new Array(2).fill(0));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i]); // !notice:这里-price[i]不依赖于之前的状态。因为题目限定只需要执行一次，具体可参照 23.买股票的最佳时机二.ts
    dp[i][1] = Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0]);
  }
  return dp[prices.length - 1][1];
}

// TODO:一维数组优化

// note:思路参考背包问题
function maxProfitOne(prices: number[]): number {
  const dp = new Array(2).fill(Number.MIN_SAFE_INTEGER);
  for (let i = 0; i < prices.length; i++) {
    // dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
    // dp[i][1] = Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0])
    // TODO:这里本身会被覆盖，因此需要用两层递归
    dp[0] = Math.max(dp[0], -prices[i]);
    dp[1] = Math.max(dp[1], dp[0] + prices[i]);
  }
  return dp[1];
}

// ps: 贪心策略==========================
var maxProfitGreed = function (prices) {
  let minPrice = Number.MAX_SAFE_INTEGER
  let maxProfit = 0
  for (let i = 0; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i])
    maxProfit = Math.max(maxProfit, prices[i] - minPrice)
  }
  return maxProfit
};

```

### 🔥 23.买股票的最佳时机二.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/
 */
// dp[i][0]表示第i天所拥有的最大利润
// dp[i][0]表示第i天持有股票所拥有的最大利润
// dp[i][1]表示第i天不持有股票所拥有的最大利润
function maxProfit(prices: number[]): number {
    const dp: number[] = new Array(2).fill(0)
    dp[0] = -prices[0]
    dp[1] = 0
    for (let i = 1; i < prices.length; i++) {
        // 这里会被覆盖，可以用两层数组来保存
        dp[0] = Math.max(dp[0], dp[1] - prices[i])
        dp[1] = Math.max(dp[1], dp[0] + prices[i])
    }
    return dp[1]
}

```

### 📚 24.买股票的最佳时机三.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/description/
 */
export {};

// TODO:最多完成几笔交易，状态怎么办？想想前两次股票递推的第二个参数的意思  和前面两题是一样的

// dp[i][0]表示在第i天中，第一次买入股票的最大利润 dp[i][0] = -price[i]
// dp[i][1]表示在第i天中，第一次卖出股票的最大利润 dp[i][1] =  dp[i-1]+price[i]
// dp[i][2]表示在第i天中，第二次买入股票的最大利润 dp[i][2] = dp[i-1][1]-price[i]
// dp[i][3]表示在第i天中，第二次卖出股票的最大利润 dp[i][3] = dp[i-1][2]+price[i]
function maxProfit(prices: number[]): number {
  const dp = new Array(prices.length)
    .fill(0)
    .map((_arr) => new Array(4).fill(0));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  dp[0][2] = -prices[0];
  dp[0][3] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], -prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] - prices[i]);
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] + prices[i]);
  }
  return dp[prices.length - 1][3];
}

// TODO:空间优化
function maxProfit1(prices: number[]): number {
  const dp = new Array(4).fill(0);
  dp[0] = -prices[0];
  dp[1] = 0;
  dp[2] = -prices[0];
  dp[3] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[0], -prices[i]);
    dp[i][1] = Math.max(dp[1], dp[0] + prices[i]);
    dp[i][2] = Math.max(dp[2], dp[1] - prices[i]);
    dp[i][3] = Math.max(dp[3], dp[2] + prices[i]);
  }
  return dp[3];
}

```

### 📚 25.买股票的最佳时机四.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/description/
 */

export {}

// 两笔交易
// dp[i][0]表示在第i天中，第一次买入股票的最大利润 dp[i][0] = dp[i-1][0],-price[i]
// dp[i][1]表示在第i天中，第一次卖出股票的最大利润 dp[i][1] = dp[i-1][1],dp[i-1][0]+price[i]
// dp[i][2]表示在第i天中，第二次买入股票的最大利润 dp[i][2] = dp[i-1][2],dp[i-1][1]-price[i]
// dp[i][3]表示在第i天中，第二次卖出股票的最大利润 dp[i][3] = dp[i-1][3],dp[i-1][2]+price[i]
function maxProfit(k: number, prices: number[]): number {
    const dp: number[][] = new Array(prices.length).fill(0).map((_item) => new Array(2 * k).fill(0))
    for (let i = 0; i < 2 * k; i++) {
        if (i % 2 === 0) {
            dp[0][i] = -prices[0]
        } else {
            dp[0][i] = 0
        }
    }
    for (let i = 1; i < prices.length; i++) {
        for (let j = 0; j < 2 * k; j++) {
            if (j === 0) {
                dp[i][j] = Math.max(dp[i - 1][0], -prices[i])
            } else {
                if (j % 2 === 0) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i])
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + prices[i])
                }
            }
        }
    }
    return dp[prices.length - 1][2 * k - 1]
}

```

### 🎯 26.买卖股票的最佳时机含冷冻期.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 */

// dp[i][0]表示第i天手上有股票时候的能够获取的最大利润
// dp[i][1]表示第i天手上没有股票时候的能够获取的最大利润
// dp[i][2]表示第i天处于冷冻期的时候的最大利润

// 状态还是没考虑全
// function maxProfit(prices: number[]): number {
//     const dp = new Array(prices.length).fill(0).map((_item) => new Array(3).fill(0))
//     dp[0][0] = -prices[0]
//     dp[0][1] = 0
//     dp[0][0] = 0

//     for (let i = 1; i < prices.length; i++) {
//         dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i], dp[i - 1][2] - prices[i])
//         dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i], dp[i - 1][2])
//         dp[i][2] = Math.max(dp[i - 1][0] + prices[i], dp[i - 1][2])
//     }
//     return Math.max(...dp[prices.length - 1])
// }

// TODO:再来做一遍
// notice:关键点：不持有股票的状态拆分出来
// 初始化如果非法的话，可以从递推公式来看具体初始化多少
// dp[i][0]表示持有股票的最大利润 dp[i-1][0],dp[i-1][2]-price[i],dp[i-1][3]-price[i]
// Note:备注一下 dp[i-1][3]-price[i]表示前一天是冷冻期，然后今天买入股票
// dp[i][1]表示今天卖出股票，下一天是冷冻期 dp[i-1][0]+price[i]
// dp[i][2]表示冷冻期之后保持卖出的状态 dp[i-1][2],dp[i-1][3]
// dp[i][3]表示冷冻期的状态 dp[i-1][1]
function maxProfit(prices: number[]): number {
  const dp = new Array(prices.length).fill(0).map((_v) => new Array(4).fill(0));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  dp[0][2] = 0;
  dp[0][3] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][0],
      dp[i - 1][2] - prices[i],
      dp[i - 1][3] - prices[i]
    );
    dp[i][1] = dp[i - 1][0] + prices[i];
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][3]);
    dp[i][3] = dp[i - 1][1];
  }
  return Math.max(...dp[prices.length - 1]);
}

// 这里如果要做空间优化，需要去做赋值顺序的调整

```

### 🧩 27.买卖股票的最佳时机含手续费.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/
 */
export {};

// dp[i][0]表示持有股票拥有的最大利润
// dp[i][1]表示不持有股票拥有的最大利润
// TODO:探索一下如何debugger，因为目前dp状态越来越复杂，只能手动模拟数值了。然后看对应的。
function maxProfit(prices: number[], fee: number): number {
  const dp = new Array(prices.length).fill(0).map((_v) => new Array(2).fill(0));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee);
  }
  console.table(dp);

  return dp[prices.length - 1][1];
}

maxProfit([1, 3, 2, 8, 4, 9], 2);

```

### 🎨 28.最长递增子序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/longest-increasing-subsequence/description/
 */
// function lengthOfLIS(nums: number[]): number {}

// notice：找出所有的递增子序列,回溯法暴力搜索
// TODO:思考一下暴力搜索

// function lengthOfLIS(nums: number[]): number {
//     const res: number[][] = []
//     const dfs = (path: number[], startIndex: number) => {
//         const set: Set<number> = new Set()

//         if (path[path.length - 1] <= path[path.length - 2]) {
//             path.pop()
//             res.push(path.concat())
//             return
//         }
//         if (startIndex >= nums.length) {
//             res.push(path.concat())
//             return
//         }
//         for (let i = startIndex; i < nums.length; i++) {
//             if (set.has(nums[i])) {
//                 continue
//             }

//             path.push(nums[i])
//             set.add(nums[i])
//             dfs(path.concat(), i + 1)
//             path.pop()
//         }
//     }
//     const findMax = (arr: number[][]) => {
//         let max = Number.MIN_SAFE_INTEGER
//         arr.forEach((_v) => {
//             max = Math.max(_v.length, max)
//         })
//         return max
//     }
//     dfs([], 0)

//     return findMax(res)
// }

// console.log(lengthOfLIS([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]))

// TODO:动态规划
// dp[i]表示到达第i个位置所能获得的最长递增子序列
// dp[i] = dp[j]+1 nums[i] > nums[j]
function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1); // 初始化的时候注意一点
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  return Math.max(...dp);
}
// console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]))

```

### 🎯 29.最长连续递增子序列.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/longest-continuous-increasing-subsequence/description/
 */

// dp[i]表示到第i个位置的连续子序列的长度
function findLengthOfLCIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = Math.max(dp[i - 1] + 1, dp[i]);
    }
  }
  return Math.max(...dp);
}

// ps:暴力解法如下

function lengthOfLIS(nums) {
  if (!nums || nums.length === 0) return 0;

  let maxLen = 0; // 全局变量，记录最长递增子序列长度

  function backtrack(index, currSeq) {
    // 更新最长长度
    maxLen = Math.max(maxLen, currSeq.length);

    // 从当前索引往后遍历
    for (let i = index; i < nums.length; i++) {
      // 如果当前元素可以加入递增子序列
      if (currSeq.length === 0 || nums[i] > currSeq[currSeq.length - 1]) {
        // 选择：加入当前元素
        currSeq.push(nums[i]);
        // 递归探索后续元素
        backtrack(i + 1, currSeq);
        // 回溯：撤销选择
        currSeq.pop();
      }
      // 不选择当前元素的情况会自动通过循环继续
    }
  }

  backtrack(0, []);
  return maxLen;
}

```

### 🚀 30.最长重复子数组.ts
```typescript
/**
 * @url https://leetcode.cn/problems/maximum-length-of-repeated-subarray/description/
 */

// TODO:dp[i][j]表示以num1[i]为末尾项，末尾项为nums2[j]的子数组
// PS:注意一下dp[i][j]的定义，dp[i][j]表示以num1[i]为末尾项，末尾项为nums2[j]的子数组
// nums[i] nums[j]
// 优化点：init初始化可以简洁一点，不用手动去初始化

function findLength(nums1: number[], nums2: number[]): number {
  const dp = new Array(nums1.length)
    .fill(0)
    .map((_v) => new Array(nums2.length).fill(0));
  let res = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < nums1.length; i++) {
    if (nums1[i] === nums2[0]) {
      dp[i][0] = 1;
      res = 1;
    }
  }
  for (let i = 0; i < nums2.length; i++) {
    if (nums2[i] === nums1[0]) {
      dp[0][i] = 1;
      res = 1;
    }
  }

  for (let i = 1; i < nums1.length; i++) {
    for (let j = 1; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      res = Math.max(res, dp[i][j]);
    }
  }
  console.table(dp);
  return res === Number.MIN_SAFE_INTEGER ? 0 : res;
}
findLength([1, 2, 3, 2, 1], [3, 2, 1, 2, 7]);

// 12321
// 32127

```

### 🔰 31.最长公共子序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/longest-common-subsequence/description/
 */

// dp[i][j] 表示text1以i-1为下标，text2以j-1为下标的最长公共子序列
// dp[i][j] = dp[i-1][j-1] + 1
// TODO:30,31再好好思索一下  连续性和不连续的区别， 可以通过思考下一个状态的依赖来思考变化
// - 状态被截断
// - 状态已经截断
// - 初始化和最长重复子数组不太一样
function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = new Array(text1.length + 1)
    .fill(0)
    .map((_v) => new Array(text2.length + 1).fill(0));
  let res = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      res = Math.max(res, dp[i][j]);
    }
  }

  return res;
}
longestCommonSubsequence("abc", "def");

```

### ⭐ 32.数组最大乘积.ts
```typescript
/**
 * @url https://leetcode.cn/problems/maximum-product-subarray/description/?envType=study-plan-v2&envId=top-100-liked
 */


// ps: 负数的情况容易被忽略掉
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    const dpMax = new Array(nums.length).fill(0) // 最大乘积
    const dpMin = new Array(nums.length).fill(0) // 最小乘积
    dpMax[0] = nums[0]
    dpMin[0] = nums[0]

    for (let i = 1; i < nums.length; i++) {
        dpMax[i] = Math.max(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i])
        dpMin[i] = Math.min(dpMax[i - 1] * nums[i], dpMin[i - 1] * nums[i], nums[i])
    }
    return Math.max(...dpMax, ...dpMin)
};
```

### 🎯 32.最大子数组和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/maximum-subarray/description/
 */

// dp[i]表示下标为i结尾的子数组的最大和
// dp[i] = dp[i-1],
function maxSubArray(nums: number[]): number {
    const dp = new Array(nums.length).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    }
    console.log(dp)
    return Math.max(...dp)
}
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))

```

### 🌟 33.判断子序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/is-subsequence/description/
 */

// TODO:双指针来判断
// TODO:动态规划
// abc
// abcdef
// dp[i][j]表示以s[i-1]为结尾,t[j-1]为结尾最长公共子序列
// s[i-1]===t[j-1]?dp[i-1][j-1]+1:dp[i][j-1] ac addddc
// notice:删除s的话一定是比删除t匹配结果更少的（这里也可以理解为剪枝的操作）
// 结果比较最长公共子序列的长度是否和s的长度相等
function isSubsequence(s: string, t: string): boolean {
  if (s.length < 1) {
    return true;
  }
  const dp = new Array(s.length + 1)
    .fill(0)
    .map((_item) => new Array(t.length + 1).fill(0));
  dp[0][0] = 0;
  dp[1][0] = 0;
  dp[0][1] = 0;
  for (let i = 1; i < s.length + 1; i++) {
    for (let j = 1; j < t.length + 1; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return dp[s.length][t.length] === s.length;
}

```

### 🛠️ 34.不同的子序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/distinct-subsequences/
 */

// s的子序列中t出现的个数 baggg bag
// notice:思考：为啥不是累加，而是前一次的和再加入的？
// dp[i][j] 以s[i-1],t[j-1]为结尾的t出现的个数 dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
// 每一次状态 + 上一次未比较的状态 可以举一个t的长度为1的例子
function numDistinct(s: string, t: string): number {
    const dp = new Array(s.length + 1).fill(0).map((_v) => new Array(t.length + 1).fill(0))

    for (let i = 0; i <= s.length; i++) {
        dp[i][0] = 1
    }

    for (let i = 1; i < s.length + 1; i++) {
        for (let j = 1; j < t.length + 1; j++) {
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }

    console.table(dp)

    return dp[s.length][t.length]
}

numDistinct("babgbag", "bag")

```

### 🛠️ 35.两个字符串的删除操作.ts
```typescript
/**
 * @url https://leetcode.cn/problems/delete-operation-for-two-strings/description/
 */
export {}
// aab  aac
// dp[i][j]表示以word1[i-1]为结尾和以word2[i-1]为结尾的最长公共子序列的长度
// 相等 dp[i][j] = dp[i-1][j-1]+1
// 不相等的话：dp[i][j] = max~dp[i-1][j],dp[i][j-1]
function minDistance(word1: string, word2: string): number {
    const dp = new Array(word1.length + 1).fill(0).map((_v) => new Array(word2.length + 1).fill(0))

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    console.table(dp)

    return (
        Math.abs(dp[word1.length][word2.length] - word1.length) +
        Math.abs(dp[word1.length][word2.length] - word2.length)
    )
}

```

### 🎮 36.编辑距离.ts
```typescript
/**
 * @url https://leetcode.cn/problems/edit-distance/description/
 */

export { }
// function minDistance(word1: string, word2: string): number {
//     const dp = new Array(word1.length + 1).fill(0).map((_v) => new Array(word2.length + 1).fill(0))

//     for (let i = 1; i <= word1.length; i++) {
//         for (let j = 1; j <= word2.length; j++) {
//             if (word1[i - 1] === word2[j - 1]) {
//                 dp[i][j] = dp[i - 1][j - 1] + 1
//             } else {
//                 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
//             }
//         }
//     }
//     const max = dp[word1.length][word2.length]

//     if (word1.length > word2.length) {
//         return Math.abs(word1.length - max)
//     } else {
//         return Math.abs(word2.length - max)
//     }
// }
// notice：不要想着操作都为替换，注意子序列中间的相对顺序
// intention
// execution

// console.log(minDistance("intention", "execution"))

// TODO:最长重复子数组试试，不行还是是相对顺序的原因

// TODO:需要的最少操作
function minDistance(word1: string, word2: string): number {
    const dp = new Array(word1.length + 1).fill(0).map((_v) => new Array(word2.length + 1).fill(0))
    for (let i = 0; i <= word1.length; i++) {
        dp[i][0] = i
    }
    for (let j = 0; j <= word2.length; j++) {
        dp[0][j] = j
    }
    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // ps:（修改: dp[i - 1][j - 1], 删除: dp[i - 1][j], 增加: dp[i][j - 1]），
                // ps：删除和增加是一起的
                dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
            }
        }
    }
    return dp[word1.length][word2.length]
}

```

### 🔥 37.回文子串.ts
```typescript
/**
 * @url https://leetcode.cn/problems/palindromic-substrings/description/
 */
// 示例 1：

// 输入：s = "abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：

// 输入：s = "aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

// dp[i][j]表示以区间[i,j]的子串是否是回文字符串
// s[i] === s[j]? dp[i][j] = dp[i+1][j-1]
// abba a(1) ab(2) abb(3) abba(5)
function countSubstrings(s: string): number {
    const dp = new Array(s.length).fill(true).map((_v) => new Array(s.length).fill(false))
    let res = 0

    // notice：根据递推公式来确认遍历顺序，从下网上，从左往右
    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i; j < s.length; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1) {
                    dp[i][j] = true
                    res++
                } else if (dp[i + 1][j - 1]) {
                    dp[i][j] = true
                    res++
                }
            }
        }
    }
    return res
}

```

### 🔥 38.最长回文子序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/longest-palindromic-subsequence/description/
 */
// dp[i][j] 区间[i,j]之间的最长回文子序列 s[i]===s[j]? dp[i+1][j-1]+2: dp[i+1][j] dp[i][j-1]
function longestPalindromeSubseq(s: string): number {
    const dp = new Array(s.length).fill(0).map((_v) => new Array(s.length).fill(0))

    for (let i = 0; i < s.length; i++) {
        dp[i][i] = 1
    }

    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < s.length; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[0][s.length - 1]
}
longestPalindromeSubseq("bbbab")
// ABCBDAB
// BDCABA

```

## 🚀 9.贪心算法

### 💡 1.分发饼干.ts
```typescript
/**
 * @url https://leetcode.cn/problems/assign-cookies/description/
 */

// notice:孩子不变，饼干是分发的
// function findContentChildren(g: number[], s: number[]): number {
//     const sort = (arr: number[]) => arr.sort((a, b) => a - b)

//     let bottom = 0
//     sort(g)
//     sort(s)
//     for (let i = 0; i < Math.min(s.length, g.length); i++) {
//         if (s[bottom] >= g[i]) {
//             bottom++
//         }
//     }
//     return bottom
// }
function findContentChildren(g: number[], s: number[]): number {
    const sort = (arr: number[]) => arr.sort((a, b) => a - b)
    let child = 0
    sort(g)
    sort(s)
    for (let i = 0; i < s.length; i++) {
        if (s[i] >= g[child]) {
            child++
        }
    }

    return child
}

```

### 🔰 2.摆动序列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/wiggle-subsequence/description/
 */
// nums = [1,7,4,9,2,5]
// 输出：6
// 解释：整个序列均为摆动序列，各元素之间的差值为 (6, -3, 5, -7, 3) 。

// dp[i]表示以nums[i]为结尾的摆动序列的长度
// nums[i]-nums[i-1]>0  判断nums[i-1]-nums[i-2]<0 反之  dp[i] = dp[i-1]+1  dp[i] = dp[i-1]
// notice:还是状态考虑错了，这样并没有考虑前面是山峰还是山谷   25/31
// function wiggleMaxLength(nums: number[]): number {
//     const dp = new Array(nums.length).fill(0)
//     if (nums.length < 2) {
//         return 1
//     }
//     dp[0] = 1
//     dp[1] = nums[1] === nums[0] ? 1 : 2
//     if ((dp[1] - dp[0] > 0 && dp[2] - dp[1] < 0) || (dp[1] - dp[0] < 0 && dp[2] - dp[1] > 0)) {
//         dp[2] = 3
//     }
//     for (let i = 2; i < nums.length; i++) {
//         if (
//             (nums[i] - nums[i - 1] > 0 && nums[i - 1] - nums[i - 2] < 0) ||
//             (nums[i] - nums[i - 1] < 0 && nums[i - 1] - nums[i - 2] > 0)
//         ) {
//             dp[i] = dp[i - 1] + 1
//         } else {
//             dp[i] = dp[i - 1]
//         }
//     }
//     console.table(dp)
//     return Math.max(...dp)
// }
// wiggleMaxLength([84])

// TODO:动态规划思路2
// PS: 动态规划这里做会比较好理解
// dp[i][0] = max(dp[i][0], dp[j][1] + 1)，其中0 < j < i且nums[j] < nums[i]，表示将 nums[i]接到前面某个山谷后面，作为山峰。
// dp[i][1] = max(dp[i][1], dp[j][0] + 1)，其中0 < j < i且nums[j] > nums[i]，表示将 nums[i]接到前面某个山峰后面，作为山谷。
function wiggleMaxLength(nums: number[]): number {
  const dp = new Array(nums.length).fill(0).map((_v) => new Array(2).fill(0));
  dp[0][0] = 1;
  dp[0][1] = 1;
  for (let i = 1; i < nums.length; i++) {
    // 这里的初始化：两个数相等，算是一个数的情况的摆动序列
    dp[i][0] = 1;
    dp[i][1] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] - nums[j] > 0) {
        // 前面应该是谷底
        dp[i][1] = Math.max(dp[j][0] + 1, dp[i][1]);
      } else if (nums[i] - nums[j] < 0) {
        dp[i][0] = Math.max(dp[j][1] + 1, dp[i][0]);
      }
    }
  }
  return Math.max(...dp[nums.length - 1]);
}

```

### 🌟 3.最大子数组和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/maximum-subarray/
 */

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6。

// dp[i]表示以nums[i-1]为结尾的最大子数组和 dp[i] = dp[i-1]+nums[i]
// function maxSubArray(nums: number[]): number {
//     const dp = new Array(nums.length + 1).fill(Number.MIN_SAFE_INTEGER)

//     for (let i = 1; i <= nums.length; i++) {
//         dp[i] = Math.max(dp[i - 1] + nums[i - 1], nums[i - 1])
//     }
//     console.table(dp)
//     return Math.max(...dp)
// }

// TODO:贪心做法
function maxSubArray(nums: number[]): number {
  let count = 0, //统计目前累加的和
    result = Number.MIN_SAFE_INTEGER; // 放置结果
  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    if (count > result) {
      result = count;
    }
    if (count < 0) {
      count = 0;
    }
  }
  return result;
}

```

### 🌟 4.买卖股票的最佳时机 II.ts
```typescript
/**
 * @url https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/
 */

// 动态规划
// dp[i][0]表示第i天手上有股票的最大利润 dp[i][0] = dp[i-1][1]-nums[i] dp[i][0]
// dp[i][1]表示第i天手上没有股票的最大利润 dp[i][1] = dp[i-1][0]+nums[i] dp[i-1][1]
// function maxProfit(prices: number[]): number {
//     const dp = new Array(prices.length + 1).fill(0).map((_v) => new Array(2).fill(0))
//     dp[0][0] = -prices[0] // TODO:换了下标，这里的初始化还是需要改变
//     for (let i = 1; i <= prices.length; i++) {
//         dp[i][0] = Math.max(dp[i - 1][1] - prices[i - 1], dp[i - 1][0])
//         dp[i][1] = Math.max(dp[i - 1][0] + prices[i - 1], dp[i - 1][1])
//     }
//     console.table(dp)
//     return dp[prices.length][1]
// }
// console.log(maxProfit([7, 1, 5, 3, 6, 4]))
// 贪心算法
function maxProfit(prices: number[]): number {
  // 计算数组中的间隔
  const init = (arr: number[]) => {
    const temp: number[] = [];
    for (let i = 1; i < arr.length; i++) {
      temp.push(arr[i] - arr[i - 1]);
    }
    return temp;
  };
  const intervalArray = init(prices);
  return intervalArray.reduce((acc, cur) => {
    if (cur >= 0) {
      return acc + cur;
    }
    return acc;
  }, 0);
}

```

### 🎯 5.跳跃游戏.ts
```typescript
/**
 * @url https://leetcode.cn/problems/jump-game/description/
 */

// 动态规划
// dp【i】表示是否能够到达第i个位置
// 从0开始 dp[j]+nums[j]是否大于i,大于就break
// function canJump(nums: number[]): boolean {
//     const dp = new Array(nums.length).fill(false)
//     dp[0] = true
//     for (let i = 1; i < nums.length; i++) {
//         for (let j = 0; j < i; j++) {
//             if (dp[j] && j + nums[j] >= i) {
//                 dp[i] = true
//                 break
//             }
//         }
//     }
//     // console.table(dp)
//     return dp[nums.length - 1]
// }
// console.log(canJump([2, 3, 1, 1, 4]))
// console.log(canJump([3, 2, 1, 0, 4]))

// 贪心算法(编码很简洁，但是很巧妙不好想到)
// 每次移动取最大跳跃步数（得到最大的覆盖范围），每移动一个单位，就更新最大覆盖范围。
// [2, 3, 1, 1, 4]

// notice:错误，想象一下，后一次的范围依赖于前一次的范围是否能够达到
// function canJump(nums: number[]): boolean {
//     let maximumRange = 0
//     for (let i = 0; i < nums.length - 1; i++) {
//         maximumRange = Math.max(maximumRange, i + nums[i])
//     }
//     console.log(maximumRange)

//     return maximumRange >= nums.length - 1
// }
// canJump([3, 2, 1, 0, 4])
function canJump(nums: number[]): boolean {
  let maximumRange = 0;
  for (let i = 0; i <= maximumRange && i < nums.length; i++) {
    maximumRange = Math.max(maximumRange, i + nums[i]);
  }

  return maximumRange >= nums.length - 1;
}
// canJump([2, 3, 1, 1, 4])

```

### 🚀 6.跳跃游戏2.ts
```typescript
/**
 * @url https://leetcode.cn/problems/jump-game-ii/description/
 */

// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

// dp[i]表示到达位置i的最小跳跃数
// function jump(nums: number[]): number {
//     const dp = new Array(nums.length).fill(Number.MAX_SAFE_INTEGER)
//     dp[0] = 0
//     for (let i = 1; i < nums.length; i++) {
//         for (let j = 0; j < i; j++) {
//             if (j + nums[j] >= i) {
//                 dp[i] = Math.min(dp[i], dp[j] + 1)
//             }
//         }
//     }
//     return dp[nums.length - 1]
// }

// 贪心算法
function jump(nums: number[]): number {
    if (nums.length === 1) return 0
    let steps = 0, //步数
        currentScope = 0,
        nextStepScope = 0
    for (let i = 0; i < nums.length; i++) {
        nextStepScope = Math.max(nextStepScope, i + nums[i])
        if (i === currentScope) {
            steps++
            currentScope = nextStepScope
            if (nextStepScope >= nums.length - 1) {
                break
            }
        }
    }
    return steps
}

```

### ⭐ 7.k次取反化后最大化的数组和.ts
```typescript
/**
 * @url https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/description/
 */

// 优先负数，然后最小的正数
// notice：这种算法是只能选择一次
// function largestSumAfterKNegations(nums: number[], k: number): number {
//     nums.sort((a, b) => a - b)
//     let idx = 0
//     while (k--) {
//         nums[idx] = -nums[idx]
//         idx++
//     }
//     return nums.reduce((acc, cur) => acc + cur, 0)
// }

// 优先负数，然后对于最小的正数进行反转
// TODO:可以优化一下时间复杂度

// function largestSumAfterKNegations(nums: number[], k: number): number {
//     while (k--) {
//         nums.sort((a, b) => a - b)
//         let index = nums.findIndex((_num) => _num < 0)
//         nums[index] *= -1

//         if (index === -1) {
//             nums.sort((a, b) => a - b)
//             nums[0] *= -1
//         }
//     }
//     return nums.reduce((acc, cur) => acc + cur, 0)
// }

function largestSumAfterKNegations(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0 && k > 0) {
      nums[i] *= -1;
      k--;
    }
  }
  nums.sort((a, b) => a - b); // PS: 注意二次排序
  if (k % 2 === 1) {
    nums[0] *= -1;
  }
  return nums.reduce((acc, cur) => acc + cur, 0);
}

```

### ⭐ 8.加油站.ts
```typescript
/**
 * @url https://leetcode.cn/problems/gas-station/description/
 */

// -2 -2  -2 3 3
// notice：考虑错了,并不是从剩余中最大的出去就是好的
// function canCompleteCircuit(gas: number[], cost: number[]): number {
//     const arr: number[] = [] // 表示arr[i]前往i+1站剩余的邮费
//     for (let i = 0; i < gas.length; i++) {
//         arr.push(gas[i] - cost[i])
//     }
//     console.log(arr)
//     let maxIndex = arr.indexOf(Math.max(...arr))
//     let curIndex = maxIndex
//     let count = 0,
//         curNum = 0
//     while (count < gas.length) {
//         count++
//         curNum += arr[curIndex % gas.length]
//         console.log(count, gas.length, "cur")

//         if (curNum <= 0 && count !== gas.length) {
//             return -1
//         }
//         curIndex++
//     }

//     return maxIndex
// }
// console.log(canCompleteCircuit([5, 8, 2, 8], [6, 5, 6, 6]))

// TODO:暴力解法,超时了。技巧：环形链表用while来遍历比较好
// function canCompleteCircuit(gas: number[], cost: number[]): number {
//     const arr: number[] = [] // 表示arr[i]前往i+1站剩余的邮费
//     let result = -1
//     for (let i = 0; i < gas.length; i++) {
//         arr.push(gas[i] - cost[i])
//     }
//     for (let i = 0; i < gas.length; i++) {
//         let curIndex = i,
//             count = gas.length,
//             res = 0,
//             isPass = true
//         while (count--) {
//             res += arr[curIndex++ % gas.length]
//             if (res < 0) {
//                 isPass = false
//                 break
//             }
//         }
//         if (isPass) {
//             result = curIndex % gas.length
//             break
//         }
//     }
//     return result
// }

// *贪心:总数只要大于0一定就可以走完，看看从什么时候开始小于0，然后更新起始的下标索引。
function canCompleteCircuit(gas: number[], cost: number[]): number {
  const arr: number[] = []; // 表示arr[i]前往i+1站剩余的邮费
  for (let i = 0; i < gas.length; i++) {
    arr.push(gas[i] - cost[i]);
  }
  let startIndex = 0,
    totalSum = 0,
    curSum = 0;
  for (let i = 0; i < gas.length; i++) {
    curSum += arr[i];
    totalSum += arr[i];
    if (curSum < 0) {
      startIndex = i + 1;
      curSum = 0;
    }
  }
  if (totalSum < 0) return -1;
  return startIndex;
}

```

### 💫 9.分发糖果.ts
```typescript
/**
 * @url https://leetcode.cn/problems/candy/description/
 */

// notice：先考虑一遍，然后再进行整合
function candy(ratings: number[]): number {
  const res = new Array(ratings.length).fill(1);
  // 确定右孩子比左孩子大的情况
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      res[i] = res[i - 1] + 1;
    }
  }
  console.log("res", res);

  // 确定左孩子比右孩子大，倒序遍历，因为要用到后面先比较的结果
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      res[i] = Math.max(res[i], res[i + 1] + 1);
    }
  }
  console.log(res);

  return res.reduce((acc, cur) => acc + cur, 0);
}
candy([1, 0, 2]);

```

### 🛠️ 10.柠檬水找零.ts
```typescript
/**
 * @url https://leetcode.cn/problems/lemonade-change/description/
 */

// [5,5,5,10,20]
// 返回的时候，优先返回面额大的

// 账单只会支付20元,账单为20元的判断错误了
// function lemonadeChange(bills: number[]): boolean {
//     const map = new Array(3).fill(0) // 分别表示5元钞票，10元钞票，15元钞票的张数
//     for (let i = 0; i < bills.length; i++) {
//         if (bills[i] === 20) {
//             if (map[1] <= 0 || map[0] <= 0) {
//                 return false
//             }
//             map[1]--
//             map[0]--
//             map[2]++
//         } else if (bills[i] === 10) {
//             if (map[0] <= 0) {
//                 return false
//             }
//             map[1]++
//             map[0]--
//         } else {
//             map[0]++
//         }
//     }
//     return true
// }

// 贪心的策略就是当20的时候，优先去找10元的
function lemonadeChange(bills: number[]): boolean {
    const map = new Array(3).fill(0) // 分别表示5元钞票，10元钞票，15元钞票的张数
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] === 20) {
            if (map[1] <= 0) {
                if (map[0] < 3) {
                    return false
                }
                map[0] -= 3
            } else {
                if (map[0] <= 0) {
                    return false
                }
                map[0]--
                map[1]--
                map[2]++
            }
        } else if (bills[i] === 10) {
            if (map[0] <= 0) {
                return false
            }
            map[1]++
            map[0]--
        } else {
            map[0]++
        }
    }
    return true
}

```

### 🎯 11.根据身高重建队列.ts
```typescript
/**
 * @url https://leetcode.cn/problems/queue-reconstruction-by-height/description/
 */

// notice：题意剖析：给一个随意排序的数组，根据数组中的特性进行重建
// 贪心：people[i][1]越小的人在越前面么？❎
// TODO:本题两个维度，一定是先确认其中一个维度，可以尝试一下（本题先将身高确认下来，再来改变数组，确认k）

// [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
// [ [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 0 ], [ 5, 2 ], [ 4, 4 ] ]
// notice:排序有点问题
// function reconstructQueue(people: number[][]): number[][] {
//     people.sort((a, b) => b[0] - a[0])
//     for (let i = 0; i < people.length; i++) {
//         people.splice(i, 1)
//         people.splice(people[i][1], 0, people[i])
//     }
//     return people
// }

function reconstructQueue(people: number[][]): number[][] {
  people.sort((a, b) => {
    // 身高相等，h大的放后面
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  const res = people.concat();

  for (let i = 0; i < people.length; i++) {
    res.splice(i, 1);
    res.splice(people[i][1], 0, people[i]);
  }
  return res;
}

console.log(
  reconstructQueue([
    [7, 0],
    [4, 4],
    [7, 1],
    [5, 0],
    [6, 1],
    [5, 2],
  ])
);

```

### 🎯 12.用最小数量的箭引爆气球.ts
```typescript
/**
 * @url https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/
 */

// 升序--> 处理最小公共区间，记录有多少区间
// notice:其实就是找非重叠区间的个数
function findMinArrowShots(points: number[][]): number {
  let count = 0,
    section = new Array(2).fill(0);

  points.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      section[0] = points[i][0];
      section[1] = points[i][1];
      count++;
      continue;
    }
    if (points[i][0] > section[1]) {
      count++;
      section[0] = points[i][0];
      section[1] = points[i][1];
    } else {
      section[0] = points[i][0];
      section[1] = Math.min(points[i][1], section[1]);
    }
  }
  return count;
}

```

### 🎮 13.无重叠区间.ts
```typescript
/**
 * @url https://leetcode.cn/problems/non-overlapping-intervals/description/
 */
// 本题和上题的区别就是求重叠区间的最小个数
// notice：因为是排序之后，所以只需要关注右边界
// TODO:思考一下边界情况,怎么去判断的。
function eraseOverlapIntervals(intervals: number[][]): number {
    intervals.sort((a, b) => a[0] - b[0])

    let count = 0,
        rightInterval = intervals[0][1]

    for (let i = 1; i < intervals.length; i++) {
        // 左边界小于上一次的右边界，说明有一次的重叠区域
        if (intervals[i][0] < rightInterval) {
            console.log(intervals[i], rightInterval)
            count++
            rightInterval = Math.min(rightInterval, intervals[i][1])
        } else {
            rightInterval = intervals[i][1]
        }
    }
    return count
}

console.log(
    eraseOverlapIntervals([
        [1, 2],
        [2, 3],
        [3, 4],
        [-100, -2],
        [5, 7],
    ])
)

```

### ⭐ 14.划分字母区间.ts
```typescript
/**
 * @url https://leetcode.cn/problems/partition-labels/description/
 */

// "ababcbacadefegdehijhklij"
// 例如找到a，需要找到a的某尾，以此类推，一直往后遍历，直到遍历到end+1
// 贪心策略：找到一段字符串的最末尾，然后截断。每次都是最小的一段，最后结果就是截断成各个最小的一段。
function partitionLabels(s: string): number[] {
  let rightIndex = 0,
    lastIndex = 0,
    res: number[] = [];
  const findStrLastIndex = (str: string) => {
    return s.lastIndexOf(str);
  };
  for (let i = 0; i < s.length; i++) {
    if (i > rightIndex) {
      res.push(rightIndex - lastIndex + 1);
      lastIndex = rightIndex + 1; // PS:lastIndex===rightIndex的话，会重复计算一次！！！
    }
    rightIndex = Math.max(findStrLastIndex(s[i]), rightIndex);
  }
  // console.log(rightIndex, lastIndex)
  res.push(rightIndex - lastIndex + 1);
  return res;
}
// console.log(partitionLabels("aaaaabbbb"))

```

### ⭐ 15.合并区间.ts
```typescript
/**
 * @url https://leetcode.cn/problems/merge-intervals/description/
 */

// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]) // 先排序最左边
    let rightIndex = intervals[0][1], // 记录右区间
        leftIndex = intervals[0][0],
        res: number[][] = []

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= rightIndex) {
            // 说明区间被重合
            rightIndex = Math.max(rightIndex, intervals[i][1]) // 注意取最大区间
        } else {
            res.push([leftIndex, rightIndex])
            leftIndex = intervals[i][0]
            rightIndex = intervals[i][1]
        }
    }
    res.push([leftIndex, rightIndex])
    return res
}

```

### 💡 16.单调递增的数字.ts
```typescript
/**
 * @url https://leetcode.cn/problems/monotone-increasing-digits/description/
 */

// 当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。
// 给定一个整数 n ，返回 小于或等于 n 的最大数字，且数字呈 单调递增 。
// TODO:遍历顺序，从前到后，不能利用上次已经改变的结果！！！！比如1009 123329，体会一下  从前到后遍历，也会影响前面相应的比较
// notice:这样的方法，没有考虑到前面改变了，后面会改变。应该统一将后面改为9
// function monotoneIncreasingDigits(n: number): number {
//     const arr = n
//         .toString()
//         .split("")
//         .map((_num) => Number.parseInt(_num))
//     for (let i = arr.length - 2; i >= 0; i--) {
//         if (arr[i] > arr[i + 1]) {
//             arr[i] -= 1
//             arr[i + 1] = 9
//         }
//     }
//     return Number.parseInt(arr.join(""))
// }
// TODO:细节挺多的
function monotoneIncreasingDigits(n: number): number {
    const arr = n
        .toString()
        .split("")
        .map((_num) => Number.parseInt(_num))
    let flag = arr.length
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            arr[i] -= 1
            flag = i + 1
        }
    }
    for (let i = flag; i < arr.length; i++) {
        arr[i] = 9
    }
    return Number.parseInt(arr.join(""))
}

```

## ⭐ 10.前端相关手写

### 🧩 1.实现js原生方法

#### ⭐ 1.filter.js
```typescript
// Notice:回调函数没有this
// Array.prototype.myFilter = (callback) => {
//     console.log(this)
//     const result = []
//     for (let i = 0; i < this.length; i++) {
//         console.log(callback(this[i]))
//         if (callback(this[i], i, this)) {
//             result.push(this[i])
//         }
//     }
//     return result
// }

// 普通遍历实现
// Array.prototype.myFilter = function (callback) {
//     const result = []
//     for (let i = 0; i < this.length; i++) {
//         if (callback(this[i], i, this)) {
//             result.push(this[i])
//         }
//     }
//     return result
// }

// reduce来实现
Array.prototype.myFilter = function (callback) {
    return this.reduce((acc, cur, index) => {
        if (callback(cur, index)) {
            acc.push(cur)
        }
        return acc
    }, [])
}
let arr = [1, 2, 3, 4, 5]
arr = arr.myFilter((item) => {
    return item >= 3
})
console.log(arr)

```

#### 📚 2.flat.js
```typescript
Array.prototype.myFlat = function(depth){
    const res = []
    const dfs = (arr, leval)=>{
        for (let i = 0; i < arr.length; i++) {
            if(Array.isArray(arr[i])){
                if (leval === depth) {
                    res.push(arr[i])
                    return
                }
                dfs(arr[i], leval + 1)
            }else{
                res.push(arr[i])
            }
        }
    }
    dfs(this, 1)
    return res
}


// 有点小混乱
let arr = [1, 2, 3, [3, 2, [1, 2, 3]]]
console.log(arr.myFlat(2))

```

#### 🧩 3.forEach.js
```typescript
Array.prototype._forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this)
    }
}

```

#### 📚 4.map.js
```typescript
Array.prototype._map = function (callback) {
    return this.reduce((acc, cur, index) => {
        acc.push(callback(cur, index, this))
        return acc
    }, [])
}
const res = [2, 3, 4]
console.log(res._map((_v) => _v ** 2))

```

#### 🚀 5.reduce.js
```typescript
Array.prototype._reduce = function (callback, initValue) {
    let res = initValue
    for (let i = 0; i < this.length; i++) {
        res = callback(res, this[i], i)
    }
    return res
}
let arr = [1, 2, 3, 4, 5]
console.log(
    arr._reduce((acc, cur) => {
        return acc + cur
    }, 0)
)

```

#### 📚 6.fill.js
```typescript
Array.prototype._fill = function (value, start, end) {
    start = start < 0 ? 0 : start
    end = end > this.length - 1 ? this.length - 1 : end
    for (let i = start; i <= end; i++) {
        this[i] = value
    }
    return this
}
let arr = [1, 2, 3, 4, 5]
console.log(arr._fill(6, 2, 5))

```

#### 🎲 7.includes.js
```typescript
Array.prototype._includes = function (value) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return true
        }
    }
    return false
}
let arr = [1, 2, 3, 4, 5]
console.log(arr._includes(3))
console.log(arr._includes(6))

```

#### 🛠️ 8.push.js
```typescript
Array.prototype._push = function (value) {
    this[this.length] = value
    return this.length // 注意返回值
}
let arr = [1, 2, 3, 4, 5]
arr._push(6)
console.log(arr)

```

#### 🎲 9.unshift.js
```typescript
Array.prototype._unshift = function (value) {
    for (let i = this.length - 1; i >= 0; i--) {
        this[i + 1] = this[i]
    }
    this[0] = value
    return this.length
}
let arr = [1, 2, 3, 4, 5]
arr._unshift(0)
console.log(arr)

```

#### 🎮 10.getLeval.js
```typescript
Array.prototype.getLeval = function () {
    let depth = 1
    const dfs = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                depth++
                dfs(arr[i])
            }
        }
    }
    dfs(this)   
    return depth
}

let arr = [1, 2, 3, [4, [5]]]
console.log(arr.getLeval())

```

#### 🚀 11.interator.js
```typescript
// 实现迭代器
// Array.prototype._interator = function () {
//     let i = 0
//     return {
//         next: () => {
//             return {
//                 value: this[i++],
//                 done: i < this.length ? false : true,
//             }
//         },
//     }
// }
// let arr = [1, 2, 3, 4, 5]
// const b = arr._interator()
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())
let obj = {
    [Symbol.iterator]() {
        return {
            i: 0,
            next() {
                if (this.i < 5) {
                    return {
                        value: this.i++,
                        done: false
                    }
                }
                return { value: undefined, done: true }
            }
        }
    }
}

// 测试
for (let i of obj) {
    console.log("i", i)  // 依次输出 0,1,2,3,4
}

```

#### 🎮 12.sort.TODO.js
```typescript
// TODO:复习完排序算法，再来复习sort函数
Array.prototype._sort = function (callback) { }

```

#### 🚀 13.Set.js
```typescript

```

#### 🔰 14.Map.js
```typescript

```

#### 🧩 15.assign.js
```typescript
Object.prototype._assign = function (target, ...source) {
    source.forEach((_obj) => {
        for (let key in _obj) {
            if (target.hasownProperty(key)) {
                target[key] = _obj[key]
            } else {
                target[key] = _obj[key]
            }
        }
    })
    return target
}
let a = { a: 1 }
let b = { b: 2 }
let c = { c: 3 }
console.log(Object.assign(a, b, c))
console.log(a)

```

#### 🎲 16.is.js
```typescript
Object.prototype._is = function (x, y) {
    // 判断是否是同一对象（包括 +0/-0） +0和-0是不等的
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y
    } else {
        // 判断是否是 NaN,如果是NAN,is就是相等的
        return x !== x && y !== y
    }
}

```

#### 🚀 17.json.stringify.TODO.js
```typescript
/** https://juejin.cn/post/6844903861971320846?searchId=20240811235902CCC1D8113CE9807307E3 */
/** https://juejin.cn/post/6844903861971320846?searchId=20240811235902CCC1D8113CE9807307E3 */

function jsonStringify(data) {
    // 处理基础类型
    if (data === null) return 'null';
    if (data === undefined) return undefined;
    if (typeof data === 'boolean') return data.toString();
    if (typeof data === 'number') {
        return isFinite(data) ? data.toString() : 'null';
    }
    if (typeof data === 'string') return `"${data}"`;
    if (typeof data === 'symbol') return undefined;
    if (typeof data === 'function') return undefined;

    // 处理数组
    if (Array.isArray(data)) {
        const items = data.map(item => jsonStringify(item) ?? 'null');
        return `[${items.join(',')}]`;
    }

    // 处理对象
    if (typeof data === 'object') {
        // 处理日期对象
        if (data instanceof Date) {
            return `"${data.toISOString()}"`;
        }

        // 处理正则对象
        if (data instanceof RegExp) {
            return '{}';
        }

        const items = Object.entries(data)
            .filter(([_, value]) => value !== undefined && typeof value !== 'function')
            .map(([key, value]) => `"${key}":${jsonStringify(value)}`);

        return `{${items.join(',')}}`;
    }
}

// 测试用例
const testCases = [
    // 基础类型
    null,
    undefined,
    true,
    123,
    "hello",
    Symbol(),
    () => { },
    NaN,
    Infinity,

    // 数组
    [1, "2", true, null, undefined],

    // 对象
    {
        name: "张三",
        age: 25,
        married: false,
        children: null,
        symbol: Symbol(),
        func: function () { },
        date: new Date(),
        reg: /test/,
        undef: undefined
    }
];

// 测试并比较结果
testCases.forEach((test, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log('自定义实现:', jsonStringify(test));
    console.log('原生实现:', JSON.stringify(test));
    console.log('---');
});
```

#### 💫 18.json.parse.TODO.js
```typescript
function jsonParse(str) {
    // 去除空白字符
    str = str.trim();

    // 记录当前解析位置
    let i = 0;

    // 解析主函数
    function parseValue() {
        const char = str[i];

        if (char === '{') return parseObject();
        if (char === '[') return parseArray();
        if (char === '"') return parseString();
        if (char === 't') return parseTrue();
        if (char === 'f') return parseFalse();
        if (char === 'n') return parseNull();
        return parseNumber();
    }

    // 解析对象
    function parseObject() {
        i++; // 跳过 '{'
        const result = {};

        while (i < str.length) {
            if (str[i] === '}') {
                i++;
                return result;
            }

            if (str[i] === ',') {
                i++;
                continue;
            }

            // 解析键
            const key = parseString();
            i++; // 跳过 ':'
            // 解析值
            const value = parseValue();
            result[key] = value;
        }
        return result;
    }

    // 解析数组
    function parseArray() {
        i++; // 跳过 '['
        const result = [];

        while (i < str.length) {
            if (str[i] === ']') {
                i++;
                return result;
            }

            if (str[i] === ',') {
                i++;
                continue;
            }

            const value = parseValue();
            result.push(value);
        }
        return result;
    }

    // 解析字符串
    function parseString() {
        i++; // 跳过开始的双引号
        let result = '';

        while (str[i] !== '"') {
            if (str[i] === '\\') {
                i++;
                if (str[i] === 'n') result += '\n';
                else if (str[i] === 'r') result += '\r';
                else if (str[i] === 't') result += '\t';
                else result += str[i];
            } else {
                result += str[i];
            }
            i++;
        }

        i++; // 跳过结束的双引号
        return result;
    }

    // 解析数字
    function parseNumber() {
        let start = i;
        while (i < str.length && /[\d.+-e]/i.test(str[i])) {
            i++;
        }
        return Number(str.slice(start, i));
    }

    // 解析 true
    function parseTrue() {
        i += 4; // 跳过 'true'
        return true;
    }

    // 解析 false
    function parseFalse() {
        i += 5; // 跳过 'false'
        return false;
    }

    // 解析 null
    function parseNull() {
        i += 4; // 跳过 'null'
        return null;
    }

    return parseValue();
}

// 测试用例
const testCases = [
    '{"name":"张三","age":25,"married":false,"children":null}',
    '[1,2,3,"4",true,null]',
    '{"scores":[90,85,88],"pass":true}',
    '"Hello\\nWorld"',
    '123.456',
    'true',
    'false',
    'null'
];

testCases.forEach((test, index) => {
    console.log(`测试用例 ${index + 1}:`);
    console.log('自定义实现:', jsonParse(test));
    console.log('原生实现:', JSON.parse(test));
    console.log('---');
});
```

#### 💫 19.call bind apply.js
```typescript
// 在调用 func 时要使用的 this 值。如果函数不在严格模式下，
// null 和 undefined 将被替换为全局对象，并且原始值将被转换为对象。
Function.prototype._call = function (context, ...args) {
    context = !context ? window : context
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}
Function.prototype._bind = function (context, ...args1) {
    context = !context ? window : context
    context._fn = this
    return function (...args2) {
        const result = context._fn(...[...args1, ...args2])
        delete context._fn
        return result
    }
}
Function.prototype._apply = function (context, args) {
    context = !context ? window : context
    context._fn = this
    const result = context._fn(...args)
    delete context._fn
    return result
}

```

#### 🎲 20.typeof.js
```typescript
// typeof null 是object
// 基础数据类型：number string boolean undefined null symbol
// 引用数据类型：object array

```

#### 📚 21.instanceof.js
```typescript
// 针对于引用数据类型，基本数据类型判断不了

/** 判断左侧是否属于构造函数
 * left 实例
 * right 构造函数
 */
function myInstanceOf(left, rigth) {
    let __proto = left.__proto__,
        prototype = rigth.prototype
    while (__proto) {
        if (prototype === __proto) {
            return true
        }
        __proto = __proto.__proto__
    }
    return false
}

console.log(myInstanceOf([], Array))

```

#### 🔰 22.new.js
```typescript
// （1）首先创建了一个新的空对象
// （2）设置原型，将对象的原型设置为函数的 prototype 对象。
// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const res = fn.call(obj, ...args)
    return typeof res === "object" ? res : obj
}
function Person(name) {
    this.name = name
}
Person.prototype.say = function () {
    console.log("hello")
}
const obj = myNew(Person, "ljq")
obj.say()
console.log(obj)

```

#### ⭐ 23.trim.js
```typescript
String.prototype._trim = function () {
    let left = 0,
        right = this.length - 1
    for (let i = 0; i < this.length; i++) {
        if (this[i] === " ") {
            left++
        } else {
            break
        }
    }
    for (let i = right; i >= 0; i--) {
        if (this[i] === " ") {
            right--
        } else {
            break
        }
    }
    return this.slice(left, right + 1)
}

let str = "    hello     ww   "
console.log(str._trim())

```

### ⭐ 2.实现Promise相关

#### 🎲 1.all.js
```typescript
Promise._all = function (promises) {
    let count = 0 // 记录完成的数量
    const result = []
    return new Promise((resolve, reject) => {
        promises.forEach((_promise, _idx) => {
            _promise().then((res) => {
                result[_idx] = res
                count++
                if (count === promises.length) {
                    resolve(result)
                }
            })
        })
    })
}
function my(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}

const promise1 = () => my(2000)
const promise2 = () => my(3000)
const promise3 = () => my(5000)
const promise4 = () => my(4000)

Promise._all([promise1, promise2, promise3, promise4]).then((res) => {
    console.log(res)
})

```

#### ⭐ 2.finally.js
```typescript
// 1.承接上一次Promise的值
// 2.return的值不会被任何地方接收
Promise.prototype._finally = function (callback) {
    return this.then(
        (res) => {
            callback()
            return res
        },
        (err) => {
            callback()
            throw err
        }
    )
}

function my(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}
const promise1 = () => my(300)

// promise1()
//     .then((res) => {
//         console.log(res)
//         return "111"
//     })
//     ._finally((res) => {
//         console.log(res)
//         return "hellow"
//     })
//     .then((res) => {
//         console.log("finally", res)
//     })

// promise1()
//     .then((res) => {
//         console.log(res)
//         return "111"
//     })
//     .finally((res) => {
//         console.log(res)
//         return "hellow"
//     })
//     .then((res) => {
//         console.log("finally", res)
//     })
Promise.reject("err")
    .finally(() => {
        console.log("finally")
    })
    .catch(console.log)
    .then((res) => console.log(res))

```

#### 🎲 3.allSettled.js
```typescript
// 获取所有Promise对象的状态

Promise._allSettled = function (promises) {
    let count = 0,
        result = []
    return new Promise((resolve) => {
        promises.forEach((_promise, _idx) => {
            _promise
                .then(
                    (res) => {
                        result[_idx] = {
                            status: "fulfilled",
                            value: res,
                        }
                    },
                    (err) => {
                        result[_idx] = {
                            status: "rejected",
                            value: err,
                        }
                    }
                )
                .finally(() => {
                    count++
                    if (count >= promises.length) {
                        resolve(result)
                    }
                })
        })
    })
}

const pro = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3)
    }, 1000)
})

Promise.allSettled([pro, Promise.resolve(1), Promise.reject(2)]).then((data) => {
    console.log(data)
})

Promise._allSettled([pro, Promise.resolve(1), Promise.reject(2)]).then((data) => {
    console.log(data)
})

```

#### 🔰 4.race.js
```typescript
// 手写Promise.race
Promise._race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((_promise) => {
            _promise
                .then((res) => {
                    resolve(res)
                })
                .catch(reject)
        })
    })
}

const promise1 = new Promise((resolve) =>
    setTimeout(() => {
        resolve(1)
    }, 300)
)

const promise2 = new Promise((reject) => {
    setTimeout(() => {
        reject(2)
    }, 400)
})

Promise._race([promise1, promise2])
    .then((res) => {
        console.log(res)
    })
    .catch(console.log)

```

#### 🛠️ 5.catch.js
```typescript
// 实现catch函数
Promise.prototype._catch = function (callback) {
    this.then(undefined, (err) => callback(err))
}

```

#### 🚀 6.resolve.js
```typescript
// 实现resolve函数
// - thenable对象
// - promise对象
// - 值
function myResolve(value) {
    // 如果 value 已经是 Promise 对象，则直接返回该 Promise 对象
    if (value instanceof Promise) {
        return value
    }
    // 如果 value 是 thenable 对象，则包装成 Promise 对象并返回
    if (value && typeof value.then === "function") {
        return new Promise(function (resolve, reject) {
            value.then(resolve, reject)
        })
    }
    // 将传入的值作为 Promise 的成功值，并返回 Promise 对象
    return new Promise(function (resolve) {
        resolve(value)
    })
}

// thenable对象
const obj = {
    then(resolve, reject) {
        resolve("111")
    },
}

```

#### 🎮 7.reject.js
```typescript
// 实现reject函数
// - 普通值 直接catch捕获
// - promise 抛出这个promis，不会重复利用promise的值
Promise._reject = function (value) {
    return new Promise((_, reject) => {
        reject(value)
    })
}

```

### 💡 3.Promise场景题

#### 🧩 1.交通灯.js
```typescript
// 红灯3秒亮一次，绿灯2秒亮一次，黄灯1秒亮一次；如何让三个灯不断交替重复亮灯？
// 要求：用Promise实现
function red() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("red")
            resolve()
        }, 3000)
    })
}
function green() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("green")
            resolve()
        }, 2000)
    })
}
function yellow() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("yellow")
            resolve()
        }, 1000)
    })
}

// 递归
const step = () => red().then(() => green().then(() => yellow().then(() => step())))
step()

// async await实现
const taskRunner = async () => {
    await red()
    await green()
    await yellow()
    taskRunner()
}

taskRunner()

```

#### 🔥 2.封装一个fetch请求.js
```typescript
;(async () => {
    class HttpRequestUtil {
        async get(url) {
            const res = await fetch(url)
            const data = await res.json()
            return data
        }
        async post(url, data) {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const result = await res.json()
            return result
        }
        async put(url, data) {
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data),
            })
            const result = await res.json()
            return result
        }
        async delete(url, data) {
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data),
            })
            const result = await res.json()
            return result
        }
    }
    const httpRequestUtil = new HttpRequestUtil()
    const res = await httpRequestUtil.get("http://golderbrother.cn/")
    console.log(res)
})()

```

#### 💡 3.重复执行函数.js
```typescript
// 基于 tapable 思想，构造异步任务串
// https://juejin.cn/post/6844903700872298510
const repeat = (cb, delay = 1000, times = 5) => {
    /* 高阶函数 */
    return function (text) {
        const AsyncFn = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    cb(text)
                    resolve()
                }, delay)
            })

        // 构建异步任务串
        new Array(times).fill(AsyncFn).reduce((acc, cur) => {
            return acc.then(() => cur())
        }, Promise.resolve())
        // ps: polifill如下
        // return Promise.resolve().then(() => AsyncFn()).then(() => AsyncFn()).then(() => AsyncFn()).then(() => AsyncFn())
    }
}

const mockLog = repeat(console.log)

mockLog("Hello world!!")

```

#### 🌟 4.网络请求时间限制.js
```typescript
// 网络请求，超过2s就报错，小于2s返回正常结果
function Limit(promises) {
    return new Promise((resolve, reject) => {
        Promise.race([...promises, requestErr()])
            .then((res) => {
                console.log("成功")
                resolve()
            })
            .catch((err) => {
                console.log("失败")
                reject()
            })
    })
}

const requestPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("请求成功")
            resolve()
        }, 1000)
    })
}

const requestErr = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("请求失败")
            reject()
        }, 2000)
    })
}

Limit([requestPromise()])

```

#### 🔥 5.请求5s未完成就终止.js
```typescript
// AbortController 它能够中止 fetch 请求、各种响应主体或者流的消耗。
// @url https://juejin.cn/post/7112699475327615006

/**
 * 发起请求，如果超过指定时间未完成则终止
 * @param {string} url 请求地址
 * @param {number} timeout 超时时间（毫秒）
 */
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController(); // ps:可以丢弃请求的API
    const signal = controller.signal;

    // 创建一个超时Promise
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            controller.abort();
            reject(new Error(`请求超时: ${timeout}ms`));
        }, timeout);
    });

    try {
        // 使用 Promise.race 竞争，谁先完成用谁的结果
        const response = await Promise.race([
            fetch(url, { signal }),
            timeoutPromise
        ]);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('请求已被终止');
        }
        throw error;
    }
}

// 使用示例
async function example() {
    try {
        // 模拟一个可能超时的请求
        const data = await fetchWithTimeout('https://api.example.com/data', 5000);
        console.log('请求成功:', data);
    } catch (error) {
        console.error('请求失败:', error.message);
    }
}
```

#### 🚀 6.实现一个sleep函数.js
```typescript
function sleep(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

```

#### 🎲 7.setTime实现setInterval.js
```typescript
// TODO:实现取消
function mySetInterval(callback, delay) {
    const recurit = () => {
        setTimeout(() => {
            callback()
            recurit()
        }, delay)
    }
    recurit()
}
mySetInterval(() => {
    console.log("111")
}, 1000)

```

#### 💫 8.奇怪的输出题.js
```typescript
// Promise.resolve()
//     .then(() => {
//         console.log(0)
//         return 4
//     })
//     .then(console.log)
// Promise.resolve()
//     .then(() => {
//         console.log(1)
//     })
//     .then(() => {
//         console.log(2)
//     })
//     .then(() => {
//         console.log(3)
//     })
//     .then(() => {
//         console.log(5)
//     })
//     .then(() => {
//         console.log(6)
//     })
// 0 1 4 2 3 5 6
Promise.resolve()
    .then(() => {
        console.log(0)
        return Promise.resolve(4)
    })
    .then((res) => {
        console.log(res)
    })

Promise.resolve()
    .then(() => {
        console.log(1)
    })
    .then(() => {
        console.log(2)
    })
    .then(() => {
        console.log(3)
    })
    .then(() => {
        console.log(5)
    })
    .then(() => {
        console.log(6)
    })

// https://juejin.cn/post/6949699310732869669

```

#### 🚀 10.封装ajax请求.js
```typescript
/**
 * 封装 ajax 请求
 * @param {string|object} options 请求配置或URL
 * @param {string} options.url 请求地址
 * @param {string} options.method 请求方法
 * @param {object} options.headers 请求头
 * @param {object} options.data 请求数据
 * @param {number} options.timeout 超时时间
 */
function axios(options) {
    if (typeof options === 'string') {
        options = {
            url: options
        }
    }
    const {
        url,
        method = 'GET',
        headers = {},
        data = null,
        timeout = 5000
    } = options

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        // 设置超时
        xhr.timeout = timeout
        xhr.ontimeout = () => reject(new Error('请求超时'))

        // 监听请求状态
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return

            if (this.status >= 200 && this.status < 400) {
                let response
                try {
                    response = JSON.parse(this.response)
                } catch (e) {
                    response = this.response
                }
                resolve(response)
            } else {
                reject(new Error(this.statusText || '请求失败'))
            }
        }

        // 错误处理
        xhr.onerror = function () {
            reject(new Error(this.statusText || '网络错误'))
        }

        // 处理请求方法
        xhr.open(method.toUpperCase(), url, true)

        // 设置默认请求头
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')

        // 设置自定义请求头
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })

        // 发送请求
        let body = null
        if (data) {
            body = typeof data === 'object' ? JSON.stringify(data) : data
        }
        xhr.send(body)
    })
}

// 添加便捷方法
axios.get = function (url, options = {}) {
    return axios({
        ...options,
        url,
        method: 'GET'
    })
}

axios.post = function (url, data, options = {}) {
    return axios({
        ...options,
        url,
        method: 'POST',
        data
    })
}

// 使用示例
async function example() {
    try {
        // GET 请求
        const getData = await axios.get('https://api.example.com/data', {
            headers: {
                'Authorization': 'Bearer token'
            },
            timeout: 3000
        })

        // POST 请求
        const postData = await axios.post('https://api.example.com/create', {
            name: 'test',
            age: 18
        }, {
            headers: {
                'X-Custom-Header': 'value'
            }
        })

        // 直接使用
        const response = await axios({
            url: 'https://api.example.com/update',
            method: 'PUT',
            data: { id: 1 },
            headers: {
                'Authorization': 'Bearer token'
            }
        })
    } catch (error) {
        console.error('请求失败:', error.message)
    }
}
```

#### 🔰 11.setInterval模拟setTimeOut.js
```typescript
function myTimeOut(cb, delay) {
    const timer = setInterval(() => {
        cb()
        clearInterval(timer)
    }, delay)
}
myTimeOut(() => console.log(111111), 1000)

```

#### 💡 12.promise如何中断后面的then.js
```typescript
// Promise.resolve()
//     .then(() => {
//         console.log(111)
//     })
//     .then(() => {
//         console.log(222)
//     })
// 打印 111 222

Promise.resolve()
    .then(() => {
        console.log(1111)
        return new Promise(() => { })
    })
    .then(() => {
        console.log(2222)
    })

```

#### 💡 13.实现一个精准的计时器.js
```typescript
// 参考：https://juejin.cn/post/7128231937457520671    
// 参考：https://juejin.cn/post/7029252274299879454
// ps: 核心通过requestAnimationFram来手动进行校验
```

#### 💡 14.一次处理2个任务.js
```typescript
function task(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const timestamp = (Date.now() / 1000) | 0
            resolve(timestamp)
        }, time)
    }).then((res) => {
        console.log('res', res)
    })
}

async function concurrent(tasks, max = 10) {
    const results = []
    const poolList = new Set()
    for (let i of tasks) {
        if (poolList.size === max) {
            await Promise.race(poolList)
        }
        let task = i()
        results.push(task)
        poolList.add(task)
        task.then(() => poolList.delete(task))
    }
    return Promise.allSettled(results)
}

concurrent([task, () => task(2000), task, task, task, task, task, task, task], 2).then((res) => {
    console.log(res)
})

```

#### 💡 15.设计一个简单的任务队列.js
```typescript
// 题目
//  new Quene()
// .task(1000, () => {
//   console.log(1)
// })
// .task(2000, () => {
//   console.log(2)
// })
// .task(1000, () => {
//   console.log(3)
// })
// .start()

// function Quene() { ... } //补全代码

function Quene() {
    this.queue = []
    this.task = function (time, callback) {
        let promise = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    callback()
                    resolve()
                }, time)
            })
        this.queue.push(promise)
        return this
    }
    this.start = function () {
        this.queue.reduce((pre, cur) => pre.then(() => cur()), Promise.resolve())
    }
}
new Quene()
    .task(1000, () => {
        console.log(1)
    })
    .task(2000, () => {
        console.log(2)
    })
    .task(1000, () => {
        console.log(3)
    })
    .start()

```

#### 🎲 16.实现调度器.js
```typescript
class Schedular {
    constructor(limit) {
        this.limit = limit
        this.queue = []
        this.run = new Set() // 存放正在执行的任务
    }

    add(time, value) {
        const mock = () =>
            new Promise((resolve) => {
                setTimeout(() => {
                    console.log(value)
                    resolve(value)
                }, time)
            })

        this.queue.push(mock)
    }
    async taskStart() {
        for (let promise of this.queue) {
            if (this.run.size >= this.limit) {
                await Promise.race(this.run)
            }
            let task = promise()

            task.then(() => this.run.delete(task))
            this.run.add(task)
        }
    }
}

const scheduler = new Schedular(2)
const addTask = (time, order) => {
    scheduler.add(time, order)
}
addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
scheduler.taskStart()

```

#### ✨ 17.有并发限制的promiseall.js
```typescript
/** https://github.com/Sunny-117/js-challenges/issues/147 */
// async-pool思想 和 compose思想 基于递归

function limitPromiseAll(promises, limit, retryCount = 3) {
    return new Promise(async (resolve, reject) => {
        let count = 0
        const result = []
        const currentTask = new Set()

        // 添加重试包装函数
        const retry = async (fn, index) => {
            for (let i = 0; i < retryCount; i++) {
                try {
                    return await fn()
                } catch (err) {
                    if (i === retryCount - 1) throw err
                    console.log(`任务${index}第${i + 1}次重试`)
                }
            }
        }

        for (let i = 0; i < promises.length; i++) {
            if (currentTask.size >= limit) {
                await Promise.race(currentTask)
            }
            const promise = promises[i]
            const task = retry(promise, i).then(res => {
                result[i] = res
                currentTask.delete(task)
            }).catch(err => {
                reject(err)
            }).finally(() => {
                count++
                if (count === promises.length) {
                    resolve(result)
                }
            })
            currentTask.add(task)
        }
    })
}

// 测试用例
async function test() {
    // 模拟异步任务，返回一个 Promise 函数
    const createTask = (time, value) => () => {
        console.log(`开始任务 ${value}`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`完成任务 ${value}`);
                resolve(value);
            }, time);
        });
    };

    // 创建测试任务
    const tasks = [
        createTask(1000, 1),  // 1秒后完成
        createTask(2000, 2),  // 2秒后完成
        createTask(1000, 3),  // 1秒后完成
        createTask(1500, 4),  // 1.5秒后完成
        createTask(500, 5),   // 0.5秒后完成
    ];

    try {
        console.time('总执行时间');
        const results = await limitPromiseAll(tasks, 2);  // 限制并发数为2
        console.timeEnd('总执行时间');
        console.log('所有任务执行结果:', results);
    } catch (err) {
        console.error('执行出错:', err);
    }
}

test();

```

#### 🛠️ 18.实现错误重新请求，并控制重试次数.js
```typescript
function retryRequest(requestFn, maxRetries = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    let retries = 0;

    const attempt = async () => {
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        retries++;
        if (retries > maxRetries) {
          reject(`请求失败，已达最大重试次数（${maxRetries}次）`);
        } else {
          console.log(` 请求失败，第 ${retries} 次重试...`);
          setTimeout(attempt, delay);
        }
      }
    };

    await attempt();
  });
}
```

### 🎲 4.js常考手写题

#### 📚 1.LRU缓存.ts
```typescript
// 最近最少使用
/**
 * @url https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked
 */

// map迭代的顺序是插入的顺序
class LRUCache {
    capacity: number
    map: Map<number, number>
    constructor(capacity: number) {
        this.capacity = capacity
        this.map = new Map()
    }

    // 每次获取值的时候，重新赋值给map。
    get(key: number): number {
        if (this.map.has(key)) {
            const value = this.map.get(key)
            this.map.delete(key)
            this.map.set(key, value!)
            return value!
        }
        return -1
    }

    put(key: number, value: number): void {
        if (this.map.size === this.capacity) {
            // 删除最近最少使用的了
            const deleteKey = this.map.keys().next().value
            this.map.delete(Number(deleteKey))
        }
        if (this.map.has(key)) {
            this.map.delete(key)
        }
        this.map.set(key, value)
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

let lRUCache = new LRUCache(2)
lRUCache.put(1, 1) // 缓存是 {1=1}
lRUCache.put(2, 2) // 缓存是 {1=1, 2=2}
lRUCache.get(1) // 返回 1
lRUCache.put(3, 3) // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2) // 返回 -1 (未找到)
lRUCache.put(4, 4) // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1) // 返回 -1 (未找到)
lRUCache.get(3) // 返回 3
lRUCache.get(4) // 返回 4

```

#### 💡 2.数组转树.js
```typescript
const items = [
    { id: 1, name: "Item 1", parentId: null },
    { id: 2, name: "Item 1.1", parentId: 1 },
    { id: 3, name: "Item 1.2", parentId: 1 },
    { id: 4, name: "Item 2", parentId: null },
    { id: 5, name: "Item 2.1", parentId: 4 },
]
const arrToTree = (nums, parentId = null) => {
    const tree = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i].parentId === parentId) {
            const children = arrToTree(nums, nums[i].id)
            nums[i].children = children
            tree.push(nums[i])
        }
    }
    return tree
}

console.log("arrToTree(items)", arrToTree(items))

```

#### 🎯 3.树转数组.js
```typescript
const tree = [
    {
        id: 1,
        nick: "111",
        children: [{ id: 6, nick: "666" }],
    },
    {
        id: 2,
        nick: "222",
        children: [
            {
                id: 3,
                nick: "333",
                children: [
                    {
                        id: 4,
                        nick: "444",
                        children: [
                            {
                                id: 5,
                                nick: "555",
                                children: [
                                    { id: 8, nick: "888" },
                                    { id: 9, nick: "999" },
                                    { id: 10, nick: "aaa" },
                                    { id: 11, nick: "bbb" },
                                ],
                            },
                        ],
                    },
                    { id: 7, nick: "777" },
                ],
            },
        ],
    },
]

const treeToArray = (tree) => {
    const arr = []
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            arr.push(...treeToArray(tree[i].children))
            arr.push(tree[i])
        } else {
            arr.push(tree[i])
        }
    }
    return arr
}

console.log("treeToArray(tree)", treeToArray(tree))

```

#### 🎲 4.函数科里化.js
```typescript
// 实现一个add方法, 使计算结果能够满足以下预期
// add(1)(2)(3)() = 6
// add(1,2,3)(4)() = 10
// add(1)(2)(3)(4)(5)() = 15

function add(...arg1) {
    let totalSum = arg1.reduce((acc, cur) => acc + cur, 0)
    return function result(...arg2) {
        if (arg2.length === 0) {
            return totalSum
        } else {
            totalSum += arg2.reduce((acc, cur) => acc + cur, 0)
            return result
        }
    }
}
console.log(add(1)(2)(3)())
console.log(add(1, 2, 3)(4)())
console.log(add(1)(2)(3)(4)(5)())

```

#### ⭐ 5.继承的几种方法.js
```typescript
// 原型链继承
function Parent() {
    this.color = ["red", "blue"]
}
function Child() {}
Child.prototype = new Parent()
const child1 = new Child()
child1.color.push("cc")
console.log("child1.color", child1.color)
const child2 = new Child()
console.log("child2.color", child2.color)

// 缺点：如果继承的对象是一个引用类型，则所有的属性都会被影响
// ===================================================
// 构造函数继承
function Parent1() {
    this.color = ["red", "blue"]
}
function Child1() {
    Parent1.call(this)
}

// 缺点：不能够继承原型上的属性
// ====================================================

// 组合继承
function Parent2() {
    this.color = ["red", "blue"]
}
function Child2() {
    Parent1.call(this)
}
Child2.prototype = new Parent2()

// 缺点：同1

// 寄生组合式继承
function Parent3() {
    this.color = ["red", "blue"]
}
function Child3() {
    Parent1.call(this)
}
Child3.prototype = Object.create(Parent3.prototype)

```

#### 🛠️ 6.生成唯一id.js
```typescript
function GetUniqueID() {
    // 当前时间转成 36 进制字符串
    var time = Date.now().toString(36)
    console.log("🚀 ~ GetUniqueID ~ time:", time)
    // 当前随机数转成 36 进制字符串
    var random = Math.random().toString(36)
    // 去除随机数的 0. 字符串
    random = random.substring(2, random.length)
    // 返回唯一ID
    return random + time
}
// 测试输出
console.log(GetUniqueID())

```

#### ✨ 7.十进制转十六进制.js
```typescript
/** // notice:余数法，以十六进制为例,每一次取余数之后，然后进行取反操作 */
const binaryConversion = (nums) => {
    let remainder = [] // 余数
    while (nums !== 0) {
        const temp = nums % 16
        remainder.push(temp)
        nums = Math.floor(nums / 16)
    }
    return Number.parseInt(remainder.reverse().join(""))
}

console.log("binaryConversion(120)", binaryConversion(120))

```

#### 🎲 8.最小堆.js
```typescript
// ps:堆的结构
class MinHeap {
    constructor() {
        /** 用数组来存储堆的形式 */
        this.heap = []
    }

    /** 交换两个节点的位置 */
    swap(i1, i2) {
        const temp = this.heap[i1]
        this.heap[i1] = this.heap[i2]
        this.heap[i2] = temp
    }

    /** 获取指定节点的父节点下标 */
    getParentIndex(i) {
        return Math.floor((i - 1) / 2)
    }

    /** 获取左孩子节点下标 */
    getLeftIndex(i) {
        return 2 * i + 1
    }

    /** 获取右孩子节点下标 */
    getRightIndex(i) {
        return 2 * i + 2
    }

    /** 上移操作 */
    shiftUp(index) {
        if (index === 0) {
            return
        }
        /** 父节点下标 */
        const parentIndex = this.getParentIndex(index)
        if (this.heap[index] < this.heap[parentIndex]) {
            this.swap(index, parentIndex)
            this.shiftUp(parentIndex)
        }
    }

    /** 下移操作 */
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index)
        const rightIndex = this.getRightIndex(index)
        let midIndex;
        if (this.heap[leftIndex] < this.heap[rightIndex]) {
            midIndex = leftIndex
        } else {
            midIndex = rightIndex
        }

        if (this.heap[index] > this.heap[midIndex]) {
            this.swap(index, midIndex)
            this.shiftDown(midIndex)
        }

    }

    /** 插入节点的值 */
    insertNode(val) {
        this.heap.push(val)
        this.shiftUp(this.heap.length - 1)
    }

    /** 去除栈顶元素  */
    pop() {
        if (this.heap.length === 0) {
            return null
        }
        if (this.heap.length === 1) {
            return this.heap.pop()
        }
        this.heap[0] = this.heap.pop()
        this.shiftDown(0)
    }

    /** 获取栈顶元素 */
    peek() {
        return this.heap[0]
    }
}
const heap = new MinHeap()

const arr = [3, 1, 2, 3, 4, 1, 4, 2, 1, 2, 4, -1]
arr.forEach((item) => {
    heap.insertNode(item)
})
console.log(heap)

// ps: 堆排序
// note:借助数组空间来实现
function heapSort(arr) {
    const minHeap = new MinHeap();
    const result = [];

    // 构建最小堆
    arr.forEach(item => {
        minHeap.insertNode(item);
    });

    // 依次取出堆顶元素，得到升序数组
    while (minHeap.heap.length > 0) {
        result.push(minHeap.peek());
        minHeap.pop();
    }

    return result;
}

console.log('heapSort(arr)', heapSort(arr))

// note: 原地堆排序
function heapSortThroughSelf(arr) {
    const heap = new MinHeap();

    // 构建最小堆
    arr.forEach(item => {
        heap.insertNode(item);
    });

    // 原地排序
    for (let i = 0; i < arr.length; i++) {
        arr[i] = heap.peek();
        heap.pop();
    }

    return arr;
}
```

#### 📚 9.抽奖算法.js
```typescript
// 实现一个抢红包算法，给你红包总数和总金额，去实现每个红包金额的随机分配，要尽可能做到公平

function prize(totalNum, count) {
    const res = new Array(count).fill(1) // 以分为单位
    let remain = totalNum * 100 - count * 1 // 减去已经分配的
    // 分配前 n - 1个人的红包
    for (let i = 0; i < count - 1; i++) {
        const max = Math.floor((remain / (count - i)) * 2)
        const random = Math.floor(Math.random() * max)
        console.log(random, remain)
        res[i] += random
        remain -= random
    }
    res[count - 1] += remain
    return res.map(item => (item / 100))
}

console.log('prize',prize(10,2))
```

#### 🎲 10.打乱数组.js
```typescript
const arr = [1, 2, 3, 4, 5, 6]
function sortRandom(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        const randomIndex = Math.floor(Math.random() * (j + 1))
        const temp = arr[j]
        arr[j] = arr[randomIndex]
        arr[randomIndex] = temp
    }
    return arr
}
console.log('sortRandom(arr)', sortRandom(arr))
```

#### 🎯 11.文件路径转换.js
```typescript
const baseData = ['a/b/c/d/e', 'a/b/e/f/g', 'a/b/h', 'a/i/j', 'a/i/k'];
// 转换成 ==========================>

// {
//   "key": "a",
//   "children": [
//     {
//       "key": "b",
//       "children": [
//         {
//           "key": "c",
//           "children": [
//             {
//               "key": "d",
//               "children": [
//                 { "key": "e" }
//               ]
//             }
//           ]
//         },
//         {
//           "key": "e",
//           "children": [
//             {
//               "key": "f",
//               "children": [
//                 { "key": "g" }
//               ]
//             }
//           ]
//         },
//         { "key": "h" }
//       ]
//     },
//     {
//       "key": "i",
//       "children": [
//         { "key": "j" },
//         { "key": "k" }
//       ]
//     }
//   ]
// }
function pathToTree(arr) {
    const res = [] // 存储结果
    // 每一次循环处理一个节点，如果有的话就跳过，如果没有的话，则push到children
    arr.forEach(item => {
        const nodeTokens = item.split('/')
        let targetPoint = res // 目标节点, 始终是数组

        for (let node of nodeTokens) {
            const nodeObj = {
                key: node,
                children: []
            }
            /** 是否存在 */
            let isExit = false
            for (let j of targetPoint) {
                if (j.key === node) {
                    if (!j.children) {
                        j.children = []
                    }
                    targetPoint = j.children
                    isExit = true
                    break
                }
            }

            if (!isExit) {
                targetPoint.push(nodeObj)
                // ps: targetPoint然后操控当前节点的children
                if (!targetPoint[targetPoint.length - 1].children) {
                    targetPoint[targetPoint.length - 1].children = []
                }
                targetPoint = targetPoint[targetPoint.length - 1].children
            }
        }
    })
    return res
}

pathToTree(baseData)

// 递归的做法
function pathToTree(paths) {
    const tree = [];

    // ps: node是每一层的children  parts是当前的一个路径 index是当前路径的一个索引
    const addNode = (node, parts, index) => {
        // 终止条件：处理完所有路径片段 
        if (index === parts.length) return;

        const current = parts[index];
        // 查找是否已存在同名节点 
        let child = node.find(item => item.name === current);

        // 创建新节点（区分文件与文件夹）
        if (!child) {
            child = {
                name: current,
                children: index === parts.length - 1 ? null : [] // 文件节点无children 
            };
            node.push(child);
        }

        // 递归处理下一级路径（仅文件夹需要继续遍历）
        if (child.children) {
            addNode(child.children, parts, index + 1);
        }
    };

    paths.forEach(path => {
        const parts = path.split('/').filter(Boolean);  // 过滤空路径段
        addNode(tree, parts, 0);
    });
    return tree;
}
```

#### 💡 12.对象路径字符串.js
```typescript
// 实现一个class，满足下面的输出
class Data {
    constructor(data) {
        this.watcher = new Map() // 字符串，callback回调函数
        this.data = data
    }
    get(str) {
        return str.split('.').reduce((acc, cur) => acc[cur], this.data)
    }
    set(str, val) {
        const keys = str.split('.')
        const lastKey = keys.pop()
        let current = this.data
        keys.forEach(key => {
            current = current[key]
        })
        current[lastKey] = val
        this.watcher.get(str).forEach(cb => cb(val))
    }
    watch(str, callback) {
        if (!this.watcher.has(str)) {
            this.watcher.set(str, new Set())
        }
        this.watcher.set(str, this.watcher.get(str).add(callback))
    }
}

const data = new Data({ a: { b: { c: { d: 4 } } } })

console.log(data.get('a.b')) // { a: { b: { c: { d: 4 } } } }
data.watch('a.b', (data) => console.log(data))
data.set('a.b', 2) // 2
```

#### 🎨 13.快速选择算法.js
```typescript
function quickSelect(arr, k) {
    // 检查 k 是否越界
    if (k < 0 || k >= arr.length) return -1;
    const randomIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[randomIndex];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (i === randomIndex) continue;
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // 如果 k 等于 left 数组的长度，说明基准元素就是第 k 小的元素
    if (k === left.length) {
        return pivot;
    }
    // 如果 k 小于 left 数组的长度，在 left 数组中继续查找
    if (k < left.length) {
        return quickSelect(left, k);
    } else {
        // 如果 k 大于 left 数组的长度，在 right 数组中继续查找
        return quickSelect(right, k - left.length - 1);
    }
}
console.log(quickSelect([1, 2, 3, 4, 5, 6], 3), '>>>>');
```

#### ✨ 14.对象字符串.js
```typescript
// import * as readline from 'readline';
// let rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
// });
// rl.on('line',function(data){
//  console.log(data);
// })
function formatStr(object) {
    let res = {}
    for (let [key, value] of Object.entries(object)) {
        const arr = key.split('.')
        const lastKey = arr.pop()
        let child = res
        for (let i = 0; i < arr.length; i++) {
            // 如果有
            if (child[arr[i]]) {
                child = child[arr[i]]
                continue
            }
            child[arr[i]] = {}
            child = child[arr[i]]
        }
        // 处理结果
        child[lastKey] = value
    }
    return res
}


// ps：更加简洁的写法
function formatStr(flatObj) {
    const result = {};

    Object.entries(flatObj).forEach(([key, value]) => {
        const keys = key.split('.');
        let current = result;

        keys.forEach((k, index) => {
            if (index === keys.length - 1) {
                current[k] = value;
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        });
    });

    return result;
}

const foo1 = {
    'A': 1,
    'B.A': 2,
    'B.B': 4,
    'CC.D.E': 3,
    'CC.D.F': 5
}

console.log(JSON.stringify(formatStr(foo1)))
//写一个方法将其格式化化为：
// const foo2 =  {
//     "A": 1,
//     "B": {
//         "A": 2,
//         "B": 4
//     },
//     "CC": {
//         "D": {
//             "E": 3,
//             "F": 5
//         }
//     }
// }
```

#### 🛠️ 15.后端返回一个数组节点之间可以组成树-给定一个叶子节点的name，返回根节点到叶子节点的路径.js
```typescript
/**
 * @description 后端返回一个数组节点之间可以组成树-给定一个叶子节点的name，返回根节点到叶子节点的路径
 */

const data = [
    { id: '01', name: 'Root', pid: '' },
    { id: '02', name: 'DirA', pid: '01' },
    { id: '03', name: 'DirB', pid: '01' },
    { id: '04', name: 'File1.txt', pid: '02' },
    { id: '05', name: 'File2.txt', pid: '03' }
];

const getPathByLeafName = (data, leafName) => {
    // 找到叶子节点，获取对应的pid，往上递归寻找就行
    const map = new Map()

    data.forEach(item => {
        map.set(item.id, item)
    })

    const path = []

    const findPath = (leafName) => {
        const node = data.find(item => item.name === leafName)
        if (node) {
            path.unshift(node.name)
            if (node.pid) {
                findPath(map.get(node.pid).name)
            }
        }
    }
    findPath(leafName)
    return path.join('/')
}




console.log(getPathByLeafName(data, 'File1.txt'));
// 输出: ['Root/DirA/File1.txt']
console.log(getPathByLeafName(data, 'File2.txt'));
// 输出: ['Root/DirB/File2.txt']
```

#### 🎯 16.hardman.js
```typescript
/**
 * @description 腾讯爱考题目-来自牛客
 * @url https://juejin.cn/post/7406150677225898023
 */

// ps: 关键设计思路（针对于restFirst函数）
// 1.任务队列机制
// 2.同步任务和异步任务的方式。异步执行控制

// 写一个hardMan函数，满足控制台打印效果如下：
// ===============================================
// hardMan('潘潘')
//> Hi! I am 潘潘.
// =============================================== 
// hardMan('潘潘').study('Project')
//> Hi! I am 潘潘.
//> I am studying 敲码.
// ===============================================
// hardMan('潘潘').rest(3).study('敲码')
//> Hi! I am 潘潘.
// 此时等待三秒钟
//> Wait 3 seconds.
//> I am studying 敲码.
// ===============================================
// hardMan('潘潘').restFirst(3).study('敲码')
// 此时等待三秒钟
//> Wait 3 seconds.
//> Hi! I am 潘潘.
//> I am studying 敲码.
// ===============================================

async function sleep(seconds) {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log(`Wait ${seconds} seconds.`);
            resolve()
        }, seconds * 1000);
    })
}


// 函数式类的写法
function hardManClass(name) {
    this.task = []

    setTimeout(async () => {
        for (let tak of this.task) {
            await tak()
        }
    }, 0);


    this.task.push(() => {
        return new Promise(resolve => {
            console.log(`Hi! I am ${name}.`);
            resolve()
        })
    })

    this.study = function (studyName) {
        this.task.push(() => {
            return new Promise(resolve => {
                console.log(`I am studying ${studyName}.`);
                resolve()
            })
        })
        return this;
    }

    this.rest = function (time) {
        this.task.push(async () => {
            await sleep(time)
        })
        return this
    }

    this.restFirst = function (time) {
        this.task.unshift(async () => {
            await sleep(time)
        })
        return this
    }

    return this
}

function hardMan(name) {
    return new hardManClass(name)
}


// hardMan('潘潘')
// hardMan('潘潘').study('Project')
hardMan('潘潘').rest(3).study('敲码')
// hardMan('潘潘').restFirst(3).study('敲码')

```

#### 🛠️ 17.实现版本号排序.js
```typescript
function versionSort(versions) {
    return versions.sort((a, b) => {
        // ps: 这里面主要是两个元素之间的比较========
        const partsA = a.split('.').map(Number);
        const partsB = b.split('.').map(Number);
        const maxLength = Math.max(partsA.length, partsB.length);

        for (let i = 0; i < maxLength; i++) {
            const numA = partsA[i] || 0;
            const numB = partsB[i] || 0;

            if (numA !== numB) {
                return numA - numB;
            }
        }
        return 0;
    });
}

// 测试示例
const versions = ["1.2.3", "1.0.1", "2.0", "1.10.5", "1.1"];
const sortedVersions = versionSort(versions);
console.log(sortedVersions);

```

#### 🎮 18.将一个对象变成响应式.js
```typescript
const obj = {
    a: {
        b: {
            c: 1
        }
    }
}
// 访问a.b.c 希望打印 a.b，c
function proxy(obj) {
    return new Proxy(obj, {
        get(target, key) {
            console.log(key)
            if (typeof target[key] === 'object') {
                return proxy(target[key])
            }
            return Reflect.get(target, key)
        }
    })
}
const proxyObj = proxy(obj)
console.log(proxyObj.a.b.c)

```

#### ⭐ 19.小于n的最大数.js
```typescript
/**
 * @url https://edu.51cto.com/video/27365.html
 */

/**
 * @url https://blog.csdn.net/K346K346/article/details/126958310
 */

// ps: 回溯 ---> 暴力解法
const findMax = (arr, num) => {
    const res = []
    const len = num.toString().length
    const dfs = (path) => {
        res.push(path)

        if (path.length === len) {
            return
        }

        for (let i = 0; i < arr.length; i++) {
            dfs(path.concat(arr[i]))
        }
    }
    dfs([])
    const res1 = res.map(item => item.join('')).filter(item => item <= num).sort((a, b) => b - a)
    return res1[0]
}
// console.log(findMax([9], 1000)) // 999
// console.log(findMax([2, 3, 4, 9], 23149)) // 22999
// console.log(findMax([2, 3, 4, 9], 23412)) // 23399

// ps: 贪心
// ===========================================================
// ps: 从高位开始遍历，对每一位先尝试使用相同数字，除了最后一位。
// ps: 如果没有相同的数字时，尝试是否有比当前数字更小的，有的话选更小的数字里最大的，剩下的用最大数字。
// ps: 都没有就向前回溯看前一个有没有更小的。如果一直回溯到第一个数字都没有更小的数字，就用位数更少的全都是最大数字的数。

function findMaxNumber(num, arr) {
    // 将数组从大到小排序
    arr.sort((a, b) => b - a);
    const maxDigit = arr[0];  // 最大数字
    const digits = num.toString().length;  // 获取目标数的位数

    // 获取 num 的每一位
    const numArr = num.toString().split('').map(Number);

    // 辅助函数：将数组转换为数字
    const arrayToNumber = (arr) => parseInt(arr.join(''));

    // 结果数组
    let result = new Array(digits).fill(0);

    // 从高位到低位处理
    for (let i = 0; i < digits; i++) {
        // 除了最后一位，先尝试使用当前位的数字
        let currentDigit = (i === digits - 1) ? maxDigit : numArr[i];

        // ps: 如果当前数字不在 arr 中，或者使用会导致超过 num
        // ps: 最外层维度是判断 第一个数字
        if (!arr.includes(currentDigit) || arrayToNumber([...result.slice(0, i), currentDigit, ...new Array(digits - i - 1).fill(0)]) >= num) {
            // ps: 寻找比当前数字小的最大可用数字
            let found = false;
            for (let j = arr.length - 1; j >= 0; j--) {
                if (arr[j] < numArr[i]) {
                    result[i] = arr[j];
                    // 剩余位数填最大值
                    for (let k = i + 1; k < digits; k++) {
                        result[k] = maxDigit;
                    }
                    found = true;
                    break;
                }
            }

            // ps: 如果没找到更小的数字，需要回溯
            if (!found) {
                let pos = i - 1;
                while (pos >= 0) {
                    // 找到前一位可以变小的位置
                    let prevDigit = result[pos];
                    let smallerDigit = -1;
                    for (let digit of arr) {
                        if (digit < prevDigit && digit <= numArr[pos]) {
                            smallerDigit = digit;
                        }
                    }

                    // 如果找到了
                    if (smallerDigit !== -1) {
                        result[pos] = smallerDigit;
                        // 从 pos + 1 ----> 到最后都填最大值
                        for (let k = pos + 1; k < digits; k++) {
                            result[k] = maxDigit;
                        }
                        return arrayToNumber(result);
                    }
                    pos--;
                }

                // ps: 如果一直回溯到开头都没找到，就减少一位，用全最大值
                if (pos < 0) {
                    return parseInt(maxDigit.toString().repeat(digits - 1));
                }
            }
        } else {
            // ps: 如果当前数字可用，直接使用
            result[i] = currentDigit;
        }
    }

    // 最终验证结果 < num
    const finalResult = arrayToNumber(result);
    return finalResult < num ? finalResult : parseInt(maxDigit.toString().repeat(digits - 1)) || 0;
}

console.log(findMax([9], 1000)) // 999
console.log(findMax([2, 3, 4, 9], 23149)) // 22999
console.log(findMax([2, 3, 4, 9], 23412)) // 23399
// console.log(findMax([9], 999)) // 这里后面再加上一层判断
```

## 💫 11.单调栈

### 🎨 1.每日温度.ts
```typescript
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
```

### 🔰 2.下一个更大的元素.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/next-greater-element-i/description/
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// !notice: 注意题目描述
var nextGreaterElement = function (nums1, nums2) {
  const stack = [];
  const map = new Map(); // key为值，value为下标
  const res = new Array(nums1.length).fill(-1);
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], i);
  }

  for (let i = 0; i < nums2.length; i++) {
    if (!stack.length) {
      stack.push(i);
    } else {
      while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
        if (map.has(nums2[stack[stack.length - 1]])) {
          const idx = map.get(nums2[stack[stack.length - 1]]);
          res[idx] = nums2[i];
        }
        stack.pop();
      }
      stack.push(i);
    }
  }
  return res;
};

```

### 🚀 3.下一个更大的元素2.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/next-greater-element-ii/description/
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// !notice: 环形数组的一个遍历
var nextGreaterElements = function (nums) {
  const stack = [];
  const res = new Array(nums.length).fill(-1);
  for (let i = 0; i < nums.length * 2; i++) {
    const actualIdx = i % nums.length;
    if (!stack.length) {
      stack.push(actualIdx);
    } else {
      while (stack.length && nums[actualIdx] > nums[stack[stack.length - 1]]) {
        res[stack[stack.length - 1]] = nums[actualIdx];
        stack.pop();
      }
      stack.push(actualIdx);
    }
  }
  return res;
};

```

### 🎲 4.接雨水.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/trapping-rain-water/description/
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const stack = []; // 维护一个单调递增的序列
  let res = 0; // 表示结果
  for (let i = 0; i < height.length; i++) {
    if (!stack.length) {
      stack.push(i);
    } else {
      while (stack.length && height[i] > height[stack[stack.length - 1]]) {
        const mid = height[stack.pop()];
        if (stack.length) {
          const leftIdx = stack[stack.length - 1];
          const leftVal = height[leftIdx];
          const rightVal = height[i];
          res += (i - leftIdx - 1) * (Math.min(leftVal, rightVal) - mid);
        }
      }
      stack.push(i); // 理解为计算以当前元素为底的情况
    }
  }
  return res;
};

```

### ✨ 5.柱状图中最大的矩形.ts
```typescript
// @ts-nocheck
/**
 * @url https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
 */

```

## 🔥 12.二分搜索

### 🎮 1.搜索旋转数组.ts
```typescript
/**
 * @url https://leetcode.cn/problems/search-in-rotated-sorted-array/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// ps: 每一次二分都能找到一半有序，一半无序的情况。

var search = function (nums, target) {
    let left = 0, right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) return mid
        // 落在左侧有序区间
        if (nums[left] <= nums[mid]) {
            // target 落在[left, mid]空间上
            if (nums[left] <= target && nums[mid] > target) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            // 这里右侧空间是有序的，去判断右侧区间是否有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
};
```

### 🔰 2.旋转数组的最小值.ts
```typescript
/**
 * @url https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

var findMin = function (nums) {
    let l = 0, r = nums.length - 1

    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        if (nums[mid] < nums[r]) {
            r = mid
        } else {
            l = mid + 1
        }
    }
    return nums[r]
};
```

## 🎨 13.双指针

### 💫 1.移动零.js
```typescript
/**
 * @url https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 0 1 0 3 12
// 1 0 0 3 12
// 1 3 0 0 12
// 1 3 12 0 0

var moveZeroes = function (nums) {
    let slow = 0, fast = 0
    while (fast < nums.length) {
        if (!nums[fast]) {
            fast++
            continue
        }
        [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
        slow++
        fast++
    }
    return nums
};
```

### 🎮 2.盛最多水的容器.js
```typescript
/**
 * @url https://leetcode.cn/problems/container-with-most-water/description/?envType=study-plan-v2&envId=top-100-liked
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let l = 0, r = height.length - 1, res = 0
    while (l < r) {
        const h = Math.min(height[l], height[r])
        const area = h * (r - l)
        res = Math.max(res, area)
        if (height[l] < height[r]) {
            l++
        } else {
            r--
        }
    }
    return res
};
```

### 🔥 3.三数之和.js
```typescript
/**
 * @url https://leetcode.cn/problems/3sum/description/?envType=study-plan-v2&envId=top-100-liked
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b)
    const res = []
    for (let i = 0; i < nums.length - 1; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue
        let left = i + 1, right = nums.length - 1
        while (left < right) {
            const sum = nums[left] + nums[right] + nums[i]
            if (sum === 0) {
                while (nums[left] === nums[left + 1]) left++ // ps: 这里避免相同的元素
                while (nums[right] === nums[right - 1]) right-- // ps: 这里避免相同的元素
                res.push([nums[left], nums[right], nums[i]])
                left++
                right--
            }
            if (sum < 0) {
                left++
            }
            if (sum > 0) {
                right--
            }
        }
    }
    return res
};
```

