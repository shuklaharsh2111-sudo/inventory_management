var salesRevenueChart = null;
var categorySalesChart = null;
var topProductsChart = null;
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
        loadDashboard();
    }
});
const productsLink = document.getElementById("productsLink");
const categoriesLink = document.getElementById("categoriesLink");
const dashboardContent = document.getElementById("dashboardContent");
const productsContent = document.getElementById("productsContent");
const categoriesContent = document.getElementById("categoriesContent");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const suppliersLink = document.getElementById("suppliersLink");
const suppliersContent = document.getElementById("suppliersContent");
const purchasesLink = document.getElementById("purchasesLink");
const purchasesContent = document.getElementById("purchasesContent");
const salesLink = document.getElementById("salesLink");
const salesContent = document.getElementById("salesContent");
const stockHistoryLink = document.getElementById("stockHistoryLink");
const stockHistoryContent = document.getElementById("stockHistoryContent");
if (productsLink) {
    productsLink.addEventListener("click", (e) => {
        e.preventDefault();
        dashboardContent.style.display = "none";
        productsContent.style.display = "block";
        categoriesContent.style.display = "none";
        suppliersContent.style.display = "none";
        purchasesContent.style.display = "none";
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
const categoryModal = document.getElementById("categoryModal");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const closeCategoryModal = document.getElementById("closeCategoryModal");
const cancelCategoryBtn = document.getElementById("cancelCategoryBtn");
const categoryModalOverlay = document.getElementById("categoryModalOverlay");
const addCategoryForm = document.getElementById("addCategoryForm");
if (categoriesLink) {
    categoriesLink.addEventListener("click", (e) => {
        e.preventDefault();
        dashboardContent.style.display = "none";
        productsContent.style.display = "none";
        categoriesContent.style.display = "block";
        suppliersContent.style.display = "none";
        purchasesContent.style.display = "none";
        pageTitle.textContent = "Categories";
        pageSubtitle.textContent =
            "Manage your product categories";
        document
            .querySelectorAll(".nav-item")
            .forEach(item => {
                item.classList.remove("active");
            });
        categoriesLink.classList.add("active");
        loadCategories();
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
        loadProductCategories();
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
function openCategoryModal() {
    if (categoryModal) {
        categoryModal.classList.add("show");
    }
}
function closeCategoryModalFunction() {
    if (categoryModal) {
        categoryModal.classList.remove("show");
    }
}
if (addCategoryBtn) {
    addCategoryBtn.addEventListener(
        "click",
        openCategoryModal
    );
}
if (closeCategoryModal) {
    closeCategoryModal.addEventListener(
        "click",
        closeCategoryModalFunction
    );
}
if (cancelCategoryBtn) {
    cancelCategoryBtn.addEventListener(
        "click",
        closeCategoryModalFunction
    );
}
if (categoryModalOverlay) {
    categoryModalOverlay.addEventListener(
        "click",
        closeCategoryModalFunction
    );
}
if (addCategoryForm) {
    addCategoryForm.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            const name =
                document
                    .getElementById("categoryName")
                    .value
                    .trim();
            const description =
                document
                    .getElementById("categoryDescription")
                    .value
                    .trim();
            try {
                const response = await fetch(
                    "/api/categories",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            name,
                            description
                        })
                    }
                );
                const data =
                    await response.json();
                if (data.success) {
                    alert(
                        "Category added successfully!"
                    );
                    addCategoryForm.reset();
                    closeCategoryModalFunction();
                    loadCategories();
                } else {
                    alert(
                        "Failed to add category!\n\n" +
                        data.message
                    );
                }
            } catch (error) {
                console.error(
                    "Add Category Error:",
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
async function loadCategories() {
    const tableBody =
        document.getElementById(
            "categoriesTableBody"
        );
    if (!tableBody) {
        return;
    }
    try {
        const response =
            await fetch("/api/categories");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch categories"
            );
        }
        const data =
            await response.json();
        console.log(
            "Categories:",
            data
        );
        if (
            !data.success ||
            !data.categories ||
            data.categories.length === 0
        ) {
            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="3"
                        class="empty-table">
                        No categories found.
                    </td>
                </tr>
            `;
            return;
        }
        tableBody.innerHTML = "";
        data.categories.forEach(category => {
            const row =
                document.createElement("tr");
            row.innerHTML = `
                <td>
                    ${category.id}
                </td>
                <td>
                    <strong>
                        ${category.name}
                    </strong>
                </td>
                <td>
                    ${category.description || "-"}
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(
            "Load Categories Error:",
            error
        );
        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="3"
                    class="empty-table">
                    Failed to load categories.
                </td>
            </tr>
        `;
    }
}
async function loadProductCategories() {
    const categorySelect =
        document.getElementById("productCategory");
    if (!categorySelect) {
        return;
    }
    try {
        categorySelect.innerHTML = `
            <option value="">
                Loading categories...
            </option>
        `;
        const response =
            await fetch("/api/categories");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch categories"
            );
        }
        const data =
            await response.json();
        if (
            !data.success ||
            !data.categories ||
            data.categories.length === 0
        ) {
            categorySelect.innerHTML = `
                <option value="">
                    No categories available
                </option>
            `;
            return;
        }
        categorySelect.innerHTML = `
            <option value="">
                Select Category
            </option>
        `;
        data.categories.forEach(category => {
            const option =
                document.createElement("option");
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error(
            "Load Product Categories Error:",
            error
        );
        categorySelect.innerHTML = `
            <option value="">
                Failed to load categories
            </option>
        `;
    }
}
const supplierModal = document.getElementById("supplierModal");
const addSupplierBtn = document.getElementById("addSupplierBtn");
const closeSupplierModal = document.getElementById("closeSupplierModal");
const cancelSupplierBtn = document.getElementById("cancelSupplierBtn");
const supplierModalOverlay = document.getElementById("supplierModalOverlay");
const addSupplierForm = document.getElementById("addSupplierForm");
if (suppliersLink) {
    suppliersLink.addEventListener("click", (e) => {
        e.preventDefault();
        dashboardContent.style.display = "none";
        productsContent.style.display = "none";
        categoriesContent.style.display = "none";
        suppliersContent.style.display = "block";
        purchasesContent.style.display = "none";
        pageTitle.textContent = "Suppliers";
        pageSubtitle.textContent =
            "Manage your product suppliers";
        document
            .querySelectorAll(".nav-item")
            .forEach(item => {
                item.classList.remove("active");
            });
        suppliersLink.classList.add("active");
        loadSuppliers();
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("show");
        }
    });
}
function openSupplierModal() {
    if (supplierModal) {
        supplierModal.classList.add("show");
    }
}
function closeSupplierModalFunction() {
    if (supplierModal) {
        supplierModal.classList.remove("show");
    }
}
if (addSupplierBtn) {
    addSupplierBtn.addEventListener(
        "click",
        openSupplierModal
    );
}
if (closeSupplierModal) {
    closeSupplierModal.addEventListener(
        "click",
        closeSupplierModalFunction
    );
}
if (cancelSupplierBtn) {
    cancelSupplierBtn.addEventListener(
        "click",
        closeSupplierModalFunction
    );
}
if (supplierModalOverlay) {
    supplierModalOverlay.addEventListener(
        "click",
        closeSupplierModalFunction
    );
}
if (addSupplierForm) {
    addSupplierForm.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            const name =
                document
                    .getElementById("supplierName")
                    .value
                    .trim();
            const contact =
                document
                    .getElementById("supplierContact")
                    .value
                    .trim();
            const email =
                document
                    .getElementById("supplierEmail")
                    .value
                    .trim();
            const address =
                document
                    .getElementById("supplierAddress")
                    .value
                    .trim();
            try {
                const response =
                    await fetch(
                        "/api/suppliers",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                name,
                                contact,
                                email,
                                address
                            })
                        }
                    );
                const data =
                    await response.json();
                if (data.success) {
                    alert(
                        "Supplier added successfully!"
                    );
                    addSupplierForm.reset();
                    closeSupplierModalFunction();
                    loadSuppliers();
                }
                else {
                    alert(
                        "Failed to add supplier!\n\n" +
                        data.message
                    );
                }
            }
            catch (error) {
                console.error(
                    "Add Supplier Error:",
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
async function loadSuppliers() {
    const tableBody =
        document.getElementById(
            "suppliersTableBody"
        );
    if (!tableBody) {
        return;
    }
    try {
        const response =
            await fetch("/api/suppliers");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch suppliers"
            );
        }
        const data =
            await response.json();
        console.log(
            "Suppliers:",
            data
        );
        if (
            !data.success ||
            !data.suppliers ||
            data.suppliers.length === 0
        ) {
            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="5"
                        class="empty-table">
                        No suppliers found.
                    </td>
                </tr>
            `;
            return;
        }
        tableBody.innerHTML = "";
        data.suppliers.forEach(supplier => {
            const row =
                document.createElement("tr");
            row.innerHTML = `
                <td>
                    ${supplier.id}
                </td>
                <td>
                    <strong>
                        ${supplier.name}
                    </strong>
                </td>
                <td>
                    ${supplier.contact}
                </td>
                <td>
                    ${supplier.email}
                </td>
                <td>
                    ${supplier.address}
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    catch (error) {
        console.error(
            "Load Suppliers Error:",
            error
        );
        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="empty-table">
                    Failed to load suppliers.
                </td>
            </tr>
        `;
    }
}
if (purchasesLink) {
    purchasesLink.addEventListener("click", (e) => {
        e.preventDefault();
        dashboardContent.style.display = "none";
        productsContent.style.display = "none";
        categoriesContent.style.display = "none";
        suppliersContent.style.display = "none";
        purchasesContent.style.display = "block";
        pageTitle.textContent = "Purchases";
        pageSubtitle.textContent =
            "Manage your product purchases";
        document
            .querySelectorAll(".nav-item")
            .forEach(item => {
                item.classList.remove("active");
            });
        purchasesLink.classList.add("active");
        loadPurchases();
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("show");
        }
    });
}
const purchaseModal = document.getElementById("purchaseModal");
const newPurchaseBtn = document.getElementById("newPurchaseBtn");
const closePurchaseModal = document.getElementById("closePurchaseModal");
const cancelPurchaseBtn = document.getElementById("cancelPurchaseBtn");
const purchaseModalOverlay = document.getElementById("purchaseModalOverlay");
const addPurchaseForm = document.getElementById("addPurchaseForm");
function openPurchaseModal() {
    if (purchaseModal) {
        purchaseModal.classList.add("show");
        loadPurchaseSuppliers();
        loadPurchaseProducts();
    }
}
function closePurchaseModalFunction() {
    if (purchaseModal) {
        purchaseModal.classList.remove("show");
    }
}
if (newPurchaseBtn) {
    newPurchaseBtn.addEventListener(
        "click",
        openPurchaseModal
    );
}
if (closePurchaseModal) {
    closePurchaseModal.addEventListener(
        "click",
        closePurchaseModalFunction
    );
}
if (cancelPurchaseBtn) {
    cancelPurchaseBtn.addEventListener(
        "click",
        closePurchaseModalFunction
    );
}
if (purchaseModalOverlay) {
    purchaseModalOverlay.addEventListener(
        "click",
        closePurchaseModalFunction
    );
}
async function loadPurchaseSuppliers() {
    const supplierSelect =
        document.getElementById(
            "purchaseSupplier"
        );
    if (!supplierSelect) {
        return;
    }
    try {
        supplierSelect.innerHTML = `
            <option value="">
                Loading suppliers...
            </option>
        `;
        const response =
            await fetch("/api/suppliers");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch suppliers"
            );
        }
        const data =
            await response.json();
        supplierSelect.innerHTML = `
            <option value="">
                Select Supplier
            </option>
        `;
        if (
            !data.success ||
            !data.suppliers ||
            data.suppliers.length === 0
        ) {
            supplierSelect.innerHTML = `
                <option value="">
                    No suppliers available
                </option>
            `;
            return;
        }
        data.suppliers.forEach(supplier => {
            const option =
                document.createElement("option");
            option.value = supplier.id;
            option.textContent =
                supplier.name;
            supplierSelect.appendChild(option);
        });
    }
    catch (error) {
        console.error(
            "Load Purchase Suppliers Error:",
            error
        );
        supplierSelect.innerHTML = `
            <option value="">
                Failed to load suppliers
            </option>
        `;
    }
}
async function loadPurchaseProducts() {
    const productSelect =
        document.getElementById(
            "purchaseProduct"
        );
    if (!productSelect) {
        return;
    }
    try {
        productSelect.innerHTML = `
            <option value="">
                Loading products...
            </option>
        `;
        const response =
            await fetch("/api/products");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch products"
            );
        }
        const data =
            await response.json();
        productSelect.innerHTML = `
            <option value="">
                Select Product
            </option>
        `;
        if (
            !data.success ||
            !data.products ||
            data.products.length === 0
        ) {
            productSelect.innerHTML = `
                <option value="">
                    No products available
                </option>
            `;
            return;
        }
        data.products.forEach(product => {
            const option =
                document.createElement("option");
            option.value = product.id;
            option.textContent =
                product.product_name;
            option.dataset.purchaseCost =
                product.purchase_cost;
            productSelect.appendChild(option);
        });
    }
    catch (error) {
        console.error(
            "Load Purchase Products Error:",
            error
        );
        productSelect.innerHTML = `
            <option value="">
                Failed to load products
            </option>
        `;
    }
}
const purchaseProduct = document.getElementById("purchaseProduct");
const purchaseQuantity = document.getElementById("purchaseQuantity");
const purchaseCostPerUnit = document.getElementById("purchaseCostPerUnit");
const purchaseTotalCost = document.getElementById("purchaseTotalCost"); 
function calculatePurchaseTotal() {
    const quantity = Number( purchaseQuantity.value) || 0;
    const costPerUnit = Number( purchaseCostPerUnit.value ) || 0;
    const total = quantity * costPerUnit;
    purchaseTotalCost.value = total.toFixed(2);
}
if (purchaseProduct) {
    purchaseProduct.addEventListener("change",() => {
            const selectedOption = purchaseProduct.options[purchaseProduct.selectedIndex];
            const purchaseCost = selectedOption.dataset.purchaseCost;
            if (purchaseCost) {
                purchaseCostPerUnit.value = Number(purchaseCost).toFixed(2);
            }
            else {
                purchaseCostPerUnit.value = "";
            }
            calculatePurchaseTotal();
        }
    );
if (purchaseQuantity) {
    purchaseQuantity.addEventListener("input",calculatePurchaseTotal);
}}
if (addPurchaseForm) {
    addPurchaseForm.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            const supplierId = document.getElementById("purchaseSupplier").value;
            const productId =document.getElementById("purchaseProduct").value;
            const quantity =
                document
                    .getElementById(
                        "purchaseQuantity"
                    )
                    .value;
            const costPerUnit =
                document
                    .getElementById(
                        "purchaseCostPerUnit"
                    )
                    .value;
            const totalCost =
                document
                    .getElementById(
                        "purchaseTotalCost"
                    )
                    .value;
            try {
                const response =
                    await fetch(
                        "/api/purchases",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                supplierId,
                                productId,
                                quantity,
                                costPerUnit,
                                totalCost
                            })
                        }
                    );
                const data =
                    await response.json();
                if (data.success) {
                    alert(
                        "Purchase added successfully!"
                    );
                    addPurchaseForm.reset();
                    purchaseCostPerUnit.value = "";
                    purchaseTotalCost.value = "";
                    closePurchaseModalFunction();
                    loadPurchases();
                }
                else {
                    alert(
                        "Failed to add purchase!\n\n" +
                        data.message
                    );
                }
            }
            catch (error) {
                console.error(
                    "Add Purchase Error:",
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
async function loadPurchases() {
    const tableBody =
        document.getElementById(
            "purchasesTableBody"
        );
    if (!tableBody) {
        return;
    }
    try {
        const response =
            await fetch("/api/purchases");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch purchases"
            );
        }
        const data =
            await response.json();
        if (
            !data.success ||
            !data.purchases ||
            data.purchases.length === 0
        ) {
            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        class="empty-table">
                        No purchases found.
                    </td>
                </tr>
            `;
            return;
        }
        tableBody.innerHTML = "";
        data.purchases.forEach(purchase => {
            const row =
                document.createElement("tr");
            const date =
                new Date(
                    purchase.purchase_date
                ).toLocaleDateString(
                    "en-IN"
                );
            row.innerHTML = `
                <td>
                    ${purchase.id}
                </td>
                <td>
                    ${purchase.supplier_name}
                </td>
                <td>
                    <strong>
                        ${purchase.product_name}
                    </strong>
                </td>
                <td>
                    ${purchase.quantity}
                </td>
                <td>
                    ₹${Number(
                        purchase.cost_per_unit
                    ).toFixed(2)}
                </td>
                <td>
                    ₹${Number(
                        purchase.total_cost
                    ).toFixed(2)}
                </td>
                <td>
                    ${date}
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    catch (error) {
        console.error(
            "Load Purchases Error:",
            error
        );
        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="empty-table">
                    Failed to load purchases.
                </td>
            </tr>
        `;
    }
}
if (salesLink) {
    salesLink.addEventListener("click", (e) => {
        e.preventDefault();
        dashboardContent.style.display = "none";
        productsContent.style.display = "none";
        categoriesContent.style.display = "none";
        suppliersContent.style.display = "none";
        purchasesContent.style.display = "none";
        salesContent.style.display = "block";
        pageTitle.textContent = "Sales";
        pageSubtitle.textContent =
            "Manage your product sales";
        document
            .querySelectorAll(".nav-item")
            .forEach(item => {
                item.classList.remove("active");
            });
        salesLink.classList.add("active");
        loadSales();
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("show");
        }
    });
}
const saleModal = document.getElementById("saleModal");
const newSaleBtn = document.getElementById("newSaleBtn");
const closeSaleModal = document.getElementById("closeSaleModal");
const cancelSaleBtn = document.getElementById("cancelSaleBtn");
const saleModalOverlay = document.getElementById("saleModalOverlay");
const addSaleForm = document.getElementById("addSaleForm");
function openSaleModal() {
    if (saleModal) {
        saleModal.classList.add("show");
        loadSaleProducts();
    }
}
function closeSaleModalFunction() {
    if (saleModal) {
        saleModal.classList.remove("show");
    }
}
if (newSaleBtn) {
    newSaleBtn.addEventListener(
        "click",
        openSaleModal
    );
}
if (closeSaleModal) {
    closeSaleModal.addEventListener(
        "click",
        closeSaleModalFunction
    );
}
if (cancelSaleBtn) {
    cancelSaleBtn.addEventListener(
        "click",
        closeSaleModalFunction
    );
}
if (saleModalOverlay) {
    saleModalOverlay.addEventListener(
        "click",
        closeSaleModalFunction
    );
}
async function loadSaleProducts() {
    const productSelect =
        document.getElementById(
            "saleProduct"
        );
    if (!productSelect) {
        return;
    }
    try {
        productSelect.innerHTML = `
            <option value="">
                Loading products...
            </option>
        `;
        const response =
            await fetch("/api/products");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch products"
            );
        }
        const data =
            await response.json();
        productSelect.innerHTML = `
            <option value="">
                Select Product
            </option>
        `;
        if (
            !data.success ||
            !data.products ||
            data.products.length === 0
        ) {
            productSelect.innerHTML = `
                <option value="">
                    No products available
                </option>
            `;
            return;
        }
        data.products.forEach(product => {
            const option =
                document.createElement("option");
            option.value =
                product.id;
            option.textContent =
                product.product_name;
            option.dataset.sellingPrice =
                product.sell_price;
            option.dataset.stock =
                product.quantity;
            productSelect.appendChild(option);
        });
    }
    catch (error) {
        console.error(
            "Load Sale Products Error:",
            error
        );
        productSelect.innerHTML = `
            <option value="">
                Failed to load products
            </option>
        `;
    }
}
const saleProduct =
    document.getElementById(
        "saleProduct"
    );
const saleQuantity =
    document.getElementById(
        "saleQuantity"
    );
const salePrice =
    document.getElementById(
        "salePrice"
    );
const saleFinalPrice =
    document.getElementById(
        "saleFinalPrice"
    );
function calculateSaleTotal() {
    const quantity =
        Number(
            saleQuantity.value
        ) || 0;
    const price =
        Number(
            salePrice.value
        ) || 0;
    const total =
        quantity * price;
    saleFinalPrice.value =
        total.toFixed(2);
}
if (saleProduct) {
    saleProduct.addEventListener(
        "change",
        () => {
            const selectedOption =
                saleProduct.options[
                    saleProduct.selectedIndex
                ];
            const sellingPrice =
                selectedOption.dataset
                    .sellingPrice;
            if (sellingPrice) {
                salePrice.value =
                    Number(
                        sellingPrice
                    ).toFixed(2);
            }
            else {
                salePrice.value = "";
            }
            calculateSaleTotal();
        }
    );
}
if (saleQuantity) {
    saleQuantity.addEventListener(
        "input",
        calculateSaleTotal
    );
}
if (addSaleForm) {
    addSaleForm.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            const customer =
                document
                    .getElementById(
                        "saleCustomer"
                    )
                    .value
                    .trim();
            const productId =
                document
                    .getElementById(
                        "saleProduct"
                    )
                    .value;
            const quantity =
                document
                    .getElementById(
                        "saleQuantity"
                    )
                    .value;
            const price =
                document
                    .getElementById(
                        "salePrice"
                    )
                    .value;
            const finalPrice =
                document
                    .getElementById(
                        "saleFinalPrice"
                    )
                    .value;
            try {
                const response =
                    await fetch(
                        "/api/sales",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                customer,
                                productId,
                                quantity,
                                price,
                                finalPrice
                            })
                        }
                    );
                const data =
                    await response.json();
                if (data.success) {
                    alert(
                        "Sale added successfully!"
                    );
                    addSaleForm.reset();
                    salePrice.value = "";
                    saleFinalPrice.value = "";
                    closeSaleModalFunction();
                    loadSales();
                }
                else {
                    alert(
                        "Failed to add sale!\n\n" +
                        data.message
                    );
                }
            }
            catch (error) {
                console.error(
                    "Add Sale Error:",
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
async function loadSales() {
    const tableBody =
        document.getElementById(
            "salesTableBody"
        );
    if (!tableBody) {
        return;
    }
    try {
        const response =
            await fetch("/api/sales");
        if (!response.ok) {
            throw new Error(
                "Failed to fetch sales"
            );
        }
        const data =
            await response.json();
        if (
            !data.success ||
            !data.sales ||
            data.sales.length === 0
        ) {
            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        class="empty-table">
                        No sales found.
                    </td>
                </tr>
            `;
            return;
        }
        tableBody.innerHTML = "";
        data.sales.forEach(sale => {
            const row =
                document.createElement("tr");
            const date =
                new Date(
                    sale.sale_date
                ).toLocaleDateString(
                    "en-IN"
                );
            row.innerHTML = `
                <td>
                    ${sale.id}
                </td>
                <td>
                    ${sale.customer}
                </td>
                <td>
                    <strong>
                        ${sale.product_name}
                    </strong>
                </td>
                <td>
                    ${sale.quantity}
                </td>
                <td>
                    ₹${Number(
                        sale.selling_price
                    ).toFixed(2)}
                </td>
                <td>
                    ₹${Number(
                        sale.total_amount
                    ).toFixed(2)}
                </td>
                <td>
                    ${date}
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    catch (error) {
        console.error(
            "Load Sales Error:",
            error
        );
        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="empty-table">
                    Failed to load sales.
                </td>
            </tr>
        `;
    }
}
if (stockHistoryLink) {
    stockHistoryLink.addEventListener("click", (e) => {
        e.preventDefault();
        dashboardContent.style.display = "none";
        productsContent.style.display = "none";
        categoriesContent.style.display = "none";
        suppliersContent.style.display = "none";
        purchasesContent.style.display = "none";
        salesContent.style.display = "none";
        stockHistoryContent.style.display = "block";
        pageTitle.textContent = "Stock History";
        pageSubtitle.textContent =
            "Track product sales movement";
        document
            .querySelectorAll(".nav-item")
            .forEach(item => {
                item.classList.remove("active");
            });
        stockHistoryLink.classList.add("active");
        loadStockHistory();
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("show");
        }
    });
}
async function loadStockHistory() {
    const tableBody =
        document.getElementById(
            "stockHistoryTableBody"
        );
    if (!tableBody) {
        return;
    }
    try {
        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="loading-row">
                    Analysing sales data...
                </td>
            </tr>
        `;
        const response =
            await fetch(
                "/api/stock-history"
            );
        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }
        const data =
            await response.json();
        console.log(
            "Overall Stock Analysis:",
            data
        );
        if (
            !data.success ||
            !Array.isArray(data.history)
        ) {
            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        class="empty-table">
                        No sales analysis available.
                    </td>
                </tr>
            `;
            return;
        }
        if (data.history.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        class="empty-table">
                        No products found.
                    </td>
                </tr>
            `;
            return;
        }
        tableBody.innerHTML = "";
        let increasedCount = 0;
        let decreasedCount = 0;
        let noSalesCount = 0;
        data.history.forEach(item => {
            const totalSales =
                Number(
                    item.total_sales
                ) || 0;
            const transactions =
                Number(
                    item.sale_transactions
                ) || 0;
            const currentStock =
                Number(
                    item.current_stock
                ) || 0;
            const totalRevenue =
                Number(
                    item.total_revenue
                ) || 0;
            let statusText = "";
            let statusClass = "";
            if (
                item.status ===
                "increased"
            ) {
                statusText =
                    "↑ High Sales";
                statusClass =
                    "stock-in";
                increasedCount++;
            }
            else if (
                item.status ===
                "decreased"
            ) {
                statusText =
                    "↓ Low Sales";
                statusClass =
                    "stock-out";
                decreasedCount++;
            }
            else if (
                item.status ===
                "no-sales"
            ) {
                statusText =
                    "No Sales";
                statusClass =
                    "stock-low";
                noSalesCount++;
            }
            else {
                statusText =
                    "→ Average";
                statusClass =
                    "stock-low";
            }
            const row =
                document.createElement(
                    "tr"
                );
            row.innerHTML = `
                <td>
                    <strong>
                        ${item.product_name}
                    </strong>
                </td>
                <td>
                    ${currentStock}
                </td>
                <td>
                    ${totalSales}
                </td>
                <td>
                    ${transactions}
                </td>
                <td>
                    ₹${totalRevenue.toFixed(2)}
                </td>
                <td>
                    <span
                        class="stock-status ${statusClass}">
                        ${statusText}
                    </span>
                </td>
            `;
            tableBody.appendChild(row);
        });
        const increasedProducts =
            document.getElementById(
                "increasedProducts"
            );
        const decreasedProducts =
            document.getElementById(
                "decreasedProducts"
            );
        const noSalesProducts =
            document.getElementById(
                "noSalesProducts"
            );
        if (increasedProducts) {
            increasedProducts.textContent =
                increasedCount;
        }
        if (decreasedProducts) {
            decreasedProducts.textContent =
                decreasedCount;
        }
        if (noSalesProducts) {
            noSalesProducts.textContent =
                noSalesCount;
        }
    }
    catch (error) {
        console.error(
            "Stock History Error:",
            error
        );
        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="empty-table">
                    Failed to analyse sales data.
                </td>
            </tr>
        `;
    }
}
const revenue =
    Number(
        profitStats[0].revenue
    ) || 0;
const costOfGoodsSold =
    Number(
        profitStats[0]
            .cost_of_goods_sold
    ) || 0;
const netProfit =
    revenue -
    costOfGoodsSold;
const profit =
    netProfit > 0
        ? netProfit
        : 0;
const loss =
    netProfit < 0
        ? Math.abs(netProfit)
        : 0;
async function loadDashboard() {
    try {
        const response =
            await fetch(
                "/api/dashboard"
            );
        if (!response.ok) {
            throw new Error(
                "Failed to fetch dashboard"
            );
        }
        const data =
            await response.json();
        console.log(
            "Dashboard Data:",
            data
        );
        if (!data.success) {
            throw new Error(
                data.message ||
                "Dashboard data failed"
            );
        }
        const summary =
            data.summary;
        document.getElementById(
            "dashboardTotalProducts"
        ).textContent =
            summary.totalProducts;
        document.getElementById(
            "dashboardTotalSales"
        ).textContent =
            summary.totalItemsSold;
        document.getElementById(
            "dashboardRevenue"
        ).textContent =
            "₹" +
            Number(
                summary.totalRevenue
            ).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2
                }
            );
        document.getElementById(
            "dashboardPurchaseCost"
        ).textContent =
            "₹" +
            Number(
                summary.totalPurchaseCost
            ).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2
                }
            );
        document.getElementById(
            "dashboardProfit"
        ).textContent =
            "₹" +
            Number(
                summary.profit
            ).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2
                }
            );
        document.getElementById(
            "dashboardLoss"
        ).textContent =
            "₹" +
            Number(
                summary.loss
            ).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2
                }
            );
        document.getElementById(
            "dashboardCurrentStock"
        ).textContent =
            summary.currentStock;
        document.getElementById(
            "dashboardLowStock"
        ).textContent =
            summary.lowStock;
        createSalesRevenueChart(
            data.monthlySales
        );
        createCategorySalesChart(
            data.categorySales
        );
        createTopProductsChart(
            data.topProducts
        );
        displayLowStockProducts(
            data.lowStockProducts
        );
        displayRecentSales(
            data.recentSales
        );
    }
    catch (error) {
        console.error(
            "Dashboard Error:",
            error
        );
    }
}
function createSalesRevenueChart(data) {
    const canvas =
        document.getElementById(
            "salesRevenueChart"
        );
    if (!canvas) {
        return;
    }
    const labels =
        data.map(
            item => item.month
        );
    const sales =
        data.map(
            item =>
                Number(item.sales)
        );
    const revenue =
        data.map(
            item =>
                Number(item.revenue)
        );
    if (salesRevenueChart) {
        salesRevenueChart.destroy();
    }
    salesRevenueChart =
        new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Units Sold",
                        data: sales,
                        tension: 0.3
                    },
                    {
                        label: "Revenue",
                        data: revenue,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
}
function createCategorySalesChart(data) {
    const canvas =
        document.getElementById(
            "categorySalesChart"
        );
    if (!canvas) {
        return;
    }
    const labels =
        data.map(
            item => item.category
        );
    const sales =
        data.map(
            item =>
                Number(item.sales)
        );
    if (categorySalesChart) {
        categorySalesChart.destroy();
    }
    categorySalesChart =
        new Chart(canvas, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        label:
                            "Sales",
                        data:
                            sales
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position:
                            "bottom"
                    }
                }
            }
        });
}
function createTopProductsChart(data) {
    const canvas =
        document.getElementById(
            "topProductsChart"
        );
    if (!canvas) {
        return;
    }
    const labels =
        data.map(
            item =>
                item.product_name
        );
    const sales =
        data.map(
            item =>
                Number(item.sales)
        );
    if (topProductsChart) {
        topProductsChart.destroy();
    }
    topProductsChart =
        new Chart(canvas, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label:
                            "Units Sold",
                        data:
                            sales
                    }
                ]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
}
function displayLowStockProducts(
    products
) {
    const container =
        document.getElementById(
            "lowStockProducts"
        );
    if (!container) {
        return;
    }
    if (
        !products ||
        products.length === 0
    ) {
        container.innerHTML = `
            <div class="dashboard-empty">
                ✅ No low stock products
            </div>
        `;
        return;
    }
    container.innerHTML = "";
    products.forEach(product => {
        const item =
            document.createElement(
                "div"
            );
        item.className =
            "dashboard-list-item";
        item.innerHTML = `
            <div>
                <strong>
                    ${product.product_name}
                </strong>
                <small>
                    Minimum:
                    ${product.mls}
                </small>
            </div>
            <span class="low-stock-number">
                ${product.quantity}
            </span>
        `;
        container.appendChild(item);
    });
}
function displayRecentSales(
    sales
) {
    const container =
        document.getElementById(
            "recentSales"
        );
    if (!container) {
        return;
    }
    if (
        !sales ||
        sales.length === 0
    ) {
        container.innerHTML = `
            <div class="dashboard-empty">
                No sales available
            </div>
        `;
        return;
    }
    container.innerHTML = "";
    sales.forEach(sale => {
        const item =
            document.createElement(
                "div"
            );
        item.className =
            "dashboard-list-item";
        const amount =
            Number(
                sale.total_amount
            ) || 0;
        item.innerHTML = `
            <div>
                <strong>
                    ${sale.product_name}
                </strong>
                <small>
                    Qty:
                    ${sale.quantity}
                    •
                    ${new Date(
                        sale.sale_date
                    ).toLocaleDateString(
                        "en-IN"
                    )}
                </small>
            </div>
            <strong>
                ₹${amount.toLocaleString(
                    "en-IN",
                    {
                        minimumFractionDigits: 2
                    }
                )}
            </strong>
        `;
        container.appendChild(item);
    });
}
const dashboardLink = document.getElementById("dashboardLink");
if (dashboardLink) {
    dashboardLink.addEventListener(
        "click",
        (e) => {
            e.preventDefault();
            dashboardContent.style.display =
                "block";
            productsContent.style.display =
                "none";
            categoriesContent.style.display =
                "none";
            suppliersContent.style.display =
                "none";
            purchasesContent.style.display =
                "none";
            salesContent.style.display =
                "none";
            stockHistoryContent.style.display =
                "none";
            pageTitle.textContent =
                "Dashboard";
            pageSubtitle.textContent =
                "Inventory overview and business analytics";
            document
                .querySelectorAll(".nav-item")
                .forEach(item => {
                    item.classList.remove(
                        "active"
                    );
                });
            dashboardLink.classList.add(
                "active"
            );
            loadDashboard();
            if (
                window.innerWidth <= 768
            ) {
                sidebar.classList.remove(
                    "show"
                );
            }
        }
    );
}
