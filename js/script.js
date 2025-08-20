
document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});
