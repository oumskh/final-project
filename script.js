class BudgetOrganizer {
    constructor() {
        this.incomeInputs = [];
        this.expenseInputs = [];
        this.moonTripExpense = 0; // New property for the specific expense
        this.resultPS = 0;
    }

    setup() {
        createCanvas(800, 800);
        background(220);
        createElement('h1', 'Student Budget Organizer').position(20, 10).style('color', 'rgb(214,149,14)');
        createElement('h3', "Enter this month's Income").position(20, 65);

        // Income
        for (let i = 1; i <= 2; i++) {
            let label = createElement('label', `Enter Income ${i} Amount:`).position(20, 80 + i * 30);
            let input = createInput('', 'number').position(200, 80 + i * 30);
            this.incomeInputs.push({ label, input });
        }

        createElement('h3', "Enter this month's expenses").position(20, 170);

        // Expenses
        for (let i = 1; i <= 4; i++) {
            let expenseNameLabel = createElement('label', `Expense ${i} Name:`).position(20, 200 + i * 60);
            let expenseNameInput = createInput('', 'text').position(200, 200 + i * 60);
            let expenseAmountLabel = createElement('label', `Amount:`).position(20, 230 + i * 60);
            let expenseAmountInput = createInput('', 'number').position(200, 230 + i * 60);
            this.expenseInputs.push({ expenseNameLabel, expenseNameInput, expenseAmountLabel, expenseAmountInput });
        }

        // Specific Expense - Trip to the Moon
        createElement('label', 'Trip to the Moon Expense:').position(20, 500);
        this.moonTripExpense = createInput('', 'number').position(200, 500);

        // Submit Button
        let submitButton = createButton('Submit');
        submitButton.mousePressed(() => this.calculateSavings());
        submitButton.position(20, 530);

        // Create a paragraph element to display the result
        this.resultPS = createP('Potential Savings = ').position(20, 560);
    }

    calculateSavings() {
        let totalIncome = 0;
        let totalExpenses = 0;

        // Total Income
        for (let income of this.incomeInputs) {
            totalIncome += parseFloat(income.input.value()) || 0;
        }

        // Total Expenses
        for (let expense of this.expenseInputs) {
            totalExpenses += parseFloat(expense.expenseAmountInput.value()) || 0;
        }

        // Add the specific Trip to the Moon expense
        totalExpenses += parseFloat(this.moonTripExpense.value()) || 0;

        // Potential Savings
        let potentialSavings = totalIncome - totalExpenses;
        this.resultPS.html('Potential Savings = ' + potentialSavings);
    }
}

let budgetOrganizer;

function setup() {
    budgetOrganizer = new BudgetOrganizer();
    budgetOrganizer.setup();
}
