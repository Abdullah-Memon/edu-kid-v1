/**
 * Math Exercise Content Template System
 * 
 * This system provides a standardized way to add new mathematical exercises
 * to any section of the learning platform. Each exercise follows a consistent
 * template structure for maintainability and scalability.
 */

// ===== CORE TEMPLATE STRUCTURE =====

/**
 * Exercise Template Interface
 * All exercises must implement this structure
 */
const ExerciseTemplate = {
    // Unique identifier for the exercise
    id: 'string',
    
    // Exercise metadata
    metadata: {
        title: 'string',           // Exercise title in Urdu/Sindhi
        description: 'string',     // Brief description of what students learn
        difficulty: 'number',      // 1-5 difficulty level
        estimatedTime: 'number',   // Estimated completion time in minutes
        prerequisites: ['array'],  // Required knowledge before attempting
        learningObjectives: ['array'] // What students will learn
    },
    
    // Content generation function
    generator: function() {
        // Returns exercise data object
        return {
            question: {},          // Question data
            correctAnswer: {},     // Correct answer
            options: [],          // Multiple choice options (if applicable)
            visualElements: {},   // Visual aids data
            hints: [],           // Progressive hints for struggling students
            explanation: 'string' // Explanation of the solution
        };
    },
    
    // UI rendering function
    renderer: function(container, exerciseData) {
        // Renders exercise UI in the specified container
        // Must handle responsive design and accessibility
    },
    
    // Answer validation function
    validator: function(userAnswer, correctAnswer) {
        // Returns boolean indicating if answer is correct
        // Can handle multiple valid answer formats
    },
    
    // Visual elements generator (optional)
    visualGenerator: function(exerciseData) {
        // Returns visual elements like SVG, animations, etc.
    },
    
    // Adaptive difficulty adjustment (optional)
    difficultyAdjuster: function(currentLevel, performance) {
        // Adjusts exercise parameters based on student performance
    }
};

// ===== CONTENT MANAGEMENT SYSTEM =====

/**
 * Exercise Content Manager
 * Handles loading, organizing, and serving exercises
 */
class ExerciseContentManager {
    constructor() {
        this.exercises = new Map();
        this.categories = new Map();
        this.loadDefaultExercises();
    }

    /**
     * Register a new exercise
     * @param {string} category - Math category (counting, addition, etc.)
     * @param {Object} exercise - Exercise template object
     */
    registerExercise(category, exercise) {
        if (!this.categories.has(category)) {
            this.categories.set(category, []);
        }
        
        // Validate exercise structure
        this.validateExercise(exercise);
        
        // Add to category
        this.categories.get(category).push(exercise);
        this.exercises.set(exercise.id, exercise);
        
        console.log(`Exercise "${exercise.id}" registered in category "${category}"`);
    }

    /**
     * Get exercises by category and difficulty
     * @param {string} category - Math category
     * @param {number} difficulty - Difficulty level (1-5)
     * @param {number} count - Number of exercises to return
     */
    getExercises(category, difficulty = null, count = 1) {
        const categoryExercises = this.categories.get(category) || [];
        
        let filtered = categoryExercises;
        if (difficulty !== null) {
            filtered = categoryExercises.filter(ex => ex.metadata.difficulty === difficulty);
        }
        
        // Shuffle and return requested count
        const shuffled = this.shuffleArray([...filtered]);
        return shuffled.slice(0, count);
    }

    /**
     * Get specific exercise by ID
     * @param {string} exerciseId - Exercise identifier
     */
    getExercise(exerciseId) {
        return this.exercises.get(exerciseId);
    }

    /**
     * Validate exercise structure
     * @param {Object} exercise - Exercise to validate
     */
    validateExercise(exercise) {
        const required = ['id', 'metadata', 'generator', 'renderer', 'validator'];
        const missing = required.filter(prop => !(prop in exercise));
        
        if (missing.length > 0) {
            throw new Error(`Exercise missing required properties: ${missing.join(', ')}`);
        }
        
        if (typeof exercise.metadata.difficulty !== 'number' || 
            exercise.metadata.difficulty < 1 || 
            exercise.metadata.difficulty > 5) {
            throw new Error('Exercise difficulty must be a number between 1 and 5');
        }
    }

