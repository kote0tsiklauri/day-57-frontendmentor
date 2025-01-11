// გამოყოფილი კონსტანტები და ცვლადები
const output = document.querySelector('.output');  // ეკრანის (ინპუტის) ელემენტი
let currentInput = '';  // მიმდინარე მნიშვნელობა, რომელიც ჯერ ეწერება
let previousInput = ''; // წინა მნიშვნელობა, რომელიც ინახავს წინა ციფრს
let operator = '';      // მოქმედი ოპერატორი (+, -, *, /)

// ფუნქცია ეკრანის განახლებისთვის
function updateDisplay(value) {
output.value = value;   
}

// შეამოწმეთ თითოეული ღილაკი და დასვით შესაბამისი ქმედება
document.querySelectorAll('button').forEach(button => {
button.addEventListener('click', () => {
    const value = button.textContent;  // ღილაკის ტექსტი

    // თუ ღილაკი არის ციფრი გამოვიდეს ეკრანზე
    if (isNumber(value)) {
    currentInput += value;  
    updateDisplay(currentInput);  
    }
    
    // თუ ღილაკი არის ოპერატორი (+, -, *, /)
    else if (isOperator(value)) {
    if (previousInput !== '' && currentInput !== '') {
        // პირველი ქმედება: მათ შორის გამოითვლება წინამორბედი და მიმდინარე მნიშვნელობები
        currentInput = calculate(previousInput, currentInput, operator).toString();
        updateDisplay(currentInput);  
    }
    operator = value;  // ინახავს მიმდინარე ოპერატორს
    previousInput = currentInput;  // წინა მნიშვნელობა ინახავს მიმდინარე მნიშვნელობას
    currentInput = '';  // აბრუნებს მიმდინარე მნიშვნელობას ცარიელ ფიუდეი
    }
    
    // თუ ღილაკი არის '=' (გადათვლა)
    else if (value === '=') {
    if (previousInput !== '' && currentInput !== '') {
        // ითვლის შედეგს
        currentInput = calculate(previousInput, currentInput, operator).toString();
        updateDisplay(currentInput);  
        previousInput = '';  // ტოვებს წინა მნიშვნელობას ცარიელად
        operator = '';  // ტოვებს ოპერატორს ცარიელად
    }
    }
    
    // თუ ღილაკი არის "del" (წაშლა)
    else if (value === 'del') {
    currentInput = currentInput.slice(0, -1);  // წაშლის ბოლო ციფრს
    updateDisplay(currentInput);  
    }
    
    // თუ ღილაკი არის "reset" (განახლება)
    else if (value === 'reset') {
    currentInput = '';  
    previousInput = ''; 
    operator = '';      
    updateDisplay('0'); 
    }
});
});

// შემოწმება, არის თუ არა ღილაკი ციფრი
function isNumber(value) {
return !isNaN(value) || value === '.';  // გადაამოწმებს თუ არის ციფრი ან წერტილი
}

// შემოწმება, არის თუ არა ღილაკი ოპერატორი
function isOperator(value) {
return value === '+' || value === '-' || value === '*' || value === '/';  // გადაამოწმებს ოპერატორებს
}

// მათემატიკური ფუნქცია, რომელიც ახორციელებს სასურველ ოპერაციას
function calculate(prev, curr, op) {
prev = parseFloat(prev);  // წინამორბედი მნიშვნელობის კონვერტირება float-ად
curr = parseFloat(curr);  // მიმდინარე მნიშვნელობის კონვერტირება float-ად
switch (op) {
    case '+':
    return prev + curr;  // დაემატება
    case '-':
    return prev - curr;  // დაეთმობა
    case '*':
    return prev * curr;  // გამრავლდება
    case '/':
    return prev / curr;  // გაიყოფა
    default:
    return curr;  
}
}
