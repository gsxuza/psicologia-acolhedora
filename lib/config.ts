// Dados reais extraídos do cartão de visita/logo fornecidos.
// Centralizados aqui para não espalhar strings mágicas pelos componentes.

export const BRAND = {
  name: "Gabriela Silva",
  role: "Psicóloga Clínica",
  crp: "CRP 06/175907",
  instagramHandle: "@gabrielasilvarm",
  instagramUrl: "https://instagram.com/gabrielasilvarm",
  whatsappNumber: "5511968743704",
  whatsappDisplay: "(11) 96874-3704",
  email: "psicologagabrielasilva2@gmail.com",
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${BRAND.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// E-mail que identifica a conta da psicóloga (administradora) no login.
// Qualquer outro e-mail autenticado é tratado como paciente.
export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || BRAND.email;
