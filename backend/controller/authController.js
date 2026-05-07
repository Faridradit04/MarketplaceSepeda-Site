import User from "../model/userModel.js";
import Bike from "../model/bikeModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// =========================
// GENERATE ACCESS TOKEN
// =========================
const generateAcessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '15m'
        }
    );
};

// =========================
// GENERATE REFRESH TOKEN
// =========================
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    );
};

// =========================
// REGISTER
// =========================
const register = async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    try {

        // VALIDASI
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // EMAIL FORMAT
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // PASSWORD
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // CHECK USER
        const existingUser = await User.findOne({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',

            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {

        console.error('REGISTER ERROR:', error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// =========================
// LOGIN
// =========================
const login = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        // VALIDASI
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // FIND USER
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // CHECK PASSWORD
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // TOKEN
        const accessToken = generateAcessToken(user);

        const refresh_token = generateRefreshToken(user);

        // SAVE REFRESH TOKEN
        await User.update(
            {
                refresh_token
            },
            {
                where: {
                    id: user.id
                }
            }
        );

        // COOKIE
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            accessToken,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number
            }
        });

    } catch (error) {

        console.error('LOGIN ERROR:', error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// =========================
// GET PROFILE
// =========================
const getProfile = async (req, res) => {

    try {

        // GET USER + JOIN BIKES
        const user = await User.findByPk(req.user.id, {

            attributes: [
                'id',
                'name',
                'email',
                'phone_number'
            ],

            include: [
                {
                    model: Bike,

                    // HARUS SAMA DENGAN ASSOCIATION
                    as: 'bikes',

                    attributes: [
                        'id',
                        'name',
                        'brand',
                        'type',
                        'price',
                        'image',
                        'createdAt'
                    ],

                    required: false
                }
            ]
        });

        // USER NOT FOUND
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // TO JSON
        const userJson = user.toJSON();

        // GET BIKES
        const bikes = userJson.bikes || [];

        // STATISTICS
        const totalBikes = bikes.length;

        const totalPrice = bikes.reduce(
            (sum, bike) => sum + (bike.price || 0),
            0
        );

        const averagePrice =
            totalBikes > 0
                ? Math.round(totalPrice / totalBikes)
                : 0;

        console.log(
            `USER ${req.user.id} | TOTAL BIKES: ${totalBikes}`
        );

        res.json({
            success: true,

            data: {
                ...userJson,

                statistics: {
                    totalBikes,
                    totalPrice,
                    averagePrice
                }
            }
        });

    } catch (error) {

        console.error('ERROR FETCH PROFILE:', error);

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// =========================
// UPDATE PROFILE
// =========================
const updateProfile = async (req, res) => {

    const {
        name,
        email,
        password,
        phone_number
    } = req.body;

    try {

        // FIND USER
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // UPDATE DATA
        await User.update(
            {
                ...(name !== undefined && { name }),

                ...(email !== undefined && { email }),

                ...(password !== undefined && {
                    password: await bcrypt.hash(password, 10)
                }),

                ...(phone_number !== undefined && {
                    phone_number
                })
            },
            {
                where: {
                    id: user.id
                }
            }
        );

        // GET UPDATED USER
        const updatedUser = await User.findByPk(user.id, {
            attributes: [
                'id',
                'name',
                'email',
                'phone_number'
            ]
        });

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        });

    } catch (error) {

        console.error('UPDATE PROFILE ERROR:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
};

// =========================
// LOGOUT
// =========================
const logout = async (req, res) => {

    try {

        const authHeader = req.headers['authorization'];

        if (
            !authHeader ||
            !authHeader.startsWith('Bearer ')
        ) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // FIND USER
        const user = await User.findOne({
            where: {
                id: decoded.id
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // REMOVE REFRESH TOKEN
        await User.update(
            {
                refresh_token: null
            },
            {
                where: {
                    id: user.id
                }
            }
        );

        // CLEAR COOKIE
        res.clearCookie('refresh_token');

        res.json({
            success: true,
            message: 'Logout successful'
        });

    } catch (error) {

        console.error('LOGOUT ERROR:', error);

        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export {
    register,
    login,
    logout,
    generateAcessToken,
    generateRefreshToken,
    updateProfile,
    getProfile
};