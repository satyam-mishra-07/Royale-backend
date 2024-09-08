const Menu = require('../models/menu-models');

const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json({message: menu});
    } catch (err) {
        res.status(404).send(`Error 404: ${err}`);
    }
};

module.exports = getMenu;