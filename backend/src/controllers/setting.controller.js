import { setting } from "../models/setting.model.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!setting) {
      setting = await setting.create({
        currency: "INR",
        theme: "light",
      });
    }
    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { currency, theme } = req.body;
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await settings.create({
        currency,
        theme,
      });
    } else {
      settings.currency = currency;
      setting.theme = theme;
      await settings.save();
    }
    res.status(200).json({ success: true,settings,message: "Settings Updated Successfully",});
  } catch (error) {
            res.status(500).json({ message: error.message,});
  }
};
