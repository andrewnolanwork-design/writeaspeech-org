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
 * Generate a realistic mock speech from a prompt (for development)
 */
function generateMockSpeechFromPrompt(prompt) {
  // Extract speech parameters from the prompt
  const occasionMatch = prompt.match(/occasion.*?:\s*([^\n]+)/i);
  const styleMatch = prompt.match(/style.*?:\s*([^\n]+)/i);
  const keyPointsMatch = prompt.match(/key points.*?:\s*(.*?)(?=personal stories|$)/si);
  const storiesMatch = prompt.match(/personal stories.*?:\s*(.*?)(?=\n\n|$)/si);
  
  const occasion = occasionMatch ? occasionMatch[1].trim() : 'Special Event';
  const style = styleMatch ? styleMatch[1].trim() : 'Heartfelt';
  const keyPoints = keyPointsMatch ? keyPointsMatch[1].split('\n').filter(p => p.trim()) : [];
  const stories = storiesMatch ? storiesMatch[1].split('\n').filter(s => s.trim()) : [];
  
  // Use the enhanced mock speech generator
  return generateEnhancedMockSpeech({ 
    occasion, 
    style, 
    key_points: keyPoints, 
    personal_stories: stories 
  });
}

/**
 * Enhanced mock speech generator with realistic content
 */
