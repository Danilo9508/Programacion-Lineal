const $fz = $('#fz'); const $cant_variable = $('#cant_variable');
const $rcs = $('#rcs');
const input = `
<div class="form-group col-md-1">
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
    <label for="exampleFormControlSelect1"> operación</label>
    <select class="form-control" id="exampleFormControlSelect1">
        <option>>=</option>
        <option>==</option>
        <option>
            <=< /option>
    </select>
</div>
<div class="form-group col-md-1">
    <label for="val_r">valor</label>
    <input type="number" class="form-control" id="val_r" min="0" placeholder="0">
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

            let newInput = input.replace('id_i', `input_${index}`)
                .replace('lb_val', 'X'.concat(index))
            let newSelect = select.replace('sl_id', `select_${index}`)
            if (cant != index) {
                $fz.append(newInput);
                $fz.append(newSelect);
            } else {
                $fz.append(newInput);
            }

        }
    }

});

let j = 0;
$('#add').on('click', () => {
    let cant = $cant_variable.val();
    if (cant > '0') {
        j++;
        let restric = restriccion.replace('rcs_body', `rcs_body_${j}`)
        $rcs.append(restric)
        let $rcs_body = $(`#rcs_body_${j}`)
        for (let index = 1; index <= cant; index++) {
            let newInput = input.replace('id_i', `inputRs_${j}_${index}`)
                .replace('lb_val', 'X'.concat(index))
            let newSelect = select.replace('sl_id', `selectRs_${j}_${index}`)
            if (cant != index) {
                $rcs_body.append(newInput);
                $rcs_body.append(newSelect);
            } else {
                $rcs_body.append(newInput);
            }
        }
        let new_r_body = r_body.replace('val_r', `val_r${j}`)
            .replace('index', j)
        $rcs_body.append(new_r_body);
    }
});

const deleteRow = (index) => {
    $(`#rcs_body_${index}`).empty();
    j--;
}
