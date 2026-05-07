import { Op } from "sequelize";
import Bike from "../model/bikeModel.js";
import User from "../model/userModel.js";

// =========================
// CREATE BIKE
// =========================
const createBike = async (req, res) => {
  const { name, price, brand, type, description, image } = req.body;
  const userId = req.user?.id;

  try {
    // Validasi input
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required"
      });
    }

    // Validasi login
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // Create bike
    const bike = await Bike.create({
      userId,
      name,
      price,
      brand: brand || null,
      type: type || null,
      description: description || null,
      image: image || null
    });

    res.status(201).json({
      success: true,
      message: "Bike created successfully",
      data: bike
    });

  } catch (error) {
    console.error("CREATE BIKE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================
// GET ALL BIKES
// =========================
const getAllBikes = async (req, res) => {
  const { page = 1, limit = 100, name } = req.query;

  try {
    const parsedPage = Math.max(parseInt(page) || 1, 1);
    const parsedLimit = Math.min(parseInt(limit) || 100, 1000);

    // Search filter
    const where = name
      ? {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      : {};

    // Get bikes
    const result = await Bike.findAndCountAll({
      where,
      limit: parsedLimit,
      offset: (parsedPage - 1) * parsedLimit,
      order: [["id", "DESC"]],

      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "phone_number"
          ],

          // COUNT JUMLAH SEPEDA USER
          include: [
            {
              model: Bike,
              as: "bikes",
              attributes: ["id"]
            }
          ]
        }
      ]
    });

    // Tambahkan total bike per user
    const bikesWithCount = result.rows.map((bike) => {
      const bikeJson = bike.toJSON();

      return {
        ...bikeJson,

        user: bikeJson.user
          ? {
              ...bikeJson.user,
              totalBikes: bikeJson.user.bikes?.length || 0
            }
          : null
      };
    });

    res.status(200).json({
      success: true,
      total: result.count,
      page: parsedPage,
      totalPages: Math.ceil(result.count / parsedLimit),
      data: bikesWithCount
    });

  } catch (error) {
    console.error("GET ALL BIKES ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================
// GET BIKE BY ID
// =========================
const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findOne({
      where: {
        id: req.params.id
      },

      include: [
        {
          model: User,
          as: "user",
          attributes: [
            "id",
            "name",
            "phone_number"
          ],

          // COUNT JUMLAH SEPEDA USER
          include: [
            {
              model: Bike,
              as: "bikes",
              attributes: ["id"]
            }
          ]
        }
      ]
    });

    // Jika bike tidak ada
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike tidak ditemukan"
      });
    }

    const bikeJson = bike.toJSON();

    const finalData = {
      ...bikeJson,

      user: bikeJson.user
        ? {
            ...bikeJson.user,
            totalBikes: bikeJson.user.bikes?.length || 0
          }
        : null
    };

    res.status(200).json({
      success: true,
      data: finalData
    });

  } catch (error) {
    console.error("GET BIKE BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================
// UPDATE BIKE
// =========================
const updateBike = async (req, res) => {
  const { name, price, brand, type, description, image } = req.body;
  const userId = req.user?.id;

  try {
    const bike = await Bike.findByPk(req.params.id);

    // Cek bike ada atau tidak
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found"
      });
    }

    // Validasi pemilik bike
    if (bike.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized - You can only update your own bikes"
      });
    }

    // Update data
    await bike.update({
      ...(name !== undefined && { name }),
      ...(price !== undefined && { price }),
      ...(brand !== undefined && { brand }),
      ...(type !== undefined && { type }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image })
    });

    res.status(200).json({
      success: true,
      message: "Bike updated successfully",
      data: bike
    });

  } catch (error) {
    console.error("UPDATE BIKE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =========================
// DELETE BIKE
// =========================
const deleteBike = async (req, res) => {
  const userId = req.user?.id;

  try {
    const bike = await Bike.findByPk(req.params.id);

    // Cek bike ada atau tidak
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found"
      });
    }

    // Validasi pemilik bike
    if (bike.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized - You can only delete your own bikes"
      });
    }

    // Delete bike
    await bike.destroy();

    res.status(200).json({
      success: true,
      message: "Bike deleted successfully"
    });

  } catch (error) {
    console.error("DELETE BIKE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike
};