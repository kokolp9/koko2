let inventory = [];
let currentSales = [];
let salesRecord = []; // لتخزين سجل المبيعات
let invoiceArchive = [];
let invoiceLog = []; // مصفوفة لتخزين سجل الفواتير
let currentBranch = "main"; // يمكن تعديلها لاحقًا
const companyName = "مؤسسة كيرو للأدوات الصحية"; // اسم الشركة

// عناصر DOM
const inventorySection = document.getElementById("inventory");
const salesSection = document.getElementById("sales");
const invoiceSection = document.getElementById("invoice");
const salesLogSection = document.getElementById("sales-log");
const invoiceArchiveSection = document.getElementById("invoice-archive");
const invoiceLogSection = document.getElementById("invoice-log");
const invoiceLogDisplay = document.getElementById("invoice-log-display");
// عنصر لعرض تفاصيل الفاتورة (إضافة ديناميكية)
const invoiceDetailsDisplay = document.createElement("div");
invoiceDetailsDisplay.id = "invoice-details-display";
invoiceLogSection.appendChild(invoiceDetailsDisplay);
invoiceDetailsDisplay.style.marginTop = "20px";
invoiceDetailsDisplay.style.padding = "15px";
invoiceDetailsDisplay.style.border = "1px solid #e0f2f7";
invoiceDetailsDisplay.style.borderRadius = "8px";
invoiceDetailsDisplay.style.backgroundColor = "#f8f9fa";
invoiceDetailsDisplay.style.display = "none";

const showInventoryBtn = document.getElementById("show-inventory-btn");
const showSalesBtn = document.getElementById("show-sales-btn");
const showInvoiceBtn = document.getElementById("show-invoice-btn");
const showSalesLogBtn = document.getElementById("show-sales-log-btn");
const showArchiveBtn = document.getElementById("show-archive-btn");
const showInvoiceLogBtn = document.getElementById("show-invoice-log-btn");
const saveInvoiceBtn = document.getElementById("save-invoice-btn");
const archiveInvoiceBtn = document.getElementById("archive-invoice-btn");
const searchInvoiceNameInput = document.getElementById("search-invoice-name"); // حقل بحث الفواتير
const searchInvoiceBtn = document.getElementById("search-invoice-btn"); // زر بحث الفواتير

const inventoryTableBody = document.querySelector("#inventory-table tbody");
const newProductNameInput = document.getElementById("new-product-name");
const newProductPriceInput = document.getElementById("new-product-price");
const newProductQuantityInput = document.getElementById("new-product-quantity");
const addProductBtn = document.getElementById("add-product-btn");
const searchProductNameInput = document.getElementById("search-product-name");
const searchInventoryBtn = document.getElementById("search-inventory-btn");
const increaseProductNameInput = document.getElementById(
  "increase-product-name"
);
const increaseProductQuantityInput = document.getElementById(
  "increase-product-quantity"
);
const increaseQuantityBtn = document.getElementById("increase-quantity-btn");
const updatePriceProductNameInput = document.getElementById(
  "update-price-product-name"
);
const newProductPriceUpdateInput = document.getElementById(
  "new-product-price-update"
);
const updatePriceBtn = document.getElementById("update-price-btn");

const salesBuyerNameInput = document.getElementById("sales-buyer-name"); // اسم المشتري
const paymentStatusSelect = document.getElementById("payment-status"); // حالة الدفع
const paymentDetailsDiv = document.getElementById("payment-details"); // حاوية تفاصيل الدفع الجزئي
const amountPaidInput = document.getElementById("amount-paid"); // المبلغ المدفوع
const amountRemainingInput = document.getElementById("amount-remaining"); // المبلغ المتبقي
const dailySalesTableBody = document.querySelector("#daily-sales-table tbody");
const salesProductNameInput = document.getElementById("sales-product-name");
const salesQuantityInput = document.getElementById("sales-quantity");
const salesPriceInput = document.getElementById("sales-price");
const addToSalesBtn = document.getElementById("add-to-sales-btn");
const recordSalesBtn = document.getElementById("record-sales-btn");
const salesTotalElement = document.querySelector(
  "#daily-sales-table tfoot #sales-total"
);
const salesLogDisplay = document.getElementById("sales-log-display");

