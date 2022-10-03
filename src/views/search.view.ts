import MainView from './main.view';
import { Recipe } from '../types';
import { PreviewView as Preview } from '../views';

class SearchView extends MainView {
  protected data: Recipe[] = [];
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

  protected renderMarkup() {
    return this.data
      .map((recipe) => new Preview('.search-results ul').renderMarkup(recipe))
      .join('');
  }
}

export const Search = new SearchView();
