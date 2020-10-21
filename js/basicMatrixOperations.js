//!Derterminant
function det(matrix) {

    //!si Matrix 2x2, Calcular determinante
    if (matrix.length == 2) {
        let a = matrix[0][0];
        let b = matrix[0][1];
        let c = matrix[1][0];
        let d = matrix[1][1];
        return a * d - c * b;
    }
    //! Tomando la fila 1
    const row = 0;

    //!Matrix es 3x3 o mayor; recursividad para reducir a 2x2
    let totalDet = 0;
    for (let column = 0; column < matrix.length; column += 1) {
        //!Generar cofactor
        let cofactor = getCofactorFrom(matrix, row, column);
        //!Calcular determinante para matrix por cofactor
        let subDet = det(cofactor);
        let sum = matrix[row][column] * subDet;
        //!Alternar signo a sumar y restar la variable sum para acumular en el total
        let negative = (column + 1) % 2 == 0;
        if (negative) { sum *= -1; }
        totalDet += sum;
    }

    return totalDet;
}
//*obtiene la matriz reducida de cofactores para la funcion main det
function getCofactorFrom(matrixO, row, column) {
    let matrix = copy(matrixO);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].splice(column, 1);
    }
    matrix.splice(row, 1);

    return matrix;
}
//* valida matrix es cuadrada (2x2, 3x3...)
function isSquare(matrix) {
    return (matrix.length == matrix[0].length);
}


//!Transpuesta
function transpose(matrixO) {
    let matrix = copy(matrixO);
    let transpose = [];

    let height = matrix.length;
    let width = matrix[0].length;
    for (let column = 0; column < width; column++) {
        transpose.push([]);
        for (let row = 0; row < height; row++) {
            transpose[column].push(matrix[row][column]);
        }
    }

    return transpose;
}

//!Multiply
// *Validacion si puede Multiplicar (filasA == columnasB)
function canMultiply(matrix1, matrix2) {
    return (matrix1[0].length == matrix2.length);
}

// *Multiplicación funcion main 
function multiply(matrix1O, matrix2O) {
    let matrix1 = copy(matrix1O);
    let matrix2 = copy(matrix2O);
    let transformMatrix = [];

    for (let i = 0; i < matrix1.length; i++) {
        transformMatrix.push([]);
        let v1 = matrix1[i];
        for (let j = 0; j < matrix2[0].length; j++) {
            let v2 = getColumnVectorFrom(matrix2, j);
            let element = dotProductof(v1, v2);
            transformMatrix[i].push(element);
        }

    }

    return transformMatrix;
}

// *producto de vector*vector para funcion main
function dotProductof(vector1O, vector2O) {
    let vector1 = copy(vector1O);
    let vector2 = copy(vector2O);

    let sum = 0
    for (let i = 0; i < vector1.length; i++) {
        sum += vector1[i] * vector2[i];
    }

    return sum;
}

//* obtiene arreglo de vectores de columna de Matrix para funcion main
function getColumnVectorFrom(matrixO, c) {
    let matrix = copy(matrixO);
    let cVector = [];

    for (let row = 0; row < matrix.length; row++) {
        cVector.push(matrix[row][c]);
    }

    return cVector;
}


//!Suma & Resta

//*Valida si son de igual tamaño (Asize == Bsize)
function sameSize(matrix1, matrix2) {
    return (matrix1.length == matrix2.length) && (matrix1[0].length == matrix2[0].length);
}

//*Suma
function add(matrix1O, matrix2O) {
    let matrix1 = copy(matrix1O);
    let matrix2 = copy(matrix2O);
    let sumMatrix = [];

    for (let i = 0; i < matrix1.length; i++) {
        sumMatrix.push([]);
        for (let j = 0; j < matrix1[1].length; j++) {
            sumMatrix[i].push(matrix1[i][j] + matrix2[i][j]);
        }
    }

    return sumMatrix
}

//*Resta
function subtract(matrix1O, matrix2O) {
    let matrix2 = multiplyByConstant(-1, matrix2O);
    return add(matrix1O, matrix2);
}

//*mult constante * Matrix
function multiplyByConstant(k, matrixO) {
    let matrix = copy(matrixO);
    let transformMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
        transformMatrix.push([]);
        for (let j = 0; j < matrix[1].length; j++) {
            transformMatrix[i].push(k * matrix[i][j]);
        }
    }

    return transformMatrix;
}

//! Funcion de utilidad o ayuda

//? Function usada para copiar completamente la matriz
//la funcion crea un clon profundo de objetos o matrices. 
function copy(aObject) {
    if (!aObject) {
        return aObject;
    }
    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? copy(v) : v;
    }
    return bObject;
}
