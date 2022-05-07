// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

const refs = {
  gallery: document.querySelector('.gallery'),
};

const insertGalleryItem = items => {
  return items
    .map(
      item => `<a class="gallery__item" href="${item.original}">
                          <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
                      </a>`,
    )
    .join('');
};

refs.gallery.insertAdjacentHTML('beforeend', insertGalleryItem(galleryItems));
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
