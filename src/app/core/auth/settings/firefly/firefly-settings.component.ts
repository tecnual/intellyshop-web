import { Component, inject, OnInit, signal } from '@angular/core';
import { EntityReference, User } from '../../user.model';
import { AccountService } from '../../account.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserMapper } from '../../infrastructure/user.rest.mapper';
import { TranslateService } from '@ngx-translate/core';
import { FinanceService } from '@app/modules/finance/finance.service';

@Component({
  selector: 'app-firefly-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, SharedModule],
  templateUrl: './firefly-settings.component.html'
})
export class FireflySettingsComponent {
  user: User;
  fireflyForm: FormGroup;
  private snackBar = inject(MatSnackBar);

  defaultSourceAccounts = [];
  filteredSourceOptions = [];

  defaultDestinationAccounts = [];
  filteredDestinationOptions = [];

  defaultCategories = [];
  filteredCategoryOptions = [];

  defaultBudgets = [];
  filteredBudgetsOptions = [];

  constructor(
    private readonly accountService: AccountService,
    private readonly financeService: FinanceService,
  ) {
    this.user = this.accountService.sessionValue.user;
    this.initForm();
    if (this.user.firefly) this.getFireflyData();
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
  }

  initForm() {
    this.fireflyForm = new FormGroup({
      token: new FormControl(this.user.firefly?.token || ''),
      defaultSourceAccount: new FormControl(this.user.firefly?.defaultSourceAccount || ''),
      defaultDestinationAccount: new FormControl(this.user.firefly?.defaultDestinationAccount || ''),
      defaultCategory: new FormControl(this.user.firefly?.defaultCategory || ''),
      defaultBudget: new FormControl(this.user.firefly?.defaultBudget || ''),
    });
  }

  onSubmit() {
    const userRequest = new UserMapper().updateUserFormToRequest(null, this.fireflyForm.value);
    if (this.fireflyForm.valid) {
      this.accountService.update(this.user._id, userRequest).subscribe({
        next: (data) => {
          this.user = this.accountService.sessionValue.user;
          this.getFireflyData();
          this.showSnackBar('Tus datos se han actualizado correctamente', 'Cerrar', 4000);
        },
        error: (e) => {
          this.showSnackBar('Se ha producido un error y tus datos no se han podido actualizar.', 'Cerrar', 4000);
        }
      })
    }
  }

  showSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, { duration });
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

  clean() {
    this.initForm();
  }

  displayFn(entity: EntityReference): string {
    return entity.id && entity ? entity.name : '';
  }
}
