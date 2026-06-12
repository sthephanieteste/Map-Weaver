/**
 * script.js — Mapa Interativo de RPG
 *
 * Como funciona o sistema de pins:
 * ─────────────────────────────────
 * Cada pin no HTML usa style="top: X%; left: Y%"
 * onde X e Y são porcentagens relativas ao tamanho do container.
 *
 * • top: 0%   = topo da imagem
 * • top: 100% = base da imagem
 * • left: 0%  = borda esquerda da imagem
 * • left: 100% = borda direita da imagem
 *
 * O pin é ancorado pela sua ponta inferior no ponto desejado
 * graças ao CSS: transform: translate(-50%, -100%)
 *
 * Para adicionar um novo pin via JavaScript, use a função
 * adicionarPin() abaixo.
 */

/**
 * Adiciona um pin ao mapa programaticamente.
 *
 * @param {object} opcoes
 * @param {string} opcoes.label      - Nome do local (ex: "Minha Casa")
 * @param {string} opcoes.descricao  - Texto de descrição exibido no tooltip
 * @param {number} opcoes.top        - Posição vertical em % (0 = topo, 100 = base)
 * @param {number} opcoes.left       - Posição horizontal em % (0 = esquerda, 100 = direita)
 * @param {string} [opcoes.cor]      - Cor CSS do ícone (ex: "#8e44ad"). Padrão: "#c0392b"
 */
function adicionarPin({ label, descricao, top, left, cor }) {
  const container = document.getElementById('mapa-container');
  if (!container) return;

  const pin = document.createElement('div');
  pin.className = 'pin';
  pin.style.top = `${top}%`;
  pin.style.left = `${left}%`;

  pin.innerHTML = `
    <div class="pin-icon" style="${cor ? `color: ${cor};` : ''}">
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
      </svg>
    </div>
    <div class="pin-tooltip">
      <span class="pin-label">${label}</span>
      <span class="pin-desc">${descricao}</span>
    </div>
  `;

  container.appendChild(pin);
  return pin;
}

/**
 * Exemplo de uso — descomente para adicionar mais pins:
 *
 * adicionarPin({
 *   label: 'Della Pazetti',
 *   descricao: 'Nossas risadas, conversas e pizzas.',
 *   top: 38,
 *   left: 78,
 *   cor: '#8e44ad'
 * });
 *
 * adicionarPin({
 *   label: 'Rio de Janeiro',
 *   descricao: 'Minha origem, onde tudo começou.',
 *   top: 52,
 *   left: 22,
 *   cor: '#27ae60'
 * });
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Mapa Interativo carregado com sucesso!');
  console.log('Use adicionarPin({ label, descricao, top, left, cor }) para adicionar novos marcadores.');
});
