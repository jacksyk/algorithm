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
