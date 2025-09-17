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
      model: process.env.OPENAI_MODEL || 'gpt-4', // Upgraded to GPT-4 for better quality
      messages: [
        {
          role: 'system',
          content: `You are an expert speechwriter who writes like real people talk - conversational, authentic, and deeply human. 

CRITICAL RULES:
- Write as if the speaker is having an intimate conversation with close friends
- Use contractions naturally (I'm, don't, we'll, that's)
- Include emotional pauses, natural hesitations, and conversational connectors
- NEVER use AI-sounding phrases like "In conclusion," "Furthermore," "Moreover," "Additionally"
- Start with genuine, personal openings, not formal announcements
- Use specific, vivid details that paint pictures in listeners' minds
- Include genuine emotions and vulnerability when appropriate
- End with heartfelt, memorable moments, not summary statements
- Make every sentence sound like something a real person would actually say out loud
- Include natural speech patterns like "You know what I mean?" or "And here's the thing..."
- Use storytelling techniques with dialogue, sensory details, and emotional peaks`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2500, // Increased for longer, more detailed speeches
      temperature: 0.8, // Slightly higher for more creative, human-like output
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
  const humanWritingTechniques = getHumanWritingTechniques(style, occasion);
  const emotionalTone = getEmotionalTone(style, occasion);
  const conversationalElements = getConversationalElements(style);

  let prompt = `Write a deeply human, conversational ${style.toLowerCase()} speech for a ${occasion.toLowerCase()}.

🎯 **THE SPEAKER'S VOICE:**
This person is speaking to ${audience}. They want to sound like themselves - genuine, real, and connected to everyone in the room.

🎨 **STYLE & EMOTION:**
${getAdvancedStyleGuidelines(style)}

⏱️ **PACING & LENGTH:**
Target ${getWordCount(length)} words (${length} speaking time).
${getAdvancedLengthGuidelines(length)}

`;

  if (personal_stories.length > 0) {
    prompt += `💝 **PERSONAL STORIES TO WEAVE IN:**
${personal_stories.map((story, index) => `${index + 1}. ${story} 
   → Transform this into vivid storytelling with dialogue, emotions, and sensory details`).join('\n')}

`;
  }

  if (key_points.length > 0) {
    prompt += `🎯 **KEY MESSAGES (weave naturally into stories, don't list):**
${key_points.map(point => `• ${point}`).join('\n')}

`;
  }

  if (additionalContext) {
    prompt += `📝 **ADDITIONAL CONTEXT:**
${additionalContext}

`;
  }

  prompt += `🎪 **HUMAN WRITING TECHNIQUES TO USE:**
${humanWritingTechniques}

💬 **CONVERSATIONAL ELEMENTS:**
${conversationalElements}

🎭 **EMOTIONAL JOURNEY:**
${emotionalTone}

✨ **STRUCTURE REQUIREMENTS:**
1. **Opening:** Start with a moment, feeling, or observation - NOT an announcement
2. **Body:** Weave stories and messages together naturally, like you're talking to friends
3. **Closing:** End with a genuine emotion or call to action that feels inevitable

🚫 **ABSOLUTELY AVOID:**
- Formal speech language ("Distinguished guests," "In conclusion")
- Listing points mechanically
- Generic phrases that could apply to anyone
- Stiff transitions between sections
- Summary endings that repeat what was just said

Write the complete speech now, making it sound like a real person talking from the heart:`;

  return prompt;
}

/**
 * Get advanced style-specific guidelines for human-like writing
 */
function getAdvancedStyleGuidelines(style) {
  const guidelines = {
    'Heartfelt': `Write with genuine vulnerability and emotion. Use pauses like "And you know what?" or "Here's what I realized..." Share feelings honestly. Include moments where your voice might crack or you might tear up. Use intimate language like "I've got to tell you something..."`,
    
    'Witty': `Be conversationally funny - like you're the entertaining friend at dinner. Use timing with phrases like "But wait, it gets better..." Include self-deprecating humor. Use unexpected observations. Build to punchlines naturally. Include laughter cues like "I know, right?"`,
    
    'Formal': `Professional but warm and human. Use respectful language that still sounds conversational. Include thoughtful pauses. Show respect through specific acknowledgments. Use phrases like "I'm truly honored..." but keep it genuine, not stiff.`,
    
    'Inspiring': `Build energy naturally through storytelling. Use rising action with phrases like "But then something amazing happened..." Paint vivid pictures of possibility. Include calls to action that feel like invitations. Use "we" language to build connection.`
  };
  return guidelines[style] || guidelines['Heartfelt'];
}

/**
 * Get human writing techniques for specific styles and occasions
 */
function getHumanWritingTechniques(style, occasion) {
  const techniques = {
    'Wedding': [
      'Use sensory details about the couple (how they look at each other, inside jokes)',
      'Include dialogue from actual conversations',
      'Reference specific moments that made you realize their love was special',
      'Use "I remember thinking..." or "I knew right then..."'
    ],
    'Birthday': [
      'Share specific quirks or habits that make this person unique',
      'Include funny stories with actual dialogue',
      'Reference how they have impacted your life personally',
      'Use age-appropriate humor that celebrates, not roasts'
    ],
    'Retirement': [
      'Share specific work moments that show their character',
      'Include how they mentored or helped others',
      'Reference their legacy through specific examples',
      'Connect their work values to their personal qualities'
    ],
    'Business Event': [
      'Use specific project examples or achievements',
      'Include how challenges were overcome together',
      'Reference the human side of professional relationships',
      'Connect business success to personal values'
    ]
  };
  
  return (techniques[occasion] || techniques['Business Event']).join('\n- ');
}

/**
 * Get conversational elements for different styles
 */
function getConversationalElements(style) {
  const elements = {
    'Heartfelt': [
      'Use natural pauses: "And here is the thing..."',
      'Include vulnerable admissions: "I will be honest with you..."',
      'Add emotional connectors: "You know what gets me?"',
      'Use inclusive language: "We all know that feeling when..."'
    ],
    'Witty': [
      'Build anticipation: "So picture this..."',
      'Use timing devices: "Now, I should mention..."',
      'Include audience acknowledgment: "You are laughing, but..."',
      'Add playful asides: "Do not tell them I said this, but..."'
    ],
    'Formal': [
      'Use respectful transitions: "What strikes me most is..."',
      'Include thoughtful observations: "I have come to realize..."',
      'Add appreciative language: "What I admire about..."',
      'Use unifying phrases: "We are all here because..."'
    ],
    'Inspiring': [
      'Build momentum: "Here is what is possible..."',
      'Use collective vision: "Imagine if we all..."',
      'Include action phrases: "Starting today, we can..."',
      'Add energy builders: "And that is just the beginning..."'
    ]
  };
  
  return (elements[style] || elements['Heartfelt']).join('\n- ');
}

/**
 * Get emotional tone guidance for style and occasion
 */
function getEmotionalTone(style, occasion) {
  const tones = {
    'Wedding_Heartfelt': 'Start with love and gratitude, build through shared memories, peak at the couple future, end with celebration and blessing',
    'Birthday_Witty': 'Open with playful teasing, build through funny stories, celebrate their uniqueness, end with genuine appreciation',
    'Retirement_Inspiring': 'Begin with respect and accomplishment, journey through their impact, celebrate their legacy, end with excitement for their future',
    'Business_Formal': 'Start with professional respect, build through shared achievements, acknowledge challenges overcome, end with future optimism'
  };
  
  const key = `${occasion}_${style}`;
  return tones[key] || 'Build emotional connection through authentic storytelling, peak at the most meaningful moment, end with genuine feeling';
}

/**
 * Get legacy style guidelines (keeping for backward compatibility)
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
 * Get advanced length-specific guidelines for human pacing
 */
function getAdvancedLengthGuidelines(length) {
  const guidelines = {
    '2-3 minutes': 'Quick and punchy - one powerful story with a clear emotional peak. Think elevator conversation with a best friend. Build to one perfect moment.',
    '3-5 minutes': 'Perfect for storytelling - open with connection, build through one main story with details, end with meaningful impact. Like sharing your favorite memory.',
    '5-7 minutes': 'Room for a journey - multiple connected stories or one deep story with layers. Include dialogue, build emotional investment, create a satisfying arc.'
  };
  return guidelines[length] || guidelines['3-5 minutes'];
}

/**
 * Get legacy length guidelines (keeping for backward compatibility)
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

Thank you all for being here today. This is truly a special occasion, and I am honored to speak to you all.

I want to share a few thoughts that come from the heart. We are gathered here not just to celebrate, but to recognize something truly meaningful.

Let me tell you a story that perfectly captures the essence of this moment...

[This is a mock speech generated for development purposes. In production, this would be replaced with actual AI-generated content based on your specific requirements.]

As we look to the future, I am filled with optimism and excitement for what lies ahead.

Thank you for your attention, and let us continue to celebrate this wonderful occasion together!`;
}

module.exports = {
  openai,
  generateSpeech,
  createSpeechPrompt
};
