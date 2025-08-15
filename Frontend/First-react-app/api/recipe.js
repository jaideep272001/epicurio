// pages/api/recipe.js

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe...
Format your response in markdown.
`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Only POST allowed' });
  }

  try {
    const { ingredients } = req.body;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ success: false, error: 'ingredients array is required' });
    }

    const ingredientsString = ingredients.join(", ");

    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `${SYSTEM_PROMPT}\n\nUser: I have ${ingredientsString}. Please give me a recipe you'd recommend!\n\nAssistant:`,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HuggingFace API error: ${errText}`);
    }

    const data = await response.json();

    let recipe = data[0]?.generated_text || data.generated_text || 'No recipe generated';

    res.status(200).json({ success: true, recipe });

  } catch (error) {
    console.error('Error in /api/recipe:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate recipe'
    });
  }
}
