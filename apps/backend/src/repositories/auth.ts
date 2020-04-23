import _ from "lodash";
import UserRepository from "./user";
import UsernameRepository from "./username";

import { defaults } from "../constants";
import { ManagerRepository } from "./base";
import { AuthError } from "../errors";
import { Name, User, Username, Strategy } from "../models";

export default class AuthRepository extends ManagerRepository {
  private static instance: AuthRepository;

  public static getInstance(): AuthRepository {
    return AuthRepository.instance || (AuthRepository.instance = new AuthRepository());
  }

  public async googleCallback(accessToken: any, refreshToken: any, profile: any, done: Function): Promise<void> {
    try {
      if (
        _.isNil(profile) ||
        !_.get(profile, "_json") ||
        !_.get(profile, "_json.sub") ||
        !_.get(profile, "_json.email") ||
        !_.get(profile, "_json.name")
      )
        throw new AuthError.MissingPayload("Google Strategy");

      const { _json } = profile;
      const { given_name: firstName, family_name: lastName, email, sub: googleId } = _json;

      if (await UserRepository.getInstance().isAlreadyRegistered({ googleId }, Strategy.Google)) {
        done(null, await UserRepository.getInstance().getByGoogleId(googleId));
      }

      const name: Name = {
        first: firstName,
        last: lastName,
      };

      const user: User = await UserRepository.getInstance().create({
        name,
        email,
        description: defaults.description,
        googleId,
      });

      const value = (await UsernameRepository.getInstance().generateFromName(name)) || defaults.username;

      const username: Username = await UsernameRepository.getInstance().create({
        isPrimary: true,
        user,
        value,
      });

      user.usernames?.push(username);
      console.log(user);
      done(null, user);
    } catch (e) {
      console.error(e);
      done(e, null);
    }
  }
}
