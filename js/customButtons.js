document.addEventListener('DOMContentLoaded', () => {
  console.log('💥 customButtons.js iniciado');

  const addBtn    = document.getElementById('addCustomBtn');
  const form      = document.getElementById('customBtnForm');
  const save      = document.getElementById('cb-save');
  // procura a botoes-coloridos que contém o botão (container de Favoritos)
  const container = addBtn.closest('.botoes-coloridos');

  if (!addBtn || !form || !save || !container) {
    console.error('customButtons: elemento faltando', {addBtn, form, save, container});
    return;
  }

  // abre / fecha o form
  addBtn.addEventListener('click', () => {
    form.classList.toggle('hidden');
  });

  // salva novo botão
  save.addEventListener('click', e => {
    e.preventDefault();
    const name  = document.getElementById('cb-name').value.trim();
    const url   = document.getElementById('cb-url').value.trim();
    const color = document.getElementById('cb-color').value.trim();
    if (!name || !url || !color) return alert('Preencha todos os campos!');

    const a = document.createElement('a');
    a.textContent          = name;
    a.href                 = url;
    a.target               = '_blank';
    a.style.cssText        = `
      display:inline-flex;
      align-items:center;
      justify-content:center;
      width:60px;
      height:60px;
      background:${color};
      color:#fff;
      text-decoration:none;
      border-radius:4px;
      box-shadow:4px 4px 0 #000;
      margin:5px;
    `;
    container.appendChild(a);

    const saved = JSON.parse(localStorage.getItem('customButtons')||'[]');
    saved.push({ name, url, color });
    localStorage.setItem('customButtons', JSON.stringify(saved));

    form.querySelectorAll('input').forEach(i=>i.value='');
    form.classList.add('hidden');
  });

  // recarrega botões do storage
  const saved = JSON.parse(localStorage.getItem('customButtons')||'[]');
  saved.forEach(({name, url, color}) => {
    const a = document.createElement('a');
    a.textContent          = name;
    a.href                 = url;
    a.target               = '_blank';
    a.style.cssText        = `
      display:inline-flex;
      align-items:center;
      justify-content:center;
      width:60px;
      height:60px;
      background:${color};
      color:#fff;
      text-decoration:none;
      border-radius:4px;
      box-shadow:4px 4px 0 #000;
      margin:5px;
    `;
    container.appendChild(a);
  });
});
