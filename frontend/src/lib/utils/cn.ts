import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-heading1',
        'text-heading2',
        'text-heading3',
        'text-heading4',
        'text-heading5',
        'text-heading6',
        'text-subtitle',
        'text-body',
        'text-paragraph',
        'text-span',
      ],
      'text-color': ['text-text-default', 'text-faded', 'text-cancel-btn'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
