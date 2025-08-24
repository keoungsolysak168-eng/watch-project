// import { Component } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-contact-us',
//   imports: [RouterLink],
//   templateUrl: './contact-us.component.html',
//   styleUrl: './contact-us.component.css'
// })
// export class ContactUsComponent {

// }

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent { }