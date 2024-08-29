function toggleButtonState() {
    const textInput = document.getElementById("text-input");
    const generateBtn = document.getElementById("generate-btn");

    if (textInput.value.trim() === "") {
        generateBtn.disabled = true;
        generateBtn.style.backgroundColor = "#444";
    } else {
        generateBtn.disabled = false;
        generateBtn.style.backgroundColor = "#6200ea";
    }
}

function generateQRCode() {
    const text = document.getElementById("text-input").value;
    const qrCodeContainer = document.getElementById("qrcode");
    const downloadCircle = document.getElementById("download-circle");
    const downloadBtn = document.getElementById("download-btn");

    // QR-Code-Container und Download-Button initial verstecken
    qrCodeContainer.innerHTML = "";
    downloadCircle.style.display = "none";
    downloadBtn.style.display = "none";

    if (text.trim() === "") {
        alert("Bitte einen Text eingeben, um einen QR-Code zu generieren.");
        return;
    }

    // QR-Code generieren
    QRCode.toDataURL(text, { width: 256, height: 256 }, function (error, url) {
        if (error) {
            console.error(error);
            return;
        }
        
        const img = document.createElement('img');
        img.src = url;
        qrCodeContainer.appendChild(img);

        // Animationen hinzufügen
        qrCodeContainer.style.opacity = "0";
        qrCodeContainer.style.display = "block"; // QR-Code-Feld sichtbar machen
        setTimeout(() => {
            qrCodeContainer.style.animation = "slideDown 0.5s ease forwards";
        }, 50);

        // Eingabefeld und Button nach oben sliden
        document.getElementById("text-input").style.animation = "slideUp 0.5s ease forwards";
        document.getElementById("generate-btn").style.animation = "slideUp 0.5s ease forwards";

        // Kreis anzeigen und Animation starten
        setTimeout(() => {
            downloadCircle.style.display = "block";
            downloadCircle.style.opacity = "1";
            downloadCircle.style.animation = "expandToButton 0.5s ease forwards";

            // Download-Button anzeigen und Blinken hinzufügen
            setTimeout(() => {
                downloadCircle.style.display = "none"; // Kreis ausblenden, da Button erscheint
                downloadBtn.style.display = "inline-block";
                downloadBtn.style.opacity = "1";
                downloadBtn.classList.add("blink");
                setTimeout(() => downloadBtn.classList.remove("blink"), 1000); // Blinken nur einmalig
            }, 600); // nach dem Kreis-Ausdehnen
        }, 1000); // Startet 1 Sekunde nach QR-Code-Generierung

        downloadBtn.onclick = function () {
            downloadQRCode(url);
        };
    });
}

function downloadQRCode(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
