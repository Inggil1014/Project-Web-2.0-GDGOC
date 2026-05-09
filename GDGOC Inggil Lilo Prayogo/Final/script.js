// 1. Data Global
const currList = ["USD", "IDR", "EUR", "JPY", "SGD", "MYR"];
const tips = [
    "Investasi terbaik adalah investasi pada dirimu sendiri.",
    "Jangan menabung apa yang tersisa, habiskan apa yang tersisa setelah menabung.",
    "Pahami perbedaan antara kebutuhan dan keinginan sebelum membeli.",
    "Miliki dana darurat setidaknya 3-6 kali pengeluaran bulanan.",
    "Catat setiap pengeluaranmu agar bocor halus keuangan terdeteksi.",
    "Kekayaan bukan tentang seberapa banyak uang yang kau simpan, tapi seberapa banyak yang kau tabung."
];

// Fungsi Inisialisasi saat Window Dimuat
function init() {
    // Isi Dropdown Mata Uang
    const from = document.getElementById("fromCurr");
    const to = document.getElementById("toCurr");
    if (from && to) {
        currList.forEach(c => {
            from.add(new Option(c, c));
            to.add(new Option(c, c));
        });
        from.value = "USD";
        to.value = "IDR";
    }

    // Set Quote Acak di Footer
    const tipElement = document.getElementById("financialTip");
    if (tipElement) {
        tipElement.innerText = `"${tips[Math.floor(Math.random() * tips.length)]}"`;
    }

    loadPopular();
}

// Navbar Sticky Effect
const nav = document.getElementById('mainNav');
window.onscroll = function() {
    if (window.scrollY > 50) {
        nav.classList.remove('bg-white');
        nav.classList.add('bg-white/70', 'backdrop-blur-md', 'py-3', 'shadow-sm');
    } else {
        nav.classList.add('bg-white');
        nav.classList.remove('bg-white/70', 'backdrop-blur-md', 'py-3', 'shadow-sm');
    }
};

// Fitur Currency Converter (Fetch API)
async function convert() {
    const amount = document.getElementById("convAmount").value;
    const from = document.getElementById("fromCurr").value;
    const to = document.getElementById("toCurr").value;
    const display = document.getElementById("convResult");

    if (!amount || amount <= 0) {
        alert("Masukkan jumlah yang valid!");
        return;
    }

    display.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Menghitung...`;

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        const rate = data.rates[to];
        const total = (amount * rate).toLocaleString('id-ID');
        
        display.innerHTML = `
            <div class="flex flex-col">
                <span class="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">Hasil Estimasi</span>
                <span class="text-lg text-slate-800 font-black">${amount} ${from} = </span>
                <span class="text-xl text-blue-600 font-black">${total} ${to}</span>
            </div>
        `;
    } catch (e) {
        display.innerText = "Gagal memuat data API.";
    }
}

// Fitur Budget Planner
function planBudget() {
    const income = document.getElementById("incomeInput").value;
    const resultDiv = document.getElementById("budgetResult");

    if (!income || income <= 0) return alert("Masukkan total pemasukan!");

    const needs = (income * 0.5).toLocaleString('id-ID');
    const wants = (income * 0.3).toLocaleString('id-ID');
    const savings = (income * 0.2).toLocaleString('id-ID');

    resultDiv.innerHTML = `
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl mt-2 border border-slate-100 italic"><span>Kebutuhan (50%)</span> <b>Rp ${needs}</b></div>
        <div class="flex justify-between p-3 bg-slate-50 rounded-xl mt-1 border border-slate-100 italic"><span>Keinginan (30%)</span> <b>Rp ${wants}</b></div>
        <div class="flex justify-between p-3 bg-emerald-50 text-emerald-700 rounded-xl mt-1 font-black"><span>Tabungan (20%)</span> <b>Rp ${savings}</b></div>
    `;
}

// Fitur Savings Goal (Progress Visual)
function calculateGoal() {
    const name = document.getElementById("goalName").value || "Barang Impian";
    const target = parseFloat(document.getElementById("goalTarget").value);
    const current = parseFloat(document.getElementById("currentSave").value);
    
    const container = document.getElementById("progressContainer");
    const bar = document.getElementById("progressBar");
    const percentText = document.getElementById("percentText");
    const summary = document.getElementById("goalSummary");
    const displayName = document.getElementById("displayGoalName");

    if (!target || isNaN(current)) return alert("Isi target dan tabungan saat ini!");

    let percent = (current / target) * 100;
    if (percent > 100) percent = 100;

    container.classList.remove('hidden');
    displayName.innerText = name;
    
    setTimeout(() => {
        bar.style.width = percent.toFixed(0) + "%";
        percentText.innerText = percent.toFixed(0) + "%";
    }, 100);

    const remaining = target - current;
    if (remaining <= 0) {
        summary.innerHTML = "Selamat! Targetmu sudah tercapai. 🎉";
        bar.classList.replace('bg-yellow-500', 'bg-emerald-500');
    } else {
        summary.innerHTML = `Kurang <b>Rp ${remaining.toLocaleString('id-ID')}</b> lagi!`;
        bar.classList.replace('bg-emerald-500', 'bg-yellow-500');
    }
}

// Load Kurs Populer (Real-time IDR)
async function loadPopular() {
    const pop = document.getElementById("popularRates");
    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/IDR`);
        const data = await res.json();
        const list = ["USD", "EUR", "SGD", "MYR"];
        pop.innerHTML = "";
        list.forEach(c => {
            const val = (1 / data.rates[c]).toLocaleString('id-ID');
            pop.innerHTML += `
                <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${c}/IDR</p>
                    <p class="font-bold text-blue-600 text-lg">Rp ${val}</p>
                </div>`;
        });
    } catch (e) { console.error("API Error"); }
}

window.onload = init;