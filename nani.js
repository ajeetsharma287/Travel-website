const mainImages = document.querySelectorAll(".default .main-img img");
const thumbnails = document.querySelectorAll(".default .thumb-list div");
const lightboxMainImages = document.querySelectorAll(".lightbox .main-img img");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox .thumb-list div"
);
const lightbox = document.querySelector(".lightbox");
const iconClose = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");

let currentImageIndex = 0;

const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");
  currentImageIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

iconPrev.addEventListener("click", () => {
  if (currentImageIndex <= 0) {
    changeImage(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentImageIndex - 1, lightboxMainImages, lightboxThumbnails);
  }
});

iconNext.addEventListener("click", () => {
  if (currentImageIndex >= mainImages.length - 1) {
    changeImage(0, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImage(currentImageIndex + 1, lightboxMainImages, lightboxThumbnails);
  }
});

iconClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// Image Gallery Logic (keep your existing gallery code here)

document.addEventListener('DOMContentLoaded', function() {
  // ========== Image Gallery Logic ========== //
  // (Keep your existing gallery code here if any)

  // ========== Comment System Logic ========== //
  // Generate or retrieve user ID
  let userId = localStorage.getItem('userId');
  if (!userId) {
      userId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
  }

  // DOM Elements
  const commentForm = document.querySelector('.comment-form');
  const commentsContainer = document.querySelector('.comments-container');
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');

  // Element verification
  if (!commentForm || !commentsContainer || !nameInput || !commentInput) {
      console.error('Required elements missing! Check HTML structure');
      return;
  }

  // Load comments from localStorage
  let comments = JSON.parse(localStorage.getItem('comments')) || [];

  // Render comments function
  function renderComments() {
      commentsContainer.innerHTML = '';

      if (comments.length === 0) {
          commentsContainer.innerHTML = `
              <p class="no-comments">No comments yet. Be the first to share your thoughts!</p>
          `;
          return;
      }

      comments.forEach((comment, index) => {
          const commentEl = document.createElement('div');
          commentEl.className = 'comment';
          
          const deleteButton = comment.userId === userId ?
              `<button class="delete-btn" data-index="${index}">Delete</button>` :
              '';

          commentEl.innerHTML = `
              ${deleteButton}
              <div class="comment-header">
                  <span class="comment-author">${comment.name}</span>
                  <span class="comment-date">${new Date(comment.date).toLocaleString()}</span>
              </div>
              <p>${comment.text}</p>
          `;

          commentsContainer.appendChild(commentEl);
      });
  }

  // Handle comment submission
  commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = nameInput.value.trim();
      const text = commentInput.value.trim();

      if (!name || !text) {
          alert('Please fill in both name and comment fields!');
          return;
      }

      const newComment = {
          name,
          text,
          date: new Date().toISOString(),
          userId: userId
      };

      comments.push(newComment);
      localStorage.setItem('comments', JSON.stringify(comments));
      renderComments();
      commentForm.reset();
  });

  // Handle comment deletion
  commentsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
          const index = parseInt(e.target.dataset.index);
          
          if (index >= 0 && index < comments.length && comments[index].userId === userId) {
              if (confirm('Are you sure you want to delete this comment?')) {
                  comments.splice(index, 1);
                  localStorage.setItem('comments', JSON.stringify(comments));
                  renderComments();
              }
          }
      }
  });

  // Clear all comments (admin function)
  window.clearAllComments = function() {
      if (confirm('Are you sure you want to delete ALL comments?')) {
          localStorage.removeItem('comments');
          comments = [];
          renderComments();
      }
  }

  // Initial render
  renderComments();

  // ========== Scroll Management ========== //
  function handleScroll() {
      if (commentsContainer.scrollHeight > commentsContainer.clientHeight) {
          commentsContainer.classList.add('scrollable');
      } else {
          commentsContainer.classList.remove('scrollable');
      }
  }

  // Initial scroll check
  handleScroll();
  // Update on window resize
  window.addEventListener('resize', handleScroll);
});