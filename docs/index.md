<link rel="stylesheet" href="assets/css/extra.css">
<div class="hex-bg-wrapper">
<style>
  /* 把背景扩展到整个视口（顶栏之下），内容保持在上层 */
  .md-header{position:relative;z-index:4}
  .md-content__inner{position:relative;z-index:2}
  .hex-bg{position:fixed;top:64px;left:0;right:0;bottom:0;z-index:0;overflow:hidden;pointer-events:none}
  .hex-row{display:inline-flex;margin-top:-32px;margin-left:-50px}
  .hex-row:nth-child(even){margin-left:1px}
  /* 使用 SVG 绘制六边形：默认只显示边框（stroke），鼠标靠近时填充并放大 */
  .hex-item{width:100px;height:110px;margin:2px;display:inline-block;transform-origin:center center}
  .hex-item svg{width:100%;height:100%;display:block}
  .hex-item polygon{fill:transparent;stroke:rgba(128,128,128,0.18);stroke-width:1;transition:fill .28s ease,transform .28s ease,filter .28s ease,opacity .28s ease}
  /* 激活态：填充并放大 */
  .hex-item.active{transform:scale(1.12) translateY(-6px)}
  .hex-item.active polygon{fill:var(--fill, rgba(0,255,150,0.12));stroke:rgba(255,255,255,0.14)}
  /* 保证背景图不遮挡页面交互（仅 hex-box 可响应，但我们使用鼠标位置检测）*/
  .hex-bg, .hex-bg *{pointer-events:none}
  /* 仅在首页隐藏左侧侧栏并让主区域占满宽度 */
  .md-sidebar--primary{display:none !important}
  .md-main__inner{display:block !important}
  .md-content{margin-left:0 !important}
</style>

<div id="hex-bg" class="hex-bg" aria-hidden="true"></div>

<script>
  (function(){
    const bg = document.getElementById('hex-bg');
    const rows = 12, cols = 20;
    for(let i=0;i<rows;i++){
      const row = document.createElement('div'); row.className='hex-row';
      // 逐行设置不透明度，使效果从上到下渐隐
      const rowOpacity = 1 - (i / (rows * 1.1));
      row.style.opacity = String(Math.max(0.12, rowOpacity));
      for(let j=0;j<cols;j++){
        const item = document.createElement('div'); item.className='hex-item';
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox','0 0 100 110');
        const poly = document.createElementNS(svgNS, 'polygon');
        // 六边形点（相对于 viewBox）
        poly.setAttribute('points','50 0 100 27.5 100 82.5 50 110 0 82.5 0 27.5');
        svg.appendChild(poly);
        item.appendChild(svg);
        // store hue as data attribute for coloring
        const hue = (i * 36) % 360;
        item.style.setProperty('--h', hue + 'deg');
        item.style.setProperty('--fill', `hsl(${hue} 80% 45% / 0.12)`);
        row.appendChild(item);
      }
      bg.appendChild(row);
    }

    const boxes = Array.from(bg.querySelectorAll('.hex-item'));
    let centers = [];
    function updateCenters(){
      centers = boxes.map(el=>{
        const r = el.getBoundingClientRect();
        return {el, x: r.left + r.width/2, y: r.top + r.height/2};
      });
    }
    // 计算中心点（页面加载后以及 resize 时）
    // defer a tick so layout settles
    setTimeout(updateCenters, 50);
    updateCenters();
    window.addEventListener('resize', ()=>{ updateCenters(); });
    
    // 使用 document mousemove 来检测靠近的六边形（这样背景可置于正文下方且不阻塞交互）
    let last = null;
    document.addEventListener('mousemove', e=>{
      if(!centers.length) return;
      const mx = e.clientX, my = e.clientY;
      let nearest = null, nd = Infinity;
      for(let k=0;k<centers.length;k++){
        const c = centers[k];
        const dx = c.x - mx, dy = c.y - my;
        const d = dx*dx + dy*dy;
        if(d < nd){ nd = d; nearest = k; }
      }
      const threshold = 2500; // 距离阈值的平方（约 50px）
      if(nd < threshold){
        if(last !== nearest){ if(last !== null) centers[last].el.classList.remove('active'); centers[nearest].el.classList.add('active'); last = nearest; }
      } else { if(last !== null){ centers[last].el.classList.remove('active'); last = null; } }
    }, {passive:true});
  })();
</script>
</div>

<link rel="stylesheet" href="assets/css/extra.css">

# 主页

本站各部分简介与快速导航：

