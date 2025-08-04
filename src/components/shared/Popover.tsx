import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface PopoverProps {
  content: React.ReactNode;
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({ content, className }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Close popover if clicked outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div
      className={`relative inline-block ${className || ''}`.trim()}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      ref={triggerRef as React.RefObject<HTMLDivElement>}
    >
      <span
        aria-label="Info"
        className="flex items-center justify-center rounded-full text-gray-900 hover:text-gray-500 transition cursor-pointer"
        role="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon icon="solar:question-circle-linear" width={18} height={18} />
      </span>
      <div
        ref={popoverRef as React.RefObject<HTMLDivElement>}
        className={`absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-max min-w-[180px] max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm text-gray-700 transition-all duration-600 ease-in-out ${
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ top: '100%' }}
        role="tooltip"
        aria-hidden={!open}
      >
        {content}
      </div>
    </div>
  );
};

export default Popover;
