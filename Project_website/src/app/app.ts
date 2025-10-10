import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import { Footer } from "./footer/footer";
import { Team } from "./team/team";
import { Carousel } from './carousel/carousel';
import { About } from "./about/about";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Team, About, Carousel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})


export class App implements OnInit {
  protected readonly title = signal('Project_website');

  ngOnInit() {
    // no-op: carousel component handles its own autoplay
  }
}
