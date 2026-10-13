/**
 * LeadMaps Pro Enterprise — Aplicação Interativa do Portal
 * Gerencia Calculadora de ROI, Status de Atendimento, Abas de Demonstração e FAQ.
 */

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLiveStatus();
  initDynamicLinks();
  initRoiCalculator();
  initHeroMockupTabs();
  initFaqAccordion();
  initPricingToggle();
  initGeoGridLiveSimulation();
});

// --------------------------------------------------------------------------
// 1. Status do WhatsApp em Tempo Real (Sincronizado com Horário de Brasília)
// --------------------------------------------------------------------------
function initWhatsAppLiveStatus() {
  const statusBadge = document.getElementById('waHeaderStatus');
  const statusDot = document.getElementById('waHeaderDot');
  const statusText = document.getElementById('waHeaderText');

  function checkOpenHours() {
    const now = new Date();
    // Ajuste para Horário de Brasília (UTC-3)
    const utcHours = now.getUTCHours();
    const brasiliaHour = (utcHours - 3 + 24) % 24;
    const dayOfWeek = now.getUTCDay(); // 0 = Domingo, 6 = Sábado

    let isOpen = false;
    const { openHourWeek, closeHourWeek, openHourSat, closeHourSat } = LEADMAPS_CONFIG.whatsapp.hours;

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Segunda a Sexta
      isOpen = brasiliaHour >= openHourWeek && brasiliaHour < closeHourWeek;
    } else if (dayOfWeek === 6) {
      // Sábado
      isOpen = brasiliaHour >= openHourSat && brasiliaHour < closeHourSat;
    } else {
      // Domingo fechado
      isOpen = false;
    }

    if (statusBadge && statusDot && statusText) {
      if (isOpen) {
        statusDot.className = "w-2 h-2 rounded-full bg-emerald-400 status-pulse-online";
        statusText.textContent = "Suporte Online";
        statusBadge.className = "hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      } else {
        statusDot.className = "w-2 h-2 rounded-full bg-amber-400";
        statusText.textContent = "Plantão / Fora do Horário";
        statusBadge.className = "hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20";
      }
    }
  }

  checkOpenHours();
  setInterval(checkOpenHours, 60000); // Checa a cada minuto
}

// --------------------------------------------------------------------------
// 2. Vinculação Dinâmica de Links Operacionais
// --------------------------------------------------------------------------
function initDynamicLinks() {
  // Configura links de abertura de aplicativo e login
  document.querySelectorAll('[data-link="webApp"]').forEach(el => {
    el.href = LEADMAPS_CONFIG.links.webApp;
  });

  document.querySelectorAll('[data-link="login"]').forEach(el => {
    el.href = LEADMAPS_CONFIG.links.login;
  });

  document.querySelectorAll('[data-link="chromeExtension"]').forEach(el => {
    el.href = LEADMAPS_CONFIG.links.chromeExtension;
  });

  // Configura botões de WhatsApp com mensagens contextuais
  document.querySelectorAll('[data-whatsapp]').forEach(btn => {
    const msg = btn.getAttribute('data-whatsapp') || LEADMAPS_CONFIG.whatsapp.defaultMessage;
    const url = `https://wa.me/${LEADMAPS_CONFIG.whatsapp.number}?text=${encodeURIComponent(msg)}`;
    btn.href = url;
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
  });
}

