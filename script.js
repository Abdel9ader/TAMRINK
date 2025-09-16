
    /*===============> Data storage and initialization </*>===============*/
        let exercises = [];
        let currentSplit = 'ppl';
        let currentDay = 'push';
        let editingExerciseId = null;
        let pendingAction = null;

        /*===============> DOM Elements <===============*/
        const homePage = document.getElementById('homePage');
        const homeLogo = document.getElementById('homeLogo');
        const themeToggle = document.getElementById('themeToggle');
        const exerciseModal = document.getElementById('exerciseModal');
        const historyModal = document.getElementById('historyModal');
        const exerciseForm = document.getElementById('exerciseForm');
        const modalTitle = document.getElementById('modalTitle');
        const cancelBtn = document.getElementById('cancelBtn');
        const closeHistoryBtn = document.getElementById('closeHistoryBtn');
        const imageUpload = document.getElementById('imageUpload');
        const imageUploadContainer = document.getElementById('imageUploadContainer');
        const imageUrl = document.getElementById('imageUrl');
        const imagePreview = document.getElementById('imagePreview');
        const exerciseCategory = document.getElementById('exerciseCategory');
        const confirmationModal = document.getElementById('confirmationModal');
        const confirmCancelBtn = document.getElementById('confirmCancelBtn');
        const confirmActionBtn = document.getElementById('confirmActionBtn');
        const confirmationTitle = document.getElementById('confirmationTitle');
        const confirmationMessage = document.getElementById('confirmationMessage');
        const popupNotification = document.getElementById('popupNotification');
        const popupMessage = document.getElementById('popupMessage');
        const exerciseNameLabel = document.getElementById('exerciseNameLabel');
        const newWeightInput = document.getElementById('newWeightInput');

        /*===============> Page navigation elements <===============*/
        const pages = document.querySelectorAll('.page');
        const pplPage = document.getElementById('ppl-page');
        const arnoldPage = document.getElementById('arnold-page');
        const upperlowerPage = document.getElementById('upperlower-page');
        const pplBackBtn = document.getElementById('pplBackBtn');
        const arnoldBackBtn = document.getElementById('arnoldBackBtn');
        const upperlowerBackBtn = document.getElementById('upperlowerBackBtn');

        /*===============> Initialize the application <===============*/
        function init() {
            /*===============> Load theme preference <===============*/
            const darkMode = localStorage.getItem('darkMode') === 'true';
            if (darkMode) {
                document.body.classList.add('dark-mode');
                updateThemeToggle();
            }
            
            // Load exercises from localStorage
            loadExercises();
            
            // Animate split tabs
            animateSplitTabs();
            renderHomePage();
            setupEventListeners();
            updateOverallChart();
        }

        // Load exercises from localStorage
        function loadExercises() {
            const storedExercises = localStorage.getItem('exercises');
            
            if (storedExercises) {
                try {
                    exercises = JSON.parse(storedExercises);
                } catch (e) {
                    console.error('Error parsing exercises from localStorage:', e);
                    exercises = [];
                }
            }
            
            // Add sample data if none exists
            if (exercises.length === 0) {
                exercises = [
                    // PPL Exercises
                    {
                        id: '1',
                        name: 'Bench Press',
                        split: 'ppl',
                        day: 'push',
                        currentWeight: 70,
                        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlbmNoJTIwcHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-01', weight: 65 },
                            { date: '2023-08-08', weight: 67.5 },
                            { date: '2023-08-15', weight: 70 }
                        ],
                        lastUpdated: '2023-08-15'
                    },
                    {
                        id: '2',
                        name: 'Squat',
                        split: 'ppl',
                        day: 'legs',
                        currentWeight: 100,
                        image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNxdWF0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-02', weight: 90 },
                            { date: '2023-08-09', weight: 95 },
                            { date: '2023-08-16', weight: 100 }
                        ],
                        lastUpdated: '2023-08-16'
                    },
                    {
                        id: '3',
                        name: 'Deadlift',
                        split: 'ppl',
                        day: 'pull',
                        currentWeight: 120,
                        image: 'https://images.unsplash.com/photo-1634224143532-6347d4fad4c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlYWRsaWZ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-03', weight: 110 },
                            { date: '2023-08-10', weight: 115 },
                            { date: '2023-08-17', weight: 120 }
                        ],
                        lastUpdated: '2023-08-17'
                    },
                    // Arnold Split Exercises
                    {
                        id: '4',
                        name: 'Incline Dumbbell Press',
                        split: 'arnold',
                        day: 'chest-back',
                        currentWeight: 32.5,
                        image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHVtYmJlbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-04', weight: 30 },
                            { date: '2023-08-11', weight: 32.5 }
                        ],
                        lastUpdated: '2023-08-11'
                    },
                    {
                        id: '5',
                        name: 'Military Press',
                        split: 'arnold',
                        day: 'shoulders-arms',
                        currentWeight: 50,
                        image: 'https://images.unsplash.com/photo-1599058917765-2adfff8f3e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG92ZXJoZWFkJTIwcHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-05', weight: 45 },
                            { date: '2023-08-12', weight: 50 }
                        ],
                        lastUpdated: '2023-08-12'
                    },
                    // Upper/Lower Split Exercises
                    {
                        id: '6',
                        name: 'Overhead Press',
                        split: 'upperlower',
                        day: 'upper',
                        currentWeight: 45,
                        image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG92ZXJoZWFkJTIwcHJlc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-06', weight: 40 },
                            { date: '2023-08-13', weight: 45 }
                        ],
                        lastUpdated: '2023-08-13'
                    },
                    {
                        id: '7',
                        name: 'Romanian Deadlift',
                        split: 'upperlower',
                        day: 'lower',
                        currentWeight: 80,
                        image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVhZGxpZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
                        history: [
                            { date: '2023-08-07', weight: 70 },
                            { date: '2023-08-14', weight: 80 }
                        ],
                        lastUpdated: '2023-08-14'
                    }
                ];
                saveExercises();
            }
        }

        // Save exercises to localStorage
        function saveExercises() {
            try {
                localStorage.setItem('exercises', JSON.stringify(exercises));
            } catch (e) {
                console.error('Error saving exercises to localStorage:', e);
                showPopup('Error saving data. Please try again.', 'error');
            }
        }

        // Animate split tabs with staggered animation
        function animateSplitTabs() {
            const splitTabs = document.querySelectorAll('.split-tab');
            splitTabs.forEach((tab, index) => {
                setTimeout(() => {
                    tab.style.animation = `fadeInUp 0.6s forwards ${index * 0.2}s`;
                }, 100);
            });
        }

        // Set up event listeners
        function setupEventListeners() {
            // Theme toggle
            themeToggle.addEventListener('click', toggleTheme);
            
            // Split tabs
            document.querySelectorAll('.split-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const split = tab.dataset.split;
                    navigateToSplit(split);
                });
            });
            
            // Back buttons
            pplBackBtn.addEventListener('click', () => navigateToHome());
            arnoldBackBtn.addEventListener('click', () => navigateToHome());
            upperlowerBackBtn.addEventListener('click', () => navigateToHome());
            homeLogo.addEventListener('click', () => navigateToHome());
            
            // Day tabs
            document.querySelectorAll('.day-tabs').forEach(container => {
                container.addEventListener('click', (e) => {
                    if (e.target.classList.contains('day-tab')) {
                        const day = e.target.dataset.day;
                        currentDay = day;
                        
                        // Update active day tab
                        const parent = e.target.closest('.day-tabs');
                        parent.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
                        e.target.classList.add('active');
                        
                        renderExercises();
                    }
                });
            });
            
            // Add exercise buttons
            document.getElementById('addPPLExerciseBtn').addEventListener('click', () => {
                openAddExerciseModal('ppl', currentDay);
            });
            
            document.getElementById('addArnoldExerciseBtn').addEventListener('click', () => {
                openAddExerciseModal('arnold', currentDay);
            });
            
            document.getElementById('addUpperLowerExerciseBtn').addEventListener('click', () => {
                openAddExerciseModal('upperlower', currentDay);
            });
            
            // Form submission
            exerciseForm.addEventListener('submit', handleExerciseSubmit);
            
            // Modal buttons
            cancelBtn.addEventListener('click', () => closeModal(exerciseModal));
            closeHistoryBtn.addEventListener('click', () => closeModal(historyModal));
            
            // Confirmation modal buttons
            confirmCancelBtn.addEventListener('click', () => closeModal(confirmationModal));
            confirmActionBtn.addEventListener('click', executePendingAction);
            
            // Image handling
            imageUpload.addEventListener('change', handleImageUpload);
            imageUploadContainer.addEventListener('click', () => imageUpload.click());
            
            // Drag and drop for image upload
            imageUploadContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                imageUploadContainer.style.borderColor = 'var(--primary-color)';
                imageUploadContainer.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
            });
            
            imageUploadContainer.addEventListener('dragleave', () => {
                imageUploadContainer.style.borderColor = 'var(--text-light)';
                imageUploadContainer.style.backgroundColor = 'transparent';
            });
            
            imageUploadContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                imageUploadContainer.style.borderColor = 'var(--text-light)';
                imageUploadContainer.style.backgroundColor = 'transparent';
                
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    imageUpload.files = e.dataTransfer.files;
                    handleImageUpload({ target: imageUpload });
                }
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === exerciseModal) closeModal(exerciseModal);
                if (e.target === historyModal) closeModal(historyModal);
                if (e.target === confirmationModal) closeModal(confirmationModal);
            });
        }

        // Toggle between light and dark themes
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            updateThemeToggle();
            
            // Add animation to theme toggle
            themeToggle.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                themeToggle.style.animation = '';
            }, 500);
        }

        // Update theme toggle button text and icon
        function updateThemeToggle() {
            const icon = themeToggle.querySelector('i');
            const text = themeToggle.querySelector('span');
            
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                text.textContent = 'Light Mode';
            } else {
                icon.className = 'fas fa-moon';
                text.textContent = 'Dark Mode';
            }
        }

        // Navigate to a specific split page
        function navigateToSplit(split) {
            currentSplit = split;
            
            // Hide all pages with animation
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show current split page with animation
            setTimeout(() => {
                document.getElementById(`${split}-page`).classList.add('active');
                
                // Reset day tabs to first option
                const dayTabs = document.querySelectorAll(`#${split}-page .day-tab`);
                if (dayTabs.length > 0) {
                    dayTabs.forEach(tab => tab.classList.remove('active'));
                    dayTabs[0].classList.add('active');
                    currentDay = dayTabs[0].dataset.day;
                }
                
                renderExercises();
                updateSplitChart();
            }, 300);
        }

        // Navigate back to home page
        function navigateToHome() {
            // Hide all split pages with animation
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show home page with animation
            setTimeout(() => {
                homePage.classList.add('active');
                updateOverallChart();
            }, 300);
        }

        // Render the home page
        function renderHomePage() {
            updateOverallChart();
        }

        // Render exercises for the current split and day
        function renderExercises() {
            const container = document.getElementById(`${currentSplit}ExercisesContainer`);
            const categoryExercises = exercises.filter(ex => ex.split === currentSplit && ex.day === currentDay);
            
            if (categoryExercises.length === 0) {
                container.innerHTML = `
                    <div class="no-exercises">
                        <i class="fas fa-dumbbell"></i>
                        <p>No exercises found for ${getDayName(currentDay)}.</p>
                        <p>Click "Add Exercise" to get started!</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = categoryExercises.map(exercise => `
                <div class="exercise-card">
                    <div class="exercise-image">
                        <img src="${exercise.image}" alt="${exercise.name}">
                    </div>
                    <div class="exercise-header">
                        <div>
                            <h3>${exercise.name}</h3>
                            <span class="category-badge">${getDayName(exercise.day)}</span>
                        </div>
                        <div class="exercise-actions">
                            <button class="action-btn edit-btn" data-id="${exercise.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn history-btn" data-id="${exercise.id}">
                                <i class="fas fa-history"></i>
                            </button>
                            <button class="action-btn delete-btn" data-id="${exercise.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="exercise-weight">${exercise.currentWeight} kg</div>
                    <button class="btn update-weight-btn" data-id="${exercise.id}">
                        <i class="fas fa-plus"></i> Update Weight
                    </button>
                    <div class="weight-history">
                        <div class="history-item">
                            <span>Last updated:</span>
                            <span>${formatDate(exercise.lastUpdated)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add event listeners to exercise buttons
            container.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => editExercise(e.target.closest('.edit-btn').dataset.id));
            });
            
            container.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => confirmDeleteExercise(e.target.closest('.delete-btn').dataset.id));
            });
            
            container.querySelectorAll('.history-btn').forEach(btn => {
                btn.addEventListener('click', (e) => showHistory(e.target.closest('.history-btn').dataset.id));
            });
            
            container.querySelectorAll('.update-weight-btn').forEach(btn => {
                btn.addEventListener('click', (e) => updateWeightPrompt(e.target.closest('.update-weight-btn').dataset.id));
            });
            
            // Animate exercise cards in
            setTimeout(() => {
                const cards = container.querySelectorAll('.exercise-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 100);
                });
            }, 50);
            
            updateSplitChart();
        }

        // Open the add exercise modal
        function openAddExerciseModal(split, day) {
            editingExerciseId = null;
            modalTitle.innerHTML = '<i class="fas fa-dumbbell"></i> Add New Exercise';
            exerciseForm.reset();
            document.getElementById('exerciseSplit').value = split;
            document.getElementById('exerciseDay').value = day;
            document.getElementById('exerciseId').value = '';
            exerciseCategory.value = day;
            imagePreview.style.display = 'none';
            
            openModal(exerciseModal);
        }

        // Open modal with animation
        function openModal(modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }

        // Close modal with animation
        function closeModal(modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

        // Handle image upload
        function handleImageUpload(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Store as data URL
                    imageUrl.value = event.target.result;
                    imagePreview.querySelector('img').src = event.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        }

        // Handle exercise form submission
        function handleExerciseSubmit(e) {
            e.preventDefault();
            
            const name = document.getElementById('exerciseName').value;
            const split = document.getElementById('exerciseSplit').value;
            const day = document.getElementById('exerciseDay').value;
            const weight = parseFloat(document.getElementById('exerciseWeight').value);
            const image = imagePreview.querySelector('img').src || '';
            const id = document.getElementById('exerciseId').value;
            
            if (!name || !weight) {
                showPopup('Please fill in all required fields', 'error');
                return;
            }
            
            if (editingExerciseId || id) {
                // Update existing exercise
                const index = exercises.findIndex(ex => ex.id === (editingExerciseId || id));
                if (index !== -1) {
                    exercises[index] = {
                        ...exercises[index],
                        name,
                        split,
                        day,
                        image,
                        currentWeight: weight
                    };
                    saveExercises();
                    showPopup('Exercise updated successfully', 'success');
                }
            } else {
                // Add new exercise
                const newExercise = {
                    id: Date.now().toString(),
                    name,
                    split,
                    day,
                    image,
                    currentWeight: weight,
                    history: [],
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
                
                exercises.push(newExercise);
                saveExercises();
                showPopup('Exercise added successfully', 'success');
            }
            
            // Update UI
            closeModal(exerciseModal);
            renderExercises();
            updateSplitChart();
            updateOverallChart();
        }

        // Edit an existing exercise
        function editExercise(id) {
            const exercise = exercises.find(ex => ex.id === id);
            if (!exercise) return;
            
            editingExerciseId = id;
            modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Exercise';
            
            document.getElementById('exerciseName').value = exercise.name;
            document.getElementById('exerciseWeight').value = exercise.currentWeight;
            document.getElementById('exerciseSplit').value = exercise.split;
            document.getElementById('exerciseDay').value = exercise.day;
            document.getElementById('exerciseId').value = exercise.id;
            exerciseCategory.value = exercise.day;
            
            // Show image preview
            if (exercise.image) {
                imagePreview.querySelector('img').src = exercise.image;
                imagePreview.style.display = 'block';
            } else {
                imagePreview.style.display = 'none';
            }
            
            openModal(exerciseModal);
        }

        // Confirm exercise deletion
        function confirmDeleteExercise(id) {
            const exercise = exercises.find(ex => ex.id === id);
            if (!exercise) return;
            
            pendingAction = {
                type: 'delete',
                id: id,
                name: exercise.name
            };
            
            // Update confirmation modal for delete action
            confirmationTitle.innerHTML = '<i class="fas fa-trash"></i> Delete Exercise';
            confirmationMessage.innerHTML = `
                <p>Are you sure you want to delete the exercise <strong>"${exercise.name}"</strong>?</p>
                <p>This action cannot be undone.</p>
            `;
            
            openModal(confirmationModal);
        }

        // Execute pending action after confirmation
        function executePendingAction() {
            if (!pendingAction) return;
            
            if (pendingAction.type === 'delete') {
                exercises = exercises.filter(ex => ex.id !== pendingAction.id);
                saveExercises();
                renderExercises();
                updateSplitChart();
                updateOverallChart();
                showPopup('Exercise deleted successfully', 'success');
            } else if (pendingAction.type === 'updateWeight') {
                const weightValue = parseFloat(newWeightInput.value);
                
                if (isNaN(weightValue) || weightValue < 0) {
                    showPopup('Please enter a valid weight value', 'error');
                    return;
                }
                
                const exercise = exercises.find(ex => ex.id === pendingAction.id);
                if (exercise) {
                    // Update exercise weight and history
                    exercise.currentWeight = weightValue;
                    exercise.history = exercise.history || [];
                    exercise.history.unshift({
                        date: new Date().toISOString().split('T')[0],
                        weight: weightValue
                    });
                    
                    exercise.lastUpdated = new Date().toISOString().split('T')[0];
                    
                    // Limit history to last 10 entries
                    if (exercise.history.length > 10) {
                        exercise.history = exercise.history.slice(0, 10);
                    }
                    
                    saveExercises();
                    renderExercises();
                    updateSplitChart();
                    updateOverallChart();
                    showPopup('Weight updated successfully', 'success');
                }
            }
            
            closeModal(confirmationModal);
            pendingAction = null;
        }

        // Show weight history for an exercise
        function showHistory(id) {
            const exercise = exercises.find(ex => ex.id === id);
            if (!exercise) return;
            
            const historyContent = document.getElementById('historyContent');
            historyContent.innerHTML = '';
            
            if (exercise.history && exercise.history.length > 0) {
                exercise.history.forEach(entry => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.innerHTML = `
                        <span>${formatDate(entry.date)}</span>
                        <span>${entry.weight} kg</span>
                    `;
                    historyContent.appendChild(historyItem);
                });
            } else {
                historyContent.innerHTML = '<p>No weight history available for this exercise.</p>';
            }
            
            document.getElementById('historyTitle').innerHTML = `<i class="fas fa-history"></i> Weight History - ${exercise.name}`;
            openModal(historyModal);
        }

        // Prompt to update weight for an exercise
        function updateWeightPrompt(id) {
            const exercise = exercises.find(ex => ex.id === id);
            if (!exercise) return;
            
            // Update the confirmation modal for weight update
            pendingAction = {
                type: 'updateWeight',
                id: id,
                name: exercise.name,
                currentWeight: exercise.currentWeight
            };
            
            confirmationTitle.innerHTML = '<i class="fas fa-weight"></i> Update Weight';
            confirmationMessage.innerHTML = `
                <div class="form-group">
                    <label for="newWeightInput"><i class="fas fa-dumbbell"></i> Enter new weight for ${exercise.name} (kg)</label>
                    <div class="weight-input-container">
                        <span class="weight-unit">kg</span>
                        <input type="number" id="newWeightInput" value="${exercise.currentWeight}" step="0.5" min="0" required>
                    </div>
                </div>
            `;
            
            openModal(confirmationModal);
            
            // Focus on the input field
            setTimeout(() => {
                const weightInput = document.getElementById('newWeightInput');
                if (weightInput) {
                    weightInput.focus();
                    weightInput.select();
                }
            }, 300);
        }

        // Show popup notification
        function showPopup(message, type) {
            popupNotification.className = `popup ${type}`;
            popupMessage.textContent = message;
            popupNotification.classList.add('show');
            
            // Set icon based on type
            const icon = popupNotification.querySelector('i');
            switch(type) {
                case 'success':
                    icon.className = 'fas fa-check-circle';
                    break;
                case 'error':
                    icon.className = 'fas fa-exclamation-circle';
                    break;
                case 'warning':
                    icon.className = 'fas fa-exclamation-triangle';
                    break;
                case 'info':
                    icon.className = 'fas fa-info-circle';
                    break;
            }
            
            /*===============> Hide after 3 seconds <===============*/
            setTimeout(() => {
                popupNotification.classList.remove('show');
            }, 3000);
        }

      /*===============> Update the overall progress chart on home page <===============*/
        function updateOverallChart() {
            const ctx = document.getElementById('overallProgressChart').getContext('2d');
            
            /*===============> Prepare data for chart <===============*/
            const splits = ['ppl', 'arnold', 'upperlower'];
            const data = {
                labels: splits.map(split => getSplitName(split)),
                datasets: [{
                    label: 'Total Weight Lifted',
                    data: splits.map(split => {
                        const splitExercises = exercises.filter(ex => ex.split === split);
                        return splitExercises.reduce((sum, ex) => sum + ex.currentWeight, 0);
                    }),
                    backgroundColor: [
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(6, 182, 212, 0.7)',
                        'rgba(16, 185, 129, 0.7)'
                    ],
                    borderColor: [
                        'rgb(139, 92, 246)',
                        'rgb(6, 182, 212)',
                        'rgb(16, 185, 129)'
                    ],
                    borderWidth: 1
                }]
            };
            
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Total Weight by Training Split'
                        }
                    }
                },
            };
            
            /*===============> Destroy previous chart if it exists <===============*/
            if (window.overallProgressChartInstance) {
                window.overallProgressChartInstance.destroy();
            }
            
            /*===============> Create new chart <===============*/
            window.overallProgressChartInstance = new Chart(ctx, config);
        }

        /*===============> Update the split-specific progress chart <===============*/
        function updateSplitChart() {
            const chartId = `${currentSplit}ProgressChart`;
            const ctx = document.getElementById(chartId).getContext('2d');
            
           /*===============> Get days for this split <===============*/
            let days = [];
            if (currentSplit === 'ppl') {
                days = ['push', 'pull', 'legs'];
            } else if (currentSplit === 'arnold') {
                days = ['chest-back', 'shoulders-arms', 'legs'];
            } else if (currentSplit === 'upperlower') {
                days = ['upper', 'lower'];
            }
            
            /*===============> Prepare data for chart <===============*/
            const data = {
                labels: days.map(day => getDayName(day)),
                datasets: [{
                    label: 'Total Weight Lifted',
                    data: days.map(day => {
                        const dayExercises = exercises.filter(ex => ex.split === currentSplit && ex.day === day);
                        return dayExercises.reduce((sum, ex) => sum + ex.currentWeight, 0);
                    }),
                    backgroundColor: [
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(6, 182, 212, 0.7)',
                        'rgba(236, 72, 153, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)'
                    ],
                    borderColor: [
                        'rgb(139, 92, 246)',
                        'rgb(6, 182, 212)',
                        'rgb(236, 72, 153)',
                        'rgb(16, 185, 129)',
                        'rgb(245, 158, 11)'
                    ],
                    borderWidth: 1
                }]
            };
            
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Total Weight by Day - ${getSplitName(currentSplit)}`
                        }
                    }
                },
            };
            
            /*===============> Destroy previous chart if it exists <===============*/
            if (window[`${chartId}Instance`]) {
                window[`${chartId}Instance`].destroy();
            }
            
            /*===============> Create new chart <===============*/
            window[`${chartId}Instance`] = new Chart(ctx, config);
        }

        /*===============> Helper function to get display name for a day <==============*/ 
        function getDayName(day) {
            const dayNames = {
                'push': 'Push Day',
                'pull': 'Pull Day',
                'legs': 'Legs Day',
                'chest-back': 'Chest & Back',
                'shoulders-arms': 'Shoulders & Arms',
                'upper': 'Upper Body',
                'lower': 'Lower Body'
            };
            return dayNames[day] || day;
        }

        /*===============> Helper function to get display name for a split <===============*/
        function getSplitName(split) {
            const splitNames = {
                'ppl': 'Push/Pull/Legs',
                'arnold': 'Arnold Split',
                'upperlower': 'Upper/Lower Split'
            };
            return splitNames[split] || split;
        }

       /*===============>Format date to be more readable<===============*/
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        /*===============>Initialize the app when the DOM is loaded<===============*/
        document.addEventListener('DOMContentLoaded', init);