<section class="guide-page">
<div class="tab-wrapper">
  <div class="tab-list">
    <div class="tab-indicator"></div>
    <a href="homepage/%E7%BD%91%E7%AB%99%E4%BB%8B%E7%BB%8D/" class="tab-item active" data-target="tab-intro" title="网站介绍">
       <span class="icon">
         <!-- Home Icon -->
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
       </span>
    </a>
    <a href="guide/Vscode/" class="tab-item" data-target="tab-tools" title="工具">
       <span class="icon">
         <!-- Tool/Wrench Icon -->
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
       </span>
    </a>
    <a href="resourses/Vscode/" class="tab-item" data-target="tab-resources" title="软件资源">
       <span class="icon">
         <!-- Package/Box Icon -->
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
       </span>
    </a>
    <a href="notes/%E6%97%A0%E7%BA%BF%E7%94%B5%E5%BA%94%E7%94%A8%E5%92%8C%E5%AE%9E%E9%AA%8C/" class="tab-item" data-target="tab-notes" title="学习笔记">
       <span class="icon">
         <!-- Book Icon -->
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
       </span>
    </a>
    <a href="passages/%E5%A5%BD%E6%96%87BD/" class="tab-item" data-target="tab-articles" title="文章">
       <span class="icon">
         <!-- File Text Icon -->
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
       </span>
    </a>
    <a href="changelog/changelog/" class="tab-item" data-target="tab-changelog" title="更新日志">
       <span class="icon">
         <!-- Clock/History Icon -->
         <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
       </span>
    </a>
  </div>
  <div class="tab-display">
    <div id="tab-intro" class="tab-content-panel active">
      <h2>网站介绍</h2>
      <p>THE PASTWITHIN</p>
      <a href="homepage/%E7%BD%91%E7%AB%99%E4%BB%8B%E7%BB%8D/" class="tab-btn-go">进入板块</a>
    </div>
    <div id="tab-tools" class="tab-content-panel">
      <h2>工具</h2>
      <p>一点点介绍</p>
      <a href="guide/Vscode/" class="tab-btn-go">查看工具</a>
    </div>
    <div id="tab-resources" class="tab-content-panel">
      <h2>软件资源</h2>
      <p>一堆链接</p>
      <a href="resourses/Vscode/" class="tab-btn-go">获取资源</a>
    </div>
    <div id="tab-notes" class="tab-content-panel">
      <h2>学习笔记</h2>
      <p>笔记</p>
      <a href="notes/%E6%97%A0%E7%BA%BF%E7%94%B5%E5%BA%94%E7%94%A8%E5%92%8C%E5%AE%9E%E9%AA%8C/" class="tab-btn-go">阅读笔记</a>
    </div>
    <div id="tab-articles" class="tab-content-panel">
      <h2>文章</h2>
      <p>就是文章</p>
      <a href="passages/%E5%A5%BD%E6%96%87BD/" class="tab-btn-go">阅读文章</a>
    </div>
    <div id="tab-changelog" class="tab-content-panel">
      <h2>更新日志</h2>
      <p>用来记录我摸鱼的</p>
      <a href="changelog/changelog/" class="tab-btn-go">查看日志</a>
    </div>
  </div>
</div>
</section>

<script>
(function() {
  function initTabs() {
    const container = document.querySelector('.tab-wrapper');
    if (!container) return;
    
    // Select elements STRICTLY within container
    const tabItems = container.querySelectorAll('.tab-item');
    const panels = container.querySelectorAll('.tab-content-panel');
    const indicator = container.querySelector('.tab-indicator');
    const list = container.querySelector('.tab-list');

    if (!tabItems.length || !panels.length || !indicator || !list) return;

    function updateIndicator(item) {
      // Ensure item is visible/layout ready
      if (!item.offsetParent) return;

      const itemRect = item.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      
      const relativeTop = itemRect.top - listRect.top;
      
      indicator.style.top = relativeTop + 'px';
      indicator.style.height = itemRect.height + 'px';
    }

    tabItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // 1. Deactivate all
        tabItems.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        // 2. Activate current
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if(targetPanel) {
          targetPanel.classList.add('active');
        }
        
        // 3. Move indicator
        updateIndicator(item);
      });
    });

    // Init position
    const activeItem = container.querySelector('.tab-item.active');
    if (activeItem) {
        requestAnimationFrame(() => {
            updateIndicator(activeItem);
        });
        setTimeout(() => {
             // Double check in case of late layout shift
             if (activeItem) updateIndicator(activeItem);
        }, 200);
    }

    // Resize handler
    window.addEventListener('resize', () => {
        const currentActive = container.querySelector('.tab-item.active');
        if (currentActive) updateIndicator(currentActive);
    });
  }

  // Init immediately
  initTabs();

  // Also wait for DOMContentLoaded just in case
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  }
})();
</script>
