import { inject, Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LangChangeEvent, TranslateParser, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  page = 'Página';
  of = 'de';
  firstPageLabel = `Primera página`;
  itemsPerPageLabel = `Elementos por página:`;
  lastPageLabel = `Última página`;

  nextPageLabel = 'Página siguiente';
  previousPageLabel = 'Página previa';



  private rangeLabelIntl: string;

  constructor(private translateService: TranslateService, private translateParser: TranslateParser) {
    this.translateService.onLangChange.subscribe({
      next: (event: LangChangeEvent) => {
        const paginator = event.translations.paginator;
        this.itemsPerPageLabel = paginator.itemsPerPageLabel;
        this.firstPageLabel = paginator.firstPageLabel;
        this.lastPageLabel = paginator.lastPageLabel;
        this.nextPageLabel = paginator.nextPageLabel;
        this.previousPageLabel = paginator.previousPageLabel;
        this.page = paginator.page;
        this.of = paginator.of;

        this.changes.next();
      }
    });
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `${this.page} 1 ${this.of} 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `${this.page} ${page + 1} ${this.of} ${amountPages}`;
  }

}
