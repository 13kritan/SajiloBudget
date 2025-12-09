export default function Button({
    children,
    onClick,
    className = "",      // for content/style overrides
    variant = "primary",  // primary | secondary | outline | gradient
    size = "md",          // sm | md | lg
    icon = null,
    disabled = false,
  }) {
    // Base button classes
    let baseClasses = `flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`;
  
    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
  
    // Variant classes
    const variantClasses = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
      outline: "border border-gray-500 hover:bg-gray-100 text-gray-800 dark:border-gray-400 dark:text-gray-200 dark:hover:bg-gray-800",
      gradient: "bg-gradient-to-tr from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white",
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </button>
    );
  }
  