document.getElementById('activate').addEventListener('click', async function() {
    const keyInput = document.getElementById('keyInput');
    const key = keyInput.value.trim();
    
    if (!key) {
        alert('Por favor, insira uma chave');
        return;
    }

    try {
        const url = 'https://script.google.com/macros/s/AKfycbzQXlz7JjaMcQFZrMOgceB2cPWfg_eMILixKAVciopS11CmS9zLCdmHXxWfDlFEld3p/exec';
        const response = await fetch(`${url}?key=${encodeURIComponent(key)}`);
        const data = await response.text();

        if (data.includes('true')) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    files: ['saveContacts.js']
                });
            });
            
            document.getElementById('status').textContent = 'Ativado com sucesso!';
            document.getElementById('status').style.color = '#25D366';
            setTimeout(() => window.close(), 1500);
        } else {
            document.getElementById('status').textContent = 'Chave inválida!';
            document.getElementById('status').style.color = '#FF0000';
        }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('status').textContent = 'Erro ao validar chave';
        document.getElementById('status').style.color = '#FF0000';
    }
});