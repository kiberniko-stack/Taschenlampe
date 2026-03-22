let istAn = false;
let videoStream = null;
let track = null;
let debugLogs = [];

// Debug-Funktion
function log(nachricht) {
    const timestamp = new Date().toLocaleTimeString();
    debugLogs.push(`[${timestamp}] ${nachricht}`);
    if (debugLogs.length > 20) debugLogs.shift();
    
    const debugDiv = document.getElementById('debug');
    if (debugDiv) {
        debugDiv.innerHTML = debugLogs.join('<br>');
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
    console.log(nachricht);
}

function toggleDebug() {
    const debugDiv = document.getElementById('debug');
    debugDiv.classList.toggle('sichtbar');
}

// Initialisierung
document.addEventListener('DOMContentLoaded', async () => {
    log('App gestartet');
    log('User Agent: ' + navigator.userAgent);
    
    // Prüfe Unterstützung
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        zeigeFehler('Dein Browser unterstützt die Kamera-API nicht.');
        log('FEHLER: Keine MediaDevices API');
        return;
    }
    
    log('MediaDevices API verfügbar');
    
    // Liste verfügbare Geräte auf
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const kameras = devices.filter(d => d.kind === 'videoinput');
        log(`Kameras gefunden: ${kameras.length}`);
        kameras.forEach((cam, i) => {
            log(`  Kamera ${i}: ${cam.label || 'Unbekannt'}`);
        });
    } catch (err) {
        log('Fehler beim Auflisten der Geräte: ' + err.message);
    }
});

// Haupt-Toggle-Funktion
async function umschalten() {
    log('Button geklickt');
    
    if (istAn) {
        ausschalten();
    } else {
        await einschalten();
    }
}

async function einschalten() {
    log('Versuche einzuschalten...');
    
    try {
        // Methode 1: Mit torch constraint (Android Chrome)
        log('Versuche Methode 1: torch constraint');
        
        const constraints = {
            video: {
                facingMode: 'environment',
                advanced: [{ torch: true }]
            }
        };
        
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        track = videoStream.getVideoTracks()[0];
        
        log('Video Stream erhalten');
        log('Track capabilities: ' + JSON.stringify(track.getCapabilities()));
        
        // Prüfe ob torch unterstützt wird
        const capabilities = track.getCapabilities();
        if (!capabilities.torch) {
            log('Torch nicht in capabilities, versuche alternative Methode');
            track.stop();
            videoStream = null;
            await einschaltenAlternativ();
            return;
        }
        
        // Aktiviere torch
        await track.applyConstraints({
            advanced: [{ torch: true }]
        });
        
        log('Taschenlampe eingeschaltet (Methode 1)');
        updateUI(true);
        
    } catch (err) {
        log('Methode 1 fehlgeschlagen: ' + err.message);
        
        // Versuche alternative Methode
        try {
            await einschaltenAlternativ();
        } catch (err2) {
            log('Alle Methoden fehlgeschlagen: ' + err2.message);
            zeigeFehler('Taschenlampe konnte nicht aktiviert werden. Stelle sicher, dass du die Kamera-Berechtigung erteilt hast.');
        }
    }
}

async function einschaltenAlternativ() {
    log('Versuche Methode 2: Standard video stream');
    
    // Hole einfach nur Video-Stream und versuche dann torch
    const constraints = {
        video: {
            facingMode: 'environment'
        }
    };
    
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    track = videoStream.getVideoTracks()[0];
    
    log('Video Stream erhalten (Methode 2)');
    
    const capabilities = track.getCapabilities();
    log('Capabilities: ' + JSON.stringify(capabilities));
    
    if (capabilities.torch) {
        await track.applyConstraints({
            advanced: [{ torch: true }]
        });
        log('Taschenlampe eingeschaltet (Methode 2)');
        updateUI(true);
    } else {
        throw new Error('Torch wird nicht unterstützt');
    }
}

function ausschalten() {
    log('Schalte aus...');
    
    if (track) {
        // Deaktiviere torch
        track.applyConstraints({
            advanced: [{ torch: false }]
        }).catch(err => log('Fehler beim Ausschalten: ' + err.message));
        
        // Stoppe den Track
        track.stop();
        track = null;
    }
    
    if (videoStream) {
        videoStream.getTracks().forEach(t => t.stop());
        videoStream = null;
    }
    
    log('Taschenlampe ausgeschaltet');
    updateUI(false);
}

function updateUI(an) {
    istAn = an;
    
    const body = document.body;
    const button = document.getElementById('button');
    const icon = document.getElementById('icon');
    const glow = document.getElementById('glow');
    const status = document.getElementById('status');
    const fehlerDiv = document.getElementById('fehler');
    
    if (an) {
        body.classList.add('an');
        button.classList.add('an');
        icon.classList.remove('aus');
        icon.classList.add('an');
        glow.classList.add('aktiv');
        status.textContent = 'Taschenlampe an';
        fehlerDiv.style.display = 'none';
    } else {
        body.classList.remove('an');
        button.classList.remove('an');
        icon.classList.remove('an');
        icon.classList.add('aus');
        glow.classList.remove('aktiv');
        status.textContent = 'Taschenlampe aus';
    }
}

function zeigeFehler(nachricht) {
    const fehlerDiv = document.getElementById('fehler');
    fehlerDiv.textContent = nachricht;
    fehlerDiv.style.display = 'block';
    log('FEHLER angezeigt: ' + nachricht);
}

// Cleanup beim Verlassen
window.addEventListener('beforeunload', () => {
    if (istAn) {
        ausschalten();
    }
});

// Bei Sichtbarkeitsverlust ausschalten
document.addEventListener('visibilitychange', () => {
    if (document.hidden && istAn) {
        log('App im Hintergrund, schalte aus');
        ausschalten();
    }
});
