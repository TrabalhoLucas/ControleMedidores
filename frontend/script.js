// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:5000/api/records';
  const recordForm = document.getElementById('recordForm');
  const recordIdInput = document.getElementById('recordId');
  const medidorInput = document.getElementById('medidor');
  const notaInput = document.getElementById('nota');
  const enderecoInput = document.getElementById('endereco');
  const searchInput = document.getElementById('search');
  const recordsTableBody = document.querySelector('#recordsTable tbody');

  const fetchRecords = async () => {
    const response = await fetch(apiUrl);
    const records = await response.json();
    renderRecords(records);
  };

  const renderRecords = (records) => {
    recordsTableBody.innerHTML = '';
    records.forEach(record => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.id}</td>
        <td>${record.medidor}</td>
        <td>${record.nota}</td>
        <td>${record.endereco}</td>
        <td>
          <button class="edit-btn" data-id="${record.id}">Editar</button>
          <button class="delete-btn" data-id="${record.id}">Excluir</button>
        </td>
      `;
      recordsTableBody.appendChild(row);
    });

    // Adicionar event listeners para os botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', () => editRecord(button.getAttribute('data-id')));
    });
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', () => deleteRecord(button.getAttribute('data-id')));
    });
  };

  const editRecord = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    const record = await response.json();
    recordIdInput.value = record.id;
    medidorInput.value = record.medidor;
    notaInput.value = record.nota;
    enderecoInput.value = record.endereco;
  };

  const deleteRecord = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    fetchRecords();
  };

  recordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = recordIdInput.value;
    const medidor = medidorInput.value;
    const nota = notaInput.value;
    const endereco = enderecoInput.value;

    const record = { medidor, nota, endereco };

    if (id) {
      await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });
    } else {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      });
    }

    recordForm.reset();
    fetchRecords();
  });

  searchInput.addEventListener('input', async () => {
    const search = searchInput.value.toLowerCase();
    const response = await fetch(apiUrl);
    const records = await response.json();
    const filteredRecords = records.filter(record => 
      record.medidor.toLowerCase().includes(search) ||
      record.nota.toLowerCase().includes(search) ||
      record.endereco.toLowerCase().includes(search)
    );
    renderRecords(filteredRecords);
  });

  fetchRecords();
});
