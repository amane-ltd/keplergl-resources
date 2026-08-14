(function () {
  function setMeta(name, value, attrName) {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;
    var tag = document.querySelector('meta[' + attrName + '="' + name + '"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, name);
      head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  }

  function addSeoMeta() {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    var title = document.title || 'Kepler.gl 可視化素材集';
    var description = 'Kepler.glで利用可能なベクタータイル・ベースマップ・サンプルマップのリソース一覧です。';

    if (!document.querySelector('meta[name="description"]')) {
      var descMeta = document.createElement('meta');
      descMeta.name = 'description';
      descMeta.content = description;
      head.appendChild(descMeta);
    }

    if (!document.querySelector('link[rel="canonical"]')) {
      var canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = window.location.href;
      head.appendChild(canonical);
    }

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', window.location.href, 'property');

    // Twitter card metadata for better preview snippets
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSeoMeta);
  } else {
    addSeoMeta();
  }
})();
