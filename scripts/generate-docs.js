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
    const titleEmoji = '📚';
    const codeEmoji = '💻';

    return `# ${titleEmoji} ${fileName.replace(/\.(ts|js|jsx|tsx|vue|html)$/, '')}

## ${codeEmoji} 代码实现
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
  --vp-c-brand: #d4a373;
  --vp-c-brand-light: #e6bc91;
  --vp-c-brand-dark: #c49162;
  
  --vp-c-bg: #fdfaf6;
  --vp-c-bg-alt: #f9f5f0;
  --vp-c-text: #4a4a4a;
  --vp-c-text-light: #6b6b6b;
  
  --vp-code-block-bg: #faf8f5;
  --vp-code-line-highlight-color: rgba(212, 163, 115, 0.05);
  --vp-code-copy-code-hover-bg: rgba(212, 163, 115, 0.1);
  
  --vp-c-border: #e9e1d5;
  --vp-c-divider: #e9e1d5;
}

.dark {
  --vp-c-bg: #242424;
  --vp-c-bg-alt: #2a2a2a;
  --vp-code-block-bg: #292929;
  --vp-c-text: #f4ede4;
  --vp-c-text-light: #e0d6ca;
}

.vp-doc {
  font-family: "Georgia", serif;
}

.vp-doc h1,
.vp-doc h2,
.vp-doc h3 {
  font-family: "Palatino", "Times New Roman", serif;
  border-top: none;  /* 添加这行 */
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 0.2em;
  margin-top: 0;     /* 添加这行 */
}

.vp-doc h1 {
  border: none;      /* 添加这个选择器 */
  padding-bottom: 0;
}

.vp-doc div[class*='language-'] {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  margin: 16px 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}

.VPSidebar {
  background-color: var(--vp-c-bg-alt);
  border-right: 1px solid var(--vp-c-border);
  transition: all 0.3s ease;
}

.VPSidebarItem.level-0 {
  margin-bottom: 8px;  /* 从 12px 改为 8px */
}

.VPSidebarItem .item {
  padding: 4px 12px;  /* 从 6px 改为 4px */
  margin: 2px 0;     /* 从 4px 改为 2px */
  border-radius: 6px;
  transition: background-color 0.3s;
}

.VPSidebarItem.level-1 .item {
  margin-left: 8px;  /* 从 12px 改为 8px */
}

.VPSidebarItem.level-0 > .item > .text {
  font-size: 0.95em;
  font-weight: 600;
  color: var(--vp-c-text);
  transition: color 0.3s;
  user-select: none;  /* 添加这行 */
}

.VPSidebarItem .caret {
  transition: transform 0.3s;
  user-select: none;  /* 添加这行 */
}

.VPSidebarItem.level-1 > .item > .text {
  font-size: 0.9em;   /* 从 0.95em 改为 0.9em */
  transition: all 0.3s;
}

.VPSidebarItem .item:hover > .text {
  color: var(--vp-c-brand);
  transform: translateX(4px);
}

.VPSidebarItem.has-active > .item > .text {
  color: var(--vp-c-brand) !important;
}

.VPSidebarItem .caret {
  transition: transform 0.3s;
}

.VPSidebarItem.collapsed .caret {
  transform: rotate(-90deg);
}

.VPSidebarItem .item {
  padding: 6px 12px;
  margin: 4px 0;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.VPSidebarItem .item:hover {
  background-color: rgba(212, 163, 115, 0.1);
}

.VPSidebarItem.level-1 .item {
  margin-left: 12px;
}

/* 自定义滚动条 */
.VPSidebar::-webkit-scrollbar {
  width: 4px;        /* 从 6px 改为 4px */
}

.VPSidebar::-webkit-scrollbar-track {
  background: transparent;
}

.VPSidebar::-webkit-scrollbar-thumb {
  background: rgba(233, 225, 213, 0.3);  /* 使用透明度降低显示度 */
  border-radius: 2px;                     /* 从 3px 改为 2px */
}

.VPSidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 163, 115, 0.3);   /* 使用透明度降低显示度 */
}

.VPSidebarItem.has-active > .item > .text {
  color: var(--vp-c-brand) !important;
}

.VPSidebarItem .caret {
  transition: transform 0.3s;
}

.VPSidebarItem.collapsed .caret {
  transform: rotate(-90deg);
}

.VPSidebarItem .item {
  padding: 6px 12px;
  margin: 4px 0;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.VPSidebarItem .item:hover {
  background-color: rgba(212, 163, 115, 0.1);
}

.VPSidebarItem.level-1 .item {
  margin-left: 12px;
}

.VPSidebar::-webkit-scrollbar {
  width: 6px;
}

.VPSidebar::-webkit-scrollbar-track {
  background: transparent;
}

.VPSidebar::-webkit-scrollbar-thumb {
  background: var(--vp-c-border);
  border-radius: 3px;
}

.VPSidebar::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-brand-light);
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
            copyright: 'Copyright © 2025-present'
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
  name: "算法库突击"
  text: "系统化算法学习指南"
  tagline: 从零开始，构建扎实的算法能力
  image:
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23d4a373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
    alt: 算法库突击
  actions:
    - theme: brand
      text: 开始学习
      link: /1.数组/1.二分查找
    - theme: alt
      text: GitHub
      link: https://github.com/jacksyk/algorithm

features:
  - icon: 🎯
    title: 系统化学习
    details: 按照难度递进，从易到难系统化整理算法题目，让你的学习更有计划性
    
  - icon: 🔍
    title: 深入解析
    details: 每道题目都配备详细的解题思路、复杂度分析和多种解法对比，帮助你真正理解算法本质
    
  - icon: 🚀
    title: 面试导向
    details: 精选高频面试算法题目，让你在面试中游刃有余
    
  - icon: 📝
    title: 代码示例
    details: 提供清晰的代码实现和注释，帮助你快速掌握核心要点
    
  - icon: 🌟
    title: 持续更新
    details: 定期更新最新的算法题目和解法，助你保持竞争力
    
  - icon: 👥
    title: 社区互动
    details: 欢迎在 GitHub 上提出问题和建议，一起讨论更优解法

footer: false
---

<div class="custom-footer">
  <div class="footer-content">
    <div class="author">
      Created by <a href="https://github.com/jacksyk" target="_blank">JACKSYK</a> with 💖
    </div>
    <div class="license">
      Released under the MIT License
    </div>
    <div class="copyright">
      Copyright © 2023-present
    </div>
  </div>
</div>

<style>
.custom-footer {
  padding: 24px;
  text-align: center;
  background-color: var(--vp-c-bg);
  margin-top: 50px;
}

.footer-content {
  max-width: 1152px;
  margin: 0 auto;
  color: var(--vp-c-text-2);
}

.author {
  font-size: 0.9em;
  margin-bottom: 8px;
}

.author a {
  color: var(--vp-c-brand);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.25s;
}

.author a:hover {
  color: var(--vp-c-brand-light);
}

.license, .copyright {
  font-size: 0.8em;
  margin-top: 4px;
}

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, var(--vp-c-brand) 30%, var(--vp-c-brand-light));
  --vp-home-hero-image-background-image: linear-gradient(-45deg, var(--vp-c-brand) 30%, var(--vp-c-brand-light));
  --vp-home-hero-image-filter: blur(72px);
}

.VPHero .image-bg {
  opacity: 0.8;
  transition: opacity 1s ease;
}

.VPHero .image-container:hover .image-bg {
  opacity: 1;
}

.VPFeatures .box {
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--vp-c-border);
}

.VPFeatures .box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.VPFeatures .icon {
  font-size: 1.5em;
  margin-bottom: 12px;
}

@media (min-width: 640px) {
  .VPFeatures .container {
    gap: 24px;
  }
}

.dark .VPFeatures .box {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-border);
}
</style>`;

    fs.writeFileSync(path.join(docsDir, 'index.md'), indexContent);
}

main();