const invoiceItemsTableBody = document.querySelector(
  "#invoice-items-table tbody"
);
const invoiceProductNameInput = document.getElementById("invoice-product-name");
const invoiceQuantityInput = document.getElementById("invoice-quantity");
const invoicePriceInput = document.getElementById("invoice-price");
const addToInvoiceBtn = document.getElementById("add-to-invoice-btn");
const printInvoiceBtn = document.getElementById("print-invoice-btn");
const invoiceTotalElement = document.querySelector(
  "#invoice-items-table tfoot #invoice-total"
);
const invoiceDateElement = document.getElementById("invoice-date");
const customerNameInput = document.getElementById("customer-name");
const invoiceArchiveDisplay = document.getElementById(
  "invoice-archive-display"
);
const invoiceCompanyNameElement = document.querySelector(
  "#invoice .invoice-company-name"
);
const invoiceNumberInput = document.getElementById("invoice-number");

letcurrentInvoiceSearchTerm = ""; // لتخزين مصطلح البحث الحالي للفواتير

function hideAllSections() {
  const sections = document.querySelectorAll("main > section");
  sections.forEach((section) => (section.style.display = "none"));
}

function setupEventListeners() {
  console.log("بدء إعداد مستمعي الأحداث...");

  const showInventoryBtn = document.getElementById("show-inventory-btn");
  console.log("showInventoryBtn:", showInventoryBtn);
  if (showInventoryBtn) {
    showInventoryBtn.addEventListener("click", () => {
      hideAllSections();
      inventorySection.style.display = "block";
      renderInventory();
    });
  }

  const showSalesBtn = document.getElementById("show-sales-btn");
  console.log("showSalesBtn:", showSalesBtn);
  if (showSalesBtn) {
    showSalesBtn.addEventListener("click", () => {
      hideAllSections();
      salesSection.style.display = "block";
    });
  }

  const showInvoiceBtn = document.getElementById("show-invoice-btn");
  console.log("showInvoiceBtn:", showInvoiceBtn);
  if (showInvoiceBtn) {
    showInvoiceBtn.addEventListener("click", () => {
      hideAllSections();
      invoiceSection.style.display = "block";
      invoiceDateElement.textContent = new Date().toLocaleDateString();
      invoiceCompanyNameElement.textContent = companyName;
      invoiceNumberInput.value = Date.now();
    });
  }

  const showSalesLogBtn = document.getElementById("show-sales-log-btn");
  console.log("showSalesLogBtn:", showSalesLogBtn);
  if (showSalesLogBtn) {
    showSalesLogBtn.addEventListener("click", () => {
      hideAllSections();
      salesLogSection.style.display = "block";
      displaySalesLog();
    });
  }

  const showArchiveBtn = document.getElementById("show-archive-btn");
  console.log("showArchiveBtn:", showArchiveBtn);
  if (showArchiveBtn) {
    showArchiveBtn.addEventListener("click", () => {
      hideAllSections();
      invoiceArchiveSection.style.display = "block";
      displayInvoiceArchive();
    });
  }

  const showInvoiceLogBtn = document.getElementById("show-invoice-log-btn");
  console.log("showInvoiceLogBtn:", showInvoiceLogBtn);
  if (showInvoiceLogBtn) {
    showInvoiceLogBtn.addEventListener("click", () => {
      hideAllSections();
      invoiceLogSection.style.display = "block";
      currentInvoiceSearchTerm = ""; // إعادة تعيين البحث عند فتح السجل
      displayInvoiceLog();
      invoiceDetailsDisplay.style.display = "none";
    });
  }

  const addProductBtn = document.getElementById("add-product-btn");
  console.log("addProductBtn:", addProductBtn);
  if (addProductBtn) {
    addProductBtn.addEventListener("click", addProductToInventory);
  }

  const addToSalesBtn = document.getElementById("add-to-sales-btn");
  console.log("addToSalesBtn:", addToSalesBtn);
  if (addToSalesBtn) {
    addToSalesBtn.addEventListener("click", addProductToSales);
  }

  const recordSalesBtn = document.getElementById("record-sales-btn");
  console.log("recordSalesBtn:", recordSalesBtn);
  if (recordSalesBtn) {
    recordSalesBtn.addEventListener("click", recordDailySales);
  }

  const addToInvoiceBtn = document.getElementById("add-to-invoice-btn");
  console.log("addToInvoiceBtn:", addToInvoiceBtn);
  if (addToInvoiceBtn) {
    addToInvoiceBtn.addEventListener("click", addProductToInvoice);
  }

  const saveInvoiceBtn = document.getElementById("save-invoice-btn");
  console.log("saveInvoiceBtn:", saveInvoiceBtn);
  if (saveInvoiceBtn) {
    saveInvoiceBtn.addEventListener("click", saveInvoice);
  }

  const archiveInvoiceBtn = document.getElementById("archive-invoice-btn");
  console.log("archiveInvoiceBtn:", archiveInvoiceBtn);
  if (archiveInvoiceBtn) {
    archiveInvoiceBtn.addEventListener("click", archiveCurrentInvoice);
  }

  const printInvoiceBtn = document.getElementById("print-invoice-btn");
  console.log("printInvoiceBtn:", printInvoiceBtn);
  if (printInvoiceBtn) {
    printInvoiceBtn.addEventListener("click", printCurrentInvoice);
  }

  const searchInventoryBtn = document.getElementById("search-inventory-btn");
  console.log("searchInventoryBtn:", searchInventoryBtn);
  if (searchInventoryBtn) {
    searchInventoryBtn.addEventListener("click", searchInventory);
  }

  const paymentStatusSelect = document.getElementById("payment-status");
  console.log("paymentStatusSelect:", paymentStatusSelect);
  if (paymentStatusSelect) {
    paymentStatusSelect.addEventListener("change", togglePaymentDetails);
  }

  const amountPaidInput = document.getElementById("amount-paid");
  console.log("amountPaidInput:", amountPaidInput);
  if (amountPaidInput) {
    amountPaidInput.addEventListener("input", calculateRemainingAmount);
  }

  const increaseQuantityBtn = document.getElementById("increase-quantity-btn");
  console.log("increaseQuantityBtn:", increaseQuantityBtn);
  if (increaseQuantityBtn) {
    increaseQuantityBtn.addEventListener("click", increaseProductQuantity);
  }

  const updatePriceBtn = document.getElementById("update-price-btn");
  console.log("updatePriceBtn:", updatePriceBtn);
  if (updatePriceBtn) {
    updatePriceBtn.addEventListener("click", updateProductPrice);
  }

  const searchInvoiceBtn = document.getElementById("search-invoice-btn");
  console.log("searchInvoiceBtn:", searchInvoiceBtn);
  if (searchInvoiceBtn) {
    searchInvoiceBtn.addEventListener("click", searchInvoicesByName);
  }

  const searchInvoiceNameInput = document.getElementById("search-invoice-name");
  console.log("searchInvoiceNameInput:", searchInvoiceNameInput);
  if (searchInvoiceNameInput) {
    searchInvoiceNameInput.addEventListener("input", (e) => {
      currentInvoiceSearchTerm = e.target.value.toLowerCase();
      displayInvoiceLog(); // تحديث العرض أثناء الكتابة
    });
  }

  console.log("تم الانتهاء من إعداد مستمعي الأحداث.");
}

