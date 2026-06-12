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
   ✏️  EDITE AQUI — CONTEÚDO DE CADA PIN
   ================================================================

   Cada chave deve corresponder ao atributo data-pin-id="..."
   no index.html.

   Campos editáveis:
     titulo   → título grande do pergaminho
     icone    → emoji decorativo
     texto    → frase/parágrafo que aparece abaixo das fotos
     contador → true = mostra o contador de dias neste pin
     fotos    → até 4 fotos (grade 2×2)
                src     → caminho em public/assets/fotos/<pasta>/
                legenda → texto na polaroid e no lightbox
*/
const DADOS_PINS = {

  /* ──────────────────────────────────────────────
     UTFPR — coloque as fotos em:
     public/assets/fotos/utfpr/
  ────────────────────────────────────────────── */
  'utfpr': {
    titulo:  'UTFPR — Cornélio Procópio',
    icone:   '🏛️',
    texto:   'Foi aqui, entre os corredores da UTFPR, que o destino nos colocou no mesmo caminho. Um olhar, uma conversa, e o que era desconhecido virou o começo da nossa história.',
    contador: false,
    fotos: [
      { src: '/assets/fotos/utfpr/foto1.jpg', legenda: 'O primeiro encontro ✨' },
      { src: '/assets/fotos/utfpr/foto2.jpg', legenda: 'Nos corredores da UTFPR' },
      { src: '/assets/fotos/utfpr/foto3.jpg', legenda: 'Uma tarde inesquecível' },
      { src: '/assets/fotos/utfpr/foto4.jpg', legenda: 'Mais uma memória' },
    ],
  },

  /* ──────────────────────────────────────────────
     MINHA CASA — coloque as fotos em:
     public/assets/fotos/minha-casa/
  ────────────────────────────────────────────── */
  'minha-casa': {
    titulo:  'A Minha Casa',
    icone:   '🏡',
    texto:   'Quatro paredes que aprenderam a guardar risadas, abraços e o cheiro de domingo. Aqui cada canto tem uma memória escrita por nós dois.',
    contador: true,   // ← exibe o contador de dias neste pin
    fotos: [
      { src: '/assets/fotos/minha-casa/foto1.jpg', legenda: 'Domingo em casa 🏡' },
      { src: '/assets/fotos/minha-casa/foto2.jpg', legenda: 'Nosso cantinho favorito' },
      { src: '/assets/fotos/minha-casa/foto3.jpg', legenda: 'Mais uma memória' },
      { src: '/assets/fotos/minha-casa/foto4.jpg', legenda: 'Recordações' },
    ],
  },

  /* ──────────────────────────────────────────────
     RIO DE JANEIRO — coloque as fotos em:
     public/assets/fotos/rio-de-janeiro/
  ────────────────────────────────────────────── */
  'rio-de-janeiro': {
    titulo:  'Rio de Janeiro',
    icone:   '🌊',
    texto:   'Minha origem, onde tudo começou antes de te encontrar. A cidade que me formou e que um dia te apresentei.',
    contador: false,
    fotos: [
      { src: '/assets/fotos/rio-de-janeiro/foto1.jpg', legenda: 'Vista da Baía de Guanabara' },
      { src: '/assets/fotos/rio-de-janeiro/foto2.jpg', legenda: 'Minha cidade' },
    ],
  },

  /* ──────────────────────────────────────────────
     A VIAGEM — coloque as fotos em:
     public/assets/fotos/a-viagem/
  ────────────────────────────────────────────── */
  'a-viagem': {
    titulo:  'A Viagem',
    icone:   '🚌',
    texto:   'A mudança que me trouxe até você. Cada quilômetro rodado foi um passo em direção ao nosso começo.',
    contador: false,
    fotos: [
      { src: '/assets/fotos/a-viagem/foto1.jpg', legenda: 'A partida' },
      { src: '/assets/fotos/a-viagem/foto2.jpg', legenda: 'Pelo caminho' },
    ],
  },

  /* ──────────────────────────────────────────────
     DELLA PAZETTI — coloque as fotos em:
     public/assets/fotos/della-pazetti/
  ────────────────────────────────────────────── */
  'della-pazetti': {
    titulo:  'Della Pazetti',
    icone:   '🍕',
    texto:   'Nossas risadas, conversas e pizzas. O lugar onde a gente virou "nós".',
    contador: false,
    fotos: [
      { src: '/assets/fotos/della-pazetti/foto1.jpg', legenda: 'Nossa mesa favorita' },
      { src: '/assets/fotos/della-pazetti/foto2.jpg', legenda: 'A melhor pizza' },
    ],
  },

  /* ──────────────────────────────────────────────
     UTFPR GUARAPUAVA — coloque as fotos em:
     public/assets/fotos/utfpr-guarapuava/
  ────────────────────────────────────────────── */
  'utfpr-guarapuava': {
    titulo:  'UTFPR Guarapuava',
    icone:   '🎓',
    texto:   'Uma jornada além do campus. Novos horizontes, mesma parceria.',
    contador: false,
    fotos: [
      { src: '/assets/fotos/utfpr-guarapuava/foto1.jpg', legenda: 'Campus Guarapuava' },
    ],
  },

  /* ──────────────────────────────────────────────
     O FUTURO — coloque as fotos em:
     public/assets/fotos/o-futuro/
  ────────────────────────────────────────────── */
  'o-futuro': {
    titulo:  'O Futuro',
    icone:   '✨',
    texto:   'Nossa próxima grande aventura. Ainda não explorado, mas já cheio de sonhos escritos a dois.',
    contador: false,
    fotos: [], // sem fotos por enquanto — adicione quando chegar a hora!
  },

};

