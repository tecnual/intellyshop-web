import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, Inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '@app/core/auth/account.service';
import { EntityReference, User } from '@app/core/auth/user.model';
import { FinanceService } from '@app/modules/finance/finance.service';
import { FileType, ListFile } from '@app/modules/list/list.model';
import { ListService } from '@app/modules/list/list.service';
import { FilesizePipe } from '@app/shared/pipes/filesize.pipe';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [ SharedModule, FilesizePipe ],
  templateUrl: './add-invoice.component.html',
})
export class AddInvoiceComponent {
  user: User;
  invoiceForm: FormGroup;
  fileToUpload: ListFile = null;
  currentFile?: File;

  defaultSourceAccounts = [];
  filteredSourceOptions = [];

  defaultDestinationAccounts = [];
  filteredDestinationOptions = [];

  defaultCategories = [];
  filteredCategoryOptions = [];

  defaultBudgets = [];
  filteredBudgetsOptions = [];

  ffTags = [];
  filteredTagsOptions = [];

  private readonly accountService = inject(AccountService);
  private readonly financeService = inject(FinanceService);
  private readonly listService = inject(ListService);

  readonly tags = signal([]);

  readonly announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<AddInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.accountService.sessionValue.user;
    this.initForm();
    if (this.user.firefly) this.getFireflyData();

  }

  get currentTag() {
    if (this.invoiceForm.controls['currentTag']) return this.invoiceForm.controls['currentTag']!.value;
    else return '';
  }

  set currentTag(value: string) {
    if (this.invoiceForm.controls['currentTag']) this.invoiceForm.controls['currentTag'].setValue(value);
  }

  initForm() {
    const list = this.listService.listValue;
    this.tags.set(list.tags);
    this.invoiceForm = new FormGroup({
      sourceAccount: new FormControl(this.user.firefly?.defaultSourceAccount || ''),
      destinationAccount: new FormControl(this.user.firefly?.defaultDestinationAccount || ''),
      category: new FormControl(this.user.firefly?.defaultCategory || ''),
      budget: new FormControl(this.user.firefly?.defaultBudget || ''),
      tags: new FormControl(list.tags || '')
    });
  }

  /**
   * File upload on click
   *
   * @return response()
   */
  async onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      if (file) {
        this.currentFile = file;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.fileToUpload = {
            file: e.target.result,
            type: FileType.TICKET,
            mimeType: file.type,
            date: new Date(),
            name: file.name,
            size: file.size
          };
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  /**
   * The `save` function asynchronously adds a file to a list, updates the list's files, retrieves user
   * lists, and closes a dialog window.
   */
  async save() {
    this.invoiceForm.value.tags = this.tags();
    await this.listService.addFileToList(this.data.list._id , this.fileToUpload, this.invoiceForm.value).subscribe({
      next: (res) => {
        this.data.files = res.data.files;
        this.listService.getUserLists(this.data.list._id);
        this.dialogRef.close(res);
      },
      error: (e) => console.error('Error en consola: ', e)
    });
  }

  getFireflyData() {
    this.financeService.getFireflyAccounts().subscribe({
      next: (accounts) => {
        for (const account of accounts) {
          if (account.type === 'Asset account') {
            this.defaultSourceAccounts.push({ id: account.id, name: account.name, nameWithBalance: account.name_with_balance });
          }
          if (account.type === 'Expense account') {
            this.defaultDestinationAccounts.push({ id: account.id, name: account.name, nameWithBalance: account.name_with_balance });
          }
        }
      }
    });
    this.financeService.getFireflyCategories().subscribe({
      next: (categories) => {
        this.defaultCategories = categories;
      }
    });

    this.financeService.getFireflyBudgets().subscribe({
      next: (budgets) => {
        this.defaultBudgets = budgets;
      }
    });
    this.financeService.getFireflyTags().subscribe({
      next: (tags) => {
        this.ffTags = tags;
      }
    });
  }

  filterSourceOptions(filter): void {
    const filterValue = filter?.toLowerCase();
    this.filteredSourceOptions = this.defaultSourceAccounts.filter(o => o.name.toLowerCase().includes(filterValue));
  }

  filterDestinationOptions(filter): void {
    const filterValue = filter?.toLowerCase();
    this.filteredDestinationOptions = this.defaultDestinationAccounts.filter(o => o.name.toLowerCase().includes(filterValue));
  }

  filterCategoryOptions(filter): void {
    const filterValue = filter?.toLowerCase();
    this.filteredCategoryOptions = this.defaultCategories.filter(o => o.name.toLowerCase().includes(filterValue));
  }

  filterBudgetsOptions(filter): void {
    const filterValue = filter?.toLowerCase();
    this.filteredBudgetsOptions = this.defaultBudgets.filter(o => o.name.toLowerCase().includes(filterValue));
  }

  displayFn(entity: EntityReference): string {
    return entity.id && entity ? entity.name : '';
  }

  removeTag(tag: string) {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`removed ${tag}`);
      return [...tags];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.tags.update(tags => [...tags, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  addTag(value: string, input: HTMLInputElement): void {
    // Add our keyword
    if (value) {
      this.tags.update(tags => [...tags, value]);
    }

    // Clear the input value
    input.value = '';
  }

  filterTagsOptions(filter): void {
    const filterValue = filter?.toLowerCase();
    this.filteredTagsOptions = this.ffTags.filter(o => o.name.toLowerCase().includes(filterValue));
  }
}
