function triggerShatter(targetElement, imgPath) {
    // 1. Create a full-screen canvas dynamically
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none'; // So you can still click things under it
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    // 2. Set internal resolution to match screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 3. Get the position of your heart button
    const rect = targetElement.getBoundingClientRect();
    
    // 4. Load the image and start the shatter
    // (Ensure this image is the same one used for your button)
    const img = new Image();
    img.src = imgPath; 

    img.onload = () => {
        // Hide the original button so it looks like it exploded
        targetElement.style.visibility = 'hidden';

        let particles = [];
        const imageData = getPixelData(img, rect.width, rect.height);

        // Create particles based on button's screen position
        for (let y = 0; y < rect.height; y += 4) {
            for (let x = 0; x < rect.width; x += 4) {
                const i = (y * Math.floor(rect.width) + x) * 4;
                if (imageData.data[i + 3] > 128) {
                    particles.push({
                        x: x + rect.left,
                        y: y + rect.top,
                        color: `rgb(${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]})`,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10 - 2,
                        alpha: 1
                    });
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.vx *= 0.99;
                p.vy += 0.3; // Gravity
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.01;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, 3, 3);
            });
            
            particles = particles.filter(p => p.alpha > 0);
            if (particles.length > 0) {
                requestAnimationFrame(animate);
            } else {
                canvas.remove(); // Clean up when done
            }
        }
        animate();
    };
}

// Helper to read the heart's colors
function getPixelData(img, w, h) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = w;
    tempCanvas.height = h;
    tempCtx.drawImage(img, 0, 0, w, h);
    return tempCtx.getImageData(0, 0, w, h);
}