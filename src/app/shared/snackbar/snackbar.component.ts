import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  
  constructor(private snackBar:MatSnackBar) { 
  }

  ngOnInit(): void {
  }

  openSimpleMessageSnackbar(message: string) {
    this.snackBar.open(message,"", {
      duration: 3000,
      panelClass:['plainTextSnackBar'],
    });
  }
}
