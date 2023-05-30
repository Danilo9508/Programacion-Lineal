function simplexMaximizar(c, A, b, operadores) {
  // Paso 1: Inicializar la tabla simplex
  const m = A.length; // Número de restricciones
  const n = A[0].length; // Número de variables

  // Crear una matriz aumentada para la tabla simplex
  const tabla = [];
  for (let i = 0; i <= m; i++) {
    tabla[i] = [];
    for (let j = 0; j <= m + n; j++) {
      tabla[i][j] = 0;
    }
  }

  // Llenar la tabla con los coeficientes de las restricciones y la función objetivo
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      tabla[i][j] = A[i][j];
    }
    tabla[i][n + i] = 1;
    tabla[i][m + n] = b[i];

    // Agregar variables de holgura y de exceso según el operador en la restricción
    if (operadores[i] === "<=") {
      tabla[i][m + n + 1 + i] = 1;
    } else if (operadores[i] === ">=") {
      tabla[i][m + n + 1 + i] = -1;
    }
  }

  for (let j = 0; j < n; j++) {
    tabla[m][j] = -c[j];
  }
  tabla[m][m + n] = 0;

  // Paso 2: Iterar hasta que se alcance la solución óptima
  while (true) {
    // Encontrar la columna pivote (la más negativa)
    let columnaPivote = 0;
    for (let j = 1; j <= m + n; j++) {
      if (tabla[m][j] < tabla[m][columnaPivote]) {
        columnaPivote = j;
      }
    }

    // Si todos los valores de la columna pivote son no positivos, se ha alcanzado la solución óptima
    if (tabla[m][columnaPivote] >= 0) {
      break;
    }

    // Encontrar la fila pivote
    let filaPivote = -1;
    for (let i = 0; i < m; i++) {
      if (tabla[i][columnaPivote] > 0) {
        if (filaPivote === -1 || tabla[i][m + n] / tabla[i][columnaPivote] < tabla[filaPivote][m + n] / tabla[filaPivote][columnaPivote]) {
          filaPivote = i;
        }
      }
    }

    // Si no se encuentra una fila pivote, el problema es ilimitado
    if (filaPivote === -1) {
      throw new Error("El problema es ilimitado");
    }

    // Hacer que el elemento pivote sea igual a 1
    const elementoPivote = tabla[filaPivote][columnaPivote];
    for (let j = 0; j <= m + n; j++) {
      tabla[filaPivote][j] /= elementoPivote;
    }

    // Actualizar la tabla simplex
    for (let i = 0; i <= m; i++) {
      if (i !== filaPivote) {
        const factor = tabla[i][columnaPivote];
        for (let j = 0; j <= m + n; j++) {
          tabla[i][j] -= factor * tabla[filaPivote][j];
        }
      }
    }
  }

  // Paso 3: Extraer y devolver la solución óptima
  const solucion = [];
  for (let j = 0; j < n; j++) {
    let valor = 0;
    let filaPivote = -1;
    for (let i = 0; i < m; i++) {
      if (Math.abs(tabla[i][j]) > valor) {
        valor = Math.abs(tabla[i][j]);
        filaPivote = i;
      }
    }
    if (filaPivote !== -1) {
      solucion[j] = tabla[filaPivote][m + n] / tabla[filaPivote][j];
    } else {
      solucion[j] = 0;
    }
  }

  let valorMaximizado = 0;
  for (let j = 0; j < n; j++) {
    let valor = 0;
    let filaPivote = -1;
    for (let i = 0; i < m; i++) {
      if (Math.abs(tabla[i][j]) > valor) {
        valor = Math.abs(tabla[i][j]);
        filaPivote = i;
      }
    }
    if (filaPivote !== -1) {
      solucion[j] = tabla[filaPivote][m + n] / tabla[filaPivote][j];
      valorMaximizado += c[j] * solucion[j];
    } else {
      solucion[j] = 0;
    }
  }

  return {
    solucion,
    valorMaximizado
  };

}

// Ejemplo de uso 1:
const c = [10, 15]; // Coeficientes de la función objetivo (utilidad de $10 por unidad de A y $15 por unidad de B)
const A = [[2, 1], [1, 3], [3, 2]]; // Coeficientes de las restricciones de tiempo de producción
const b = [40, 60, 70]; // Disponibilidad de horas en cada departamento
const operadores = ["<=", "<=", "<="]; // Operadores en las restricciones

// const resultado = simplexMaximizar(c, A, b, operadores);
// console.log("Solución óptima:", resultado.solucion);
// console.log("Utilidad maximizada:", resultado.valorMaximizado);


// Ejemplo de uso 2:

// Definir los arreglos de coeficientes y restricciones
const c1 = [5, 4, 3, 6];

const A1 = [
  [1, 1, 0, 0],
  [0, 0, 1, 1],
  [1, 0, 1, 0],
  [0, 1, 0, 1]
];

const b1 = [100, 80, 70, 90];

const operadores1 = ["<=", ">=", "<=", ">="];
// const resultado1 = simplexMaximizar(c1, A1, b1, operadores1);

