const express = require("express")
const institutionRouter = require(express.Router)
const {createInstitution, getAllInstitutions, getInstitutionById, updateInstitution, deleteInstitution} = require("../controllers/institutions.controller")

institutionRouter.get("/institution", getInstitutionById)
institutionRouter.get("/institutions", getAllInstitutions)
institutionRouter.post("/create", createInstitution)
institutionRouter.post("/update", updateInstitution)
institutionRouter.post("/delete", deleteInstitution)