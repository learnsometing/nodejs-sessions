import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * This class is invoked by passport after user validation (authentication) occurs.
 *
 * It serializes the return value of the 'validate' function called by passport
 * to the session and deserializes the session automatically on every request where
 * session credentials are present.
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
