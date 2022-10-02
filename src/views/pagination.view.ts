import icons from '../assets/icons.svg';
import MainView from './main.view';
import { state } from '../state';

class PaginationView extends MainView {
  constructor() {
    super('.pagination');
  }

  viewHandler(handler: (goToPageNum: number) => void) {
    this.parentContainer.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('button') == null) return;

      const targetBtn = (e.target as HTMLElement).closest(
        'button'
      ) as HTMLButtonElement;

      const goToPageNum = Number(targetBtn.dataset['pgnum']);

      handler(goToPageNum);
    });
  }

  renderMarkup() {
    const { curPgNum, numberOfPages } = state.search;
    let content = `<span class="pagination__pg-number">${curPgNum} / ${numberOfPages}</span> `;

    // only page
    if (numberOfPages === 1) return content;

    // first page
    if (curPgNum === 1 && numberOfPages > 1) {
      return (content = `
        <span class="pagination__pg-number">${curPgNum} / ${numberOfPages}</span> 
        ${this.renderPaginationBtn('next')}
      `);
    }
    // between pages
    if (curPgNum > 1 && numberOfPages > curPgNum) {
      return (content = `
      ${this.renderPaginationBtn('prev')} 
        <span class="pagination__pg-number">${curPgNum} / ${numberOfPages}</span> 
      ${this.renderPaginationBtn('next')}
      `);
    }
    // last page
    if (curPgNum === numberOfPages) {
      return (content = `
        ${this.renderPaginationBtn('prev')}
        <span class="pagination__pg-number">${curPgNum} / ${numberOfPages}</span> 
      `);
    }

    return content;
  }

  private renderPaginationBtn(type: 'next' | 'prev') {
    const { curPgNum } = state.search;
    return `
      <button 
        data-pgNum=${type === 'next' ? curPgNum + 1 : curPgNum - 1}
        class="btn--inline pagination__btn--${type}"
      >
        ${type === 'next' ? `<span>Page ${curPgNum + 1}</span>` : ''}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${type === 'next' ? 'right' : 'left'}">
          </use>
        </svg>
        ${type === 'prev' ? `<span>Page ${curPgNum - 1}</span>` : ''}
      </button>
    `;
  }
}

export const Pagination = new PaginationView();