// الدوال الخاصة بالمخزون (لم يتم تعديلها)
function addProductToInventory() {
  const name = newProductNameInput.value.trim();
  const price = parseFloat(newProductPriceInput.value);
  const quantity = parseInt(newProductQuantityInput.value);

  if (name && !isNaN(price) && !isNaN(quantity)) {
    const existingProduct = inventory.find(
      (item) => item.name === name && item.branch === currentBranch
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      inventory.push({
        id: Date.now(),
        name,
        price,
        quantity,
        branch: currentBranch
      });
    }
    newProductNameInput.value = "";
    newProductPriceInput.value = "";
    newProductQuantityInput.value = "";
    renderInventory();
  } else {
    alert("الرجاء إدخال اسم المنتج والسعر والكمية بشكل صحيح.");
  }
}
function renderInventory() {
  inventoryTableBody.innerHTML = "";
  inventory
    .filter((item) => item.branch === currentBranch)
    .forEach((product) => {
      const row = inventoryTableBody.insertRow();
      const nameCell = row.insertCell();
      const priceCell = row.insertCell();
      const quantityCell = row.insertCell();
      const actionsCell = row.insertCell();

      nameCell.textContent = product.name;
      priceCell.textContent = product.price.toFixed(2);
      quantityCell.textContent = product.quantity;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "حذف";
      deleteButton.classList.add("delete-btn");
      deleteButton.onclick = () => deleteInventoryItem(product.id);
      actionsCell.appendChild(deleteButton);
    });
}
function searchInventory() {
  const searchTerm = searchProductNameInput.value.toLowerCase();
  const filteredInventory = inventory.filter(
    (product) =>
      product.branch === currentBranch &&
      product.name.toLowerCase().includes(searchTerm)
  );
  renderFilteredInventory(filteredInventory);
}
function renderFilteredInventory(items) {
  inventoryTableBody.innerHTML = "";
  items.forEach((product) => {
    const row = inventoryTableBody.insertRow();
    const nameCell = row.insertCell();
    const priceCell = row.insertCell();
    const quantityCell = row.insertCell();
    const actionsCell = row.insertCell();

    nameCell.textContent = product.name;
    priceCell.textContent = product.price.toFixed(2);
    quantityCell.textContent = product.quantity;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteInventoryItem(product.id);
    actionsCell.appendChild(deleteButton);
  });
}
function deleteInventoryItem(id) {
  inventory = inventory.filter((item) => item.id !== id);
  renderInventory();
}
function increaseProductQuantity() {
  const nameToIncrease = increaseProductNameInput.value.trim();
  const quantityToAdd = parseInt(increaseProductQuantityInput.value);

  if (nameToIncrease && !isNaN(quantityToAdd) && quantityToAdd > 0) {
    const productToUpdate = inventory.find(
      (item) => item.name === nameToIncrease && item.branch === currentBranch
    );
    if (productToUpdate) {
      productToUpdate.quantity += quantityToAdd;
      renderInventory();
      increaseProductNameInput.value = "";
      increaseProductQuantityInput.value = "";
    } else {
      alert(`المنتج "${nameToIncrease}" غير موجود في المخزون.`);
    }
  } else {
    alert("الرجاء إدخال اسم المنتج والكمية المراد إضافتها بشكل صحيح.");
  }
}
function updateProductPrice() {
  const nameToUpdate = updatePriceProductNameInput.value.trim();
  const newPrice = parseFloat(newProductPriceUpdateInput.value);

  if (nameToUpdate && !isNaN(newPrice) && newPrice >= 0) {
    const productToUpdate = inventory.find(
      (item) => item.name === nameToUpdate && item.branch === currentBranch
    );
    if (productToUpdate) {
      productToUpdate.price = newPrice;
      renderInventory();
      updatePriceProductNameInput.value = "";
      newProductPriceUpdateInput.value = "";
    } else {
      alert(`المنتج "${nameToUpdate}" غير موجود في المخزون.`);
    }
  } else {
    alert("الرجاء إدخال اسم المنتج والسعر الجديد بشكل صحيح.");
  }
}

