/**
 * script.js — Mapa Interativo de RPG
 * ────────────────────────────────────────────────────────────────────
 * Etapa 1 → Modal de Pergaminho (clique nos pins)
 * Etapa 2 → Contador de dias juntos
 * Etapa 3 → Playlist de áudio em loop
 * Etapa 4 → Névoa removida automaticamente pelo CSS (3 s)
 * ────────────────────────────────────────────────────────────────────
 */

/* ================================================================
   ETAPA 1 — DADOS DOS PINS (edite aqui para mudar o modal)
   ================================================================

   Cada chave deve corresponder exatamente ao atributo
   data-pin-id="..." no HTML.

   Campos disponíveis:
     titulo    → título exibido no modal
     icone     → emoji ou caractere decorativo
     texto     → parágrafo de descrição
     contador  → true para exibir o contador de dias (Etapa 2)
*/
const DADOS_PINS = {
  'utfpr': {
    titulo:   'UTFPR — Cornélio Procópio',
    icone:    '🏛️',
    texto:    'Foi aqui, entre os corredores da UTFPR, que o destino nos colocou no mesmo caminho. Um olhar, uma conversa, e o que era desconhecido virou o começo da nossa história. Este lugar guarda o capítulo mais importante: o encontro.',
    contador: false,
  },

  'minha-casa': {
    titulo:   'A Nossa Casa',
    icone:    '🏡',
    texto:    'Quatro paredes que aprenderam a guardar risadas, abraços e o cheiro de domingo. Aqui cada canto tem uma memória escrita por nós dois. É o lugar onde a aventura sempre termina e, ao mesmo tempo, recomeça.',
    contador: true,   // exibe o contador de dias ao abrir este pin
  },

  /*
   * Para adicionar um novo pin com modal, siga o exemplo abaixo
   * e adicione o div.pin correspondente no index.html com
   * o mesmo data-pin-id:
   *
   * 'rio-de-janeiro': {
   *   titulo:   'Rio de Janeiro',
   *   icone:    '🌊',
   *   texto:    'Minha origem, onde tudo começou antes de te encontrar.',
   *   contador: false,
   * },
   */
};

/* ================================================================
   ETAPA 2 — DATA DE INÍCIO DO RELACIONAMENTO
   ================================================================
   Altere a linha abaixo para a data correta no formato:
   new Date('AAAA-MM-DD')

   Exemplo: se começaram em 14 de fevereiro de 2025 →
   new Date('2025-02-14')
*/
const DATA_INICIO = new Date('2025-01-01'); // ← ALTERE AQUI

/* ================================================================
   ETAPA 3 — PLAYLIST
   ================================================================
   Coloque seus arquivos de música na pasta:
     artifacts/mapa-rpg/public/assets/music/

   Suporte: .mp3, .ogg, .wav
   Edite o array abaixo com os nomes dos seus arquivos.
*/
const PLAYLIST = [
  { arquivo: '/assets/music/musica1.mp3', nome: 'Trilha I'   },
  { arquivo: '/assets/music/musica2.mp3', nome: 'Trilha II'  },
  { arquivo: '/assets/music/musica3.mp3', nome: 'Trilha III' },
];

/* ================================================================
   INICIALIZAÇÃO — executa após o DOM estar pronto
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  inicializarNevoa();
  inicializarModal();
  inicializarContador();
  inicializarPlaylist();
});

/* ================================================================
   ETAPA 4 — NÉVOA
   Remove o overlay do DOM após a animação CSS (3 s) para não
   bloquear interações na página.
   ================================================================ */
function inicializarNevoa() {
  const overlay = document.getElementById('nevoa-overlay');
  if (!overlay) return;

  // Remove do DOM após o fade-out acabar (3 s + 200 ms de margem)
  setTimeout(() => overlay.remove(), 3200);
}

/* ================================================================
   ETAPA 1 — MODAL DE PERGAMINHO
   ================================================================ */
function inicializarModal() {
  const modal        = document.getElementById('modal');
  const btnFechar    = document.getElementById('modal-fechar');
  const modalTitulo  = document.getElementById('modal-titulo');
  const modalIcone   = document.getElementById('modal-icone');
  const modalTexto   = document.getElementById('modal-texto');
  const modalContador = document.getElementById('modal-contador');

  if (!modal) return;

  // Escuta clique em todos os pins
  document.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();

      const id   = pin.dataset.pinId;
      const dado = DADOS_PINS[id];

      if (!dado) return; // pin sem dados definidos → não abre modal

      // Preenche o conteúdo
      modalIcone.textContent  = dado.icone  || '📍';
      modalTitulo.textContent = dado.titulo || id;
      modalTexto.textContent  = dado.texto  || '';

      // Mostra ou oculta o contador de dias
      if (dado.contador) {
        modalContador.classList.remove('hidden');
      } else {
        modalContador.classList.add('hidden');
      }

      // Exibe o modal
      modal.classList.remove('hidden');
    });
  });

  // Fecha ao clicar no botão X
  btnFechar.addEventListener('click', fecharModal);

  // Fecha ao clicar fora do pergaminho (no backdrop escurecido)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Fecha com a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  function fecharModal() {
    modal.classList.add('hidden');
  }
}

