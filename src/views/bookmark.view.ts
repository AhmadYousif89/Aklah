import { Recipe } from '../types';
import MainView from './main.view';
import { Preview } from './previews.view';

class BookmarkView extends MainView {
  data: Recipe[] = [];
  msg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  constructor() {
    super('.bookmarks .bookmarks__list');
  }

  viewHandler(handler: () => void) {
    window.addEventListener('load', handler);
  }

  renderMarkup() {
    const bookmarkList = Preview.renderMarkup(this.data);
    return bookmarkList;
  }
}

export const Bookmarks = new BookmarkView();
