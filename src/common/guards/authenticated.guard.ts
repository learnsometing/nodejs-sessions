import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

/**
 * When used in conjunction with the @UseGuards() decorator, this guard
 * performs the 'authentication' step of the passport local strategy, by verifying
 * that a user has a valid session.
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
