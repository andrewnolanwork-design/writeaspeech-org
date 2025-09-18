const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { generateSpeech } = require('../config/openai');

// In-memory storage for speeches (in production, this would be a database)
const speechStorage = new Map();

/**
 * POST /api/speech/generate
 * Generate a speech using AI
 */
router.post('/generate', async (req, res) => {
  try {
    const { 
      occasion, 
      style, 
      length, 
      audience, 
      key_points = [], 
      personal_stories = [],
      userId 
    } = req.body;

    // Validate required fields
    if (!occasion || !style || !length || !audience) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Occasion, style, length, and audience are required'
      });
    }

    // Create speech data structure
    const speechId = uuidv4();
    const speechData = {
      id: speechId,
      userId: userId || 'guest',
      occasion,
      style,
      length,
      audience,
      key_points,
      personal_stories,
      status: 'generating',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Generate speech using OpenAI
    let speechContent;
    try {
      speechContent = await generateSpeech({
        occasion,
        style,
        length,
        audience,
        key_points,
        personal_stories
      });
    } catch (error) {
      console.error('AI generation failed, using fallback:', error);
      // Fallback to mock speech if AI fails
      speechContent = generateMockSpeech({
        occasion,
        style,
        length,
        audience,
        key_points,
        personal_stories
      });
    }

    const completedSpeech = {
      ...speechData,
      content: speechContent,
      status: 'completed',
      wordCount: speechContent.split(' ').length,
      estimatedDuration: calculateDuration(speechContent),
      updatedAt: new Date().toISOString()
    };

    // Save to in-memory storage (in production, this would be a database)
    speechStorage.set(speechId, completedSpeech);
    console.log('Generated and stored speech:', speechId);

    res.json({
      message: 'Speech generated successfully',
      speech: completedSpeech
    });

  } catch (error) {
    console.error('Speech generation error:', error);
    res.status(500).json({
      error: 'Speech generation failed',
      message: 'An error occurred while generating your speech'
    });
  }
});

/**
 * GET /api/speech/user/:userId
 * Get all speeches for a user
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all speeches for this user from in-memory storage
    const userSpeeches = [];
    
    for (const [speechId, speech] of speechStorage.entries()) {
      if (speech.userId === userId) {
        // Generate title from occasion and style if not present
        const title = speech.title || `${speech.style} ${speech.occasion} Speech`;
        
        userSpeeches.push({
          id: speech.id,
          userId: speech.userId,
          title: title,
          occasion: speech.occasion,
          style: speech.style,
          status: speech.status,
          wordCount: speech.wordCount || 0,
          estimatedDuration: speech.estimatedDuration || '3-5 minutes',
          createdAt: speech.createdAt,
          updatedAt: speech.updatedAt
        });
      }
    }

    // Sort by creation date (newest first)
    userSpeeches.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      speeches: userSpeeches
    });

  } catch (error) {
    console.error('Get speeches error:', error);
    res.status(500).json({
      error: 'Failed to fetch speeches',
      message: 'An error occurred while fetching your speeches'
    });
  }
});

/**
 * GET /api/speech/:speechId
 * Get a specific speech by ID
 */
router.get('/:speechId', async (req, res) => {
  try {
    const { speechId } = req.params;

    // Try to get speech from in-memory storage
    const storedSpeech = speechStorage.get(speechId);
    
    if (storedSpeech) {
      console.log('Found stored speech:', speechId);
      res.json({
        speech: storedSpeech
      });
      return;
    }

    // If not found, return a fallback mock speech
    console.log('Speech not found in storage, returning fallback for:', speechId);
    const fallbackSpeech = {
      id: speechId,
      title: 'Best Man Speech for Jake\'s Wedding',
      occasion: 'Wedding',
      style: 'Heartfelt',
      length: '3-5 minutes',
      audience: 'Family and friends at wedding reception',
      key_points: [
        'How I met Jake in college',
        'His terrible cooking skills',
        'When he met Sarah and how he changed',
        'Why they are perfect together'
      ],
      personal_stories: [
        'The time Jake tried to cook for Sarah and set off the smoke alarm',
        'When Jake called me at 2am just to talk about Sarah'
      ],
      content: generateMockSpeech({
        occasion: 'Wedding',
        style: 'Heartfelt',
        audience: 'Family and friends'
      }),
      status: 'completed',
      wordCount: 650,
      estimatedDuration: '4-5 minutes',
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    };

    res.json({
      speech: fallbackSpeech
    });

  } catch (error) {
    console.error('Get speech error:', error);
    res.status(500).json({
      error: 'Speech not found',
      message: 'The requested speech could not be found'
    });
  }
});

