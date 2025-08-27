import React from 'react';
import { SparklesIcon, DownloadIcon } from './Icons';

interface ResultDisplayProps {
  isLoading: boolean;
  resultImage: string | null;
  onImageClick: () => void;
}

const LoadingState: React.FC = () => (
  <div className="w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8">
    <svg className="animate-spin h-12 w-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-lg font-semibold">AI가 이미지를 생성하고 있습니다...</p>
    <p className="text-sm">잠시만 기다려 주세요. 최대 1분 정도 소요될 수 있습니다.</p>
  </div>
);

const InitialState: React.FC = () => (
  <div className="w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-8">
    <SparklesIcon className="w-16 h-16 text-gray-500 mb-4" />
    <p className="text-lg font-semibold">생성된 이미지가 여기에 표시됩니다.</p>
    <p className="text-sm">사진을 업로드하고 '가상 피팅 생성' 버튼을 눌러주세요.</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, resultImage, onImageClick }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'virtual-try-on-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (resultImage) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 group cursor-pointer"
        onClick={onImageClick}
        role="button"
        aria-label="결과 이미지 확대하기"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onImageClick(); }}
      >
        <img src={resultImage} alt="Generated result" className="w-full h-auto block rounded-2xl" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-semibold">크게 보기</span>
        </div>
        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 bg-gray-900/70 text-white rounded-full p-3 hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-purple-500 opacity-0 group-hover:opacity-100"
          aria-label="결과 이미지 다운로드"
        >
          <DownloadIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return <InitialState />;
};