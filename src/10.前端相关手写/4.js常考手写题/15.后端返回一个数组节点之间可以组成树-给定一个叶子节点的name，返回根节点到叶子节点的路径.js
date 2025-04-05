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