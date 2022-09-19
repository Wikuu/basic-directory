// Store editing tr
let row;

function addUser(e) {
  e.preventDefault();
  const data = getFormValues(true);
  const table = $('#user-table-body');

  const count = table.find('tr').length;

  // Create tr element with needed data
  const row = $(`<tr>
                    <th scope="row">${count + 1}</th>
                    <td>${data.name}</td>
                    <td>${data.surname}</td>
                    <td>${data.phone}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="openUpdateModal(this)">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(this)">Delete</button>
                    </td>
                 </tr>`);

  // If alert message exists, hide it and show table
  if ($('#alert-message')) {
    $('#alert-message').css('display', 'none');
    $('table').css('display', 'table');
  }

  // Add tr element to table body
  table.append(row);
}

function deleteUser(el) {
  // Remove clicked buttons tr
  $(el).closest('tr').remove();

  // If there is no tr element in table body, hide table and show alert message
  if (!$('#user-table-body').find('tr').length) {
    $('table').css('display', 'none');
    $('#alert-message').css('display', 'block');
  }
}

function updateUser(e) {
  e.preventDefault();
  const data = getFormValues(false);

  // Get clicked buttons tr's all td's
  const rowDatas = row.find('td');

  // Change data in tr
  rowDatas.eq(0).text(data.name);
  rowDatas.eq(1).text(data.surname);
  rowDatas.eq(2).text(data.phone);

  // Close modal
  $('#exampleModal').modal('hide');
}

function openUpdateModal(el) {
  const form = document.getElementById('user-update-form');

  row = $(el).closest('tr');

  // Get all tr data
  const rowDatas = $(el).closest('tr').find('td');
  const name = rowDatas.eq(0).text();
  const surname = rowDatas.eq(1).text();
  const phone = rowDatas.eq(2).text();

  // Set input values in update form
  $(form).find('input[name="name"]').val(name);
  $(form).find('input[name="surname"]').val(surname);
  $(form).find('input[name="phone"]').val(phone);
}

function getFormValues(isCreate) {
  // If isCreate true, get create form. Otherwise get update form
  const form = isCreate
    ? document.getElementById('user-form')
    : document.getElementById('user-update-form');
  // Create form data end return as object
  const data = new FormData(form);
  return Object.fromEntries(data);
}
