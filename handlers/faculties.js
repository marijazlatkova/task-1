const Faculty = require("../pkg/faculties");

const create = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    return res.status(201).send(faculty);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAll = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("universities");
    const totalFaculties = faculties.length;
    return res.status(200).send({
      message: `${totalFaculties} faculties found successfully`,
      data: faculties
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("universities");
    return res.status(200).send(faculty);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await Faculty.findByIdAndUpdate(req.params.id);
    return res.status(204).send("Faculty updated successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    return res.status(204).send("Faculty removed successfully");
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