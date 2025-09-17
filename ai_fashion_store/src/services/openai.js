import OpenAI from 'openai';

/**
 * Validates OpenAI API key format
 * @returns {boolean} True if API key format is valid
 */
const validateApiKey = () => {
  const apiKey = import.meta.env?.VITE_OPENAI_API_KEY;
  return apiKey && apiKey?.startsWith('sk-') && apiKey?.length > 20;
};

/**
 * Initializes the OpenAI client with the API key from environment variables.
 * @returns {OpenAI|null} Configured OpenAI client instance or null if invalid
 */
const createOpenAIClient = () => {
  if (!validateApiKey()) {
    console.warn('Invalid or missing OpenAI API key');
    return null;
  }

  return new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    timeout: 30000, // 30 second timeout
    maxRetries: 2, // Retry up to 2 times
  });
};

const openai = createOpenAIClient();

/**
 * Retry wrapper for OpenAI API calls with exponential backoff
 * @param {Function} apiCall - The API call function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise<any>} Result of the API call
 */
const withRetry = async (apiCall, maxRetries = 2) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // Don't retry on authentication errors
      if (error?.status === 401 || error?.status === 403) {
        throw error;
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff: wait 1s, then 2s, then 4s
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`OpenAI API call failed (attempt ${attempt + 1}), retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Generates a chat completion response based on user input.
 * @param {string} userMessage - The user's input message.
 * @param {Array} conversationHistory - Previous messages for context.
 * @returns {Promise<string>} The assistant's response.
 */
export async function getStyleChatCompletion(userMessage, conversationHistory = []) {
  if (!openai) {
    throw new Error('OpenAI client not initialized - check API key configuration');
  }

  try {
    const messages = [
      {
        role: 'system',
        content: `You are an expert AI fashion stylist for Synergize Style, a cutting-edge fashion platform. You help users with:

- Outfit recommendations and styling advice
- Color coordination and fashion trends
- Size and fit guidance
- Product suggestions from our fashion collections
- Seasonal styling tips
- Fashion advice for different occasions

Keep responses helpful, friendly, and fashion-focused. Provide specific, actionable styling advice. If users ask about products, suggest general categories or styles rather than specific items.`
      },
      ...conversationHistory?.slice(-10), // Keep only last 10 messages for context
      { role: 'user', content: userMessage }
    ];

    const response = await withRetry(async () => {
      return await openai?.chat?.completions?.create({
        model: 'gpt-4o-mini', // Cost-effective model for fashion advice
        messages,
        max_tokens: 2000,
        temperature: 0.7, // Creative but focused responses
        stream: false,
      });
    });

    const content = response?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    return content;
  } catch (error) {
    console.error('Error in OpenAI chat completion:', error);
    
    // Enhanced error messages
    if (error?.status === 401) {
      throw new Error('OpenAI API key is invalid or expired');
    } else if (error?.status === 429) {
      throw new Error('OpenAI API rate limit exceeded - please try again later');
    } else if (error?.status === 403) {
      throw new Error('OpenAI API access forbidden - check your account status');
    } else if (error?.message?.includes('network') || error?.message?.includes('Connection')) {
      throw new Error('Network connection error - please check your internet connection');
    }
    
    throw error;
  }
}

/**
 * Streams a chat completion response chunk by chunk.
 * @param {string} userMessage - The user's input message.
 * @param {Array} conversationHistory - Previous messages for context.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 */
export async function getStreamingStyleChat(userMessage, conversationHistory = [], onChunk) {
  if (!openai) {
    throw new Error('OpenAI client not initialized - check API key configuration');
  }

  try {
    const messages = [
      {
        role: 'system',
        content: `You are an expert AI fashion stylist for Synergize Style. Provide friendly, helpful fashion advice and styling tips. Keep responses concise and actionable.`
      },
      ...conversationHistory?.slice(-10),
      { role: 'user', content: userMessage }
    ];

    const stream = await withRetry(async () => {
      return await openai?.chat?.completions?.create({
        model: 'gpt-4o-mini',
        messages,
        stream: true,
        max_tokens: 1500,
        temperature: 0.7,
      });
    });

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content && onChunk) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    throw error;
  }
}

/**
 * Generates outfit recommendations based on user preferences.
 * @param {Object} preferences - User style preferences.
 * @returns {Promise<string>} Outfit recommendations.
 */
export async function getOutfitRecommendations(preferences) {
  if (!openai) {
    throw new Error('OpenAI client not initialized - check API key configuration');
  }

  try {
    const { occasion, style, colors, season, budget } = preferences;
    
    const prompt = `As a fashion stylist, recommend 3 complete outfits for:
- Occasion: ${occasion || 'casual'}
- Style preference: ${style || 'contemporary'}
- Preferred colors: ${colors || 'flexible'}
- Season: ${season || 'current'}
- Budget range: ${budget || 'mid-range'}

For each outfit, provide:
1. Main pieces (tops, bottoms, outerwear)
2. Accessories and shoes
3. Styling tips
4. Why this combination works

Format as a clear, structured response.`;

    const response = await withRetry(async () => {
      return await openai?.chat?.completions?.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional fashion stylist. Provide specific, actionable outfit recommendations.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2500,
        temperature: 0.8,
      });
    });

    const content = response?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    return content;
  } catch (error) {
    console.error('Error generating outfit recommendations:', error);
    throw error;
  }
}

/**
 * Analyzes an uploaded image for fashion advice.
 * @param {string} imageUrl - URL of the image to analyze.
 * @returns {Promise<string>} Fashion analysis and suggestions.
 */
export async function analyzeOutfitImage(imageUrl) {
  if (!openai) {
    throw new Error('OpenAI client not initialized - check API key configuration');
  }

  try {
    const response = await withRetry(async () => {
      return await openai?.chat?.completions?.create({
        model: 'gpt-4o', // Use vision-capable model
        messages: [
          {
            role: 'system',
            content: 'You are a fashion stylist. Analyze the outfit in the image and provide constructive styling advice, including what works well and suggestions for improvement.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Please analyze this outfit and provide styling advice.' },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
        max_tokens: 1500,
        temperature: 0.6,
      });
    });

    const content = response?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    return content;
  } catch (error) {
    console.error('Error analyzing outfit image:', error);
    throw error;
  }
}

/**
 * Test OpenAI connection and API key validity
 * @returns {Promise<boolean>} True if connection is successful
 */
export async function testOpenAIConnection() {
  if (!openai) {
    return false;
  }

  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Test' }],
      max_tokens: 5,
    });

    return response?.choices?.[0]?.message?.content !== undefined;
  } catch (error) {
    console.error('OpenAI connection test failed:', error);
    return false;
  }
}

export default openai;