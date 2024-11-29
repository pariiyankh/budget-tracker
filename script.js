// Initialize transactions array
let transactions = [];
let currentFilter = 'all';
let currentUser = null;

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTimeString = now.toLocaleDateString('de-DE', options);
    
    // Create or update the datetime element
    let datetimeEl = document.getElementById('datetime');
    if (!datetimeEl) {
        datetimeEl = document.createElement('p');
        datetimeEl.id = 'datetime';
        document.getElementById('heading').appendChild(datetimeEl);
    }
    datetimeEl.textContent = dateTimeString;
}

// Function to save transactions to localStorage
function saveTransactions() {
    localStorage.setItem(`transactions_${currentUser.username}`, JSON.stringify(transactions));
}

// Function to load transactions from localStorage
function loadTransactions() {
    const savedTransactions = localStorage.getItem(`transactions_${currentUser.username}`);
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
        updateUI();
    }
}

// Function to update UI
function updateUI() {
    const transactionList = document.getElementById('transaction-list');
    const totalIncome = document.getElementById('total-income');
    const totalExpenses = document.getElementById('total-expenses');
    const balance = document.getElementById('balance');

    transactionList.innerHTML = '';
    let incomeSum = 0;
    let expensesSum = 0;

    const filteredTransactions = transactions.filter(transaction => {
        if (currentFilter === 'all') return true;
        return transaction.type === currentFilter;
    });

    filteredTransactions.forEach(function(transaction) {
        const transactionEl = document.createElement('div');
        transactionEl.classList.add('transaction-item', 'row', 'mb-2', 'p-2', 'bg-light', 'rounded');

        const detailsEl = document.createElement('div');
        detailsEl.classList.add('col-md-6', 'transaction-details');

        const dateEl = document.createElement('span');
        dateEl.textContent = new Date(transaction.date).toLocaleDateString('de-DE');
        dateEl.classList.add('transaction-date', 'text-muted');

        const descriptionEl = document.createElement('span');
        descriptionEl.innerHTML = `<i class="fas ${transaction.type === 'income' ? 'fa-arrow-up text-success' : 'fa-arrow-down text-danger'} icon"></i>${transaction.description}`;

        detailsEl.appendChild(dateEl);
        detailsEl.appendChild(descriptionEl);

        const amountEl = document.createElement('div');
        amountEl.classList.add('col-md-4', 'text-right');
        amountEl.textContent = `€${transaction.amount.toFixed(2)}`;
        amountEl.classList.add(transaction.type === 'income' ? 'text-success' : 'text-danger');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'col-md-2');
        deleteBtn.addEventListener('click', function() {
            transactions = transactions.filter(t => t.id !== transaction.id);
            saveTransactions();
            updateUI();
        });

        transactionEl.appendChild(detailsEl);
        transactionEl.appendChild(amountEl);
        transactionEl.appendChild(deleteBtn);
        transactionList.appendChild(transactionEl);

        if (transaction.type === 'income') {
            incomeSum += transaction.amount;
        } else {
            expensesSum += transaction.amount;
        }
    });

    totalIncome.textContent = `€${incomeSum.toFixed(2)}`;
    totalExpenses.textContent = `€${expensesSum.toFixed(2)}`;
    balance.textContent = `€${(incomeSum - expensesSum).toFixed(2)}`;
}

// Event listener for form submission
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (date && description && amount) {
        const transaction = {
            id: Date.now(),
            date: date,
            description: description,
            amount: amount,
            type: type
        };

        transactions.push(transaction);
        saveTransactions();
        updateUI();
        this.reset();
    }
});

// Event listener for filter change
document.getElementById('filter').addEventListener('change', function(e) {
    currentFilter = e.target.value;
    updateUI();
});

// Event listener for logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
    loadTransactions();
});

