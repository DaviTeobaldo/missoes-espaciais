const API_BASE = '/missions';
const missionForm = document.getElementById('mission-form');
const missionsTable = document.getElementById('missions-table');
const cancelButton = document.getElementById('cancel-edit');
const messageElement = document.getElementById('message');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');

let currentEditId = null;

const showMessage = (text, type = 'success') => {
  messageElement.textContent = text;
  messageElement.className = `message ${type}`;
  messageElement.classList.remove('hidden');

  setTimeout(() => {
    messageElement.classList.add('hidden');
  }, 3500);
};

const resetForm = () => {
  missionForm.reset();
  currentEditId = null;
  formTitle.textContent = 'Criar nova missão';
  submitButton.textContent = 'Salvar missão';
  cancelButton.classList.add('hidden');
  document.getElementById('mission-id').value = '';
};

const fillForm = (mission) => {
  currentEditId = mission.id;
  formTitle.textContent = 'Editar missão';
  submitButton.textContent = 'Atualizar missão';
  cancelButton.classList.remove('hidden');

  document.getElementById('mission-id').value = mission.id;
  document.getElementById('name').value = mission.name;
  document.getElementById('crew').value = mission.crew;
  document.getElementById('spacecraft').value = mission.spacecraft;
  document.getElementById('destination').value = mission.destination;
  document.getElementById('status').value = mission.status;
  document.getElementById('duration').value = mission.duration;
};

const fetchMissions = async () => {
  try {
    const response = await fetch(API_BASE);
    const missions = await response.json();

    missionsTable.innerHTML = missions
      .map(
        (mission) => `
          <tr>
            <td>${mission.id}</td>
            <td>${mission.name}</td>
            <td>${mission.crew}</td>
            <td>${mission.spacecraft}</td>
            <td>${mission.destination}</td>
            <td>${mission.status}</td>
            <td>${mission.duration}</td>
            <td>
              <button type="button" class="edit" data-id="${mission.id}">Editar</button>
              <button type="button" class="delete" data-id="${mission.id}">Excluir</button>
            </td>
          </tr>
        `
      )
      .join('');
  } catch (error) {
    showMessage('Erro ao carregar missões.', 'error');
  }
};

const createMission = async (mission) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mission),
  });

  if (!response.ok) {
    throw new Error('Não foi possível criar a missão.');
  }

  return response.json();
};

const updateMission = async (id, mission) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mission),
  });

  if (!response.ok) {
    throw new Error('Não foi possível atualizar a missão.');
  }

  return response.json();
};

const deleteMission = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Não foi possível deletar a missão.');
  }

  return response.json();
};

missionForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const mission = {
    name: document.getElementById('name').value.trim(),
    crew: document.getElementById('crew').value.trim(),
    spacecraft: document.getElementById('spacecraft').value.trim(),
    destination: document.getElementById('destination').value.trim(),
    status: document.getElementById('status').value.trim(),
    duration: document.getElementById('duration').value.trim(),
  };

  try {
    if (currentEditId) {
      await updateMission(currentEditId, mission);
      showMessage('Missão atualizada com sucesso.');
    } else {
      await createMission(mission);
      showMessage('Missão criada com sucesso.');
    }

    resetForm();
    fetchMissions();
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

cancelButton.addEventListener('click', resetForm);

missionsTable.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const missionId = button.dataset.id;

  if (button.classList.contains('edit')) {
    try {
      const response = await fetch(`${API_BASE}/${missionId}`);
      if (!response.ok) throw new Error('Missão não encontrada.');
      const mission = await response.json();
      fillForm(mission);
    } catch (error) {
      showMessage(error.message, 'error');
    }
    return;
  }

  if (button.classList.contains('delete')) {
    const confirmed = confirm('Deseja realmente excluir esta missão?');
    if (!confirmed) return;

    try {
      await deleteMission(missionId);
      showMessage('Missão excluída com sucesso.');
      fetchMissions();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  }
});

window.addEventListener('load', fetchMissions);
