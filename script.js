const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

// Mainkan muzik sebaik sahaja tetamu klik butang atau skrin
musicBtn.addEventListener("click", function() {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "🔇 Tutup Muzik";
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵 Pasang Muzik";
    }
});

// Automatik mainkan muzik apabila pengguna mula skrol skrin (alternatif autoplay)
window.addEventListener('scroll', () => {
    music.play().catch(error => {
        // Abaikan ralat jika browser menyekat autoplay sebelum interaksi
    });
}, { once: true });


// 1. FUNGSI COUNTDOWN (KIRAAN DETIK)
const tarikhKahwin = new Date("Dec 12, 2026 11:00:00").getTime();

const x = setInterval(function() {
    const sekarang = new Date().getTime();
    const jarak = tarikhKahwin - sekarang;

    // Pengiraan masa untuk Hari, Jam, Minit dan Saat
    const hari = Math.floor(jarak / (1000 * 60 * 60 * 24));
    const jam = Math.floor((jarak % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minit = Math.floor((jarak % (1000 * 60 * 60)) / (1000 * 60));
    const saat = Math.floor((jarak % (1000 * 60)) / 1000);

    // Paparkan hasil dalam elemen id="countdown"
    document.getElementById("countdown").innerHTML = `${hari}h ${jam}j ${minit}m ${saat}s lagi`;

    // Jika countdown tamat
    if (jarak < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Selamat Pengantin Baru!";
    }
}, 1000);

// 2. FUNGSI BORANG RSVP INTERAKTIF
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const kehadiran = document.getElementById('kehadiran').value;
    const pax = document.getElementById('pax').value || 1;
    const statusMsg = document.getElementById('rsvpStatus');

    statusMsg.innerHTML = "Sedang menghantar...";

    // GANTIKAN URL DI BAWAH dengan Web app URL daripada Google Apps Script anda tadi
    const urlGoogleScript = "https://script.google.com/macros/s/AKfycbzSEqljvDtFFqfMJp8g0EoxGDwj91xmNDEiTLH-rWbkRh5H1I_pGD_qAlGF9jQf6gc/exec"; 

    const dataRSVP = { nama: nama, kehadiran: kehadiran, pax: pax };

    fetch(urlGoogleScript, {
        method: 'POST',
        mode: 'no-cors', // Mengelakkan masalah CORS browser
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataRSVP),
    })
    .then(() => {
        if(kehadiran === "Hadir") {
            statusMsg.style.color = "green";
            statusMsg.innerHTML = `Terima kasih ${nama}! RSVP anda telah berjaya disimpan.`;
        } else {
            statusMsg.style.color = "red";
            statusMsg.innerHTML = `Terima kasih atas maklum balas anda, ${nama}.`;
        }
        document.getElementById('rsvpForm').reset();
    })
    .catch(error => {
        statusMsg.style.color = "red";
        statusMsg.innerHTML = "Ralat berlaku. Sila cuba lagi.";
        console.error('Error:', error);
    });
});

