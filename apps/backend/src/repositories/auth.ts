import _ from "lodash";
import { ObjectId } from "mongodb";
import guards, { policy } from "../guards";
import UsernameRepository from "./username";
import UserRepository from "./user";
import UsersafeRepository from "./usersafe";
import TokenRepository from "./token";
import { google } from "../vendors";
import { ManagerRepository } from "./base";
import { ParamsError, AuthError } from "../errors";
import { User, Vendor, Request, Usersafe } from "../models";

export default class AuthRepository extends ManagerRepository {
  private static instance: AuthRepository;

  public static getInstance(): AuthRepository {
    return AuthRepository.instance || (AuthRepository.instance = new AuthRepository());
  }

  public async google(body: any): Promise<{ token: string; user: User }> {
    if (_.isNil(body) || !_.get(body, "identity")) throw new ParamsError.Missing("Google Auth Token");

    const ticket = await google.getTicket(body.identity);

    if (_.isNil(ticket)) throw new AuthError.MissingVendorResponse("Google Ticket");

    const payload = ticket.getPayload();

    if (_.isNil(payload)) throw new AuthError.MissingVendorResponse("Google Payload");
    if (!_.get(payload, "sub")) throw new AuthError.MissingVendorResponse("Google Id");
    if (!_.get(payload, "given_name")) throw new AuthError.MissingVendorResponse("Google First Name");
    if (!_.get(payload, "family_name")) throw new AuthError.MissingVendorResponse("Google Last Name");
    if (!_.get(payload, "email")) throw new AuthError.MissingVendorResponse("Google Email");

    let user: User;

    const googleData: Request.ConnectGoogle = {
      googleId: payload.sub,
      firstName: payload.given_name || "", // should never fall to "" because of the _.checks above
      lastName: payload.family_name || "",
      picture: payload.picture, // TODO picture support
      email: payload.email || "",
      agent: body.agent,
    };

    if (!(await UserRepository.getInstance().isAlreadyRegistered(googleData, Vendor.GOOGLE))) {
      user = (await UserRepository.getInstance().createFromGoogle(googleData)) as User;
    } else user = (await UserRepository.getInstance().getByGoogleId(googleData.googleId, { populate: true })) as User;

    if (!user) throw new AuthError.Failed("Could not create an account with Google. Try another method.");

    const safe = await TokenRepository.getInstance().generateToken(user, body.agent);

    return {
      token: safe,
      user,
    };
  }

  public async register(body: Request.RegisterClassic): Promise<{ token: string; user: User }> {
    if (_.isNil(body)) throw new ParamsError.Missing("All");
    if (!_.get(body, "firstName")) throw new ParamsError.Missing("Missing First Name.");
    if (!_.get(body, "lastName")) throw new ParamsError.Missing("Missing Last Name.");
    if (!_.get(body, "email")) throw new ParamsError.Missing("Missing Email.");
    if (!_.get(body, "password")) throw new ParamsError.Missing("Missing Password.");
    if (!_.get(body, "username")) throw new ParamsError.Missing("Missing Username.");

    if (!guards.isNameAcceptable(body.firstName)) throw new ParamsError.Invalid(policy.user.name.root);
    if (!guards.isNameAcceptable(body.lastName)) throw new ParamsError.Invalid(policy.user.name.root);
    if (!guards.isUsernameAcceptable(body.username)) throw new ParamsError.Invalid(policy.user.username.root);
    if (!guards.isEmailAcceptable(body.email)) throw new ParamsError.Invalid(policy.user.email.root);
    if (!guards.isPasswordAcceptable(body.password)) throw new ParamsError.Invalid(policy.user.password.root);

    const isAlreadyRegistered: boolean = await UserRepository.getInstance().isAlreadyRegistered(body, Vendor.CLASSIC);
    if (isAlreadyRegistered) throw new ParamsError.Conflict(`The email ${body.email} is already linked to an account`);

    const isUsernameTaken: boolean = (await UsernameRepository.getInstance().getByValue(body.username)) !== null;
    if (isUsernameTaken) throw new ParamsError.Conflict(`The username ${body.username} is already used by someone.`);

    const user: User = (await UserRepository.getInstance().createFromClassic(body)) as User;

    if (!user) throw new AuthError.Failed("Could not create a new account. Please try again.");

    const safe = await TokenRepository.getInstance().generateToken(user, body.agent);

    return {
      token: safe,
      user,
    };
  }

  public async login(body: Request.LoginClassic): Promise<{ token: string; user: User }> {
    if (_.isNil(body)) throw new ParamsError.Missing("No parameteres have been provided.");

    if (!_.get(body, "email")) throw new ParamsError.Missing("Missing Email.");
    if (!_.get(body, "password")) throw new ParamsError.Missing("Missing Password.");

    if (!guards.isEmailAcceptable(body.email)) throw new ParamsError.Invalid(policy.user.email.root);
    if (!guards.isPasswordAcceptable(body.password)) throw new ParamsError.Invalid(policy.user.password.root);

    const user: User = (await UserRepository.getInstance().getByEmail(body.email, { populate: true })) as User;

    if (!user) throw new AuthError.UserNotFound("This email doesn't belong to any of our users.");

    if (!user.password)
      throw new AuthError.UserNotFound(
        "This account was created with a provider (e.g. Google). Try again with that provider.",
      );

    if (!(await UserRepository.getInstance().isPasswordMatching(user, body.password)))
      throw new AuthError.UserNotFound("Email and password do not match. Please try again.");

    const safe = await TokenRepository.getInstance().generateToken(user, body.agent);

    return {
      token: safe,
      user,
    };
  }

  public async validate(token: string): Promise<Usersafe> {
    const payload = await TokenRepository.getInstance().verifyToken(token);
    if (!payload) throw new AuthError.InvalidToken("Unreachable payload.");
    // JWT integrity gate passed

    const usersafe: Usersafe = {
      user: new ObjectId(payload.userId),
      safe: payload.safe,
    };

    const entry = await UsersafeRepository.getInstance().getByUserAndSafe(usersafe);
    if (!entry) {
      UsersafeRepository.getInstance().removeByUserAndSafe(usersafe);
      throw new AuthError.InvalidToken("Unauthorized based on Bearer payload.");
    }
    // User-Safe match gate passed

    return usersafe;
  }

  public async logout(payload: Usersafe): Promise<void> {
    return UsersafeRepository.getInstance().removeByUserAndSafe(payload);
  }
}
