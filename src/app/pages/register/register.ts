import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
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
    } else if (digits.length < 3) {
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

    const newUser: User = {
      userName: this.name,
      lastName: this.lastname,
      email: this.email,
      phoneNumber: this.phone,
      passwordHash: this.password,
      userRole: 'client',
    };

    this.userService.createUser(newUser).subscribe({
      next: (createdUser: User) => {
        console.log('Usuario creado: ', createdUser);
        this.registerSuccess = '¡Usuario registrado con éxito! Ya puedes iniciar sesión.';

        //Limpia formulario despues de completado
        this.name = '';
        this.lastname = '';
        this.phone = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error al registrar', err);
        this.registerError =
          err.error?.message || 'No se pudo completar el registro. Intentelo de nuevo';
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
