/*jshint esversion: 6 */
const express = require('express');
const route = express.Router();
const uuid = require('uuid');
const members = require('../../members');

// Get all members
route.get('/', (req, res) => res.json(members));

// Get single member
route.get(`/:id`, (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }
});

// Create Member
route.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: 'Please include a name and email'
        });
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// Update Member
route.put(`/:id`, (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({
                    msg: 'Member update',
                    member
                });
            }
        });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }
});

// Delete Member
route.delete(`/:id`, (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }
});


module.exports = route;