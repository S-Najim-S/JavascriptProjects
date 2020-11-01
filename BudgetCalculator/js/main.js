// Budget Controller
var budgetCalculator = (function() {

  var Expense = function(id, desc, val) {
    this.id = id;
    this.desc = desc;
    this.val = val;
  };

  var Income = function(id, desc, val) {
    this.id = id;
    this.desc = desc;
    this.val = val;
  }


  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  var calculateTotal =  function(type) {
   var sum = 0;

   data.allItems[type].forEach(function(cur) {
     sum += cur.val;
   });
   data.totals[type] = sum;
 };

  return {
    addItem: function(type, desc, val) {

      var newItem, id;

      // [1,2,3,4], next ID = 6
      // [1,2,4,6], next ID = 7
      // id = last id+1

      // auto generating ID according to last item of the array of exp or inc
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item based on type
      if (type === 'exp') {
        newItem = new Expense(id, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(id, desc, val);
      }
      // push the item into datastructure
      data.allItems[type].push(newItem);
      // return the new element
      return newItem;
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget ; inc - exp
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income we spent
      if (data.totals.inc>0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)

      }else {
        data.percentage = -1;
      }
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },
    testing: function() {
      console.log(data);
    }
  }


})();


// UI controller
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    budgetIncomeValue: '.budget__income--value',
    budgetExpenseValue: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'


  };

  return {

    getInput: function() {

      return {
        type: document.querySelector(DOMstrings.inputType).value, // if value = inc then it is + and if value = exp then it is -
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    clearFields: function() {

      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

      // convert list to array.
      // since querySelectorAll returns a string, use Array.prototype to call .slice and then bind the this variable to fields using .call
      fieldsArray = Array.prototype.slice.call(fields);

      // use .foreach method that works like the for loop
      // the anonymous function in the .foreach method can receive up to 3 arguments
      fieldsArray.forEach(function(currentValue, index, array) {
        // set the value of the currentValue to empty
        currentValue.value = "";
      });

      // set the focus back to the description element when cleared
      fieldsArray[0].focus();

    },

    displayBudget: function(obj){

      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.budgetIncomeValue).textContent = obj.totalInc;
      document.querySelector(DOMstrings.budgetExpenseValue).textContent = obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';

      }else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }

    },

    getDomStrings: function() {

      return DOMstrings;
    },

    addListItem: function(obj, type) {
      // create html string with placeholder text
      var html, newHtml, element;

      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      // replace the placeholder text with some actula data that we recieve from the object
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.desc);
      newHtml = newHtml.replace('%value%', obj.val);
      // insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    }
  };
  // Some code
})();

// Global controller
var controller = (function(budgetCtrl, UICtrl) {
  var DOMstrings = UICtrl.getDomStrings();

  var setupEventListners = function() {
    document.querySelector(DOMstrings.addButton).addEventListener('click', addItem);
    document.addEventListener("keyup", function(event) {

      if (event.keyCode === 13) {
        addItem();
      }
    });
  };
  var updateBudget = function() {
         //1. Calculate the budget
         budgetCtrl.calculateBudget();
         //2. return the budget
         var budget = budgetCtrl.getBudget();
         //3. Display budget.
         UICtrl.displayBudget(budget);
     };


  var addItem = function() {

    var input, newItem;
    // get the input data
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // add item to the budgetCalculator
      newItem = budgetCalculator.addItem(input.type, input.description, input.value);
      // add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // clear fields
      UICtrl.clearFields();

      // calculate and update the budget
      updateBudget();
    } else {
      alert("Please enter valid input.")
    }

  };
  return {
    init: function() {
      console.log("Application Started");
      UICtrl.displayBudget(
        {
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1
        }
      );
      setupEventListners();
    }
  }
})(budgetCalculator, UIController);

controller.init();
