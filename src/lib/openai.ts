import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate note summary
export const generateNoteSummary = async (content: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert study assistant. Generate comprehensive summaries with key points, formulas, definitions, and exam tips.',
        },
        {
          role: 'user',
          content: `Please summarize the following content and provide:
1. A short summary (2-3 sentences)
2. Key points (5-10 bullet points)
3. Important formulas (if any)
4. Definitions of key terms
5. Exam tips

Content:
${content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

// Generate quiz questions
export const generateQuizQuestions = async (content: string, questionCount: number, types: string[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert quiz creator. Generate well-crafted questions with explanations.',
        },
        {
          role: 'user',
          content: `Create ${questionCount} quiz questions from the following content using these types: ${types.join(', ')}.

For each question, provide:
- The question
- Options (for multiple choice)
- Correct answer
- Explanation

Content:
${content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

// Generate flashcards
export const generateFlashcards = async (content: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in creating effective flashcards. Generate flashcards in JSON format.',
        },
        {
          role: 'user',
          content: `Create flashcards from the following content. Return a JSON array with objects containing 'front' and 'back' fields.

Content:
${content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

// AI Tutor chat
export const tutorChat = async (messages: Array<{ role: 'user' | 'assistant'; content: string }>) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable and patient tutor. Explain concepts clearly, provide examples, and answer follow-up questions. Use LaTeX for math equations wrapped in $$ markers.',
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

// Explain answer
export const explainAnswer = async (question: string, answer: string, explanation: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert tutor. Provide detailed explanations for quiz answers.',
        },
        {
          role: 'user',
          content: `Question: ${question}\nUser Answer: ${answer}\nProvide a detailed explanation of why this answer is correct/incorrect and what the correct approach should be.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};
