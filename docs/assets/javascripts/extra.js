// Initialize theme enhancements on page load and on instant navigation using document$ observable
// - Wrap <pre><code> blocks into a mac-like .code-window with window controls
// - Add a copy button for code blocks
// This runs on initial load and whenever Zensical emits navigation events via document$.

(function() {
  // Utility: create window control dots
  function createWindowTop(titleText) {
    const top = document.createElement('div');
    top.className = 'code-window__top';
    const controls = document.createElement('div');
    controls.className = 'window-controls';
    ['red','yellow','green'].forEach(c => {
      const d = document.createElement('span');
      d.className = 'dot ' + c;
      controls.appendChild(d);
    });
    top.appendChild(controls);

    if (titleText) {
      const title = document.createElement('div');
      title.className = 'code-window__title';
      title.textContent = titleText;
      top.appendChild(title);
    }

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.type = 'button';
    copyBtn.innerText = 'Copy';
    copyBtn.addEventListener('click', (ev) => {
      const win = ev.currentTarget.closest('.code-window');
      if (!win) return;
      const codeEl = win.querySelector('pre code') || win.querySelector('pre');
      if (!codeEl) return;
      const text = codeEl.innerText;
      navigator.clipboard?.writeText(text).then(() => {
        const prev = copyBtn.innerText;
        copyBtn.innerText = 'Copied';
        setTimeout(() => copyBtn.innerText = prev, 1400);
      }).catch(() => {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); copyBtn.innerText = 'Copied'; } catch(e) { }
        document.body.removeChild(ta);
        setTimeout(() => copyBtn.innerText = 'Copy', 1400);
      });
    });

    // align copy button to right
    copyBtn.style.marginLeft = 'auto';
    top.appendChild(copyBtn);

    return top;
  }

  function enhanceCodeWindows(root=document) {
    const pres = root.querySelectorAll('pre:not(.enhanced)');
    pres.forEach(pre => {
      // skip if already wrapped by something that looks like a code-window
      if (pre.closest('.code-window')) {
        pre.classList.add('enhanced');
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'code-window frosted';
      // try to get a label from data-lang or first child
      let titleText = '';
      const codeEl = pre.querySelector('code');
      if (codeEl && codeEl.className) {
        // class like language-js -> show JS
        const m = codeEl.className.match(/language-([a-zA-Z0-9]+)/);
        if (m) titleText = m[1].toUpperCase();
      }
      const top = createWindowTop(titleText);
      wrapper.appendChild(top);

      // move pre into wrapper
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      pre.classList.add('enhanced');

      // Ensure pre is focusable for keyboard users
      pre.setAttribute('tabindex', '0');
    });
  }

  // If document$ exists (Zensical), subscribe so we run on each virtual navigation
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(function() {
      // tiny timeout to allow DOM to settle
      setTimeout(() => enhanceCodeWindows(document), 40);
    });
    // run once now
    enhanceCodeWindows(document);
  } else {
    // fallback: run on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => enhanceCodeWindows(document));
  }
})();