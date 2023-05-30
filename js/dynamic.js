
const $fz = $('#fz'); const $cant_variable = $('#cant_variable');

const $rcs = $('#rcs');
const input = `
<div class="form-group col-md-2">
    <label for="id_i">lb_val</label>
    <input type="number" value="0" class="form-control" id="id_i" min="0" placeholder="0">
</div>
  `;
const select = `
<div class="form-group col-md-1">
    <label for="sl_id"> signo</label>
    <select class="form-control" id="sl_id">
        <option>+</option>
        <option>-</option>
    </select>
</div>
  `;
const restriccion = `
<div class="form-row" id="rcs_body" >
</div>
  `;
const r_body = `
<div class="form-group col-md-1">
    <label for="select1"> operación</label>
    <select class="form-control" id="select1">
        <option><=</option>
        <option>=</option>
        <option>>=</option>
    </select>
</div>
<div class="form-group col-md-2">
    <label for="val_r">valor</label>
    <input type="number" class="form-control" id="val_r" min="0" value="0" placeholder="0">
</div>
<div class="form-group col-md-1">
    <label for="delete"> Eliminar </label>
    <span class="form-control" style="border:none;"><a href="#!" onclick="deleteRow(index)" id="delete" type="button" class="text-danger"><i
            class="fas fa-trash fa-2x" ></i></a></span>
</div>
  `;

$('#btn_aceptar').on('click', () => {
    let cant = $cant_variable.val();
    $fz.empty();
    if (cant > '0') {
        $('#title_fz').css('display', 'block')
        $('#title_rcs').css('display', 'block')
        $('#add').css('display', 'block')
        for (let index = 1; index <= cant; index++) {

            let newInput = input.replace('id_i', `input_${index}`).replace('id_i', `input_${index}`)

            newInput = newInput.replace('lb_val', `X${index}`);
            let newSelect = select.replace('sl_id', `select_${index}`).replace('sl_id', `select_${index}`)
            if (cant != index) {
                $fz.append(newInput);
                $fz.append(newSelect);
            } else {
                $fz.append(newInput);
            }

        }
    }

});
let array = [];
let j = 0;
$('#add').on('click', () => {
    let cant = $cant_variable.val();
    if (cant > '1') {
        j++;
        array.push(j);
        $('#btn_solucionar').css('display', 'block')
        $('#btn_rest').css('display', 'block')
        let restric = restriccion.replace('rcs_body', `rcs_body_${j}`)
        $rcs.append(restric)
        let $rcs_body = $(`#rcs_body_${j}`)
        for (let index = 1; index <= cant; index++) {
            let newInput = input.replace('id_i', `inputRs_${j}_${index}`)
                .replace('id_i', `inputRs_${j}_${index}`)
                .replace('lb_val', `X${index}`)
            let newSelect = select.replace('sl_id', `selectRs_${j}_${index}`)
                .replace('sl_id', `selectRs_${j}_${index}`)
            if (cant != index) {
                $rcs_body.append(newInput);
                $rcs_body.append(newSelect);
            } else {
                $rcs_body.append(newInput);
            }
        }
        let new_r_body = r_body.replace('val_r', `value_rs${j}`).replace('val_r', `value_rs${j}`)
            .replace('index', j).replace('select1', `op_${j}`).replace('select1', `op_${j}`)
        $rcs_body.append(new_r_body);
    }
});

const deleteRow = (index) => {
    $(`#rcs_body_${index}`).empty();
    array = array.filter(i => i != index);
    j--
}

