// Data Master Kendaraan
const vehicles = [
    { id: 1, name: "Toyota Avanza", type: "Mobil (7 Seat)", price: 350000 },
    { id: 2, name: "Honda Brio", type: "Mobil (5 Seat)", price: 300000 },
    { id: 3, name: "Mitsubishi Pajero", type: "SUV Premium", price: 850000 },
    { id: 4, name: "Honda Vario 160", type: "Motor Matik", price: 90000 }
];

let selectedVehicle = null;

// Inisialisasi Aplikasi
document.addEventListener("DOMContentLoaded", () => {
    renderVehicles();
    initDateConstraints();
});

// 1. Tampilkan Daftar Kendaraan
function renderVehicles() {
    const container = document.getElementById("vehicleContainer");
    container.innerHTML = "";

    vehicles.forEach(v => {
        const item = document.createElement("div");
        item.className = "vehicle-item";
        item.onclick = () => selectVehicle(v, item);
        item.innerHTML = `
            <div class="vehicle-info">
                <h3>${v.name}</h3>
                <p>${v.type}</p>
            </div>
            <div class="vehicle-price">
                Rp ${v.price.toLocaleString("id-ID")}/hari
            </div>
        `;
        container.appendChild(item);
    });
}

// Prevents Jadwal Kosong/Past Date
function initDateConstraints() {
    const dateInput = document.getElementById("startDate");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
}

// 2. Pilih Kendaraan
function selectVehicle(vehicle, element) {
    document.querySelectorAll(".vehicle-item").forEach(el => el.classList.remove("selected"));
    element.classList.add("selected");
    
    selectedVehicle = vehicle;
    document.getElementById("vehicleError").style.display = "none";
    calculateTotal();
}

// 3. Hitung Biaya Otomatis
function calculateTotal() {
    const durationInput = document.getElementById("duration");
    const duration = parseInt(durationInput.value) || 0;

    if (selectedVehicle) {
        document.getElementById("sumVehicle").innerText = selectedVehicle.name;
        document.getElementById("sumRate").innerText = `Rp ${selectedVehicle.price.toLocaleString("id-ID")}`;
    } else {
        document.getElementById("sumVehicle").innerText = "-";
        document.getElementById("sumRate").innerText = "Rp 0";
    }

    document.getElementById("sumDuration").innerText = `${duration} Hari`;

    const total = selectedVehicle ? selectedVehicle.price * duration : 0;
    document.getElementById("sumTotal").innerText = `Rp ${total.toLocaleString("id-ID")}`;
}

// 4. Validasi Lengkap & Proses Pembayaran
function handleProcessPayment(event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const startDate = document.getElementById("startDate").value;
    const duration = parseInt(document.getElementById("duration").value);

    let isValid = true;

    if (!selectedVehicle) {
        document.getElementById("vehicleError").style.display = "block";
        isValid = false;
    }

    if (!startDate || duration <= 0) {
        isValid = false;
    }

    if (!name || !phone) {
        isValid = false;
    }

    if (!isValid) {
        document.getElementById("formError").style.display = "block";
        return;
    }

    document.getElementById("formError").style.display = "none";

    const totalCost = selectedVehicle.price * duration;
    
    document.getElementById("recName").innerText = name;
    document.getElementById("recPhone").innerText = phone;
    document.getElementById("recVehicle").innerText = selectedVehicle.name;
    document.getElementById("recDate").innerText = startDate;
    document.getElementById("recDuration").innerText = `${duration} Hari`;
    document.getElementById("recTotal").innerText = `Rp ${totalCost.toLocaleString("id-ID")}`;

    document.getElementById("receiptModal").style.display = "flex";
}

// Reset Aplikasi
function closeModal() {
    document.getElementById("receiptModal").style.display = "none";
    document.getElementById("rentalForm").reset();
    selectedVehicle = null;
    document.querySelectorAll(".vehicle-item").forEach(el => el.classList.remove("selected"));
    initDateConstraints();
    calculateTotal();
}
  
