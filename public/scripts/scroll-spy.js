// Scroll Spy + Anchor Active Highlight (home only)
// Carga ligera: sólo se incluye en /, /es, /en páginas índice.

(function(){
  const path = window.location.pathname.replace(/\/$/, "");
  if(!(path === '' || path === '/en' || path === '/es')) return;

  // Utilidades de clases activas (duplicadas mínimas para aislamiento)
  const linkClasses = {
    active: ["text-mint-500","dark:text-mint-400","font-bold","[text-shadow:1px_1px_11px_rgba(208,251,229,0.7)]"],
    inactive: ["dark:text-zinc-300","text-blacktext"]
  };

  function toggleLinkClasses(link, isActive) {
    if(isActive){
      link.classList.add(...linkClasses.active);
      link.classList.remove(...linkClasses.inactive);
      link.setAttribute('aria-current','page');
    } else {
      link.classList.remove(...linkClasses.active);
      link.classList.add(...linkClasses.inactive);
      link.removeAttribute('aria-current');
    }
  }

  function updateActiveLink(){
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash ? `#${window.location.hash.substring(1)}` : "";
    const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
    document.querySelectorAll('nav a').forEach(link => {
      const pathAttr = link.getAttribute('data-path');
      if(!pathAttr) return;
      const normalizedLinkPath = pathAttr.replace(/\/$/, '') || '/';
      const isAnchor = pathAttr.includes('/#');
      let isActive = normalizedLinkPath === normalizedCurrentPath || pathAttr === currentHash;
      if(isAnchor){
        const [base, hash] = pathAttr.split('/#');
        if(hash && currentHash === `#${hash}`){
          const baseNormalized = base.replace(/\/$/, '');
            isActive = baseNormalized === normalizedCurrentPath || currentHash === `#${hash}`;
        }
      }
      toggleLinkClasses(link, isActive);
    });
  }

  function setupScrollSpy(){
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const sectionId = entry.target.getAttribute('id');
          if(sectionId){
            navLinks.forEach(link => {
              const pathAttr = link.getAttribute('data-path');
              if(!pathAttr) return;
              const anchorMatch = pathAttr.match(/\/#.+$/);
              const isSectionLink = anchorMatch && pathAttr.endsWith(`/#${sectionId}`);
              toggleLinkClasses(link, Boolean(isSectionLink));
            });
          }
        }
      });
    }, { root: null, rootMargin: '-50% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    setupScrollSpy();
    window.addEventListener('hashchange', updateActiveLink);
  });
})();
