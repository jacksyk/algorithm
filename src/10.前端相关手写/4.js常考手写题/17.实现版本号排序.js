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