    /**
     * Load default exercise templates
     */
    loadDefaultExercises() {
        // Load exercises from exercises.js or inline definitions
        this.loadCountingExercises();
        this.loadAdditionExercises();
        this.loadSubtractionExercises();
        this.loadMultiplicationExercises();
        this.loadFractionExercises();
        this.loadGeometryExercises();
    }

    // Helper method to shuffle arrays
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Category-specific exercise loaders
    loadCountingExercises() {
        // Basic Object Counting
        this.registerExercise('counting', {
            id: 'counting_objects_basic',
            metadata: {
                title: 'بنیادی اشیاء گننا',
                description: 'مختلف اشیاء کی تعداد گننا سیکھیں',
                difficulty: 1,
                estimatedTime: 2,
                prerequisites: [],
                learningObjectives: ['Number recognition 1-10', 'Basic counting skills']
            },
            generator: function() {
                const objects = ['🍎', '🎾', '⭐', '🎈', '🟡', '🔵', '🟢', '🟣', '🍓', '🌼'];
                const count = Math.floor(Math.random() * 8) + 2; // 2-9 objects
                const selectedObject = objects[Math.floor(Math.random() * objects.length)];
                
                const wrongOptions = this.generateWrongOptions(count, 3);
                const allOptions = [count, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: 'یہ کتنے ' + this.getObjectName(selectedObject) + ' ہیں؟',
                        count: count,
                        object: selectedObject
                    },
                    correctAnswer: count,
                    options: allOptions,
                    visualElements: {
                        objects: Array(count).fill(selectedObject)
                    },
                    hints: [
                        'ہر ایک کو انگلی سے پوائنٹ کرتے ہوئے گنیں',
                        'آہستہ آہستہ ایک ایک کرکے گنیں',
                        'گننے کے بعد دوبارہ چیک کریں'
                    ],
                    explanation: `یہاں ${count} ${this.getObjectName(selectedObject)} ہیں۔ ہم نے ایک ایک کرکے گنا۔`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="text-center">
                        <h3 class="text-xl font-bold mb-6">${data.question.text}</h3>
                        <div class="flex flex-wrap justify-center gap-3 mb-6 p-4 bg-blue-50 rounded-xl">
                            ${data.visualElements.objects.map((obj, index) => 
                                `<span class="text-4xl visual-counter bounce-in" style="animation-delay: ${index * 0.1}s">${obj}</span>`
                            ).join('')}
                        </div>
                        <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
                            ${data.options.map(option => 
                                `<button onclick="checkAnswer('counting', ${option})" 
                                 class="exercise-button bg-blue-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-blue-600 transition">
                                    ${option}
                                 </button>`
                            ).join('')}
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            },
            generateWrongOptions: function(correct, count) {
                const options = [];
                while (options.length < count) {
                    let option;
                    if (Math.random() < 0.7) {
                        // Generate close wrong answers
                        option = correct + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 2) + 1);
                    } else {
                        // Generate random wrong answers
                        option = Math.floor(Math.random() * 15) + 1;
                    }
                    
                    if (option > 0 && option !== correct && !options.includes(option)) {
                        options.push(option);
                    }
                }
                return options;
            },
            getObjectName: function(emoji) {
                const names = {
                    '🍎': 'سیب',
                    '🎾': 'گیند',
                    '⭐': 'ستارے',
                    '🎈': 'غبارے',
                    '🟡': 'پیلے دائرے',
                    '🔵': 'نیلے دائرے',
                    '🟢': 'سبز دائرے',
                    '🟣': 'بنفشی دائرے',
                    '🍓': 'اسٹرابیری',
                    '🌼': 'پھول'
                };
                return names[emoji] || 'چیزیں';
            }
        });

        // Skip Counting Exercise
        this.registerExercise('counting', {
            id: 'skip_counting_twos',
            metadata: {
                title: 'دو دو کرکے گننا',
                description: '2, 4, 6, 8... کی طرح Skip counting سیکھیں',
                difficulty: 2,
                estimatedTime: 3,
                prerequisites: ['counting_objects_basic'],
                learningObjectives: ['Skip counting by 2s', 'Pattern recognition']
            },
            generator: function() {
                const startNumber = Math.floor(Math.random() * 4) + 1; // 1-4
                const sequence = [];
                for (let i = 0; i < 5; i++) {
                    sequence.push(startNumber + (i * 2));
                }
                
                const missingIndex = Math.floor(Math.random() * 3) + 1; // Don't make first or last missing
                const correctAnswer = sequence[missingIndex];
                sequence[missingIndex] = '?';
                
                const wrongOptions = this.generateWrongOptions(correctAnswer, 3);
                const allOptions = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: 'مفقود نمبر تلاش کریں:',
                        sequence: sequence
                    },
                    correctAnswer: correctAnswer,
                    options: allOptions,
                    visualElements: {
                        numberLine: sequence
                    },
                    hints: [
                        'پیٹرن دیکھیں: کیا ہر نمبر میں اضافہ ہو رہا ہے؟',
                        'دو دو کا اضافہ ہو رہا ہے',
                        'پہلے اور اگلے نمبر کو دیکھیں'
                    ],
                    explanation: `یہ 2 کے skip counting کا پیٹرن ہے۔ ہر نمبر میں 2 کا اضافہ ہو رہا ہے۔`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="text-center">
                        <h3 class="text-xl font-bold mb-6">${data.question.text}</h3>
                        <div class="flex justify-center items-center gap-4 mb-6 p-4 bg-green-50 rounded-xl">
                            ${data.visualElements.numberLine.map((num, index) => 
                                `<div class="number-box ${num === '?' ? 'bg-yellow-200 border-yellow-500' : 'bg-white border-green-500'} bounce-in" 
                                     style="animation-delay: ${index * 0.2}s">
                                    ${num}
                                 </div>`
                            ).join('')}
                        </div>
                        <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
                            ${data.options.map(option => 
                                `<button onclick="checkAnswer('counting', ${option})" 
                                 class="exercise-button bg-green-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-green-600 transition">
                                    ${option}
                                 </button>`
                            ).join('')}
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            },
            generateWrongOptions: function(correct, count) {
                const options = [];
                while (options.length < count) {
                    let option = correct + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 4) + 1);
                    
                    if (option > 0 && option !== correct && !options.includes(option)) {
                        options.push(option);
                    }
                }
                return options;
            }
        });
    }

    loadAdditionExercises() {
        // Visual Addition with Objects
        this.registerExercise('addition', {
            id: 'visual_addition_basic',
            metadata: {
                title: 'visual جمع',
                description: 'اشیاء کے ذریعے جمع سیکھیں',
                difficulty: 1,
                estimatedTime: 3,
                prerequisites: ['counting_objects_basic'],
                learningObjectives: ['Addition concept', 'Visual math understanding']
            },
            generator: function() {
                const maxSum = 10;
                const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
                const num2 = Math.floor(Math.random() * (maxSum - num1)) + 1;
                const sum = num1 + num2;
                
                const objects = ['🟦', '🟩', '🟨', '🟪', '⭐', '❤️'];
                const object1 = objects[Math.floor(Math.random() * objects.length)];
                const object2 = objects[Math.floor(Math.random() * objects.length)];
                
                const wrongOptions = this.generateWrongOptions(sum, 3);
                const allOptions = [sum, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: 'جمع کریں:',
                        expression: `${num1} + ${num2} = ?`,
                        num1: num1,
                        num2: num2
                    },
                    correctAnswer: sum,
                    options: allOptions,
                    visualElements: {
                        group1: Array(num1).fill(object1),
                        group2: Array(num2).fill(object2),
                        operator: '+'
                    },
                    hints: [
                        'پہلے گروپ میں کتنے ہیں؟',
                        'دوسرے گروپ میں کتنے ہیں؟',
                        'سب ملا کر کتنے ہوئے؟'
                    ],
                    explanation: `${num1} اور ${num2} ملا کر ${sum} ہوتے ہیں۔`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="text-center">
                        <h3 class="text-xl font-bold mb-4">${data.question.text}</h3>
                        <div class="text-5xl font-bold mb-6">${data.question.expression}</div>
                        
                        <div class="flex items-center justify-center gap-8 mb-6 p-4 bg-blue-50 rounded-xl">
                            <div class="flex flex-wrap gap-2">
                                ${data.visualElements.group1.map((obj, index) => 
                                    `<span class="text-3xl bounce-in" style="animation-delay: ${index * 0.1}s">${obj}</span>`
                                ).join('')}
                            </div>
                            
                            <div class="text-4xl font-bold text-purple-600">${data.visualElements.operator}</div>
                            
                            <div class="flex flex-wrap gap-2">
                                ${data.visualElements.group2.map((obj, index) => 
                                    `<span class="text-3xl bounce-in" style="animation-delay: ${(data.visualElements.group1.length + index) * 0.1}s">${obj}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
                            ${data.options.map(option => 
                                `<button onclick="checkAnswer('addition', ${option})" 
                                 class="exercise-button bg-indigo-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-indigo-600 transition">
                                    ${option}
                                 </button>`
                            ).join('')}
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            },
            generateWrongOptions: function(correct, count) {
                const options = [];
                while (options.length < count) {
                    let option;
                    if (Math.random() < 0.6) {
                        option = correct + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 3) + 1);
                    } else {
                        option = Math.floor(Math.random() * 20) + 1;
                    }
                    
                    if (option > 0 && option !== correct && !options.includes(option)) {
                        options.push(option);
                    }
                }
                return options;
            }
        });

        // Word Problem Addition
        this.registerExercise('addition', {
            id: 'word_problem_addition',
            metadata: {
                title: 'کہانی والے جمع',
                description: 'کہانی کے ذریعے جمع کے مسائل حل کریں',
                difficulty: 2,
                estimatedTime: 4,
                prerequisites: ['visual_addition_basic'],
                learningObjectives: ['Word problem solving', 'Real-world application']
            },
            generator: function() {
                const stories = [
                    {
                        template: 'احمد کے پاس {num1} {item} ہیں۔ اس کی ماں نے {num2} اور {item} دیے۔ اب احمد کے پاس کتنے {item} ہیں؟',
                        items: ['سیب', 'کھلونے', 'کتابیں', 'پنسلیں']
                    },
                    {
                        template: 'باغ میں {num1} پرندے بیٹھے ہیں۔ {num2} اور پرندے آکر بیٹھ گئے۔ اب کل کتنے پرندے ہیں؟',
                        items: ['پرندے']
                    },
                    {
                        template: 'فاطمہ نے {num1} پھول توڑے۔ پھر اس نے {num2} اور پھول توڑے۔ کل کتنے پھول ہوئے؟',
                        items: ['پھول']
                    }
                ];
                
                const selectedStory = stories[Math.floor(Math.random() * stories.length)];
                const item = selectedStory.items[Math.floor(Math.random() * selectedStory.items.length)];
                
                const num1 = Math.floor(Math.random() * 7) + 2; // 2-8
                const num2 = Math.floor(Math.random() * 6) + 1; // 1-6
                const sum = num1 + num2;
                
                const storyText = selectedStory.template
                    .replace(/{num1}/g, num1)
                    .replace(/{num2}/g, num2)
                    .replace(/{item}/g, item);
                
                const wrongOptions = this.generateWrongOptions(sum, 3);
                const allOptions = [sum, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        story: storyText,
                        equation: `${num1} + ${num2} = ?`
                    },
                    correctAnswer: sum,
                    options: allOptions,
                    visualElements: {
                        story: storyText,
                        illustration: this.getIllustration(item, num1, num2)
                    },
                    hints: [
                        'کہانی میں کیا جمع ہو رہا ہے؟',
                        `پہلے ${num1} تھے، پھر ${num2} اور آئے`,
                        'دونوں کو جمع کریں'
                    ],
                    explanation: `${num1} + ${num2} = ${sum}`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="text-center">
                        <div class="bg-yellow-50 p-6 rounded-xl mb-6">
                            <h3 class="text-lg font-bold mb-4">📖 کہانی:</h3>
                            <p class="text-lg leading-relaxed">${data.visualElements.story}</p>
                        </div>
                        
                        <div class="text-4xl mb-6">${data.visualElements.illustration}</div>
                        <div class="text-3xl font-bold mb-6 text-purple-600">${data.question.equation}</div>
                        
                        <div class="grid grid-cols-4 gap-3 max-w-md mx-auto">
                            ${data.options.map(option => 
                                `<button onclick="checkAnswer('addition', ${option})" 
                                 class="exercise-button bg-green-500 text-white text-xl font-bold p-4 rounded-xl hover:bg-green-600 transition">
                                    ${option}
                                 </button>`
                            ).join('')}
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            },
            generateWrongOptions: function(correct, count) {
                const options = [];
                while (options.length < count) {
                    let option;
                    if (Math.random() < 0.7) {
                        option = correct + (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 3) + 1);
                    } else {
                        option = Math.floor(Math.random() * 25) + 1;
                    }
                    
                    if (option > 0 && option !== correct && !options.includes(option)) {
                        options.push(option);
                    }
                }
                return options;
            },
            getIllustration: function(item, num1, num2) {
                const icons = {
                    'سیب': '🍎',
                    'کھلونے': '🧸',
                    'کتابیں': '📚',
                    'پنسلیں': '✏️',
                    'پرندے': '🐦',
                    'پھول': '🌸'
                };
                
                const icon = icons[item] || '⭐';
                return Array(num1).fill(icon).join('') + ' + ' + Array(num2).fill(icon).join('');
            }
        });
    }

    // Add similar methods for other categories...
    loadSubtractionExercises() {
        // Implementation for subtraction exercises
    }

    loadMultiplicationExercises() {
        // Implementation for multiplication exercises
    }

    loadFractionExercises() {
        // Implementation for fraction exercises
    }

    loadGeometryExercises() {
        // Implementation for geometry exercises
    }
}

// ===== USAGE EXAMPLES =====

/**
 * HOW TO ADD NEW EXERCISES:
 * 
 * 1. Create your exercise object following the template
 * 2. Register it with the content manager
 * 3. The system automatically integrates it
 */

// Example: Adding a new counting exercise
const newCountingExercise = {
    id: 'counting_by_fives',
    metadata: {
        title: 'پانچ پانچ کرکے گننا',
        description: '5, 10, 15, 20... کی طرح گننا سیکھیں',
        difficulty: 3,
        estimatedTime: 4,
        prerequisites: ['skip_counting_twos'],
        learningObjectives: ['Skip counting by 5s', 'Advanced patterns']
    },
    generator: function() {
        // Exercise generation logic
        const sequence = [5, 10, 15, '?', 25];
        return {
            question: { sequence: sequence },
            correctAnswer: 20,
            options: [15, 20, 25, 30],
            hints: ['پانچ کا اضافہ کریں', 'پیٹرن دیکھیں'],
            explanation: '5 کے skip counting میں ہر بار 5 کا اضافہ ہوتا ہے'
        };
    },
    renderer: function(container, data) {
        // UI rendering logic
        container.innerHTML = `<div class="exercise-content">${JSON.stringify(data)}</div>`;
    },
    validator: function(userAnswer, correctAnswer) {
        return userAnswer === correctAnswer;
    }
};

// Register the new exercise
// const contentManager = new ExerciseContentManager();
// contentManager.registerExercise('counting', newCountingExercise);

// ===== INTEGRATION WITH MAIN PLATFORM =====

/**
 * Modified exercise generation functions for the main platform
 * These replace the existing generation functions in the HTML file
 */

function generateExerciseForSection(sectionName, difficulty = null) {
    const contentManager = window.exerciseContentManager;
    const exercises = contentManager.getExercises(sectionName, difficulty, 1);
    
    if (exercises.length === 0) {
        console.warn(`No exercises found for section: ${sectionName}`);
        return null;
    }
    
    const exercise = exercises[0];
    const exerciseData = exercise.generator();
    
    // Store current exercise for answer checking
    MathPlatform.currentExercises[sectionName] = {
        template: exercise,
        data: exerciseData
    };
    
    // Render the exercise
    const containerMap = {
        'counting': 'countingSection',
        'addition': 'additionSection',
        'subtraction': 'subtractionSection',
        'multiplication': 'multiplicationSection',
        'fractions': 'fractionsSection',
        'geometry': 'geometrySection'
    };
    
    const containerId = containerMap[sectionName];
    if (containerId) {
        const container = document.getElementById(containerId);
        exercise.renderer(container, exerciseData);
    }
    
    return exerciseData;
}

// ===== EXERCISE DATABASE SCHEMA =====

/**
 * For persistent storage, exercises can be stored in JSON format:
 */

const ExerciseDatabase = {
    "counting": [
        {
            "id": "counting_objects_basic",
            "metadata": {
                "title": "بنیادی اشیاء گننا",
                "difficulty": 1,
                "estimatedTime": 2
            },
            "config": {
                "maxCount": 10,
                "objects": ["🍎", "🎾", "⭐"],
                "wrongAnswerRange": 3
            }
        }
    ],
    "addition": [
        {
            "id": "visual_addition_basic",
            "metadata": {
                "title": "visual جمع",
                "difficulty": 1,
                "estimatedTime": 3
            },
            "config": {
                "maxSum": 10,
                "visualObjects": ["🟦", "🟩", "🟨"]
            }
        }
    ]
};

// ===== CONTENT AUTHORING TOOLS =====

/**
 * Helper class for creating exercises with validation
 */
class ExerciseBuilder {
    constructor() {
        this.exercise = {
            metadata: {},
            config: {}
        };
    }

    setId(id) {
        this.exercise.id = id;
        return this;
    }

    setTitle(title) {
        this.exercise.metadata.title = title;
        return this;
    }

    setDifficulty(level) {
        if (level < 1 || level > 5) {
            throw new Error('Difficulty must be between 1 and 5');
        }
        this.exercise.metadata.difficulty = level;
        return this;
    }

    setGenerator(fn) {
        this.exercise.generator = fn;
        return this;
    }

    setRenderer(fn) {
        this.exercise.renderer = fn;
        return this;
    }

    setValidator(fn) {
        this.exercise.validator = fn;
        return this;
    }

    build() {
        // Validate required fields
        const required = ['id', 'generator', 'renderer', 'validator'];
        const missing = required.filter(field => !this.exercise[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        return { ...this.exercise };
    }
}

// Usage example:
/*
const newExercise = new ExerciseBuilder()
    .setId('my_new_exercise')
    .setTitle('میرا نیا ورزش')
    .setDifficulty(2)
    .setGenerator(() => ({ question: 'test', correctAnswer: 42 }))
    .setRenderer((container, data) => { container.innerHTML = data.question; })
    .setValidator((user, correct) => user === correct)
    .build();
*/

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ExerciseContentManager,
        ExerciseBuilder,
        ExerciseTemplate,
        generateExerciseForSection
    };
}