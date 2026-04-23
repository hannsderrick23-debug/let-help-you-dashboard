/**
 * NLP Dictionary for Ingredient Normalization
 */
const synonymMap: Record<string, string> = {
  'capsicum': 'Bell Pepper',
  'bell pepper': 'Bell Pepper',
  'sweet pepper': 'Bell Pepper',
  'scallion': 'Green Onion',
  'spring onion': 'Green Onion',
  'cilantro': 'Coriander',
  'garbanzo beans': 'Chickpeas',
  'courgette': 'Zucchini',
  'aubergine': 'Eggplant',
  'maize': 'Corn',
};

/**
 * Normalizes an ingredient name using dictionary-based synonym matching
 */
export function normalizeIngredient(input: string) {
  const normalizedInput = input.toLowerCase().trim();
  
  for (const [synonym, officialName] of Object.entries(synonymMap)) {
    if (normalizedInput.includes(synonym)) {
      return { name: officialName, isNormalized: true };
    }
  }
  
  return { name: input, isNormalized: false };
}

/**
 * Substitution Intelligence
 */
const substitutionDatabase: Record<string, string[]> = {
  'Bell Pepper': ['Carrots', 'Zucchini', 'Celery'],
  'Spinach': ['Kale', 'Swiss Chard', 'Arugula'],
  'Chicken Breast': ['Tofu', 'Turkey Breast', 'Shrimp'],
  'Onion': ['Shallots', 'Leeks', 'Green Onions'],
  'Garlic': ['Garlic Powder', 'Shallots'],
  'Olive Oil': ['Avocado Oil', 'Grapeseed Oil', 'Butter'],
  'Heavy Cream': ['Coconut Milk', 'Whole Milk + Butter', 'Greek Yogurt'],
};

export function suggestSubstitution(ingredient: string): string | null {
  const normalized = normalizeIngredient(ingredient).name;
  const subs = substitutionDatabase[normalized];
  if (subs && subs.length > 0) {
    return subs[0]; // Suggest the first one
  }
  return null;
}

/**
 * Recipe Scaling Logic
 */
export function scaleRecipe(ingredientStr: string, targetServings: number, baseServings: number = 4) {
  const ratio = targetServings / baseServings;
  
  // Basic regex to match numbers at the start (e.g., "500g", "1 unit", "2 cloves")
  const match = ingredientStr.match(/^(\d+(\.\d+)?)\s*(\w+)?\s*(.*)$/);
  
  if (match) {
    const amount = parseFloat(match[1]);
    const unit = match[3] || '';
    const rest = match[4] || '';
    const scaledAmount = (amount * ratio).toFixed(amount % 1 === 0 && ratio % 1 === 0 ? 0 : 1);
    
    return `${scaledAmount}${unit} ${rest}`.trim();
  }
  
  return ingredientStr;
}