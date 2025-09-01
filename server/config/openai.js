const { OpenAI } = require('openai');

// Initialize OpenAI client
let openai;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  console.warn('OpenAI API key not configured - using mock AI responses');
  
  // Create a mock OpenAI client for development
  openai = {
    chat: {
      completions: {
        create: async ({ messages, model, max_tokens, temperature }) => {
          console.log('Mock OpenAI call:', { messages, model, max_tokens, temperature });
          
          // Extract speech parameters from the last message
          const userMessage = messages[messages.length - 1].content;
          
          // Generate a mock speech based on the prompt
          const mockSpeech = generateMockSpeechFromPrompt(userMessage);
          
          return {
            id: 'chatcmpl-mock-' + Date.now(),
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: model || 'gpt-3.5-turbo',
            choices: [{
              index: 0,
              message: {
                role: 'assistant',
                content: mockSpeech
              },
              finish_reason: 'stop'
            }],
            usage: {
              prompt_tokens: 150,
              completion_tokens: 400,
              total_tokens: 550
            }
          };
        }
      }
    }
  };
}

/**
 * Generate a speech using OpenAI
 */
async function generateSpeech({
  occasion,
  style,
  length,
  audience,
  key_points = [],
  personal_stories = [],
  additionalContext = ''
}) {
  try {
    const prompt = createSpeechPrompt({
      occasion,
      style,
      length,
      audience,
      key_points,
      personal_stories,
      additionalContext
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional speechwriter who creates personalized, engaging speeches for various occasions. Your speeches should be well-structured, authentic, and tailored to the speaker\'s style and audience.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI speech generation error:', error);
    throw error;
  }
}

/**
 * Create a detailed prompt for speech generation
 */
function createSpeechPrompt({
  occasion,
  style,
  length,
  audience,
  key_points,
  personal_stories,
  additionalContext
}) {
  let prompt = `Please write a ${style.toLowerCase()} ${occasion.toLowerCase()} speech that is ${length} long.

**Audience:** ${audience}

**Style Guidelines:**
- ${getStyleGuidelines(style)}

**Speech Length:** ${length}
- ${getLengthGuidelines(length)}

`;

  if (key_points.length > 0) {
    prompt += `**Key Points to Include:**
${key_points.map(point => `- ${point}`).join('\n')}

`;
  }

  if (personal_stories.length > 0) {
    prompt += `**Personal Stories to Incorporate:**
${personal_stories.map(story => `- ${story}`).join('\n')}

`;
  }

  if (additionalContext) {
    prompt += `**Additional Context:**
${additionalContext}

`;
  }

  prompt += `**Requirements:**
1. Create a well-structured speech with clear opening, body, and conclusion
2. Make it personal and authentic to the speaker
3. Include appropriate transitions between sections
4. End with a memorable and impactful conclusion
5. Ensure the tone matches the ${style.toLowerCase()} style throughout
6. Target approximately ${getWordCount(length)} words

Please write the complete speech now:`;

  return prompt;
}

/**
 * Get style-specific guidelines
 */
function getStyleGuidelines(style) {
  const guidelines = {
    'Heartfelt': 'Sincere, emotional, and touching. Use personal anecdotes and speak from the heart.',
    'Witty': 'Funny, entertaining, and light-hearted. Include humor and amusing observations.',
    'Formal': 'Professional, polished, and respectful. Maintain dignity and proper etiquette.',
    'Inspiring': 'Motivational, uplifting, and encouraging. Focus on positive messages and future aspirations.'
  };
  return guidelines[style] || guidelines['Heartfelt'];
}

/**
 * Get length-specific guidelines
 */
function getLengthGuidelines(length) {
  const guidelines = {
    '2-3 minutes': 'Keep it concise and impactful. Focus on 1-2 main points.',
    '3-5 minutes': 'Perfect length for most occasions. Include 2-3 main points with supporting details.',
    '5-7 minutes': 'More detailed and comprehensive. Include 3-4 main points with stories and examples.'
  };
  return guidelines[length] || guidelines['3-5 minutes'];
}

/**
 * Get target word count for length
 */
function getWordCount(length) {
  const wordCounts = {
    '2-3 minutes': '300-450',
    '3-5 minutes': '450-750',
    '5-7 minutes': '750-1050'
  };
  return wordCounts[length] || wordCounts['3-5 minutes'];
}

/**
 * Generate a mock speech from a prompt (for development)
 */
function generateMockSpeechFromPrompt(prompt) {
  return `Good evening, everyone!

Thank you all for being here today. This is truly a special occasion, and I'm honored to speak to you all.

I want to share a few thoughts that come from the heart. We're gathered here not just to celebrate, but to recognize something truly meaningful.

Let me tell you a story that perfectly captures the essence of this moment...

[This is a mock speech generated for development purposes. In production, this would be replaced with actual AI-generated content based on your specific requirements.]

As we look to the future, I'm filled with optimism and excitement for what lies ahead.

Thank you for your attention, and let's continue to celebrate this wonderful occasion together!`;
}

module.exports = {
  openai,
  generateSpeech,
  createSpeechPrompt
};
