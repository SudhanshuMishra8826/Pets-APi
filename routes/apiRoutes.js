const express = require('express')
const Pet = require('../models/pets')
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

const multer = require('multer');
const pets = require('../models/pets');
const reader = require('xlsx')

//Initialize Multer for file reading from api calls
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
});


// Lists all pets
router.get('/pet', async (req, res) => {
    try {
        const pets = await Pet.find()
        res.json(pets);
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
});

// Fetches a single pet from the database using the specified id
router.get('/pet/:petid', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.petid)
        if (pet != null) {
            res.json(pet);
        } else {
            res.status(404).send('Pet not found')
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }

})

// Create a pet entry in the db using normal api request
router.post('/pet/create', async (req, res) => {

    const pets = new Pet({
        name: req.body.name,
        type: req.body.type,
        breed: req.body.breed,
        age: req.body.age,
    });

    try {
        const savedPets = await pets.save();
        res.status(200).send(savedPets);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete pet entry in the db using id
router.delete('/pet/:petid', async (req, res) => {
    try {
        const removedPet = await Pet.remove({ _id: req.params.petid })
        res.json(removedPet);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }

})

// Update pet entry in the db using id
router.patch('/pet/:petid', async (req, res) => {
    try {
        const removedPet = await Pet.updateOne({ _id: req.params.petid }, req.body)
        res.json(removedPet);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }

})

// Create bulk pet entry in the db using Excel
router.post('/pet', upload.single('records'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No files were uploaded.");
        }
        let data = []
        const file = reader.readFile(req.file.path);
        const sheets = file.SheetNames

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((r) => {
                data.push(r)
            })
        }
        try {
            const savedPets = await pets.insertMany(data);
            res.status(200).send(savedPets);
        } catch (err) {
            console.log(data);
            res.status(500).send(err.message);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }

})

module.exports = router