//supports arithmetic operations such as adittion, substraction, multiplication and division


export function calculator(mathExpression) {
    let expression = mathExpression.replace(/ /g, "");
    expression = optimizeExpression(expression);
    if (!lexicalAnalysis(expression)) return "Lexical Error";
    if (!syntaxAnalysis(expression)) return "Syntax Error";
    const postfixExpression = toPostFix(expression);
    return resolvePostFix(postfixExpression);
}

function optimizeExpression(mathExpression) {
    const divisionAmbiguety = /(?<=\/)(.*?)+(?=\/)|(?<=\/)(.*?)+/g;
    const multiplication = /\)\(|\d+\(/g;
    mathExpression = mathExpression.replace(divisionAmbiguety, match => `(${match})`);
    mathExpression = mathExpression.replace(multiplication, match => `${match.substr(0, match.length - 1)}*(`);
    return mathExpression;
}

function lexicalAnalysis(mathExpression) {
    let checkInvalid = /[^\d\+\-\*\/()( )\.]/g;
    return !checkInvalid.test(mathExpression);
}

function syntaxAnalysis(mathExpression) {
    //PRODUCTION RULES
    const checkUnit = /(\d+(\.\d+)?)|^\-(\d+(\.\d+)?)|(?<=\()\-(\d+(\.\d+)?)/g;
    const checkNegative = /^\-|(?<=\()\-/g;
    const checkOpr = /[\+\-\*\/]/g;
    const checkExpr = /^<negative>(<unit>|<expr>)|(?<=\()<negative>(<unit>|<expr>)|(<(expr|unit)>(<opr><(expr|unit)>)*)|\(<expr>\)/g;
    let expression = mathExpression;
    //RECOGNIZE VALIDITY OF THE STRING SINTAX
    while (expression != "<expr>") {
        const prevExpression = expression;
        expression = expression.replace(checkUnit, "<unit>");
        expression = expression.replace(checkNegative, "<negative>");
        expression = expression.replace(checkOpr, "<opr>");
        expression = expression.replace(checkExpr, "<expr>");
        if (prevExpression == expression) return false;
    }
    return true;
}

//I made an exception here for expressions like 5+(-(<any expression>)), - is converted to N
function toPostFix(mathExpression) {
    const regexMatches = {
        parentheses: /\((.*?)[)]*\)/g,
        secondOrder: {
            order2: /[\*\/](?![^()]*\))/g,
            opOrder2: /(\((.*?)[( )(.*?)\)\/\*\-\+]*\)|[\w]+)([\*\/](?![^()]*\))(\((.*?)[( )(.*?)\)\/\*\-\+]*\)|[\w]+))+/g,
        },
        firstOrder: {
            order1: /[\+\-](?![^()]*\))/g,
            opOrder1: /(\((.*?)[( )(.*?)\)\/\*\-\+]*\)|[\-]*[\w]+)([\+\-](?![^()]*\))(\((.*?)[( )(.*?)\)\/\*\-\+]*\)|[\w]+))+/g,
            negative: /^\-\((.*?)[( )(.*?)\)\/\*\-\+]*\)/g
        }
    }
    let postFixed = mathExpression;
    let parentheses = mathExpression.match(regexMatches.parentheses);
    if (parentheses) {
        parentheses.forEach(operation => {
            let result = toPostFix(operation.substr(1, operation.length - 2));
            postFixed = postFixed.replace(operation, `(${result})`);
        });
    }
    function orderByOperatorOrder(operatorMatch, operationMatch, mathExpression) {
        let operations = mathExpression.match(operationMatch);
        if (!operations) return mathExpression;
        //POSTFIX EVERY OPERATION
        operations.forEach(operationRaw => {
            let operation = operationRaw;
            if (operation[0] == "-") operation = "0" + operation.substr(1, operation.length - 1);
            let operators = operation.match(operatorMatch);
            let expressionNumbers = operation.split(operatorMatch);
            let postFixed = expressionNumbers.shift() + " ";
            while (expressionNumbers.length > 0) {
                postFixed += expressionNumbers.shift() + " ";
                postFixed += operators.shift() + " ";
            }
            if (postFixed[0] == "0") postFixed = "-" + postFixed.substr(1, postFixed.length - 1);
            mathExpression = mathExpression.replace(operationRaw, `(${postFixed.substr(0, postFixed.length - 1)})`);
        });
        return mathExpression;
    }
    function orderNegative(operatorMatch, mathExpression) {
        let negative = mathExpression.match(operatorMatch);
        if (!negative) return mathExpression;
        let postFixedNegative = negative[0].substr(1, negative[0].length - 1) + " N";
        mathExpression = mathExpression.replace(negative[0], postFixedNegative);
        return mathExpression;
    }
    //MATCHING PROCESS FOR ORDER 2 OPERATORS (PRODUCT AND DIVISION)
    postFixed = orderByOperatorOrder(regexMatches.secondOrder.order2, regexMatches.secondOrder.opOrder2, postFixed);
    //MATCHING PROCESS FOR ORDER 1 OPERATORS (ADD AND SUBSTRACTION)
    postFixed = orderByOperatorOrder(regexMatches.firstOrder.order1, regexMatches.firstOrder.opOrder1, postFixed);
    //LOOK FOR NEGATIVE NUMBER IN THE FIRST TERM
    postFixed = orderNegative(regexMatches.firstOrder.negative, postFixed);
    postFixed = postFixed.replace(/[()]/g, "");
    return postFixed;
}

function resolvePostFix(mathExpression) {
    let expression = mathExpression.split(" ");
    let stack = [];
    const operations = {
        "+": (n2, n1) => n1 + n2,
        "-": (n2, n1) => n1 - n2,
        "*": (n2, n1) => n1 * n2,
        "/": (n2, n1) => n1 / n2,
    };

    while (expression.length > 0) {
        const current = expression.shift();
        if (/\d+/.test(current)) {
            stack.push(current);
        }
        else {
            //if stack is 1 and encounters an operator, 
            //it is likely to be -, so we change it no a negative value
            if (current == "N") stack[stack.length - 1] = `${-1 * +stack[stack.length - 1]}`;
            else if (stack.length == 1) stack[0] = `${-1 * +stack[0]}`;
            else stack.push(`${operations[current](+stack.pop(), +stack.pop())}`);
        }
    }
    return stack.pop();
}
