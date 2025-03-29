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
