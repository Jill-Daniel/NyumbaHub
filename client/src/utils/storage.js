const KEY = 'nyumbahub_applications';

export function saveApplicationRef(id) {
  const refs = getApplicationRefs();
  if (!refs.includes(id)) {
    refs.unshift(id);
    localStorage.setItem(KEY, JSON.stringify(refs.slice(0, 20)));
  }
}

export function getApplicationRefs() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}
