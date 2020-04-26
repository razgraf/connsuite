import _ from "lodash";
import { google } from "../vendors";
import { ManagerRepository } from "./base";
import { AuthError } from "../errors";

export default class AuthRepository extends ManagerRepository {
  private static instance: AuthRepository;

  public static getInstance(): AuthRepository {
    return AuthRepository.instance || (AuthRepository.instance = new AuthRepository());
  }

  public async google(body: any): Promise<void> {
    if (_.isNil(body) || !_.get(body, "token")) throw new AuthError.MissingPayload("Google Auth Token");

    const ticket = await google.getTicket(body.token);
    const payload = ticket.getPayload();
    console.log(payload);

    // if (await UserRepository.getInstance().isAlreadyRegistered({ googleId }, Strategy.Google)) {
    //   done(null, await UserRepository.getInstance().getByGoogleId(googleId));
    // }
  }
}
