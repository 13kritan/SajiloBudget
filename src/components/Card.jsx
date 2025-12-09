export default function Card({
    title,
    icon,
    footer,
    onClick,
    children,
    className = "",
    titleCenter = false,
    cardClass = "bg-white dark:bg-gray-900", // default but can be fully overridden
    footerClass = "",
    titleClass = "",
  }) {
    return (
      <div
        onClick={onClick}
        className={`
          w-full p-4 rounded-2xl shadow-sm border
          border-gray-200 dark:border-gray-700
          text-gray-800 dark:text-gray-200
          transition-all duration-300 hover:shadow-md
          ${onClick ? "cursor-pointer hover:scale-[1.01]" : ""}
          ${cardClass}   /* external bg always applied last */
        `}
      >
        {/* Header */}
        {(title || icon) && (
          <div
            className={`flex items-center gap-2 mb-3 ${
              titleCenter ? "justify-center text-center" : ""
            }`}
          >
            {icon && <span className="text-xl">{icon}</span>}
            {title && (
              <h2 className={`text-lg font-semibold ${titleClass}`}>
                {title}
              </h2>
            )}
          </div>
        )}
  
        {/* Content */}
        <div className={className}>{children}</div>
  
        {/* Footer */}
        {footer && (
          <div
            className={`mt-3 pt-3 border-t border-gray-300 dark:border-gray-700 text-xs ${footerClass}`}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
  