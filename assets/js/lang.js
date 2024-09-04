<script>
  let currentLanguage = 'en';
  let translations = {};
  
  async function loadTranslations(lang) {
    const response = await fetch(`/${lang}.json`);
    translations[lang] = await response.json();
  }
  
  async function changeLanguage(lang) {
    if (!translations[lang]) {
      await loadTranslations(lang);
    }
    currentLanguage = lang;
    document.documentElement.lang = lang;
    updateContent();
  }
  
  function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = getTranslation(key);
    });
  }
  
  function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
      value = value[k];
      if (!value) break;
    }
    return value || key;
  }
  
  // Load English translations by default
  loadTranslations('en').then(() => updateContent());
</script>