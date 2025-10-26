import { Component, OnInit, ViewChild } from '@angular/core';
import { Accommodation, ConvenieceType } from '../../../models/accommodation';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccommodationDialogComponent } from '../dialogs/create-accommodation-dialog/create-accommodation-dialog.component';

@Component({
  selector: 'app-host-accommodation',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './host-accommodation.component.html',
  styleUrl: './host-accommodation.component.css'
})
export class HostAccommodationComponent implements OnInit{
  accommodations: Accommodation[] = [];
  displayedColumns: string[] = ['name', 'location', 'guests', 'conveniences', 'actions'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.accommodations = [  // TODO: call here service and then backend
      {
        id: '1',
        name: 'Seaside Apartment',
        location: 'Budva',
        minGuestNumber: 1,
        maxGuestNumber: 4,
        conveniences: [ConvenieceType.AIR_CONDITION, ConvenieceType.KITCHEN, ConvenieceType.WIFI],
        prices: [],
        availability: [],
        globalPrice: 600,
        photos: [''],
      },
      {
        id: '2',
        name: 'Mountain Cabin',
        location: 'Kopaonik',
        minGuestNumber: 2,
        maxGuestNumber: 6,
        conveniences: [ConvenieceType.WIFI, ConvenieceType.FREE_PARKING],
        prices: [],
        availability: [],
        globalPrice: 400,
        photos: [''],
      }
    ];
    this.dataSource = new MatTableDataSource(this.accommodations);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addAccommodation() {
     const dialogRef = this.dialog.open(CreateAccommodationDialogComponent, {
    width: '600px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('New Accommodation:', result);
      this.accommodations.push(result);
      this.dataSource.data = this.accommodations;
    }
  });
  }

  deleteAccommodation(a: Accommodation) {
    this.accommodations = this.accommodations.filter(x => x.id !== a.id);  // TODO: call service
  }

  addAvailability(a: Accommodation) {
    // Open dialog to select start/end date
  }

  changePrice(a: Accommodation) {
    // Open dialog to change price
  }

  showConveniences(a: Accommodation) {
    return a.conveniences.join(', ');
  }
}
