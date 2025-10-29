import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { RequestService } from '../../services/request.service';
import { RequestCancelation } from '../../models/request';
import { AccommodationService } from '../../services/accommodation.service';
import { Accommodation } from '../../models/accommodation';

@Component({
  selector: 'app-host-request-reservation',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './host-request-reservation.component.html',
  styleUrl: './host-request-reservation.component.css',
})
export class HostRequestReservationComponent implements OnInit {
  readonly #requestService = inject(RequestService);
  readonly #accommodationService = inject(AccommodationService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  tableType: 'requests' | 'reservations' = 'requests';

  columnHeaders: { [key: string]: string } = {};
  rows: any[] = [];
  actions: { name: string; label: string; color?: string }[] = [];

  selectedAccommodation!: Accommodation;
  autoApproveRequests = false;

  get columns() {
    return Object.keys(this.columnHeaders);
  }

  get displayedColumns() {
    return this.tableType === 'requests' ? [...this.columns, 'actions'] : [...this.columns];
  }

  ngOnInit(): void {
    const state = history.state;
    this.selectedAccommodation = state?.['selected'];
    console.log(this.selectedAccommodation);

    this.autoApproveRequests = this.selectedAccommodation.isAutoReservation ?? false;

    const type = this.route.snapshot.paramMap.get('type');
    this.tableType = type === 'reservations' ? 'reservations' : 'requests';

    if (this.tableType === 'requests') {
      this.columnHeaders = {
        user: 'User',
        startDate: 'Start Date',
        endDate: 'End Date',
        guestNum: 'Guests',
        previousCancellations: 'Cancellations',
      };
      this.actions = [
        { name: 'approve', label: 'Approve', color: 'primary' },
        { name: 'reject', label: 'Reject', color: 'warn' },
      ];
      this.#getRequests();
    } else {
      this.columnHeaders = {
        user: 'User',
        startDate: 'Start Date',
        endDate: 'End Date',
        guestNum: 'Guests',
      };
      this.actions = [];
      this.#getReservations();
    }
  }

  #getRequests(): void {
    this.#requestService.getAccommodationRequests(this.selectedAccommodation.id ?? '')
    .subscribe((data: RequestCancelation[]) => {
      this.rows = data;
    });
    // todo: Fetch user name 
  }

  #getReservations(): void {
     this.#requestService.getAccommodationReservations(this.selectedAccommodation.id ?? '')
    .subscribe((data: Request[]) => {
      this.rows = data;
    });
    // todo: Fetch user name 
  }

  protected onAction(action: string, row: any): void {
    let title = '';
    let message = '';

    if (action === 'approve') {
      title = 'Approve Confirmation';
      message = `Do you want to approve request for ${row.user}?`;
    } else if (action === 'reject') {
      title = 'Reject Confirmation';
      message = `Do you want to reject request for ${row.user}?`;
    }

    this.dialog
      .open(ConfirmModalComponent, {
        width: '400px',
        data: { title, message },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          if (action === 'approve') {
            this.#requestService.approveRequest(row.requestId).subscribe(() => {
              this.#getRequests();
            });
          } else if (action === 'reject') {
            this.#requestService.deleteRequest(row.requestId).subscribe(() => {
              this.#getRequests();
            });
          }
        }
      });
  }

  protected onAutoApproveChange(checked: boolean): void {
    this.#accommodationService.toggleAutoReservation(this.selectedAccommodation.id ?? '')
    .subscribe(() => {});
  }
}
