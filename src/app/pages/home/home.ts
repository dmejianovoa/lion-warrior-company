import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  currentSlide = 0;
  currentService = 0;
  serviceInterval: any;
  totalSlides = 4;
  interval: any;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateSlider();
    }, 3000);

    this.serviceInterval = setInterval(() => {
      this.currentService = (this.currentService + 1) % 4;
      const slides = document.querySelectorAll('.service-slide');
      slides.forEach((s, i) => s.classList.toggle('active', i === this.currentService));
    }, 2500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.serviceInterval);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateSlider();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateSlider();
    }, 3000);
  }

  updateSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    slides.forEach((s, i) => s.classList.toggle('active', i === this.currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === this.currentSlide));
  }

  showServiceSlide(index: number) {
    clearInterval(this.serviceInterval);
    const slides = document.querySelectorAll('.service-slide');
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
  }

  hideServiceSlide() {
    this.serviceInterval = setInterval(() => {
      this.currentService = (this.currentService + 1) % 4;
      const slides = document.querySelectorAll('.service-slide');
      slides.forEach((s, i) => s.classList.toggle('active', i === this.currentService));
    }, 3000);
  }


  scrollToBarbers() {
  document.getElementById('barbers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}
