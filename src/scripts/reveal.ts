/**
 * Adds `is-revealed` to `[data-reveal]` elements as they enter the viewport.
 * Hidden states only apply under `.js` + `prefers-reduced-motion: no-preference`
 * (see global.css), so content is never lost if this script doesn't run.
 */
export function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );

  targets.forEach((el) => observer.observe(el));
}
