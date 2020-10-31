// Budget Controller
var budgetCalculator = (function() {

var Expense = function (id, desc, val) {
  this.id = id;
  this.desc = desc;
  this.val = val;
};

var Income = function (id, desc, val) {
  this.id = id;
  this.desc = desc;
  this.val = val;
}

var data ={
  allItems : {
    exp :[],
    inc :[]
  },
  totals : {
    exp : 0,
    inc : 0
  }
};
return {
  addItem: function(type, desc, val){

    var newItem, id;

    // [1,2,3,4], next ID = 6
    // [1,2,4,6], next ID = 7
    // id = last id+1

    // auto generating ID according to last item of the array of exp or inc
    if (data.allItems[type].length > 0) {
      id = data.allItems[type][data.allItems[type].length - 1 ].id + 1;
    }else {
      id = 0;
    }

    // Create new item based on type
    if (type === 'exp') {
      newItem = new Expense(id, desc, val);
    }else if (type === 'inc') {
      newItem = new Income(id, desc, val);
    }
    // push the item into datastructure
    data.allItems[type].push(newItem);
    // return the new element
    return newItem;
  },
  testing: function () {
    console.log(data);
  }
}


})();


// UI controller
var UIController = (function() {

  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {

    getInput: function() {

      return {
        type: document.querySelector(DOMStrings.inputType).value, // if value = inc then it is + and if value = exp then it is -
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },

    getDomStrings: function() {

      return DOMStrings;
    },
    addListItem: function (obj, type) {
      // create html string with placeholder text
      var html, newHtml, element;

      if (type === 'inc') {
        element = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }else if (type === 'exp') {
        element = DOMStrings.expensesContainer;
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
  var DOMStrings = UICtrl.getDomStrings();

  var setupEventListners = function(){
    document.querySelector(DOMStrings.addButton).addEventListener('click', addItem);
    document.addEventListener("keyup", function(event) {

      if (event.keyCode === 13) {
        addItem();
      }
    });
  }

  var addItem = function() {

    var input, newItem;
    // get the input data
    input = UICtrl.getInput();
    // add item to the budgetCalculator
    newItem = budgetCalculator.addItem(input.type, input.description, input.value);
    // add the item to the UI
    UICtrl.addListItem(newItem, input.type);
  };
  return {
    init: function(){
      console.log("Application Started");
      setupEventListners();
    }
  }
})(budgetCalculator, UIController);

controller.init();
