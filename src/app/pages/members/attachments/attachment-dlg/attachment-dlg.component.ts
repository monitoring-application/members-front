import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ISocialMedia } from 'src/app/shared/model/interface/i-social-media-model';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-attachment-dlg',
  templateUrl: './attachment-dlg.component.html',
  styleUrls: ['./attachment-dlg.component.css'],
})
export class AttachmentDlgComponent implements OnInit {
  file!: any;
  avatar!: string;
  socialMedia!: string;
  pageName!: string;

  selectedItem!: ISocialMedia;

  constructor(
    private dialog: MatDialogRef<AttachmentDlgComponent>,
    private authService: AuthService,
    private fileManagerService: FileManagerService,
    private notificationService: NotificationService
  ) {}

  socialMedias: ISocialMedia[] = [
    {
      id: '1',
      code: 'Yt',
      name: 'Youtube',
      avatar: 'assets/Images/icons/Black/youtube-icon.png',
    },
    {
      id: '2',
      code: 'Fb',
      name: 'Facebook',
      avatar: 'assets/Images/icons/Black/facebook-icon.png',
    },
    {
      id: '3',
      code: 'Tok',
      name: 'Tiktok',
      avatar: 'assets/Images/icons/Black/tiktok-icon.png',
    },
    {
      id: '4',
      code: 'Ig',
      name: 'Instagram',
      avatar: 'assets/Images/icons/Black/instagram-icon.png',
    },
    {
      id: '5',
      code: 'Tw',
      name: 'Twitter',
      avatar: 'assets/Images/icons/Black/twitter-icon.png',
    },
    {
      id: '6',
      code: 'Li',
      name: 'Linkedin',
      avatar: 'assets/Images/icons/Black/linkedin-icon.png',
    },
  ];

  ngOnInit(): void {}

  selected(item: ISocialMedia) {
    this.selectedItem = item;
  }

  submit() {
    if (!this.validation()) return;

    const user_id = this.authService.getUserId() || '';
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('member_id', user_id);
    formData.append('avatar', this.selectedItem.avatar);
    formData.append('social_media', this.selectedItem.name);
    formData.append('page_name', this.pageName);

    this.fileManagerService.upload(formData).then(
      (res) => {
        console.log(res);
        if (!this.validation()) return;

        this.notificationService.showNotification(
          NotificationType.success,
          'Successfully Upload!',
          'Success'
        );
      },
      (rej) => {
        this.notificationService.showNotification(
          NotificationType.warning,
          rej,
          'Warning'
        );
      }
    );

    // this.fileManagerService.upload(formData);

    // this.fileManagerService.upload(formData).subscribe((x) => {
    //   this.notificationService.showNotification(
    //     NotificationType.success,
    //     'Successfully Upload!',
    //     'Success'
    //   );
    //   setTimeout(() => {
    //     this.dialog.close(true);
    //   }, 1500);
    // });
  }

  validation(): boolean {
    if (this.pageName == '' || !this.pageName) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Please supply the page/channel name!',
        'Warning'
      );
      return false;
    }
    if (!this.selectedItem) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Please supply the type of social media!',
        'Warning'
      );
      return false;
    }

    if (!this.file) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Please choose a file to upload!',
        'Warning'
      );
      return false;
    }

    return true;
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }

  close() {
    this.dialog.close(false);
  }
}
