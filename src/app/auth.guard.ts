import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isUserLoggedIn())
    return true;
  else {
    router.navigate(['']);
    return false;
  }
};
