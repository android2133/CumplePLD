import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clona la petición para añadir el nuevo header
  const authReq = req.clone({
    headers: req.headers.set('ies-api-key', 'bH5MrfYEO4ZJvI47bZ2Bg413GJ4AoSRjnHM6TX1VL0I')
  });

  // Pasa la petición clonada en lugar de la original
  return next(authReq);
};