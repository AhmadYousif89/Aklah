import { Recipe } from '../types';
import MainView from './main.view';
import { PreviewView as Preview } from '../views';

class BookmarkView extends MainView {
  protected data: Recipe[] = [];
  protected msg = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  constructor() {
    super('.bookmarks__list');
  }

  viewHandler(handler: () => void) {
    window.addEventListener('load', handler);
  }

  protected renderMarkup() {
    return this.data
      .map((recipe) => new Preview('.bookmarks__list').renderMarkup(recipe))
      .join('');
  }
}

export const Bookmarks = new BookmarkView();
