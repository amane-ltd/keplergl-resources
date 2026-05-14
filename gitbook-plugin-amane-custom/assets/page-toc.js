document.addEventListener('DOMContentLoaded', function() {
  var container = document.querySelector('.page-inner section');
  if (!container) return;

  var headings = container.querySelectorAll('h2, h3');
  if (headings.length < 2) return;

  var nav = document.createElement('nav');
  nav.className = 'page-toc';

  var title = document.createElement('div');
  title.className = 'page-toc-title';
  title.textContent = 'ON THIS PAGE';
  nav.appendChild(title);

  var ul = document.createElement('ul');

  headings.forEach(function(h) {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^\w　-鿿]+/g, '-');
    }
    var li = document.createElement('li');
    li.className = 'page-toc-' + h.tagName.toLowerCase();
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);

  var wrapper = document.querySelector('.page-wrapper');
  if (wrapper) wrapper.appendChild(nav);

  var links = nav.querySelectorAll('a');

  function updateActive() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var active = null;

    headings.forEach(function(h) {
      if (h.offsetTop - 80 <= scrollTop) {
        active = h.id;
      }
    });

    links.forEach(function(a) {
      if (a.getAttribute('href') === '#' + active) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
});
