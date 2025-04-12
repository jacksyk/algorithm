const fs = require('fs');
const path = require('path');

function generateSidebar(srcDir, docsDir) {
    const files = fs.readdirSync(srcDir);
    const sidebar = {};

    // 递归处理目录
    function processDirectory(categoryPath, docsCategoryDir, relativePath = '') {
        const items = [];
        const files = fs.readdirSync(categoryPath);

        files.forEach(file => {
            const fullPath = path.join(categoryPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && !file.startsWith('.')) {
                // 处理子目录
                const subDocDir = path.join(docsCategoryDir, file);
                if (!fs.existsSync(subDocDir)) {
                    fs.mkdirSync(subDocDir, { recursive: true });
                }

                const subItems = processDirectory(
                    fullPath,
                    subDocDir,
                    `${relativePath}${file}/`
                );

                if (subItems.length > 0) {
                    items.push({
                        text: file,
                        collapsed: true,
                        items: subItems
                    });
                }
            } else if (stat.isFile()) {
                // 处理文件
                if (file.endsWith('.ts') || file.endsWith('.js') ||
                    file.endsWith('.jsx') || file.endsWith('.tsx') ||
                    file.endsWith('.vue') || file.endsWith('.html')) {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const mdContent = generateMarkdown(file, content);
                    const mdFileName = file.replace(/\.(ts|js|jsx|tsx|vue|html)$/, '.md');
                    fs.writeFileSync(path.join(docsCategoryDir, mdFileName), mdContent);

                    items.push({
                        text: file.replace(/\.(ts|js|jsx|tsx|vue|html)$/, ''),
                        link: `/${relativePath}${file.replace(/\.(ts|js|jsx|tsx|vue|html)$/, '')}`
                    });
                }
            }
        });

        // 对文件项进行排序
        return items.sort((a, b) => {
            // 目录优先
            if (a.items && !b.items) return -1;
            if (!a.items && b.items) return 1;

            // 数字排序
            const numA = parseInt(a.text.match(/^\d+/) || [0]);
            const numB = parseInt(b.text.match(/^\d+/) || [0]);
            return numA - numB;
        });
    }

    // 处理顶层目录
    files.forEach(category => {
        const categoryPath = path.join(srcDir, category);
        if (fs.statSync(categoryPath).isDirectory() && !category.startsWith('.')) {
            const docsCategoryDir = path.join(docsDir, category);
            if (!fs.existsSync(docsCategoryDir)) {
                fs.mkdirSync(docsCategoryDir, { recursive: true });
            }

            const items = processDirectory(categoryPath, docsCategoryDir, `${category}/`);
            if (items.length > 0) {
                // 直接使用 category 作为 key，不添加额外的斜杠
                sidebar[category] = items;
            }
        }
    });

    return sidebar;
}

function generateMarkdown(fileName, content) {
    // emoji 数组
    const titleEmojis = ['🎯', '⭐', '🎨', '🎮', '🎪', '🎭', '🎪', '🎯', '🎲', '🎳'];
    const subTitleEmojis = ['📝', '📌', '📎', '📋', '📊', '📈', '📉', '📄', '📑', '📃'];

    // 随机获取 emoji
    const randomEmoji = (emojis) => emojis[Math.floor(Math.random() * emojis.length)];

    // 提取题目链接
    const urlMatch = content.match(/@url\s+(.*)/);
    const url = urlMatch ? urlMatch[1] : '';

    // 提取题目描述
    const descMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    const description = descMatch ? descMatch[1].trim() : '';

    return `# ${randomEmoji(titleEmojis)} ${fileName.replace(/\.(ts|js|jsx|tsx|vue|html)$/, '')}

${url ? `[题目链接](${url})` : ''}

## ${randomEmoji(subTitleEmojis)} 题目描述
${description || '暂无题目描述'}

## ${randomEmoji(subTitleEmojis)} 代码实现
\`\`\`typescript
${content}
\`\`\`
`;
}

