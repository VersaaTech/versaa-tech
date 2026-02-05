// Centralized style constants for service pages
// Aligned with the Versaatech design system - Line-based design pattern

export const SERVICE_STYLES = {
  // Typography - using design system tokens
  gradientText: 'bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent',
  headingDisplay: 'font-bold font-display text-foreground',
  bodyText: 'text-muted-foreground',

  // Backgrounds
  gradientBg: 'bg-gradient-to-r from-blue-600 to-blue-800',
  pageBg: 'bg-background',
  sectionBgWhite: 'bg-card',
  sectionBgAlt: 'bg-background',

  // Line-based grid items (replacing card styles)
  gridItem: 'relative p-6 group border-b border-border',
  gridItemNoBorder: 'relative p-6 group',

  // Layout
  section: 'py-16',
  container: 'container mx-auto px-4',
  centerText: 'text-center',

  // Buttons
  button: 'px-6 py-3 text-base font-semibold transition-colors',
  buttonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800',
  buttonSecondary: 'bg-white text-blue-600 hover:bg-gray-100',

  // Icon containers - line-based design (no background)
  iconContainer: 'text-blue-600 transition-transform duration-300 group-hover:scale-110',
  iconContainerProcess: 'text-blue-600 transition-transform duration-300 group-hover:scale-110',

  // Hover effects for titles
  titleHover: 'transition-colors duration-300 group-hover:text-blue-600',
} as const