// الدوال الخاصة بالمبيعات اليومية
function togglePaymentDetails() {
  if (paymentStatusSelect.value === "جزئي") {
    paymentDetailsDiv.style.display = "grid";
  } else {
    paymentDetailsDiv.style.display = "none";
    amountPaidInput.value = "";
    amountRemainingInput.value = "";
  }
}
function calculateRemainingAmount() {
  const amountPaid = parseFloat(amountPaidInput.value) || 0;
  const salesTotal = parseFloat(salesTotalElement.textContent) || 0;
  amountRemainingInput.value = (salesTotal - amountPaid).toFixed(2);
}
function addProductToSales() {
  const name = salesProductNameInput.value.trim();
  const quantity = parseInt(salesQuantityInput.value);
  const price = parseFloat(salesPriceInput.value);

  if (name && !isNaN(quantity) && quantity > 0) {
    const inventoryItem = inventory.find(
      (item) => item.name === name && item.branch === currentBranch
    );
    if (inventoryItem) {
      const saleItem = {
        id: Date.now(),
        name: inventoryItem.name,
        quantity,
        price: isNaN(price) ? inventoryItem.price : price
      };
      currentSales.push(saleItem);
      renderDailySales();
      updateSalesTotal();
      salesProductNameInput.value = "";
      salesQuantityInput.value = "";
      salesPriceInput.value = "";
    } else {
      alert(`المنتج "${name}" غير موجود في المخزون.`);
    }
  } else {
    alert("الرجاء إدخال اسم المنتج والكمية بشكل صحيح.");
  }
}
function renderDailySales() {
  dailySalesTableBody.innerHTML = "";
  currentSales.forEach((item, index) => {
    const row = dailySalesTableBody.insertRow();
    const nameCell = row.insertCell();
    const quantityCell = row.insertCell();
    const priceCell = row.insertCell();
    const totalCell = row.insertCell();
    const actionsCell = row.insertCell();

    nameCell.textContent = item.name;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = item.price.toFixed(2);
    totalCell.textContent = (item.quantity * item.price).toFixed(2);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => removeSaleItem(index);
    actionsCell.appendChild(deleteButton);
  });
}
function removeSaleItem(index) {
  currentSales.splice(index, 1);
  renderDailySales();
  updateSalesTotal();
}
function updateSalesTotal() {
  const total = currentSales.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  salesTotalElement.textContent = total.toFixed(2);
}

