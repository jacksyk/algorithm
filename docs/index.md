---
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
</style>