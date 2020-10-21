function onGenerateClick(tableNum) {
  //* Obtener tamaño matriz de inputs

  let input1 = document.getElementById("rowDim" + tableNum);
  let row = parseInt(input1.value);

  let errorContainer = document.getElementById("sizeError" + tableNum);
  errorContainer.innerHTML = "";

  if (Number.isNaN(row)) {
    //! Lanza error al usuario
    errorContainer.innerHTML = '<div class="alert alert-warning" role="alert">Ingresa número valido de filas</div>';
    return;
  }

  let input2 = document.getElementById("columnsDim" + tableNum);
  let column = parseInt(input2.value);
  if (Number.isNaN(column)) {
    //! Lanza error al usuario
    errorContainer.innerHTML = '<div class="alert alert-warning" role="alert">Ingresa número valido de columnas</div>';
    return;
  }


  //* Crea Tabla para Matriz Inputs

  //! Obtiene el elemento que va a contener la tabla
  let tb = document.getElementById("tableBody" + tableNum);
  //! limpia el contenedor
  while (tb.firstChild) {
    tb.removeChild(tb.firstChild);
  }
  //!Genera y añade nueva tabla de inputs en el contenedor
  for (let i = 0; i < row; i++) {
    let tRow = document.createElement("tr");
    for (let j = 0; j < column; j++) {
      let td = document.createElement("td");
      let placeholder = 'placeholder="F' + (i + 1) + " C" + (j + 1) + '" ';
      td.innerHTML =
        '<input type="text" class="form-control" ' + placeholder + "/>";
      tRow.appendChild(td);
    }
    tb.appendChild(tRow);
  }
}