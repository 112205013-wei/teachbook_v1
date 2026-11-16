document.addEventListener('DOMContentLoaded', () => {
  // Index Page Filter & Search Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const publishedOnlyCheckbox = document.getElementById('publishedOnly');
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.lesson-card');
  const resultSummary = document.getElementById('resultSummary');

  if (cards.length > 0) {
    let currentGrade = 'all';

    function applyFilters() {
      const onlyPublished = publishedOnlyCheckbox ? publishedOnlyCheckbox.checked : false;
      const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let visibleCount = 0;

      cards.forEach(card => {
        const grade = card.dataset.grade;
        const status = card.dataset.status;
        const text = card.textContent.toLowerCase();

        const matchGrade = (currentGrade === 'all') || (grade === currentGrade);
        const matchStatus = (!onlyPublished) || (status === 'published');
        const matchKeyword = (!keyword) || text.includes(keyword);

        if (matchGrade && matchStatus && matchKeyword) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (resultSummary) {
        resultSummary.textContent = `目前顯示 ${visibleCount} 篇講義（共收錄 ${cards.length} 篇選文）`;
      }
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentGrade = btn.dataset.filter;
        applyFilters();
      });
    });

    if (publishedOnlyCheckbox) {
      publishedOnlyCheckbox.addEventListener('change', applyFilters);
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }

    applyFilters();
  }

  // Lesson Page Classical Text Font-Size Toggle
  const fontToggleBtn = document.getElementById('fontToggleBtn');
  const classicalText = document.getElementById('classicalText');
  if (fontToggleBtn && classicalText) {
    fontToggleBtn.addEventListener('click', () => {
      const isLarge = classicalText.classList.toggle('is-large');
      fontToggleBtn.textContent = isLarge ? '字級：放大（點擊還原）' : '字級：標準（點擊放大）';
    });
  }
});