$('#btn_rest').on('click', () => {
    location.reload();
})
$('#btn_solucionar').on('click', () => {
    let functionZ = [];
    let constraintList = [];
    let operatorRS = [];
    let constraintRule = []
    let solucionRestriccion = [];
    let cant = $cant_variable.val();
    for (let index = 1; index <= cant; index++) {
        let value = parseInt($(`#input_${index}`).val());
        let signo = parseInt($(`#select_${index}`).val());
        value = signo === '-' ? (value * -1) : value
        functionZ.push(value);
    }
    for (let i = 1; i <= j; i++) {
        let constraint = [];
        for (let x = 1; x <= cant; x++) {
            let input = parseInt($(`#inputRs_${i}_${x}`).val());
            let signo = parseInt($(`#selectRs_${i}_${x}`).val());
            input = signo === '-' ? (input * -1) : input
            constraint.push(input)
        }
        let value = parseInt($(`#value_rs${i}`).val());
        solucionRestriccion.push(value);
        let operator = $(`#op_${i}`).val();
        operatorRS.push(operator)
        constraintList.push(constraint);

        constraintRule.push({ operator: operator, value: value })

    }
    console.log('funcion z', functionZ);
    console.log('restricciones', constraintList);
    console.log('solucion', solucionRestriccion);
    console.log('operacion', operatorRS);
    //const solution = simplex2(constraintList, solucionRestriccion, functionZ, constraintRule);
    // const solution = solution2(functionZ, constraintList, solucionRestriccion, operatorRS);
    // Resolver el problema de programación lineal
    // const solution = solveLinearProgramming();

    // Imprimir la solución
    // console.log("Solución óptima:", solution.values);
    // console.log("Valor óptimo:", solution.objectiveValue);
    // // Resolver el problema de programación lineal
    // console.log("Valor óptimo:", solution.optimalValue);
    // console.log("Valores de las variables:", solution.variables);
    $('#title_solution').css('display', 'block')
    let ouput = "";
    if ($('#radioMin').is(':checked')) {
        const response = simplexMinimizar(functionZ, constraintList, solucionRestriccion, operatorRS);

        for (let i = 0; i < response.solucion.length; i++) {
            ouput += `X${i+1}:${response.solucion[i]} `
        }
        ouput += "\n\r"
        ouput += `Valor Minimizado: ${response.valorMinimizado} `
        $(`#resultado`).text(ouput)
    } else {
        const response = simplexMaximizar(functionZ, constraintList, solucionRestriccion, operatorRS);

        for (let i = 0; i < response.solucion.length; i++) {
            ouput += `X${i+1}:${response.solucion[i]} `
        }
        ouput += "\n\r"
        ouput += `Valor Maximizado: ${response.valorMaximizado} `
        $(`#resultado`).text(ouput)
    }


})





// Define la función objetivo y las restricciones
const objectiveFunctionCoefficients = [3, 5]; // Coeficientes de la función objetivo
const constraintsCoefficients = [
    [2, 1], // Restricción 1: 2x + y <= 10
    [1, 2], // Restricción 2: x + 2y <= 10
];
const constraintsRightHandSide = [10, 10]; // Lado derecho de las restricciones

// Implementación del algoritmo de programación lineal
function solveLinearProgramming(objectiveFunction, constraints, resultConstraint) {
    const numVariables = objectiveFunction.length;
    const numConstraints = constraints.length;

    // Crear la tabla del simplex
    const simplexTable = [];
    for (let i = 0; i <= numConstraints; i++) {
        simplexTable[i] = [...constraints[i] || [], resultConstraint[i] || 0];
    }
    simplexTable.push([
        ...objectiveFunction.map(coefficient => -coefficient),
        0
    ]);

    const numTableColumns = numVariables + numConstraints + 1;

    while (true) {
        // Encontrar la columna pivote (variable de entrada)
        const pivotColumn = simplexTable[numConstraints]
            .slice(0, numTableColumns - 1)
            .findIndex(coefficient => coefficient < 0);

        if (pivotColumn === -1) {
            break; // No hay columnas negativas, se ha encontrado la solución óptima
        }

        // Encontrar la fila pivote (variable de salida)
        let pivotRow = -1;
        let minRatio = Infinity;
        for (let i = 0; i < numConstraints; i++) {
            if (simplexTable[i][pivotColumn] > 0) {
                const ratio = simplexTable[i][numTableColumns - 1] / simplexTable[i][pivotColumn];
                if (ratio < minRatio) {
                    minRatio = ratio;
                    pivotRow = i;
                }
            }
        }

        if (pivotRow === -1) {
            throw new Error("El problema es no acotado"); // No hay filas positivas, el problema es no acotado
        }

        // Realizar operaciones de pivote para actualizar la tabla del simplex
        const pivotElement = simplexTable[pivotRow][pivotColumn];
        const pivotRowValues = simplexTable[pivotRow].map(value => value / pivotElement);
        simplexTable.forEach((row, i) => {
            if (i !== pivotRow) {
                const rowMultiplier = row[pivotColumn];
                for (let j = 0; j < numTableColumns; j++) {
                    row[j] -= pivotRowValues[j] * rowMultiplier;
                }
            }
        });
        simplexTable[pivotRow] = pivotRowValues;
    }

    // Extraer solución óptima y valores de variables
    const optimalValue = -simplexTable[numConstraints][numTableColumns - 1];
    const variables = simplexTable
        .slice(0, numConstraints)
        .map(row => row[numTableColumns - 1]);

    return {
        optimalValue,
        variables
    };
}

