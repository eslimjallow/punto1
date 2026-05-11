import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function getTranslationExercise(lessonType: string = 'general', topic: string = 'daily life') {
  const contexts = ['travel', 'food', 'work', 'hobbies', 'family', 'shopping', 'technology', 'nature', 'health', 'education'];
  const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
  
  const prompt = `Generate a unique, natural-sounding sentence in Spanish for an English learner to translate. 
  The lesson type is: ${lessonType}.
  The specific theme/topic requested was: ${topic}.
  However, use this hidden context to ensure variety: ${randomContext}.
  Make sure the sentence is appropriate for a language learning app.
  Return a JSON object with:
  - sentence: 'Spanish sentence'
  - expectedTranslation: 'Correct English translation'
  - hint: 'A small hint'`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: { type: Type.STRING },
            expectedTranslation: { type: Type.STRING },
            hint: { type: Type.STRING },
          },
          required: ["sentence", "expectedTranslation", "hint"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error generating exercise:", error);
    return {
      sentence: "Me gusta practicar inglés con esta aplicación.",
      expectedTranslation: "I like practicing English with this application.",
      hint: "Think about the verb 'practicar' (to practice)."
    };
  }
}

export async function evaluateSpeech(expectedText: string, transcribedText: string) {
  const prompt = `The user is practicing English pronunciation.
  Expected sentence: "${expectedText}"
  What the user said (transcribed): "${transcribedText}"
  
  Please evaluate the pronunciation accuracy and if they said the right words.
  Return a JSON object with:
  - isCorrect: boolean (true if highly similar or correct)
  - feedback: 'A short, helpful feedback message in English'
  - score: number (percentage 0-100)
  - accuracy: number (0-100)`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
            score: { type: Type.NUMBER },
            accuracy: { type: Type.NUMBER },
          },
          required: ["isCorrect", "feedback", "score", "accuracy"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error evaluating speech:", error);
    return {
      isCorrect: true,
      feedback: "Great effort! Communication is key.",
      score: 85,
      accuracy: 80
    };
  }
}

export async function checkTranslation(original: string, userTranslation: string, expected: string) {
  const prompt = `The user is translating from Spanish to English.
  Original (Spanish): "${original}"
  Expected (English): "${expected}"
  User input: "${userTranslation}"
  
  Please evaluate if the user's translation is correct, even if there are slight variations in wording.
  Return a JSON object with:
  - isCorrect: boolean
  - feedback: 'A encouraging message explaining why it's correct or incorrect'
  - score: number (0 to 100)`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
            score: { type: Type.NUMBER },
          },
          required: ["isCorrect", "feedback", "score"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error checking translation:", error);
    return {
      isCorrect: userTranslation.toLowerCase().trim() === expected.toLowerCase().trim(),
      feedback: "Verification failed, but checking exact match.",
      score: userTranslation.toLowerCase().trim() === expected.toLowerCase().trim() ? 100 : 0
    };
  }
}
