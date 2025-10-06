import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import { Footer } from "./footer/footer";
import { Team } from "./team/team";
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Team],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})


export class App {
  protected readonly title = signal('Project_website');
}
