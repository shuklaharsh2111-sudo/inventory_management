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
app.post("/api/categories", (req, res) => {
    const {
        name,
        description
    } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category name is required."
        });
    }
    const categoryName = name.trim();
    const checkQuery = `
        SELECT id
        FROM categories
        WHERE name = ?
        LIMIT 1
    `;
    db.query(
        checkQuery,
        [categoryName],
        (err, results) => {
            if (err) {
                console.error(
                    "Check Category Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Database error while checking category."
                });
            }
            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    message:
                        "Category already exists."
                });
            }
            const insertQuery = `
                INSERT INTO categories
                (name, description)
                VALUES (?, ?)
            `;
            db.query(
                insertQuery,
                [
                    categoryName,
                    description || null
                ],
                (err, result) => {
                    if (err) {
                        console.error(
                            "Add Category Error:",
                            err
                        );
                        return res.status(500).json({
                            success: false,
                            message:
                                "Failed to add category."
                        });
                    }
                    return res.status(201).json({
                        success: true,
                        message:
                            "Category added successfully.",
                        category: {
                            id: result.insertId,
                            name: categoryName,
                            description:
                                description || null
                        }
                    });
                }
            );
        }
    );
});
app.get("/api/categories", (req, res) => {
    const query = `
        SELECT
            id,
            name,
            description,
            created_at
        FROM categories
    `;
    db.query(
        query,
        (err, results) => {
            if (err) {
                console.error(
                    "Load Categories Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch categories."
                });
            }
            return res.status(200).json({
                success: true,
                categories: results
            });
        }
    );
});
app.get("/api/categories", (req, res) => {
    const query = `
        SELECT id, name, description
        FROM categories
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(
                "Fetch Categories Error:",
                err
            );
            return res.status(500).json({
                success: false,
                message: "Failed to fetch categories."
            });
        }
        return res.status(200).json({
            success: true,
            categories: results
        });
    });
});
app.post("/api/suppliers", (req, res) => {
    const {
        name,
        contact,
        email,
        address
    } = req.body;
    if (
        !name ||
        !contact ||
        !email ||
        !address
    ) {
        return res.status(400).json({
            success: false,
            message:
                "All supplier fields are required."
        });
    }
    const query = `
        INSERT INTO suppliers
        (name, contact, email, address)
        VALUES (?, ?, ?, ?)
    `;
    db.query(
        query,
        [
            name.trim(),
            contact.trim(),
            email.trim(),
            address.trim()
        ],
        (err, result) => {
            if (err) {
                console.error(
                    "Add Supplier Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to add supplier."
                });
            }
            return res.status(201).json({
                success: true,
                message:
                    "Supplier added successfully.",
                supplier: {
                    id: result.insertId,
                    name: name.trim(),
                    contact: contact.trim(),
                    email: email.trim(),
                    address: address.trim()
                }
            });
        }
    );
});
app.get("/api/suppliers", (req, res) => {
    const query = `
        SELECT
            id,
            name,
            contact,
            email,
            address,
            created_at
        FROM suppliers
        ORDER BY id DESC
    `;
    db.query(
        query,
        (err, results) => {
            if (err) {
                console.error(
                    "Fetch Suppliers Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch suppliers."
                });
            }
            return res.status(200).json({
                success: true,
                suppliers: results
            });
        }
    );
});
app.post("/api/purchases", (req, res) => {
    const {
        supplierId,
        productId,
        quantity
    } = req.body;
    if (
        !supplierId ||
        !productId ||
        !quantity
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Supplier, product and quantity are required."
        });
    }
    const productQuery = `
        SELECT
            id,
            product_name,
            purchase_cost
        FROM products
        WHERE id = ?
        LIMIT 1
    `;
    db.query(
        productQuery,
        [productId],
        (err, products) => {
            if (err) {
                console.error(
                    "Product Fetch Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch product."
                });
            }
            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found."
                });
            }
            const product =
                products[0];
            const costPerUnit =
                Number(
                    product.purchase_cost
                );
            const totalCost =
                Number(quantity) *
                costPerUnit;
            const insertQuery = `
                INSERT INTO purchases
                (
                    supplier_id,
                    product_id,
                    quantity,
                    cost_per_unit,
                    total_cost
                )
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(
                insertQuery,
                [
                    supplierId,
                    productId,
                    quantity,
                    costPerUnit,
                    totalCost
                ],
                (err, result) => {
                    if (err) {
                        console.error(
                            "Add Purchase Error:",
                            err
                        );
                        return res.status(500).json({
                            success: false,
                            message:
                                "Failed to add purchase."
                        });
                    }
                    const updateStockQuery = `
                        UPDATE products
                        SET quantity = quantity + ?
                        WHERE id = ?
                    `;
                    db.query(
                        updateStockQuery,
                        [
                            quantity,
                            productId
                        ],
                        (err) => {
                            if (err) {
                                console.error(
                                    "Stock Update Error:",
                                    err
                                );
                                return res.status(500).json({
                                    success: false,
                                    message:
                                        "Purchase saved but stock update failed."
                                });
                            }
                            return res.status(201).json({
                                success: true,
                                message:
                                    "Purchase added successfully.",
                                purchase: {
                                    id:
                                        result.insertId,
                                    supplierId,
                                    productId,
                                    quantity,
                                    costPerUnit,
                                    totalCost
                                }
                            });
                        }
                    );
                }
            );
        }
    );
});
app.get("/api/purchases", (req, res) => {
    const query = `
        SELECT
            p.id,
            s.name AS supplier_name,
            pr.product_name,
            p.quantity,
            p.cost_per_unit,
            p.total_cost,
            p.purchase_date
        FROM purchases p
        INNER JOIN suppliers s
            ON p.supplier_id = s.id
        INNER JOIN products pr
            ON p.product_id = pr.id
        ORDER BY p.id DESC
    `;
    db.query(
        query,
        (err, results) => {
            if (err) {
                console.error(
                    "Fetch Purchases Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch purchases."
                });
            }
            return res.status(200).json({
                success: true,
                purchases: results
            });
        }
    );
});
app.post("/api/sales", (req, res) => {
    const {
        customer,
        productId,
        quantity
    } = req.body;
    if (
        !customer ||
        !productId ||
        !quantity
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Customer, product and quantity are required."
        });
    }
    const productQuery = `
        SELECT
            id,
            product_name,
            sell_price,
            quantity AS current_stock
        FROM products
        WHERE id = ?
        LIMIT 1
    `;
    db.query(
        productQuery,
        [productId],
        (err, products) => {
            if (err) {
                console.error(
                    "Product Fetch Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch product."
                });
            }
            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found."
                });
            }
            const product =
                products[0];
            const saleQuantity =
                Number(quantity);
            const currentStock =
                Number(
                    product.current_stock
                );
            if (saleQuantity > currentStock) {
                return res.status(400).json({
                    success: false,
                    message:
                        `Insufficient stock. Available stock: ${currentStock}`
                });
            }
            const sellingPrice =
                Number(
                    product.sell_price
                );
            const totalAmount =
                saleQuantity *
                sellingPrice;
            const insertQuery = `
                INSERT INTO sales
                (
                    customer,
                    product_id,
                    quantity,
                    selling_price,
                    total_amount
                )
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(
                insertQuery,
                [
                    customer.trim(),
                    productId,
                    saleQuantity,
                    sellingPrice,
                    totalAmount
                ],
                (err, result) => {
                    if (err) {
                        console.error(
                            "Add Sale Error:",
                            err
                        );
                        return res.status(500).json({
                            success: false,
                            message:
                                "Failed to add sale."
                        });
                    }
                    const updateStockQuery = `
                        UPDATE products
                        SET quantity = quantity - ?
                        WHERE id = ?
                    `;
                    db.query(
                        updateStockQuery,
                        [
                            saleQuantity,
                            productId
                        ],
                        (err) => {
                            if (err) {
                                console.error(
                                    "Stock Update Error:",
                                    err
                                );
                                return res.status(500).json({
                                    success: false,
                                    message:
                                        "Sale saved but stock update failed."
                                });
                            }
                            return res.status(201).json({
                                success: true,
                                message:
                                    "Sale added successfully.",
                                sale: {
                                    id:
                                        result.insertId,
                                    customer:
                                        customer.trim(),
                                    productId,
                                    quantity:
                                        saleQuantity,
                                    sellingPrice,
                                    totalAmount
                                }
                            });
                        }
                    );
                }
            );
        }
    );
});
app.get("/api/sales", (req, res) => {
    const query = `
        SELECT
            s.id,
            s.customer,
            p.product_name,
            s.quantity,
            s.selling_price,
            s.total_amount,
            s.sale_date
        FROM sales s
        INNER JOIN products p
            ON s.product_id = p.id
        ORDER BY s.id DESC
    `;
    db.query(
        query,
        (err, results) => {
            if (err) {
                console.error(
                    "Fetch Sales Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch sales."
                });
            }
            return res.status(200).json({
                success: true,
                sales: results
            });
        }
    );
});
app.get("/api/stock-history", (req, res) => {
    const query = `
        SELECT
            p.id,
            p.product_name,
            p.quantity AS current_stock,
            COALESCE(
                SUM(s.quantity),
                0
            ) AS total_sales,
            COUNT(s.id) AS sale_transactions,
            COALESCE(
                SUM(s.total_amount),
                0
            ) AS total_revenue,
            MAX(s.sale_date) AS last_sale_date
        FROM products p
        LEFT JOIN sales s
            ON p.id = s.product_id
        GROUP BY
            p.id,
            p.product_name,
            p.quantity
        ORDER BY
            total_sales DESC
    `;
    db.query(
        query,
        (err, results) => {
            if (err) {
                console.error(
                    "Stock History Error:",
                    err
                );
                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch stock analysis."
                });
            }
            const products =
                results.map(item => ({
                    id:
                        item.id,
                    product_name:
                        item.product_name,
                    current_stock:
                        Number(
                            item.current_stock
                        ),
                    total_sales:
                        Number(
                            item.total_sales
                        ),
                    sale_transactions:
                        Number(
                            item.sale_transactions
                        ),
                    total_revenue:
                        Number(
                            item.total_revenue
                        ),
                    last_sale_date:
                        item.last_sale_date
                }));
            const totalSales =
                products.reduce(
                    (sum, product) =>
                        sum +
                        product.total_sales,
                    0
                );
            const totalProducts =
                products.length;
            const averageSales =
                totalProducts > 0
                    ? totalSales /
                      totalProducts
                    : 0;
            const history =
                products.map(product => {
                    const sales =
                        product.total_sales;
                    let status;
                    if (sales === 0) {
                        status =
                            "no-sales";
                    }
                    else if (
                        sales >
                        averageSales
                    ) {
                        status =
                            "increased";
                    }
                    else if (
                        sales <
                        averageSales
                    ) {
                        status =
                            "decreased";
                    }
                    else {
                        status =
                            "stable";
                    }
                    const difference =
                        sales -
                        averageSales;
                    return {
                        id:
                            product.id,
                        product_name:
                            product.product_name,
                        current_stock:
                            product.current_stock,
                        total_sales:
                            product.total_sales,
                        sale_transactions:
                            product.sale_transactions,
                        total_revenue:
                            product.total_revenue,
                        last_sale_date:
                            product.last_sale_date,
                        average_sales:
                            Number(
                                averageSales.toFixed(2)
                            ),
                        difference:
                            Number(
                                difference.toFixed(2)
                            ),
                        status:
                            status
                    };
                });
            const increased =
                history.filter(
                    item =>
                        item.status ===
                        "increased"
                ).length;
            const decreased =
                history.filter(
                    item =>
                        item.status ===
                        "decreased"
                ).length;
            const stable =
                history.filter(
                    item =>
                        item.status ===
                        "stable"
                ).length;
            const noSales =
                history.filter(
                    item =>
                        item.status ===
                        "no-sales"
                ).length;
            return res.status(200).json({
                success: true,
                summary: {
                    totalProducts,
                    totalSales,
                    averageSales:
                        Number(
                            averageSales.toFixed(2)
                        ),
                    increased,
                    decreased,
                    stable,
                    noSales
                },
                history
            });
        }
    );
});
app.get("/api/dashboard", async (req, res) => {
    try {
        const [productStats] =
            await db.promise().query(`
                SELECT
                    COUNT(*) AS total_products,
                    COALESCE(
                        SUM(quantity),
                        0
                    ) AS current_stock,
                    COALESCE(
                        SUM(
                            CASE
                                WHEN quantity <= mls
                                THEN 1
                                ELSE 0
                            END
                        ),
                        0
                    ) AS low_stock
                FROM products
            `);
        const [salesStats] =
            await db.promise().query(`
                SELECT
                    COUNT(*) AS total_transactions,
                    COALESCE(
                        SUM(quantity),
                        0
                    ) AS total_items_sold,
                    COALESCE(
                        SUM(total_amount),
                        0
                    ) AS total_revenue
                FROM sales
            `);
        const [purchaseStats] =
            await db.promise().query(`
                SELECT
                    COALESCE(
                        SUM(total_cost),
                        0
                    ) AS total_purchase_cost
                FROM purchases
            `);
        const [profitStats] =
            await db.promise().query(`
                SELECT
                    COALESCE(
                        SUM(s.total_amount),
                        0
                    ) AS revenue,
                    COALESCE(
                        SUM(
                            s.quantity *
                            p.purchase_cost
                        ),
                        0
                    ) AS cost_of_goods_sold
                FROM sales s
                INNER JOIN products p
                    ON s.product_id = p.id
            `);
        const [monthlySales] =
            await db.promise().query(`
                SELECT
                    DATE_FORMAT(
                        sale_date,
                        '%Y-%m'
                    ) AS month,
                    COALESCE(
                        SUM(quantity),
                        0
                    ) AS sales,
                    COALESCE(
                        SUM(total_amount),
                        0
                    ) AS revenue
                FROM sales
                GROUP BY
                    DATE_FORMAT(
                        sale_date,
                        '%Y-%m'
                    )
                ORDER BY
                    month ASC
            `);
        const [categorySales] =
            await db.promise().query(`
                SELECT
                    COALESCE(
                        p.category,
                        'Uncategorized'
                    ) AS category,
                    COALESCE(
                        SUM(s.quantity),
                        0
                    ) AS sales
                FROM sales s
                INNER JOIN products p
                    ON s.product_id = p.id
                GROUP BY
                    p.category
                ORDER BY
                    sales DESC
            `);
        const [topProducts] =
            await db.promise().query(`
                SELECT
                    p.product_name,
                    COALESCE(
                        SUM(s.quantity),
                        0
                    ) AS sales
                FROM sales s
                INNER JOIN products p
                    ON s.product_id = p.id
                GROUP BY
                    p.id,
                    p.product_name
                ORDER BY
                    sales DESC
                LIMIT 10
            `);
        const [lowStockProducts] =
            await db.promise().query(`
                SELECT
                    id,
                    product_name,
                    quantity,
                    mls
                FROM products
                WHERE quantity <= mls
                ORDER BY
                    quantity ASC
                LIMIT 10
            `);
        const [recentSales] =
            await db.promise().query(`
                SELECT
                    s.id,
                    p.product_name,
                    s.quantity,
                    s.total_amount,
                    s.sale_date
                FROM sales s
                INNER JOIN products p
                    ON s.product_id = p.id
                ORDER BY
                    s.sale_date DESC
                LIMIT 10
            `);
        const totalProducts =
            Number(
                productStats[0]
                    .total_products
            ) || 0;
        const currentStock =
            Number(
                productStats[0]
                    .current_stock
            ) || 0;
        const lowStock =
            Number(
                productStats[0]
                    .low_stock
            ) || 0;
        const totalTransactions =
            Number(
                salesStats[0]
                    .total_transactions
            ) || 0;
        const totalItemsSold =
            Number(
                salesStats[0]
                    .total_items_sold
            ) || 0;
        const totalRevenue =
            Number(
                salesStats[0]
                    .total_revenue
            ) || 0;
        const totalPurchaseCost =
            Number(
                purchaseStats[0]
                    .total_purchase_cost
            ) || 0;
        const revenue =
            Number(
                profitStats[0]
                    .revenue
            ) || 0;
        const costOfGoodsSold =
            Number(
                profitStats[0]
                    .cost_of_goods_sold
            ) || 0;
        const netProfit =
            revenue -
            costOfGoodsSold;
        const profitAmount =
            netProfit > 0
                ? netProfit
                : 0;
        const lossAmount =
            netProfit < 0
                ? Math.abs(netProfit)
                : 0;
        return res.json({
            success: true,
            summary: {
                totalProducts:
                    totalProducts,
                totalTransactions:
                    totalTransactions,
                totalItemsSold:
                    totalItemsSold,
                totalRevenue:
                    totalRevenue,
                totalPurchaseCost:
                    totalPurchaseCost,
                profit:
                    profitAmount,
                loss:
                    lossAmount,
                currentStock:
                    currentStock,
                lowStock:
                    lowStock
            },
            monthlySales:
                monthlySales,
            categorySales:
                categorySales,
            topProducts:
                topProducts,
            lowStockProducts:
                lowStockProducts,
            recentSales:
                recentSales
        });
    }
    catch (error) {
        console.error(
            "Dashboard API Error:",
            error
        );
        return res.status(500).json({
            success: false,
            message:
                "Failed to load dashboard data.",
            error:
                error.message
        });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
