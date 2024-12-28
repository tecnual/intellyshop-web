import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileType, ListFile } from '@app/modules/list/list.model';
import { ListService } from '@app/modules/list/list.service';


@Component({
  selector: 'app-list-gallery',
  templateUrl: './list-gallery.component.html',
  styles: [
  ]
})
export class ListGalleryComponent {
  imgSrc:string;
  showLargeImage: boolean = false;
  currentFile?: File;
  fileSource?: string;
  fileToUpload: ListFile;

  constructor(
    private readonly listService: ListService,
    public dialogRef: MatDialogRef<ListGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onImageClick(event){
    this.showLargeImage = !this.showLargeImage;
    const imgElem = event.target;
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes.src;
    this.imgSrc = srcAttr.nodeValue;
  }

  toggleLargeImage(){
    this.showLargeImage = !this.showLargeImage;
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
            //console.log(e.target.result);
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

    async save() {
      await this.listService.addFileToList(this.data.listId ,this.fileToUpload, {}).subscribe({
        next: (res) => {
          this.data.files = res.data.files;
          this.listService.getUserLists(this.data.listId);
        },
        error: (e) => console.error('Error en consola: ', e),
        complete: () => console.info('complete')
      });
    }
}
