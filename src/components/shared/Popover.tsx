import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  content: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end'; // new prop to control horizontal alignment
}

const Popover: React.FC<PopoverProps> = ({ content, className, align = 'center' }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<{
    left: number;
    top: number;
    transform: string;
  } | null>(null);

  // Close popover if clicked outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        (!popoverRef.current || !popoverRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Position popover in document.body to avoid clipping by overflow parents
  useEffect(() => {
    function updatePosition() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      let left: number;
      let transform: string;

      if (align === 'start') {
        left = rect.left + window.scrollX; // align left edge
        transform = 'translateX(0)';
      } else if (align === 'end') {
        left = rect.right + window.scrollX; // align right edge
        transform = 'translateX(-100%)';
      } else {
        // center
        left = rect.left + rect.width / 2 + window.scrollX;
        transform = 'translateX(-50%)';
      }

      const top = rect.bottom + window.scrollY; // position below trigger
      setPopoverStyle({ left, top, transform });
    }

    if (open) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, align]);

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

      {/* Render popover into body to avoid clipping */}
      {typeof document !== 'undefined' && popoverStyle
        ? createPortal(
            <div
              ref={popoverRef as React.RefObject<HTMLDivElement>}
              className={`z-50 w-max min-w-[180px] max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm text-gray-700 transition-all duration-150 ease-in-out ${
                open
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
              style={{
                position: 'absolute',
                left: popoverStyle.left,
                top: popoverStyle.top,
                transform: `${popoverStyle.transform}`,
                marginTop: 8,
              }}
              role="tooltip"
              aria-hidden={!open}
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

export default Popover;
