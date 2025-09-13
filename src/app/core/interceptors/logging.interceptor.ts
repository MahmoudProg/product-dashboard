import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    console.log(`➡️ Request [${req.method}] ${req.urlWithParams}`);

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          // ممكن نعمل log للـ response هنا
        }
      }),
      catchError((error) => {
        console.error(`❌ Error:`, error);

        this.snackBar.open(
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
  }
}
