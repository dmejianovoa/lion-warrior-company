import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
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

  // Inyeccion de dependencias: servicio de usuarios, navegacion y refresco de vista
  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

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

    // ---- Conexión real al backend con API ----
    const credentials: LoginRequest = {
      email: this.email.trim(),
      password: this.password,
    };

    this.userService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        // 401: credenciales incorrectas / 400: datos faltantes / otros: servidor
        this.loginError =
          err.status === 401 || err.status === 400
            ? 'Correo o contraseña incorrecta'
            : 'No se puede conectar con el servidor. Intentalo de nuevo.';
        this.cdr.detectChanges();
        this.triggerShake();
      },
    });
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