// // Imprimir la solución obtenida
// console.log("Solución óptima:", resultado1.solucion);
// console.log("Valor máximo:", resultado1.valorMaximizado);




//-----------------------------------------------------------------------------------
function simplexMinimizar(c, A, b, operaciones) {
  // Paso 1: Inicializar la tabla simplex
  const m = A.length; // Número de restricciones
  const n = A[0].length; // Número de variables

  // Crear una matriz aumentada para la tabla simplex
  const tabla = [];
  for (let i = 0; i <= m; i++) {
    tabla[i] = [];
    for (let j = 0; j <= m + n; j++) {
      tabla[i][j] = 0;
    }
  }

  // Llenar la tabla con los coeficientes de las restricciones y la función objetivo
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      tabla[i][j] = A[i][j];
    }
    tabla[i][n + i] = 1;
    tabla[i][m + n] = b[i];

    // Agregar variables de holgura y de exceso según el operador en la restricción
    if (operaciones[i] === "<=") {
      tabla[i][m + n + 1 + i] = 1;
    } else if (operaciones[i] === ">=") {
      tabla[i][m + n + 1 + i] = -1;
    }
  }

  for (let j = 0; j < n; j++) {
    tabla[m][j] = c[j]; // Se eliminó el cambio de signo para minimizar
  }
  tabla[m][m + n] = 0;

  // Paso 2: Iterar hasta que se alcance la solución óptima
  while (true) {
    // Encontrar la columna pivote (la más negativa)
    let columnaPivote = 0;
    for (let j = 1; j <= m + n; j++) {
      if (tabla[m][j] < tabla[m][columnaPivote]) {
        columnaPivote = j;
      }
    }

    // Si todos los valores de la columna pivote son no positivos, se ha alcanzado la solución óptima
    if (tabla[m][columnaPivote] >= 0) {
      break;
    }

    // Encontrar la fila pivote
    let filaPivote = -1;
    for (let i = 0; i < m; i++) {
      if (tabla[i][columnaPivote] > 0) {
        if (filaPivote === -1 || tabla[i][m + n] / tabla[i][columnaPivote] < tabla[filaPivote][m + n] / tabla[filaPivote][columnaPivote]) {
          filaPivote = i;
        }
      }
    }

    // Si no se encuentra una fila pivote, el problema es ilimitado
    if (filaPivote === -1) {
      throw new Error("El problema es ilimitado");
    }

    // Hacer que el elemento pivote sea igual a 1
    const elementoPivote = tabla[filaPivote][columnaPivote];
    for (let j = 0; j <= m + n; j++) {
      tabla[filaPivote][j] /= elementoPivote;
    }

    // Actualizar la tabla simplex
    for (let i = 0; i <= m; i++) {
      if (i !== filaPivote) {
        const factor = tabla[i][columnaPivote];
        for (let j = 0; j <= m + n; j++) {
          tabla[i][j] -= factor * tabla[filaPivote][j];
        }
      }
    }
  }

  // Paso 3: Extraer y devolver la solución óptima
  const solucion = [];
  for (let j = 0; j < n; j++) {
    let valor = 0;
    let filaPivote = -1;
    for (let i = 0; i < m; i++) {
      if (Math.abs(tabla[i][j]) > valor) {
        valor = Math.abs(tabla[i][j]);
        filaPivote = i;
      }
    }
    if (filaPivote !== -1) {
      solucion[j] = tabla[filaPivote][m + n] / tabla[filaPivote][j];
    } else {
      solucion[j] = 0;
    }
  }

  let valorMinimizado = tabla[m][m + n]; // Aquí se obtiene el valor minimizado sin cambiar el signo
  return {
    solucion,
    valorMinimizado
  };
}

// Ejemplo de uso 1
const c2 = [3, 2, -4, 5]; // Coeficientes de la función objetivo
const A2 = [
  [2, 1, -3, 1],  // Restricción 1
  [-1, 2, 1, 4],  // Restricción 2
  [3, 1, -2, 5],  // Restricción 3
]; // Coeficientes de las restricciones
const b2 = [4, 6, 5]; // Lados derecho de las restricciones
const operaciones = ["<=", "<=", "<="]; // Operaciones de las restricciones

// const resultado = simplexMinimizar(c2, A2, b2, operaciones);
// console.log("Solución:", resultado.solucion);
// console.log("Valor minimizado:", resultado.valorMinimizado);

//ejemplo 2 

const c3 = [2, 3, 4]; // Coeficientes de la función objetivo
const A3 = [
  [1, 1, 0], // Restricción 1
  [0, 0, 1], // Restricción 2
]; // Coeficientes de las restricciones
const b3 = [5, 3]; // Lados derecho de las restricciones
const operaciones2 = ['>=', '<=']; // Operadores de las restricciones

//const resultado2 = simplexMinimizar(c3, A3, b3, operaciones2);
// console.log("Solución:", resultado2.solucion);
// console.log("Valor minimizado:", resultado2.valorMinimizado);


