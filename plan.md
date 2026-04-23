
## PROJECT PLAN FOR DUAL-MODE RECIPE PLATFORM

**OVERALL GOAL:**
Create a responsive AI-powered recipe web application with two main modes: 'Traditional African Meals' and 'Modern Meals'. The platform should allow users to explore recipes based on their location or selected country. It must include intelligent ingredient suggestions, pantry tracking, and personalized recommendations using machine learning. The UI should be clean, mobile-friendly, and culturally rich with African themes.

**FRONTEND FEATURES:**

**1. DUAL MODES IMPLEMENTATION:**
    - Implement a toggle or tab system to switch between 'Traditional African Meals' and 'Modern Meals'.
    - Each mode should have a distinct UI style while maintaining overall consistency.

**2. TRADITIONAL AFRICAN MEALS MODE:**
    - **Country Selection:** Dropdown list of African countries (e.g., Kenya, Nigeria, Ethiopia, Ghana, South Africa).
    - **Dish Display:** Dynamically display traditional dishes from the selected country (e.g., Ugali, Jollof Rice, Injera) in a card layout.
    - **Dish Details:** When a dish is selected, display ingredients, preparation steps, cooking time, and nutritional information.
    - **Cultural Context:** Include origin, region, and common consumption times for each dish.
    - **Scalability:** Design for easy expansion to more countries and dishes.

**3. MODERN MEALS MODE:**
    - **Browsing & Searching:** Global recipes (pasta, burgers, salads, smoothies).
    - **Filtering:** By dietary preferences, cooking time, and nutritional goals.
    - **AI Recommendations:** Based on user behavior and preferences.

**4. CORE FUNCTIONALITY:**
    - **Dish → Ingredient Flow:** Display structured ingredient lists with quantities and step-by-step instructions upon meal selection.
    - **Action Buttons:** 'Add to Pantry' and 'Start Cooking Mode' buttons.

**5. ENHANCED EXPLORATION & INTERACTION:**
    - **Country-Based Filter + Auto-Detection:** Auto-detect user location to suggest local traditional meals. Allow manual country switching.
    - **Search Bar:** Smart search by name, ingredient, or country.
    - **Smart Filtering:** Options like 'available ingredients', 'quick meals', 'healthy options'.
    - **Optional Visual Country Explorer:** Interactive map of Africa where clicking a country shows traditional dishes.
    - **Social Sharing:** Allow sharing recipes to social media platforms.

**BACKEND & SECURITY FEATURES:**

**1. MASTER BACKEND + SECURITY FOUNDATION:**
    - Build a full-stack, secure AI-powered recipe web application with user authentication, protected dashboards, and a backend database.
    - Securely store user data, support login/signup, and personalize content.
    - Adhere to best practices in authentication, authorization, and data privacy.

**2. USER AUTHENTICATION (LOGIN / SIGNUP):**
    - **Signup Fields:** Name, Email, Password (hashed securely), Country.
    - **Security:** Secure authentication (JWT or OAuth), password hashing (bcrypt), session management, protected routes.

**3. USER DASHBOARD (BACKEND-POWERED):**
    - Accessible only after login.
    - Displays: Personalized recommendations, pantry items, recently viewed recipes, country/preference-based suggestions.
    - Secure data fetching from the backend database.

**4. SECURE DATABASE DESIGN (Supabase PostgreSQL):**
    - Store: User profiles, pantry data, recipes, user activity (likes, searches, history).
    - Security: Proper access control, no direct user access to database, all operations via backend APIs.
    - Role-based access control if needed.

**5. AMAZON-LIKE DATA FLOW:**
    - User actions processed through backend APIs and stored in the database.
    - All operations must go through authenticated API endpoints.

**6. PERSONALIZATION ENGINE:**
    - **Country-Based:** Recommend traditional meals from user’s country, suggest popular local dishes, notifications ('Popular meals in your region').
    - **ML-Based:** Analyze user behavior (views, ingredients, searches) for predictive interests, similar recipe recommendations, and ingredient/meal suggestions. Ensure secure and anonymized data processing.

**7. BACKEND API LAYER (RESTful/GraphQL):**
    - Handles: Authentication, recipe retrieval, pantry updates, user preferences.
    - Security: All endpoints secure, require authentication tokens, validate user input.

**8. SECURITY BEST PRACTICES (CRITICAL):**
    - HTTPS encryption.
    - Password hashing (bcrypt).
    - Input validation and sanitization.
    - Protection against SQL injection and XSS.
    - Token-based authentication.
    - Data privacy compliance.

**9. REAL-TIME NOTIFICATIONS:**
    - Triggered by backend logic.
    - Alerts for: Expiring pantry items, recommended recipes based on country, personalized suggestions.

**10. FAST DEPLOYMENT:**
    - **Frontend:** Vercel/Netlify.
    - **Backend:** Supabase (PostgreSQL, Auth, Storage).
    - **Configuration:** Environment variables for API keys.
    - **Process:** One-command or simple deployment.

**RECOMMENDED FREE STACK:**
- Frontend: React 19.1.1 + Vite + Tailwind CSS (Vercel deployment)
- Backend: Supabase (PostgreSQL Database, Auth, Storage)
- ML: TensorFlow.js / Hugging Face (client-side or serverless functions)
- Chatbot: OpenAI API integration
- Storage: Supabase Storage (for recipe/user images)

**FINAL REFINEMENT PROMPT for Windsurf AI:**
Integrate frontend and backend into a secure, scalable, full-stack AI-powered recipe platform with authentication, personalized dashboards, and country-based recommendations. Ensure clean architecture, optimized performance, and production-ready deployment.
