/**
 * LeadMaps Pro Enterprise — Configuração Central da Plataforma
 * Gerencia todos os links operacionais, contatos oficiais, planos e integrações.
 */
const LEADMAPS_CONFIG = {
  brand: {
    name: "LeadMaps Pro Enterprise",
    tagline: "Inteligência Comercial & Prospecção no Google Maps",
    supportEmail: "ricardo@leadmapspro.com.br",
    version: "v2.6 Enterprise"
  },
  links: {
    // Aponta por padrão para a ferramenta em Documentos ou domínio web oficial
    webApp: "../leadmaps-pro/index.html",
    login: "../leadmaps-pro/index.html#login",
    chromeExtension: "../leadmaps-pro/extensao-chrome/export.html",
    docs: "#fluxo",
    pricing: "#planos"
  },
  whatsapp: {
    number: "5511970558412",
    display: "(11) 97055-8412",
    defaultMessage: "Olá Ricardo! Quero conhecer mais e adquirir minha licença do LeadMaps Pro Enterprise!",
    hours: {
      weekdays: "Seg a Sex, 8h às 20h",
      weekends: "Sábado, 9h às 16h",
      // Horários em formato 24h para cálculo de status em tempo real
      openHourWeek: 8,
      closeHourWeek: 20,
      openHourSat: 9,
      closeHourSat: 16
    }
  },
  pricing: {
    monthly: {
      name: "Mensal Pro",
      price: 97,
      period: "/mês",
      billingText: "Cobrado mensalmente • Cancele quando quiser",
      whatsappUrl: "https://wa.me/5511970558412?text=Ol%C3%A1%20Ricardo!%20Quero%20ativar%20o%20Plano%20Mensal%20Pro%20(R$%2097/m%C3%AAs)%20do%20LeadMaps%20Pro!"
    },
    annual: {
      name: "Anual VIP",
      price: 497,
      period: "/ano",
      monthlyEquivalent: "Apenas R$ 41,41/mês",
      badge: "MAIS ESCOLHIDO • ECONOMIA DE 57%",
      whatsappUrl: "https://wa.me/5511970558412?text=Ol%C3%A1%20Ricardo!%20Quero%20assinar%20o%20Plano%20Anual%20VIP%20(R$%20497/ano)%20com%20desconto%20do%20LeadMaps%20Pro!"
    },
    lifetime: {
      name: "Vitalício Master",
      price: 997,
      period: "taxa única",
      badge: "ACESSO VITALÍCIO • ATIVO DEFINITIVO",
      billingText: "Sem mensalidades para sempre • Acesso vitalício",
      whatsappUrl: "https://wa.me/5511970558412?text=Ol%C3%A1%20Ricardo!%20Quero%20garantir%20o%20Acesso%20Vital%C3%ADcio%20Master%20(R$%20997)%20do%20LeadMaps%20Pro!"
    },
    pixKey: "ricardo@leadmapspro.com.br"
  }
};
