import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    console.log(` Request [${req.method}] ${req.urlWithParams}`);

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log(' Response body:', event.body);
          }
        }
      }),
      catchError((error) => {
        console.error(`Error:`, error);

        const message = this.getErrorMessage(error);

        this.snackBar.open(message, 'Close', {
          duration: 4000,
        });

        return throwError(() => error);
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        console.log(` Response for [${req.method}] ${req.urlWithParams} in ${elapsed} ms`);
      })
    );
  }


  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Network error: Please check your internet connection.';
    }
    if (error.status >= 500) {
      return 'Server error: Please try again later.';
    }
    if (error.error?.message) {
      return error.error.message;
    }
    return 'Something went wrong!';
  }

}
