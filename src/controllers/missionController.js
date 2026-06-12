const missionModel = require('../models/missionModel');

const createMission = (req, res) => {
  const { name, crew, spacecraft, destination, status, duration } = req.body;

  if (!name || !crew || !spacecraft || !destination || !status || !duration) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const mission = { name, crew, spacecraft, destination, status, duration };

  missionModel.createMission(mission, (err, missionId) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar missão espacial.' });
    }

    res.status(201).json({
      id: missionId,
      ...mission,
    });
  });
};

const getMissions = (req, res) => {
  missionModel.getMissions((err, missions) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar missões espaciais.' });
    }

    res.status(200).json(missions);
  });
};

const getMissionById = (req, res) => {
  const { id } = req.params;

  missionModel.getMissionById(id, (err, mission) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar a missão espacial.' });
    }

    if (!mission) {
      return res.status(404).json({ message: 'Missão não encontrada.' });
    }

    res.status(200).json(mission);
  });
};

const updateMission = (req, res) => {
  const { id } = req.params;
  const { name, crew, spacecraft, destination, status, duration } = req.body;

  if (!name || !crew || !spacecraft || !destination || !status || !duration) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  const mission = { name, crew, spacecraft, destination, status, duration };

  missionModel.updateMission(id, mission, (err, changes) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar missão espacial.' });
    }

    if (changes === 0) {
      return res.status(404).json({ message: 'Missão não encontrada.' });
    }

    res.status(200).json({ id: Number(id), ...mission });
  });
};

const deleteMission = (req, res) => {
  const { id } = req.params;

  missionModel.deleteMission(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao deletar missão espacial.' });
    }

    if (changes === 0) {
      return res.status(404).json({ message: 'Missão não encontrada.' });
    }

    res.status(200).json({ message: 'Missão deletada com sucesso.' });
  });
};

module.exports = {
  createMission,
  getMissions,
  getMissionById,
  updateMission,
  deleteMission,
};
