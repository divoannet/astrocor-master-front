import { toaster } from '@/components/ui/toaster';
import { useState } from 'react';

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (textToCopy: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      const shortText = textToCopy.length > 40 ? `${textToCopy.slice(0,40)}...` : textToCopy;

      toaster.create({
        description: `Текст «${shortText}» скопирован`,
      })
      return true;
    } catch (error) {
      toaster.create({
        description: `Ошибка копирования`,
        type: 'error'
      })
      return false;
    }
  };

  return { copyToClipboard, isCopied };
};
