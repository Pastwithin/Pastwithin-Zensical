---
title: VPN&&Github Copilot
tags:
  - VPN
  - Github Copilot
status: new
---

<iframe src="../VPN&&Github Copilot_light.html" style="display:block;width:calc(100% + 500px);min-width:1300px;margin-left:-100px;height:80vh;border:0;max-width:none;"></iframe>

<script>
(function(){
	const iframe = document.querySelector('iframe');
	if(!iframe) return;
	const darkSrc = '../VPN&&Github Copilot_dark.html';
	const lightSrc = '../VPN&&Github Copilot_light.html';

	function getTheme(){
		// prefer body attribute (Material theme sets data-md-color-scheme on <body>)
		const bodyScheme = document.body && document.body.getAttribute && document.body.getAttribute('data-md-color-scheme');
		if (bodyScheme === 'slate') return 'dark';
		if (bodyScheme === 'default') return 'light';
		const htmlScheme = document.documentElement.getAttribute && document.documentElement.getAttribute('data-md-color-scheme');
		if (htmlScheme === 'slate') return 'dark';
		if (htmlScheme === 'default') return 'light';
		if (document.documentElement.classList.contains('dark')) return 'dark';
		if (document.documentElement.classList.contains('light')) return 'light';
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	
	function applyThemeSrc(){
		const theme = getTheme();
		const target = theme === 'light' ? lightSrc : darkSrc;
		if (iframe.getAttribute('src') !== target) iframe.setAttribute('src', target);
	}
	
	applyThemeSrc();
	
	if (window.matchMedia) {
		try{ window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyThemeSrc); }catch(e){}
	}
	
	const obs = new MutationObserver(applyThemeSrc);
	// observe both html and body attributes because theme toggler updates body
	obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-md-color-scheme'] });
	if (document.body) obs.observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme'] });
})();
</script>