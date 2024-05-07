import { Popup } from '../models';

export const createPopup = async (req, res) => {
  try {
    const { content, header, position, url, actionButtonText, appearance, settings, createdBy } = req.body;
    const newPopup = await Popup.create({
      content,
      header,
      position,
      url,
      actionButtonText,
      appearance,
      settings,
      createdBy
    });
    res.status(201).json(newPopup);
  } catch (error) {
    console.error('Error creating popup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPopups = async (req, res) => {
  try {
    const popups = await Popup.findAll();
    res.status(200).json(popups);
  } catch (error) {
    console.error('Error fetching popups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPopupById = async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findByPk(id);
    if (!popup) {
      return res.status(404).json({ error: 'Popup not found' });
    }
    res.status(200).json(popup);
  } catch (error) {
    console.error('Error fetching popup by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

