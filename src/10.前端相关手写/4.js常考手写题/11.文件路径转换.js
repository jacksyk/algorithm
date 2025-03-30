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