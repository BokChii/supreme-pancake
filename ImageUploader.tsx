
import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  id: string;
  title: string;
  description: string;
  onImageUpload: (base64: string) => void;
  imagePreviewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  title,
  description,
  onImageUpload,
  imagePreviewUrl,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleClick = () => {
    inputRef.current?.click();
  };
  
  return (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-200">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div 
            className="w-full aspect-square bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-gray-800 transition-all duration-300 relative overflow-hidden group"
            onClick={handleClick}
        >
            <input
                ref={inputRef}
                type="file"
                id={id}
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
            />
            {imagePreviewUrl ? (
                <>
                    <img src={imagePreviewUrl} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold">이미지 변경</span>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">
                    <UploadIcon className="w-12 h-12 mx-auto mb-2"/>
                    <p className="font-semibold">클릭하여 이미지 업로드</p>
                </div>
            )}
        </div>
    </div>
  );
};
