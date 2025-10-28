import { Component, OnInit, ViewChild } from '@angular/core';
import { Accommodation, ConvenieceType } from '../../../models/accommodation';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccommodationDialogComponent } from '../dialogs/create-accommodation-dialog/create-accommodation-dialog.component';
import { Router } from '@angular/router';
import { AccommodationService } from '../../../services/accommodation-service';
import { take } from 'rxjs';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-host-accommodation',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './host-accommodation.component.html',
  styleUrl: './host-accommodation.component.css'
})
export class HostAccommodationComponent implements OnInit {
  accommodations: Accommodation[] = [];
  displayedColumns: string[] = ['name', 'location', 'guests', 'conveniences', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private router: Router, private service: AccommodationService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.service.getPaged().subscribe({
      next: (data) => {
        this.accommodations = data.results;
        this.dataSource = new MatTableDataSource(this.accommodations);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching accommodations:', err);
      }
    });
  }

  addAccommodation() {
    const dialogRef = this.dialog.open(CreateAccommodationDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(newAccommodationData => {
      if (newAccommodationData) {
        // TODO: ADD OWNER ID
        const acc = this.mapToAccommodation(newAccommodationData)
        this.service.create(acc)
          .pipe(take(1))
          .subscribe({
            next: (createdAccommodation: Accommodation) => {
              for (let i = 0; i < newAccommodationData.photos.length; i++) {
                let fileName = createdAccommodation.id + "/" + newAccommodationData.photos[i].name;
                console.log(newAccommodationData.photos[i].name);
                this.imageService.uploadImage(fileName, newAccommodationData.photos[i].data).subscribe({
                  next: (response) => {
                    console.log(response);
                  },
                  error: (error) => {
                    console.error('Saving picture error!', error);
                  }
                });
              }
              this.accommodations.push(createdAccommodation);
              this.accommodations = [...this.accommodations];
              this.dataSource.data = this.accommodations;
            },
            error: (err) => {
              console.error('Error while adding accommodation:', err);
            }
          });
      }
    });
  }

  deleteAccommodation(a: Accommodation) {
    this.service.delete(a.id!)
      .pipe(take(1))
      .subscribe({
        next: (createdAccommodation: Accommodation) => {
          this.accommodations = this.accommodations.filter(acc => acc.id !== a.id);
          this.accommodations = [...this.accommodations];
          this.dataSource.data = this.accommodations;
        },
        error: (err) => {
          console.error('Error while deleting accommodation:', err);
        }
      });
  }

  showConveniences(acc: Accommodation): string {
    if (!acc.conveniences || acc.conveniences.length === 0) return '-';
    return acc.conveniences.map(c => this.ConvenieceTypeMap[c]).join(', ');
  }

  openAccommodationDetails(accommodation: any) {
    this.router.navigate(['/accommodation-details', accommodation.id]);
  }

  ConvenieceTypeMap: { [key: number]: string } = {
    [ConvenieceType.WIFI]: 'Wi-Fi',
    [ConvenieceType.KITCHEN]: 'Kitchen',
    [ConvenieceType.AIR_CONDITION]: 'Air Condition',
    [ConvenieceType.FREE_PARKING]: 'Free Parking'
  };

  mapToAccommodation(formValue: any): Accommodation {
    return {
      id: undefined,
      name: formValue.name,
      location: formValue.location,
      conveniences: formValue.conveniences,
      photos: formValue.photos.map((p: { name: string; data: string }) => p.name),
      minGuestNumber: formValue.minGuestNumber,
      maxGuestNumber: formValue.maxGuestNumber,
      availability: formValue.availability || [],
      prices: formValue.prices || [],
      priceType: formValue.priceType || 0,
      globalPrice: formValue.globalPrice,
      isAutoReservation: formValue.isAutoReservation ?? false,
      ownerId: formValue.ownerId
    };
  }
}
