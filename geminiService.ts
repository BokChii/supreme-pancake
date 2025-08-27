
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = ai.models.get({ model: 'gemini-2.5-flash-image-preview' });

const getBase64 = (dataUrl: string): string => dataUrl.split(',')[1];

export const generateVirtualTryOnImage = async (
  personImage: string,
  clothingImage: string
): Promise<string> => {
  const personImageBase64 = getBase64(personImage);
  const clothingImageBase64 = getBase64(clothingImage);

  const personImagePart = {
    inlineData: {
      data: personImageBase64,
      mimeType: 'image/jpeg', // Assuming jpeg, but could be dynamic
    },
  };

  const clothingImagePart = {
    inlineData: {
      data: clothingImageBase64,
      mimeType: 'image/jpeg', // Assuming jpeg
    },
  };

  const textPart = {
    text: "첫 번째 이미지의 인물이 두 번째 이미지의 옷을 입고 있는 모습을 자연스럽게 생성해줘. 인물의 얼굴과 배경은 최대한 유지해줘.",
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [personImagePart, clothingImagePart, textPart],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });
  
  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  throw new Error("AI가 이미지를 생성하지 못했습니다.");
};
