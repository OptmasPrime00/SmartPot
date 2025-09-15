const frameCount = 360;
const currentFrame = index => (
    `static/frames/productFrame${index.toString().padStart(3, '0')}.jpg`
);

const canvas = document.getElementById('animation');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const imageSeq = { frame: 0 };

for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

const img = new Image();
img.src = currentFrame(1);
img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    document.querySelector('.loading').style.display = 'none';
};

function render() {
    const img = images[imageSeq.frame];
    if (img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );
    imageSeq.frame = frameIndex;
    render();
});