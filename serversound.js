// ดึงวิดีโอทั้งหมดในหน้าออกมา
const allVideos = document.querySelectorAll('video');

allVideos.forEach(video => {
    video.addEventListener('play', () => {
        // เมื่อวิดีโอใดๆ กดเล่น ให้วนลูปปิดตัวอื่นที่เหลือ
        allVideos.forEach(otherVideo => {
            if (otherVideo !== video) {
                otherVideo.pause(); // หรือ otherVideo.muted = true;
            }
        });
    });
});