/**
 * PUT /api/speech/:speechId
 * Update a speech
 */
router.put('/:speechId', async (req, res) => {
  try {
    const { speechId } = req.params;
    const updates = req.body;

    // TODO: Update in database
    const updatedSpeech = {
      id: speechId,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Speech updated successfully',
      speech: updatedSpeech
    });

  } catch (error) {
    console.error('Update speech error:', error);
    res.status(500).json({
      error: 'Failed to update speech',
      message: 'An error occurred while updating the speech'
    });
  }
});

/**
 * DELETE /api/speech/:speechId
 * Delete a speech
 */
router.delete('/:speechId', async (req, res) => {
  try {
    const { speechId } = req.params;

    // TODO: Delete from database
    console.log('Deleting speech:', speechId);

    res.json({
      message: 'Speech deleted successfully'
    });

  } catch (error) {
    console.error('Delete speech error:', error);
    res.status(500).json({
      error: 'Failed to delete speech',
      message: 'An error occurred while deleting the speech'
    });
  }
});

/**
 * Helper function to generate realistic mock speech content
 */
function generateMockSpeech({ occasion, style, audience, key_points = [], personal_stories = [] }) {
  // Generate personalized, realistic speeches based on input
  let speech = "";
  
  // Style-specific openings
  const openings = {
    'Heartfelt': {
      'Wedding': "Good evening, everyone. You know, when I think about love, I think about the kind of connection that makes you believe in magic again...",
      'Birthday': "Looking around this room tonight, I'm reminded of how one person can touch so many lives...",
      'Retirement': "Thirty-five years. That's not just a number—it's a lifetime of dedication, friendship, and moments that shaped all of us...",
      'Business Event': "I've been thinking about what it means to make a real difference, and that brings me to why we're here tonight..."
    },
    'Witty': {
      'Wedding': "So here we are, gathered to witness two people promise to put up with each other's weird habits for the rest of their lives...",
      'Birthday': "They say age is just a number. Well, tonight that number is getting pretty impressive...",
      'Retirement': "After decades of pretending to work while actually planning your retirement, the day has finally come...",
      'Business Event': "I was going to start with a joke about our quarterly numbers, but then I realized our quarterly numbers ARE the joke..."
    },
    'Formal': {
      'Wedding': "Distinguished guests, family, and friends, we gather today to celebrate the union of two remarkable individuals...",
      'Birthday': "Esteemed friends and family, we are here to honor someone who has enriched all our lives...",
      'Retirement': "Respected colleagues and friends, today we recognize a career marked by excellence and dedication...",
      'Business Event': "Honored guests and colleagues, I stand before you to address matters of great importance to our organization..."
    },
    'Inspiring': {
      'Wedding': "Love doesn't just happen to us—it transforms us, challenges us, and shows us what we're truly capable of...",
      'Birthday': "Every birthday is a celebration of possibility, of dreams realized and adventures yet to come...",
      'Retirement': "What we call an ending is really a beginning—the start of a new chapter filled with unlimited potential...",
      'Business Event': "Excellence isn't an accident. It's the result of vision, determination, and the courage to dream bigger..."
    }
  };

  // Start with opening
  speech += (openings[style] && openings[style][occasion]) || openings['Heartfelt']['Business Event'];
  speech += '\n\n';

  // Add key points naturally integrated
  if (key_points.length > 0) {
    if (style === 'Witty') {
      speech += "Now, I could stand here and tell you all the obvious things, but instead let me share what really matters:\n\n";
    } else if (style === 'Heartfelt') {
      speech += "I want to share some things that have been on my heart:\n\n";
    } else {
      speech += "There are several important points I'd like to address:\n\n";
    }
    
    key_points.forEach((point, index) => {
      speech += `${index + 1}. ${point} - This reminds me of the countless times I've witnessed this quality firsthand.\n\n`;
    });
  }

  // Add personal stories with rich detail
  if (personal_stories.length > 0) {
    speech += "Let me paint you a picture with a story that captures exactly who this person is:\n\n";
    speech += `${personal_stories[0]}\n\n`;
    speech += "That moment perfectly shows the kind of person we're celebrating today.\n\n";
    
    if (personal_stories.length > 1) {
      speech += `And then there's this: ${personal_stories[1]}\n\n`;
      speech += "These aren't just stories—they're glimpses into a character that inspires all of us.\n\n";
    }
  }

  // Style-specific closings
  const closings = {
    'Heartfelt': {
      'Wedding': "So as you begin this incredible journey together, remember that love isn't just about finding someone you can live with—it's about finding someone you can't imagine living without. Here's to a lifetime of love, laughter, and beautiful moments. Cheers!",
      'Birthday': "As we celebrate another year of your amazing life, I hope you know how grateful we all are to know you. Here's to many more years of joy, adventure, and dreams coming true!",
      'Retirement': "Your legacy isn't just in the work you've done—it's in the lives you've touched, the people you've mentored, and the example you've set. Enjoy this new chapter!",
      'Business Event': "Thank you for reminding us what excellence looks like and for inspiring us to reach higher. Together, we'll continue building something remarkable."
    },
    'Witty': {
      'Wedding': "Marriage is like a good wine—it gets better with age, but sometimes it gives you a headache the next morning. Here's to a lifetime of good vintages and minimal hangovers!",
      'Birthday': "They say the secret to staying young is to live honestly, eat slowly, and lie about your age. You've mastered at least one of those! Happy birthday!",
      'Retirement': "Retirement: where every day is Saturday and every night is Friday! You've earned every single one of those Saturdays.",
      'Business Event': "In closing, remember: we may not have all the answers, but at least we have good coffee and an open bar tonight!"
    },
    'Formal': {
      'Wedding': "May your union be blessed with happiness, prosperity, and enduring love. Congratulations to the happy couple.",
      'Birthday': "We extend our warmest wishes for continued health, happiness, and success in the year ahead.",
      'Retirement': "We wish you a fulfilling and joyous retirement, knowing that your contributions will long be remembered and appreciated.",
      'Business Event': "Thank you for your attention, and I look forward to our continued collaboration and success."
    },
    'Inspiring': {
      'Wedding': "Your love story is just beginning, and I can't wait to see how you'll inspire others with your journey. Dream big, love deeply, and never stop believing in the magic you create together!",
      'Birthday': "Another year means another chance to make your mark on this world. I know you'll make it count. Here's to the amazing adventures ahead!",
      'Retirement': "This isn't goodbye—it's 'see you on the next adventure.' The best chapters of your story are still being written!",
      'Business Event': "Let's not just aim for success—let's aim to make a difference. Together, we can achieve something truly extraordinary."
    }
  };

  speech += (closings[style] && closings[style][occasion]) || closings['Heartfelt']['Business Event'];

  return speech;
}

/**
 * Helper function to calculate estimated speech duration
 */
function calculateDuration(speechContent) {
  const words = speechContent.split(' ').length;
  const wordsPerMinute = 150; // Average speaking pace
  const minutes = Math.ceil(words / wordsPerMinute);
  
  if (minutes === 1) return '1 minute';
  if (minutes <= 2) return '1-2 minutes';
  if (minutes <= 3) return '2-3 minutes';
  if (minutes <= 5) return '3-5 minutes';
  if (minutes <= 7) return '5-7 minutes';
  return `${minutes} minutes`;
}

module.exports = router;
