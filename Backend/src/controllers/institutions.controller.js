const Institution = require("../models/institutions.model")
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

// Create
const createInstitution = async (req,res) => {
    try {
        const institutionData = req.body
        const newInstitution = new Institution(institutionData);
        await newInstitution.save();
        return res.status(200).json(newInstitution);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//Obtengo todas las instituciones.
const getAllInstitutions = async (req,res) => {
    try {
        const institutions = await Institution.find();
        return res.status(200).json(institutions);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Obtengo institución por id.
const getInstitutionById = async (req,res) => {
    try {
        const id = req.body
        const institution = await Institution.findById(id);
        if (!institution) {
            throw new Error('Institution not found');
        }
        return res.status(200).json(institution);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Editar institución.
const updateInstitution = async (req,res) => {
    try {
        const {id, updatedData} = req.body
        const institution = await Institution.findByIdAndUpdate(id, updatedData, { new: true });
        if (!institution) {
            throw new Error('Institution not found');
        }
        return res.status(200).json(institution);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Borrar institución.
const deleteInstitution = async (req,res) => {
    try {
        const id = req.body
        const institution = await Institution.findByIdAndDelete(id);
        if (!institution) {
            throw new Error('Institution not found');
        }
        return res.status(200).json(institution);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {createInstitution, getAllInstitutions, getInstitutionById, updateInstitution, deleteInstitution}