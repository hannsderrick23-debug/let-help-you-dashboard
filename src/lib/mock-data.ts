export const mockPantry = [
  { 
    id: '1', 
    name: 'Spinach', 
    category: 'Produce', 
    quantity: '200g', 
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    daysLeft: 2,
    icon: '🥬'
  },
  { 
    id: '2', 
    name: 'Milk', 
    category: 'Dairy', 
    quantity: '1L', 
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    daysLeft: 1,
    icon: '🥛'
  },
  { 
    id: '3', 
    name: 'Red Bell Pepper', 
    category: 'Produce', 
    quantity: '2 units', 
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    daysLeft: 5,
    icon: '🫑'
  },
  { 
    id: '4', 
    name: 'Chicken Breast', 
    category: 'Protein', 
    quantity: '500g', 
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    daysLeft: 3,
    icon: '🍗'
  },
  { 
    id: '5', 
    name: 'Garlic', 
    category: 'Pantry', 
    quantity: '1 bulb', 
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    daysLeft: 14,
    icon: '🧄'
  },
  { 
    id: '6', 
    name: 'Onion', 
    category: 'Produce', 
    quantity: '3 units', 
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    daysLeft: 10,
    icon: '🧅'
  },
];

export interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: string;
  matchRate: number;
  ingredients: string[];
  tags: string[];
  instructions: string[];
  type: 'traditional' | 'modern';
  country?: string;
  culturalContext?: string;
  calories?: string;
}

