// p5.js library functions are assumed to be available

class BudgetOrganizer {
    constructor() {
        this.incomeInputs = [];
        this.expenseInputs = [];
        this.expenseCount = 2; // Start with two expense inputs
        this.resultPS = 0;
    }

    // Initialize the budget organizer UI elements
    setup() {
        this.createCanvas();
        this.createIncomeInputs();
        this.createExpenseInputs();
        this.createAddExpenseButton();
        this.createSubmitButton();
        this.createRefreshButton();
        this.createResultDisplay();
    }

    // Create canvas
    createCanvas() {
        createCanvas(1000, 1000);
        background(220);
    }

    // Create income input fields
    createIncomeInputs() {
        createElement('h1', 'Student Budget Organizer').position(400, 10).style('color', 'rgb(214,149,14)');
        createElement('h3', "Enter this month's Income").position(100, 70);
        for (let i = 1; i <= 2; i++) {
            let label = createElement('label', `Enter Income ${i} Amount:`).position(10, 90 + i * 30);
            let input = createInput('', 'number').position(200, 90 + i * 30);
            this.incomeInputs.push({ label, input });
        }
    }

    // Create initial expense input fields
    createExpenseInputs() {
        createElement('h3', "Enter this month's expenses").position(90, 170);
        for (let i = 1; i <= this.expenseCount; i++) {
            this.addExpenseInput(i);
        }
    }

    // Create button to add more expenses
    createAddExpenseButton() {
        let addExpenseButton = createButton('Add More Expenses');
        addExpenseButton.mousePressed(() => this.addExpenseInput(++this.expenseCount));
        addExpenseButton.position(80, 100 + this.expenseCount * 60);
    }

    // Create submit button
    createSubmitButton() {
        let submitButton = createButton('Submit');
        submitButton.mousePressed(() => this.calculateSavings());
        submitButton.position(700, 750); // Positioning in the right bottom corner
    }

    // Create refresh button
    createRefreshButton() {
        let refreshButton = createButton('Refresh');
        refreshButton.mousePressed(() => this.reset());
        refreshButton.position(600, 750); // Positioning next to the submit button
    }

    // Create a paragraph element to display the result
    createResultDisplay() {
        this.resultPS = createP('Potential Savings = ').position(600, 760 + this.expenseCount * 60);
    }

    // Add a new expense input
    addExpenseInput(index) {
        let expenseNameLabel = createElement('label', `Expense ${index} Name:`).position(20, 200 + index * 60);
        let expenseNameInput = createInput('', 'text').position(200, 200 + index * 60);
        let expenseAmountLabel = createElement('label', `Amount:`).position(20, 230 + index * 60);
        let expenseAmountInput = createInput('', 'number').position(200, 230 + index * 60);
        this.expenseInputs.push({ expenseNameLabel, expenseNameInput, expenseAmountLabel, expenseAmountInput });
    }

    // Calculate and display savings
    calculateSavings() {
        let totalIncome = 0;
        let totalExpenses = 0;

        for (let income of this.incomeInputs) {
            totalIncome += parseFloat(income.input.value()) || 0;
        }

        for (let expense of this.expenseInputs) {
            totalExpenses += parseFloat(expense.expenseAmountInput.value()) || 0;
        }

        let potentialSavings = totalIncome - totalExpenses;
        this.resultPS.html('Potential Savings = ' + potentialSavings);
    }

    // Reset all inputs and calculations
    reset() {
        // Reset income inputs
        for (let income of this.incomeInputs) {
            income.input.value('');
        }

        // Remove existing expense inputs from the UI
        for (let expense of this.expenseInputs) {
            expense.expenseNameLabel.remove();
            expense.expenseNameInput.remove();
            expense.expenseAmountLabel.remove();
            expense.expenseAmountInput.remove();
        }

        // Reset and recreate the initial expense inputs
        this.expenseInputs = [];
        this.expenseCount = 2;
        for (let i = 1; i <= this.expenseCount; i++) {
            this.addExpenseInput(i);
        }

        // Reset potential savings display
        this.resultPS.html('Potential Savings = ');
    }
}

let budgetOrganizer;

function setup() {
    budgetOrganizer = new BudgetOrganizer();
    budgetOrganizer.setup();
}
