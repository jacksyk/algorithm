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
