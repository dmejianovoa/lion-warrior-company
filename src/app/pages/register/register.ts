import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse, RegisterRequest, User } from '../../model/user.model';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit, OnDestroy {
  name = '';
  lastname = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  nameError = '';
  lastnameError = '';
  phoneError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  shake = false;
  registerError = '';
  registerSuccess = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  private isValidName(name: string): boolean {
    return name.trim().length > 0;
  }
  private isValidLastname(lastname: string): boolean {
    return lastname.trim().length > 0;
  }
  private isValidPhone(phone: string): boolean {
    const pattern = /^\d{3} \d{3} \d{4}$/;
    return pattern.test(phone);
  }
  private isValidEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  private isValidPassword(password: string): boolean {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(password);
  }

  private triggerShake() {
    this.shake = true;
    setTimeout(() => (this.shake = false), 500);
  }

  validateName() {
    this.nameError = this.isValidName(this.name) ? '' : 'El nombre es obligatorio.';
  }
  validateLastname() {
    this.lastnameError = this.isValidLastname(this.lastname) ? '' : 'El apellido es obligatorio.';
  }

  onPhoneInput() {
    //Elimina digitos que no sean numeros
    let digits = this.phone.replace(/\D/g, '').slice(0, 10);

    //Reconstruye el texto insertado
    let formatted = digits;
    if (digits.length > 6) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    } else if (digits.length > 3) {
      formatted = `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }

    this.phone = formatted;
    this.validatePhone();
  }

  validatePhone() {
    this.phoneError = this.isValidPhone(this.phone)
      ? ''
      : 'El telefono debe tener el formato 300 000 0000.';
  }

  validateEmail() {
    this.emailError = this.isValidEmail(this.email) ? '' : 'El correo no tiene un formato válido.';
  }
  validatePassword() {
    this.passwordError = this.isValidPassword(this.password)
      ? ''
      : 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
    if (this.confirmPassword) {
      this.validateConfirmPassword();
    }
  }
  validateConfirmPassword() {
    this.confirmPasswordError =
      this.password === this.confirmPassword ? '' : 'Las contraseñas no coinciden.';
  }

  onSubmit() {
    // Limpia mensajes de intentos anteriores
    this.registerError = '';
    this.registerSuccess = '';

    this.validateName();
    this.validateLastname();
    this.validatePhone();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    const hasError =
      !!this.nameError ||
      !!this.lastnameError ||
      !!this.phoneError ||
      !!this.emailError ||
      !!this.passwordError ||
      !!this.confirmPasswordError;

    if (hasError) {
      this.triggerShake();
      return;
    }

    const newUser: RegisterRequest = {
      userName: this.name.trim(),
      lastName: this.lastname.trim(),
      email: this.email.trim(),
      phoneNumber: this.phone,
      password: this.password,
    };

    this.userService.register(newUser).subscribe({
      next: (res: AuthResponse) => {
        //Limpia formulario despues de completado|
        this.name = '';
        this.lastname = '';
        this.phone = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        this.cdr.detectChanges(); //forzar refresco de vista

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 8000);
      },
      error: (err: HttpErrorResponse) => {
        this.registerError = err.error?.message || '';
        this.cdr.detectChanges(); //forzar refresco de vista
        this.triggerShake();
      },
    });
  }

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

  ngOnInit() {
    const icon = document.querySelector('.icon-login') as HTMLElement;
    if (icon) icon.style.display = 'none';
  }

  ngOnDestroy() {
    const icon = document.querySelector('.icon-login') as HTMLElement;
    if (icon) icon.style.display = 'flex';
  }
}
