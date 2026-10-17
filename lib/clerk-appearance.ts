// Tema do Clerk alinhado à paleta da marca (sage/sand/ink), pra substituir o
// visual genérico padrão do widget. Os componentes de auth (SignIn/SignUp)
// já são renderizados dentro do card próprio de `app/(auth)/layout.tsx`,
// então aqui a "card" do Clerk fica transparente e sem borda/sombra própria.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#217F73",
    colorText: "#24302E",
    colorTextSecondary: "#2E3A38",
    colorBackground: "transparent",
    colorInputBackground: "#FFFFFF",
    colorInputText: "#24302E",
    colorDanger: "#A8535C",
    colorNeutral: "#2E3A38",
    borderRadius: "0.85rem",
    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    fontSize: "0.875rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "w-full bg-transparent shadow-none p-0 gap-5",
    header: "gap-1",
    headerTitle: "font-display text-lg font-semibold text-ink-800",
    headerSubtitle: "text-sm text-ink-700/55",
    socialButtonsBlockButton:
      "border border-sand-200 hover:bg-sand-50 text-ink-800 font-medium rounded-xl transition-colors",
    socialButtonsBlockButtonText: "font-medium text-sm text-ink-800",
    dividerLine: "bg-sand-200",
    dividerText: "text-ink-700/40 text-xs",
    formFieldLabel: "text-ink-700/70 text-sm font-medium",
    formFieldInput:
      "rounded-xl border-sand-200 text-ink-800 focus:border-sage-400 focus:ring-sage-200",
    formFieldInputShowPasswordButton: "text-ink-700/40 hover:text-ink-700",
    formFieldAction: "text-sage-600 hover:text-sage-700 text-xs font-medium",
    formButtonPrimary:
      "bg-sage-600 hover:bg-sage-700 text-sm normal-case rounded-full py-2.5 shadow-none transition-colors",
    footer: "bg-transparent",
    footerAction: "text-sm",
    footerActionText: "text-ink-700/60",
    footerActionLink: "text-sage-600 hover:text-sage-700 font-medium",
    identityPreviewEditButton: "text-sage-600 hover:text-sage-700",
    otpCodeFieldInput: "border-sand-200 text-ink-800 focus:border-sage-400",
    alertText: "text-sm",
    formResendCodeLink: "text-sage-600 hover:text-sage-700 font-medium",
  },
};
