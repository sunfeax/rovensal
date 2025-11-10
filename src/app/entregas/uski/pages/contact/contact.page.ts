import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { exhaustMap, filter, finalize, Subject } from 'rxjs';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css',
  standalone: true,
})
export class UskiContactPage {
  constructor(private formService: FormService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      interest: [null, Validators.required],
      phone: [null, Validators.required],
      message: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  form: FormGroup;
  submit$ = new Subject<void>();
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit() {
    this.submit$
      .pipe(
        // continue only if form is valid
        filter(() => {
          const isValid = this.form.valid;
          if (!isValid) {
            console.warn('[ContactPage] Form is invalid');
          }
          return isValid;
        }),

        // ignore repeated clicks while request is running
        exhaustMap(() => {
          this.loading = true;
          this.errorMessage = null;

          console.log('[ContactPage] Sending form...', this.form.value);

          // send data to (fake) server
          return this.formService.sendForm(this.form.value).pipe(
            // finalize runs on both success and error
            finalize(() => {
              this.loading = false;
              console.log('[ContactPage] Request finished');
            })
          );
        })
      )
      .subscribe({
        next: (res) => {
          console.log('[ContactPage] Form sent successfully', res);
          // reset form on success
          this.form.reset();
          this.successMessage = 'Form submitted successfully!';
          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error: (err) => {
          console.error('[ContactPage] Error while sending form:', err);
          this.errorMessage = err?.message || 'Unknown error';
        },
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      // mark all controls as touched to show errors
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      console.warn('[ContactPage] Submit clicked but form is invalid');
    }

    // trigger the submit stream
    this.submit$.next();
  }
}
