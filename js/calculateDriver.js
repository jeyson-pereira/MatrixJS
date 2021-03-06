//*Errores
const ERROR_1 = '<div class="alert alert-danger" role="alert">Datos de la matriz incompletos!</div>';
const ERROR_2 = '<div class="alert alert-danger" role="alert">Tamaño de matriz no valido!</div>';
const ERROR_3 = '<div class="alert alert-danger" role="alert">Estas matrices no se pueden multiplicar!</div>';
const ERROR_4 = '<div class="alert alert-danger" role="alert">La constante ingresada no es valida!</div>';

//*operations functions calls
function onCalculateClick(opt) {
    let A = getInputMatrix(1);
    let B = getInputMatrix(2);

    let output = document.getElementById("output");
    let inputError1 = document.getElementById('inputError1');
    inputError1.innerHTML = '';
    let inputError2 = document.getElementById('inputError2');
    inputError2.innerHTML = '';
    let inputError3 = document.getElementById('inputError3');
    inputError3.innerHTML = '';

    if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
    if (B == ERROR_2) { inputError2.innerHTML = ERROR_1; return; }

    let outputText = ""
    switch (opt) {
        case "DeterminantA":
            if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
            if (!isSquare(A)) { inputError1.innerHTML = ERROR_2; return; }
            let temp = det(A);
            outputText = `<div class='m-4'>${fractNumb(temp)}</div>`;
            break;

        case "TransposeA":
            if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
            outputText = stringFormat(transpose(A));
            break;

        case "DeterminantB":
            if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
            if (!isSquare(B)) { inputError2.innerHTML = ERROR_2; return; }
            let temp2 = det(B);
            outputText = `<div class='m-4'>${fractNumb(temp2)}</div>`;
            break;

        case "TransposeB":
            if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
            outputText = stringFormat(transpose(B));
            break;

        case "Multiplication":
            if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
            if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
            if (!canMultiply(A, B)) { inputError3.innerHTML = ERROR_3; return; }
            let product = multiply(A, B);
            outputText = stringFormat(product);
            break;

        case "Add":
            if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
            if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
            if (!sameSize(A, B)) { inputError3.innerHTML = ERROR_2; return; }
            let sum = add(A, B);
            outputText = stringFormat(sum);
            break;

        case "Subtract":
            if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
            if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
            if (!sameSize(A, B)) { inputError3.innerHTML = ERROR_2; return; }
            let diff = subtract(A, B);
            outputText = stringFormat(diff);
            break;
        case "KxA":
            if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }
            let k = getInputK(1);
            if (k == ERROR_4) { inputError3.innerHTML = ERROR_4; return; }
            let productK = multiplyByConstant(k, A);
            outputText = stringFormat(productK);
            break;
        case "KxB":
            if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
            let k2 = getInputK(2);
            if (k2 == ERROR_4) { inputError3.innerHTML = ERROR_4; return; }
            let productKb = multiplyByConstant(k2, B);
            outputText = stringFormat(productKb);
            break;
        default:
            outputText = "Opción invalida";
    }

    output.innerHTML = outputText;
}


//*Obtener data de los inputs de la tabla generada
function getInputMatrix(tableNum) {
    let matrix = [];

    let tb = document.getElementById("tableBody" + tableNum);
    let children = tb.childNodes;
    for (let i = 0; i < children.length; i++) {
        matrix.push([]);
        let tRow = children[i];
        let inputs = tRow.childNodes;
        for (let j = 0; j < inputs.length; j++) {
            let input = inputs[j].firstChild;
            let strNum = input.value;
            if (strNum.includes('/')) {
                let splitFunc = strNum.split('/');
                var numFract = parseFloat((splitFunc[0] / splitFunc[1]));
                if (Number.isNaN(numFract)) {
                    return ERROR_1;
                }
                console.log(numFract);
                matrix[i].push(numFract);
            } else {
                let number = parseInt(input.value);
                if (Number.isNaN(number)) {
                    return ERROR_1;
                }
                matrix[i].push(number);
            }

        }
    }

    return matrix;

}

//*Obtener data de input K(constante)
function getInputK(numInputK) {
    let kInput = document.getElementById("inputK" + numInputK);
    let k = kInput.value;
    //!verifica si se ha ingresado texto en formato fraccionario
    if (k.includes('/')) {
        let splitK = k.split('/');
        let kFract = parseFloat((splitK[0] / splitK[1]));
        if (Number.isNaN(kFract)) {
            return ERROR_4;
        } else {
            //!retorna la fraccion como decimal para poder operarse
            return kFract;
        }
    } else {
        //! Si es un numero entero lo retorna tal cual
        let kInt = parseInt(k);
        if (Number.isNaN(kInt)) {
            return ERROR_4;
        } else {
            return kInt;
        }
    }
}

//*StringFormat le da formato al resultado
//*Ordenando visualmente en una nueva tabla que ira al output
function stringFormat(matrix) {
    let string = '<table class="outputMatrix"><tbody>';

    for (let row = 0; row < matrix.length; row++) {
        let rowE = "<tr>"
        for (let column = 0; column < matrix[row].length; column++) {
            let columnE = '<td>';
            let temp = parseFloat(matrix[row][column]);
            console.log(temp);
            //! al recorrer el array verifica si la data es int o float
            if (temp % 1 == 0) { temp = parseInt(temp); }
            //! si es float la convierte visualmente en fraccionario
            else { var f = new Fraction(temp); temp = (f.s * f.n + " / " + f.d); }

            let entry = "\t" + temp.toString();
            if (column == matrix[row].length - 1) { entry += "\t"; }
            columnE = columnE.concat(entry, "</td>");
            rowE = rowE.concat(columnE);

        }
        rowE = rowE.concat("</tr>");
        string = string.concat(rowE);
    }

    string = string.concat("</table></tbody>");

    return string;
}

//* verifica si es una fraccion x/1 o si es una fraccion x/y
function fractNumb(numb) {
    let num = numb;
    let f = new Fraction(num);

    if (f.d === 1) {
        num = f.s * f.n;
    } else {
        num = (f.s * f.n + " / " + f.d);
    }
    return num;
}