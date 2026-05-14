module.exports = {
  website: {
    assets: './assets',
    js: ['page-toc.js'],
    css: ['plugin.css']
  },
  hooks: {
    'page': function(page) {
      page.content = page.content.replace(
        /<code>([^<]+)<\/code>/g,
        '<span class="copy-code-wrapper"><code>$1</code><button class="copy-code-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent).then(function(){var b=event.target;b.textContent=\'Copied!\';b.classList.add(\'copied\');setTimeout(function(){b.textContent=\'Copy\';b.classList.remove(\'copied\')},1500)})">Copy</button></span>'
      );
      return page;
    }
  }
};
