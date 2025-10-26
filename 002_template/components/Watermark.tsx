'use client';

import Image from 'next/image';

export function Watermark() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="group bg-neutral-900 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border border-white/5 rounded-xl p-1 px-2 h-10 flex items-center gap-0 shadow-strong overflow-hidden">
        <a
          href="https://btytechnology.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/btyfavi.svg"
            alt="BTY Technology"
            width={20}
            height={20}
            className="h-5 w-5 mix-blend-screen"
          />
          <span className="text-[11px] font-medium text-neutral-300 mr-2">
            Made by BTY Technology
          </span>
        </a>
      </div>
    </div>
  );
}
