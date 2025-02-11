const fs = require('fs');
const path = require('path');

// 递归遍历目录
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    const result = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules') {
                const children = walkDir(filePath);
                if (children.length > 0) {
                    result.push({
                        name: file,
                        type: 'directory',
                        children,
                        // 提取目录名中的数字用于排序
                        sortKey: parseInt(file.match(/^\d+/)?.[0] || '0')
                    });
                }
            }
        } else if (file.endsWith('.ts') || file.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const urlMatch = content.match(/@url\s+(https:\/\/[^\s]+)/);
            const url = urlMatch ? urlMatch[1] : '';
            
            result.push({
                name: file,
                type: 'file',
                url,
                // 提取文件名中的数字用于排序
                sortKey: parseInt(file.match(/^\d+/)?.[0] || '0')
            });
        }
    });

    // 按数字顺序排序
    return result.sort((a, b) => a.sortKey - b.sortKey);
}

// 生成 Markdown 内容
function generateMarkdown(tree, level = 0) {
    let markdown = '';
    const indent = '  '.repeat(level);

    tree.forEach(item => {
        if (item.type === 'directory') {
            markdown += `\n${indent}### ${item.name}\n`;
            markdown += generateMarkdown(item.children, level + 1);
        } else {
            const fileName = item.name.replace(/\.(js|ts)$/, '');
            if (item.url) {
                markdown += `${indent}- [${fileName}](${item.url})\n`;
            } else {
                markdown += `${indent}- ${fileName}\n`;
            }
        }
    });

    return markdown;
}

// 主函数
function main() {
    const rootDir = __dirname;
    const tree = walkDir(rootDir);
    
    let markdown = '# 算法题目整理\n\n';
    markdown += '本仓库包含以下算法题目：';
    markdown += generateMarkdown(tree);

    fs.writeFileSync(path.join(rootDir, 'README.md'), markdown);
    console.log('README.md 生成完成！');
}

main();