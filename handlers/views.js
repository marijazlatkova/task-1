const University = require("../pkg/universities");
const Faculty = require("../pkg/faculties");

const view = async (req, res) => {
  try {
    const universities = await University.find().populate("faculties");
    return res.render("universities", { universities });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const viewDetails = async (req, res) => {
  try {
    const universities = await University.find();
    const faculty = await Faculty.findById(req.params.id);
    return res.render("universitiesDetails", { universities, faculty });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const create = async (req, res) => {
  try {
    const facultyData = req.body;
    const universityId = facultyData.university;
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).send("University not found");
    }
    const faculty = await Faculty.create(facultyData);
    university.faculties.push(faculty._id);
    await university.save();    
    return res.redirect("/viewUniversities");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const modify = async (req, res) => {
  try {
    await Faculty.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/viewUniversities");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const remove = async (req, res) => {
  try {
    const facultyId = req.params.id;
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).send("Faculty not found");
    }
    const universityId = faculty.university;
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).send("University not found for faculty");
    }
    university.faculties = university.faculties.filter(id => id.toString() !== facultyId);
    await university.save();
    await Faculty.findByIdAndDelete(facultyId);
    return res.redirect("/viewUniversities");
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  view,
  viewDetails,
  create,
  modify,
  remove
};