function solution2(objectiveFunction, constraintsMatrix, constraintsVector, constraintsOperator) {
    // Define la función objetivo y las restricciones
    // const objectiveFunction = [5, 8];  // Coeficientes de la función objetivo
    // const constraintsMatrix = [
    //     [1, 0],  // Restricción 1: 1x + 0y <= 10
    //     [0, 2],  // Restricción 2: 0x + 2y <= 12
    //     [3, 2]   // Restricción 3: 3x + 2y <= 18
    // ];
    // const constraintsVector = [10, 12, 18];  // Vector de los lados derechos de las restricciones
    // const constraintsOperator = ['<=', '<=', '<='];  // Operadores de las restricciones

    // Define el problema de programación lineal
    const problem = {
        optimize: objectiveFunction,  // Función objetivo a maximizar
        constraints: {
            lhs: constraintsMatrix,  // Lado izquierdo de las restricciones
            rhs: constraintsVector,  // Lado derecho de las restricciones
            operators: constraintsOperator  // Operadores de las restricciones
        },
        ints: [0, 1]  // Variables enteras (opcional)
    };

    // Resuelve el problema de programación lineal utilizando el método simplex
    const solution = math.optimize(problem);

    // Imprime la solución
    console.log('Solución encontrada:');
    console.log('Valor óptimo:', solution.result);
    console.log('Valores de las variables:', solution.x);
}

function simplex(constraints, resultConstraint, objectiveFunction) {
    // Verificar si el problema es de maximización o minimización
    var maximization = true;
    for (var i = 0; i < objectiveFunction.length; i++) {
        if (objectiveFunction[i] < 0) {
            maximization = false;
            break;
        }
    }

    // Crear la tabla inicial
    var tableau = [];
    for (var i = 0; i < constraints.length; i++) {
        tableau[i] = constraints[i].concat(resultConstraint[i]);
    }
    tableau[constraints.length] = objectiveFunction.concat(0);

    // Encontrar la columna pivote inicial
    var pivotColumn = 0;
    for (var j = 1; j < tableau[constraints.length].length - 1; j++) {
        if (tableau[constraints.length][j] < tableau[constraints.length][pivotColumn]) {
            pivotColumn = j;
        }
    }

    // Aplicar el algoritmo Simplex
    while (true) {
        // Encontrar la fila pivote
        var pivotRow = -1;
        for (var i = 0; i < tableau.length - 1; i++) {
            if (tableau[i][pivotColumn] > 0) {
                if (pivotRow === -1) {
                    pivotRow = i;
                } else if (tableau[i][tableau[i].length - 1] / tableau[i][pivotColumn] < tableau[pivotRow][tableau[pivotRow].length - 1] / tableau[pivotRow][pivotColumn]) {
                    pivotRow = i;
                }
            }
        }

        // Comprobar si no hay fila pivote (solución óptima encontrada)
        if (pivotRow === -1) {
            break;
        }

        // Realizar la operación pivot
        var pivotElement = tableau[pivotRow][pivotColumn];
        for (var j = 0; j < tableau[pivotRow].length; j++) {
            tableau[pivotRow][j] /= pivotElement;
        }
        for (var i = 0; i < tableau.length; i++) {
            if (i !== pivotRow) {
                var factor = tableau[i][pivotColumn];
                for (var j = 0; j < tableau[i].length; j++) {
                    tableau[i][j] -= factor * tableau[pivotRow][j];
                }
            }
        }

        // Encontrar la columna pivote para la próxima iteración
        pivotColumn = -1;
        for (var j = 1; j < tableau[constraints.length].length - 1; j++) {
            if (tableau[constraints.length][j] < 0) {
                if (pivotColumn === -1) {
                    pivotColumn = j;
                } else if (tableau[constraints.length][j] < tableau[constraints.length][pivotColumn]) {
                    pivotColumn = j;
                }
            }
        }
    }

    // Extraer la solución óptima y su valor
    var solution = {};
    solution.objectiveValue = maximization ? tableau[tableau.length - 1][tableau[tableau.length - 1].length - 1] : -tableau[tableau.length - 1][tableau[tableau.length - 1].length - 1];
    solution.values = new Array(objectiveFunction.length).fill(0);
    for (var i = 0; i < tableau.length - 1; i++) {
        if (tableau[i][tableau[i].length - 1] !== 0) {
            solution.values[tableau[i].indexOf(1)] = tableau[i][tableau[i].length - 1];
        }
    }

    return solution;
}




