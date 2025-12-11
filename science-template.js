/**
 * Science Exercise Content Template System
 * 
 * Architecture Overview:
 * - Modular template-based content generation
 * - Sindhi language integration throughout
 * - Scalable exercise registration system
 * - Type-safe content validation pipeline
 * - Performance-optimized rendering engine
 */

// ===== CORE ARCHITECTURE =====

/**
 * Science Exercise Template Interface
 * Enforces consistent structure across all science domains
 */
const ScienceExerciseTemplate = {
    // Core identifiers
    id: 'string',                    // Unique exercise identifier
    category: 'string',              // Science domain (biology, chemistry, etc.)
    
    // Localized metadata
    metadata: {
        title: 'string',             // Exercise title (Sindhi)
        description: 'string',       // Learning objective (Sindhi)
        difficulty: 'number',        // 1-5 complexity scale
        estimatedTime: 'number',     // Minutes to complete
        prerequisites: ['array'],    // Required prior knowledge
        learningOutcomes: ['array'], // Educational goals (Sindhi)
        tags: ['array']             // Searchable keywords (Sindhi)
    },
    
    // Content generation engine
    generator: function() {
        return {
            question: {},            // Question data structure
            correctAnswer: {},       // Validation target
            options: [],            // Multiple choice alternatives
            visualElements: {},     // Interactive components
            hints: [],             // Progressive assistance (Sindhi)
            explanation: 'string',  // Solution breakdown (Sindhi)
            followUp: {}           // Extended learning opportunities
        };
    },
    
    // UI rendering pipeline
    renderer: function(container, exerciseData) {
        // DOM manipulation with accessibility compliance
        // Responsive design implementation
        // Animation integration
    },
    
    // Answer validation logic
    validator: function(userInput, correctAnswer) {
        // Multi-format answer acceptance
        // Partial credit algorithms
        // Error pattern analysis
    },
    
    // Interactive element controllers
    interactionHandlers: {
        onSelect: function(element, data) {},
        onDragDrop: function(source, target) {},
        onAnimation: function(trigger) {}
    },
    
    // Performance optimization hooks
    lifecycle: {
        onInit: function() {},
        onRender: function() {},
        onDestroy: function() {}
    }
};

// ===== CONTENT MANAGEMENT ENGINE =====

/**
 * Science Content Registry
 * Centralized exercise storage and retrieval system
 */
class ScienceContentRegistry {
    constructor() {
        this.exercises = new Map();
        this.categories = new Map();
        this.searchIndex = new Map();
        this.performanceMetrics = new Map();
        
        this.initializeCategories();
        this.loadCoreExercises();
    }

    /**
     * Register exercise with validation pipeline
     * @param {string} category - Science domain
     * @param {Object} exercise - Exercise template
     */
    registerExercise(category, exercise) {
        // Structural validation
        this.validateExerciseStructure(exercise);
        
        // Content validation (Sindhi language check)
        this.validateSindhiContent(exercise);
        
        // Category management
        if (!this.categories.has(category)) {
            this.categories.set(category, []);
        }
        
        // Index registration
        this.categories.get(category).push(exercise);
        this.exercises.set(exercise.id, exercise);
        this.updateSearchIndex(exercise);
        
        console.log(`Exercise "${exercise.id}" registered in ${category}`);
    }

    /**
     * Intelligent exercise retrieval
     * @param {string} category - Science domain
     * @param {Object} filters - Selection criteria
     */
    getExercises(category, filters = {}) {
        const categoryExercises = this.categories.get(category) || [];
        
        return categoryExercises
            .filter(exercise => this.applyFilters(exercise, filters))
            .sort((a, b) => this.calculateRelevanceScore(b, filters) - this.calculateRelevanceScore(a, filters))
            .slice(0, filters.limit || 10);
    }

    /**
     * Search exercises by Sindhi keywords
     * @param {string} query - Sindhi search term
     */
    searchExercises(query) {
        const normalizedQuery = this.normalizeSindhiText(query);
        const results = [];
        
        for (const [exerciseId, keywords] of this.searchIndex) {
            const relevanceScore = this.calculateSearchRelevance(normalizedQuery, keywords);
            if (relevanceScore > 0.3) {
                results.push({ exerciseId, relevanceScore });
            }
        }
        
        return results
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .map(result => this.exercises.get(result.exerciseId));
    }

    /**
     * Performance-based exercise selection
     * @param {string} category - Science domain
     * @param {Object} studentMetrics - Performance data
     */
    getAdaptiveExercises(category, studentMetrics) {
        const exercises = this.getExercises(category);
        const adaptedExercises = [];
        
        for (const exercise of exercises) {
            const adaptedDifficulty = this.calculateAdaptiveDifficulty(
                exercise.metadata.difficulty,
                studentMetrics
            );
            
            if (adaptedDifficulty > 0) {
                adaptedExercises.push({
                    ...exercise,
                    adaptedDifficulty
                });
            }
        }
        
        return adaptedExercises.sort((a, b) => b.adaptedDifficulty - a.adaptedDifficulty);
    }

