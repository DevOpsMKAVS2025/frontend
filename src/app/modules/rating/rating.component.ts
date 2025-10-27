import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewRatingDto } from '../../models/rating';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit {

  accommodations: any[] = [];
  hosts: any[] = [];
  guestId: string = "";
  canRateAccommodationsIds: string[] = [];
  canRateHostIds: string[] = [];
  hasAccommodationRating: boolean = false;
  hasHostRating: boolean = false;

  constructor(private ratingService: RatingService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadRatings();
    this.userService.loadUser();
    this.guestId = this.userService.user.value?.id || "";
    this.loadCanRate();
  }

  hasMyRating(ratings: any[]): boolean {
    return ratings.some(r => r.guestId === this.guestId);
  }

  loadRatings(): void {
    this.ratingService.getRatings().subscribe({
      next: (data) => {
        this.accommodations = data["accommodations"];
        this.hosts = data["hosts"];
        console.log(this.accommodations)
        console.log(this.hosts)
      },
      error: (err) => console.error('Error loading ratings:', err)
    });
  }

  loadCanRate(): void {
    console.log(this.guestId)
    this.ratingService.getCanRate(this.guestId).subscribe({
      next: (data) => {
        this.canRateAccommodationsIds = data["accommodations"];
        this.canRateHostIds = data["hosts"];
        console.log(this.canRateAccommodationsIds)
        console.log(this.canRateHostIds)
      },
      error: (err) => console.error('Error checking canRate:', err)
    });
  }

  addRating(val: any, type: string) {
    console.log('Adding rating:', val);
    let dto: NewRatingDto = {
      id: '',
      type: type,
      accommodationId: '',
      hostId: '',
      guestId: this.guestId,
      evaluation: val.newRatingValue
    }

    if (type == "accommodation") {
      dto.accommodationId = val.accommodationId;
    } else if (type == "host") {
      dto.hostId = val.hostId;
    }
    
    this.ratingService.addRating(dto).subscribe({
      next: (data) => { console.log("added rating") },
      error: (err) => { console.log(err) }
    })
  }

  updateRating(rating: any) {
    console.log('Updating rating:', rating);
    this.ratingService.updateRating(rating.id, rating.evaluation).subscribe({
      next: (data) => { console.log("updated rating") },
      error: (err) => { console.log(err) }
    })
  }

  deleteRating(ratingId: string) {
    console.log('Deleting rating with id:', ratingId);
    this.ratingService.deleteRating(ratingId).subscribe({
      next: (data) => { console.log("deleted rating") },
      error: (err) => { console.log(err) }
    })
  }

}
