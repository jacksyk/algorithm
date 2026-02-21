const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const http = require('http');
const { exec } = require('child_process');

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
                    const urlMatch = content.match(/@url\s+(\S+)/);
                    result.push({
                        name: file,
                        type: 'file',
                        url: urlMatch ? urlMatch[1] : null
                    });
                } catch (err) {
                    console.error(`读取文件失败: ${filePath}`, err);
                }
            }
        } catch (err) {
            console.error(`处理文件失败: ${file}`, err);
        }
    });

    return result.sort((a, b) => {
        const getNumber = (name) => {
            const match = name.match(/^(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        return getNumber(a.name) - getNumber(b.name);
    });
}

function generateDirectoryHTML(tree, level = 0) {
    let html = '';

    tree.forEach(item => {
        if (item.type === 'directory') {
            html += `<div class="category">`;
            html += `<h${Math.min(level + 2, 6)} class="category-title">📂 ${item.name}</h${Math.min(level + 2, 6)}>`;
            if (item.children && item.children.length > 0) {
                item.children.sort((a, b) => {
                    const getNumber = (name) => {
                        const match = name.match(/^(\d+)/);
                        return match ? parseInt(match[1]) : 0;
                    };
                    return getNumber(a.name) - getNumber(b.name);
                });
                html += `<ul class="file-list">`;
                item.children.forEach(file => {
                    if (file.type === 'file') {
                        const fileName = file.name.replace(/\.(ts|js)$/, '');
                        html += `<li class="file-item">`;
                        html += `<span class="file-name">📄 ${fileName}</span>`;
                        if (file.url) {
                            html += `<a href="${file.url}" target="_blank" class="file-link">🔗 题目链接</a>`;
                        }
                        html += `</li>`;
                    }
                    if (file.type === 'directory') {
                        html += `<li class="directory-item">`;
                        html += generateDirectoryHTML([file], level + 1);
                        html += `</li>`;
                    }
                });
                html += `</ul>`;
            }
            html += `</div>`;
        }
    });

    return html;
}

function generateHTML(tree) {
    tree.sort((a, b) => {
        const getNumber = (name) => {
            const match = name.match(/^(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        return getNumber(a.name) - getNumber(b.name);
    });

    const directoryHTML = generateDirectoryHTML(tree);

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>算法目录</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
        }

        .header {
            text-align: center;
            margin-bottom: 50px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
            font-size: 1.1rem;
        }

        .category {
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border-left: 5px solid #667eea;
        }

        .category-title {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }

        .file-list {
            list-style: none;
        }

        .file-item {
            padding: 12px 16px;
            margin: 8px 0;
            background: white;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .file-item:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .file-name {
            font-size: 1rem;
            color: #333;
            font-weight: 500;
        }

        .file-link {
            text-decoration: none;
            color: #667eea;
            font-size: 0.9rem;
            padding: 5px 12px;
            border: 1px solid #667eea;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        .file-link:hover {
            background: #667eea;
            color: white;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid #eee;
            color: #666;
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }

            .header h1 {
                font-size: 1.8rem;
            }

            .file-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }

            .file-link {
                align-self: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 算法目录</h1>
            <p>系统化算法学习指南</p>
        </div>
        
        ${directoryHTML}
        
        <div class="footer">
            <p>Created with ❤️ by Jacksyk</p>
            <p>Released under the MIT License</p>
        </div>
    </div>
</body>
</html>`;
}

function startServer() {
    const projectRoot = path.join(__dirname, '..');
    const PORT = 8000;

    const server = http.createServer((req, res) => {
        let filePath = path.join(projectRoot, req.url === '/' ? 'catalog.html' : req.url);

        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        }[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`, 'utf-8');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    server.listen(PORT, () => {
        console.log(chalk.bgBlue(`服务器已启动: http://localhost:${PORT}`));
        console.log(chalk.cyan(`按 Ctrl+C 停止服务器`));

        const url = `http://localhost:${PORT}/catalog.html`;
        const openCommand = process.platform === 'darwin' ? 'open' :
            process.platform === 'win32' ? 'start' : 'xdg-open';

        exec(`${openCommand} ${url}`, (err) => {
            if (err) {
                console.log(chalk.yellow(`无法自动打开浏览器，请手动访问: ${url}`));
            }
        });
    });

    process.on('SIGINT', () => {
        console.log(chalk.yellow('\n正在关闭服务器...'));
        server.close(() => {
            console.log(chalk.bgGreen('服务器已关闭'));
            process.exit(0);
        });
    });
}

function main() {
    try {
        const srcDir = path.join(__dirname, '../src');

        if (!fs.existsSync(srcDir)) {
            console.error('src 目录不存在！');
            return;
        }

        const tree = walkDir(srcDir);
        const htmlContent = generateHTML(tree);
        const htmlPath = path.join(__dirname, '../catalog.html');
        fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
        console.log(chalk.bgGreen('catalog.html 生成完成！'));

        startServer();

    } catch (err) {
        console.error('生成文件时发生错误:', err);
    }
}

main();
