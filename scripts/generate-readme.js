const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

let content = '# 算法题目整理\n\n';


function walkDir(dir) {
    const files = fs.readdirSync(dir);
    const result = [];

    files.forEach(file => {
        try {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (file.startsWith('.') || file === 'node_modules') {
                return;
            }
            if (stat.isDirectory()) {
                const children = walkDir(filePath);
                if (children.length > 0) {
                    result.push({
                        name: file,
                        type: 'directory',
                        children
                    });
                }
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                try {
                    const content = fs.readFileSync(filePath, 'utf-8');
                    result.push({
                        name: file,
                        type: 'file',
                        content
                    });
                } catch (err) {
                    console.error(`读取文件失败: ${filePath}`, err);
                }
            }
        } catch (err) {
            console.error(`处理文件失败: ${file}`, err);
        }
    });

    // 修改返回值的排序逻辑
    return result.sort((a, b) => {
        // 提取文件名或目录名中的序号
        const getNumber = (name) => {
            const match = name.match(/^(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        return getNumber(a.name) - getNumber(b.name);
    });
}

const generateWellNo = (depth, num) => {
    // 限制深度在 1-6 之间
    const level = Math.min(Math.max(depth + num, 1), 6);
    return '#'.repeat(level);
};


/** 针对每一项的处理 */
function generateTree(item, depth = 0) {
    if (item.type === 'directory') {
        
        content += `${generateWellNo(depth, 2)} ${item.name}\n\n`

        
        if (item.children && item.children.length > 0) {
            // 对子文件排序
            item.children.sort((a, b) => {
                const getNumber = (name) => {
                    const match = name.match(/^(\d+)/);
                    return match ? parseInt(match[1]) : 0;
                };
                return getNumber(a.name) - getNumber(b.name);
            });

            item.children.forEach(file => {
                if (file.type === 'file') {
                    content += `${generateWellNo(depth, 3)} ${file.name}\n`;
                    if (file.url) {
                        content += `[题目链接](${file.url})\n\n`;
                    }
                    content += '```typescript\n';
                    content += file.content;
                    content += '\n```\n\n';
                }
                if (file.type === 'directory') {
                    generateTree(file, depth + 1)
                }
            });
        }
    }
}


function generateReadme(tree) {
    
    // 对顶层目录排序
    tree.sort((a, b) => {
        const getNumber = (name) => {
            const match = name.match(/^(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        return getNumber(a.name) - getNumber(b.name);
    });

    tree.forEach(item => {
        generateTree(item, 0)
    });
    
    return content;
}

function main() {
    try {
        const srcDir = path.join(__dirname, '../src');
        
        // 确保 src 目录存在
        if (!fs.existsSync(srcDir)) {
            console.error('src 目录不存在！');
            return;
        }

        const tree = walkDir(srcDir);
        
        // 生成 README.md
        const readmeContent = generateReadme(tree);
        const readmePath = path.join(__dirname, '../README.md');
        fs.writeFileSync(readmePath, readmeContent, 'utf-8');
        console.log(chalk.bgBlue('README.md 生成完成！'));
        
    } catch (err) {
        console.error('生成文件时发生错误:', err);
    }
}

main();