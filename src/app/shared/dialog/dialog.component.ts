import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  length = new FormControl('', [Validators.minLength(6)]);
  destroy$: Subject<boolean> = new Subject<boolean>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngDoCheck(){
    this.length.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(model => this.data.password=model);
  }

}
