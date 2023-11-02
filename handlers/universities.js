const Univerity = require("../pkg/universities");

const create = async (req, res) => {
  try {
    const university = await Univerity.create(req.body);
    return res.status(201).send(university);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAll = async (req, res) => {
  try {
    const universities = await Univerity.find().populate("faculties");
    const totalUniversities = universities.length;
    return res.status(200).send({
      message: `${totalUniversities} universities found successfully`,
      data: universities
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const university = await Univerity.findById(req.params.id);
    return res.status(200).send(university);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await Univerity.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).send("University updated successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await Univerity.findByIdAndDelete(req.params.id);
    return res.status(204).send("University removed successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove
};