import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, switchMap } from 'rxjs';
import { Form } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  // fake API call
  sendForm(data: Form): Observable<{ ok: boolean; data?: Form }> {
    console.log('[FormService] Sending form (fake request)...', data);

    // 30% chance para cometer un error para simular fallos
    const shouldFail = Math.random() < 0.3;

    return of(null).pipe(
      // imitate network latency
      delay(800),
      switchMap(() => {
        if (shouldFail) {
          console.error('[FormService] Fake API error: service unavailable');
          return throwError(() => new Error('Fake API error: service unavailable'));
        }

        const response = {
          ok: true,
          data: {
            ...data,
          },
        };

        console.log('[FormService] Fake API success:', response);
        return of(response);
      })
    );
  }
}
