import { state } from '../state';
import { Bookmarks } from '../views';

export const renderBookmarks = () => {
  const storedBookmarks =
    JSON.parse(localStorage.getItem('bookmarks') as string) || [];

  state.bookmarks = storedBookmarks;

  Bookmarks.render(() => state.bookmarks);

  if (state.bookmarks.length === 0) {
    Bookmarks.renderMessage({ svg: 'bell' });
  }
};
