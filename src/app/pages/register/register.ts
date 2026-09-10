import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../model/user.model';
@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit, OnDestroy {
  // ---- Formulario ----
  name = '';
  lastname = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  // ---- Errores ----
  nameError = '';
  lastnameError = '';
  phoneError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  // ---- Shake ----
  shake = false;

  // ---- Mensaje de resultado de registro -----
  registerError = '';

  // ---- Constructor - Inyeccion de dependencias delUserservice
  constructor(private userService: UserService) {}

  // --- Metodos privados ---
  private isValidName(name: string): boolean {
    return name.trim().length > 0;
  }

  private isValidLastname(lastname: string): boolean {
    return lastname.trim().length > 0;
  }

  private isValidPhone(phone: string): boolean {
    const pattern = /^\d{3}-\d{3}-\d{4}$/;
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

  onSubmit() {
    console.log('onSubmit ejecutado');
    this.nameError = '';
    this.lastnameError = '';
    this.phoneError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    let hasError = false;

    if (!this.isValidName(this.name)) {
      this.nameError = 'El nombre es obligatorio.';
      hasError = true;
    }

    if (!this.isValidLastname(this.lastname)) {
      this.lastnameError = 'El apellido es obligatorio.';
      hasError = true;
    }

    if (!this.isValidPhone(this.phone)) {
      this.phoneError = 'El teléfono debe tener el formato 300-000-0000.';
      hasError = true;
    }

    if (!this.isValidEmail(this.email)) {
      this.emailError = 'El correo no tiene un formato válido.';
      hasError = true;
    }

    if (!this.isValidPassword(this.password)) {
      this.passwordError =
        'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
      hasError = true;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden.';
      hasError = true;
    }

    if (hasError) {
      console.log('Validación falló:', {
        nameError: this.nameError,
        lastnameError: this.lastnameError,
        phoneError: this.phoneError,
        emailError: this.emailError,
        passwordError: this.passwordError,
        confirmPasswordError: this.confirmPasswordError,
      }); // 👈 temporal, para debug
      this.triggerShake();
      return;
    }

    //Validacion completa - Respuesta del API
    const newUser: User = {
      userName: this.name,
      lastName: this.lastname,
      email: this.email,
      phoneNumber: this.phone,
      passwordHash: this.password, // ver nota arriba sobre hashing real
      userRole: 'client', // registro público siempre crea un cliente
    };

    //Llamar servidor: createUser() devuelve Observable - Hacemos suscribe
    this.userService.createUser(newUser).subscribe({
      next: (createdUser: User) => {
        //Se ejecuta cuando la API responde 201 Created
        console.log('Usuario creado: ', createdUser);
      },
      error: (err: HttpErrorResponse) => {
        //Responde si la API ejecuta error 404 0 400(email duplicado)
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
