import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy {

  // ---- Formulario ----
  email = '';
  password = '';

  // ---- Errores ----
  emailError = '';
  passwordError = '';
  loginError = '';

  // ---- Shake ----
  shake = false;

  //OJO DE CONTRASEÑA OPEN/CLOSE
  togglePassword(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    const icon = input.nextElementSibling as HTMLElement;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
  }

  private isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  private triggerShake() {
    this.shake = true;
    setTimeout(() => (this.shake = false), 500);
  }

  onSubmit() {
    this.emailError = '';
    this.passwordError = '';
    this.loginError = '';

    let hasError = false;

    if (!this.email.trim()) {
      this.emailError = 'Ingresa tu correo electrónico.';
      hasError = true;
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'El correo no tiene un formato válido.';
      hasError = true;
    }

    if (!this.password.trim()) {
      this.passwordError = 'Ingresa tu contraseña.';
      hasError = true;
    }

    if (hasError) {
      this.triggerShake();
      return;
    }

    // ---- Conexión real al backend cuando esté lista ----
    const credencialesValidas = false;

    if (!credencialesValidas) {
      this.loginError = 'Correo o contraseña incorrectos.';
      this.triggerShake();
      return;
    }

    // this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    const icon = document.querySelector('.icon-login') as HTMLElement;
    if (icon) icon.style.display = 'none';
  }

  ngOnDestroy() {
    const icon = document.querySelector('.icon-login') as HTMLElement;
    if (icon) icon.style.display = 'flex';
  }
}