export const mockRecipes: Recipe[] = [
  {
    id: 't1',
    title: 'Jollof Rice',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/jollof-rice-75afbff8-1776935360154.webp',
    time: '45 mins',
    difficulty: 'Medium',
    matchRate: 92,
    ingredients: ['2 cups Long grain rice', '4 large Tomatoes', '2 Red bell peppers', '1 large Onion', '1/2 cup Vegetable oil', '2 tbsp Tomato paste', 'Chicken stock'],
    tags: ['West African', 'Main Course', 'Spicy'],
    instructions: ['Blend tomatoes, peppers, and onions', 'Fry tomato paste and blended mix in oil', 'Add stock and rice', 'Simmer until soft and flavored'],
    type: 'traditional',
    country: 'Nigeria',
    culturalContext: 'A legendary West African one-pot rice dish that is a staple at every celebration. The debate over who makes the best Jollof (Nigeria vs Ghana) is legendary!',
    calories: '450 kcal'
  },
  {
    id: 't2',
    title: 'Ugali with Sukuma Wiki',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/ugali-with-sukuma-wiki-260dca8d-1776935360734.webp',
    time: '30 mins',
    difficulty: 'Easy',
    matchRate: 85,
    ingredients: ['2 cups Maize flour', '4 cups Water', '1 bunch Collard greens (Sukuma Wiki)', '2 Tomatoes', '1 Onion', '2 tbsp Oil'],
    tags: ['East African', 'Healthy', 'Vegan Option'],
    instructions: ['Boil water and slowly add maize flour while stirring to make Ugali', 'Sauté onions and tomatoes', 'Add chopped greens and cook until tender'],
    type: 'traditional',
    country: 'Kenya',
    culturalContext: 'The cornerstone of Kenyan cuisine. "Sukuma Wiki" literally means "push the week," referring to the affordability and nutritional value of the greens.',
    calories: '380 kcal'
  },
  {
    id: 't3',
    title: 'Injera with Doro Wat',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/injera-with-doro-wat-e3fb998f-1776935359596.webp',
    time: '90 mins',
    difficulty: 'Hard',
    matchRate: 78,
    ingredients: ['Injera (fermented flatbread)', '1kg Chicken pieces', '4 large Onions', '3 tbsp Berbere spice mix', '1/2 cup Niter Kibbeh (spiced butter)', '4 Hard-boiled eggs'],
    tags: ['Ethiopian', 'Festive', 'Spicy'],
    instructions: ['Slow-cook onions for hours until caramelized', 'Add Berbere and spiced butter', 'Add chicken and simmer', 'Finish with hard-boiled eggs'],
    type: 'traditional',
    country: 'Ethiopia',
    culturalContext: 'Often cited as the national dish of Ethiopia, Doro Wat is a spicy chicken stew typically served during holidays and special occasions.',
    calories: '550 kcal'
  },
  {
    id: 't4',
    title: 'Bunny Chow',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/bunny-chow-6a4b7134-1776935360446.webp',
    time: '40 mins',
    difficulty: 'Medium',
    matchRate: 80,
    ingredients: ['1 loaf White bread', '500g Lamb or mutton curry', '2 Potatoes', '1 Onion', 'Ginger-garlic paste', 'Curry leaves'],
    tags: ['South African', 'Street Food', 'Hearty'],
    instructions: ['Prepare a thick, spicy lamb curry', 'Hollow out a loaf of bread', 'Pour the curry into the bread shell', 'Serve with the hollowed-out bread on top'],
    type: 'traditional',
    country: 'South Africa',
    culturalContext: 'A beloved South African fast food dish consisting of a hollowed-out loaf of white bread filled with curry. It originated among Indian South Africans in Durban.',
    calories: '600 kcal'
  },
  {
    id: 'm1',
    title: 'Modern Avocado Toast',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/modern-avocado-toast-84d0342e-1776935360974.webp',
    time: '10 mins',
    difficulty: 'Easy',
    matchRate: 98,
    ingredients: ['2 slices Sourdough bread', '1 Ripe Avocado', '2 Eggs', 'Red pepper flakes', 'Lemon juice'],
    tags: ['Breakfast', 'Healthy', 'Quick'],
    instructions: ['Toast the bread', 'Mash avocado with lemon juice and salt', 'Poach the eggs', 'Assemble and sprinkle with chili flakes'],
    type: 'modern',
    calories: '320 kcal'
  },
  {
    id: 'm2',
    title: 'Gourmet Beef Burger',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/gourmet-burger-2421bc56-1776935360830.webp',
    time: '25 mins',
    difficulty: 'Medium',
    matchRate: 82,
    ingredients: ['200g Ground beef', '1 Brioche bun', '1 slice Cheddar cheese', 'Caramelized onions', 'Arugula', 'Special sauce'],
    tags: ['Comfort Food', 'High Protein', 'Classic'],
    instructions: ['Shape beef into a patty', 'Grill to desired doneness', 'Toast buns', 'Assemble with cheese, onions, and sauce'],
    type: 'modern',
    calories: '750 kcal'
  },
  {
    id: 'm3',
    title: 'Quinoa & Chickpea Salad',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/quinoa-salad-c46879a4-1776935359250.webp',
    time: '15 mins',
    difficulty: 'Easy',
    matchRate: 95,
    ingredients: ['1 cup Cooked quinoa', '1/2 cup Chickpeas', 'Cherry tomatoes', 'Cucumber', 'Feta cheese', 'Lemon-tahini dressing'],
    tags: ['Vegetarian', 'Healthy', 'Meal Prep'],
    instructions: ['Mix cooked quinoa and chickpeas', 'Chop vegetables', 'Toss with dressing and top with feta'],
    type: 'modern',
    calories: '410 kcal'
  },
  {
    id: 'm4',
    title: 'Berry Smoothie Bowl',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/70e78abe-7c2f-4184-884b-fa67ac7c52ea/berry-smoothie-bowl-e9422a9c-1776935361002.webp',
    time: '5 mins',
    difficulty: 'Easy',
    matchRate: 90,
    ingredients: ['1 cup Frozen berries', '1 Frozen banana', '1/2 cup Greek yogurt', 'Granola', 'Chia seeds', 'Fresh fruit'],
    tags: ['Breakfast', 'Superfood', 'Quick'],
    instructions: ['Blend frozen fruit and yogurt until thick', 'Pour into a bowl', 'Top with granola, seeds, and fresh fruit'],
    type: 'modern',
    calories: '280 kcal'
  }
];

export const countries = [
  { name: 'Nigeria', dishes: ['Jollof Rice', 'Pounded Yam', 'Egusi Soup', 'Suya'] },
  { name: 'Kenya', dishes: ['Ugali', 'Nyama Choma', 'Githeri', 'Pilau'] },
  { name: 'Ethiopia', dishes: ['Injera', 'Doro Wat', 'Kitfo', 'Tibs'] },
  { name: 'Ghana', dishes: ['Fufu', 'Banku', 'Red Red', 'Kelewele'] },
  { name: 'South Africa', dishes: ['Bunny Chow', 'Bobotie', 'Biltong', 'Braai'] },
  { name: 'Morocco', dishes: ['Couscous', 'Tagine', 'Harira', 'Pastilla'] },
  { name: 'Senegal', dishes: ['Thieboudienne', 'Yassa Chicken', 'Mafe'] },
  { name: 'Tanzania', dishes: ['Pilau', 'Chipsi Mayai', 'Wali wa Nazi'] },
];