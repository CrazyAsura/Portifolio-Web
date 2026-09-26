'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getMessages, type Locale } from '@/i18n/messages';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  locale: Locale;
}

export default function ImageZoomModal({
  isOpen,
  onClose,
  src,
  alt,
  title,
  subtitle,
  locale,
}: ImageZoomModalProps) {
  const text = getMessages(locale).imageModal;
  const [isMagnified, setIsMagnified] = useState(false);

  const handleClose = useCallback(() => {
    setIsMagnified(false);
    onClose();
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title || text.dialog}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl md:p-8"
        >
          {/* Top Actions Bar */}
          <div
            className="absolute top-6 right-6 z-20 flex items-center gap-3"
            onClick={e => e.stopPropagation()}
          >
            <motion.button
              type="button"
              onClick={() => setIsMagnified(prev => !prev)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={isMagnified ? text.zoomOut : text.zoomIn}
              className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-primary hover:bg-black/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isMagnified ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleClose}
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              aria-label={text.close}
              className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-white/60 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={18} />
            </motion.button>
          </div>

          {/* Modal Content Container */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{
              scale: isMagnified ? 1.25 : 1,
              opacity: 1,
              y: 0,
            }}
            exit={{ scale: 0.88, opacity: 0, y: 15 }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 28,
              bounce: 0.12,
            }}
            onClick={e => {
              e.stopPropagation();
              setIsMagnified(prev => !prev);
            }}
            className={`relative max-h-[85vh] max-w-[92vw] overflow-hidden rounded-[24px] border border-white/15 bg-card/90 shadow-2xl transition-all duration-300 md:max-w-[1100px] ${
              isMagnified ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
          >
            <div className="relative aspect-[1.5] w-[88vw] max-w-[1020px] max-h-[75vh]">
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 1200px) 92vw, 1100px"
                className="object-contain"
              />
            </div>

            {(title || subtitle) && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-6 py-4 text-white">
                <div>
                  {title && <p className="text-base font-medium tracking-tight md:text-lg">{title}</p>}
                  {subtitle && <p className="font-mono text-[11px] text-white/70 tracking-wider">{subtitle}</p>}
                </div>
                <span className="hidden font-mono text-[10px] text-white/50 tracking-widest sm:block">
                  {text.escape}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
