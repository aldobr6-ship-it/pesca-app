const translations = {
  it: {
    welcome: "Benvenuto nella mappa di pesca!",
    search: "Cerca una zona...",
    gps_error: "Impossibile trovare la tua posizione."
  },
  fr: {
    welcome: "Bienvenue sur la carte de pêche !",
    search: "Rechercher une zone...",
    gps_error: "Impossible de trouver votre position."
  }
};

// Funzione principale per applicare i testi tradotti
function applyLanguage(lang) {
  // Cerca tutti gli elementi con l'attributo data-i18n e cambia il testo
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });
  
  // Salva la lingua scelta nella memoria del telefono
  localStorage.setItem("userLanguage", lang);
}

// Rileva la lingua all'avvio dell'app
function initLanguage() {
  // 1. Controlla se l'utente ha cliccato un pulsante in passato
  let savedLang = localStorage.getItem("userLanguage");
  
  // 2. Se non c'è una lingua salvata, legge quella del telefono
  if (!savedLang) {
    let userLang = navigator.language || navigator.userLanguage;
    savedLang = userLang.substring(0, 2);
  }
  
  // Se la lingua rilevata non è supportata, usa l'italiano
  if (!translations[savedLang]) {
    savedLang = 'it';
  }
  
  applyLanguage(savedLang);
}

// Avvia la configurazione quando la pagina è pronta
window.addEventListener("DOMContentLoaded", initLanguage);
