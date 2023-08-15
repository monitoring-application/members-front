import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { AttachmentDlgComponent } from './attachment-dlg/attachment-dlg.component';
import { IAttachedModel } from 'src/app/shared/model/interface/i-attached-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
})
export class AttachmentsComponent implements OnInit {
  attachments!: IAttachedModel[];
  constructor(
    public router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private fileManagerService: FileManagerService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  add() {
    const dialogRef = this.dialog.open(AttachmentDlgComponent, {
      hasBackdrop: true,
      width: '40vw',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {}, 1000);
    });
    this.loadData();
  }

  loadData() {
    this.fileManagerService.findAll().subscribe((x) => {
      const retVal: any = x;
      const { data } = retVal;
      this.attachments = data;
    });
  }
  remove(id: number) {
    this.fileManagerService.remove(id).subscribe((x) => {
      this.loadData();
      this.router.navigateByUrl('/attachments');
    });
  }
}
