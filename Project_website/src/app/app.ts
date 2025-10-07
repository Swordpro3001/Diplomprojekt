import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import { Footer } from "./footer/footer";
import { Team } from "./team/team";
import { SwiperContainer } from 'swiper/element';
import { About } from "./about/about";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Team, About],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})


export class App implements OnInit {
  protected readonly title = signal('Project_website');

  ngOnInit() {
    // Initialize Swiper after view is loaded
    setTimeout(() => {
      const swiperEl = document.querySelector('.mySwiper') as SwiperContainer;
      if (swiperEl) {
        const swiperParams = {
          loop: true,
          speed: 800,
          effect: 'slide',
          grabCursor: true,
          pagination: {
            clickable: true,
            dynamicBullets: true,
          },
          // Autoplay for smooth infinite loop
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        };
        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
      }
    }, 100);
  }
}