// Ejemplo de problema de programación lineal para maximizar
// var A = [
//     [2, 1],
//     [1, 3],
//     [4, 2]
//   ];
//   var b = [10, 15, 20];
//   var c = [-3, -5]; // Coeficientes negativos para maximizar
//   var constraints = [
//     { operator: "<=", value: 10 },
//     { operator: "<=", value: 15 },
//     { operator: "<=", value: 20 }
//   ];

//var result = simplex(A, b, c, constraints);







// console.log("Solución óptima: ", result.solution);
// console.log("Valor óptimo: ", result.optimalValue);

// var result = simplex2(A, b, c, constraints);

// console.log("Solución óptima: ", result.solution);
// console.log("Valor óptimo: ", result.optimalValue);


// Resto de funciones auxiliares (selectPivotColumn, checkOptimality, extractSolution) son las mismas que en los algoritmos anteriores

// Ejemplo de uso
// var A = [[2, 1], [1, 2]];
// var b = [4, 5];
// var c = [3, 4];
// //____________________
// var A = [[2, 1],
// [1, 2],
// [1, 1],
// [2, 3]];

// var b = [4, 5, 3, 7];

// var c = [3, 4, 0, 0];
//______________________________

// var A = [[2, 1, 1],
// [1, 3, 2],
// [3, 2, 4]];

// var b = [10, 20, 25];

// var c = [5, 3, 2];


// Ejemplo de uso:
/**
 * Supongamos que eres el gerente de producción de una fábrica de muebles y deseas determinar la cantidad óptima de productos que debes fabricar para maximizar tus ganancias. Tienes tres tipos de muebles: sillas (x), mesas (y) y estanterías (z). Tienes ciertos recursos disponibles, como materiales y mano de obra, que limitan la cantidad de cada tipo de mueble que puedes producir.

Las restricciones pueden ser las siguientes:

Para fabricar una silla, se requieren 2 metros cuadrados de madera, 1 hora de trabajo y 1 kilogramo de tornillos.
Para fabricar una mesa, se requieren 3 metros cuadrados de madera, 2 horas de trabajo y 2 kilogramos de tornillos.
Para fabricar una estantería, se requieren 4 metros cuadrados de madera, 2 horas de trabajo y 3 kilogramos de tornillos.
Además, tienes las siguientes restricciones de recursos:

Tienes disponibles 100 metros cuadrados de madera.
Tienes disponibles 80 horas de trabajo.
Tienes disponibles 120 kilogramos de tornillos.
Tu objetivo es maximizar tus ganancias. Supongamos que obtienes una ganancia de $10 por cada silla vendida, $15 por cada mesa vendida y $20 por cada estantería vendida.
 */
// var A = [[2, 3, 4],
// [1, 2, 2],
// [1, 2, 3]];

// var b = [100, 80, 120];

// var c = [10, 15, 20];

// var solution = simplex(A, b, c);
// console.log("Solución óptima:", solution.values);
// console.log("Valor óptimo:", solution.objectiveValue);
