// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base escura
        'dark-primary': '#0A0A0A',      // Fundo
        'dark-secondary': '#121212',   // Container
        'dark-accent': '#1E1E1E',      // Bordas
        // Cores vibrantes (destaque financeiro)
        'primary': '#7C3AED',          // Roxo intenso (confiança)
        'primary-hover': '#6D28D9',
        'profit': '#10B981',           // Verde (lucro)
        'loss': '#EF4444',             // Vermelho (perda)
        'accent': '#3B82F6',           // Azul (ações)
        // Texto
        'text-main': '#F9FAFB',
        'text-muted': '#D1D5DB',
      },
    },
  },
}