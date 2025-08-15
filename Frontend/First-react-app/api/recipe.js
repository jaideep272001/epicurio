const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Only POST requests allowed' });
  }

  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
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
          inputs: `${SYSTEM_PROMPT}\n\nUser: I have ${ingredientsString}. Please give me a recipe you'd recommend I make!\n\nAssistant:`,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("HuggingFace API Error:", errText);
      throw new Error(`HTTP error! status: ${response.status} - ${errText}`);
    }

    const data = await response.json();

    let recipe = 'No recipe generated';
    if (Array.isArray(data) && data[0]?.generated_text) {
      recipe = data[0].generated_text;
    } else if (data?.generated_text) {
      recipe = data.generated_text;
    } else if (data?.error) {
      throw new Error(`Model error: ${data.error}`);
    }

    res.status(200).json({ success: true, recipe });

  } catch (error) {
    console.error('Error in /api/recipe:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate recipe',
      message: error.message
    });
  }
}