function recordDailySales() {
  if (currentSales.length > 0 && salesBuyerNameInput.value.trim()) {
    const paymentStatus = paymentStatusSelect.value;
    let amountPaid = null;
    let amountRemaining = null;

    if (paymentStatus === "جزئي") {
      amountPaid = parseFloat(amountPaidInput.value);
      amountRemaining = parseFloat(amountRemainingInput.value);
      if (isNaN(amountPaid)) {
        alert("الرجاء إدخال المبلغ المدفوع.");
        return;
      }
    }

    const saleRecordEntry = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      buyerName: salesBuyerNameInput.value.trim(),
      items: [...currentSales],
      total: parseFloat(salesTotalElement.textContent),
      paymentStatus: paymentStatus,
      amountPaid: amountPaid,
      amountRemaining: amountRemaining,
      branch: currentBranch
    };

    let inventoryUpdated = true;
    for (const soldItem of currentSales) {
      const inventoryItem = inventory.find(
        (item) => item.name === soldItem.name && item.branch === currentBranch
      );
      if (inventoryItem) {
        inventoryItem.quantity -= soldItem.quantity;
        if (inventoryItem.quantity < 0) {
          alert(`خطأ: كمية غير كافية في المخزون لـ ${soldItem.name}`);
          inventoryUpdated = false;
          break;
        }
      } else {
        alert(`خطأ: المنتج ${soldItem.name} غير موجود في المخزون.`);
        inventoryUpdated = false;
        break;
      }
    }

    if (inventoryUpdated) {
      salesRecord.push(saleRecordEntry);
      displaySalesLog();
      renderInventory();
      console.log("تم تسجيل المبيعات وتحديث المخزون:", saleRecordEntry);
      alert("تم تسجيل المبيعات وتحديث المخزون بنجاح.");
      currentSales = [];
      renderDailySales();
      updateSalesTotal();
      salesBuyerNameInput.value = "";
      paymentStatusSelect.value = "كامل";
      togglePaymentDetails();
    } else {
      alert("لم يتم تسجيل عملية البيع بسبب مشكلة في تحديث المخزون.");
    }
  } else {
    alert("الرجاء إضافة منتجات للبيع وإدخال اسم المشتري بشكل صحيح.");
  }
}