    // ===== VALIDATION PIPELINE =====

    validateExerciseStructure(exercise) {
        const requiredFields = ['id', 'category', 'metadata', 'generator', 'renderer', 'validator'];
        const missingFields = requiredFields.filter(field => !(field in exercise));
        
        if (missingFields.length > 0) {
            throw new Error(`Exercise validation failed. Missing: ${missingFields.join(', ')}`);
        }
        
        if (!exercise.metadata.title || !this.isSindhiText(exercise.metadata.title)) {
            throw new Error('Exercise title must be in Sindhi');
        }
        
        if (exercise.metadata.difficulty < 1 || exercise.metadata.difficulty > 5) {
            throw new Error('Difficulty must be between 1 and 5');
        }
    }

    validateSindhiContent(exercise) {
        const sindhiFields = [
            'metadata.title',
            'metadata.description',
            'metadata.learningOutcomes'
        ];
        
        for (const fieldPath of sindhiFields) {
            const value = this.getNestedValue(exercise, fieldPath);
            if (value && !this.isSindhiText(value)) {
                console.warn(`Non-Sindhi content detected in ${fieldPath}`);
            }
        }
    }

    isSindhiText(text) {
        // Sindhi Unicode range detection
        const sindhiPattern = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F]/;
        return sindhiPattern.test(text) || /^[a-zA-Z\s]*$/.test(text); // Allow English for technical terms
    }

    // ===== CONTENT INITIALIZATION =====

    initializeCategories() {
        const scienceCategories = [
            'biology',     // جیون سائنس
            'plants',      // ٻوٽن جي دنیا  
            'humanBody',   // انساني جسم
            'weather',     // موسمیات
            'space',       // خلائي علوم
            'chemistry',   // کیمیا
            'physics',     // طبیعیات
            'environment'  // ماحولیات
        ];
        
        scienceCategories.forEach(category => {
            this.categories.set(category, []);
        });
    }

    loadCoreExercises() {
        this.loadBiologyExercises();
        this.loadPlantsExercises();
        this.loadHumanBodyExercises();
        this.loadWeatherExercises();
        this.loadSpaceExercises();
        this.loadChemistryExercises();
        this.loadPhysicsExercises();
        this.loadEnvironmentExercises();
    }

    // ===== BIOLOGY EXERCISES =====

    loadBiologyExercises() {
        // Animal Classification Exercise
        this.registerExercise('biology', {
            id: 'animal_classification_basic',
            category: 'biology',
            metadata: {
                title: 'جانورن جي درجابندي',
                description: 'مختلف قسم جا جانور پہچاڻڻ سیکھیں',
                difficulty: 1,
                estimatedTime: 4,
                prerequisites: [],
                learningOutcomes: [
                    'پالتو ۽ جهنگلي جانورن ۾ فرق',
                    'جانورن جا مختلف گروپ',
                    'جانورن جا رهڻ جا علائقا'
                ],
                tags: ['جانور', 'درجابندي', 'پالتو', 'جهنگلي']
            },
            generator: function() {
                const animalCategories = {
                    domestic: {
                        animals: [
                            { name: 'ڪتو', emoji: '🐕', habitat: 'گھر' },
                            { name: 'ٻلي', emoji: '🐱', habitat: 'گھر' },
                            { name: 'گاهه', emoji: '🐄', habitat: 'فارم' },
                            { name: 'ڀتو', emoji: '🐑', habitat: 'فارم' }
                        ],
                        type: 'پالتو جانور',
                        description: 'انساني ڪنٽرول ۾ رهندڙ جانور'
                    },
                    wild: {
                        animals: [
                            { name: 'شیر', emoji: '🦁', habitat: 'جنگل' },
                            { name: 'هاٿي', emoji: '🐘', habitat: 'جنگل' },
                            { name: 'رڇ', emoji: '🐻', habitat: 'جنگل' },
                            { name: 'بگھڙ', emoji: '🐅', habitat: 'جنگل' }
                        ],
                        type: 'جهنگلي جانور',
                        description: 'قدرتي ماحول ۾ رهندڙ جانور'
                    },
                    aquatic: {
                        animals: [
                            { name: 'مڇي', emoji: '🐠', habitat: 'پاڻي' },
                            { name: 'وھیل', emoji: '🐋', habitat: 'سمندر' },
                            { name: 'شارڪ', emoji: '🦈', habitat: 'سمندر' },
                            { name: 'ڊولفن', emoji: '🐬', habitat: 'سمندر' }
                        ],
                        type: 'پاڻي جا جانور',
                        description: 'پاڻي ۾ رهندڙ جانور'
                    },
                    flying: {
                        animals: [
                            { name: 'پرندو', emoji: '🦅', habitat: 'آسمان' },
                            { name: 'طوطا', emoji: '🦜', habitat: 'وڻ' },
                            { name: 'ڪبوتر', emoji: '🕊️', habitat: 'عمارت' },
                            { name: 'چمگادڙ', emoji: '🦇', habitat: 'غار' }
                        ],
                        type: 'اڏامندڙ جانور',
                        description: 'هوا ۾ اڏامندڙ جانور'
                    }
                };
                
                const categoryKeys = Object.keys(animalCategories);
                const selectedCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
                const category = animalCategories[selectedCategory];
                const selectedAnimal = category.animals[Math.floor(Math.random() * category.animals.length)];
                
                // Generate wrong options from other categories
                const wrongOptions = [];
                for (const [catKey, catData] of Object.entries(animalCategories)) {
                    if (catKey !== selectedCategory) {
                        wrongOptions.push(catData.type);
                    }
                }
                
                const allOptions = [category.type, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: `${selectedAnimal.emoji} ${selectedAnimal.name} ڪهڙي قسم جو جانور آهي؟`,
                        animal: selectedAnimal,
                        category: category
                    },
                    correctAnswer: selectedCategory,
                    options: allOptions,
                    visualElements: {
                        animalDisplay: selectedAnimal.emoji,
                        categories: animalCategories
                    },
                    hints: [
                        `هي جانور ڪٿي رهي ٿو؟ ${selectedAnimal.habitat} ۾`,
                        `${category.description} جي باري ۾ سوچيو`,
                        `${category.type} جا خاص نشان ڇا آهن؟`
                    ],
                    explanation: `${selectedAnimal.name} هڪ ${category.type} آهي ڇاڪاڻ ته اهو ${selectedAnimal.habitat} ۾ رهي ٿو ۽ ${category.description}`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="exercise-content">
                        <h3 class="text-xl font-bold mb-6 text-center">${data.question.text}</h3>
                        
                        <div class="text-center mb-6">
                            <div class="text-8xl mb-4 bounce-in">${data.question.animal.emoji}</div>
                            <p class="text-lg font-bold text-blue-600">${data.question.animal.name}</p>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            ${Object.entries(data.visualElements.categories).map(([key, category]) => `
                                <div class="organism-card bg-${this.getCategoryColor(key)}-100 p-4 rounded-xl text-center cursor-pointer" 
                                     onclick="selectAnimalCategory('${key}', this, '${data.correctAnswer}')">
                                    <div class="text-4xl mb-2">${category.animals[0].emoji}</div>
                                    <p class="font-bold text-sm">${category.type}</p>
                                    <p class="text-xs text-gray-600">${category.description}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="text-center">
                            <div id="biologyFeedback" class="hidden p-4 rounded-xl">
                                <p id="biologyResult" class="text-lg font-bold"></p>
                            </div>
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            },
            getCategoryColor: function(category) {
                const colors = {
                    domestic: 'blue',
                    wild: 'green', 
                    aquatic: 'cyan',
                    flying: 'purple'
                };
                return colors[category] || 'gray';
            }
        });

        // Animal Habitat Matching Exercise
        this.registerExercise('biology', {
            id: 'animal_habitat_matching',
            category: 'biology',
            metadata: {
                title: 'جانورن جا گھر',
                description: 'جانور ڪٿي رهن ٿا اهو سیکھیں',
                difficulty: 2,
                estimatedTime: 5,
                prerequisites: ['animal_classification_basic'],
                learningOutcomes: [
                    'جانورن جا قدرتي رهڻ جا هنڌ',
                    'ماحول ۽ جانورن جو رشتو',
                    'مختلف رهڻ جي جڳهن جي خاصيتون'
                ],
                tags: ['جانور', 'رهڻ جي جڳه', 'ماحول', 'قدرت']
            },
            generator: function() {
                const habitatData = {
                    forest: {
                        name: 'جنگل',
                        emoji: '🌲',
                        animals: ['شیر', 'هاٿي', 'بندر', 'رڇ'],
                        features: ['وڻ', 'گھاهه', 'جهنگلي ميوا', 'پاڻي جا ذريعا']
                    },
                    ocean: {
                        name: 'سمندر',
                        emoji: '🌊',
                        animals: ['وھیل', 'شارڪ', 'مڇي', 'ڊولفن'],
                        features: ['کاري پاڻي', 'لوڻ', 'مرجان', 'سامونڊي ٻوٽا']
                    },
                    farm: {
                        name: 'فارم',
                        emoji: '🚜',
                        animals: ['گاهه', 'ڀتو', 'مرغي', 'بتھ'],
                        features: ['گھاهه جا پارا', 'پاڻي جا ڪهڻ', 'انسانن جي دیکھ ڀال', 'محفوظ ماحول']
                    },
                    desert: {
                        name: 'ريگستان',
                        emoji: '🏜️',
                        animals: ['اٺ', 'نانگ', 'لومڙ', 'بچھو'],
                        features: ['ريت', 'گرم موسم', 'گهٽ پاڻي', 'کرجون']
                    }
                };
                
                const habitats = Object.keys(habitatData);
                const selectedHabitat = habitats[Math.floor(Math.random() * habitats.length)];
                const habitat = habitatData[selectedHabitat];
                const selectedAnimal = habitat.animals[Math.floor(Math.random() * habitat.animals.length)];
                
                // Create matching pairs for other animals
                const matchingPairs = [];
                for (const [habitatKey, habitatInfo] of Object.entries(habitatData)) {
                    const randomAnimal = habitatInfo.animals[Math.floor(Math.random() * habitatInfo.animals.length)];
                    matchingPairs.push({
                        animal: randomAnimal,
                        habitat: habitatInfo.name,
                        correct: habitatKey === selectedHabitat && randomAnimal === selectedAnimal
                    });
                }
                
                return {
                    question: {
                        text: `${selectedAnimal} ڪٿي رهي ٿو؟`,
                        animal: selectedAnimal,
                        correctHabitat: habitat.name
                    },
                    correctAnswer: selectedHabitat,
                    options: Object.values(habitatData).map(h => h.name),
                    visualElements: {
                        habitats: habitatData,
                        matchingPairs: matchingPairs
                    },
                    hints: [
                        `${selectedAnimal} جي قدرتي ضرورتن جي باري ۾ سوچيو`,
                        `هن جانور کي ڪهڙي قسم جو کاڌو ۽ پاڻي گھربو آهي؟`,
                        `${habitat.features.join(', ')} ڪهڙي جڳه تي ملندا آهن؟`
                    ],
                    explanation: `${selectedAnimal} ${habitat.name} ۾ رهي ٿو ڇاڪاڻ ته اتي ${habitat.features.join(', ')} موجود آهن`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="exercise-content">
                        <h3 class="text-xl font-bold mb-6 text-center">${data.question.text}</h3>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            ${Object.entries(data.visualElements.habitats).map(([key, habitat]) => `
                                <div class="habitat-card bg-green-100 p-4 rounded-xl text-center cursor-pointer hover:bg-green-200 transition" 
                                     onclick="selectHabitat('${key}', this, '${data.correctAnswer}')">
                                    <div class="text-6xl mb-2">${habitat.emoji}</div>
                                    <p class="font-bold">${habitat.name}</p>
                                    <div class="text-sm mt-2">
                                        ${habitat.features.slice(0, 2).map(feature => 
                                            `<span class="bg-white px-2 py-1 rounded text-xs mr-1">${feature}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="text-center">
                            <div id="habitatFeedback" class="hidden p-4 rounded-xl">
                                <p id="habitatResult" class="text-lg font-bold"></p>
                            </div>
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            }
        });
    }

    // ===== PLANTS EXERCISES =====

    loadPlantsExercises() {
        // Plant Parts Identification
        this.registerExercise('plants', {
            id: 'plant_parts_identification',
            category: 'plants',
            metadata: {
                title: 'ٻوٽي جا حصا',
                description: 'ٻوٽن جا مختلف حصا ۽ سندن ڪم',
                difficulty: 1,
                estimatedTime: 4,
                prerequisites: [],
                learningOutcomes: [
                    'ٻوٽن جا بنيادي حصا سڃاڻڻ',
                    'هر حصي جو ڪم سمجھڻ',
                    'ٻوٽن جي بنياد گھرجن'
                ],
                tags: ['ٻوٽا', 'حصا', 'جڙ', 'تنا', 'پنا', 'گل']
            },
            generator: function() {
                const plantParts = {
                    roots: {
                        name: 'جڙ',
                        emoji: '🌱',
                        function: 'پاڻي ۽ معدنيات جذب ڪري ٿي',
                        location: 'زمين جي هيٺان',
                        importance: 'ٻوٽي کي مضبوط رکي ٿي ۽ غذا فراهم ڪري ٿي'
                    },
                    stem: {
                        name: 'تنا',
                        emoji: '🌿',
                        function: 'پاڻي ۽ غذا کڻي پهچائي ٿو',
                        location: 'جڙ ۽ پنن جي وچ ۾',
                        importance: 'ٻوٽي کي سيڌو رکي ٿو ۽ نقل و حمل ڪري ٿو'
                    },
                    leaves: {
                        name: 'پنا',
                        emoji: '🍃',
                        function: 'کاڌو ٺاهين ٿا ۽ سانس وٺن ٿا',
                        location: 'تني تي لڳل',
                        importance: 'سج جي روشني سان کاڌو ٺاهين ٿا'
                    },
                    flowers: {
                        name: 'گل',
                        emoji: '🌸',
                        function: 'ٻج ٺاهين ٿا',
                        location: 'شاخن جي آخر ۾',
                        importance: 'نسل وڌائڻ لاءِ ضروري آهن'
                    },
                    fruits: {
                        name: 'ميوا',
                        emoji: '🍎',
                        function: 'ٻج جي حفاظت ڪن ٿا',
                        location: 'گلن جي بعد',
                        importance: 'ٻج کي محفوظ رکي ٿا ۽ پکيڙن ٿا'
                    }
                };
                
                const partKeys = Object.keys(plantParts);
                const selectedPart = partKeys[Math.floor(Math.random() * partKeys.length)];
                const part = plantParts[selectedPart];
                
                const questionTypes = [
                    `${part.emoji} هي ٻوٽي جو ڪهڙو حصو آهي؟`,
                    `ڪهڙو حصو ${part.function}؟`,
                    `${part.name} جو بنيادي ڪم ڪهڙو آهي؟`
                ];
                
                const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];
                
                // Generate options
                const wrongOptions = partKeys
                    .filter(key => key !== selectedPart)
                    .map(key => plantParts[key].name)
                    .slice(0, 3);
                
                const allOptions = [part.name, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: selectedQuestion,
                        part: part,
                        type: selectedPart
                    },
                    correctAnswer: selectedPart,
                    options: allOptions,
                    visualElements: {
                        plantParts: plantParts,
                        selectedPart: part
                    },
                    hints: [
                        `هي حصو ${part.location} هوندو آهي`,
                        `ان جو ڪم ${part.function}`,
                        `${part.importance}`
                    ],
                    explanation: `${part.name} ٻوٽي جو اهم حصو آهي ڇاڪاڻ ته ${part.importance}`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="exercise-content">
                        <h3 class="text-xl font-bold mb-6 text-center">${data.question.text}</h3>
                        
                        <div class="text-center mb-6">
                            <div class="relative inline-block">
                                <div class="text-9xl mb-4">🌳</div>
                                <!-- Interactive plant parts -->
                                ${Object.entries(data.visualElements.plantParts).map(([key, part]) => `
                                    <div class="absolute ${this.getPartPosition(key)} body-part cursor-pointer" 
                                         data-part="${key}" onclick="selectPlantPart('${key}', this, '${data.correctAnswer}')">
                                        <div class="w-6 h-6 bg-green-500 rounded-full hover:scale-150 transition ${key === data.question.type ? 'ring-4 ring-yellow-400' : ''}">
                                            <span class="text-xs">${part.emoji}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto">
                            ${data.options.map(option => `
                                <button onclick="checkPlantPart('${option}', '${data.question.part.name}')" 
                                        class="experiment-button bg-green-500 text-white text-lg font-bold p-3 rounded-xl hover:bg-green-600 transition">
                                    ${option}
                                </button>
                            `).join('')}
                        </div>
                        
                        <div class="text-center mt-4">
                            <div id="plantPartInfo" class="hidden p-4 bg-green-50 rounded-xl">
                                <h4 class="font-bold text-lg mb-2">${data.question.part.name}</h4>
                                <p class="text-gray-700">${data.question.part.function}</p>
                            </div>
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            },
            getPartPosition: function(part) {
                const positions = {
                    roots: 'bottom-0 left-1/2 transform -translate-x-1/2',
                    stem: 'bottom-1/4 left-1/2 transform -translate-x-1/2',
                    leaves: 'top-1/3 left-1/4',
                    flowers: 'top-1/4 right-1/4',
                    fruits: 'top-1/2 right-1/3'
                };
                return positions[part] || 'top-1/2 left-1/2';
            }
        });

        // Plant Growth Needs Exercise
        this.registerExercise('plants', {
            id: 'plant_growth_needs',
            category: 'plants',
            metadata: {
                title: 'ٻوٽن جون ضرورتون',
                description: 'ٻوٽن کي وڌڻ لاءِ ڇا گھربو آهي',
                difficulty: 2,
                estimatedTime: 5,
                prerequisites: ['plant_parts_identification'],
                learningOutcomes: [
                    'ٻوٽن جيون بنيادي ضرورتون',
                    'photosynthesis جو بنيادي تصور',
                    'ٻوٽن جي دیکھ ڀال'
                ],
                tags: ['ٻوٽا', 'ضرورتون', 'سج', 'پاڻي', 'هوا', 'مٽي']
            },
            generator: function() {
                const plantNeeds = {
                    sunlight: {
                        name: 'سج جي روشني',
                        emoji: '☀️',
                        purpose: 'کاڌو ٺاهڻ لاءِ (photosynthesis)',
                        effect: 'ٻوٽي کي طاقت ڏئي ٿي',
                        withoutIt: 'ٻوٽو پيلو ٿي وڃي ٿو'
                    },
                    water: {
                        name: 'پاڻي',
                        emoji: '💧',
                        purpose: 'جسم ۾ غذا پهچائڻ لاءِ',
                        effect: 'ٻوٽي کي تازو رکي ٿو',
                        withoutIt: 'ٻوٽو سڪي وڃي ٿو'
                    },
                    air: {
                        name: 'صاف هوا',
                        emoji: '🌬️',
                        purpose: 'سانس وٺڻ ۽ carbon dioxide لاءِ',
                        effect: 'صحتمند نشوونما',
                        withoutIt: 'ٻوٽو بيمار ٿي وڃي ٿو'
                    },
                    soil: {
                        name: 'زرخيز مٽي',
                        emoji: '🌱',
                        purpose: 'معدنيات ۽ غذائي اجزاء لاءِ',
                        effect: 'مضبوط جڙون',
                        withoutIt: 'ٻوٽو کمزور رهي ٿو'
                    }
                };
                
                const needKeys = Object.keys(plantNeeds);
                const selectedNeed = needKeys[Math.floor(Math.random() * needKeys.length)];
                const need = plantNeeds[selectedNeed];
                
                const questionTypes = [
                    `ٻوٽن کي ${need.purpose} لاءِ ڇا گھربو آهي؟`,
                    `${need.emoji} هي ٻوٽن لاءِ ڇو ضروري آهي؟`,
                    `ٻوٽي کي ${need.effect} لاءِ ڪهڙي شيءِ گھربي آهي؟`
                ];
                
                const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];
                
                // Generate wrong options
                const wrongOptions = needKeys
                    .filter(key => key !== selectedNeed)
                    .map(key => plantNeeds[key].name)
                    .slice(0, 3);
                
                const allOptions = [need.name, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: selectedQuestion,
                        need: need,
                        type: selectedNeed
                    },
                    correctAnswer: selectedNeed,
                    options: allOptions,
                    visualElements: {
                        plantNeeds: plantNeeds,
                        selectedNeed: need
                    },
                    hints: [
                        `${need.purpose} جي باري ۾ سوچيو`,
                        `ٻوٽي کي ${need.effect} ڇو ضروري آهي؟`,
                        `جيڪڏهن ${need.name} نه هجي ته ${need.withoutIt}`
                    ],
                    explanation: `${need.name} ٻوٽن لاءِ ضروري آهي ڇاڪاڻ ته ${need.purpose} ۽ ${need.effect}`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="exercise-content">
                        <h3 class="text-xl font-bold mb-6 text-center">${data.question.text}</h3>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            ${Object.entries(data.visualElements.plantNeeds).map(([key, need]) => `
                                <div class="need-card bg-green-100 p-4 rounded-xl text-center cursor-pointer hover:bg-green-200 transition ${key === data.question.type ? 'ring-4 ring-yellow-400' : ''}" 
                                     onclick="selectPlantNeed('${key}', this, '${data.correctAnswer}')">
                                    <div class="text-4xl mb-2">${need.emoji}</div>
                                    <p class="font-bold text-sm">${need.name}</p>
                                    <p class="text-xs text-gray-600 mt-1">${need.purpose}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="text-center">
                            <div id="plantNeedFeedback" class="hidden p-4 rounded-xl">
                                <p id="plantNeedResult" class="text-lg font-bold"></p>
                            </div>
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            }
        });
    }

    // ===== HUMAN BODY EXERCISES =====

    loadHumanBodyExercises() {
        // Body Systems Exercise
        this.registerExercise('humanBody', {
            id: 'body_systems_functions',
            category: 'humanBody',
            metadata: {
                title: 'جسم جا نظام',
                description: 'انساني جسم جا مختلف نظام ۽ سندن ڪم',
                difficulty: 2,
                estimatedTime: 6,
                prerequisites: [],
                learningOutcomes: [
                    'جسم جا بنيادي نظام',
                    'هر نظام جو خاص ڪم',
                    'نظامن جي پاڻ ۾ تعاون'
                ],
                tags: ['جسم', 'نظام', 'دل', 'دماغ', 'ڦڦڙا', 'هضمي نظام']
            },
            generator: function() {
                const bodySystems = {
                    circulatory: {
                        name: 'رت جو نظام',
                        emoji: '❤️',
                        mainOrgan: 'دل',
                        function: 'سڄي جسم ۾ رت پهچائي ٿو',
                        importance: 'آڪسيجن ۽ غذا سڀني حصن تائين پهچائي ٿو',
                        parts: ['دل', 'رت جون نالیاں', 'رت']
                    },
                    respiratory: {
                        name: 'سانس وارو نظام',
                        emoji: '🫁',
                        mainOrgan: 'ڦڦڙا',
                        function: 'آڪسيجن وٺي ٿو ۽ carbon dioxide ڪڍي ٿو',
                        importance: 'جسم کي صاف آڪسيجن فراهم ڪري ٿو',
                        parts: ['ڦڦڙا', 'ناک', 'ڳلي جي نلي']
                    },
                    digestive: {
                        name: 'هضمي نظام',
                        emoji: '🍽️',
                        mainOrgan: 'پيٽ',
                        function: 'کاڌي کي هضم ڪري طاقت ٺاهي ٿو',
                        importance: 'جسم کي غذا ۽ طاقت فراهم ڪري ٿو',
                        parts: ['پيٽ', 'آنڌريون', 'جگر']
                    },
                    nervous: {
                        name: 'اعصابي نظام',
                        emoji: '🧠',
                        mainOrgan: 'دماغ',
                        function: 'سوچڻ، ياد رکڻ ۽ جسم کي ڪنٽرول ڪري ٿو',
                        importance: 'سڄي جسم جو کپتان آهي',
                        parts: ['دماغ', 'ريڙهه جي هڊي', 'اعصاب']
                    },
                    skeletal: {
                        name: 'هڏن جو نظام',
                        emoji: '🦴',
                        mainOrgan: 'هڏيون',
                        function: 'جسم کي سهارو ۽ شڪل ڏئي ٿو',
                        importance: 'جسم کي مضبوط ۽ بچايل رکي ٿو',
                        parts: ['هڏيون', 'جوڙ', 'cartilage']
                    }
                };
                
                const systemKeys = Object.keys(bodySystems);
                const selectedSystem = systemKeys[Math.floor(Math.random() * systemKeys.length)];
                const system = bodySystems[selectedSystem];
                
                const questionTypes = [
                    `ڪهڙو نظام ${system.function}؟`,
                    `${system.emoji} هي ڪهڙي نظام جي علامت آهي؟`,
                    `${system.mainOrgan} ڪهڙي نظام جو بنيادي حصو آهي؟`
                ];
                
                const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];
                
                // Generate options
                const wrongOptions = systemKeys
                    .filter(key => key !== selectedSystem)
                    .map(key => bodySystems[key].name)
                    .slice(0, 3);
                
                const allOptions = [system.name, ...wrongOptions].sort(() => Math.random() - 0.5);
                
                return {
                    question: {
                        text: selectedQuestion,
                        system: system,
                        type: selectedSystem
                    },
                    correctAnswer: selectedSystem,
                    options: allOptions,
                    visualElements: {
                        bodySystems: bodySystems,
                        selectedSystem: system
                    },
                    hints: [
                        `${system.mainOrgan} جي باري ۾ سوچيو`,
                        `هن نظام جو ڪم آهي: ${system.function}`,
                        `${system.importance}`
                    ],
                    explanation: `${system.name} جو بنيادي ڪم ${system.function} آهي ۽ ${system.importance}`
                };
            },
            renderer: function(container, data) {
                container.innerHTML = `
                    <div class="exercise-content">
                        <h3 class="text-xl font-bold mb-6 text-center">${data.question.text}</h3>
                        
                        <div class="text-center mb-6">
                            <div class="text-8xl mb-4">🧍‍♂️</div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            ${Object.entries(data.visualElements.bodySystems).map(([key, system]) => `
                                <div class="body-system-card bg-red-100 p-4 rounded-xl text-center cursor-pointer hover:bg-red-200 transition ${key === data.question.type ? 'ring-4 ring-yellow-400' : ''}" 
                                     onclick="selectBodySystem('${key}', this, '${data.correctAnswer}')">
                                    <div class="text-4xl mb-2">${system.emoji}</div>
                                    <p class="font-bold text-sm">${system.name}</p>
                                    <p class="text-xs text-gray-600 mt-1">${system.mainOrgan}</p>
                                    <div class="mt-2">
                                        ${system.parts.slice(0, 2).map(part => 
                                            `<span class="bg-white px-2 py-1 rounded text-xs mr-1">${part}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="text-center">
                            <div id="bodySystemFeedback" class="hidden p-4 rounded-xl">
                                <p id="bodySystemResult" class="text-lg font-bold"></p>
                            </div>
                        </div>
                    </div>
                `;
            },
            validator: function(userAnswer, correctAnswer) {
                return userAnswer === correctAnswer;
            }
        });
    }

    // ===== ADDITIONAL EXERCISE LOADERS =====

    loadWeatherExercises() {
        // Weather patterns, seasons, water cycle exercises
    }

    loadSpaceExercises() {
        // Solar system, planets, day/night cycle exercises  
    }

    loadChemistryExercises() {
        // States of matter, simple reactions, mixtures exercises
    }

    loadPhysicsExercises() {
        // Forces, motion, simple machines exercises
    }

    loadEnvironmentExercises() {
        // Pollution, conservation, ecosystems exercises
    }

    // ===== UTILITY METHODS =====

    applyFilters(exercise, filters) {
        if (filters.difficulty && exercise.metadata.difficulty !== filters.difficulty) {
            return false;
        }
        
        if (filters.maxTime && exercise.metadata.estimatedTime > filters.maxTime) {
            return false;
        }
        
        if (filters.tags && !filters.tags.some(tag => exercise.metadata.tags.includes(tag))) {
            return false;
        }
        
        return true;
    }

    calculateRelevanceScore(exercise, filters) {
        let score = 0;
        
        if (filters.preferredDifficulty) {
            const diffDelta = Math.abs(exercise.metadata.difficulty - filters.preferredDifficulty);
            score += Math.max(0, 5 - diffDelta);
        }
        
        if (filters.tags) {
            const tagMatches = filters.tags.filter(tag => exercise.metadata.tags.includes(tag)).length;
            score += tagMatches * 2;
        }
        
        return score;
    }

    calculateAdaptiveDifficulty(baseDifficulty, studentMetrics) {
        const accuracy = studentMetrics.correct / Math.max(studentMetrics.total, 1);
        const adjustmentFactor = accuracy > 0.8 ? 1.2 : accuracy < 0.6 ? 0.8 : 1.0;
        
        return Math.max(1, Math.min(5, baseDifficulty * adjustmentFactor));
    }

    normalizeSindhiText(text) {
        return text.toLowerCase().trim().replace(/\s+/g, ' ');
    }

    calculateSearchRelevance(query, keywords) {
        const matches = keywords.filter(keyword => 
            keyword.includes(query) || query.includes(keyword)
        ).length;
        
        return matches / keywords.length;
    }

    updateSearchIndex(exercise) {
        const keywords = [
            exercise.metadata.title,
            exercise.metadata.description,
            ...exercise.metadata.tags,
            ...exercise.metadata.learningOutcomes
        ].filter(Boolean);
        
        this.searchIndex.set(exercise.id, keywords);
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
}

// ===== INTEGRATION INTERFACE =====

/**
 * Exercise Generation Interface
 * Replaces existing generation functions in main HTML
 */
function generateScienceExercise(category, difficulty = null) {
    const contentRegistry = window.scienceContentRegistry;
    const exercises = contentRegistry.getExercises(category, { difficulty, limit: 1 });
    
    if (exercises.length === 0) {
        console.warn(`No exercises available for category: ${category}`);
        return null;
    }
    
    const exercise = exercises[0];
    const exerciseData = exercise.generator();
    
    // Store for answer validation
    SciencePlatform.currentExercises[category] = {
        template: exercise,
        data: exerciseData
    };
    
    // Render exercise
    const containerMap = {
        'biology': 'biologySection',
        'plants': 'plantsSection', 
        'humanBody': 'humanBodySection',
        'weather': 'weatherSection',
        'space': 'spaceSection',
        'chemistry': 'chemistrySection',
        'physics': 'physicsSection',
        'environment': 'environmentSection'
    };
    
    const containerId = containerMap[category];
    if (containerId) {
        const container = document.getElementById(containerId);
        exercise.renderer(container, exerciseData);
    }
    
    return exerciseData;
}

// ===== GLOBAL INTEGRATION =====

/**
 * Initialize content registry on page load
 * Add to main HTML script section:
 */

/*
window.scienceContentRegistry = new ScienceContentRegistry();

// Replace existing generation functions
function generateBiologyExercise() {
    generateScienceExercise('biology', SciencePlatform.levels.biology);
}

function generatePlantsExercise() {
    generateScienceExercise('plants', SciencePlatform.levels.plants);
}

function generateHumanBodyExercise() {
    generateScienceExercise('humanBody', SciencePlatform.levels.humanBody);
}

// Continue for other categories...
*/

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScienceContentRegistry,
        ScienceExerciseTemplate,
        generateScienceExercise
    };
}

// ===== USAGE DOCUMENTATION =====

/**
 * Adding New Exercises - Implementation Pattern:
 * 
 * const newExercise = {
 *     id: 'unique_exercise_id',
 *     category: 'biology',
 *     metadata: {
 *         title: 'سندھي ۾ عنوان',
 *         description: 'مقصد جي وضاحت',
 *         difficulty: 2,
 *         estimatedTime: 5,
 *         prerequisites: ['previous_exercise_id'],
 *         learningOutcomes: ['سکيا هوندو...'],
 *         tags: ['ڪلیدي لفظ']
 *     },
 *     generator: function() {
 *         return {
 *             question: { text: 'سوال متن' },
 *             correctAnswer: 'correct_value',
 *             options: ['option1', 'option2'],
 *             hints: ['اشارو ١', 'اشارو ٢'],
 *             explanation: 'تفصيلي وضاحت'
 *         };
 *     },
 *     renderer: function(container, data) {
 *         container.innerHTML = `<div>${data.question.text}</div>`;
 *     },
 *     validator: function(user, correct) {
 *         return user === correct;
 *     }
 * };
 * 
 * window.scienceContentRegistry.registerExercise('biology', newExercise);
 */