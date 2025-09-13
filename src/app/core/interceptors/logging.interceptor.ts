import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const snackBar = inject(MatSnackBar);

  const started = Date.now();
  console.log(`➡️ Request [${req.method}] ${req.urlWithParams}`);

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        // ممكن نعمل log للـ response هنا لو عايزين
      },
    }),
    catchError((error) => {
      console.error(`❌ Error:`, error);

      // عرض رسالة خطأ بالـ Snackbar
      snackBar.open(
        error?.message || 'Something went wrong!',
        'Close',
        { duration: 4000 }
      );

      return throwError(() => error);
    }),
    finalize(() => {
      const elapsed = Date.now() - started;
      console.log(`✅ Response for [${req.method}] ${req.urlWithParams} in ${elapsed} ms`);
    })
  );
};
