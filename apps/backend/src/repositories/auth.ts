import _ from "lodash";

import gates, { policy } from "../gates";
import UserRepository from "./user";
import TokenRepository from "./token";
import { google } from "../vendors";
import { ManagerRepository } from "./base";
import { AuthError } from "../errors";
import { User, Vendor } from "../models";
import { UsernameRepository } from ".";

export default class AuthRepository extends ManagerRepository {
  private static instance: AuthRepository;

  public static getInstance(): AuthRepository {
    return AuthRepository.instance || (AuthRepository.instance = new AuthRepository());
  }

  public async google(body: any): Promise<string> {
    if (_.isNil(body) || !_.get(body, "identity")) throw new AuthError.MissingParams("Google Auth Token");

    const ticket = await google.getTicket(body.identity);

    if (_.isNil(ticket)) throw new AuthError.MissingVendorResponse("Google Ticket");

    const payload = ticket.getPayload();

    if (_.isNil(payload)) throw new AuthError.MissingVendorResponse("Google Payload");

    let user: User;

    const googleData = {
      googleId: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
      email: payload.email,
    };

    if (!(await UserRepository.getInstance().isAlreadyRegistered(googleData, Vendor.GOOGLE))) {
      user = (await UserRepository.getInstance().createFromGoogle(googleData)) as User;
    } else user = (await UserRepository.getInstance().getByGoogleId(googleData.googleId)) as User;

    const safe = await TokenRepository.getInstance().generateToken(user);

    return safe;
  }

  public async register(body: any): Promise<string> {
    if (_.isNil(body)) throw new AuthError.MissingParams("All");
    if (_.get(body, "firstName")) throw new AuthError.MissingParams("First Name");
    if (_.get(body, "lastName")) throw new AuthError.MissingParams("Last Name");
    if (_.get(body, "email")) throw new AuthError.MissingParams("Email");
    if (_.get(body, "password")) throw new AuthError.MissingParams("Password");
    if (_.get(body, "username")) throw new AuthError.MissingParams("Username");

    if (!gates.isNameAcceptable(body.firstName)) throw new AuthError.WrongRegistrationParams(policy.name);
    if (!gates.isNameAcceptable(body.lastName)) throw new AuthError.WrongRegistrationParams(policy.name);
    if (!gates.isUsernameAcceptable(body.username)) throw new AuthError.WrongRegistrationParams(policy.username);
    if (!gates.isEmailAcceptable(body.email)) throw new AuthError.WrongRegistrationParams(policy.email);
    if (!gates.isPasswordAcceptable(body.password)) throw new AuthError.WrongRegistrationParams(policy.password);

    const isAlreadyRegistered: boolean = await UserRepository.getInstance().isAlreadyRegistered(body, Vendor.CLASSIC);
    if (isAlreadyRegistered) throw new AuthError.CredentialsNotUnique(`${body.email} is already linked to an account`);

    const isUsernameTaken: boolean = (await UsernameRepository.getInstance().getByValue(body.username)) !== null;
    if (isUsernameTaken) throw new AuthError.CredentialsNotUnique(`${body.username} is already used by someone.`);

    return "GG";
  }

  public async login(body: any): Promise<string> {
    return "";
  }
}
