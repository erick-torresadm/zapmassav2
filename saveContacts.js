function newButton(text, callback, position) {
    var button = document.createElement('button');
    button.innerHTML = text;
    button.style.backgroundColor = '#25D366';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.color = '#ffffff';
    button.style.fontSize = '14px';
    button.style.padding = '10px 20px';
    button.style.position = 'fixed';
    button.style.right = `${10 + ((150 + 15) * (position - 1))}px`;
    button.style.top = '10px';
    button.style.zIndex = '999999';
    document.body.appendChild(button);
    button.addEventListener('click', callback);
}

function getContent(nameBase) {
    let content = 'Nome;Telefone;Data\n';
    let counter = 1;
    
    for (let phone in window.sContacts) {
        let cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        let date = new Date().toLocaleDateString();
        content += `${nameBase}${counter};${cleanPhone};${date}\n`;
        counter++;
    }
    
    return content;
}

function download(content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `contatos_${new Date().toLocaleDateString()}.csv`;
    
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function init() {
    newButton('Salvar Contatos', () => {
        let nameBase = prompt('Digite o prefixo para os nomes:');
        if (nameBase) {
            download(getContent(nameBase));
        }
    }, 1);
    
    getNumbers();
    document.querySelector('#pane-side').addEventListener('scroll', getNumbers);
}

function getNumbers() {
    if (!window.sContacts) window.sContacts = {};
    
    document.querySelectorAll('span[title]').forEach(element => {
        let phone = element.innerText || element.getAttribute('title');
        if (/^\+?\d[\d\s\-\(\)]+$/.test(phone)) {
            phone = phone.trim().replace(/\s+/g, ' ');
            window.sContacts[phone] = phone;
            element.style.backgroundColor = '#25D366';
        }
    });
}

setTimeout(init, 1000);