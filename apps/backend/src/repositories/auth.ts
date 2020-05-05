import _ from "lodash";

import gates, { policy } from "../gates";
import UserRepository from "./user";
import TokenRepository from "./token";
import { google } from "../vendors";
import { ManagerRepository } from "./base";
import { AuthError } from "../errors";
import { User, Vendor, Request, UsernameModel } from "../models";
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
    if (!_.get(payload, "googleId")) throw new AuthError.MissingVendorResponse("Google Id");
    if (!_.get(payload, "firstName")) throw new AuthError.MissingVendorResponse("Google First Name");
    if (!_.get(payload, "lastName")) throw new AuthError.MissingVendorResponse("Google Last Name");
    if (!_.get(payload, "email")) throw new AuthError.MissingVendorResponse("Google Email");

    let user: User;

    const googleData: Request.ConnectGoogle = {
      googleId: payload.sub,
      firstName: payload.given_name || "", // should never fall to "" because of the _.checks above
      lastName: payload.family_name || "",
      picture: payload.picture,
      email: payload.email || "",
      agent: body.agent,
    };

    if (!(await UserRepository.getInstance().isAlreadyRegistered(googleData, Vendor.GOOGLE))) {
      user = (await UserRepository.getInstance().createFromGoogle(googleData)) as User;
    } else user = (await UserRepository.getInstance().getByGoogleId(googleData.googleId)) as User;

    if (!user) throw new AuthError.RegistrationError("ConnectGoogle");

    const safe = await TokenRepository.getInstance().generateToken(user, body.agent);

    return safe;
  }

  public async register(body: Request.RegisterClassic): Promise<string> {
    if (_.isNil(body)) throw new AuthError.MissingParams("All");
    if (!_.get(body, "firstName")) throw new AuthError.MissingParams("Missing First Name.");
    if (!_.get(body, "lastName")) throw new AuthError.MissingParams("Missing Last Name.");
    if (!_.get(body, "email")) throw new AuthError.MissingParams("Missing Email.");
    if (!_.get(body, "password")) throw new AuthError.MissingParams("Missing Password.");
    if (!_.get(body, "username")) throw new AuthError.MissingParams("Missing Username.");

    if (!gates.isNameAcceptable(body.firstName)) throw new AuthError.WrongRegistrationParams(policy.name);
    if (!gates.isNameAcceptable(body.lastName)) throw new AuthError.WrongRegistrationParams(policy.name);
    if (!gates.isUsernameAcceptable(body.username)) throw new AuthError.WrongRegistrationParams(policy.username);
    if (!gates.isEmailAcceptable(body.email)) throw new AuthError.WrongRegistrationParams(policy.email);
    if (!gates.isPasswordAcceptable(body.password)) throw new AuthError.WrongRegistrationParams(policy.password);

    const isAlreadyRegistered: boolean = await UserRepository.getInstance().isAlreadyRegistered(body, Vendor.CLASSIC);
    if (isAlreadyRegistered)
      throw new AuthError.CredentialsNotUnique(`The email ${body.email} is already linked to an account`);

    const isUsernameTaken: boolean = (await UsernameRepository.getInstance().getByValue(body.username)) !== null;
    if (isUsernameTaken)
      throw new AuthError.CredentialsNotUnique(`The username ${body.username} is already used by someone.`);

    const user: User = (await UserRepository.getInstance().createFromClassic(body)) as User;

    if (!user) throw new AuthError.RegistrationError("RegisterClassic");

    const safe = await TokenRepository.getInstance().generateToken(user, body.agent);

    return safe;
  }

  /** [BAD_REQUEST, NOT_ACCEPTABLE, NOT_FOUND, CONFLICT] */
  public async login(body: Request.LoginClassic): Promise<string> {
    if (_.isNil(body)) throw new AuthError.MissingParams("All");

    if (!_.get(body, "email")) throw new AuthError.MissingParams("Missing Email.");
    if (!_.get(body, "password")) throw new AuthError.MissingParams("Missing Password.");

    if (!gates.isEmailAcceptable(body.email)) throw new AuthError.WrongRegistrationParams(policy.email);
    if (!gates.isPasswordAcceptable(body.password)) throw new AuthError.WrongRegistrationParams(policy.password);

    const user: User = (await UserRepository.getInstance().getByEmail(body.email)) as User;

    if (!user) throw new AuthError.UserNotFound("This email doesn't belong to any of our users.");

    if (!user.password)
      throw new AuthError.UserNotClassic(
        "This account was registered with a custom provider (e.g. Google). Try connecting with that provider.",
      );

    if (!(await UserRepository.getInstance().isPasswordMatching(user, body.password)))
      throw new AuthError.InvalidRegistrationParams("Email and password do not match. Please try again.");

    const safe = await TokenRepository.getInstance().generateToken(user, body.agent);

    return safe;
  }
}