// --------------------------------------------------------------------------
// 3. Calculadora Interativa de Retorno sobre Investimento (ROI B2B)
// --------------------------------------------------------------------------
function initRoiCalculator() {
  const sliderTicket = document.getElementById('roiTicketSlider');
  const sliderClients = document.getElementById('roiClientsSlider');
  const displayTicket = document.getElementById('roiTicketDisplay');
  const displayClients = document.getElementById('roiClientsDisplay');
  const displayMonthlyRevenue = document.getElementById('roiMonthlyRevenue');
  const displayAnnualRevenue = document.getElementById('roiAnnualRevenue');
  const displayRoiMultiple = document.getElementById('roiMultipleDisplay');
  const displayPaybackMessage = document.getElementById('roiPaybackMessage');

  if (!sliderTicket || !sliderClients) return;

  function calculateRoi() {
    const ticket = parseInt(sliderTicket.value, 10);
    const clients = parseInt(sliderClients.value, 10);

    displayTicket.textContent = `R$ ${ticket.toLocaleString('pt-BR')}`;
    displayClients.textContent = `${clients} ${clients === 1 ? 'cliente' : 'clientes'}`;

    const monthlyRevenue = ticket * clients;
    const annualRevenue = monthlyRevenue * 12;

    displayMonthlyRevenue.textContent = `R$ ${monthlyRevenue.toLocaleString('pt-BR')}`;
    displayAnnualRevenue.textContent = `R$ ${annualRevenue.toLocaleString('pt-BR')}`;

    // Custo base: Plano Anual (R$ 41,41/mês)
    const leadMapsMonthlyCost = 41.41;
    const multiple = (monthlyRevenue / leadMapsMonthlyCost).toFixed(0);

    if (displayRoiMultiple) {
      displayRoiMultiple.textContent = `${multiple}x`;
    }

    if (displayPaybackMessage) {
      displayPaybackMessage.innerHTML = `Fechando <strong>${clients} ${clients === 1 ? 'cliente' : 'clientes'}</strong> a <strong>R$ ${ticket.toLocaleString('pt-BR')}/mês</strong>, o LeadMaps Pro se paga <strong>${multiple} vezes</strong> no mês!`;
    }
  }

  sliderTicket.addEventListener('input', calculateRoi);
  sliderClients.addEventListener('input', calculateRoi);
  calculateRoi();
}

// --------------------------------------------------------------------------
// 4. Abas Interativas de Demonstração (Hero Mockup Console)
// --------------------------------------------------------------------------
function initHeroMockupTabs() {
  const tabButtons = document.querySelectorAll('[data-mockup-tab]');
  const tabPanes = document.querySelectorAll('[data-mockup-pane]');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-mockup-tab');

      tabButtons.forEach(b => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
        b.classList.add('text-slate-400', 'border-transparent');
      });

      btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
      btn.classList.remove('text-slate-400', 'border-transparent');

      tabPanes.forEach(pane => {
        if (pane.getAttribute('data-mockup-pane') === target) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 5. Simulação Interativa ao Vivo do GeoGrid GPS
// --------------------------------------------------------------------------
function initGeoGridLiveSimulation() {
  const gridPoints = document.querySelectorAll('.geo-sim-point');
  const infoEmpresa = document.getElementById('geoSimCompany');
  const infoRank = document.getElementById('geoSimRank');
  const infoDist = document.getElementById('geoSimDist');

  gridPoints.forEach(pt => {
    pt.addEventListener('click', () => {
      gridPoints.forEach(p => p.classList.remove('ring-2', 'ring-white', 'scale-110'));
      pt.classList.add('ring-2', 'ring-white', 'scale-110');

      const rank = pt.getAttribute('data-rank');
      const dist = pt.getAttribute('data-dist');
      const company = pt.getAttribute('data-company') || 'Clínica Odonto Prime';

      if (infoEmpresa) infoEmpresa.textContent = company;
      if (infoRank) {
        infoRank.textContent = `#${rank} Lugar`;
        infoRank.className = rank <= '3' ? 'text-emerald-400 font-bold' : (rank <= '7' ? 'text-amber-400 font-bold' : 'text-rose-400 font-bold');
      }
      if (infoDist) infoDist.textContent = `${dist} km do centro`;
    });
  });
}

// --------------------------------------------------------------------------
// 6. Accordion do FAQ Inteligente
// --------------------------------------------------------------------------
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos
      faqItems.forEach(i => i.classList.remove('active'));

      // Se não estava ativo, abre
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --------------------------------------------------------------------------
// 7. Seletor de Planos & Botões de Compra
// --------------------------------------------------------------------------
function initPricingToggle() {
  const btnMonthly = document.getElementById('planBuyMonthly');
  const btnAnnual = document.getElementById('planBuyAnnual');
  const btnLifetime = document.getElementById('planBuyLifetime');

  if (btnMonthly) {
    btnMonthly.href = LEADMAPS_CONFIG.pricing.monthly.whatsappUrl;
  }
  if (btnAnnual) {
    btnAnnual.href = LEADMAPS_CONFIG.pricing.annual.whatsappUrl;
  }
  if (btnLifetime) {
    btnLifetime.href = LEADMAPS_CONFIG.pricing.lifetime.whatsappUrl;
  }
}
