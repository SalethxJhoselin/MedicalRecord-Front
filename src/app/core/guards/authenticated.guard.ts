import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Users/auth.service';
import { inject } from '@angular/core';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    const router = inject(Router);
    if(!authService.isAuthenticated()){
      return true;
    }else{
      return router.navigate(['/dashboard']);
    }
};
