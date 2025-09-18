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
          
          // Extract speech parameters from the enhanced prompt format
          const userMessage = messages[messages.length - 1].content;
          const systemMessage = messages[0].content;
          
          // Generate a high-quality mock speech following the enhanced prompt template
          const mockSpeech = generateEnhancedMockSpeechFromPrompt(userMessage, systemMessage);
          
          return {
            id: 'chatcmpl-mock-' + Date.now(),
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: model || 'gpt-4',
            choices: [{
              index: 0,
              message: {
                role: 'assistant',
                content: mockSpeech
              },
              finish_reason: 'stop'
            }],
            usage: {
              prompt_tokens: 250,
              completion_tokens: 650,
              total_tokens: 900
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
          content: `You are an expert speechwriter and a world-class public speaking coach. Your primary goal is to write a powerful, original, and emotionally resonant speech that sounds like it was written by a real person, not an AI. You will craft a speech that is perfectly tailored to the user's specifications. Your output must be only the speech itself, without any introductory or concluding remarks from you.

Core Instructions:
Human-Like Quality: Write in a natural, conversational style. Use rhetorical devices such as pauses (indicated by "..."), varied sentence lengths, and direct address to the audience to make the speech flow beautifully when spoken aloud. Avoid clichés and generic phrases.

Strict Word Count: Adhere strictly to the specified word count. This is a critical constraint.

Logical Structure: The speech must have a clear and compelling structure:
- The Opener: An engaging opening that grabs the audience's attention, introduces you (the speaker), and states the purpose of the speech.
- The Body: The main section where you will weave in the key points and personal stories. Ensure smooth transitions between different ideas or stories.
- The Closer: A memorable conclusion that summarizes the core message and ends with a powerful final thought, such as a toast, a call to action, or a heartfelt wish.

Tone and Style Adherence: The most important task is to perfectly capture the requested style. Your word choice, sentence structure, and overall emotional tone must be a direct reflection of the selected personality.`
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
  const wordCount = getWordCount(length);
  const styleGuidelines = getStyleGuidelines(style);

  let prompt = `USER SPECIFICATIONS
1. Occasion: ${occasion}
2. Style Profile: ${style}
${styleGuidelines}

3. Speech Length: ${length}
Target Word Count: ${wordCount} words

4. Audience: ${audience}
Tailor the language, jokes, and references to be perfectly understandable and relatable for this specific group.

5. Key Points to Include:
${key_points.length > 0 ? key_points.map(point => `• ${point}`).join('\n') : 'No specific key points provided - create compelling content based on other parameters.'}

6. Personal Stories to Weave In${personal_stories.length > 0 ? ':' : ' (if provided):'}
${personal_stories.length > 0 ? personal_stories.map((story, index) => `${index + 1}. ${story}`).join('\n') : 'No specific personal stories provided - you may create plausible, positive scenarios that fit the theme if needed.'}`;

  if (additionalContext) {
    prompt += `

7. Additional Context:
${additionalContext}`;
  }

  prompt += `

Final Check: Before generating, review all specifications. The final output must be only the text of the speech, ready to be read aloud. It must meet the word count, match the tone, and seamlessly integrate all the required content.`;

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
 * Get style guidelines following the new prompt template format
 */
function getStyleGuidelines(style) {
  const guidelines = {
    'Heartfelt': `If 'Heartfelt': Focus on genuine emotion, sincerity, and vulnerability. Use evocative language to create a deep emotional connection with the audience. The tone should be warm, loving, and deeply personal.`,
    'Witty': `If 'Witty': The primary goal is to entertain. Use clever wordplay, light-hearted roasts (if appropriate for the occasion), humorous anecdotes, and observational humor. The tone should be funny, charming, and engaging, but still appropriate for the occasion.`,
    'Formal': `If 'Formal': Adopt a polished, professional, and respectful tone. The language should be eloquent and the structure impeccable. Avoid slang, casual language, and overly personal anecdotes unless they serve a specific, professional purpose.`,
    'Inspiring': `If 'Inspiring': The goal is to motivate and uplift. Use powerful verbs, aspirational language, and stories of growth or achievement. The tone should be optimistic, encouraging, and passionate.`
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
 * Generate a high-quality mock speech following the enhanced prompt template
 */
function generateEnhancedMockSpeechFromPrompt(userMessage, systemMessage) {
  // Extract parameters from the new USER SPECIFICATIONS format
  const occasionMatch = userMessage.match(/1\.\s*Occasion:\s*([^\n]+)/i);
  const styleMatch = userMessage.match(/2\.\s*Style Profile:\s*([^\n]+)/i);
  const lengthMatch = userMessage.match(/3\.\s*Speech Length:\s*([^\n]+)/i);
  const audienceMatch = userMessage.match(/4\.\s*Audience:\s*([^\n]+)/i);
  const keyPointsMatch = userMessage.match(/5\.\s*Key Points to Include:\s*(.*?)(?=6\.|$)/si);
  const storiesMatch = userMessage.match(/6\.\s*Personal Stories.*?:\s*(.*?)(?=Final Check|$)/si);
  const wordCountMatch = userMessage.match(/Target Word Count:\s*([^\n]+)/i);
  
  const occasion = occasionMatch ? occasionMatch[1].trim() : 'Special Event';
  const style = styleMatch ? styleMatch[1].trim() : 'Heartfelt';
  const length = lengthMatch ? lengthMatch[1].trim() : '3-5 minutes';
  const audience = audienceMatch ? audienceMatch[1].trim() : 'Friends and Family';
  const wordCount = wordCountMatch ? wordCountMatch[1].trim() : '450-750 words';
  
  // Extract key points (clean up any formatting issues)
  let keyPoints = [];
  if (keyPointsMatch) {
    keyPoints = keyPointsMatch[1]
      .split('\n')
      .map(p => p.replace(/^[•\-\*]\s*/, '').trim())
      .filter(p => p && p !== 'No specific key points provided - create compelling content based on other parameters.');
  }
  
  // Extract personal stories (clean up any formatting issues)
  let stories = [];
  if (storiesMatch) {
    const storiesText = storiesMatch[1].trim();
    if (!storiesText.includes('No specific personal stories provided')) {
      stories = storiesText
        .split('\n')
        .map(s => s.replace(/^\d+\.\s*/, '').trim())
        .filter(s => s);
    }
  }
  
  // Generate a professional, high-quality speech
  return generateProfessionalMockSpeech({
    occasion,
    style,
    length,
    audience,
    wordCount,
    key_points: keyPoints,
    personal_stories: stories
  });
}

/**
 * Generate a professional, high-quality mock speech that follows the enhanced prompt template
 */
function generateProfessionalMockSpeech({ occasion, style, length, audience, wordCount, key_points = [], personal_stories = [] }) {
  // Generate a complete, high-quality speech following the enhanced template
  console.log('🎤 Generating professional mock speech:', { occasion, style, length, key_points, personal_stories });
  
  let speech = '';
  
  // THE OPENER - Natural, engaging opening
  const opener = generateProfessionalOpener(style, occasion);
  console.log('📝 Opener length:', opener.split(' ').length, 'words');
  speech += opener;
  speech += '\n\n';
  
  // THE BODY - Weave in key points and stories naturally
  const body = generateProfessionalBody(style, occasion, key_points, personal_stories);
  console.log('📝 Body length:', body.split(' ').length, 'words');
  speech += body;
  speech += '\n\n';
  
  // THE CLOSER - Memorable conclusion
  const closer = generateProfessionalCloser(style, occasion);
  console.log('📝 Closer length:', closer.split(' ').length, 'words');
  speech += closer;
  
  const totalWords = speech.split(' ').length;
  console.log('📝 Total speech length:', totalWords, 'words (target: 450-750)');
  
  return speech;
}

function generateProfessionalOpener(style, occasion) {
  const openers = {
    'Witty': {
      'Birthday': "You know what I love about birthdays? They're the one day a year when it's socially acceptable to demand attention, eat cake for breakfast, and make everyone sing to you... and honestly, you've earned every bit of it.",
      'Wedding': "So here we are, watching two people make the most expensive promise they'll ever make... and somehow, I couldn't be happier for them."
    },
    'Heartfelt': {
      'Birthday': "Looking around this room tonight, I'm struck by something beautiful... we're all here because one person has touched our lives in ways we're still discovering.",
      'Wedding': "There's something magical about love that makes us all believers again. Standing here today, watching these two, I'm reminded of why we never stop hoping for that kind of connection."
    }
  };
  
  return openers[style]?.[occasion] || "Thank you all for being here tonight. This is truly a special moment.";
}

function generateProfessionalBody(style, occasion, key_points, personal_stories) {
  let body = '';
  
  // Add meaningful content based on key points
  if (key_points.length > 0 && key_points[0] && key_points[0].trim()) {
    if (style === 'Witty') {
      body += "Now, I could stand here and tell you all the predictable things, but let me share what really matters... ";
    } else {
      body += "I want to share something that captures the essence of this moment... ";
    }
    
    key_points.forEach(point => {
      if (point && point.trim()) {
        body += `${point}. `;
        if (style === 'Witty') {
          body += "And if you know them like I do, you'll understand exactly why this is so perfectly fitting. ";
        } else {
          body += "This speaks to something beautiful about who they are and what they mean to all of us. ";
        }
      }
    });
    body += '\n\n';
  }
  
  // Add personal stories if provided
  if (personal_stories.length > 0 && personal_stories[0] && personal_stories[0].trim()) {
    body += "Let me tell you a story that perfectly captures who we're celebrating... ";
    personal_stories.forEach(story => {
      if (story && story.trim()) {
        body += `${story}. `;
        if (style === 'Witty') {
          body += "That's when I knew we were dealing with someone truly special—even if they don't always show it in conventional ways! ";
        } else {
          body += "In that moment, I saw something incredible about their character that I'll never forget. ";
        }
      }
    });
    body += '\n\n';
  }
  
  // Add substantial content to reach proper length based on style and occasion
  if (style === 'Witty') {
    if (occasion === 'Wedding') {
      body += "You know, they say marriage is all about finding that one special person you want to annoy for the rest of your life... and looking at these two, I think they've found their perfect match in mutual annoyance! But seriously, what I love about their relationship is how they bring out the best in each other while somehow making it look effortless.\n\n";
      body += "I've had the privilege of watching their love story unfold, and let me tell you, it's been better than any romantic comedy—and definitely funnier. They've shown us that true love isn't just about the grand gestures; it's about finding someone who laughs at your terrible jokes, puts up with your weird habits, and still chooses to love you even when you leave dirty dishes in the sink.\n\n";
      body += "What strikes me most about these two is how they've managed to maintain their individual quirks while becoming this incredible team. They complement each other in the most unexpected ways—where one is organized, the other brings spontaneity; where one is practical, the other dreams big. It's like watching a perfectly choreographed dance, except sometimes one of them steps on the other's toes, and somehow that makes it even more beautiful.\n\n";
      body += "I remember thinking when I first met them as a couple, 'Well, this is either going to be absolutely perfect or a complete disaster.' Thankfully, it turned out to be absolutely perfect—with just enough disaster to keep things interesting. They've mastered the art of being completely themselves while somehow becoming even better together.\n\n";
      body += "The thing about these two is that they don't just complete each other's sentences—they complete each other's ridiculous ideas. When one says, 'Hey, wouldn't it be fun to...', the other doesn't say, 'That's crazy.' They say, 'I'll get the car keys.' That's the kind of partnership that doesn't just survive—it thrives on shared adventures and mutual support.\n\n";
      body += "Looking around this room tonight, I see the faces of everyone who's been touched by their love story. We've all been witnesses to something beautiful—two people who found not just romance, but genuine friendship, deep respect, and the kind of partnership that makes everyone around them believe in love a little more.\n\n";
    } else if (occasion === 'Birthday') {
      body += "What I admire most is how you've mastered the art of taking important things seriously while never taking yourself too seriously. You've got this incredible ability to find humor in the chaos and wisdom in the unexpected. I've watched you turn ordinary moments into extraordinary memories just by being authentically you.\n\n";
      body += "You know what sets you apart? It's not just your amazing sense of humor—though that certainly helps get us through the tough times. It's your incredible capacity to make everyone around you feel like they matter. You remember the little things, you show up when it counts, and you somehow always know exactly what to say to make someone's day better.\n\n";
      body += "I've watched you navigate life's ups and downs with a grace that makes it look easy—though we all know it's not. You've taught us that laughter really is the best medicine, especially when served with good friends, questionable dance moves, and the occasional midnight snack run. You've shown us that growing older doesn't mean growing up completely, and that's a gift we all need more of.\n\n";
      body += "The truth is, birthdays aren't just about celebrating another year of life—they're about celebrating the impact you've had on everyone around you. Looking at the faces in this room tonight, I see a collection of people whose lives are richer, funnier, and more meaningful because you're in them.\n\n";
      body += "You've taught us that age is really just a number, but wisdom, kindness, and the ability to make people laugh until their sides hurt—those are the things that actually matter. And on all those counts, you're absolutely crushing it.\n\n";
    }
  } else if (style === 'Heartfelt') {
    body += "What strikes me most is how you've touched each of our lives in different ways, yet somehow consistently shown us what kindness, generosity, and genuine care look like in action. You've been there for the big moments and the small ones, offering support when we needed it most and celebration when we achieved something worth sharing.\n\n";
    body += "I've been thinking about all the ways you've made a difference—not just in grand gestures, but in the quiet moments, the thoughtful words, the way you listen without judgment and love without conditions. You've taught us that true strength comes from vulnerability, that real wisdom comes from experience, and that the most meaningful connections are built on authenticity and trust.\n\n";
    body += "In a world that often feels rushed and disconnected, you've reminded us to slow down, to appreciate the people we love, and to never take for granted the precious moments we share together. That's not just a gift—it's a legacy that will continue to inspire us long after tonight is over.\n\n";
    body += "When I think about the person you are and the impact you've had, I'm reminded that the most important things in life aren't things at all—they're the relationships we build, the love we share, and the memories we create together. You've mastered all of these in ways that continue to amaze and inspire everyone who knows you.\n\n";
  }
  
  return body;
}

function generateProfessionalCloser(style, occasion) {
  const closers = {
    'Witty': {
      'Birthday': "So here's to another year of questionable decisions, excellent results, and the kind of friendship that makes life infinitely more entertaining. Happy birthday!",
      'Wedding': "Marriage is like a really good wine—it gets better with age, occasionally gives you a headache, and is best enjoyed with friends nearby. Here's to a vintage that will only improve with time!"
    },
    'Heartfelt': {
      'Birthday': "As we celebrate another year of your incredible journey, know that we're all grateful to be part of your story. Here's to many more chapters filled with joy, love, and beautiful moments.",
      'Wedding': "So as you begin this beautiful adventure together, remember that the best love stories aren't the ones that end happily ever after—they're the ones that keep getting better every day. Here's to your forever."
    }
  };
  
  return closers[style]?.[occasion] || "Thank you for this special moment, and here's to all the beautiful moments yet to come!";
}

module.exports = {
  openai,
  generateSpeech,
  createSpeechPrompt
};
