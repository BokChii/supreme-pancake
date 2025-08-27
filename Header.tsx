
import React from 'react';
import { SparklesIcon } from './Icons';

export const Header: React.FC = () => (
  <header className="text-center py-8 md:py-12">
    <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full mb-4">
      <SparklesIcon className="w-8 h-8 text-white"/>
    </div>
    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
      AI 가상 피팅룸
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
      인물 사진과 의류 사진을 업로드하여 AI가 옷을 입은 모습을 즉시 확인해보세요.
    </p>
  </header>
);
