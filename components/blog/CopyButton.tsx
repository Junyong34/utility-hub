'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

/**
 * 코드 블록 복사 버튼 컴포넌트
 * rehype-pretty-code와 함께 사용됩니다
 */
export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200"
      aria-label={copied ? 'Copied!' : 'Copy code'}
      type="button"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      )}
    </button>
  );
}
