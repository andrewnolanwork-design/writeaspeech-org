import { apiGet, apiPost, apiPut, apiDelete } from './config';

export interface SpeechData {
  occasion: string;
  style: string;
  length: string;
  audience: string;
  key_points: string[];
  personal_stories: string[];
}

export interface Speech {
  id: string;
  userId?: string;
  title?: string;
  occasion: string;
  style: string;
  length: string;
  audience: string;
  key_points: string[];
  personal_stories: string[];
  content?: string;
  status: 'draft' | 'generating' | 'completed' | 'error';
  wordCount?: number;
  estimatedDuration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpeechGenerationResponse {
  message: string;
  speech: Speech;
}

export interface UserSpeechesResponse {
  speeches: Speech[];
}

// Generate a new speech
export async function generateSpeech(
  speechData: SpeechData,
  userId?: string
): Promise<SpeechGenerationResponse> {
  return apiPost<SpeechGenerationResponse>('/speech/generate', {
    ...speechData,
    userId,
  });
}

// Get all speeches for a user
export async function getUserSpeeches(userId: string): Promise<UserSpeechesResponse> {
  return apiGet<UserSpeechesResponse>(`/speech/user/${userId}`);
}

// Get a specific speech by ID
export async function getSpeech(speechId: string): Promise<{ speech: Speech }> {
  return apiGet<{ speech: Speech }>(`/speech/${speechId}`);
}

// Update a speech
export async function updateSpeech(
  speechId: string,
  updates: Partial<Speech>
): Promise<{ message: string; speech: Speech }> {
  return apiPut<{ message: string; speech: Speech }>(`/speech/${speechId}`, updates);
}

// Delete a speech
export async function deleteSpeech(speechId: string): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/speech/${speechId}`);
}

// Calculate estimated duration from word count
export function calculateDuration(wordCount: number): string {
  const wordsPerMinute = 150; // Average speaking pace
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes === 1) return '1 minute';
  if (minutes <= 2) return '1-2 minutes';
  if (minutes <= 3) return '2-3 minutes';
  if (minutes <= 5) return '3-5 minutes';
  if (minutes <= 7) return '5-7 minutes';
  return `${minutes} minutes`;
}

// Extract title from speech content
export function extractTitleFromContent(content: string, occasion: string): string {
  // Try to extract a meaningful title from the first few words
  const firstSentence = content.split('.')[0] || content.split('\n')[0];
  const words = firstSentence.trim().split(' ').slice(0, 8);
  
  if (words.length < 3) {
    return `${occasion} Speech`;
  }
  
  return words.join(' ').replace(/[^\w\s]/g, '').trim() || `${occasion} Speech`;
}