/* ================================================================
   ✏️  CONTADOR DE DIAS — edite o número abaixo
   ================================================================
   Coloque aqui o número de dias que vocês estão juntos.
   O valor é exibido no pin que tiver  contador: true  acima.
   Atualize manualmente sempre que quiser.
*/
const DIAS_JUNTOS = 528; // ← ALTERE AQUI

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
  inicializarLightbox();
  inicializarContador();
  inicializarPlaylist();
  centralizarMapaMobile();
});

/* ================================================================
   MOBILE — centraliza o mapa horizontalmente ao carregar
   ================================================================ */
function centralizarMapaMobile() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobile) return;

  // Mapa renderizado em 1100px; centraliza na largura da tela
  const mapaLargura = 1100;
  const telaLargura = window.innerWidth;
  const scrollX = Math.max(0, (mapaLargura - telaLargura) / 2);

  // Aguarda a névoa sumir (3 s) antes de centralizar
  setTimeout(() => {
    window.scrollTo({ left: scrollX, top: 0, behavior: 'smooth' });
  }, 3200);
}

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
  const modal         = document.getElementById('modal');
  const btnFechar     = document.getElementById('modal-fechar');
  const modalTitulo   = document.getElementById('modal-titulo');
  const modalIcone    = document.getElementById('modal-icone');
  const modalTexto    = document.getElementById('modal-texto');
  const modalContador = document.getElementById('modal-contador');
  const modalAlbum    = document.getElementById('modal-album');
  const albumGrid     = document.getElementById('album-grid');

  if (!modal) return;

  function abrirModalPin(id, labelFallback) {
    const dado = DADOS_PINS[id];
    if (!dado) return;

    // Preenche conteúdo principal
    modalIcone.textContent  = dado.icone  || '📍';
    modalTitulo.textContent = dado.titulo || labelFallback || id;
    modalTexto.textContent  = dado.texto  || '';

    // Contador de dias
    dado.contador
      ? modalContador.classList.remove('hidden')
      : modalContador.classList.add('hidden');

    // Álbum de fotos
    renderizarAlbum(dado.fotos || [], albumGrid, modalAlbum);

    modal.classList.remove('hidden');
  }

  // Escuta clique em todos os pins existentes
  document.querySelectorAll('.pin').forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      abrirModalPin(pin.dataset.pinId);
    });
  });

  // Fecha ao clicar no botão X
  btnFechar.addEventListener('click', fecharModal);

  // Fecha ao clicar fora do pergaminho (no backdrop)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Fecha com Escape (só fecha o modal se o lightbox estiver fechado)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lb = document.getElementById('lightbox');
      if (!lb || lb.classList.contains('hidden')) fecharModal();
    }
  });

  function fecharModal() {
    modal.classList.add('hidden');
  }

  // Expõe para uso por adicionarPin()
  window._abrirModalPin = abrirModalPin;
}

/* ----------------------------------------------------------------
   Renderiza a grade de miniaturas estilo polaroid (3×2 máx 6 fotos)
   ---------------------------------------------------------------- */
