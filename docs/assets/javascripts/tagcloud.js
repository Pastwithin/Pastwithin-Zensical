// 简单标签云：从 /search.json 中统计 tags 并渲染到 #tagcloud
(async function(){
  try{
    const resp = await fetch('/search.json');
    if(!resp.ok) throw new Error('fetch search.json failed');
    const data = await resp.json();
    const items = data.items || [];
    // 为避免同一页面（被拆成多个 heading/item）重复计数，按页面去重计数。
    const tagPages = {}; // tag -> Set of page identifiers
    items.forEach(it=>{
      if(!Array.isArray(it.tags) || !it.tags.length) return;
      // 优先使用页面的 `path`（通常相同），若无则回退到 location 或 title
      const pageId = (Array.isArray(it.path) && it.path.length) ? it.path.join('/') : (it.location || it.title || '');
      it.tags.forEach(t=>{
        if(!tagPages[t]) tagPages[t] = new Set();
        tagPages[t].add(pageId);
      });
    });
    const counts = {};
    for(const t of Object.keys(tagPages)) counts[t] = tagPages[t].size;
    const container = document.getElementById('tagcloud');
    if(!container){ return; }
    const tags = Object.keys(counts);
    if(tags.length === 0){
      container.innerHTML = '<p>未检测到标签。请在文章前置元数据中添加 `tags`，然后重新构建站点。</p>';
      return;
    }
    const max = Math.max(...Object.values(counts));
    container.innerHTML = '';
    tags.sort((a,b)=>counts[b]-counts[a]);
    tags.forEach(tag=>{
      const a = document.createElement('a');
      a.className = 'tagcloud-item';
      a.textContent = `${tag} (${counts[tag]})`;
      // 假设生成器会在 /tags/<tag>/ 提供每个标签的索引页
      a.href = '/tags/' + encodeURIComponent(tag) + '/';
      // 固定字体大小，保证所有标签视觉统一
      a.style.fontSize = '1em';
      container.appendChild(a);
    });
  }catch(e){
    const container = document.getElementById('tagcloud');
    if(container) container.innerHTML = '<p>读取标签失败：' + (e.message||e) + '</p>';
    console.error(e);
  }
})();
