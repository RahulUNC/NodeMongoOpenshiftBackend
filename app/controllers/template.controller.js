const Template = require('../models/template.model.js');

// Create and Save a new Template
exports.create = (req, res) => {
    // Validate request
    if(!req.body.message) {
        return res.status(400).send({
            message: "Template contents can not be empty"
        });
    }

    // Create a Template
    const template = new Template({
        message: req.body.message, 
    });

    // Save template in the database
    template.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Template."
        });
    });
};

// Retrieve and return all templates from the database.
exports.findAll = (req, res) => {
    Template.find()
    .then(template => {
        res.send(template);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving template."
        });
    });
};

// Find a single template with a templateId
exports.findOne = (req, res) => {
    Template.findById(req.params.templateId)
    .then(template => {
        if(!template) {
            return res.status(404).send({
                message: "template not found with id " + req.params.templateId
            });            
        }
        res.send(template);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "template not found with id " + req.params.templateId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving template with id " + req.params.templateId
        });
    });
};

// Delete a template with the specified templateId in the request
exports.delete = (req, res) => {
    Template.findByIdAndRemove(req.params.templateId)
    .then(template => {
        if(!template) {
            return res.status(404).send({
                message: "Template not found with id " + req.params.templateId
            });
        }
        res.send({message: "Template deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Template not found with id " + req.params.templateId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Template with id " + req.params.templateId
        });
    });
};

// Update a Template identified by the templateId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.message) {
        return res.status(400).send({
            message: "Template approved/pending can not be empty"
        });
    }
    // Find Template and update it with the request body
    Template.findByIdAndUpdate(req.params.templateId, {
        message: req.body.message
    })
    .then(template => {
        if(!template) {
            return res.status(404).send({
                message: "Template not found with id " + req.params.templateId
            });
        }
        res.send(template);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Template not found with id " + req.params.templateId
            });                
        }
        return res.status(500).send({
            message: "Error updating Template with id " + req.params.templateId,
        });
    });
};