function displaySalesLog() {
  salesLogDisplay.innerHTML = "";
  if (salesRecord.length > 0) {
    const table = document.createElement("table");
    table.classList.add("sales-log-table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
      "التاريخ",
      "الوقت",
      "اسم المشتري",
      "المنتج", // تم التعديل لعرض كل منتج في صف منفصل
      "الكمية",
      "السعر",
      "الإجمالي للمنتج",
      "الإجمالي للفاتورة", // تمت الإضافة
      "حالة الدفع",
      "المبلغ المدفوع",
      "المبلغ المتبقي"
    ];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    salesRecord.forEach((record) => {
      record.items.forEach((item) => {
        const row = document.createElement("tr");
        const cells = [
          record.date,
          record.time,
          record.buyerName,
          item.name,
          item.quantity,
          item.price,
          (item.quantity * item.price).toFixed(2),
          record.total.toFixed(2), // الإجمالي العام للفاتورة
          record.paymentStatus,
          record.amountPaid ? record.amountPaid.toFixed(2) : "",
          record.amountRemaining ? record.amountRemaining.toFixed(2) : ""
        ];

        cells.forEach((cellText) => {
          const td = document.createElement("td");
          td.textContent = cellText;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
    });
    table.appendChild(tbody);
    salesLogDisplay.appendChild(table);

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "تنزيل سجل المبيعات (Excel)";
    downloadButton.classList.add("action");
    downloadButton.style.marginTop = "10px";
    downloadButton.addEventListener("click", downloadSalesAsExcel);
    salesLogDisplay.appendChild(downloadButton);
  } else {
    salesLogDisplay.textContent = "لا يوجد سجل للمبيعات حتى الآن.";
  }
}

function downloadSalesAsExcel() {
  if (salesRecord.length > 0) {
    const header = [
      "التاريخ",
      "الوقت",
      "اسم المشتري",
      "اسم المنتج",
      "الكمية",
      "السعر",
      "الإجمالي للمنتج",
      "الإجمالي للفاتورة",
      "حالة الدفع",
      "المبلغ المدفوع",
      "المبلغ المتبقي"
    ];

    const data = [];
    salesRecord.forEach((record) => {
      record.items.forEach((item) => {
        data.push([
          record.date,
          record.time,
          record.buyerName,
          item.name,
          item.quantity,
          item.price,
          (item.quantity * item.price).toFixed(2),
          record.total.toFixed(2),
          record.paymentStatus,
          record.amountPaid ? record.amountPaid.toFixed(2) : "",
          record.amountRemaining ? record.amountRemaining.toFixed(2) : ""
        ]);
      });
    });

    const ws = XLSX.utils.aoa_to_sheet([header, data]);
    const wscols = [
      { wch: 15 },
      { wch: 10 },
      { wch: 20 },
      { wch: 30 },
      { wch: 10 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 }
    ];
    ws["!cols"] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "سجل المبيعات");
    XLSX.writeFile(wb, "سجل_المبيعات.xlsx");
  } else {
    alert("لا يوجد سجل للمبيعات لتنزيله.");
  }
}

// الدوال الخاصة بإصدار الفاتورة
function addProductToInvoice() {
  const name = invoiceProductNameInput.value.trim();
  const quantity = parseInt(invoiceQuantityInput.value);
  const price = parseFloat(invoicePriceInput.value);

  if (name && !isNaN(quantity) && quantity > 0) {
    const inventoryItem = inventory.find(
      (item) => item.name === name && item.branch === currentBranch
    );
    if (inventoryItem) {
      const invoiceItem = {
        id: Date.now(),
        name: inventoryItem.name,
        quantity,
        price: isNaN(price) ? inventoryItem.price : price
      };
      currentInvoiceItems.push(invoiceItem);
      renderInvoiceItems();
      updateInvoiceTotal();
      invoiceProductNameInput.value = "";
      invoiceQuantityInput.value = "";
      invoicePriceInput.value = "";
    } else {
      alert(`المنتج "${name}" غير موجود في المخزون.`);
    }
  } else {
    alert("الرجاء إدخال اسم المنتج والكمية بشكل صحيح.");
  }
}
function renderInvoiceItems() {
  invoiceItemsTableBody.innerHTML = "";
  currentInvoiceItems.forEach((item, index) => {
    const row = invoiceItemsTableBody.insertRow();
    const nameCell = row.insertCell();
    const quantityCell = row.insertCell();
    const priceCell = row.insertCell();
    const totalCell = row.insertCell();
    const actionsCell = row.insertCell();

    nameCell.textContent = item.name;
    quantityCell.textContent = item.quantity;
    priceCell.textContent = item.price.toFixed(2);
    totalCell.textContent = (item.quantity * item.price).toFixed(2);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => removeInvoiceItem(index);
    actionsCell.appendChild(deleteButton);
  });
}
function removeInvoiceItem(index) {
  currentInvoiceItems.splice(index, 1);
  renderInvoiceItems();
  updateInvoiceTotal();
}
function updateInvoiceTotal() {
  const total = currentInvoiceItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  invoiceTotalElement.textContent = total.toFixed(2);
}
function saveInvoice() {
  if (currentInvoiceItems.length > 0 && customerNameInput.value.trim()) {
    let inventoryUpdated = true;
    const updatedInventory = [...inventory]; // إنشاء نسخة لتعديلها

    for (const soldItem of currentInvoiceItems) {
      const inventoryItemIndex = updatedInventory.findIndex(
        (item) => item.name === soldItem.name && item.branch === currentBranch
      );
      if (inventoryItemIndex !== -1) {
        if (
          updatedInventory[inventoryItemIndex].quantity >= soldItem.quantity
        ) {
          updatedInventory[inventoryItemIndex].quantity -= soldItem.quantity;
        } else {
          alert(`خطأ: كمية غير كافية في المخزون لـ ${soldItem.name}`);
          inventoryUpdated = false;
          break;
        }
      } else {
        alert(`خطأ: المنتج ${soldItem.name} غير موجود في المخزون.`);
        inventoryUpdated = false;
        break;
      }
    }

    if (inventoryUpdated) {
      inventory = updatedInventory; // تحديث المخزون الفعلي
      const invoiceData = {
        id: invoiceNumberInput.value,
        date: invoiceDateElement.textContent,
        customerName: customerNameInput.value.trim(),
        items: [...currentInvoiceItems],
        total: parseFloat(invoiceTotalElement.textContent),
        branch: currentBranch
      };
      invoiceLog.push(invoiceData);
      displayInvoiceLog();
      renderInventory(); // إعادة عرض المخزون بعد التحديث
      console.log("تم حفظ الفاتورة وتحديث المخزون:", invoiceData);
      alert(
        `تم حفظ الفاتورة رقم: ${invoiceData.id} للعميل ${invoiceData.customerName} وتحديث المخزون.`
      );
      currentInvoiceItems = [];
      renderInvoiceItems();
      updateInvoiceTotal();
      customerNameInput.value = "";
      invoiceNumberInput.value = Date.now();
    } else {
      alert("لم يتم حفظ الفاتورة بسبب مشكلة في تحديث المخزون.");
    }
  } else {
    alert("الرجاء إضافة منتجات للفاتورة وإدخال اسم العميل.");
  }
}
function archiveCurrentInvoice() {
  if (currentInvoiceItems.length > 0 && customerNameInput.value.trim()) {
    const invoiceData = {
      id: invoiceNumberInput.value,
      date: invoiceDateElement.textContent,
      customerName: customerNameInput.value.trim(),
      items: [...currentInvoiceItems],
      total: parseFloat(invoiceTotalElement.textContent),
      branch: currentBranch
    };
    invoiceArchive.push(invoiceData);
    displayInvoiceArchive();
    console.log("تم أرشفة الفاتورة:", invoiceData);
    alert(
      `تم أرشفة الفاتورة رقم: ${invoiceData.id} للعميل ${invoiceData.customerName}`
    );
    currentInvoiceItems = [];
    renderInvoiceItems();
    updateInvoiceTotal();
    customerNameInput.value = "";
    invoiceNumberInput.value = Date.now();
  } else {
    alert("الرجاء إضافة منتجات للفاتورة وإدخال اسم العميل لأرشفة الفاتورة.");
  }
}
function printCurrentInvoice() {
  if (currentInvoiceItems.length > 0 && customerNameInput.value.trim()) {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>فاتورة رقم: <span class="math-inline">\{invoiceNumberInput\.value\}</title\>
<style\>
body \{ font\-family\: sans\-serif; direction\: rtl; \}
\.invoice\-header \{ text\-align\: center; margin\-bottom\: 20px; \}
\.invoice\-details \{ margin\-bottom\: 15px; \}
table \{ width\: 100%; border\-collapse\: collapse; margin\-top\: 20px; \}
th, td \{ border\: 1px solid \#ddd; padding\: 8px; text\-align\: right; \}
th \{ background\-color\: \#f2f2f2; \}
tfoot td \{ font\-weight\: bold; \}
</style\>
</head\>
<body\>
<div class\="invoice\-header"\>
<h2\></span>{companyName}</h2>
          <p>التاريخ: ${invoiceDateElement.textContent}</p>
          <p>رقم الفاتورة: ${invoiceNumberInput.value}</p>
          <p>اسم العميل: ${customerNameInput.value}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            ${currentInvoiceItems
      .map(
        (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                `
      )
      .join("")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: left;">الإجمالي:</td>
              <td>${invoiceTotalElement.textContent}</td>
            </tr>
          </tfoot>
        </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  } else {
    alert("الرجاء إضافة منتجات للفاتورة وإدخال اسم العميل لطباعة الفاتورة.");
  }
}

// الدوال الخاصة بسجل الفواتير
function displayInvoiceLog() {
  invoiceLogDisplay.innerHTML = "";
  const invoicesToDisplay = currentInvoiceSearchTerm
    ? invoiceLog.filter((invoice) =>
        invoice.customerName.toLowerCase().includes(currentInvoiceSearchTerm)
      )
    : invoiceLog;

  if (invoicesToDisplay.length > 0) {
    const table = document.createElement("table");
    table.classList.add("invoice-log-table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
      "رقم الفاتورة",
      "التاريخ",
      "اسم العميل",
      "عدد المنتجات",
      "الإجمالي",
      "العمليات"
    ];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    invoicesToDisplay.forEach((invoice) => {
      const row = document.createElement("tr");
      const cells = [
        invoice.id,
        invoice.date,
        invoice.customerName,
        invoice.items.length, // عدد المنتجات في الفاتورة
        invoice.total.toFixed(2)
      ];
      cells.forEach((cellText) => {
        const td = document.createElement("td");
        td.textContent = cellText;
        row.appendChild(td);
      });

      const actionsCell = row.insertCell();
      const openButton = document.createElement("button");
      openButton.textContent = "فتح";
      openButton.classList.add("action");
      openButton.style.fontSize = "0.9em";
      openButton.style.padding = "5px 10px";
      openButton.onclick = () => openInvoiceDetails(invoice.id);
      actionsCell.appendChild(openButton);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    invoiceLogDisplay.appendChild(table);
  } else {
    invoiceLogDisplay.textContent = "لا يوجد سجل للفواتير مطابق لعملية البحث.";
  }
}

// دالة جديدة للبحث عن الفواتير بالاسم
function searchInvoicesByName() {
  currentInvoiceSearchTerm = searchInvoiceNameInput.value.toLowerCase();
  displayInvoiceLog();
}

// دالة لعرض تفاصيل الفاتورة
function openInvoiceDetails(invoiceId) {
  const invoice = invoiceLog.find((inv) => inv.id === invoiceId);
  if (invoice) {
    invoiceDetailsDisplay.innerHTML = `
          <h3>تفاصيل الفاتورة رقم: ${invoice.id}</h3>
          <p>التاريخ: ${invoice.date}</p>
          <p>اسم العميل: ${invoice.customerName}</p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>المنتج</th>
                  <th>الكمية</th>
                  <th>السعر</th>
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items
      .map(
        (item) => `
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    `
      )
      .join("")}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="text-align: left;">الإجمالي:</td>
                  <td>${invoice.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        `;
    invoiceDetailsDisplay.style.display = "block";
  } else {
    invoiceDetailsDisplay.textContent = "لم يتم العثور على الفاتورة.";
    invoiceDetailsDisplay.style.display = "block";
  }
}

// الدوال الخاصة بأرشيف الفواتير
function displayInvoiceArchive() {
  invoiceArchiveDisplay.innerHTML = "";
  if (invoiceArchive.length > 0) {
    invoiceArchive.forEach((invoice) => {
      const invoiceDiv = document.createElement("div");
      invoiceDiv.classList.add("archived-invoice");
      invoiceDiv.innerHTML = `
        <h3>الفاتورة رقم: ${invoice.id}</h3>
        <p>التاريخ: ${invoice.date}</p>
        <p>اسم العميل: ${invoice.customerName}</p>
        <p>الإجمالي: ${invoice.total.toFixed(2)}</p>
        <button class="delete-archive-btn" onclick="deleteArchivedInvoice('${
        invoice.id
      }')">حذف من الأرشيف</button>
      `;
      invoiceArchiveDisplay.appendChild(invoiceDiv);
    });
  } else {
    invoiceArchiveDisplay.textContent = "لا يوجد فواتير مؤرشفة حتى الآن.";
  }
}
function deleteArchivedInvoice(id) {
  invoiceArchive = invoiceArchive.filter((invoice) => invoice.id !== id);
  displayInvoiceArchive();
}

// تهيئة البرنامج
function initializeApp() {
  hideAllSections();
  inventorySection.style.display = "block";
  renderInventory();
  setupEventListeners();
  invoiceDateElement.textContent = new Date().toLocaleDateString();
  invoiceCompanyNameElement.textContent = companyName;
  invoiceNumberInput.value = Date.now();
  togglePaymentDetails();
  displayInvoiceLog();
}

// تهيئة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", initializeApp);