function main() {
    const srcDir = path.join(__dirname, '../src');
    const docsDir = path.join(__dirname, '../docs');

    // 确保 docs 目录存在
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
    }

    // 生成侧边栏配置
    const sidebar = generateSidebar(srcDir, docsDir);

    // 生成配置文件
    const vitepressDir = path.join(docsDir, '.vitepress');
    if (!fs.existsSync(vitepressDir)) {
        fs.mkdirSync(vitepressDir, { recursive: true });
    }

    // 生成主题配置文件
    const themeDir = path.join(vitepressDir, 'theme');
    if (!fs.existsSync(themeDir)) {
        fs.mkdirSync(themeDir, { recursive: true });
    }

    // 生成自定义样式
    const customCss = `
:root {
  --vp-c-brand: #966220;
  --vp-c-brand-light: #b17a2d;
  --vp-c-brand-dark: #7a4e15;
  
  --vp-c-bg: #faf6f1;
  --vp-c-bg-alt: #f7f3ed;
  --vp-c-text: #2c3e50;
  --vp-c-text-light: #476582;
  
  --vp-code-block-bg: #f8f7f6;
  --vp-code-line-highlight-color: rgba(150, 98, 32, 0.05);
  --vp-code-copy-code-hover-bg: rgba(150, 98, 32, 0.1);
  
  --vp-c-border: #e2d6c3;
  --vp-c-divider: #e2d6c3;
}

.dark {
  --vp-c-bg: #1a1a1a;
  --vp-c-bg-alt: #242424;
  --vp-code-block-bg: #1c1c1c;
  --vp-c-text: #f1e7d9;
  --vp-c-text-light: #d3c4b0;
}

.vp-doc {
  font-family: "Georgia", serif;
}

.vp-doc h1,
.vp-doc h2,
.vp-doc h3 {
  font-family: "Palatino", "Times New Roman", serif;
  border-bottom: 2px solid var(--vp-c-border);
  padding-bottom: 0.3em;
}

.vp-doc div[class*='language-'] {
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.VPSidebar {
  background-color: var(--vp-c-bg-alt);
  border-right: 1px solid var(--vp-c-border);
}

.vp-doc a {
  color: var(--vp-c-brand);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.vp-doc a:hover {
  border-bottom-color: var(--vp-c-brand);
}`;

    fs.writeFileSync(path.join(themeDir, 'custom.css'), customCss);

    // 生成主题入口文件
    const themeIndex = `
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 这里可以添加自定义的 Vue 组件或其他增强功能
  }
}`;

    fs.writeFileSync(path.join(themeDir, 'index.ts'), themeIndex);

    // 更新主配置文件
    const config = `
import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "算法库",
    description: "面试必冲算法库",
    base: '/algorithm/',
    appearance: true,
    lastUpdated: true,
    ignoreDeadLinks: true,
    
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
        ],
        
        outline: {
            level: [2, 3],
            label: '本页目录'
        },
        
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        
        lastUpdatedText: '最后更新',
        
        search: {
            provider: 'local'
        },
        
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        
        socialLinks: [
            { icon: 'github', link: 'https://github.com/jacksyk/algorithm' }
        ],
        
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present'
        },

        // 更新主配置文件中的 sidebar 配置
        sidebar: ${JSON.stringify(Object.keys(sidebar)
        .sort((a, b) => {
            const numA = parseInt(a.match(/(\d+)\./)[1]);
            const numB = parseInt(b.match(/(\d+)\./)[1]);
            return numA - numB;
        })
        .map(key => {
            return {
                text: `📂 ${key}`,
                collapsed: key === '1.数组' ? false : true,
                items: sidebar[key].map(item => {
                    if (item.items) {
                        return {
                            ...item,
                            text: `📂 ${item.text}`,
                            items: item.items.map(subItem => ({
                                ...subItem,
                                text: `  📄 ${subItem.text}` // 子项缩进两个空格
                            }))
                        };
                    }
                    return {
                        ...item,
                        text: `  📄 ${item.text}` // 一级项缩进两个空格
                    };
                })
            };
        }), null, 2)}
    }
})`;

    fs.writeFileSync(path.join(vitepressDir, 'config.mts'), config);

    // 生成首页
    const indexContent = `---
layout: home

hero:
  name: "算法库"
  text: "面试必冲算法库"
  tagline: 系统化的算法学习资料
  actions:
    - theme: brand
      text: 开始学习
      link: /1.数组/1.二分查找

features:
  - title: 系统化整理
    details: 按照不同类型系统整理算法题目
  - title: 详细解析
    details: 每道题目都有详细的解题思路和代码实现
  - title: 持续更新
    details: 持续收集和更新高质量算法题目
---`;

    fs.writeFileSync(path.join(docsDir, 'index.md'), indexContent);
}

main();