function generateEnhancedMockSpeech({ occasion, style, key_points = [], personal_stories = [] }) {
  let speech = "";
  
  // Style-specific openings
  const openings = {
    'Heartfelt': {
      'Wedding': "Good evening, everyone. You know, when I think about love, I think about the kind of connection that makes you believe in magic again...",
      'Birthday': "Looking around this room tonight, I'm reminded of how one person can touch so many lives...",
      'Retirement': "Thirty-five years. That's not just a number—it's a lifetime of dedication, friendship, and moments that shaped all of us...",
      'Business Event': "I've been thinking about what it means to make a real difference, and that brings me to why we're here tonight...",
      'Special Event': "There are moments in life that remind us what truly matters, and tonight is one of those moments..."
    },
    'Witty': {
      'Wedding': "So here we are, gathered to witness two people promise to put up with each other's weird habits for the rest of their lives...",
      'Birthday': "They say age is just a number. Well, tonight that number is getting pretty impressive...",
      'Retirement': "After decades of pretending to work while actually planning your retirement, the day has finally come...",
      'Business Event': "I was going to start with a joke about our quarterly numbers, but then I realized our quarterly numbers ARE the joke...",
      'Special Event': "I've been asked to say a few words, which is dangerous because I have a lot of words and very little filter..."
    },
    'Formal': {
      'Wedding': "Distinguished guests, family, and friends, we gather today to celebrate the union of two remarkable individuals...",
      'Birthday': "Esteemed friends and family, we are here to honor someone who has enriched all our lives...",
      'Retirement': "Respected colleagues and friends, today we recognize a career marked by excellence and dedication...",
      'Business Event': "Honored guests and colleagues, I stand before you to address matters of great importance to our organization...",
      'Special Event': "Distinguished guests, it is my honor to address you on this significant occasion..."
    },
    'Inspiring': {
      'Wedding': "Love doesn't just happen to us—it transforms us, challenges us, and shows us what we're truly capable of...",
      'Birthday': "Every birthday is a celebration of possibility, of dreams realized and adventures yet to come...",
      'Retirement': "What we call an ending is really a beginning—the start of a new chapter filled with unlimited potential...",
      'Business Event': "Excellence isn't an accident. It's the result of vision, determination, and the courage to dream bigger...",
      'Special Event': "Today we celebrate not just an event, but the power of human potential and the courage to pursue our dreams..."
    }
  };

  // Start with opening
  const styleKey = Object.keys(openings).find(s => s.toLowerCase() === style.toLowerCase()) || 'Heartfelt';
  const occasionKey = Object.keys(openings[styleKey]).find(o => o.toLowerCase() === occasion.toLowerCase()) || 'Special Event';
  speech += openings[styleKey][occasionKey];
  speech += '\n\n';

  // Add key points naturally integrated
  if (key_points.length > 0) {
    if (styleKey === 'Witty') {
      speech += "Now, I could stand here and tell you all the obvious things, but instead let me share what really matters:\n\n";
    } else if (styleKey === 'Heartfelt') {
      speech += "I want to share some things that have been on my heart:\n\n";
    } else {
      speech += "There are several important points I'd like to address:\n\n";
    }
    
    key_points.forEach((point, index) => {
      const cleanPoint = point.replace(/^[•\-\*]\s*/, '').trim();
      speech += `${cleanPoint} - This captures something essential about who we're celebrating today.\n\n`;
    });
  }

  // Add personal stories with rich detail
  if (personal_stories.length > 0) {
    speech += "Let me paint you a picture with a story that captures exactly who this person is:\n\n";
    const firstStory = personal_stories[0].replace(/^[•\-\*]\s*/, '').trim();
    speech += `${firstStory}\n\n`;
    speech += "That moment perfectly shows the kind of person we're celebrating today.\n\n";
  }

  // Style-specific closings
  const closings = {
    'Heartfelt': {
      'Wedding': "So as you begin this incredible journey together, remember that love isn't just about finding someone you can live with—it's about finding someone you can't imagine living without. Here's to a lifetime of love, laughter, and beautiful moments. Cheers!",
      'Birthday': "As we celebrate another year of your amazing life, I hope you know how grateful we all are to know you. Here's to many more years of joy, adventure, and dreams coming true!",
      'Retirement': "Your legacy isn't just in the work you've done—it's in the lives you've touched, the people you've mentored, and the example you've set. Enjoy this new chapter!",
      'Business Event': "Thank you for reminding us what excellence looks like and for inspiring us to reach higher. Together, we'll continue building something remarkable.",
      'Special Event': "Thank you for being part of this special moment. May it be the beginning of something wonderful."
    },
    'Witty': {
      'Wedding': "Marriage is like a good wine—it gets better with age, but sometimes it gives you a headache the next morning. Here's to a lifetime of good vintages and minimal hangovers!",
      'Birthday': "They say the secret to staying young is to live honestly, eat slowly, and lie about your age. You've mastered at least one of those! Happy birthday!",
      'Retirement': "Retirement: where every day is Saturday and every night is Friday! You've earned every single one of those Saturdays.",
      'Business Event': "In closing, remember: we may not have all the answers, but at least we have good coffee and an open bar tonight!",
      'Special Event': "And remember, life is too important to be taken seriously all the time. Thank you and good night!"
    },
    'Formal': {
      'Wedding': "May your union be blessed with happiness, prosperity, and enduring love. Congratulations to the happy couple.",
      'Birthday': "We extend our warmest wishes for continued health, happiness, and success in the year ahead.",
      'Retirement': "We wish you a fulfilling and joyous retirement, knowing that your contributions will long be remembered and appreciated.",
      'Business Event': "Thank you for your attention, and I look forward to our continued collaboration and success.",
      'Special Event': "Thank you for your attention, and may this occasion mark the beginning of continued success and happiness."
    },
    'Inspiring': {
      'Wedding': "Your love story is just beginning, and I can't wait to see how you'll inspire others with your journey. Dream big, love deeply, and never stop believing in the magic you create together!",
      'Birthday': "Another year means another chance to make your mark on this world. I know you'll make it count. Here's to the amazing adventures ahead!",
      'Retirement': "This isn't goodbye—it's 'see you on the next adventure.' The best chapters of your story are still being written!",
      'Business Event': "Let's not just aim for success—let's aim to make a difference. Together, we can achieve something truly extraordinary.",
      'Special Event': "Let this moment inspire you to reach higher, dream bigger, and never stop believing in what's possible. The best is yet to come!"
    }
  };

  speech += closings[styleKey][occasionKey];

  return speech;
}

module.exports = {
  openai,
  generateSpeech,
  createSpeechPrompt
};
