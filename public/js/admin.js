document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const logoutBtn = document.getElementById("logoutBtn");
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("show");
        });
    }
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove("show");
            }
        });
    });
    const adminName = document.getElementById("adminName");
    const adminAvatar = document.getElementById("adminAvatar");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            console.log("Logged in user:", user);
            if (user.name) {
                adminName.textContent = user.name;
                adminAvatar.textContent =
                    user.name.charAt(0).toUpperCase();
            }
        } catch (error) {
            console.error("User data error:", error);
            adminName.textContent = "Admin";
            adminAvatar.textContent = "A";
        }
    } else {
        adminName.textContent = "Admin";
        adminAvatar.textContent = "A";
    }
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );
            if (confirmLogout) {
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        });
    }
});

const productsLink = document.getElementById("productsLink");
const dashboardContent = document.getElementById("dashboardContent");
const productsContent = document.getElementById("productsContent");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
if (productsLink) {
    productsLink.addEventListener("click", (e) => {
    e.preventDefault();
    dashboardContent.style.display = "none";
    productsContent.style.display = "block";
    pageTitle.textContent = "Products";
    pageSubtitle.textContent =
        "Manage your inventory products";
    document
        .querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });
    productsLink.classList.add("active");
    loadProducts();
    if (window.innerWidth <= 768) {
        sidebar.classList.remove("show");
    }
    });
}

const productModal = document.getElementById("productModal");
const addProductBtn = document.getElementById("addProductBtn");
const addProductBtnEmpty = document.getElementById("addProductBtnEmpty");
const closeProductModal = document.getElementById("closeProductModal");
const cancelProductBtn = document.getElementById("cancelProductBtn");
const productModalOverlay = document.getElementById("productModalOverlay");
const addProductForm = document.getElementById("addProductForm");
function openProductModal() {
    if (productModal) {
        productModal.classList.add("show");
    }
}

function closeProductModalFunction() {
    if (productModal) {
        productModal.classList.remove("show");
    }
}

if (addProductBtn) {
    addProductBtn.addEventListener(
        "click",
        openProductModal
    );
}

if (addProductBtnEmpty) {
    addProductBtnEmpty.addEventListener(
        "click",
        openProductModal
    );
}

if (closeProductModal) {
    closeProductModal.addEventListener(
        "click",
        closeProductModalFunction
    );
}

if (cancelProductBtn) {
    cancelProductBtn.addEventListener(
        "click",
        closeProductModalFunction
    );
}

if (productModalOverlay) {
    productModalOverlay.addEventListener(
        "click",
        closeProductModalFunction
    );
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProductModalFunction();
    }
});

if (addProductForm) {
    addProductForm.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            const productName =
                document.getElementById("productName").value.trim();
            const sku =
                document.getElementById("productSKU").value.trim();
            const category =
                document.getElementById("productCategory").value;
            const purchaseCost =
                document.getElementById("purchaseCost").value;
            const sellingPrice =
                document.getElementById("sellingPrice").value;
            const quantity =
                document.getElementById("productQuantity").value;
            const lowStockLevel =
                document.getElementById("lowStockLevel").value;
            try {
                const response = await fetch("/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productName,
                        sku,
                        category,
                        purchaseCost,
                        sellingPrice,
                        quantity,
                        lowStockLevel
                    })
                });
                const data = await response.json();
                if (data.success) {
                    alert("Product added successfully!");
                    addProductForm.reset();
                    closeProductModalFunction();
                    loadProducts();
                }
                else {
                    alert(
                        "Failed to add product!\n\n" +
                        data.message
                    );
                }
            } catch (error) {
                console.error(
                    "Add Product Error:",
                    error
                );
                alert(
                    "Server connection failed!\n\n" +
                    "Please try again."
                );
            }
        }
    );
}

async function loadProducts() {
    const tableBody =
        document.getElementById("productsTableBody");
    if (!tableBody) {
        return;
    }
    try {
        const response = await fetch("/api/products");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch products"
            );
        }
        const data = await response.json();
        console.log("Products:", data);
        if (
            !data.success ||
            !data.products ||
            data.products.length === 0
        ) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" class="empty-table">
                        No products found.
                    </td>
                </tr>
            `;
            return;
        }
        tableBody.innerHTML = "";
        data.products.forEach(product => {
            let stockStatus = "";
            let stockClass = "";
            if (Number(product.quantity) === 0) {
                stockStatus = "Out of Stock";
                stockClass = "stock-out";
            }
            else if (
                Number(product.quantity) <=
                Number(product.mls)
            ) {
                stockStatus = "Low Stock";
                stockClass = "stock-low";
            }
            else {
                stockStatus = "In Stock";
                stockClass = "stock-in";
            }
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>
                    <strong>
                        ${product.product_name}
                    </strong>
                </td>
                <td>
                    ${product.sku}
                </td>
                <td>
                    ${product.category}
                </td>
                <td>
                    ₹${Number(
                        product.purchase_cost
                    ).toFixed(2)}
                </td>
                <td>
                    ₹${Number(
                        product.sell_price
                    ).toFixed(2)}
                </td>
                <td>
                    ${product.quantity}
                </td>
                <td>
                    ${product.mls}
                </td>
                <td>
                    <span class="stock-status ${stockClass}">
                        ${stockStatus}
                    </span>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(
            "Load Products Error:",
            error
        );
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="empty-table">
                    Failed to load products.
                </td>
            </tr>
        `;
    }
}
