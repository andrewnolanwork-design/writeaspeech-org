const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { generateSpeech } = require('../config/openai');

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

    // TODO: Save to database
    console.log('Generated speech:', completedSpeech);

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

    // TODO: Fetch from database
    // For now, return mock speeches
    const mockSpeeches = [
      {
        id: '1',
        userId,
        title: 'Best Man Speech for Jake\'s Wedding',
        occasion: 'Wedding',
        style: 'Heartfelt',
        status: 'completed',
        wordCount: 650,
        estimatedDuration: '4-5 minutes',
        createdAt: '2024-01-15T10:00:00.000Z',
        updatedAt: '2024-01-15T10:00:00.000Z'
      },
      {
        id: '2',
        userId,
        title: 'Retirement Speech for Dad',
        occasion: 'Retirement',
        style: 'Inspiring',
        status: 'draft',
        wordCount: 450,
        estimatedDuration: '3-4 minutes',
        createdAt: '2024-01-10T15:30:00.000Z',
        updatedAt: '2024-01-10T15:30:00.000Z'
      }
    ];

    res.json({
      speeches: mockSpeeches
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

    // TODO: Fetch from database
    // For now, return a mock speech
    const mockSpeech = {
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
      speech: mockSpeech
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
 * Helper function to generate mock speech content
 */
function generateMockSpeech({ occasion, style, audience, key_points = [], personal_stories = [] }) {
  const intros = {
    Wedding: "Good evening, everyone! For those who don't know me, I'm",
    Birthday: "Thank you all for being here to celebrate this special day. I'm",
    Retirement: "We've gathered here today to honor someone very special. I'm",
    'Business Event': "Good evening, colleagues and friends. I'm",
    Graduation: "Distinguished guests, proud families, and graduates, I'm"
  };

  const styles = {
    Heartfelt: "and I'm honored to speak from the heart today.",
    Witty: "and I promise to keep this entertaining!",
    Formal: "and I'm privileged to address you this evening.",
    Inspiring: "and I'm excited to share some thoughts that I hope will inspire you."
  };

  const intro = `${intros[occasion] || intros['Business Event']} John, ${styles[style] || styles['Formal']}`;
  
  let content = intro + '\n\n';
  
  // Add key points
  if (key_points.length > 0) {
    content += key_points.map(point => `• ${point}`).join('\n') + '\n\n';
  }
  
  // Add personal stories
  if (personal_stories.length > 0) {
    content += "Let me share a story that perfectly captures who this person is:\n\n";
    content += personal_stories[0] + '\n\n';
  }
  
  // Add conclusion based on occasion
  const conclusions = {
    Wedding: "So let's raise our glasses to the happy couple. May your love story continue to inspire us all!",
    Birthday: "Here's to another year of wonderful memories and many more to come!",
    Retirement: "Thank you for your years of dedication, and enjoy this well-deserved new chapter!",
    'Business Event': "Thank you for your attention, and let's continue to work together toward our shared goals.",
    Graduation: "Congratulations to all graduates - the future is yours to shape!"
  };
  
  content += conclusions[occasion] || conclusions['Business Event'];
  
  return content;
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