/* ================================================================
   ETAPA 2 — CONTADOR DE DIAS
   ================================================================ */
function inicializarContador() {
  atualizarContador();

  // Recalcula à meia-noite para se manter preciso
  agendarMeiaNorte(atualizarContador);
}

function atualizarContador() {
  const el = document.getElementById('contador-dias');
  if (!el) return;

  const hoje    = new Date();
  const diffMs  = hoje.setHours(0,0,0,0) - DATA_INICIO.setHours(0,0,0,0);
  const diffDias = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  el.textContent = diffDias.toLocaleString('pt-BR');
}

function agendarMeiaNorte(callback) {
  const agora     = new Date();
  const meiaNorte = new Date(agora);
  meiaNorte.setDate(agora.getDate() + 1);
  meiaNorte.setHours(0, 0, 1, 0); // 00:00:01 do dia seguinte

  const msAteMeiaNorte = meiaNorte - agora;

  setTimeout(() => {
    callback();
    setInterval(callback, 24 * 60 * 60 * 1000); // repete a cada 24 h
  }, msAteMeiaNorte);
}

/* ================================================================
   ETAPA 3 — PLAYLIST
   ================================================================ */
let trackAtual    = 0;
let audioIniciado = false;

function inicializarPlaylist() {
  const audio     = document.getElementById('audio-elemento');
  const btnMudo   = document.getElementById('btn-mudo');
  const trackNome = document.getElementById('audio-track-nome');

  if (!audio || !btnMudo || PLAYLIST.length === 0) return;

  function carregarTrack(indice) {
    trackAtual = ((indice % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
    const track = PLAYLIST[trackAtual];
    audio.src  = track.arquivo;
    audio.load();
    if (audioIniciado) {
      audio.play().catch(() => {});
    }
    if (trackNome) trackNome.textContent = track.nome;
  }

  // Avança para a próxima ao terminar
  audio.addEventListener('ended', () => {
    carregarTrack(trackAtual + 1);
  });

  // Botão de mudo
  btnMudo.addEventListener('click', () => {
    if (!audioIniciado) {
      // Primeiro clique: inicia o áudio
      audioIniciado = true;
      audio.play().catch(() => {});
    } else {
      audio.muted = !audio.muted;
    }
    btnMudo.textContent = audio.muted ? '🔇' : '🔊';
  });

  // Inicia no primeiro clique em qualquer lugar da página
  document.addEventListener('click', () => {
    if (!audioIniciado) {
      audioIniciado = true;
      audio.play().catch(() => {});
    }
  }, { once: true });

  // Carrega a primeira track
  carregarTrack(0);
}

/* ================================================================
   UTILITÁRIO — Adicionar pin via JavaScript
   ================================================================
   Use esta função para criar novos pins dinamicamente.
   Adicione também a entrada correspondente em DADOS_PINS acima
   para que o modal funcione.

   adicionarPin({
     id:       'della-pazetti',
     label:    'Della Pazetti',
     descricao:'Nossas risadas, conversas e pizzas.',
     top: 38, left: 78,
     cor: '#8e44ad'
   });
*/
function adicionarPin({ id, label, descricao, top, left, cor }) {
  const container = document.getElementById('mapa-container');
  if (!container) return;

  const pin = document.createElement('div');
  pin.className        = 'pin';
  pin.style.top        = `${top}%`;
  pin.style.left       = `${left}%`;
  pin.dataset.pinId    = id || '';

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

  // Reregistra os listeners do modal para incluir o novo pin
  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    const dado = DADOS_PINS[pin.dataset.pinId];
    if (!dado) return;

    document.getElementById('modal-icone').textContent  = dado.icone  || '📍';
    document.getElementById('modal-titulo').textContent = dado.titulo || label;
    document.getElementById('modal-texto').textContent  = dado.texto  || '';

    const mc = document.getElementById('modal-contador');
    dado.contador ? mc.classList.remove('hidden') : mc.classList.add('hidden');

    document.getElementById('modal').classList.remove('hidden');
  });

  return pin;
}
