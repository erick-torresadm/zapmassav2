// config.js

const API_CONFIG = {
    // Esta é a URL que você está usando no popup.js
    URL: 'https://script.google.com/macros/s/AKfycbzbwJsLvRW-cKYyAoIyoNqg_V1NMm_aXkxRwnNv_j_GuIqJmck4SqRih5ilBoR6imgyHw/exec',
    
    // Você pode adicionar outras configurações aqui se necessário
    VERSION: '1.0',
    DEBUG: false
};

// Se estiver usando em um ambiente de módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}