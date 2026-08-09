const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("Database connection failed!");
        console.log(err.message);
        return;
    }
    console.log("MySQL Database Connected Successfully!");
    connection.release();
});

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }
        let dbRole;
        if (role === "management") {
            dbRole = "manager";
        } else if (role === "staff") {
            dbRole = "staff";
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid role!"
            });
        }
        const checkUser = "SELECT id FROM users WHERE email = ?";
        db.query(checkUser, [email], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database error!"
                });
            }
            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email already registered!"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = `
                INSERT INTO users
                (name, email, password, role)
                VALUES (?, ?, ?, ?)
            `;
            db.query(
                sql,
                [name, email, hashedPassword, dbRole],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "Registration failed!"
                        });
                    }
                    res.status(201).json({
                        success: true,
                        message: "Registration successful!",
                        userId: result.insertId
                    });
                }
            );
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error!"
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required!"
            });
        }
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (err, results) => {
            if (err) {
                console.log("Login Database Error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Database error!"
                });
            }
            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Gmail or Password!"
                });
            }
            const user = results[0];
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );
            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Gmail or Password!"
                });
            }
            let redirectPage;
            if (user.role === "admin") {
                redirectPage = "/admin.html";
            }
            else if (user.role === "manager") {
                redirectPage = "/manager.html";
            }
            else if (user.role === "staff") {
                redirectPage = "/staff.html";
            }
            else {
                return res.status(403).json({
                    success: false,
                    message: "Invalid user role!"
                });
            }
            res.status(200).json({
                success: true,
                message: "Login Successful!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                redirect: redirectPage
            });
        });
    } catch (error) {
        console.log("Login Server Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error!"
        });
    }
});

app.get("/api/admin/profile", async (req, res) => {
    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }
        const adminId = req.session.userId;
        const [rows] = await db.query(
            `SELECT id, name, email
             FROM users
             WHERE id = ? AND role = 'admin'`,
            [adminId]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }
        res.json({
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email
        });
    } catch (error) {
        console.error("Admin profile error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

app.post("/api/products", (req, res) => {
    try {
        const {
            productName,
            sku,
            category,
            purchaseCost,
            sellingPrice,
            quantity,
            lowStockLevel
        } = req.body;
        if (
            !productName ||
            !sku ||
            !category ||
            purchaseCost === "" ||
            sellingPrice === "" ||
            quantity === "" ||
            lowStockLevel === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "All product fields are required!"
            });
        }
        const sql = `
            INSERT INTO products
            (
                product_name,
                sku,
                category,
                purchase_cost,
                sell_price,
                quantity,
                mls
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            sql,
            [
                productName,
                sku,
                category,
                purchaseCost,
                sellingPrice,
                quantity,
                lowStockLevel
            ],
            (err, result) => {
                if (err) {
                    console.error(
                        "Add Product Database Error:",
                        err
                    );
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add product!"
                    });
                }
                res.status(201).json({
                    success: true,
                    message: "Product added successfully!",
                    productId: result.insertId
                });
            }
        );
    } catch (error) {
        console.error(
            "Add Product Server Error:",
            error
        );
        res.status(500).json({
            success: false,
            message: "Server error!"
        });
    }
});

app.get("/api/products", (req, res) => {
    const sql = `
        SELECT
            id,
            product_name,
            sku,
            category,
            purchase_cost,
            sell_price,
            quantity,
            mls
        FROM products`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(
                "Fetch Products Database Error:",
                err
            );
            return res.status(500).json({
                success: false,
                message: "Failed to fetch products!"
            });
        }
        res.status(200).json({
            success: true,
            products: results
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});