function renderizarAlbum(fotos, grid, container) {
  grid.innerHTML = '';

  if (!fotos || fotos.length === 0) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');

  // Limita a 4 fotos (grade 2×2)
  const fotosVisiveis = fotos.slice(0, 4);

  fotosVisiveis.forEach((foto, indice) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'foto-wrapper';
    wrapper.title     = foto.legenda || '';

    const img = document.createElement('img');
    img.src       = foto.src;
    img.alt       = foto.legenda || `Foto ${indice + 1}`;
    img.className = 'album-thumb';
    img.loading   = 'lazy';

    // Fallback: placeholder quando a imagem não carrega
    img.onerror = () => {
      const ph = document.createElement('div');
      ph.className   = 'foto-placeholder';
      ph.textContent = '📷';
      ph.title = `Adicione: ${foto.src}`;
      wrapper.replaceChild(ph, img);
    };

    const legenda = document.createElement('span');
    legenda.className   = 'foto-legenda';
    legenda.textContent = foto.legenda || '';

    wrapper.appendChild(img);
    wrapper.appendChild(legenda);

    // Abre lightbox ao clicar na foto
    wrapper.addEventListener('click', () => abrirLightbox(fotos, indice));

    grid.appendChild(wrapper);
  });
}

/* ================================================================
   LIGHTBOX — Visualizador de foto em tela cheia
   ================================================================ */
let _lbFotos  = [];
let _lbIndice = 0;

function inicializarLightbox() {
  const lb       = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbLeg    = document.getElementById('lightbox-legenda');
  const btnFechar = document.getElementById('lightbox-fechar');
  const btnAnter  = document.getElementById('lightbox-anterior');
  const btnProx   = document.getElementById('lightbox-proximo');

  if (!lb) return;

  btnFechar.addEventListener('click', fecharLightbox);
  lb.addEventListener('click', (e) => { if (e.target === lb) fecharLightbox(); });

  btnAnter.addEventListener('click', () => navegarLightbox(-1));
  btnProx.addEventListener('click',  () => navegarLightbox(+1));

  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft')  navegarLightbox(-1);
    if (e.key === 'ArrowRight') navegarLightbox(+1);
    if (e.key === 'Escape')     fecharLightbox();
  });

  function fecharLightbox() {
    lb.classList.add('hidden');
    lbImg.src = '';
  }

  function atualizarBotoes() {
    btnAnter.classList.toggle('oculto', _lbIndice === 0);
    btnProx.classList.toggle('oculto',  _lbIndice === _lbFotos.length - 1);
  }

  function mostrarFoto(indice) {
    _lbIndice = indice;
    const foto = _lbFotos[_lbIndice];

    // Re-anima a imagem a cada troca
    lbImg.style.animation = 'none';
    lbImg.offsetHeight;
    lbImg.style.animation = '';

    lbImg.src         = foto.src;
    lbImg.alt         = foto.legenda || '';
    lbLeg.textContent = foto.legenda || '';
    atualizarBotoes();
  }

  function navegarLightbox(delta) {
    const novo = _lbIndice + delta;
    if (novo >= 0 && novo < _lbFotos.length) mostrarFoto(novo);
  }

  // Expõe globalmente para ser chamado por renderizarAlbum()
  window._mostrarLightbox = (fotos, indice) => {
    _lbFotos  = fotos;
    lb.classList.remove('hidden');
    mostrarFoto(indice);
  };
}

function abrirLightbox(fotos, indice) {
  if (window._mostrarLightbox) window._mostrarLightbox(fotos, indice);
}

/* ================================================================
   CONTADOR DE DIAS — usa o valor manual DIAS_JUNTOS
   ================================================================ */
function inicializarContador() {
  const el = document.getElementById('contador-dias');
  if (el) el.textContent = DIAS_JUNTOS.toLocaleString('pt-BR');
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
   para que o modal e o álbum funcionem.

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
  pin.className     = 'pin';
  pin.style.top     = `${top}%`;
  pin.style.left    = `${left}%`;
  pin.dataset.pinId = id || '';

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

  // Usa a função centralizada do modal (inicializada em inicializarModal)
  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window._abrirModalPin) window._abrirModalPin(pin.dataset.pinId, label);
  });

  return pin;
}
