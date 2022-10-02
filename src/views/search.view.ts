import MainView from './main.view';
import { Recipe } from '../types';
import { Preview } from './previews.view';

class SearchView extends MainView {
  data: Recipe[] = [];

  private searchForm = document.querySelector('.search') as HTMLFormElement;
  private searchInput = this.searchForm.querySelector(
    '.search__input'
  ) as HTMLInputElement;

  constructor() {
    super('.search-results ul');
  }

  viewHandler(handler: (query: string) => Promise<void>) {
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler(this.searchInput.value);
      this.searchInput.value = '';
    });
  }

  renderMarkup() {
    const searchList = Preview.renderMarkup(this.data);
    return searchList;
  }
}

export const Search = new SearchView();
