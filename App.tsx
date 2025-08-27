import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { generateVirtualTryOnImage } from './services/geminiService';
import { SparklesIcon } from './components/Icons';
import { ImageModal } from './components/ImageModal';

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleGeneration = useCallback(async () => {
    if (!personImage || !clothingImage) {
      setError('인물과 의류 사진을 모두 업로드해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImageBase64 = await generateVirtualTryOnImage(personImage, clothingImage);
      setResultImage(`data:image/png;base64,${generatedImageBase64}`);
    } catch (err) {
      console.error(err);
      setError('이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);
  
  const isButtonDisabled = !personImage || !clothingImage || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="flex flex-col items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader
              id="person-uploader"
              title="인물 사진"
              onImageUpload={setPersonImage}
              imagePreviewUrl={personImage}
              description="정면을 바라보는 선명한 인물 사진을 업로드하세요."
            />
            <ImageUploader
              id="clothing-uploader"
              title="의류 사진"
              onImageUpload={setClothingImage}
              imagePreviewUrl={clothingImage}
              description="가상으로 입어볼 옷 사진을 업로드하세요."
            />
          </div>

          <button
            onClick={handleGeneration}
            disabled={isButtonDisabled}
            className={`
              relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white
              transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600
              rounded-xl shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/50
              disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                생성 중...
              </>
            ) : (
              <>
                <SparklesIcon className="w-6 h-6 mr-2" />
                가상 피팅 생성
              </>
            )}
          </button>
          
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          
          <div className="w-full max-w-2xl mt-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">결과</h2>
            <div className="flex justify-center items-center">
                <ResultDisplay
                    isLoading={isLoading}
                    resultImage={resultImage}
                    onImageClick={() => resultImage && setIsModalOpen(true)}
                />
            </div>
          </div>
        </main>
      </div>
      <ImageModal imageUrl={isModalOpen ? resultImage : null} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
