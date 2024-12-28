import { Component, Inject, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from '../../list.model';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html'
})
export class ListEditComponent implements OnInit {
  loading = false;
  submitted = false;
  isAddMode: boolean;
  form: FormGroup;
  list: List;
  preview = '';
  currentFile?: File;
  incomeChecked: boolean = false;

  tags: string[] = [];
  addOnBlur = true;
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private listService: ListService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ListEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.list = data.list || {};
    this.isAddMode = data.isAddMode;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tags: [''],
      income:[false],
      file: [''],
      fileSource: ['']
    });

    if (this.list._id) {
      this.f.name.setValue(this.list.name);
      this.f.description.setValue(this.list.description);
      this.f.income.setValue(this.list.income);
      this.tags = this.list.tags;
      this.preview = this.list.cards[0]?.file;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  public onSubmit() {
    this.list.name = this.f.name.value;
    this.list.description = this.f.description.value;
    this.list.income = this.f.income.value;
    this.list.cards = [{file: this.f.fileSource.value}];

    if (this.tags.length > 0) this.list.tags = this.tags;
    this.listService.saveList(this.list).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  public close() {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput.inputElement;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
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
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
          this.form.patchValue({
            fileSource: e.target.result
          });
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  readFileContent(file: File): Promise<string> { // TODO: borrar este método
    return new Promise<string>((resolve, reject) => {
        if (!file) {
            resolve('');
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = reader.result.toString();
            resolve(text);

        };

        reader.readAsText(file);
    });
  }
}
